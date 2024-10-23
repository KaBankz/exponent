const { FlatCompat } = require("@eslint/eslintrc");
const js = require("@eslint/js");

// Compatibility layer for legacy eslint configurations
// expo eslint config is still using the legacy format
const flatCompat = new FlatCompat();

/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = [js.configs.recommended, ...flatCompat.extends("expo")];
