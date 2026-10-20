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
          sky: "#e8f4fc",
          mint: "#e6f5f0",
          card: "#fafcfd",
        },
      },
    },
  },
  plugins: [],
};
