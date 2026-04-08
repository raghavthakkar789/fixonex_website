"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  BookOpen,
  Grid3X3,
  Headphones,
  Headset,
  HelpCircle,
  Layers,
  Package,
  Palette,
  Shield,
  PhoneCall,
  Share2,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { StatsStrip } from "@/components/ui/StatsStrip";
import { CTALight } from "@/components/ui/CTALight";
import { CTADark } from "@/components/ui/CTADark";
import { TestimonialCard } from "@/components/ui/TestimonialCard";
import { BRAND } from "@/lib/brand";
import { homeFaqs } from "@/lib/data/home-faqs";
import { testimonials } from "@/lib/data/testimonials";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useCountUp } from "@/lib/useCountUp";
import { cn } from "@/lib/utils";

const heroLine1 = ["Strong", "Bond"];
const heroLine2 = ["Begins", "Here."];

function HeroWords({ words, className, delay = 0 }: { words: string[]; className?: string; delay?: number }) {
  const reduced = useReducedMotion();
  return (
    <span className={cn("flex flex-wrap gap-x-3 gap-y-1", className)}>
      {words.map((word, i98) => (
        <span key={word} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={reduced ? false : { y: "100%", opacity: 0 }}
            animate={reduced ? undefined : { y: 0, opacity: 1 }}
            transition={{ duration: 0.45, delay: delay + i98 * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

function TileIllustration() {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className="relative mx-auto aspect-square w-full max-w-md"
      initial={reduced ? false : { opacity: 0, x: 60 }}
      animate={reduced ? undefined : { opacity: 1, x: 0 }}
      transition={{ duration: 0.55, delay: 0.3 }}
    >
      <motion.div
        className="grid h-full grid-cols-4 gap-2 p-4"
        animate={reduced ? undefined : { y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        {Array.from({ length: 16 }).map((_, i98) => (
          <div
            key={i98}
            className="rounded-sm"
            style={{
              backgroundColor: i98 % 3 === 0 ? "#C1B2A4" : i98 % 3 === 1 ? "#d9cfc5" : "#A89585",
              opacity: 0.35 + (i98 % 5) * 0.1,
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}

function StatCell({ value, label, delay }: { value: string; label: string; delay: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduced = useReducedMotion();
  const display = useCountUp(value, inView || reduced, { durationMs: 1500 });

  return (
    <motion.div
      ref={ref}
      initial={reduced ? false : { opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.45, delay }}
      className="rounded-md border border-border bg-white p-6 shadow-sm"
    >
      <div className="border-l-4 border-warm pl-4">
        <p className="font-display text-[clamp(28px,4vw,40px)] font-bold text-primary">{display}</p>
        <p className="mt-2 text-sm text-mid">{label}</p>
      </div>
    </motion.div>
  );
}

function GuidanceLine() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();
  const len = 384;

  return (
    <svg ref={ref} viewBox="0 0 400 24" className="h-12 w-full max-w-full text-warm" aria-hidden>
      <motion.line
        x1="8"
        y1="12"
        x2="392"
        y2="12"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray={len}
        initial={{ strokeDashoffset: len }}
        animate={{ strokeDashoffset: inView || reduced ? 0 : len }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />
    </svg>
  );
}

export function HomeView() {
  const reduced = useReducedMotion();

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen bg-white pb-14">
        <div className="site-container flex min-h-[calc(100vh-72px)] flex-col gap-12 lg:flex-row lg:items-center lg:gap-8">
          <div className="flex flex-1 flex-col justify-center pt-10 lg:max-w-[55%] lg:pt-0">
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 20 }}
              animate={reduced ? undefined : { opacity: 1, y: 0 }}
              className="inline-flex w-fit rounded-sm bg-warm px-3 py-1.5 text-[11px] font-medium uppercase tracking-wide text-dark"
            >
              Tile Installation Solutions
            </motion.div>
            <h1 className="mt-6 flex flex-col gap-0 font-display text-hero font-bold !leading-[1.08]">
              <HeroWords words={heroLine1} className="text-black" />
              <HeroWords words={heroLine2} className="text-primary" delay={0.2} />
            </h1>
            <motion.p
              className="mt-6 max-w-xl text-lg text-dark"
              initial={reduced ? false : { opacity: 0 }}
              animate={reduced ? undefined : { opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              High-performance tile adhesives and epoxy solutions engineered for modern construction.
            </motion.p>
            <motion.p
              className="mt-4 text-base italic leading-snug text-warm"
              initial={reduced ? false : { opacity: 0 }}
              animate={reduced ? undefined : { opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              {BRAND.taglineHi.trim()}
            </motion.p>
            <motion.div
              className="mt-10 flex flex-wrap gap-4"
              initial={reduced ? false : { opacity: 0, scale: 0.95 }}
              animate={reduced ? undefined : { opacity: 1, scale: 1 }}
              transition={{ delay: 0.9 }}
            >
              <Button asChild variant="primary" size="lg">
                <Link href="/products">Explore Products</Link>
              </Button>
              <Button asChild size="lg" variant="outlineNeutral">
                <Link href="/contact">Get Consultation</Link>
              </Button>
            </motion.div>
          </div>
          <div className="flex flex-1 items-center justify-center lg:max-w-[45%]">
            <TileIllustration />
          </div>
        </div>

        <div className="mt-8 overflow-hidden bg-black py-3 text-white">
          <div className="flex w-max animate-ticker motion-reduce:animate-none">
            {["Tile Adhesive", "Epoxy Grout", "Block Mortar", "PU Adhesive", "Tile Spacers", "Tile Cleaner"].map((t) => (
              <span key={t} className="mx-6 flex items-center gap-6 text-sm font-medium">
                <span className="text-warm">·</span>
                {t}
              </span>
            ))}
            {["Tile Adhesive", "Epoxy Grout", "Block Mortar", "PU Adhesive", "Tile Spacers", "Tile Cleaner"].map((t) => (
              <span key={`${t}-dup`} className="mx-6 flex items-center gap-6 text-sm font-medium">
                <span className="text-warm">·</span>
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* COMPANY INTRO */}
      <section className="section-pad bg-light">
        <div className="site-container grid gap-12 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={reduced ? false : { opacity: 0, x: -32 }}
            whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            <p className="label-caps text-warm">Who We Are</p>
            <h2 className="mt-4 font-display text-display font-semibold text-black">A Decade of Bonding Excellence</h2>
            <p className="mt-5 text-base leading-[1.75] text-dark">
              FIXONEX Adhesive is a forward-thinking construction chemical brand specializing in high-performance tile adhesives and epoxy solutions. With more than a decade of experience in the
              tiles and ceramic industry, we are built on deep market knowledge, technical expertise, and a commitment to quality.
            </p>
          </motion.div>
          <div className="grid grid-cols-2 gap-4">
            <StatCell value="10+" label="Years of Experience" delay={0} />
            <StatCell value="10" label="Products & Solutions" delay={0.08} />
            <StatCell value="20+" label="Epoxy Grout Colors" delay={0.16} />
            <StatCell value="IS 15477:2019" label="Certified Standard" delay={0.24} />
          </div>
        </div>
      </section>

      {/* WHY FIXONEX */}
      <section className="section-pad bg-white">
        <div className="site-container">
          <motion.h2
            className="text-center font-display text-display font-semibold text-black"
            initial={reduced ? false : { opacity: 0, y: 30 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
          >
            Why Choose FIXONEX
          </motion.h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Shield,
                title: "Certified Quality",
                text: "EN12004 & IS 15477:2019 certified across all product lines",
              },
              {
                icon: Layers,
                title: "Superior Bonding",
                text: "Advanced formulations for maximum adhesion on all surfaces",
              },
              {
                icon: Palette,
                title: "Aesthetic Finish",
                text: "Premium epoxy grouts in 20+ designer colors",
              },
              {
                icon: Headset,
                title: "Expert Support",
                text: "Guidance from specification to installation",
              },
            ].map((item, i98) => (
              <motion.article
                key={item.title}
                initial={reduced ? false : { opacity: 0, y: 40 }}
                whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i98 * 0.1 }}
                whileHover={reduced ? undefined : { y: -4 }}
                className="group rounded-md border border-border bg-white pt-1 shadow-sm transition-[border-color,box-shadow] duration-200 hover:border-warm"
              >
                <div className="h-1 w-full rounded-t-md bg-warm" />
                <div className="p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-rose text-primary">
                    <item.icon className="h-5 w-5" aria-hidden />
                  </div>
                  <h3 className="mt-4 font-body text-2xl font-semibold text-black">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-mid">{item.text}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCT HIGHLIGHT */}
      <section className="section-pad bg-light">
        <div className="site-container">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 24 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="font-display text-display font-semibold text-black">Our Product Range</h2>
            <p className="mt-4 text-base text-dark">From interior walls to swimming pools — engineered adhesion for every surface.</p>
          </motion.div>
          <div className="mt-12 flex gap-6 overflow-x-auto pb-2 md:grid md:grid-cols-3 md:overflow-visible">
            {[
              {
                title: "Tile Adhesives",
                icon: Grid3X3,
                desc: "5 certified adhesive types for every tile and surface",
                href: "/products",
              },
              {
                title: "Epoxy Grout",
                icon: Palette,
                desc: "Stain-free, 20+ colors, for residential to underwater applications",
                href: "/products/epoxy-grout",
              },
              {
                title: "Specialty Products",
                icon: Package,
                desc: "Block mortar, PU adhesive, tile spacers, tile cleaner",
                href: "/products",
              },
            ].map((c, i98) => (
              <motion.div
                key={c.title}
                initial={reduced ? false : { opacity: 0, x: 40 }}
                whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i98 * 0.12 }}
                whileHover={reduced ? undefined : { scale: 1.02 }}
               className="min-w-[280px] flex-1 overflow-hidden rounded-md border border-border bg-white shadow-sm transition-shadow hover:shadow-md md:min-w-0"
              >
                <div className="h-[180px] bg-gradient-to-br from-warm/40 via-warm/25 to-warm-dark/30" />
                <div className="p-6">
                  <c.icon className="h-8 w-8 text-primary" aria-hidden />
                  <h3 className="mt-4 font-body text-xl font-semibold text-black">{c.title}</h3>
                  <p className="mt-2 text-sm text-mid">{c.desc}</p>
                  <Link href={c.href} className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary-dark">
                    View Products →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCT GUIDANCE TEASER */}
      <section className="section-pad bg-dark text-white">
        <div className="site-container grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="font-display text-display font-semibold text-white">Not Sure Which Product to Use?</h2>
            <p className="mt-4 text-base text-mid">Tell us your surface, tile, and exposure — we recommend the right adhesive grade.</p>
            <Button asChild className="mt-8" size="lg" variant="primary">
              <Link href="/contact">Get Free Guidance</Link>
            </Button>
          </div>
          <div className="space-y-6">
            <GuidanceLine />
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { n: "1", t: "Tell us your surface" },
                { n: "2", t: "Share tile type & size" },
                { n: "3", t: "We recommend the right adhesive" },
              ].map((s) => (
                <div key={s.n} className="rounded-md border border-white/15 bg-white/5 px-4 py-5 text-center">
                  <p className="text-xs font-semibold text-warm">{s.n}</p>
                  <p className="mt-2 text-sm text-white">{s.t}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SUPPORT TEASER */}
      <section className="section-pad bg-white">
        <div className="site-container">
          <motion.h2
            className="text-center font-display text-display font-semibold text-black"
            initial={reduced ? false : { opacity: 0, y: 20 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
          >
            Learn Before You Build
          </motion.h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { icon: BookOpen, title: "Installation Guide", text: "Step-by-step tile fixing instructions", href: "/support" },
              { icon: HelpCircle, title: "Usage Precautions", text: "Safe handling for all product types", href: "/support" },
              { icon: PhoneCall, title: "Common Questions", text: "Find answers before starting your project", href: "/support" },
            ].map((item, i98) => (
              <motion.article
                key={item.title}
                initial={reduced ? false : { opacity: 0, y: 24 }}
                whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i98 * 0.1 }}
                className="flex flex-col border-t-4 border-warm bg-white p-8 shadow-sm"
              >
                <item.icon className="h-8 w-8 text-primary" />
                <h3 className="mt-4 font-body text-xl font-semibold text-black">{item.title}</h3>
                <p className="mt-2 flex-1 text-sm text-mid">{item.text}</p>
                <Link href={item.href} className="mt-6 text-sm font-semibold text-primary">
                  Learn more →
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="bg-light py-10">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          className="site-container flex min-h-[120px] flex-col items-center justify-center gap-8 md:flex-row md:gap-0"
        >
          {[
            { icon: Headphones, label: "Free Consultation" },
            { icon: Share2, label: "Technical Guidance" },
            { icon: Users, label: "Dealer Network" },
          ].map((item, i98) => (
            <div key={item.label} className="flex items-center gap-8 md:px-10">
              {i98 > 0 ? <span className="hidden h-10 w-px bg-warm md:block" aria-hidden /> : null}
              <div className="flex items-center gap-3">
                <item.icon className="h-5 w-5 text-primary" aria-hidden />
                <span className="font-body text-base font-bold text-black">{item.label}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* PROJECTS */}
      <section className="section-pad bg-white">
        <div className="site-container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-display font-semibold text-black">Where FIXONEX Performs</h2>
            <p className="mt-4 text-base text-dark">From homes to commercial spaces — trusted adhesion on every surface.</p>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-3 auto-rows-[140px] md:grid-cols-3 md:auto-rows-[160px]">
            {Array.from({ length: 6 }).map((_, i98) => (
              <motion.div
                key={i98}
                initial={reduced ? false : { opacity: 0, scale: 0.96 }}
                whileInView={reduced ? undefined : { opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i98 * 0.06 }}
                className={cn(
                  "group relative overflow-hidden rounded-md",
                  i98 % 2 === 0 ? "bg-warm/50" : "bg-warm-dark/35",
                  (i98 === 1 || i98 === 4) && "md:row-span-2",
                )}
              >
                <div
                  className="h-full w-full opacity-60"
                  style={{
                    backgroundImage: `repeating-linear-gradient(90deg, #A89585 0, #A89585 2px, transparent 2px, transparent 14px), repeating-linear-gradient(0deg, #C1B2A4 0, #C1B2A4 2px, transparent 2px, transparent 14px)`,
                  }}
                />
                <div className="pointer-events-none absolute inset-0 flex items-end bg-primary/0 p-4 opacity-0 transition-all duration-300 group-hover:bg-primary/60 group-hover:opacity-100">
                  <p className="translate-y-2 text-sm font-medium text-white transition-transform duration-300 group-hover:translate-y-0">Project preview</p>
                </div>
                <span className="sr-only">Placeholder project visual {i98 + 1}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section-pad bg-black">
        <div className="site-container">
          <h2 className="text-center font-display text-display font-semibold text-white">Trusted by Builders</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((item, i98) => (
              <TestimonialCard key={item.name} {...item} index={i98} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-pad bg-light">
        <div className="site-container grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="font-display text-display font-semibold text-black">Frequently Asked Questions</h2>
            <p className="mt-4 text-sm text-mid">Straight answers on adhesive grades, tile-on-tile, epoxy colors, and partnerships.</p>
          </div>
          <div className="lg:col-span-8">
            <FAQAccordion items={homeFaqs} defaultOpen={0} />
            <p className="mt-8 text-right text-sm text-mid">
              <Link href="/support/#faq" className="font-semibold text-primary transition-colors hover:text-primary-dark">
                More questions →
              </Link>
            </p>
          </div>
        </div>
      </section>

      <StatsStrip
        stats={[
          { value: "10+", label: "Years in Industry" },
          { value: "10", label: "Product Solutions" },
          { value: "20+", label: "Epoxy Grout Colors" },
          { value: "IS 15477:2019", label: "Quality Standard" },
        ]}
      />

      <CTALight headline="Ready to Start Your Project?" subtext="Explore the range or speak with our team for specification-grade guidance." />

      <CTADark
        headline="Let's Build Something Strong."
        subtext="Get expert guidance on the right adhesive for your specific surface and tile type."
      />
    </>
  );
}
