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
        FFFFFF: "#FFFFFF", // 사용자 정의 색상 추가
        "3692FF": "#3692FF",
        DFDFDF: "#DFDFDF"
      },
      borderRadius: {
        "8px": "8px"
      }
    }
  },
  plugins: [pxToRem({ base: 16 })]
};
