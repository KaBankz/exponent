import { useEffect, useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';

import { useSignUp, useSSO } from '@clerk/clerk-expo';
import { t } from '@lingui/core/macro';
import { Trans } from '@lingui/react/macro';

import { Pressable } from '@/components/Pressable';

export const useWarmUpBrowser = () => {
  useEffect(() => {
    // Preloads the browser for Android devices to reduce authentication load time
    // See: https://docs.expo.dev/guides/authentication/#improving-user-experience
    void WebBrowser.warmUpAsync();
    return () => {
      // Cleanup: closes browser when component unmounts
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

// Handle any pending authentication sessions
WebBrowser.maybeCompleteAuthSession();

export default function SignUpScreen() {
  useWarmUpBrowser();

  const { startSSOFlow } = useSSO();
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState('');

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return;

    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        emailAddress,
        password,
      });

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setPendingVerification(true);
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const onPressGoogle = async () => {
    try {
      // Start the authentication process by calling `startSSOFlow()`
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy: 'oauth_google',
      });

      // If sign in was successful, set the active session
      if (createdSessionId) {
        await setActive!({ session: createdSessionId });
        router.replace('/');
      } else {
        // If there is no `createdSessionId`,
        // there are missing requirements, such as MFA
        // Use the `signIn` or `signUp` returned from `startSSOFlow`
        // to handle next steps
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const onPressApple = async () => {
    try {
      // Start the authentication process by calling `startSSOFlow()`
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy: 'oauth_apple',
      });

      // If sign in was successful, set the active session
      if (createdSessionId) {
        await setActive!({ session: createdSessionId });
        router.replace('/');
      } else {
        // If there is no `createdSessionId`,
        // there are missing requirements, such as MFA
        // Use the `signIn` or `signUp` returned from `startSSOFlow`
        // to handle next steps
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace('/');
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  if (pendingVerification) {
    return (
      <SafeAreaView className='flex-1'>
        <View className='flex-1 justify-center px-6'>
          <Text className='mb-8 text-center text-2xl font-bold text-white'>
            <Trans>Verify your email</Trans>
          </Text>
          <TextInput
            className='w-full rounded-lg border px-4 py-3 text-white'
            value={code}
            placeholder={t`Enter your verification code`}
            onChangeText={(code) => setCode(code)}
          />
          <Pressable
            className='w-full rounded-lg py-3'
            style={{ backgroundColor: '#2563EB' }}
            onPress={() => void onVerifyPress()}>
            <Text className='text-center text-base font-semibold text-white'>
              <Trans>Verify</Trans>
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className='flex-1'>
      <View className='flex-1 justify-center px-6'>
        <View className='rounded-2xl p-8'>
          <Text className='mb-8 text-center text-2xl font-bold text-white'>
            <Trans>Sign up</Trans>
          </Text>

          <View className='space-y-4'>
            <View>
              <TextInput
                className='w-full rounded-lg border px-4 py-3 text-white'
                autoCapitalize='none'
                value={emailAddress}
                placeholder={t`Enter email`}
                onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
                placeholderTextColor='#9CA3AF'
              />
            </View>

            <View>
              <TextInput
                className='w-full rounded-lg border px-4 py-3 text-white'
                value={password}
                placeholder={t`Enter password`}
                secureTextEntry={true}
                onChangeText={(password) => setPassword(password)}
                placeholderTextColor='#9CA3AF'
              />
            </View>

            <Pressable
              className='w-full rounded-lg py-3'
              style={{ backgroundColor: '#2563EB' }}
              onPress={() => void onSignUpPress()}>
              <Text className='text-center text-base font-semibold text-white'>
                <Trans>Sign up</Trans>
              </Text>
            </Pressable>

            <Pressable
              className='w-full rounded-lg py-3'
              style={{ backgroundColor: '#2563EB' }}
              onPress={() => void onPressGoogle()}>
              <Text className='text-center text-base font-semibold text-white'>
                <Trans>Sign in with Google</Trans>
              </Text>
            </Pressable>

            <Pressable
              className='w-full rounded-lg py-3'
              style={{ backgroundColor: '#2563EB' }}
              onPress={() => void onPressApple()}>
              <Text className='text-center text-base font-semibold text-white'>
                <Trans>Sign in with Apple</Trans>
              </Text>
            </Pressable>
          </View>
        </View>

        <View className='mt-8 flex-row items-center justify-center space-x-1'>
          <Text className='text-white'>
            <Trans>Already have an account? </Trans>
          </Text>
          <Link href='/sign-in' asChild replace>
            <Pressable>
              <Text className='font-semibold text-blue-600'>
                <Trans>Sign in</Trans>
              </Text>
            </Pressable>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}
