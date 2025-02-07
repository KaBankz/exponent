import { useEffect, useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';

import { useSignIn, useSSO } from '@clerk/clerk-expo';
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
                <Trans>Welcome back</Trans>
              </Text>
              <Text className='text-center text-base text-foreground-muted'>
                <Trans>Sign in to continue your journey</Trans>
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
                    placeholder={t`Enter your password`}
                    secureTextEntry={true}
                    onChangeText={setPassword}
                    autoComplete='password'
                  />
                </View>
              </View>

              {/* Sign In Button */}
              <Pressable
                className='overflow-hidden rounded-2xl bg-primary px-6 py-3.5 transition-colors active:bg-primary-muted'
                onPress={() => void onSignInPress()}>
                <Text className='text-center text-base font-semibold text-primary-foreground'>
                  <Trans>Sign in</Trans>
                </Text>
              </Pressable>

              {/* Sign Up Link */}
              <View className='flex-row justify-center gap-1'>
                <Text className='text-foreground-muted'>
                  <Trans>Don't have an account?</Trans>
                </Text>
                <Link href='/sign-up' asChild replace>
                  <Pressable className='transition-opacity active:opacity-70'>
                    <Text className='font-semibold text-primary'>
                      <Trans>Create an account</Trans>
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
                className='flex-row items-center justify-center gap-3 rounded-2xl bg-foreground px-6 py-3.5 active:bg-foreground-subtle'
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
