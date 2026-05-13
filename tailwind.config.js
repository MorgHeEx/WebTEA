/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Ubuntu",
          "Cantarell",
          "Noto Sans",
          "sans-serif",
        ],
      },
      colors: {
        tea: {
          sky: "#e8f4fc",
          mint: "#e6f5f0",
          card: "#fafcfd",
        },
      },
    },
  },
  plugins: [],
};
