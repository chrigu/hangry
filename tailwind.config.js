/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'white': 'rgba(255, 255, 255, 1)',
        'black': 'rgba(35, 35, 35, 1)',
        'green': 'rgba(175, 203, 55, 1)',
        'gray': 'rgba(193, 193, 193, 1)'
    },
    fontFamily: {
      sans: ["Poppins", ...defaultTheme.fontFamily.sans],
    },
    fontWeight: {
      normal: '500',
      bold: '700',
    },
    extend: {},
  },
  plugins: [],
}
