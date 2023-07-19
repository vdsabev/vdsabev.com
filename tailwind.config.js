const defaultTheme = require('tailwindcss/defaultTheme')
const cmless = require('./cmless.config');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
    fontFamily: {
      title: [cmless.config.fonts.title, ...defaultTheme.fontFamily.serif],
      text: [cmless.config.fonts.text, ...defaultTheme.fontFamily.sans],
    },
  },
  plugins: [],
};
