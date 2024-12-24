import type { ConfigContext, ExpoConfig } from '@expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'Exponent', // TODO: Update name
  slug: 'exponent', // TODO: Update slug
  owner: undefined, // TODO: Add owner
  githubUrl: 'https://github.com/kabankz/exponent', // TODO: Update GitHub URL
  scheme: 'exponent', // TODO: Update scheme
  version: '0.0.1', // TODO: Update version
  orientation: 'portrait',
  userInterfaceStyle: 'automatic',
  newArchEnabled: true,
  plugins: ['expo-router', 'expo-localization', 'expo-font'],
  splash: {
    image: './src/assets/images/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  ios: {
    bundleIdentifier: 'com.kabanks.exponent', // TODO: Update bundle identifier
    icon: './src/assets/images/icon.png',
    supportsTablet: true,
    config: {
      usesNonExemptEncryption: false,
    },
  },
  android: {
    package: 'com.kabanks.exponent', // TODO: Update package name
    adaptiveIcon: {
      foregroundImage: './src/assets/images/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
  },
  web: {
    bundler: 'metro',
    output: 'static',
    favicon: './src/assets/images/favicon.png',
  },
  experiments: {
    typedRoutes: true,
    reactCompiler: true,
  },
  runtimeVersion: {
    policy: 'fingerprint',
  },
  extra: {
    eas: {
      projectId: undefined, // TODO: Add EAS project id
    },
  },
});
