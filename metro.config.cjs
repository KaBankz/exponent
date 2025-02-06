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

/**
 * Adds Lingui metro transformer to allow for .po/.pot files to be imported
 *
 * @see https://lingui.dev/ref/metro-transformer
 * @param {import('expo/metro-config').MetroConfig} config
 * @returns {import('expo/metro-config').MetroConfig}
 */
function withLingui(config) {
  config.transformer = {
    ...config.transformer,
    babelTransformerPath: require.resolve('@lingui/metro-transformer/expo'),
  };

  config.resolver = {
    ...config.resolver,
    sourceExts: [...config.resolver.sourceExts, 'po', 'pot'],
  };

  return config;
}

const config = withLingui(
  withNativeWind(defaultConfig, {
    input: './src/app/global.css',
    configPath: './tailwind.config.ts',
    inlineRem: 16,
  })
);

module.exports = config;
