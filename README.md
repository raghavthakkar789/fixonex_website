# FIXONEX Website

![Next.js](https://img.shields.io/badge/Next.js-16.2.3-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38BDF8?logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-E5008E?logo=framer&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-0.183-000000?logo=threedotjs&logoColor=white)
![License](https://img.shields.io/badge/License-Proprietary-red)

---

## Overview

- Production marketing site for **FIXONEX** (Ahmedabad, India) — a construction-chemical brand for tile adhesives, block-joining mortar, PU FIXO-999, epoxy grout, tile cleaners, and spacers.
- **Audience:** architects, contractors, dealers/distributors, and end customers evaluating tile-installation systems.
- **Value proposition:** industrial, premium visual language + structured product catalog + guided product-selection flow + validated lead-capture forms.
- **Deployment target:** static export (`output: "export"`) for GitHub Pages / any static host.

---

## Tech Stack

| Layer | Technology |
| --- | --- |
| Framework | **Next.js 16.2.3** (App Router, static export) |
| UI library | **React 19.2** + **React DOM 19.2** |
| Language | **TypeScript 5.7** (strict) |
| Styling | **Tailwind CSS 3.4** + `@tailwindcss/typography` + `tailwind-merge` + `clsx` |
| Animation | **Framer Motion 12**, **Lenis** (smooth scroll) |
| 3D / visuals | **Three.js 0.183**, `@react-three/fiber`, `@react-three/drei` |
| UI primitives | **Radix UI** (`accordion`, `label`, `slot`) + `class-variance-authority` |
| Icons | **lucide-react** |
| Fonts | **DM Sans** (display/heading) + **Inter** (body) via `next/font/google` |
| Forms | **react-hook-form** + mock client submit (`lib/form-submit.ts`) |
| Tooling | ESLint 9 (`next/core-web-vitals`, `next/typescript`), PostCSS, Autoprefixer |
| CI / hosting | GitHub Actions → GitHub Pages (`.github/workflows/nextjs.yml`, `pages.yml`) |

---

## Project Structure

```text
fixonex_website/
├── app/                          # Next.js App Router routes
│   ├── layout.tsx                # Root layout: fonts, <AppFrame>, metadata
│   ├── page.tsx                  # Home route → renders <HomeView />
│   ├── globals.css               # Tailwind layers + base tokens
│   ├── icon.svg                  # Favicon
│   ├── about/                    # /about — brand story + capabilities
│   ├── contact/                  # /contact — inquiry form + direct contacts
│   ├── partner/                  # /partner — dealer/distributor form
│   ├── support/                  # /support — guides, FAQs, safety
│   │   └── guides/[id]/          # /support/guides/[id] — SSG guide article
│   ├── products/                 # /products — catalog + selection guide
│   │   ├── [slug]/               # /products/[slug] — generic SSG detail
│   │   └── tiles-adhesive/       # /products/tiles-adhesive — family hub
│   │       ├── fix-111 … fix-555 # SSG detail pages per adhesive grade
│   ├── why-fixonex/              # /why-fixonex — differentiators page
│   └── (legacy redirects)        # faq, get-help, company-info, connect,
│                                 # how-to-use, services, testimonials,
│                                 # projects, book-consultation, dealer-inquiry
├── components/
│   ├── layout/                   # AppFrame, Navbar, Footer, ScrollToTop,
│   │                             # StickyGetHelp, StickyHelpButton, LenisProvider,
│   │                             # InitialLoader, CursorFollower, PageSection, ContentSplit
│   ├── sections/                 # Hero, PageBanner, CTASection, ProductCard, SocialLinksGrid, SectionHeading
│   ├── home/HomeView.tsx         # Full composed Home page view
│   ├── products/                 # ProductGridWithFilter, ProductGuidanceSection, TilesAdhesiveDetailPage
│   ├── forms/                    # ContactForm, DealerInquiryForm, form-feedback
│   ├── faq/                      # FaqAccordion, FaqWithFilters
│   ├── get-help/                 # RecommendationWizard
│   ├── support/                  # SupportLibraryGrid
│   ├── content/                  # Expandable{Section,Paragraphs,BulletList,Answer}
│   ├── media/                    # MediaPlaceholder
│   ├── legacy/                   # ClientRedirect (for static-export compatible redirects)
│   └── ui/                       # Button, Input, Label, Textarea, Card, Accordion,
│                                 # FAQAccordion, PageHero, ProductCard, BlogCard,
│                                 # FeatureCard, StepCard, StatsStrip, CTALight, CTADark,
│                                 # TestimonialCard, LeadershipCard, SectionLabel,
│                                 # ImageWithFallback
├── data/                         # Editable business content (non-secret)
│   ├── company.ts                # Address, phone, email, map URL, hours
│   ├── social.ts                 # Social links
│   ├── navigation.ts             # Top-nav labels + hrefs
│   ├── products.ts               # Category + SKU catalog
│   ├── faqs.ts                   # FAQ content
│   ├── testimonials.ts           # Testimonial quotes
│   ├── projects.ts               # Project gallery entries
│   ├── founders.ts               # Founder profiles
│   ├── help-recommendations.ts   # Rules for RecommendationWizard
│   ├── how-to-use.ts             # Step-by-step guides
│   └── support-guides.ts         # Support article index
├── lib/
│   ├── brand.ts                  # BRAND constants + COLORS reference
│   ├── utils.ts                  # cn() classname helper
│   ├── form-submit.ts            # mockSubmitForm() placeholder
│   ├── motion.ts                 # Shared framer-motion variants
│   ├── ui-constants.ts           # Repeated className tokens (cta, panels, prose)
│   ├── social-icons.ts           # Map: platform → lucide icon
│   ├── useCountUp.ts             # Animated counter hook
│   ├── useMouseParallax.ts       # Pointer-driven parallax hook
│   ├── useReducedMotion.ts       # prefers-reduced-motion hook
│   └── data/                     # products, team, testimonials, faqs, home-faqs, support-faqs
├── hooks/
│   ├── useActiveNav.ts           # Active section tracking for navbar
│   └── useScrollReveal.ts        # IntersectionObserver reveal hook
├── types/index.ts                # ProductCategory, ProductSku, shared types
├── public/                       # Static assets (images/, robots.txt)
├── styles/                       # Reserved for extra stylesheets (global tokens live in app/globals.css)
├── scripts/                      # Utility scripts folder (placeholder)
├── .github/workflows/            # GitHub Actions (nextjs.yml, pages.yml)
├── next.config.mjs               # Static export, redirects, basePath
├── tailwind.config.ts            # Theme tokens, keyframes, plugins
├── tsconfig.json                 # Path alias @/* → ./*
├── postcss.config.mjs            # Tailwind + Autoprefixer
├── .eslintrc.json                # next/core-web-vitals + next/typescript
├── .env.local.example            # Env variable scaffold
├── RUNNING_THE_PROJECT.md        # Run/build walkthrough
└── package.json
```

---

## Pages / Screens / Routes

### Primary routes

#### `/` — Home
- **Purpose:** brand hero + top-of-funnel marketing
- **Component:** `components/home/HomeView.tsx`
- **Sections:**
  - Hero (animated headline, dual CTA, product ticker)
  - Company intro + animated stat cells (`useCountUp`)
  - Why FIXONEX (4 feature cards)
  - Product range (3 categories)
  - Product-guidance teaser (3-step line)
  - Support teaser (install / precautions / FAQ)
  - Services strip (consultation / guidance / dealer network)
  - Projects grid (6 tiles)
  - Testimonials (`lib/data/testimonials`)
  - FAQ preview (`lib/data/home-faqs`)
  - `<StatsStrip>` + `<CTALight>` + `<CTADark>`
- **Notable logic:** framer-motion reveal, `useReducedMotion` guard, infinite ticker, `useInView` count-up

#### `/products` — Product catalog
- **Purpose:** category index + selection guidance
- **Sections:** page hero → overview + 3-step selector → feature card for Tiles Adhesive family + non-adhesive product cards → surface-to-product mapping table → contact CTA
- **Notable logic:** filters tile-adhesive SKUs from the general `products` list (the family has a dedicated hub)

#### `/products/[slug]` — Generic product detail (SSG)
- **Purpose:** detail page for non-adhesive products (epoxy, PU, cleaner, spacer, block mortar)
- **Sections:** hero → "What it is" + standard → "Where to Use" → benefit cards → "Usage on Site" steps → variants/sizes (+ optional epoxy color swatches) → help card → related products → `<CTADark>`
- **Notable logic:** `generateStaticParams()` from `products`; `notFound()` for unknown slugs; `redirect()` to `/products/tiles-adhesive/[subSlug]` when a tile-adhesive slug lands here

#### `/products/tiles-adhesive` — Tiles Adhesive family hub
- **Purpose:** overview of FIX 111–555 range, surface→product map
- **Sections:** hero → grade cards (C1T → C2TES2) → use-case grid → selection-guide CTA

#### `/products/tiles-adhesive/fix-111` … `/fix-555`
- **Purpose:** SKU detail pages (`FIX 111`, `222`, `333`, `444`, `555`)
- **Component:** `components/products/TilesAdhesiveDetailPage.tsx` invoked with a `subSlug` prop
- **Sections:** banner → classification → surfaces/uses → mix & apply steps → safety → related SKUs

#### `/about` — About FIXONEX
- **Purpose:** brand story, capabilities, mission
- **Sections:** hero → decade-of-expertise intro → capabilities (3 cards) → mission list → leadership/founders teaser
- **Notable logic:** reads `BRAND` constants from `lib/brand.ts`

#### `/support` — Support hub
- **Purpose:** installation guides + FAQs + safety
- **Sections:** hero → install timeline (6 steps) → guide library with "Load more" → safety notes → FAQ with "Load more"
- **Notable logic:** client component; progressive reveal (`FAQ_INITIAL=5`, `GUIDE_INITIAL=6`); auto-scrolls to `#faq` when hash present

#### `/support/guides/[id]` — Support guide article (SSG)
- **Purpose:** long-form how-to article
- **Notable logic:** `generateStaticParams()` from `supportGuides`; per-guide `generateMetadata()`; `notFound()` on missing id

#### `/contact` — Contact
- **Purpose:** inquiry submission + direct channels
- **Sections:** hero → contact form (full name, phone, email, inquiry type, message) → phone/email/map/WhatsApp/social panel
- **Notable logic:** `react-hook-form` with inline validation; simulated async submit; success state after reset

#### `/partner` — Partner / dealer
- **Purpose:** dealer & distributor onboarding
- **Sections:** hero → benefits (margins, marketing support, training) → dealer form (business name, contact, phone, city, type, message) → "Why partner" pills
- **Notable logic:** `react-hook-form` with mock submit

#### `/why-fixonex` — Differentiators
- **Purpose:** reasons to choose FIXONEX
- **Sections:** hero → 6 reason cards → stat strip → CTA

### Legacy routes (client-side redirects — static-export friendly)

| Legacy route | Redirects to | File |
| --- | --- | --- |
| `/faq` | `/support` | `app/faq/page.tsx` |
| `/get-help` | `/products` | `app/get-help/page.tsx` |
| `/company-info` | `/about` | `app/company-info/page.tsx` |
| `/connect` | `/contact` | `app/connect/page.tsx` |
| `/how-to-use` | `/support` | `app/how-to-use/page.tsx` |
| `/services` | `/about` | `app/services/page.tsx` |
| `/testimonials` | `/` | `app/testimonials/page.tsx` |
| `/projects` | `/` | `app/projects/page.tsx` |
| `/book-consultation` | `/contact` | `app/book-consultation/page.tsx` |
| `/dealer-inquiry` | `/partner` | `app/dealer-inquiry/page.tsx` |

All use `<ClientRedirect />` (`components/legacy/ClientRedirect.tsx`). `next.config.mjs` also declares server-side `redirects()` for old `/products/fix-*` paths → `/products/tiles-adhesive/fix-*`.

---

## Key Features

- Static-export-ready Next.js App Router site (GitHub Pages deploy via Actions)
- Animated hero with word-by-word reveal + infinite product ticker
- Structured product catalog (category + SKU) with filter + related items
- Deep-linked tile-adhesive detail pages (FIX 111 → FIX 555 / C1T → C2TES2)
- Surface-to-product selection guide tables
- `RecommendationWizard` (rule-driven adhesive suggestions)
- Support hub: installation timeline, load-more guide/FAQ lists, in-page `#faq` anchor
- Client-validated contact + dealer forms with success/error UI (`react-hook-form`)
- Legacy URL compatibility via `ClientRedirect` + `next.config` redirects
- Accessibility: skip-to-main link, semantic landmarks, `prefers-reduced-motion` respect, focus-visible styling
- Design tokens in Tailwind (brand palette, typography scale, custom shadows, mesh gradients, keyframes)
- `prefers-reduced-motion`-aware Framer Motion variants + Lenis smooth scroll
- `ImageWithFallback` with graceful placeholder and `next/image` compatible props
- Sticky "Get Help" shortcut + scroll-to-top

---

## Getting Started

### Prerequisites

- **Node.js** 20.x LTS or 22.x LTS (recommended: 20.18+ or 22.12+)
- **npm** 10+ (ships with Node)

Verify:

```bash
node -v
npm -v
```

### Installation

```bash
git clone <repo-url>
cd fixonex_website
npm install
```

### Environment variables

Copy the scaffold and fill in only what you wire up (the site runs with none of these set):

```bash
# Windows
copy .env.local.example .env.local
# macOS / Linux
cp .env.local.example .env.local
```

| Variable | Purpose | Example / placeholder |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL (OG, sitemap) | `https://www.your-domain.com` |
| `CONTACT_FORM_WEBHOOK_URL` | Contact-form webhook target (server-side) | `https://hooks.example.com/xyz` |
| `RESEND_API_KEY` | Transactional email (Resend) | `re_xxx` |
| `CONTACT_EMAIL_TO` | Destination inbox for contact submissions | `info@fixonex.com` |
| `NEXT_PUBLIC_ANALYTICS_ID` | Analytics provider id (public) | `G-XXXXXXX` |
| `BASE_PATH` | Set by GitHub Actions for project pages (`/repo-name`) | `/fixonex_website` |

> No secrets are required for local development — forms currently call `mockSubmitForm` in `lib/form-submit.ts`.

### Run locally

```bash
npm run dev       # dev server → http://localhost:3000
npm run build     # production build + static export → ./out
npm run start     # serve production build (after next build on non-export setups)
npm run lint      # ESLint
```

---

## API / Data Flow

- **No backend** is bundled. All content is sourced from typed TypeScript modules under `data/` and `lib/data/`:
  - `data/products.ts` + `lib/data/products.ts` → catalog and SKU lookups
  - `data/faqs.ts` + `lib/data/faqs.ts` + `lib/data/home-faqs.ts` + `lib/data/support-faqs.ts` → FAQ content
  - `lib/data/testimonials.ts` + `lib/data/team.ts` → social proof and people
  - `data/support-guides.ts` + `data/how-to-use.ts` → support articles and steps
  - `data/help-recommendations.ts` → rules for `RecommendationWizard`
  - `data/company.ts` + `data/social.ts` + `data/navigation.ts` → contact, social, nav
- **Forms:** `components/forms/ContactForm.tsx` and `DealerInquiryForm.tsx` validate via `react-hook-form` and call `mockSubmitForm()` (simulated latency, always succeeds). Swap with a Server Action or Route Handler to integrate real email / CRM.
- **Static generation:** `generateStaticParams()` in `app/products/[slug]/page.tsx` and `app/support/guides/[id]/page.tsx` pre-renders all detail pages at build time.
- **Redirects:** server-side redirects declared in `next.config.mjs`; legacy routes use client-side `<ClientRedirect />` to remain static-export compatible.

---

## Component Library / Shared Modules

### Layout
- `AppFrame` — wraps children with Navbar + Footer + ScrollToTop + StickyGetHelp + LenisProvider
- `Navbar`, `Footer`, `ScrollToTop`, `StickyGetHelp`, `StickyHelpButton`
- `LenisProvider` — smooth scroll
- `InitialLoader`, `CursorFollower`, `PageSection`, `ContentSplit`

### Sections
- `Hero`, `PageBanner`, `CTASection`, `SectionHeading`, `SocialLinksGrid`, `ProductCard`

### UI primitives
- `Button` (with `variant` + `size` via `class-variance-authority`), `Input`, `Label`, `Textarea`, `Card`, `Accordion`
- `FAQAccordion`, `PageHero`, `ProductCard`, `TestimonialCard`, `LeadershipCard`
- `FeatureCard`, `BlogCard`, `StepCard`, `StatsStrip`, `SectionLabel`
- `CTALight`, `CTADark`
- `ImageWithFallback` — resilient `next/image` wrapper

### Forms
- `ContactForm`, `DealerInquiryForm`, `form-feedback`

### Feature components
- `components/products/ProductGridWithFilter` — category filter
- `components/products/ProductGuidanceSection` — quick-select surface→product matrix
- `components/products/TilesAdhesiveDetailPage` — shared renderer for FIX 111–555
- `components/get-help/RecommendationWizard` — rule-driven adhesive picker
- `components/support/SupportLibraryGrid`
- `components/faq/{FaqAccordion,FaqWithFilters}`
- `components/content/{ExpandableSection,ExpandableParagraphs,ExpandableBulletList,ExpandableAnswer}`
- `components/legacy/ClientRedirect` — static-export legacy URL handler

### Hooks & utilities
- `lib/utils.ts` → `cn()` (tailwind-merge + clsx)
- `lib/form-submit.ts` → `mockSubmitForm`, `FormStatus`
- `lib/brand.ts` → `BRAND`, `COLORS`
- `lib/motion.ts` → shared motion variants
- `lib/ui-constants.ts` → reusable class tokens (`cta`, `panelSurfaceClass`, `proseInlineLinkClass`, etc.)
- `lib/social-icons.ts` → platform → lucide icon map
- `lib/useCountUp.ts` — animated stat counter
- `lib/useMouseParallax.ts` — pointer parallax
- `lib/useReducedMotion.ts` — motion preference
- `hooks/useActiveNav.ts` — active section tracking for navbar
- `hooks/useScrollReveal.ts` — IntersectionObserver reveal

---

## Configuration

| File | Controls |
| --- | --- |
| `next.config.mjs` | `output: "export"`, `trailingSlash`, unoptimized images, `basePath`/`assetPrefix` from `BASE_PATH`, legacy `/products/fix-*` redirects, `outputFileTracingRoot`, dev-indicators off |
| `tailwind.config.ts` | Content paths (`app`, `components`), brand palette, `font-display`/`font-heading`/`font-body` (DM Sans + Inter), custom shadows (`warm`, `red`, `nav`), spacing scale, `help-pulse` + `ticker` keyframes, mesh backgrounds, typography plugin |
| `postcss.config.mjs` | Tailwind + Autoprefixer |
| `tsconfig.json` | Strict TS, `@/*` path alias → `./*`, Next plugin, ES2017 target, `jsx: react-jsx` |
| `.eslintrc.json` | Extends `next/core-web-vitals` + `next/typescript` |
| `.github/workflows/nextjs.yml` + `pages.yml` | CI: build + deploy static export to GitHub Pages on `main` |
| `.env.local.example` | Env scaffold (see table above) |
| `.gitignore` | Node/Next/build/env/IDE/OS artifacts |
| `app/layout.tsx` | Root metadata (`metadataBase`, title template, OG) + global fonts |
| `app/globals.css` | Tailwind layers + utility classes (`site-container`, `section-pad`, `surface-card`, `heading-accent`, `skip-to-main`) |

---

## Scripts

From `package.json`:

| Script | Command | Purpose |
| --- | --- | --- |
| `dev` | `next dev --webpack` | Start dev server with HMR on `http://localhost:3000` |
| `build` | `next build --webpack` | Production compile + static export to `./out` |
| `start` | `next start` | Serve the production build (for non-export smoke tests) |
| `lint` | `next lint` | Run ESLint across the project |

---

## Contributing

1. Fork the repository and create a feature branch from `main`.
2. Install dependencies: `npm install`.
3. Follow the existing code style — strict TypeScript, Tailwind utility-first, `cn()` for conditional classes, `react-hook-form` for forms, lucide-react for icons.
4. Keep content edits inside `data/` and `lib/data/` (never hardcode copy into components).
5. Add/adjust motion via `lib/motion.ts` and respect `useReducedMotion`.
6. Run `npm run lint` and `npm run build` before opening a PR.
7. Use conventional commit messages (`feat:`, `fix:`, `chore:`, `docs:` …).
8. Open a PR with a clear description, screenshots for UI changes, and reference any related issue.

> Contribution guidelines are a placeholder — adjust to your team's policy (code of conduct, DCO/CLA, review SLA) as required.

---

## License

© FIXONEX. All rights reserved. Proprietary — adjust as required for your organization.
