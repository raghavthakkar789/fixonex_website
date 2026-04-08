import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        /** ~1240px with padding — premium industrial content width */
        content: "1280px",
      },
      colors: {
        /** Primary page canvas (beige) */
        canvas: "#C1B2A4",
        /** Secondary headings / industrial labels — NOT for body copy */
        subhead: "#2B2B2B",
        background: "#FFFFFF",
        foreground: "#111111",
        muted: {
          DEFAULT: "#F5F5F5",
          foreground: "#6B6B6B",
        },
        border: "#E0E0E0",
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#111111",
        },
        primary: {
          DEFAULT: "#D32F2F",
          foreground: "#FFFFFF",
          hover: "#B71C1C",
        },
        surface: {
          dark: "#2B2B2B",
        },
      },
      fontFamily: {
        heading: ["var(--font-poppins)", "system-ui", "sans-serif"],
        body: ["var(--font-roboto)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        /** Crisp edge + controlled depth — structured, not generic float */
        card: "0 1px 0 0 rgba(17, 17, 17, 0.07), 0 3px 12px rgba(17, 17, 17, 0.05)",
        "card-hover": "0 1px 0 0 rgba(17, 17, 17, 0.08), 0 10px 28px rgba(17, 17, 17, 0.09)",
        nav: "0 1px 0 0 rgba(17, 17, 17, 0.09)",
      },
      transitionTimingFunction: {
        industrial: "cubic-bezier(0.25, 0.1, 0.25, 1)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
