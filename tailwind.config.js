// tailwind.config.js
const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // This array tells Tailwind where your component files are located
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // 🎯 Set Manrope as the default sans-serif font
      fontFamily: {
        // 'sans' is the default Tailwind utility used by the <body> element
        sans: ["Manrope", ...defaultTheme.fontFamily.sans],
      },
      // Ensure your custom colors are defined here
      colors: {
        "primary-accent": "#00B894", // Example, adjust to your actual primary color
        "sidebar-dark": "#004A7F",
        "text-dark-gray": "#072635",
        "bg-light-gray": "#F4F4F4",
        "card-bg": "#FFFFFF",
        "systolic-pink": "#E66F7F",
        "diastolic-purple": "#986BFF",
      },
    },
  },
  plugins: [],
};
