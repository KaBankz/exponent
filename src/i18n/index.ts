import { i18n } from '@lingui/core';
import { getLocales } from 'expo-localization';

const systemLocale = __DEV__ ? 'pseudo-LOCALE' : getLocales()[0]?.languageTag;

changeLocale(systemLocale);

export async function changeLocale(locale?: string) {
  switch (locale) {
    case 'en-US': {
      const { messages } = await import('@/i18n/locales/en-US/messages.po');
      i18n.loadAndActivate({ locale, messages });
      break;
    }
    case 'pseudo-LOCALE': {
      const { messages } = await import(
        '@/i18n/locales/pseudo-LOCALE/messages.po'
      );
      i18n.loadAndActivate({ locale, messages });
      break;
    }
    default: {
      const { messages } = await import('@/i18n/locales/en-US/messages.po');
      i18n.loadAndActivate({ locale: 'en-US', messages });
      break;
    }
  }
}