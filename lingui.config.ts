import type { LinguiConfig } from '@lingui/conf';

const config: LinguiConfig = {
  sourceLocale: 'en-US',
  locales: ['en-US', 'pseudo-LOCALE'],
  pseudoLocale: 'pseudo-LOCALE',
  compileNamespace: 'ts',
  catalogs: [
    {
      path: '<rootDir>/src/locale/locales/{locale}/messages',
      include: ['src'],
    },
  ],
};

export default config;
