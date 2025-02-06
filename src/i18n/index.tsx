import type { ReactNode } from 'react';
import { getLocales } from 'expo-localization';

import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';

const systemLocale = __DEV__ ? 'pseudo-LOCALE' : getLocales()[0]!.languageTag;

changeLocale(systemLocale).catch((error) => {
  console.error('Failed to change locale', error);
});

export async function changeLocale(locale?: string) {
  switch (locale) {
    default:
    case 'en-US': {
      const { messages } = await import('@/i18n/locales/en-US/messages.po');
      i18n.loadAndActivate({ locale: 'en-US', messages });
      break;
    }
    case 'pseudo-LOCALE': {
      const { messages } = await import(
        '@/i18n/locales/pseudo-LOCALE/messages.po'
      );
      i18n.loadAndActivate({ locale, messages });
      break;
    }
  }
}

export function LinguiProvider({ children }: { children: ReactNode }) {
  return <I18nProvider i18n={i18n}>{children}</I18nProvider>;
}
