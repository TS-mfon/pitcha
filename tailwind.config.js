/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "375px",
      },
      colors: {
        pitcha: {
          bg: "#080C14",
          surface: "#0F172A",
          elevated: "#1E293B",
          border: "#334155",
          "border-subtle": "#1E293B",
          "border-highlight": "#475569",
          emerald: "#10B981",
          gold: "#F59E0B",
          indigo: "#6366F1",
          coral: "#EF4444",
        },
        judge: {
          ada: "#06B6D4",
          tunde: "#F59E0B",
          sarah: "#EC4899",
        },
      },
      boxShadow: {
        "glow-emerald": "0 0 25px -4px rgba(16, 185, 129, 0.45)",
        "glow-gold": "0 0 25px -4px rgba(245, 158, 11, 0.45)",
        "glow-coral": "0 0 25px -4px rgba(239, 68, 68, 0.45)",
        "glow-indigo": "0 0 30px -4px rgba(99, 102, 241, 0.45)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};
