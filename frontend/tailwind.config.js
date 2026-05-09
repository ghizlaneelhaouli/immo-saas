/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#f2f5ee',
          100: '#dde8d0',
          200: '#bbd4a0',
          300: '#95ba6e',
          400: '#72994e',
          500: '#547a38',
          600: '#3e5e28',
          700: '#2d4a1e',
          800: '#1f3514',
          900: '#13220c',
        },
      },
    },
  },
  plugins: [],
};
