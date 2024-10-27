import { useEffect } from 'react';
import { Text } from 'react-native';

import { i18n } from '@lingui/core';
import { I18nProvider, type TransRenderProps } from '@lingui/react';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';

import '@/app/global.css';

import { useColorScheme } from '@/hooks/useColorScheme';
import { messages } from '@/locales/en-US/messages.po';
import { messages as pseudoMessages } from '@/locales/pseudo-LOCALE/messages.po';

i18n.loadAndActivate({ locale: 'en-US', messages });
i18n.load('pseudo-LOCALE', pseudoMessages);
i18n.activate('pseudo-LOCALE');

const DefaultComponent = (props: TransRenderProps) => {
  return <Text>{props.children}</Text>;
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
void SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
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
    <I18nProvider i18n={i18n} defaultComponent={DefaultComponent}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
          <Stack.Screen name='+not-found' />
        </Stack>
      </ThemeProvider>
    </I18nProvider>
  );
}
