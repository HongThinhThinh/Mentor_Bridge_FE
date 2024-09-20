/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        shade: {
          900: "#151316",
          800: "#D5D5D7",
          700: "#DEDEE0",
          600: "#E8E7EA",
          500: "#EEEDF0",
          400: "#F6F5F8",
          300: "#FFFFFF",
        },
        orange: "#F37022",
        blue: "#0066B1",
        error: "#D73535",
      },
    },
  },
  plugins: [],
};
