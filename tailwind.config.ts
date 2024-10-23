// @ts-expect-error - no types
import nativewind from 'nativewind/preset';
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/{app,components}/**/*.tsx'],
  presets: [nativewind],
  theme: {},
  plugins: [],
};

export default config;
