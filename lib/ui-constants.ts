/** Shared Tailwind class strings for consistent inline links in prose/body copy. */
export const proseInlineLinkClass =
  "font-medium text-foreground underline underline-offset-2 transition-colors hover:text-subhead focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background";

/**
 * Vertical rhythm for full-width `<section>` bands (home + marketing pages).
 * Inner pages should prefer `<PageSection spacing="…" />` where possible.
 */
export const sectionBand = {
  stripe: "py-6 sm:py-8",
  /** Dense interior bands inside a larger composed section */
  tight: "py-12 sm:py-14 lg:py-16",
  /** Primary marketing bands — generous vertical rhythm */
  main: "py-12 sm:py-16 md:py-[4.25rem] lg:py-24",
  /** Softer main — long narratives, connected sequences */
  mainSoft: "py-12 sm:py-16 lg:py-20",
  relaxed: "py-12 sm:py-16 lg:py-20",
  /** Hero / lead sections */
  hero: "py-12 sm:py-14 md:py-[4.5rem] lg:py-28",
  /** Secondary content band (e.g. home channels) */
  follow: "py-12 sm:py-16 lg:py-22",
} as const;

/** Soft horizontal rule — connects sub-parts without a hard section break */
export const sectionSublDividerClass =
  "mx-auto h-px max-w-[min(100%,42rem)] bg-gradient-to-r from-transparent via-border/55 to-transparent";

/** Vertical breathing room between chapters inside one composed zone */
export const sectionChapterGapClass = "mt-12 sm:mt-16 md:mt-20 lg:mt-24";

/** Magazine-style inset — lighter edge, softer lift (pairs with gradients / long reads) */
export const panelEditorialClass =
  "rounded-2xl border border-border/45 bg-background/90 px-5 py-7 shadow-[0_1px_0_rgba(17,17,17,0.05),0_20px_50px_-24px_rgba(17,17,17,0.1)] sm:px-7 sm:py-8 md:px-8 md:py-9 lg:px-10 lg:py-10";

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
