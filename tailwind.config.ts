import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "#FFFFFF",
        black: "#111111",
        dark: "#2B2B2B",
        mid: "#5C5650",
        light: "#EDE8E2",
        border: "#E4DDD4",
        primary: "#D32F2F",
        "primary-dark": "#B71C1C",
        warm: "#C1B2A4",
        "warm-dark": "#A89585",
        "warm-dim": "rgba(193,178,164,0.12)",
        "accent-rose": "#FFEBEE",
        brand: "#111111",
        surface: "#F7F3EE",
        red: "#D32F2F",
        "red-dk": "#B71C1C",
        foreground: "#111111",
        background: "#F7F3EE",
        muted: "#EDE6DE",
        "muted-foreground": "#5C5650",
        subhead: "#7A6B5E",
      },
      fontFamily: {
        display: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        heading: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        hero: ["clamp(2.65rem,6.2vw,4.25rem)", { lineHeight: "1.06", fontWeight: "700" }],
        display: ["clamp(2.1rem,4.2vw,3rem)", { lineHeight: "1.14", fontWeight: "600" }],
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
        pop: "0 14px 36px rgba(0,0,0,0.07), 16px 22px 52px rgba(255,94,108,0.16), -14px -10px 44px rgba(56,189,248,0.13), 8px 28px 48px rgba(251,191,36,0.11), 0 0 72px rgba(167,139,250,0.06)",
        "pop-sm":
          "0 10px 28px rgba(0,0,0,0.07), 18px 14px 46px rgba(255,94,108,0.17), -12px 20px 50px rgba(56,189,248,0.12), 10px 26px 44px rgba(251,191,36,0.1)",
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
      backgroundImage: {
        "mesh-warm":
          "radial-gradient(ellipse 120% 80% at 0% 0%, rgba(193,178,164,0.35), transparent 50%), radial-gradient(ellipse 90% 70% at 100% 10%, rgba(211,47,47,0.08), transparent 45%), radial-gradient(ellipse 60% 50% at 50% 100%, rgba(255,255,255,0.9), transparent 55%)",
        "mesh-hero":
          "radial-gradient(circle at 18% 22%, rgba(193,178,164,0.32), transparent 42%), radial-gradient(circle at 92% 18%, rgba(211,47,47,0.16), transparent 38%), radial-gradient(circle at 72% 88%, rgba(56,189,248,0.08), transparent 45%), radial-gradient(circle at 8% 78%, rgba(251,191,36,0.07), transparent 42%), linear-gradient(165deg, rgba(17,17,17,0.94) 0%, rgba(17,17,17,0.76) 100%)",
        "stripe-soft":
          "repeating-linear-gradient(115deg, transparent, transparent 12px, rgba(193,178,164,0.06) 12px, rgba(193,178,164,0.06) 24px)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
