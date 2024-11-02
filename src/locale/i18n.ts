import { i18n } from '@lingui/core';
import { getLocales } from 'expo-localization';

import { messages as enUS } from '@/locale/locales/en-US/messages.po';
import { messages as pseudoLOCALE } from '@/locale/locales/pseudo-LOCALE/messages.po';

const locale = getLocales()[0]?.languageTag;

switch (locale) {
  case 'en-US':
    i18n.loadAndActivate({
      locale,
      messages: enUS,
    });
    break;
  case 'pseudo-LOCALE':
    i18n.loadAndActivate({
      locale,
      messages: pseudoLOCALE,
    });
    break;
  default:
    i18n.loadAndActivate({
      locale: 'en-US',
      messages: enUS,
    });
    break;
}
