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

/**
 * Semantic palette — soft anchor `#C1B2A4`, primary red `#D32F2F`.
 * Mirrors CSS variables and Tailwind tokens.
 */
export const COLORS = {
  anchor: "#C1B2A4",
  sectionAlt: "#D6CBBF",
  elevated: "#FFFFFF",
  foreground: "#2C2622",
  background: "#C1B2A4",
  muted: "#6B6158",
  border: "#D4CCC2",
  primary: "#D32F2F",
  primaryHover: "#B71C1C",
  onPrimary: "#FFFFFF",
} as const;
