/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f2f6f9',
          100: '#e3edf4',
          200: '#c4d8e6',
          300: '#94b6cd',
          400: '#5e8aaf',
          500: '#3c6b94',
          600: '#2f557a',
          700: '#284663',
          800: '#1f3a55',
          900: '#15293d',
          950: '#0c1a28',
        },
        gold: {
          50: '#fbf7ef',
          100: '#f5ebd6',
          200: '#ecd7ad',
          300: '#e0bd7d',
          400: '#d4a857',
          500: '#c8933a',
          600: '#a8762d',
          700: '#835a26',
          800: '#6b4823',
          900: '#5a3c21',
          950: '#321f10',
        },
        terracotta: {
          50: '#fbf3f0',
          100: '#f6e2da',
          200: '#ecc4b5',
          300: '#e0a088',
          400: '#d27d60',
          500: '#bf6447',
          600: '#a44f36',
          700: '#843e2c',
          800: '#6e3429',
          900: '#5c2d25',
          950: '#331712',
        },
        cream: {
          50: '#fefdfa',
          100: '#fbf8f1',
          200: '#f5efe1',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans JP', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['Fraunces', 'Noto Serif JP', 'Georgia', 'serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(15, 41, 61, 0.04), 0 4px 16px rgba(15, 41, 61, 0.06)',
        soft: '0 1px 3px rgba(15, 41, 61, 0.05), 0 8px 24px rgba(15, 41, 61, 0.08)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.4s ease-out both',
        scaleIn: 'scaleIn 0.25s ease-out both',
        pulseSoft: 'pulseSoft 1.6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
