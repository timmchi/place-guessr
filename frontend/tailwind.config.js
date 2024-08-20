const withMT = require("@material-tailwind/react/utils/withMT");

/** @type {import('tailwindcss').Config} */
export default withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backdropBlur: {
        xs: "2px",
      },
      dropShadow: {
        text: "0 1.2px 1.2px rgba(0,0,0,0.8)",
      },
    },
  },
  plugins: [],
});
