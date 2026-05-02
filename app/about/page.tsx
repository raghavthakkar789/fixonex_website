"use client";

import Link from "next/link";
import { Building2, Gem, Headphones, ArrowRight } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { PageHero } from "@/components/ui/PageHero";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { BRAND } from "@/lib/brand";

const easeExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: easeExpo }}
    >
      {children}
    </motion.div>
  );
}

const missionPoints = [
  "Deliver consistent quality across every batch and product class.",
  "Support architects, contractors, and dealers with reliable installation guidance.",
  "Enhance aesthetics through premium epoxy grout and coordinated finishing systems.",
  "Continuously improve formulations and documentation through innovation.",
];

const capabilities = [
  {
    icon: Building2,
    title: "High-performance adhesives",
    text: "Certified tile adhesive system from Type-1 through Type-5 aligned with EN12004 classes and IS 15477:2019.",
  },
  {
    icon: Gem,
    title: "Designer epoxy grout",
    text: "Stain-resistant epoxy grout in 20+ colours for residential, commercial, and wet-area installations.",
  },
  {
    icon: Headphones,
    title: "End-to-end support",
    text: "Practical guidance for architects, contractors, and dealers from specification through application.",
  },
];

export default function AboutPage() {
  const imageTall = "https://picsum.photos/seed/fixonex-story/800/1200";
  const imageWide = "https://picsum.photos/seed/fixonex-mission/1200/800";

  return (
    <>
      <PageHero
        label="About"
        title="About FIXONEX"
        subtitle="Trusted expertise in tile installation solutions — built on a decade of industry knowledge."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
      />

      {/* ── Our Story — full-bleed image with blur text box ── */}
      <section className="relative overflow-hidden" style={{ minHeight: "85vh" }}>
        {/* Background image — fills entire section */}
        <ImageWithFallback
          src={imageTall}
          alt="FIXONEX quality and craftsmanship"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/30" aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" aria-hidden />

        {/* Text content — frosted glass card */}
        <div className="relative z-10 flex min-h-[inherit] items-center py-20">
          <div className="site-container">
            <FadeIn className="max-w-xl">
              <div className="rounded-2xl border border-white/15 bg-black/50 p-8 backdrop-blur-md md:p-10">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary mb-3">Our Story</p>
                <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.02em] text-white leading-tight">
                  Built on a Decade<br />of Expertise
                </h2>
                <p className="mt-6 text-[15px] leading-[1.8] text-zinc-300">
                  FIXONEX Adhesive is a forward-thinking construction chemical brand specializing in high-performance tile adhesives and epoxy solutions for modern construction and interior applications.
                  With more than a decade of experience in the tiles and ceramic industry, the brand is built on deep market knowledge, technical expertise, and a commitment to quality.
                </p>
                <div className="mt-8 flex items-center gap-8">
                  <div className="border-l-2 border-primary pl-4">
                    <p className="font-display text-4xl font-bold text-white tracking-tight">10+</p>
                    <p className="mt-1 text-sm text-zinc-400">Years in the industry</p>
                  </div>
                  <div className="border-l-2 border-white/20 pl-4">
                    <p className="font-display text-4xl font-bold text-white tracking-tight">5</p>
                    <p className="mt-1 text-sm text-zinc-400">Product grades</p>
                  </div>
                  <div className="border-l-2 border-white/20 pl-4">
                    <p className="font-display text-4xl font-bold text-white tracking-tight">20+</p>
                    <p className="mt-1 text-sm text-zinc-400">Grout colours</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Capabilities — dark section ── */}
      <section className="relative overflow-hidden bg-[#09090d] py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-[10%] top-0 h-[60%] w-[40%] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(211,47,47,0.1) 0%, transparent 70%)", filter: "blur(80px)" }}
        />
        <div className="grain-noise absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none" aria-hidden />
        <div className="site-container relative z-10">
          <FadeIn>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary mb-3">Capabilities</p>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.02em] text-white leading-tight max-w-2xl">
              What FIXONEX Does
            </h2>
          </FadeIn>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {capabilities.map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.08}>
                <article className="group relative overflow-hidden rounded-2xl border border-white/8 bg-white/[0.03] p-8 transition-all duration-300 hover:border-primary/30 hover:bg-white/[0.05]">
                  <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <item.icon className="h-6 w-6" aria-hidden />
                  </div>
                  <h3 className="font-display text-xl font-bold text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-400">{item.text}</p>
                  <div className="mt-6 h-px w-0 bg-primary/40 transition-all duration-500 group-hover:w-full" aria-hidden />
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Vision & Mission — full-bleed image with blur cards ── */}
      <section className="relative overflow-hidden" style={{ minHeight: "80vh" }}>
        {/* Background image — fills entire section */}
        <ImageWithFallback
          src={imageWide}
          alt="Construction team at work"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/70" aria-hidden />

        {/* Content */}
        <div className="relative z-10 flex min-h-[inherit] items-center py-20">
          <div className="site-container">
            <FadeIn className="mb-10">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary mb-2">Core Values</p>
              <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.02em] text-white leading-tight">
                Vision & Mission
              </h2>
            </FadeIn>
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Vision */}
              <FadeIn delay={0.08}>
                <div className="h-full rounded-2xl border border-white/15 bg-black/50 p-8 backdrop-blur-md">
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary mb-4">Vision</p>
                  <p className="text-[15px] leading-[1.8] text-zinc-200">
                    To establish FIXONEX as a trusted and innovative brand in tile installation solutions, delivering world-class tile adhesives and construction chemicals that ensure maximum bonding strength, durability, and long-lasting performance for modern architecture and interior spaces.
                  </p>
                </div>
              </FadeIn>
              {/* Mission */}
              <FadeIn delay={0.14}>
                <div className="h-full rounded-2xl border border-white/15 bg-black/50 p-8 backdrop-blur-md">
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary mb-4">Mission</p>
                  <ul className="space-y-3">
                    {missionPoints.map((line) => (
                      <li key={line} className="flex gap-3 text-[14px] leading-[1.7] text-zinc-300">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                        {line}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ── Company Info — dark card ── */}
      <section className="relative overflow-hidden bg-[#09090d] py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 top-0 h-[70%] w-[50%] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(234,88,12,0.08) 0%, transparent 70%)", filter: "blur(80px)" }}
        />
        <div className="grain-noise absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none" aria-hidden />
        <div className="site-container relative z-10">
          <div className="mx-auto max-w-[640px]">
            <FadeIn>
              <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-10 text-center">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary mb-4">Company Information</p>
                <p className="font-display text-2xl font-bold text-white tracking-tight">SWASTIK ENTERPRISES</p>
                <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                  FF, Block-D, Shop No. 102, Narayan Exotica, Ahmedabad-380052, Gujarat
                </p>
                <div className="mt-6 flex flex-col items-center gap-2">
                  <a href="tel:+917383838632" className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors">
                    +91 7383838632
                  </a>
                  <a href="mailto:info@fixonex.com" className="text-sm text-zinc-400 hover:text-white transition-colors">
                    info@fixonex.com
                  </a>
                  <p className="text-sm text-zinc-600">www.fixonex.com</p>
                </div>
                <Link
                  href="/contact"
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-primary/90"
                >
                  Contact Us
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Closing quote ── */}
      <section className="bg-white py-20 text-center">
        <div className="site-container">
          <FadeIn>
            <p className="font-display text-[clamp(1.75rem,4vw,2.75rem)] font-bold tracking-tight text-zinc-950">
              Every strong surface starts with the right bond.
            </p>
            <p className="mt-5 text-base text-zinc-500">{BRAND.tagline}</p>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
