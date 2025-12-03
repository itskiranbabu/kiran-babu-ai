/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        keyspark: {
          purple: '#7B2FF7',
          orange: '#FF9D0A',
        },
        brand: {
          50: '#f3f1ff',
          100: '#e9e4ff',
          200: '#d5ccff',
          300: '#b6a6ff',
          400: '#9475ff',
          500: '#7B2FF7',
          600: '#6c1ce6',
          700: '#5e15c4',
          800: '#4e139f',
          900: '#411281',
        },
        dark: {
          bg: 'var(--color-bg)',
          card: 'var(--color-card)',
          border: 'var(--color-border)',
          text: 'var(--color-text)',
          muted: 'var(--color-muted)'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'toast-in': 'toastIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        toastIn: {
          '0%': { opacity: '0', transform: 'translateY(1rem)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
