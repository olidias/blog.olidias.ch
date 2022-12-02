/** @type {import('tailwindcss').Config} */
module.exports = {  
  content: [
    './src/pages/**/*.{html,js}',
    './src/components/**/*.{html,js}',
],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {},
    colors: {
      'background-from': '#1E333D'
    }
  },
  plugins: [],
}
