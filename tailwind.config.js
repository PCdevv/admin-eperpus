/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#695497',
        secondary: '#A79DCB',
        abu_bg: '#F9F9F9',
        abu_muda: '#D9D9D9',
        hitam: '#383838'
      }
    }
  },
  plugins: []
}
