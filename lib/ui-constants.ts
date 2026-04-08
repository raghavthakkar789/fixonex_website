/** Shared Tailwind class strings for consistent inline links in prose/body copy. */
export const proseInlineLinkClass =
  "font-medium text-foreground underline underline-offset-2 transition-colors hover:text-subhead focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background";

/**
 * Vertical rhythm for full-width `<section>` bands (home + marketing pages).
 * Inner pages should prefer `<PageSection spacing="…" />` where possible.
 */
export const sectionBand = {
  stripe: "py-5 sm:py-6",
  tight: "py-9 sm:py-11 lg:py-12",
  /** Matches `PageSection` default spacing */
  main: "py-12 sm:py-16 lg:py-20",
  /** Softer main band for dense home sequences */
  mainSoft: "py-11 sm:py-14 lg:py-16",
  /** Between main and tight — guidance strips, secondary blocks */
  relaxed: "py-11 sm:py-14 lg:py-16",
  /** Hero / lead sections */
  hero: "py-12 sm:py-16 lg:py-[4.5rem]",
  /** Secondary content band (e.g. home channels) */
  follow: "py-10 sm:py-14 lg:py-16",
} as const;

/** White inset surface on canvas / muted (shell + shadow aligned with `Card`) */
export const panelSurfaceClass =
  "rounded-md border border-border bg-background p-5 shadow-card sm:p-7 lg:p-8";

/** Muted inset panel */
export const panelMutedClass =
  "rounded-md border border-border bg-muted p-5 shadow-card sm:p-7 lg:p-8";

/** Native `<select>` — matches `Input` chrome */
export const selectControlClass =
  "flex h-11 w-full cursor-pointer rounded-md border border-border bg-background px-3 text-sm text-foreground ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

/** Vertical stack between fields in enquiry forms */
export const formStackClass = "space-y-6";

/** Form intro / group title — matches section eyebrow discipline */
export const formTitleClass =
  "font-heading text-xs font-bold uppercase tracking-[0.14em] text-subhead";

/** Aside / spec-block micro headings (phone, email, social) */
export const asideMicroHeadingClass =
  "font-heading text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-subhead sm:text-xs";

/**
 * Page `<h1>` scale — aligned with `SectionHeading` (compact ≈ default h2 weight).
 */
export const pageTitleH1Compact =
  "font-heading text-[1.3125rem] font-bold leading-snug tracking-tight text-foreground min-[400px]:text-2xl sm:text-[1.75rem]";

export const pageTitleH1Large =
  "font-heading text-[1.5rem] font-bold leading-tight tracking-tight text-foreground min-[400px]:text-3xl sm:text-4xl";

/** Primary CTA copy — one industrial voice sitewide */
export const cta = {
  contact: "Contact FIXONEX",
  contactShort: "Contact",
  viewProducts: "View products",
  browseCatalogue: "Browse catalogue",
  rangeFinder: "Open range finder",
  guidance: "Product guidance",
  helpChoose: "Help me choose",
  submitEnquiry: "Submit enquiry",
  submitPartnership: "Submit partnership inquiry",
  sending: "Sending…",
  openGuide: "Open guide",
  viewRange: "View range",
  loadMore: "Load more",
  showLess: "Show less",
  allGuides: "All guides",
  faq: "FAQ",
  brandSupport: "FIXONEX Support",
  /** Product detail → support library */
  guidesOnSupport: "Guides & FAQ on Support",
  openSupport: "Open Support",
  goSupport: "Go to Support",
  whatsApp: "Message on WhatsApp",
  sendAnother: "Send another message",
  dealerAnother: "Submit another inquiry",
  seeAllFaq: "See all questions on Support",
  partnerWithUs: "Partner with us",
  talkTeam: "Contact the FIXONEX team",
} as const;
