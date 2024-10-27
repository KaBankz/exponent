/** @type {import('@lingui/conf').LinguiConfig} */
module.exports = {
  sourceLocale: 'en-US',
  locales: ['en-US', 'es-US'],
  compileNamespace: 'ts',
  catalogs: [
    {
      path: '<rootDir>/src/locales/{locale}/messages',
      include: ['src'],
    },
  ],
};
