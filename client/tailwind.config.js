/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
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
    },
  },
  plugins: [],
};
