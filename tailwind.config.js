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
        md: { min: "744px", max: "1199px" },
        lg: { min: "1200px" }
      },
      colors: {
        ffffff: "#FFFFFF",
        "3692ff": "#3692FF",
        dfdfdf: "#DFDFDF",
        "4b5563": "4B5563",
        footerbg: "#111827",
        "9ca3af": "#9CA3AF",
        e5e7eb: "#E5E7EB",
        cfe5ff: "#CFE5FF",
        fcfcfc: "#FCFCFC"
      },
      lineHeight: {
        "56px": "56px",
        "44.8px": "44.8px",
        "42px": "42px",
        "33.6px": "33.6px",
        "32px": "32px",
        "26px": "26px",
        "19.2px": "19.2px"
      },
      borderRadius: {
        "8px": "8px",
        "40px": "40px"
      },
      fontWeight: {
        bold: "700",
        semibold: "600",
        normal: "400"
      }
    }
  },
  plugins: [pxToRem({ base: 16 })]
};
