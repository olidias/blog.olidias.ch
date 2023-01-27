/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{html,js}',
    './src/components/**/*.{html,js}',
    './src/index.js',
  ],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      backgroundImage: {
        'main-background': "url('./assets/background-main.jpg')"
      },
      colors: {
        "background-1": '#657D8C',
        "background-2": '#A8B9BF',
        "background-3": '#3F5559',
        "background-4": '#8C6A3F',
        "background-5": '#735A3C' 
      }
    },
  },
  plugins: [],
}
