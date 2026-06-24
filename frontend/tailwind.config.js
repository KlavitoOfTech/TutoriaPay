/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef5ff",
          100: "#d9e8ff",
          500: "#3b6fef",
          600: "#2f59c4",
          700: "#24449a",
        },
      },
    },
  },
  plugins: [],
};
