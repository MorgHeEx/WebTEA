/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "var(--font-family)",
          "Nunito",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "sans-serif",
        ],
      },
      colors: {
        tea: {
          sky: "#ffedd5",
          mint: "#ffe4e6",
          card: "#fffcf7",
          terracotta: "#b4532a",
          mauve: "#9a3b52",
        },
      },
    },
  },
  plugins: [],
};
