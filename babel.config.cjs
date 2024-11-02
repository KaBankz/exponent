/**
 * @see https://babeljs.io/docs/en/config-files#config-function-api
 * @type {import("@babel/core").ConfigFunction}
 * */
module.exports = (api) => {
  api.cache.forever();

  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
      'nativewind/babel',
    ],
  };
};