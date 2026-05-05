/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/main.jsx"],
  theme: {
    extend: {
      colors: {
        ink: "#05070d",
        night: "#080d18",
        panel: "#0b1220",
        line: "rgba(148, 163, 184, 0.16)",
        cyan: "#67e8f9",
        blue: "#3b82f6"
      },
      boxShadow: {
        soft: "0 0 42px rgba(103, 232, 249, 0.16)",
        card: "0 24px 80px rgba(0, 0, 0, 0.35)"
      },
      fontFamily: {
        display: ["Manrope", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};
