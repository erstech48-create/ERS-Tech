/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      poppins: ["var(--font-poppins)", "Poppins", "sans-serif"],
    },
    screens: {
      xxxs: "320px",

      xxs: "375px",

      xsm: "425px",

      sm: "640px",

      md: "768px",

      lg: "1024px",

      xl: "1280px",

      xxl: "1440px",

      xxxl: "1600px",

      "4xl": "1700px",
    },
    extend: {
      colors: {
        ersPrimary: "#26AFED",
        erssecondary: "#2e66f6",
      },
    },
  },
  plugins: [],
};
