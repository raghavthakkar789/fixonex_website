"use client";

import { TransitionLink } from "@/components/navigation/TransitionLink";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Building2,
  Grid3X3,
  Headset,
  HelpCircle,
  Layers,
  MapPin,
  MessageCircle,
  Package,
  Palette,
  PhoneCall,
  Search,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { TestimonialCard } from "@/components/ui/TestimonialCard";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { BRAND } from "@/lib/brand";
import { homeFaqs } from "@/lib/data/home-faqs";
import { testimonials } from "@/lib/data/testimonials";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { cn } from "@/lib/utils";

const FAQ_PREVIEW = homeFaqs.slice(0, 6);

const FAQ_CATEGORIES = [
  { title: "Products & specs", items: FAQ_PREVIEW.slice(0, 3) },
  { title: "Orders & site", items: FAQ_PREVIEW.slice(3, 6) },
] as const;

const testimonialExtras = [
  { projectLabel: "Jaipur commercial facade" },
  { projectLabel: "Ahmedabad showroom retail" },
  { projectLabel: "Commercial podium decks" },
] as const;

const projectPreviews = [
  {
    title: "Narayan Exotica retail build-out",
    location: "Ahmedabad, Gujarat",
    year: "2023",
    category: "Commercial",
    line: "Interior specification: wall and floor systems with matched epoxy joints for high daily traffic.",
  },
  {
    title: "Jaipur facade remediation",
    location: "Rajasthan",
    year: "2024",
    category: "Commercial",
    line: "Exterior ceramic and stone: C2TES2 adhesive cycle through monsoon exposure—batch traceability on site.",
  },
  {
    title: "Commercial podium decks",
    location: "Western India",
    year: "2022",
    category: "Industrial",
    line: "Repeatable drum viscosity across slab pours; crew training aligned to one FIXONEX product map.",
  },
] as const;

function HeroWords({
  words,
  className,
  wordClassName,
  delay = 0,
}: {
  words: string[];
  className?: string;
  wordClassName?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <span className={cn("flex flex-wrap gap-x-[0.35em] gap-y-1", className)}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden">
          <motion.span
            className={cn("inline-block", wordClassName)}
            initial={reduced ? false : { y: "100%", opacity: 0 }}
            animate={reduced ? undefined : { y: 0, opacity: 1 }}
            transition={{ duration: 0.35, delay: delay + i * 0.07, ease: [0.2, 0, 0.2, 1] }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

const productRange = [
  {
    title: "Tile adhesives",
    icon: Grid3X3,
    badge: "Pro Grade",
    desc: "Five certified grades — interior to heavy industrial.",
    italic: "From interior ceramic to façade-grade flexibility.",
    href: "/products",
    techHref: "/products/tiles-adhesive",
    image: "/images/products/fix-111.png",
  },
  {
    title: "Epoxy grout",
    icon: Palette,
    badge: "Designer range",
    desc: "Stain-resistant, 20+ colours, pool to kitchen.",
    italic: "Keeps showroom floors honest under real traffic.",
    href: "/products/epoxy-grout",
    techHref: "/products/epoxy-grout",
    image: "/images/products/epoxy-grout.png",
  },
  {
    title: "Specialty line",
    icon: Package,
    badge: "Full system",
    desc: "Block mortar, PU, spacers & cleaners — one family.",
    italic: "One vendor map across ancillary products.",
    href: "/products",
    techHref: "/products/tiles-adhesive/fix-555",
    image: "/images/products/block-mortar.png",
  },
] as const;

const pillars = [
  {
    icon: Shield,
    title: "Certified range",
    text: "Aligned with EN 12004 & IS 15477:2019 across the catalogue.",
  },
  {
    icon: Layers,
    title: "Designed to bond",
    text: "Formulations matched to real substrates and site stress.",
  },
  {
    icon: Palette,
    title: "Finish that lasts",
    text: "Epoxy grouts engineered for colour-fast, clean joints.",
  },
  {
    icon: Headset,
    title: "People who answer",
    text: "Specification-to-site support from the same team.",
  },
] as const;

const viewOnce = { once: true as const, margin: "-60px" as const };

export function HomeView() {
  const reduced = useReducedMotion();
  const [faqQuery, setFaqQuery] = useState("");

  const faqFiltered = useMemo(() => {
    const q = faqQuery.trim().toLowerCase();
    if (!q) return FAQ_CATEGORIES.map((c) => ({ ...c, items: [...c.items] }));
    return FAQ_CATEGORIES.map((c) => ({
      ...c,
      items: c.items.filter(
        (it) =>
          it.question.toLowerCase().includes(q) || it.answer.toLowerCase().includes(q),
      ),
    })).filter((c) => c.items.length > 0);
  }, [faqQuery]);

  return (
    <>
      {/* 1 — Hero */}
      <section className="home-section-ambient relative overflow-hidden border-b border-border-soft bg-background bg-grain">
        <div
          className={cn(
            "site-container flex min-h-[min(40vh,24rem)] max-h-[min(52vh,38rem)] flex-col justify-center py-10 md:min-h-[min(48vh,30rem)] md:max-h-[min(58vh,42rem)] md:py-12 lg:py-section",
          )}
        >
          <motion.div
            className="mx-auto w-full max-w-xl md:mx-0"
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.56, ease: [0.2, 0, 0.2, 1] }}
          >
            <p className="inline-flex items-center gap-2 rounded-full border border-border-strong/45 bg-elevated/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-subhead shadow-sm backdrop-blur-[8px]">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
              Construction-grade fixing
            </p>

            <h1 className="mt-5 font-heading text-hero font-bold !leading-[1.06] text-foreground">
              <span className="flex flex-wrap items-baseline gap-x-[0.35em]">
                <HeroWords words={["Strong"]} />
                <span className="text-terracotta">
                  <HeroWords words={["bond."]} delay={0.08} />
                </span>
              </span>
              <span className="mt-1 flex flex-wrap items-baseline gap-x-[0.35em] md:mt-1.5">
                <HeroWords words={["Starts"]} delay={0.12} />
                <span className="text-terracotta">
                  <HeroWords words={["here."]} delay={0.2} wordClassName="italic font-semibold" />
                </span>
              </span>
            </h1>

            <p className="mt-4 copy-measure max-w-prose text-[1.03em] leading-relaxed text-mid">
              Tile adhesives and epoxy systems built for contractors who need clarity on site — not guesswork in the bucket.
            </p>
            <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.12em] text-mid">{BRAND.taglineHi.trim()}</p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild size="lg" variant="primary" className="group motion-safe:hover:scale-[1.02]">
                <TransitionLink href="/products" className="gap-2 pr-9">
                  View products
                  <ArrowRight className="-mr-1 transition-transform duration-200 ease-out group-hover:translate-x-1" aria-hidden />
                </TransitionLink>
              </Button>
              <Button asChild size="lg" variant="outline" className="motion-safe:hover:scale-[1.015]">
                <TransitionLink href="/contact">Talk to us</TransitionLink>
              </Button>
            </div>

            <dl className="mt-8 grid grid-cols-2 gap-x-4 gap-y-6 border-t border-border-strong/50 pt-7 sm:grid-cols-4 sm:justify-items-start">
              {[
                ["10+", "Years live on site"],
                ["10", "Core solutions"],
                ["20+", "Grout colours"],
                ["IS 15477", "India standard"],
              ].map(([k, v]) => (
                <div key={k} className="min-w-0">
                  <dt className="font-heading text-xl font-bold tabular-nums text-foreground sm:text-2xl">{k}</dt>
                  <dd className="mt-1 text-[10px] font-semibold uppercase leading-snug tracking-[0.05em] text-mid">{v}</dd>
                </div>
              ))}
            </dl>

            <p className="mt-8 inline-flex max-w-md flex-wrap items-center gap-x-2 gap-y-1 rounded-neo border border-border-strong/50 bg-elevated/88 px-4 py-2.5 text-[12px] font-medium leading-snug text-dark shadow-neo backdrop-blur-sm">
              <span className="rounded-full bg-terracotta/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-terracotta-dark">
                Trust
              </span>
              10+ years on site · Batches traced to specification · Ahmedabad-based engineering support
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2 — Narrative */}
      <section className="section-pad relative overflow-hidden border-b border-border-soft bg-elevated home-section-ambient">
        <div className="site-container">
          <div className="max-w-section-inner">
            <div className="space-y-2 md:space-y-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary">Fixonex</p>
              <h2 className="font-heading text-display font-semibold tracking-tight text-foreground">Clarity in every layer</h2>
              <span className="block h-0.5 w-10 rounded-full bg-terracotta" aria-hidden />
              <p className="copy-measure mt-3 max-w-prose pt-1 text-mid md:text-[1.035em] md:leading-relaxed">
                A decade in tile and stone means we speak both spec sheets and site conditions. Fewer products, clearly
                graded — so your crew knows what to open before the mix goes down.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3 — Pillars */}
      <section className="section-pad relative overflow-hidden border-b border-border-soft bg-band-alt home-section-ambient">
        <div className="site-container">
          <div className="max-w-section-inner">
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-terracotta-dark">Why choose us</p>
            <h2 className="mt-2 font-heading text-[clamp(1.45rem,3vw,1.95rem)] font-semibold tracking-tight text-foreground">
              Built for specs and schedules
            </h2>
            <span className="mt-3 block h-0.5 w-10 rounded-full bg-terracotta/90" aria-hidden />
            <p className="copy-measure mt-3 max-w-prose text-mid">
              Four reasons teams keep FIXONEX on the short list — not generic promises, repeatable systems.
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 md:mt-10 md:gap-5 lg:grid-cols-4">
            {pillars.map((item) => (
              <article
                key={item.title}
                className="group flex flex-col items-center rounded-2xl border border-border-strong/40 border-t-[3px] border-t-terracotta bg-elevated/92 p-5 text-center shadow-neo backdrop-blur-sm ring-1 ring-white/65 transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-neo-hover"
              >
                <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-muted text-primary shadow-neo ring-4 ring-anchor/25">
                  <item.icon className="h-8 w-8" strokeWidth={1.6} aria-hidden />
                </span>
                <h3 className="mt-4 font-heading text-base font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mid">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4 — Products */}
      <section className="section-pad relative overflow-hidden border-b border-border-soft bg-muted home-section-ambient">
        <div className="site-container">
          <div className="mb-8 flex flex-col gap-4 border-b border-border-soft/60 pb-8 md:mb-10 md:flex-row md:items-end md:justify-between md:gap-6 md:pb-10">
            <div className="space-y-2 md:space-y-2.5">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-subhead">Catalogue</p>
              <h2 className="font-heading text-display font-semibold tracking-tight text-foreground">What we make</h2>
              <span className="block h-0.5 w-10 rounded-full bg-terracotta/90" aria-hidden />
            </div>
            <TransitionLink
              href="/products"
              className="group inline-flex shrink-0 items-center gap-2 self-start text-sm font-semibold text-primary md:self-end hover:text-primary-hover"
            >
              Browse all products
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </TransitionLink>
          </div>
          <div className="grid gap-4 sm:gap-5 md:grid-cols-3">
            {productRange.map((c, i) => (
              <motion.article
                key={c.title}
                initial={reduced ? false : { opacity: 0, y: 16 }}
                whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
                viewport={viewOnce}
                transition={{ delay: i * 0.065, duration: 0.4, ease: [0.2, 0, 0.2, 1] }}
                className="group relative flex flex-col overflow-hidden rounded-[1.125rem] border border-border-soft bg-elevated shadow-neo ring-1 ring-white/85 transition-[transform,box-shadow] hover:-translate-y-1 hover:shadow-neo-hover motion-safe:hover:scale-[1.01]"
              >
                <span className="absolute left-5 top-[12px] z-[1] inline-flex rounded-pill bg-terracotta px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-terracotta-foreground shadow-sm">
                  {c.badge}
                </span>
                <div className="relative aspect-[5/3] w-full overflow-hidden border-b border-border-soft bg-gradient-to-b from-muted/90 to-elevated">
                  <ImageWithFallback
                    src={c.image}
                    alt=""
                    fill
                    className="object-contain p-5 transition-transform duration-300 group-hover:scale-[1.04]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <c.icon className="h-5 w-5 text-primary" aria-hidden />
                  <h3 className="mt-2.5 font-body text-lg font-semibold leading-snug text-foreground">{c.title}</h3>
                  <span className="mt-3 block h-0.5 w-10 rounded-full bg-terracotta" aria-hidden />
                  <p className="mt-2 text-sm leading-relaxed text-mid">{c.desc}</p>
                  <p className="mt-3 text-sm italic text-faq-body">{c.italic}</p>
                  <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <TransitionLink
                      href={c.href}
                      className="group/ex inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-hover"
                    >
                      Explore
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/ex:translate-x-1.5" aria-hidden />
                    </TransitionLink>
                    <TransitionLink
                      href={c.techHref}
                      className="text-[11px] font-semibold uppercase tracking-[0.12em] text-mid underline-offset-4 hover:text-terracotta-dark hover:underline"
                    >
                      Technical spec →
                    </TransitionLink>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* 5 — Guidance */}
      <section className="section-pad relative overflow-hidden border-b border-border-soft bg-guidance-texture home-section-ambient">
        <div className="site-container">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-14">
            <div className="space-y-7">
              <div className="space-y-2">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-subhead">Specification</p>
                <h2 className="font-heading text-[clamp(1.4rem,2.8vw,1.95rem)] font-semibold tracking-tight text-foreground">
                  Not sure which product fits?
                </h2>
                <span className="mt-2 block h-0.5 w-10 rounded-full bg-terracotta/90" aria-hidden />
                <p className="copy-measure mt-3 max-w-prose text-mid">
                  Share your substrate, tile format, and exposure — we point to the grade that matches the standard.
                </p>
              </div>
              <div className="max-w-md rounded-neo border border-border-soft/80 bg-band-alt/50 px-4 py-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-terracotta-dark">Specification path</p>
                <p className="mt-1.5 text-[12px] font-medium text-foreground">Step 1 of 3 · Share site context</p>
                <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/70">
                  <div className="h-full w-1/3 rounded-full bg-terracotta shadow-sm transition-all duration-500" />
                </div>
              </div>
              <ul className="space-y-4">
                {[{ t: "Surface & condition", Icon: Layers }, { t: "Tile type & size", Icon: Grid3X3 }, { t: "We match the grade", Icon: Shield }].map(
                  ({ t, Icon }, i) => (
                    <li key={t} className="flex gap-4">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/92 font-heading text-sm font-bold text-primary shadow-neo ring-1 ring-white/96">
                        {i + 1}
                      </span>
                      <span className="flex flex-1 items-center gap-3 rounded-xl border border-transparent bg-transparent py-1.5 transition-colors hover:border-terracotta/55 hover:bg-terracotta/[0.08] md:py-2 md:pr-6">
                        <Icon className="hidden h-[18px] w-[18px] shrink-0 text-terracotta md:block" strokeWidth={1.85} aria-hidden />
                        <span className="text-sm font-medium leading-snug text-dark">{t}</span>
                      </span>
                    </li>
                  ),
                )}
              </ul>
              <Button asChild size="lg" variant="primary" className="group mt-2 motion-safe:hover:scale-[1.02]">
                <TransitionLink href="/contact">
                  Get free guidance
                  <ArrowUpRight className="h-[18px] w-[18px] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
                </TransitionLink>
              </Button>
            </div>
            <div className="rounded-neo border border-border-strong/45 bg-muted/80 p-6 shadow-neo lg:p-7 lg:sticky lg:top-28">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-subhead">Before you start</p>
              <h3 className="mt-2 font-heading text-lg font-semibold text-foreground md:text-xl">Resources</h3>
              <ul className="mt-5 space-y-4">
                {[
                  { icon: BookOpen, label: "Installation & site guides", href: "/support" },
                  { icon: HelpCircle, label: "Safety & handling", href: "/support" },
                  { icon: PhoneCall, label: "Common questions", href: "/support" },
                ].map((row) => (
                  <li key={row.label}>
                    <TransitionLink
                      href={row.href}
                      className="group flex items-start gap-4 rounded-xl border border-border-soft/85 bg-white/92 p-4 shadow-soft transition-colors hover:border-terracotta/55 hover:bg-elevated/95 hover:shadow-md"
                    >
                      <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-muted text-primary shadow-inner">
                        <row.icon className="h-[1.125rem] w-[1.125rem]" strokeWidth={2} aria-hidden />
                      </span>
                      <span>
                        <span className="block font-medium text-dark group-hover:text-primary">{row.label}</span>
                        <span className="text-sm text-mid transition-transform group-hover:translate-x-[2px]">Open library →</span>
                      </span>
                    </TransitionLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 6 — Projects */}
      <section className="section-pad relative overflow-hidden border-b border-border-soft bg-band-alt home-section-ambient">
        <div className="site-container">
          <div className="mb-8 flex flex-col gap-4 border-b border-border-soft/50 pb-8 md:mb-10 md:flex-row md:items-end md:justify-between md:gap-6 md:pb-10">
            <div className="space-y-2">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-subhead">On record</p>
              <h2 className="font-heading text-display font-semibold tracking-tight text-foreground">Projects</h2>
              <span className="block h-0.5 w-10 rounded-full bg-terracotta/90" aria-hidden />
            </div>
            <Button asChild variant="warm" size="sm" className="group w-fit shrink-0 gap-2 self-start font-semibold md:self-end">
              <TransitionLink href="/projects" className="gap-2">
                View all projects
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
              </TransitionLink>
            </Button>
          </div>
          <ul className="grid gap-4 sm:gap-5 md:grid-cols-3">
            {projectPreviews.map((p) => (
              <li key={p.title} className="h-full">
                <TransitionLink href="/projects" className="group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-border-strong/40 bg-elevated/95 shadow-sm ring-1 ring-white/40 transition-[transform,box-shadow] hover:-translate-y-1 hover:shadow-lg">
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-muted via-elevated to-anchor/50">
                    <div
                      aria-hidden
                      className="absolute inset-0 opacity-[0.12] bg-[radial-gradient(circle_at_30%_20%,rgba(217,120,70,0.45),transparent_62%),linear-gradient(160deg,rgba(43,43,43,0.08),transparent)] mix-blend-multiply"
                    />
                    <div className="absolute left-4 top-4 flex gap-2">
                      <span className="rounded-pill bg-terracotta/95 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white shadow-sm">
                        {p.category}
                      </span>
                      <span className="rounded-pill bg-white/93 px-2.5 py-0.5 text-[10px] font-semibold text-mid shadow-sm">{p.year}</span>
                    </div>
                    <span className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-foreground/75 to-transparent px-4 py-4 text-white opacity-90 transition-opacity duration-200 group-hover:opacity-100">
                      <Building2 className="h-5 w-5" aria-hidden />
                      <ArrowUpRight className="h-5 w-5 translate-y-0.5 transition-transform duration-300 group-hover:-translate-x-3 group-hover:translate-y-[-12px]" />
                    </span>
                    <div className="absolute inset-0 flex items-center justify-center bg-foreground/55 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <span className="rounded-pill bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-foreground">
                        View narrative
                      </span>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-2 px-4 pt-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-mid">
                    <MapPin className="h-3 w-3 text-primary" aria-hidden />
                    {p.location}
                  </span>
                  <span className="border-b border-border-strong/35 px-4 pb-2 font-heading text-[1.06rem] font-semibold leading-tight text-foreground group-hover:text-terracotta-dark">
                    {p.title}
                  </span>
                  <p className="relative z-[1] flex-1 p-4 pb-6 text-sm leading-relaxed text-mid">{p.line}</p>
                </TransitionLink>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 7 — Testimonials */}
      <motion.section
        className="section-pad relative overflow-hidden border-b border-border-soft bg-muted home-section-ambient"
        initial={reduced ? false : { opacity: 0, y: 24 }}
        whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
        viewport={viewOnce}
        transition={{ duration: 0.42, ease: [0.2, 0, 0.2, 1] }}
      >
        <div className="site-container">
          <div className="max-w-section-inner space-y-2 md:space-y-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-subhead">Partners</p>
            <h2 className="font-heading text-display font-semibold tracking-tight text-foreground">On site with us</h2>
            <span className="block h-0.5 w-10 rounded-full bg-terracotta" aria-hidden />
            <p className="copy-measure max-w-prose pt-1 text-sm leading-relaxed text-mid">
              Straight words — batch traceability beats slide decks on site.
            </p>
          </div>

          <div className="mt-10">
            <TestimonialCard
              {...testimonials[0]}
              index={0}
              animated={false}
              featured
              projectLabel={testimonialExtras[0].projectLabel}
            />
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2 md:gap-5 md:mt-8">
            {testimonials.slice(1).map((item, i) => (
              <TestimonialCard
                key={item.name}
                {...item}
                animated={false}
                index={i + 1}
                projectLabel={testimonialExtras[i + 1].projectLabel}
              />
            ))}
          </div>
        </div>
      </motion.section>

      {/* 8 — FAQ */}
      <motion.section
        className="section-pad relative overflow-hidden border-b border-border-soft bg-elevated home-section-ambient"
        initial={reduced ? false : { opacity: 0, y: 24 }}
        whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
        viewport={viewOnce}
        transition={{ duration: 0.42, ease: [0.2, 0, 0.2, 1] }}
      >
        <div className="site-container">
          <div className="max-w-section-inner space-y-2 md:space-y-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-subhead">Support</p>
            <h2 className="font-heading text-[clamp(1.55rem,3vw,2rem)] font-semibold tracking-tight text-foreground">
              Common questions
            </h2>
            <span className="block h-0.5 w-10 rounded-full bg-terracotta" aria-hidden />
            <p className="copy-measure max-w-prose pt-1 text-mid">
              Straight answers contractors can skim — filter by keyword below.
            </p>
          </div>
          <label className="mt-8 flex max-w-xl items-center gap-2 rounded-full border border-band-alt bg-elevated/95 px-4 py-2.5 shadow-sm ring-2 ring-transparent transition-shadow focus-within:ring-terracotta/30">
            <Search className="h-4 w-4 shrink-0 text-mid" aria-hidden />
            <input
              type="search"
              value={faqQuery}
              onChange={(e) => setFaqQuery(e.target.value)}
              placeholder="Search FAQs…"
              className="w-full bg-transparent font-sans text-sm text-foreground outline-none placeholder:text-mid"
            />
          </label>
          <div className="mt-8 space-y-8">
            {faqFiltered.map((block) => (
              <section key={block.title}>
                <h3 className="border-b border-band-alt/95 pb-2 font-heading text-lg font-semibold text-foreground">
                  {block.title}
                </h3>
                <ul className="mt-4 space-y-4">
                  {block.items.map((item) => (
                    <li
                      key={item.question}
                      className="rounded-[1rem] border border-border-soft border-l-[3px] border-l-terracotta bg-muted/72 py-4 pl-[1rem] pr-4 shadow-sm ring-1 ring-white/70"
                    >
                      <p className="font-heading text-[1.035rem] font-semibold leading-snug text-faq-title">{item.question}</p>
                      <p className="mt-3 text-sm leading-relaxed text-faq-body">{item.answer}</p>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
          {faqFiltered.length === 0 ? (
            <p className="mt-6 text-sm font-medium text-mid">No matches — try another keyword.</p>
          ) : null}
          <div className="mt-10 flex w-full max-w-none flex-col gap-5 border-t border-border-soft/70 pt-10 text-[15px] sm:flex-row sm:items-start sm:justify-between sm:gap-8">
            <TransitionLink href="/support/#faq" className="inline-flex items-center gap-2 font-semibold text-primary hover:text-primary-hover">
              Browse full FAQ
              <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
            </TransitionLink>
            <TransitionLink
              href="/contact"
              className="inline-flex items-center gap-2 font-semibold text-terracotta-dark underline-offset-4 hover:underline sm:text-right"
            >
              Still need help? Contact us
              <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
            </TransitionLink>
          </div>
        </div>
      </motion.section>

      {/* 9 — Final CTA */}
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <svg
          className="pointer-events-none -mt-px block h-9 w-full border-0 bg-transparent leading-none text-white sm:h-11 [&_path]:fill-current"
          viewBox="0 0 1440 36"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path d="M0,36 Q360,-2 720,12 T1440,10 V0 H0 Z" />
        </svg>
        <div className="section-pad pb-14 pt-section">
          <div className="site-container">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-heading text-[clamp(1.5rem,3.2vw,2.1rem)] font-semibold tracking-tight text-white">
                Ready when your pour is.
              </h2>
              <p className="mx-auto mt-4 max-w-md text-[0.98em] leading-relaxed text-white/92">
                Pick a grade from the catalogue or send us your site notes — we reply with a clear recommendation, not a catalogue dump.
              </p>
              <p className="mx-auto mt-4 max-w-sm text-[12px] text-white/82">No spam. We respond within standard business hours on working days.</p>
              <div className="mt-9 flex flex-wrap justify-center gap-3">
                <Button
                  asChild
                  variant="secondary"
                  size="lg"
                  className="group border-white/35 bg-white text-primary shadow-lg motion-safe:hover:scale-[1.03] hover:bg-white/94"
                >
                  <TransitionLink href="/products" className="gap-2 font-semibold">
                    Explore products
                    <ArrowRight className="-mr-0.5 h-5 w-5 opacity-95 transition-transform group-hover:translate-x-1" aria-hidden />
                  </TransitionLink>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white/92 bg-transparent font-semibold text-white shadow-none transition-all hover:bg-white/14 motion-safe:hover:scale-[1.025]"
                >
                  <TransitionLink href="/contact">Book a call</TransitionLink>
                </Button>
              </div>
              <div className="mt-10 flex justify-center">
                <a
                  href="https://wa.me/917383838632"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/52 px-5 py-2.5 text-sm font-semibold tracking-tight text-white backdrop-blur-sm transition-colors hover:bg-white/[0.07]"
                >
                  <MessageCircle className="h-4 w-4 shrink-0" aria-hidden />
                  WhatsApp Swastik Enterprises
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
