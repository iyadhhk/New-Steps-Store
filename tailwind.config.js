/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Barlow", "sans-serif"],
      },
      colors: {
        primary: "#233e6e",
        secondary: "#3eabde",
        light: "#f8ffff",
      },
    },
  },
  plugins: [],
};
