/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        lemon: "'Lemon', serif",
        ops: "'Black Ops One', system-ui",
      },
    },
  },
  plugins: [],
};
