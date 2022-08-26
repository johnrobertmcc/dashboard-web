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
    },
  },
  plugins: [],
};
