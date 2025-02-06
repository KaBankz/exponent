import { useEffect } from 'react';
import { useFonts, type FontSource } from 'expo-font';
import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';

import { ClerkLoaded, ClerkProvider } from '@clerk/clerk-expo';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';

import { useColorScheme } from '@/hooks/useColorScheme';
import { LinguiProvider } from '@/i18n';
import { tokenCache } from '@/lib/clerkCache';

import '@/app/global.css';
import '@/i18n';

// Prevent the splash screen from auto-hiding before asset loading is complete.
void SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('@/assets/fonts/SpaceMono-Regular.ttf') as FontSource,
  });

  useEffect(() => {
    if (loaded) {
      void SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ClerkProvider
      tokenCache={tokenCache}
      publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!}>
      <ClerkLoaded>
        <LinguiProvider>
          <ThemeProvider
            value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <StatusBar style='auto' />
            <Slot />
          </ThemeProvider>
        </LinguiProvider>
      </ClerkLoaded>
    </ClerkProvider>
  );
}
