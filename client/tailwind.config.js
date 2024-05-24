/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
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
      screens: {
        '1xl': '1440px',
      },
      container: {
        center: true,
        padding: '1rem',
        screens: {
          'sm':         '540px',
          'md':         '720px',
          'lg':         '960px',
          'xl':         '1140px',
          '1xl':        '1320px',
          '2xl':        '1400px',
        },
      },
    },
  },
  plugins: ["prettier-plugin-tailwindcss"],
}

