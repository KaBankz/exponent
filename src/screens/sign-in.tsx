import { useEffect, useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';

import { useSignIn, useSSO } from '@clerk/clerk-expo';
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

export default function SignInScreen() {
  useWarmUpBrowser();

  const { startSSOFlow } = useSSO();
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  // Handle the submission of the sign-in form
  const onSignInPress = async () => {
    if (!isLoaded) return;

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace('/');
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
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

  return (
    <SafeAreaView className='flex-1'>
      <View className='flex-1 justify-center px-6'>
        <View className='rounded-2xl p-8'>
          <Text className='mb-8 text-center text-2xl font-bold text-white'>
            <Trans>Welcome Back</Trans>
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
              onPress={() => void onSignInPress()}>
              <Text className='text-center text-base font-semibold text-white'>
                <Trans>Sign in</Trans>
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
            <Trans>Don't have an account? </Trans>
          </Text>
          <Link href='/sign-up' asChild replace>
            <Pressable>
              <Text className='font-semibold text-blue-600'>
                <Trans>Sign up</Trans>
              </Text>
            </Pressable>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}
