/**
 * FIXONEX brand — marketing tone. Operational details: data/company.ts, data/social.ts.
 */
export const BRAND = {
  name: "FIXONEX",
  /** Logo line: “simply strong” */
  logoMotto: "Simply strong.",
  /** Primary customer-facing tagline */
  tagline: "Strong bond begins here.",
  description:
    "FIXONEX supplies professional tile adhesives (EN 12004 / IS 15477:2019 grades), block joining mortar, PU FIXO-999 two-component adhesive, stain-free epoxy grout, tile cleaners, and precision spacers—based in Ahmedabad, Gujarat, and available through dealers and direct product support.",
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
