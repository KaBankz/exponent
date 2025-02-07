// @ts-expect-error - no types
import nativewind from 'nativewind/preset';
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/{app,screens,components}/**/*.tsx'],
  presets: [nativewind],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: 'rgb(var(--background))',
          subtle: 'rgb(var(--background-subtle))',
          muted: 'rgb(var(--background-muted))',
        },
        foreground: {
          DEFAULT: 'rgb(var(--foreground))',
          subtle: 'rgb(var(--foreground-subtle))',
          muted: 'rgb(var(--foreground-muted))',
        },
        primary: {
          DEFAULT: 'rgb(var(--primary))',
          foreground: 'rgb(var(--primary-foreground))',
          muted: 'rgb(var(--primary-muted))',
          subtle: 'rgb(var(--primary-subtle))',
        },
        accent: {
          DEFAULT: 'rgb(var(--accent))',
          foreground: 'rgb(var(--accent-foreground))',
          muted: 'rgb(var(--accent-muted))',
          subtle: 'rgb(var(--accent-subtle))',
        },
        input: {
          DEFAULT: 'rgb(var(--input))',
          border: 'rgb(var(--input-border))',
          ring: 'rgb(var(--input-ring))',
        },
        success: {
          DEFAULT: 'rgb(var(--success))',
          foreground: 'rgb(var(--success-foreground))',
          muted: 'rgb(var(--success-muted))',
          subtle: 'rgb(var(--success-subtle))',
        },
        warning: {
          DEFAULT: 'rgb(var(--warning))',
          foreground: 'rgb(var(--warning-foreground))',
          muted: 'rgb(var(--warning-muted))',
          subtle: 'rgb(var(--warning-subtle))',
        },
        destructive: {
          DEFAULT: 'rgb(var(--destructive))',
          foreground: 'rgb(var(--destructive-foreground))',
          muted: 'rgb(var(--destructive-muted))',
          subtle: 'rgb(var(--destructive-subtle))',
        },
        card: {
          DEFAULT: 'rgb(var(--card))',
          muted: 'rgb(var(--card-muted))',
          foreground: 'rgb(var(--card-foreground))',
        },
        border: {
          DEFAULT: 'rgb(var(--border))',
          hover: 'rgb(var(--border-hover))',
        },
        ring: 'rgb(var(--ring))',
      },
    },
  },
  plugins: [],
};

export default config;
