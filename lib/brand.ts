/**
 * FIXONEX brand — marketing tone. Operational details: data/company.ts, data/social.ts.
 */
export const BRAND = {
  name: "FIXONEX",
  logoMotto: "Simply strong.",
  /** Primary customer-facing tagline */
  tagline: "Strong Bond Begins Here.",
  /** Companion line in Hindi — use sparingly alongside English */
  taglineHi: "Mazboot jod. Bharosemand result.",
  description:
    "FIXONEX: Premium tile and stone solutions, trusted for reliability, expertise, and enduring quality.",
} as const;

/** Reference palette (mirrors tailwind.config.ts) for non-Tailwind contexts */
export const COLORS = {
  background: "#FFFFFF",
  foreground: "#111111",
  surfaceDark: "#2B2B2B",
  mutedText: "#6B6B6B",
  mutedBg: "#F5F5F5",
  border: "#E0E0E0",
  primary: "#D32F2F",
  primaryHover: "#B71C1C",
} as const;

/*
"#FFFFFF",
"#111111",
"#2B2B2B",
"#6B6B6B",
"#F5F5F5",
"#E0E0E0",
"#D32F2F",
"#B71C1C",
"#C1B2A4",
*/