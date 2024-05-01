import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'note-app-btn': '#92400E',
        'note-scroll': '#B98565',
        'input-border': '#D3D4D9',
      },
      borderWidth: {
        '1.5': '1.5px',
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
};
export default config;
