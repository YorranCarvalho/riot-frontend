/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          darkblue: "#0B1C2C",
          blue: "#13293D",
          wine: "#531928",
          blood: "#96071E",
        },
        secondary: {
          text: "#E6EDF3",
          muted: "#94A3B8",
        },
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};