import type { Config } from "tailwindcss";

/**
 * FIXONEX — Warm anchor shell `#C1B2A4`, alternating bands `#D6CBBF`, elevated cream/white,
 * neo + glass + red `#D32F2F`; terracotta accent `#D97846`.
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "#FFFFFF",
        neutral: {
          darkest: "#231F1D",
          dark: "#2C2622",
          mid: "#5E5247",
        },
        black: "#2C2622",
        dark: "#2C2622",
        mid: "#5E5247",
        muted: "#F5F0EB",
        "muted-foreground": "#6B6158",
        /** Canonical soft greige — main page canvas */
        anchor: "#C1B2A4",
        /** Alternate section band — lighter stone */
        "band-alt": "#D6CBBF",
        "faq-title": "#4A4036",
        "faq-body": "#5E5247",
        secondary: "#D6CBBF",
        elevated: "#FFFFFF",
        canvas: "#C1B2A4",
        "section-alt": "#D6CBBF",
        /** Chips, wells on greige backgrounds */
        chip: "#ADA293",
        "chip-dark": "#978A7E",
        "chip-dim": "rgba(173, 162, 147, 0.35)",
        surface: "#FAF8F6",
        border: "rgba(218, 210, 200, 0.95)",
        "border-strong": "#D4CCC2",
        "border-soft": "rgba(200, 190, 176, 0.55)",
        subhead: "#6B6158",
        charcoal: "#5E5247",
        ink: "#2C2622",
        foreground: "#2C2622",
        /** Body / shell background */
        background: "#C1B2A4",
        brand: "#2C2622",
        footer: "#B5A89C",
        "footer-muted": "#4A4036",
        "accent-rose": "#F5F0EB",
        "accent-cta": "#D32F2F",
        "accent-cta-hover": "#B71C1C",
        "off-white": "#FAF8F6",
        light: "#E8E0D6",
        red: "#D32F2F",
        "red-dk": "#B71C1C",
        primary: {
          DEFAULT: "#D32F2F",
          foreground: "#FFFFFF",
          dark: "#B71C1C",
          hover: "#B71C1C",
        },
        "primary-dark": "#B71C1C",
        terracotta: {
          DEFAULT: "#D97846",
          dark: "#C5693D",
          foreground: "#FFFFFF",
        },
        glass: {
          DEFAULT: "rgba(250, 248, 246, 0.78)",
          strong: "rgba(255, 255, 255, 0.9)",
        },
      },
      fontFamily: {
        display: ["var(--font-manrope)", "system-ui", "sans-serif"],
        heading: ["var(--font-manrope)", "system-ui", "sans-serif"],
        body: ["var(--font-merriweather)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-merriweather)", "Georgia", "serif"],
      },
      fontSize: {
        hero: ["clamp(2.5rem, 6vw, 4rem)", { lineHeight: "1.08", fontWeight: "700" }],
        display: ["clamp(2rem, 4vw, 3rem)", { lineHeight: "1.12", fontWeight: "600" }],
        "type-headline": ["clamp(2.25rem, 5vw, 3.25rem)", { lineHeight: "1.1", fontWeight: "600" }],
        "type-caption": ["0.6875rem", { lineHeight: "1.4", letterSpacing: "0.2em" }],
      },
      borderRadius: {
        xs: "4px",
        sm: "8px",
        md: "12px",
        lg: "16px",
        neo: "20px",
        xl: "32px",
        pill: "9999px",
        glass: "16px",
      },
      boxShadow: {
        xs: "0 1px 2px rgba(44, 38, 34, 0.05)",
        sm: "0 2px 8px rgba(44, 38, 34, 0.06)",
        md: "0 4px 16px rgba(44, 38, 34, 0.07)",
        lg: "0 8px 24px rgba(44, 38, 34, 0.08)",
        xl: "0 16px 40px rgba(44, 38, 34, 0.09)",
        nav: "var(--shadow-nav)",
        card: "var(--shadow-neo-rest)",
        soft: "0 2px 10px rgba(44, 38, 34, 0.055)",
        lift: "0 14px 36px rgba(44, 38, 34, 0.09)",
        surface: "0 8px 22px rgba(44, 38, 34, 0.06)",
        neo: "var(--shadow-neo-rest)",
        "neo-hover": "var(--shadow-neo-hover)",
        "neo-inset": "var(--shadow-neo-inset)",
        cta: "var(--shadow-cta)",
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
        content: "72rem",
        /** Consistent readable column for marketing copy */
        prose: "42rem",
        "section-inner": "70rem",
      },
      padding: {
        section: "clamp(2.25rem, 4vw, 3.25rem)",
      },
      transitionTimingFunction: {
        standard: "cubic-bezier(0.2, 0, 0.2, 1)",
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
