/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        width_49: '49%',
        width_90: '90%'
      }
    },
  },
  plugins: [],
}
