/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#1F3B73",
          dark: "#132548",
        },
        ink: "#0B1D3A",
        canvas: "#FAF6EC",
        accent: "#F5A623",
        muted: "#6b7280",
      },
      boxShadow: {
        card: "0 1px 2px rgba(11,29,58,0.06), 0 8px 20px -8px rgba(11,29,58,0.18)",
        cardHover: "0 4px 10px rgba(11,29,58,0.08), 0 16px 32px -12px rgba(11,29,58,0.28)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Helvetica Neue", "Arial", "sans-serif"],
      },
      maxWidth: {
        container: "1600px",
      },
    },
  },
  plugins: [],
};
