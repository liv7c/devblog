const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx,jsx,js}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        beige: '#fffffe',
        'off-pink': '#faeee7',
        'primary-highlight': '#ff8ba7',
      },
      container: {
        screens: {
          sm: '100%',
          md: '800px',
          lg: '800px',
        },
        padding: '20px',
        center: true,
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#33272a',
            a: {
              color: '#33272a',
              fontWeight: '500',
              textDecoration: 'underline',
            },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
