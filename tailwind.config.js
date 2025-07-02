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
        "background": '#FAFAFA',
        "accent-1": '#B8E0D2',
        "accent-2": '#F9D5A7',
        "accent-3": '#B5C7F2',
        "accent-4": '#F7B7A3',
        "text-main": '#22223B',
        "text-muted": '#6D6875',
        "border": '#E0E0E0',
      },
      fontFamily: {
        "sans": ["Inter", "Lato", "system-ui", "sans-serif"],
        "megrim": ['Megrim'],
        "open-sans": ['Open Sans']
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
