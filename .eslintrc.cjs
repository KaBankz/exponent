/* eslint-env node */

/**
 * @see https://eslint.org/docs/v8.x/use/configure/configuration-files
 * @type {import("eslint").Linter.Config}
 * */
module.exports = {
  root: true,
  extends: [
    'expo',
    'plugin:lingui/recommended',
    'plugin:tailwindcss/recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
  ],
  plugins: [
    '@typescript-eslint',
    'jest',
    'react-compiler',
    'tailwindcss',
    'lingui',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: true,
    tsconfigRootDir: __dirname,
  },
  settings: {
    tailwindcss: {
      classRegex: '^[a-zA-Z]*(c|C)lassName$',
      callees: ['cn', 'tv'],
    },
  },
  rules: {
    'react-compiler/react-compiler': 'error',
    'tailwindcss/no-arbitrary-value': 'warn',
    '@typescript-eslint/no-var-requires': ['error', { allow: ['.ttf$'] }],
    '@typescript-eslint/consistent-type-imports': 'warn',
    '@typescript-eslint/consistent-type-definitions': ['warn', 'type'],
  },
  overrides: [
    {
      extends: ['plugin:lingui/recommended'],
      files: ['*.tsx'],
      rules: {
        'lingui/no-unlocalized-strings': [
          'error',
          {
            ignore: [
              // Ignore strings which are a single "word" (no spaces)
              // and doesn't start with an uppercase letter
              '^(?![A-Z])\\S+$',
              // Ignore UPPERCASE literals
              // Example: const test = "FOO"
              '^[A-Z0-9_-]+$',
            ],
            ignoreNames: [
              // Ignore matching className (case-insensitive)
              { regex: { pattern: 'className', flags: 'i' } },
              // Ignore UPPERCASE names
              // Example: test.FOO = "ola!"
              { regex: { pattern: '^[A-Z0-9_-]+$' } },
              'styleName',
              'src',
              'srcSet',
              'type',
              'id',
              'width',
              'height',
              'displayName',
              'Authorization',
            ],
            ignoreFunctions: [
              'cva',
              'cn',
              'track',
              'Error',
              'console.*',
              '*headers.set',
              '*.addEventListener',
              '*.removeEventListener',
              '*.postMessage',
              '*.getElementById',
              '*.dispatch',
              '*.commit',
              '*.includes',
              '*.indexOf',
              '*.endsWith',
              '*.startsWith',
              'require',
            ],
            // Following settings require typed linting https://typescript-eslint.io/getting-started/typed-linting/
            useTsTypes: true,
            ignoreMethodsOnTypes: [
              // Ignore specified methods on Map and Set types
              'Map.get',
              'Map.has',
              'Set.has',
            ],
          },
        ],
      },
    },
    {
      extends: ['plugin:@typescript-eslint/disable-type-checked'],
      files: ['*.js', '*.cjs', '*.mjs'],
    },
    {
      extends: ['plugin:jest/recommended'],
      files: ['**/?(*.)+test.ts?(x)'],
    },
  ],
  ignorePatterns: ['/.expo', 'node_modules', 'android', 'ios', 'dist'],
};
