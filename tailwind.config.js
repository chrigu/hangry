/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ["Poppins", ...defaultTheme.fontFamily.sans],
    },
    fontWeight: {
      thin: '100',
      extralight: '200',
      light: '300',
      normal: '500',
      bold: '700',
      extrabold: '800',
      black: '900',
    },
    extend: {},
  },
  plugins: [],
}
