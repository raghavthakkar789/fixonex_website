"use client";

import { TransitionLink } from "@/components/navigation/TransitionLink";
import { useRef, useState } from "react";
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
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { BRAND } from "@/lib/brand";
import { homeFaqs } from "@/lib/data/home-faqs";
import { testimonials } from "@/lib/data/testimonials";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useCountUp } from "@/lib/useCountUp";
import { cn } from "@/lib/utils";
import { BentoTiltCard } from "@/components/ui/BentoTiltCard";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

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
            transition={{ duration: 0.7, delay: delay + i98 * 0.12, ease: [0.16, 1, 0.3, 1] }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

function StatCell({ value, label, delay }: { value: string; label: string; delay: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduced = useReducedMotion();
  const display = useCountUp(value, reduced || Boolean(inView), { durationMs: 1500 });

  return (
    <motion.div
      ref={ref}
      initial={false}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.45, delay }}
      className="surface-card p-6"
    >
      <div className="border-l-4 border-warm pl-4">
        <p className="font-display text-[clamp(28px,4vw,40px)] font-bold text-warm">{display}</p>
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
  const [tickerPaused, setTickerPaused] = useState(false);

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen overflow-hidden bg-brand pb-14">
        <div className="absolute inset-0 bg-brand" aria-hidden />
        <div className="absolute inset-0 bg-mesh-hero opacity-90" aria-hidden />
        <div className="absolute inset-y-0 right-0 w-[58%] bg-dark/55" style={{ clipPath: "polygon(22% 0,100% 0,100% 100%,0 100%)" }} aria-hidden>
          <ImageWithFallback
            src="https://picsum.photos/200/300"
            alt="FIXONEX tile installation systems hero background image"
            fill
            priority
            sizes="58vw"
            className="object-cover object-center opacity-35"
          />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_18%,rgba(193,178,164,0.35),transparent_42%),radial-gradient(circle_at_78%_88%,rgba(211,47,47,0.14),transparent_38%)]" aria-hidden />
        <div
          className="pointer-events-none absolute left-[5%] top-[16%] h-[min(300px,42vw)] w-[min(300px,42vw)] rounded-full bg-primary/30 blur-[100px]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute bottom-[10%] right-[6%] h-[min(260px,38vw)] w-[min(260px,38vw)] rounded-full bg-sky-400/25 blur-[88px]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute right-[28%] top-[38%] h-44 w-44 rounded-full bg-amber-400/20 blur-[64px]"
          aria-hidden
        />

        <div className="site-container relative z-10 flex min-h-[calc(100vh-72px)] flex-col justify-center">
          <div className="flex flex-1 flex-col justify-center pt-10 lg:max-w-[55%] lg:pt-0">
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 20 }}
              animate={reduced ? undefined : { opacity: 1, y: 0 }}
              className="inline-flex w-fit rounded-sm bg-warm px-3 py-1.5 text-[11px] font-medium uppercase tracking-wide text-black"
            >
              Tile Installation Solutions
            </motion.div>
            <h1 className="mt-6 flex flex-col gap-0 font-display text-hero font-bold !leading-[1.08]">
              <HeroWords words={heroLine1} className="text-white" />
              <HeroWords words={heroLine2} className="text-warm" delay={0.24} />
            </h1>
            <motion.p
              className="mt-6 max-w-xl text-lg leading-relaxed text-white/90"
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
              <Button asChild size="lg">
                <TransitionLink href="/products">Explore Products</TransitionLink>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-warm text-warm hover:text-black">
                <TransitionLink href="/contact">Get Consultation</TransitionLink>
              </Button>
            </motion.div>
          </div>
        </div>

        <div
          className="relative z-10 mt-8 overflow-hidden rounded-2xl border border-white/10 bg-black/30 py-3 text-[#E0E0E0] shadow-[0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur-[1px] transition-[box-shadow,border-color] duration-500 motion-reduce:transition-none md:hover:border-white/20 md:hover:shadow-pop"
          onMouseEnter={() => setTickerPaused(true)}
          onMouseLeave={() => setTickerPaused(false)}
        >
          <div className="flex w-max animate-ticker motion-reduce:animate-none" style={{ animationPlayState: tickerPaused ? "paused" : "running" }}>
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
      <section className="section-pad section-flow-light">
        <div className="relative z-10 site-container grid gap-12 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={false}
            whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="relative border-l-[3px] border-primary/85 pl-6 md:pl-8"
          >
            <p className="label-caps text-subhead">WHO WE ARE</p>
            <h2 className="mt-4 font-display text-display font-semibold text-foreground">
              <span className="heading-accent">A Decade of Bonding Excellence</span>
            </h2>
            <p className="mt-6 max-w-prose text-[1.0625rem] leading-[1.72] text-mid">
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
      <section className="section-pad section-flow-warm">
        <div className="relative z-10 site-container">
          <motion.h2
            className="flex flex-col items-center text-center font-display text-display font-semibold text-foreground"
            initial={false}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
          >
            <span className="heading-accent heading-accent-center">Why Choose FIXONEX</span>
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
                initial={false}
                whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i98 * 0.1 }}
                whileHover={reduced ? undefined : { y: -4 }}
                className="group surface-card"
              >
                <div className="p-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-dark text-white shadow-md shadow-red ring-2 ring-white/30">
                    <item.icon className="h-5 w-5" aria-hidden />
                  </div>
                  <h3 className="mt-4 font-body text-2xl font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-mid">{item.text}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCT HIGHLIGHT */}
      <section className="section-pad section-flow-light">
        <div className="relative z-10 site-container">
          <motion.div
            initial={false}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="font-display text-display font-semibold text-foreground">
              <span className="heading-accent heading-accent-center">Our Product Range</span>
            </h2>
            <p className="mx-auto mt-6 max-w-prose text-[1.0625rem] text-mid">
              From interior walls to swimming pools — engineered adhesion for every surface.
            </p>
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
                initial={false}
                whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i98 * 0.12 }}
                whileHover={reduced ? undefined : { scale: 1.02 }}
               className="surface-card min-w-[280px] flex-1 overflow-hidden md:min-w-0"
              >
                <div className="relative h-[180px] overflow-hidden bg-gradient-to-br from-[#2c2826] via-[#4a3534] to-primary">
                  <div className="absolute inset-0 bg-stripe-soft opacity-60" aria-hidden />
                  <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-warm/25 blur-2xl" aria-hidden />
                  <div className="absolute bottom-4 left-4 h-16 w-24 rounded-full bg-primary/30 blur-xl" aria-hidden />
                </div>
                <div className="h-1 bg-gradient-to-r from-warm-dark via-primary to-warm" />
                <div className="p-6">
                  <c.icon className="h-8 w-8 text-primary" aria-hidden />
                  <h3 className="mt-4 font-body text-xl font-semibold text-foreground">{c.title}</h3>
                  <p className="mt-2 text-sm text-mid">{c.desc}</p>
                  <TransitionLink href={c.href} className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary-dark">
                    View Products →
                  </TransitionLink>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCT GUIDANCE TEASER */}
      <section className="section-pad section-flow-warm">
        <div className="relative z-10 site-container grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="font-display text-display font-semibold text-foreground">
              <span className="heading-accent">Not Sure Which Product to Use?</span>
            </h2>
            <p className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-mid">Tell us your surface, tile, and exposure — we recommend the right adhesive grade.</p>
            <Button asChild className="mt-8" size="lg" variant="primary">
              <TransitionLink href="/contact">Get Free Guidance</TransitionLink>
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
                <div key={s.n} className="surface-card px-4 py-5 text-center">
                  <p className="text-xs font-semibold text-primary">{s.n}</p>
                  <p className="mt-2 text-sm text-mid">{s.t}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SUPPORT TEASER */}
      <section className="section-pad section-flow-light">
        <div className="relative z-10 site-container">
          <motion.h2
            className="flex flex-col items-center text-center font-display text-display font-semibold text-foreground"
            initial={false}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
          >
            <span className="heading-accent heading-accent-center">Learn Before You Build</span>
          </motion.h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { icon: BookOpen, title: "Installation Guide", text: "Step-by-step tile fixing instructions", href: "/support" },
              { icon: HelpCircle, title: "Usage Precautions", text: "Safe handling for all product types", href: "/support" },
              { icon: PhoneCall, title: "Common Questions", text: "Find answers before starting your project", href: "/support" },
            ].map((item, i98) => (
              <motion.article
                key={item.title}
                initial={false}
                whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i98 * 0.1 }}
                className="surface-card flex flex-col p-8"
              >
                <item.icon className="h-8 w-8 text-primary" />
                <h3 className="mt-4 font-body text-xl font-semibold text-black">{item.title}</h3>
                <p className="mt-2 flex-1 text-sm text-mid">{item.text}</p>
                <TransitionLink href={item.href} className="mt-6 text-sm font-semibold text-primary">
                  Learn more →
                </TransitionLink>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="relative overflow-hidden border-y border-border/60 bg-mesh-warm py-12">
        <div className="pointer-events-none absolute inset-0 bg-stripe-soft opacity-40" aria-hidden />
        <motion.div
          initial={false}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          className="relative z-10 site-container flex min-h-[120px] flex-col items-center justify-center gap-8 md:flex-row md:gap-0"
        >
          {[
            { icon: Headphones, label: "Free Consultation" },
            { icon: Share2, label: "Technical Guidance" },
            { icon: Users, label: "Dealer Network" },
          ].map((item, i98) => (
            <div key={item.label} className="flex items-center gap-8 md:px-10">
              {i98 > 0 ? <span className="hidden h-10 w-px bg-light md:block" aria-hidden /> : null}
              <div className="flex items-center gap-3">
                <item.icon className="h-5 w-5 text-warm" aria-hidden />
                <span className="font-body text-base font-bold text-foreground">{item.label}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* PROJECTS */}
      <AnimatedSection as="section" className="section-pad section-flow-light" variant="fadeUp">
        <div className="relative z-10 site-container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-display font-semibold text-foreground">
              <span className="heading-accent heading-accent-center">Where FIXONEX Performs</span>
            </h2>
            <p className="mx-auto mt-6 max-w-prose text-[1.0625rem] text-mid">From homes to commercial spaces — trusted adhesion on every surface.</p>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-3 auto-rows-[140px] md:grid-cols-3 md:auto-rows-[160px]">
            {Array.from({ length: 6 }).map((_, i98) => (
              <motion.div
                key={i98}
                initial={false}
                whileInView={reduced ? undefined : { opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i98 * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className={cn("h-full", (i98 === 1 || i98 === 4) && "md:row-span-2")}
              >
                <BentoTiltCard
                  className={cn(
                    "group relative h-full min-h-[120px] overflow-hidden rounded-md md:min-h-0",
                    i98 % 2 === 0 ? "bg-warm/50" : "bg-warm-dark/35",
                  )}
                >
                  <ImageWithFallback src="https://picsum.photos/200" alt="Completed project site" fill className="object-cover" />
                  <div className="pointer-events-none absolute inset-0 flex items-end bg-warm/0 p-4 opacity-0 transition-all duration-300 group-hover:bg-warm/80 group-hover:opacity-100">
                    <p className="translate-y-2 text-sm font-medium text-black transition-transform duration-300 group-hover:translate-y-0">Project preview</p>
                  </div>
                  <span className="sr-only">Placeholder project visual {i98 + 1}</span>
                </BentoTiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* TESTIMONIALS */}
      <section className="section-pad section-flow-warm">
        <div className="relative z-10 site-container">
          <h2 className="flex flex-col items-center text-center font-display text-display font-semibold text-foreground">
            <span className="heading-accent heading-accent-center">Trusted by Builders</span>
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((item, i98) => (
              <TestimonialCard key={item.name} {...item} index={i98} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-pad section-flow-light">
        <div className="relative z-10 site-container grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="font-display text-display font-semibold text-foreground">
              <span className="heading-accent">Frequently Asked Questions</span>
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-mid">Straight answers on adhesive grades, tile-on-tile, epoxy colors, and partnerships.</p>
          </div>
          <div className="lg:col-span-8">
            <FAQAccordion items={homeFaqs} defaultOpen={0} />
            <p className="mt-8 text-right text-sm text-mid">
              <TransitionLink href="/support/#faq" className="font-semibold text-primary transition-colors hover:text-primary-dark">
                More questions →
              </TransitionLink>
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
