/** @type {import('tailwindcss').Config} */
const pxToRem = require("tailwindcss-convert-px-to-rem");
console.log(pxToRem);
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      screens: {
        sm: { max: "743px" },
        md: { max: "1199px" },
        lg: "1200px"
      },
      colors: {
        ffffff: "#FFFFFF",
        "3692ff": "#3692FF",
        dfdfdf: "#DFDFDF",
        "4b5563": "4B5563",
        footerbg: "#111827",
        "9ca3af": "#9CA3AF",
        e5e7eb: "#E5E7EB"
      },
      borderRadius: {
        "8px": "8px"
      }
    }
  },
  plugins: [pxToRem({ base: 16 })]
};
