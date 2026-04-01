/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          darkred: "#3D0209",
          wine: "#531928",
          blood: "#96071E",
        },
        secondary: {
          softpink: "#FEA6AC",
          peach: "#F1D6C0",
        },
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
