import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "#FFFFFF",
        black: "#111111",
        dark: "#2B2B2B",
        mid: "#6B6B6B",
        light: "#F5F5F5",
        border: "#E0E0E0",
        primary: "#D32F2F",
        "primary-dark": "#B71C1C",
        warm: "#C1B2A4",
        "warm-dark": "#A89585",
        "warm-dim": "rgba(193,178,164,0.12)",
        "accent-rose": "#FFEBEE",
        brand: "#111111",
        surface: "#F5F5F5",
        red: "#D32F2F",
        "red-dk": "#B71C1C",
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        hero: ["clamp(2.5rem,6vw,4rem)", { lineHeight: "1.08", fontWeight: "700" }],
        display: ["clamp(2rem,4vw,2.75rem)", { lineHeight: "1.12", fontWeight: "600" }],
      },
      borderRadius: {
        xs: "4px",
        sm: "8px",
        md: "12px",
        lg: "20px",
        xl: "32px",
        pill: "9999px",
      },
      boxShadow: {
        xs: "0 1px 3px rgba(0,0,0,0.05)",
        sm: "0 2px 8px rgba(0,0,0,0.06)",
        md: "0 4px 20px rgba(0,0,0,0.08)",
        lg: "0 12px 40px rgba(0,0,0,0.12)",
        xl: "0 24px 64px rgba(0,0,0,0.16)",
        nav: "0 2px 20px rgba(0,0,0,0.08)",
        warm: "0 8px 32px rgba(193,178,164,0.30)",
        red: "0 4px 24px rgba(211,47,47,0.35)",
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        26: "6.5rem",
        30: "7.5rem",
        34: "8.5rem",
      },
      maxWidth: {
        container: "1280px",
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      keyframes: {
        "help-pulse": {
          "0%": { transform: "scale(1)", opacity: "0.5" },
          "100%": { transform: "scale(1.35)", opacity: "0" },
        },
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "help-pulse": "help-pulse 3s ease-out infinite",
        ticker: "ticker 20s linear infinite",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
