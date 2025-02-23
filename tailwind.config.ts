import type { Config } from 'tailwindcss';

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // background: '#ffffff',
        // foreground: '#171717',
        navy: '#000080',
      },
      fontSize: {
        tiny: '.65rem',
        xs: '.75rem',
        sm: '.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
      },
    },
  },
  plugins: [],
} satisfies Config;
