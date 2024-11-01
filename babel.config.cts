import type { ConfigFunction } from '@babel/core';

const config: ConfigFunction = (api) => {
  api.cache.forever();

  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
      'nativewind/babel',
    ],
  };
};

export default config;
