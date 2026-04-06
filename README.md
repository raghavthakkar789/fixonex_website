# FIXONEX Website

Production-oriented marketing site for **FIXONEX** (Ahmedabad): tile adhesives, block joining mortar, PU FIXO-999, epoxy grout, cleaners, and spacers.

## Purpose

- Present the FIXONEX brand with an industrial, premium, and trustworthy visual language.
- Showcase product categories and deep-linked detail pages driven by structured data.
- Collect inquiries, consultation requests, and dealer partnership leads through validated frontend forms (mock submission until a backend is connected).
- Guide visitors with an on-page **product guidance** wizard, a Support hub with article-style how-tos and FAQs, and a sticky **Get Help** shortcut to contact.

## Tech stack

| Layer | Choice |
| --- | --- |
| Framework | **Next.js 15** (App Router) |
| Language | **TypeScript** |
| Styling | **Tailwind CSS** |
| UI primitives | **Radix UI** (accordion, label, slot) + **class-variance-authority** |
| Icons | **Lucide React** |
| Fonts | **Poppins** (headings) + **Roboto** (body) via `next/font` |

## Design system summary

- **Palette:** strict white / black / gray foundation with **red accent only** (`#D32F2F`, hover `#B71C1C`).
- **Density:** generous spacing, clear sectioning, minimal corner radius (`rounded-sm` where needed).
- **Tone:** professional, non-playful, no gradients-as-decoration, no glassmorphism or neon.
- **Accessibility:** semantic landmarks, labels on form controls, focus rings using brand red, readable contrast on body copy.

### Color tokens (reference)

| Token | Hex | Usage |
| --- | --- | --- |
| Background | `#FFFFFF` | Page surface |
| Primary text | `#111111` | Body emphasis |
| Dark surface | `#2B2B2B` | Footer, stat band |
| Muted text | `#6B6B6B` | Supporting copy |
| Muted section | `#F5F5F5` | Alternating bands |
| Border | `#E0E0E0` | Dividers, cards |
| Accent | `#D32F2F` | CTAs, active nav, highlights |
| Accent hover | `#B71C1C` | Interactive hover |

Canonical Tailwind extensions live in `tailwind.config.ts`; marketing constants in `lib/brand.ts`.

### Typography

- **Headings:** Poppins (`font-heading`)
- **Body:** Roboto (`font-body`)

## Project structure

```
app/                    # App Router routes + layouts
  layout.tsx            # Root layout: fonts, Navbar, Footer, ScrollToTop, StickyGetHelp
  globals.css           # Tailwind layers + base body styles
  icon.svg              # App icon / favicon
  page.tsx              # Home
  about/
  products/
    [slug]/             # Static product detail pages
  support/              # Guides, steps, FAQs
  partner/              # Dealer / distributor inquiry
  contact/
  # Legacy URLs (thin pages → client redirect to the targets above):
  company-info/ book-consultation/ connect/ get-help/ how-to-use/ services/
  projects/ testimonials/ faq/ dealer-inquiry/
components/
  layout/               # Navbar, Footer, ScrollToTop, StickyGetHelp, PageSection
  sections/             # Hero, banners, CTAs, cards
  ui/                   # Button, Input, Card, Accordion, etc.
  forms/                # Contact and dealer forms (shared feedback UI)
  get-help/             # RecommendationWizard
  faq/                  # FaqAccordion, FaqWithFilters (topic tabs + uses `faqsByCategory`)
  products/             # Product grid + filter
data/                   # Editable content & rules (no secrets)
lib/                    # brand tokens, cn(), form helpers, social-icons map (single source for Lucide icons)
types/                  # Shared TypeScript types
public/                 # Static assets (add photography here)
styles/                 # Reserved for additional stylesheets (global tokens live in app/globals.css)
```

## Page overview

| Route | Description |
| --- | --- |
| `/` | Home: hero, story, products, trust, proof, FAQ preview, guidance, help, stats, CTA |
| `/products` | Categories, filters, on-page guidance wizard (`#product-guidance`), link to Support |
| `/products/[slug]` | Detail pages for each category (SSG) |
| `/about` | Brand story, company details, office & map (see `data/company.ts`) |
| `/support` | Article-style how-tos, on-site steps, safety notes, full FAQ |
| `/contact` | Inquiry form + direct contact + WhatsApp + social |
| `/partner` | Why partner + dealer/distributor form |
| Legacy routes (`/faq`, `/get-help`, `/company-info`, `/book-consultation`, `/dealer-inquiry`, `/how-to-use`, `/services`, `/projects`, `/testimonials`, `/connect`) | Thin pages that **redirect in the browser** to the destinations above (static export–friendly). |

## Editable content areas

| Content | File(s) |
| --- | --- |
| Company address, phone, email, map URLs, WhatsApp | `data/company.ts` |
| Social links | `data/social.ts` |
| Product copy and slugs | `data/products.ts` |
| FAQs | `data/faqs.ts` |
| Testimonials | `data/testimonials.ts` |
| Projects / gallery | `data/projects.ts` |
| Help wizard rules | `data/help-recommendations.ts` |
| How-to articles / steps / safety | `data/how-to-use.ts` (consumed by `data/support-guides.ts`) |
| Navigation labels | `data/navigation.ts` |
| Brand strings / palette reference | `lib/brand.ts` |
| Default SEO base URL | `app/layout.tsx` → `metadataBase` |

## Forms

- **Contact** and **dealer** forms are client components with field validation and success states (consultation flows use the contact page).
- Submissions call `mockSubmitForm` in `lib/form-submit.ts`, which simulates latency and always succeeds unless you change it for testing.
- **Integration path:** replace the mock with a **Server Action** or **Route Handler** (`app/api/...`) that reads server-only environment variables (email API keys, CRM webhooks). Never expose secrets in client bundles.
- See `.env.local.example` for optional variable names.

## Future enhancements

- Wire forms to transactional email (e.g. Resend) or CRM webhooks.
- Add `sitemap.ts` / `robots.ts` once `metadataBase` is final.
- Replace placeholder map embed and project imagery with cleared photography.
- Add `next/image` optimized assets in `public/` for product and project photos.
- Internationalization if you expand beyond English copy.
- Authenticated dealer portal (separate app or route group) if channel complexity grows.

## Deployment notes

1. Set `metadataBase` in `app/layout.tsx` to your canonical production URL for correct social previews.
2. Update `data/company.ts` and `data/social.ts` with production-ready values.
3. Configure environment variables on the host for any server-side integrations.
4. Run `npm run build` in CI before deploy; fail the pipeline on TypeScript or ESLint errors if desired.
5. For static export needs, evaluate Next.js `output: 'export'` separately—this project targets standard Node hosting by default.

## Documentation index

- **Run & build instructions:** [RUNNING_THE_PROJECT.md](./RUNNING_THE_PROJECT.md)
- **Environment template:** [.env.local.example](./.env.local.example)

## License

© FIXONEX. All rights reserved. Adjust as required for your organization.
