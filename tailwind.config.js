module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cc: "#3668FF",
        "cc-temp": "#3681EA",
        "cc-light": "#E4ECFF",
        ccDark: "#1653E3",
        ccGrey: "#F8FAFB",
        ccGreyDark: "#F2F2F2",
      },
      gridTemplateColumns: {
        cards: "repeat(auto-fill,minmax(443px,1fr))",
      },
      animation: {
        drop: "drop .3s ease",
        "spin-slow": "spin 50s linear infinite",
      },
      keyframes: {
        drop: {
          from: {
            transformOrigin: "top",
            transform: "scale(.9)",
            opacity: "0",
          },
          to: {
            transformOrigin: "top",
            transform: "scale(1)",
            opacity: "1",
          },
        },
      },
      transitionProperty: {
        height: "height",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    require("tailwind-scrollbar-hide"),
  ],
};
