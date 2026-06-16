/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#fff1f1',
          100: '#ffd7d7',
          200: '#ffb0b0',
          300: '#ff7a7a',
          400: '#ff4a4a',
          500: '#f72020',
          600: '#e31e24',
          700: '#c00e14',
          800: '#9c0e13',
          900: '#7e1115',
        },
      },
      fontFamily: {
        script: ['"Dancing Script"', 'cursive'],
        sans: ['Raleway', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(28px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideLeft: {
          '0%':   { opacity: '0', transform: 'translateX(-28px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideRight: {
          '0%':   { opacity: '0', transform: 'translateX(28px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      animation: {
        'fade-up':    'fadeUp 0.7s ease forwards',
        'fade-in':    'fadeIn 0.6s ease forwards',
        'slide-left':  'slideLeft 0.7s ease forwards',
        'slide-right': 'slideRight 0.7s ease forwards',
      },
    },
  },
  plugins: [],
};
