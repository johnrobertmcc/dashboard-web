/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      sm: '550px',
      md: '767px',
      tablet: '900px',
      desktop: '1250px',
    },
    extend: {
      container: {
        screens: {
          lg: '100%',
          limit: '1670px',
        },
        center: true,
        margin: 'auto',
        padding: '1.5rem',
      },
      fontSize: {
        10: '10px',
        11: '11px',
        12: '12px',
        16: '16px',
      },
      colors: {
        dark: {
          primary: '#50668A',
          secondary: '#1D2A3D',
          tertiary: '#F7FAFF',
          fourth: '#3D3117',
          fifth: '#8A7750',
        },
        error: {
          default: '#9C4049',
          warning: '#DE2B31',
          excessive: '#DB5A67',
          notAllowed: '#E85F6D',
          immediate: '#C24F5B',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
