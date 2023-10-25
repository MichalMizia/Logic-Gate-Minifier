/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      fontSize: {
        h1: "clamp(2rem, 1.7993rem + 0.8451vw, 2.75rem)",
        h2: "clamp(1.8rem, 1.6261rem + 0.7324vw, 2.45rem)",
        h3: "clamp(1.6rem, 1.4662rem + 0.5634vw, 2.1rem)",
        h4: "clamp(1.2rem, 1.1331rem + 0.2817vw, 1.45rem)",
        h5: "clamp(1.2rem, 1.1331rem + 0.2817vw, 1.45rem)",
        h6: "clamp(0.9rem, 0.8732rem + 0.1127vw, 1rem)",
        body: "clamp(1rem, 0.9599rem + 0.169vw, 1.15rem)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
