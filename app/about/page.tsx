"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Building2, Gem, Headphones, ArrowRight, Star, CheckCircle2, Users, Award, Zap } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { BRAND } from "@/lib/brand";
import { TiltCard } from "@/components/ui/TiltCard";
import { Reveal, Stagger, StaggerItem, LineReveal, SlideReveal, CountUp } from "@/components/motion/Reveal";
import { TransitionLink } from "@/components/navigation/TransitionLink";
import { Button } from "@/components/ui/button";

const easeExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} className={className}
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
    gradient: "from-rose-500 to-orange-500",
    bg: "from-rose-50 to-orange-50",
  },
  {
    icon: Gem,
    title: "Designer epoxy grout",
    text: "Stain-resistant epoxy grout in 20+ colours for residential, commercial, and wet-area installations.",
    gradient: "from-teal-500 to-emerald-500",
    bg: "from-teal-50 to-emerald-50",
  },
  {
    icon: Headphones,
    title: "End-to-end support",
    text: "Practical guidance for architects, contractors, and dealers from specification through application.",
    gradient: "from-blue-500 to-indigo-500",
    bg: "from-blue-50 to-indigo-50",
  },
];

const stats = [
  { value: 10, suffix: "+", label: "Years in the industry" },
  { value: 5, suffix: "", label: "Product grades" },
  { value: 20, suffix: "+", label: "Grout colours" },
];

const values = [
  { icon: Star, title: "Quality First", text: "Every formulation is tested against EN 12004 and IS 15477:2019 standards." },
  { icon: Users, title: "Partner-centric", text: "We treat every dealer, contractor, and architect as a long-term partner." },
  { icon: Award, title: "Innovation-driven", text: "Our R&D continuously improves polymer chemistry for better bond integrity." },
  { icon: Zap, title: "Site-ready", text: "Products engineered for Indian climate conditions — coastal to desert." },
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
        image="https://picsum.photos/seed/fixonex-about/1600/900"
      />

      {/* ── Our Story — split screen ── */}
      <section className="relative overflow-hidden border-b border-zinc-200/40 bg-gradient-to-b from-[#fdfcfb] via-[#faf7f5] to-[#f8f5f2]">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-[10%] top-[-10%] h-[60%] w-[50%] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(211,47,47,0.06) 0%, transparent 70%)", filter: "blur(80px)" }}
        />
        <div aria-hidden className="pointer-events-none absolute inset-0 dot-grid-subtle opacity-40" />

        <div className="site-container section-pad-lg relative z-10 grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Left: text */}
          <SlideReveal direction="left">
            <p className="eyebrow-label mb-5">Our Story</p>
            <h2 className="font-display font-bold text-zinc-950" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.04em", lineHeight: 1.1 }}>
              Built on a Decade<br />of Expertise
            </h2>
            <LineReveal className="mt-5 mb-6 bg-zinc-200" delay={0.2} />
            <p className="text-[15px] leading-[1.8] text-zinc-500">
              FIXONEX Adhesive is a forward-thinking construction chemical brand specializing in high-performance tile adhesives and epoxy solutions for modern construction and interior applications.
              With more than a decade of experience in the tiles and ceramic industry, the brand is built on deep market knowledge, technical expertise, and a commitment to quality.
            </p>

            {/* Stats */}
            <div className="mt-10 grid grid-cols-3 gap-4">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.08, ease: easeExpo }}
                  className="rounded-2xl border border-zinc-200/70 bg-white p-4 text-center shadow-[0_2px_12px_rgba(0,0,0,0.04)]"
                >
                  <p className="font-display text-3xl font-bold text-primary stat-number">
                    <CountUp to={s.value} />{s.suffix}
                  </p>
                  <p className="mt-1.5 text-[11px] font-medium text-zinc-500">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </SlideReveal>

          {/* Right: image */}
          <SlideReveal direction="right">
            <div className="relative overflow-hidden rounded-3xl shadow-[0_24px_64px_rgba(0,0,0,0.1)] aspect-[3/4]">
              <ImageWithFallback
                src={imageTall}
                alt="FIXONEX quality and craftsmanship"
                fill
                className="object-cover object-center transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Color tint overlay */}
              <div className="absolute inset-0 bg-gradient-to-tl from-primary/5 via-transparent to-transparent" />
            </div>
          </SlideReveal>
        </div>
      </section>

      {/* ── Capabilities — card grid ── */}
      <section className="relative overflow-hidden border-b border-zinc-200/40 bg-gradient-to-b from-[#f0f7ff] via-[#f4f7fb] to-[#eef2f8]">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-[10%] top-0 h-[60%] w-[40%] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(13,148,136,0.07) 0%, transparent 70%)", filter: "blur(80px)" }}
        />
        <div className="site-container section-pad-lg relative z-10">
          <Reveal className="mb-12">
            <p className="eyebrow-label mb-4">Capabilities</p>
            <h2 className="font-display font-bold text-zinc-950" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.04em", lineHeight: 1.1 }}>
              What FIXONEX Does
            </h2>
          </Reveal>
          <Stagger className="grid gap-6 md:grid-cols-3">
            {capabilities.map((item, i) => (
              <StaggerItem key={item.title}>
                <TiltCard className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/90 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_50px_rgba(0,0,0,0.1)] transition-shadow duration-500">
                  <div className={`p-7 pb-5 bg-gradient-to-br ${item.bg}`}>
                    <span className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${item.gradient} shadow-lg`}>
                      <item.icon className="h-6 w-6 text-white" aria-hidden />
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-7 pt-5">
                    <h3 className="font-display text-xl font-semibold text-zinc-950 group-hover:text-primary transition-colors duration-300">{item.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-zinc-500">{item.text}</p>
                    <div className="mt-auto pt-5">
                      <div className="h-[2px] w-0 rounded-full bg-gradient-to-r from-primary to-orange-500 transition-all duration-500 group-hover:w-full" aria-hidden />
                    </div>
                  </div>
                </TiltCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── Vision & Mission — split screen with image ── */}
      <section className="relative overflow-hidden border-b border-zinc-200/40 bg-gradient-to-b from-[#fdfcfb] via-white to-[#faf7f5]">
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 top-0 h-[60%] w-[40%] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(211,47,47,0.05) 0%, transparent 70%)", filter: "blur(80px)" }}
        />

        <div className="site-container section-pad-lg relative z-10 grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Left: image */}
          <SlideReveal direction="left">
            <div className="relative overflow-hidden rounded-3xl shadow-[0_24px_64px_rgba(0,0,0,0.1)] aspect-[4/3]">
              <ImageWithFallback
                src={imageWide}
                alt="Construction team at work"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </SlideReveal>

          {/* Right: content */}
          <SlideReveal direction="right">
            <p className="eyebrow-label mb-5">Core Values</p>
            <h2 className="font-display font-bold text-zinc-950" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.04em", lineHeight: 1.1 }}>
              Vision &amp; Mission
            </h2>
            <LineReveal className="mt-5 mb-8 bg-zinc-200" delay={0.2} />

            <div className="space-y-5">
              {/* Vision */}
              <TiltCard className="group rounded-3xl border border-zinc-200/70 bg-white p-6 shadow-[0_2px_16px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.08)] transition-shadow duration-400">
                <p className="eyebrow-label mb-3">Vision</p>
                <p className="text-[14px] leading-[1.8] text-zinc-600">
                  To establish FIXONEX as a trusted and innovative brand in tile installation solutions, delivering world-class adhesives and construction chemicals for modern architecture.
                </p>
              </TiltCard>

              {/* Mission */}
              <TiltCard className="group rounded-3xl border border-zinc-200/70 bg-white p-6 shadow-[0_2px_16px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.08)] transition-shadow duration-400">
                <p className="eyebrow-label mb-3">Mission</p>
                <ul className="space-y-2.5">
                  {missionPoints.map((line) => (
                    <li key={line} className="flex gap-3 text-[13px] leading-[1.7] text-zinc-600">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                      {line}
                    </li>
                  ))}
                </ul>
              </TiltCard>
            </div>
          </SlideReveal>
        </div>
      </section>

      {/* ── Core Values ── */}
      <section className="relative overflow-hidden border-b border-zinc-200/40 bg-gradient-to-br from-[#f8f5ff] to-[#f3f0ff]">
        <div
          aria-hidden
          className="pointer-events-none absolute right-[-8%] top-[-10%] h-[50%] w-[45%]"
          style={{ background: "radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)", filter: "blur(80px)" }}
        />
        <div className="site-container section-pad-lg relative z-10">
          <Reveal className="mb-12">
            <p className="eyebrow-label mb-4">Values</p>
            <h2 className="font-display font-bold text-zinc-950" style={{ fontSize: "clamp(1.9rem, 4vw, 2.9rem)", letterSpacing: "-0.04em", lineHeight: 1.12 }}>
              What drives us every day.
            </h2>
          </Reveal>
          <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <StaggerItem key={v.title}>
                <TiltCard className="group flex h-full flex-col overflow-hidden rounded-3xl border border-zinc-200/70 bg-white p-6 shadow-[0_2px_16px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-shadow duration-400">
                  <span className="inline-flex rounded-2xl bg-gradient-to-br from-violet-100 to-indigo-100 p-4 shadow-sm">
                    <v.icon className="h-6 w-6 text-violet-700" aria-hidden />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-semibold text-zinc-950 group-hover:text-violet-700 transition-colors duration-300">{v.title}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-zinc-500">{v.text}</p>
                </TiltCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── Company Info — light card ── */}
      <section className="relative overflow-hidden border-b border-zinc-200/40 bg-gradient-to-b from-[#fdfcfb] to-[#faf7f5]">
        <div aria-hidden className="pointer-events-none absolute inset-0 dot-grid-subtle opacity-40" />
        <div className="site-container section-pad-md relative z-10">
          <div className="mx-auto max-w-[640px]">
            <FadeIn>
              <TiltCard className="overflow-hidden rounded-3xl border border-zinc-200/70 bg-white shadow-[0_8px_32px_rgba(0,0,0,0.07)]">
                <div className="p-8 md:p-10 text-center">
                  <p className="eyebrow-label mx-auto mb-4">Company Information</p>
                  <p className="font-display text-2xl font-bold text-zinc-950 tracking-tight">SWASTIK ENTERPRISES</p>
                  <p className="mt-4 text-sm leading-relaxed text-zinc-500">
                    FF, Block-D, Shop No. 102, Narayan Exotica, Ahmedabad-380052, Gujarat
                  </p>
                  <div className="mt-6 flex flex-col items-center gap-2">
                    <a href="tel:+917383838632" className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors">
                      +91 7383838632
                    </a>
                    <a href="mailto:info@fixonex.com" className="text-sm text-zinc-500 hover:text-zinc-800 transition-colors">
                      info@fixonex.com
                    </a>
                  </div>
                  <motion.div className="mt-8" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button asChild variant="primary" className="rounded-full shadow-[0_4px_16px_rgba(211,47,47,0.3)]">
                      <TransitionLink href="/contact" className="inline-flex items-center gap-2">
                        Contact Us <ArrowRight className="h-4 w-4" aria-hidden />
                      </TransitionLink>
                    </Button>
                  </motion.div>
                </div>
                {/* Accent strip */}
                <div className="h-1.5 bg-gradient-to-r from-primary via-orange-500 to-amber-400" />
              </TiltCard>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Closing quote ── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#faf7f5] to-white py-20 text-center">
        <div className="site-container">
          <FadeIn>
            <p className="font-display font-bold tracking-tight text-zinc-950" style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}>
              Every strong surface starts with the right bond.
            </p>
            <p className="mt-5 text-base text-zinc-500">{BRAND.tagline}</p>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
