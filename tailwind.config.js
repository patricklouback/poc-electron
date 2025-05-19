/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          300: "#b4a7d6",
          400: "#9370DB",
          500: "#7B68EE",
          600: "#6A5ACD",
          700: "#483D8B",
        },
      },
    },
  },
  plugins: [],
}
