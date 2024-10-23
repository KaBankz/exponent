/* global __dirname -- node globals */

const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const defaultConfig = getDefaultConfig(__dirname);

const nativewindConfig = withNativeWind(defaultConfig, {
  input: "./src/app/global.css",
  configPath: "./tailwind.config.ts",
});

module.exports = nativewindConfig;
