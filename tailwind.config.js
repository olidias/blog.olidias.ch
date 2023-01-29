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
    minHeight: {
      '0': '0',
      '1/4': '25vh',
      '1/2': '50vh',
      '3/4': '75vh',
      'full': '100vh'
    },
    extend: {
      backgroundImage: {
        'main-background': "url('./assets/background-main.jpg')",
        'banner-background': "url('./assets/banner-background.jpg')",
        'header-background': "linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(168, 185, 191, 1)),url('./assets/IMG_1972.jpg')"
      },
      colors: {
        "background-1": '#657D8C',
        "background-2": '#A8B9BF',
        "background-3": '#3F5559',
        "background-4": '#8C6A3F',
        "background-5": '#735A3C' 
      },
      fontFamily: {
        "explora": ['Explora'],
        "megrim": ['Megrim']
      },
      animation: {
        fade: 'fadeOut 500ms ease-in-out',
      },
      keyframes: theme => ({
        fadeOut: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      }),
    },
  },
  plugins: [],
}
