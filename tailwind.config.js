/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './containers/**/*.{js,ts,jsx,tsx}',
    './layouts/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      inset: {
        alpha: 'calc(50% - 20rem)',
      },
      gridTemplateRows: {
        alpha: '10rem minmax(100rem, auto)',
      },
      gridTemplateColumns: {
        alpha: '1fr 2fr',
        beta: '1fr 2rem',
        '1fr-1fr': '1fr 1fr',
        '1fr-2.8fr': '1fr 2.8fr',
      },
      minHeight: {
        alphaHeight: 'calc(100vh - 2 * 4vw)',
      },
      fontSize: {
        adapt: {
          h1: 'clamp(3rem, 1rem + 10vw, 7rem)',
          p: 'clamp(1rem, 0.5rem + 10vw, 1.5rem)',
        },
      },
      fontFamily: {
        catamaran: ['Catamaran', 'sans-serif'],
        mouseMemoirs: ['"Mouse Memoirs"', 'sans-serif'],
        oswald: ['Oswald', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        squarePeg: ['"Square Peg"', 'cursive'],
        ubuntu: ['Ubuntu', 'sans-serif'],
      },
      colors: {
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
        gradient: {
          one: 'rgb(var(--color-grad-1))',
          two: 'rgb(var(--color-grad-2))',
        },
        grey: {
          light: {
            one: 'rgb(var(--color-grey-light-1) / <alpha-value>)',
            two: 'rgb(var(--color-grey-light-2) / <alpha-value>)',
            three: 'rgb(var(--color-grey-light-3) / <alpha-value>)',
          },
          dark: {
            one: 'rgb(var(--color-grey-dark-1) / <alpha-value>)',
            two: 'rgb(var(--color-grey-dark-2) / <alpha-value>)',
          },
        },
        col: {
          sky: 'rgb(var(--color-sky) / <alpha-value>)',
          purple: 'rgb(var(--color-purple) / <alpha-value>)',
          pink: 'rgb(var(--color-pink) / <alpha-value>)',
          emerald: 'rgb(var(--color-emerald) / <alpha-value>)',
          orange: 'rgb(var(--color-orange) / <alpha-value>)',
          darkBlue: 'rgb(var(--color-darkBlue) / <alpha-value>)',
          darkPink: 'rgb(var(--color-darkPink) / <alpha-value>)',
        },
      },
      screens: {
        large: '78.15em', // => @media (min-width: 1250px) { ... }
        medium: '61.25em', // => @media (min-width: 980px) { ... }
        small: '37.5em', // => @media (min-width: 600px) { ... }
        smallest: '31.25em', // => @media (min-width: 500px) { ... }
      },
    },
  },
  plugins: [],
};
