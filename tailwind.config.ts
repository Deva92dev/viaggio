import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        floatSlowCustom: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        spinSlow: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        spin: {
          "0%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(90deg)" },
          "50%": { transform: "rotate(180deg)" },
          "75%": { transform: "rotate(270deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        scaleIn: {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
        pulseCustom: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        compassRotate: {
          "0%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(5deg)" },
          "50%": { transform: "rotate(0deg)" },
          "75%": { transform: "rotate(-5deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
        floatHeart: {
          "0%": { opacity: "0", transform: "translateY(0) scale(0)" },
          "30%": { opacity: "1", transform: "translateY(-10px) scale(1)" },
          "100%": { opacity: "0", transform: "translateY(-20px) scale(0.5)" },
        },
        enhancedPing: {
          "0%": { transform: "scale(1)", opacity: "1" },
          "75%, 100%": { transform: "scale(2)", opacity: "0" },
        },
      },
      animation: {
        floatSlowCustom: "floatSlowCustom 8s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        "spin-slow": "spinSlow 3s linear infinite",
        "fade-in": "fadeIn 1s ease-out forwards",
        "float-slow": "float 8s ease-in-out infinite",
        "scale-in": "scaleIn 1.5s ease-out forwards",
        "pulse-custom": "pulseCustom 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        compass: "compassRotate 4s ease-in-out infinite",
        "float-heart": "floatHeart 2s ease-out infinite",
        "enhanced-ping": "enhancedPing 1s cubic-bezier(0, 0, 0.2, 1) infinite",
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".will-change-transform": { willChange: "transform" },
        ".will-change-transform-opacity": { willChange: "transform, opacity" },
        ".will-change-auto": { willChange: "auto" },
      });
    }),
  ],
};

export default config;
