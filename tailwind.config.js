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
        'header-background': "linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(27, 33, 39, 1)),url('./assets/header-background.webp')"
      },
      colors: {
        "background-1": '#657D8C',
        "background-2": '#A8B9BF',
        "background-end": '#383F47',
        "background-4": '#8C6A3F',
        "background-start": '#1B2127',
        "nav-text-color": '#545D69',
        
      },
      fontFamily: {
        "explora": ['Explora'],
        "megrim": ['Megrim']
      },
      animation: {
        fade: 'fadeOut 500ms ease-in-out 500ms forwards',
        typewriter: 'typing 1s steps(100, end) 1s forwards',
      },
      keyframes: theme => ({
        fadeOut: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        typing: {
          '0%': { width: 0 },
          '100%': { width: '100%' },
        },
      }),
    },
  },
  plugins: [
  ],
}
