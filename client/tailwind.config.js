/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      'i4':       '320px',
      'xs':       '375px',
      'sm':       '576px',
      'md':       '768px',
      'lg':       '992px',
      'xl':       '1200px',
      '2xl':      '1440px',
      '3xl':      '1920px',
    },
    colors: {
      'primary':        '#c93916',
      'secondary':      '#ADAAA6',
      'tertiary':       '#6e8875',
      'dark-brown':     '#361D14',
      'white':          '#ffffff',
      'black':          '#000000',
      'light-gray':     '#e3e6ef',
      'green':          '#46544a',
      'mustard':        '#dd9243',
      'dark-shade':     '#2A2B2D',
      'light-shade':    '#6A6F6F',
    },
    extend: {
    },
  },
  plugins: [],
}

