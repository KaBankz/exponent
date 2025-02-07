import { useEffect, useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';

import { useSignUp, useSSO } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { t } from '@lingui/core/macro';
import { Trans } from '@lingui/react/macro';
import { cssInterop } from 'nativewind';

import { Pressable } from '@/components/Pressable';

// Map the `color` prop to the `style` prop
cssInterop(Ionicons, {
  className: {
    target: 'style',
    nativeStyleToProp: { color: true },
  },
});

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
      <SafeAreaView className='flex-1 bg-background'>
        <View className='relative flex-1 px-6'>
          {/* Decorative circles */}
          <View className='absolute -left-32 -top-32 size-64 rounded-full bg-primary opacity-10' />
          <View className='absolute -bottom-32 -right-32 size-64 rounded-full bg-accent opacity-10' />

          <View className='flex-1 justify-center py-12'>
            <View className='gap-8'>
              <View className='items-center gap-3'>
                <Text className='text-center text-4xl font-black text-foreground'>
                  <Trans>Verify your email</Trans>
                </Text>
                <Text className='text-center text-base text-foreground-muted'>
                  <Trans>Enter the code we sent to your email</Trans>
                </Text>
              </View>

              <View className='gap-6'>
                <View className='gap-2'>
                  <Text className='text-sm font-medium text-foreground-subtle'>
                    <Trans>Verification code</Trans>
                  </Text>
                  <View className='overflow-hidden rounded-2xl bg-input'>
                    <TextInput
                      className='p-4 text-base leading-none text-foreground placeholder:text-foreground-muted'
                      value={code}
                      placeholder={t`Enter verification code`}
                      onChangeText={setCode}
                      keyboardType='number-pad'
                      autoComplete='one-time-code'
                    />
                  </View>
                </View>

                <Pressable
                  className='overflow-hidden rounded-2xl bg-primary px-6 py-3.5 transition-colors active:bg-primary-muted'
                  onPress={() => void onVerifyPress()}>
                  <Text className='text-center text-base font-semibold text-primary-foreground'>
                    <Trans>Verify email</Trans>
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className='flex-1 bg-background'>
      <View className='relative flex-1 px-6'>
        {/* Decorative circles */}
        <View className='absolute -left-32 -top-32 size-64 rounded-full bg-primary opacity-10' />
        <View className='absolute -bottom-32 -right-32 size-64 rounded-full bg-accent opacity-10' />

        <View className='flex-1 justify-between py-12'>
          {/* Header Section */}
          <View className='gap-8'>
            <View className='items-center gap-3'>
              <Text className='text-center text-4xl font-black text-foreground'>
                <Trans>Create an account</Trans>
              </Text>
              <Text className='text-center text-base text-foreground-muted'>
                <Trans>Sign up to get started with our platform</Trans>
              </Text>
            </View>

            {/* Form Section */}
            <View className='gap-6'>
              {/* Email Input */}
              <View className='gap-2'>
                <Text className='text-sm font-medium text-foreground-subtle'>
                  <Trans>Email address</Trans>
                </Text>
                <View className='overflow-hidden rounded-2xl bg-input'>
                  <TextInput
                    className='p-4 text-base leading-none text-foreground placeholder:text-foreground-muted'
                    autoCapitalize='none'
                    value={emailAddress}
                    placeholder={t`Enter your email`}
                    onChangeText={setEmailAddress}
                    keyboardType='email-address'
                    autoComplete='email'
                  />
                </View>
              </View>

              {/* Password Input */}
              <View className='gap-2'>
                <Text className='text-sm font-medium text-foreground-subtle'>
                  <Trans>Password</Trans>
                </Text>
                <View className='overflow-hidden rounded-2xl bg-input'>
                  <TextInput
                    className='p-4 text-base leading-none text-foreground placeholder:text-foreground-muted'
                    value={password}
                    placeholder={t`Create a password`}
                    secureTextEntry={true}
                    onChangeText={setPassword}
                    autoComplete='new-password'
                  />
                </View>
              </View>

              {/* Sign Up Button */}
              <Pressable
                className='overflow-hidden rounded-2xl bg-primary px-6 py-3.5 transition-colors active:bg-primary-muted'
                onPress={() => void onSignUpPress()}>
                <Text className='text-center text-base font-semibold text-primary-foreground'>
                  <Trans>Create account</Trans>
                </Text>
              </Pressable>

              {/* Sign In Link */}
              <View className='flex-row justify-center gap-1'>
                <Text className='text-foreground-muted'>
                  <Trans>Already have an account?</Trans>
                </Text>
                <Link href='/sign-in' asChild replace>
                  <Pressable className='transition-opacity active:opacity-70'>
                    <Text className='font-semibold text-primary'>
                      <Trans>Sign in</Trans>
                    </Text>
                  </Pressable>
                </Link>
              </View>
            </View>
          </View>

          {/* OAuth Section */}
          <View className='gap-6'>
            {/* Divider */}
            <View className='relative flex items-center justify-center'>
              <View className='absolute inset-x-0 h-px bg-border' />
              <Text className='relative bg-background px-4 text-sm text-foreground-muted'>
                <Trans>or</Trans>
              </Text>
            </View>

            {/* OAuth Buttons */}
            <View className='gap-3'>
              {/* Google Button */}
              <Pressable
                className='flex-row items-center justify-center gap-3 rounded-2xl border border-border bg-card px-6 py-3.5 transition-colors active:bg-card-muted'
                onPress={() => void onPressGoogle()}>
                <View className='size-5'>
                  <Ionicons
                    className='text-foreground'
                    name='logo-google'
                    size={20}
                  />
                </View>
                <Text className='text-base font-medium text-foreground'>
                  <Trans>Continue with Google</Trans>
                </Text>
              </Pressable>

              {/* Apple Button */}
              <Pressable
                className='flex-row items-center justify-center gap-3 rounded-2xl bg-foreground px-6 py-3.5 transition-colors active:bg-foreground-subtle'
                onPress={() => void onPressApple()}>
                <View className='size-5'>
                  <Ionicons
                    className='text-background'
                    name='logo-apple'
                    size={20}
                  />
                </View>
                <Text className='text-base font-medium text-background'>
                  <Trans>Continue with Apple</Trans>
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
