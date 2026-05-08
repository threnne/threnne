/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Bouquet palette — shared design system across Threnne properties
        ink: {
          DEFAULT: '#2b1f24',
          inverse: '#f4ecec',
        },
        bg: {
          dark: '#1a1419',
          surface: '#2c2129',
          light: '#faf6f1',
        },
        accent: {
          DEFAULT: '#d14a6a', // wine-pink (use sparingly)
          light: '#a8344f',
          steel: '#8a9dc1', // steel-blue (workhorse accent)
          steelLight: '#5a6f94',
          lilac: '#b083ac', // editorial italic
          lilacLight: '#8a5c86',
        },
        signal: {
          up: '#7fa67e',
          upLight: '#4a7e51',
          down: '#c46478',
          downLight: '#8b3247',
        },
      },
      fontFamily: {
        display: ['Satoshi', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
        editorial: ['Spectral', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};
