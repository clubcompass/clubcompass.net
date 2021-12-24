module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cc: "#2575E5",
        "cc-temp": "#3681EA",
        "cc-light": "#4B8FEF",
      },
      gridTemplateColumns: {
        cards: "repeat(auto-fill,minmax(443px,1fr))",
      },
      animation: {
        "spin-slow": "spin 50s linear infinite",
      },
      transitionProperty: {
        height: "height",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
