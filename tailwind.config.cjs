/* eslint-disable @typescript-eslint/no-var-requires */
const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  safelist: ['grid-cols-2', 'grid-cols-4', 'grid-cols-6'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: colors.sky,
        gray: colors.neutral,
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
