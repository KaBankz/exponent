/* eslint-env node */
/* eslint-disable @typescript-eslint/no-var-requires */

const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.transformer.getTransformOptions = async () => ({
  transform: {
    // Disabled experimental tree shaking because it breaks nativewind
    experimentalImportSupport: false,
    inlineRequires: false,
  },
});

// Set up Lingui
defaultConfig.transformer = {
  ...defaultConfig.transformer,
  babelTransformerPath: require.resolve('@lingui/metro-transformer/expo'),
};

defaultConfig.resolver = {
  ...defaultConfig.resolver,
  sourceExts: [...defaultConfig.resolver.sourceExts, 'po', 'pot'],
};

const nativewindConfig = withNativeWind(defaultConfig, {
  input: './src/app/global.css',
  configPath: './tailwind.config.ts',
});

module.exports = nativewindConfig;
