const { FlatCompat } = require("@eslint/eslintrc");
const js = require("@eslint/js");
const tailwind = require("eslint-plugin-tailwindcss");

// Compatibility layer for legacy eslint configurations
// expo eslint config is still using the legacy format
const flatCompat = new FlatCompat();

/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = [
  js.configs.recommended,
  ...flatCompat.extends("expo"),
  ...tailwind.configs["flat/recommended"],
  {
    name: "tailwind",
    rules: {
      "tailwindcss/no-arbitrary-value": "warn",
    },
    settings: {
      tailwindcss: {
        classRegex: "^[a-zA-Z]*(c|C)lassName$",
        callees: ["classnames", "clsx", "ctl", "cva", "cx", "twMerge"],
      },
    },
  },
];
