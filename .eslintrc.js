/* eslint-env node */

/**
 * @see https://eslint.org/docs/v8.x/use/configure/configuration-files
 * @type {import("eslint").Linter.Config}
 * */
module.exports = {
  root: true,
  extends: [
    'expo',
    'plugin:tailwindcss/recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
  ],
  plugins: ['@typescript-eslint', 'jest', 'react-compiler', 'tailwindcss'],
  parser: '@typescript-eslint/parser',
  settings: {
    tailwindcss: {
      classRegex: '^[a-zA-Z]*(c|C)lassName$',
      callees: ['classnames', 'clsx', 'ctl', 'cva', 'cx', 'twMerge'],
    },
  },
  rules: {
    'react-compiler/react-compiler': 'error',
    'tailwindcss/no-arbitrary-value': 'warn',
    '@typescript-eslint/consistent-type-imports': 'warn',
    '@typescript-eslint/consistent-type-definitions': ['warn', 'type'],
  },
  parserOptions: {
    project: true,
    tsconfigRootDir: __dirname,
  },
  overrides: [
    {
      extends: ['plugin:@typescript-eslint/disable-type-checked'],
      files: ['*.js', '*.cjs', '*.mjs'],
    },
    {
      files: ['**/?(*.)+test.ts?(x)'],
      extends: ['plugin:jest/recommended'],
    },
  ],
  ignorePatterns: ['/.expo', 'node_modules', 'android', 'ios'],
};
