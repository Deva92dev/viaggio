import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // ... your existing colors, fonts, etc.

      fontFamily: {
        // Set Inter as default sans-serif
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],

        // Poppins for display/headings
        display: ["var(--font-poppins)", "system-ui", "sans-serif"],

        // Keep mono
        mono: ["var(--font-geist-mono)", "monospace"],

        // Individual font access
        inter: ["var(--font-inter)"],
        poppins: ["var(--font-poppins)"],
      },

      keyframes: {
        // ... your existing keyframes
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-15px)" },
        },
      },
      animation: {
        // ... your existing animations
        "fade-in": "fadeIn 1s ease-out forwards",
        float: "float 6s ease-in-out infinite",
        "float-slow": "floatSlow 8s ease-in-out infinite",
      },
    },
  },
  plugins: [
    // ... your existing plugins
  ],
};

export default config;
