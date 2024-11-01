/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
export default {
  singleQuote: true,
  jsxSingleQuote: true,
  bracketSameLine: true,
  htmlWhitespaceSensitivity: 'ignore',
  trailingComma: 'es5',
  plugins: [
    '@ianvs/prettier-plugin-sort-imports',
    'prettier-plugin-tailwindcss',
  ],
  tailwindFunctions: ['twMerge', 'cva', 'cx'],
  importOrderTypeScriptVersion: '5.0.0',
  importOrder: [
    '<BUILTIN_MODULES>',
    '',
    '^react$',
    '^react-native$',
    '',
    '<THIRD_PARTY_MODULES>',
    '',
    '^@/(.*)$',
    '',
    '^[./]',
    '^[../]',
  ],
};
