/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        plum: {
          950: '#2A0B26',
          900: '#3A1035',
          800: '#571A50', // primary-dark
          700: '#7A2470', // primary
          600: '#912B81', // logo purple
          500: '#A9408F',
          400: '#BB4694', // logo border rose
          200: '#E9C3DB',
          100: '#F6E3EF',
          50: '#FBF2F8',
        },
        ivory: { DEFAULT: '#FFFAF5', 100: '#FBF3EA', 200: '#F5ECE1', 300: '#EADFCF' },
        jaggery: { 700: '#8A4A12', 600: '#A65E1A', 500: '#C27A2C', 300: '#E8BE84', 100: '#F8EAD6' },
        ink: { DEFAULT: '#2E1F2C', muted: '#6B5E69', soft: '#8C7F8A' },
        line: '#EADCE5',
        success: { DEFAULT: '#1F7A43', bg: '#E8F5EC' },
        danger: { DEFAULT: '#B42318', bg: '#FDECEA' },
        warn: { DEFAULT: '#8A5A00', bg: '#FFF4D6' },
      },
      fontFamily: {
        display: ['var(--font-display)'],
        sans: ['var(--font-sans)'],
      },
      fontSize: {
        'display-xl': ['clamp(2.5rem, 1.6rem + 4vw, 4.75rem)', { lineHeight: '1.04', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(2rem, 1.4rem + 2.6vw, 3.4rem)', { lineHeight: '1.08', letterSpacing: '-0.015em' }],
        'display-md': ['clamp(1.6rem, 1.25rem + 1.4vw, 2.4rem)', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
      },
      borderRadius: { xl2: '1.25rem', xl3: '1.75rem' },
      boxShadow: {
        card: '0 1px 2px rgba(58,16,53,.06), 0 8px 24px -12px rgba(58,16,53,.18)',
        lift: '0 2px 4px rgba(58,16,53,.06), 0 24px 48px -20px rgba(58,16,53,.35)',
        focus: '0 0 0 3px #FFFAF5, 0 0 0 5px #7A2470',
      },
      maxWidth: { site: '1240px' },
    },
  },
  plugins: [],
};
