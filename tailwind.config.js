const colors = require('tailwindcss/colors');

const defaultTheme = require('tailwindcss/defaultTheme');
const cmless = require('./cmless.config');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      foreground: {
        400: '#999999', // light
        500: '#666666', // default
        600: '#333333', // dark
        700: '#000000', // darker
      },

      neutral: {
        300: '#ffffff', // lighter
        400: '#ecf0f1', // light
        500: '#bdc3c7', // default
        600: '#95a5a6', // dark
      },

      primary: {
        500: '#34495e',
      },

      success: {
        500: '#1e8449',
      },

      danger: {
        500: '#df2e1b',
      },

      info: {
        500: '#207ab7',
      },
    },
    extend: {},
    fontFamily: {
      title: [cmless.config.fonts.title, ...defaultTheme.fontFamily.serif],
      text: [cmless.config.fonts.text, ...defaultTheme.fontFamily.sans],
    },
  },
  plugins: [],
};
