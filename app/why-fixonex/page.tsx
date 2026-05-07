"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  CheckCircle2, ArrowRight, Award, Layers, FlaskConical,
  ShieldCheck, Handshake, Star, BadgeCheck, Zap, Building2, Home
} from "lucide-react";
import { CertificationsMarquee } from "@/components/ui/CertificationsMarquee";
import { SimplePageHero } from "@/components/ui/SimplePageHero";
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

const expertisePoints = [
  { icon: BadgeCheck, label: "10+ years of tile industry expertise" },
  { icon: Award,      label: "Certified to EN 12004 & IS 15477:2019" },
  { icon: FlaskConical, label: "Continuous R&D and innovation" },
  { icon: Handshake,  label: "Dedicated technical support at every stage" },
];

const stats = [
  { value: 10, suffix: "+", label: "Years of expertise" },
  { value: 5,  suffix: "",  label: "Product grades (C1T – C2TES2)" },
  { value: 20, suffix: "+", label: "Epoxy grout colours" },
];

const productCategories = [
  {
    icon: Layers,
    title: "Tile Adhesives",
    text: "Five certified grades — from standard C1T interior adhesives to high-deformability C2TES2 formulations for pools and large-format porcelain.",
    gradient: "from-primary to-orange-500",
    href: "/products/tiles-adhesive",
  },
  {
    icon: Star,
    title: "Epoxy Grout",
    text: "High-strength, stain-resistant epoxy grout in 20+ colours. Designed to work seamlessly alongside every FIXONEX adhesive grade.",
    gradient: "from-teal-500 to-emerald-500",
    href: "/products",
  },
  {
    icon: Building2,
    title: "Commercial Projects",
    text: "Large-format tiles, exterior facades, and high-traffic floors — FIXONEX delivers the bond strength and compliance documentation commercial projects demand.",
    gradient: "from-violet-500 to-purple-500",
    href: "/contact",
  },
  {
    icon: Home,
    title: "Residential Interiors",
    text: "From bathroom walls to living-room vitrified floors, our system approach gives architects and contractors one trusted source for adhesive and grout.",
    gradient: "from-blue-500 to-indigo-500",
    href: "/products",
  },
];

const experiencePoints = [
  "Polymer-enhanced adhesive matrix for superior flexibility and bond strength.",
  "Non-slip, non-sag formula — holds large tiles vertically without slipping.",
  "Extended open time for precise large-format alignment on site.",
  "Low VOC formulations — safer for installers, residents, and the environment.",
  "Compatible with underfloor heating systems and swimming pools.",
  "Consistent batch-to-batch performance backed by certified quality control.",
];

export default function WhyFixonexPage() {
  return (
    <>
      <SimplePageHero
        label="Why FIXONEX"
        titleLine1="Why"
        titleLine2="FIXONEX"
        subtitle="A decade of tile industry expertise, internationally certified formulations, and genuine technical support — all in one trusted system."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Why FIXONEX" }]}
      />

      {/* ── Quality & Expertise Combined ── */}
      <section className="relative overflow-hidden border-b border-zinc-200/40 bg-gradient-to-b from-[#fdfcfb] via-[#faf7f5] to-[#f8f5f2]">
        <div aria-hidden className="pointer-events-none absolute -right-[10%] top-[-10%] h-[60%] w-[50%] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(211,47,47,0.06) 0%, transparent 70%)", filter: "blur(80px)" }} />
        <div aria-hidden className="pointer-events-none absolute inset-0 dot-grid-subtle opacity-40" />

        <div className="site-container section-pad-lg relative z-10 grid gap-14 lg:grid-cols-2 lg:items-center">
          <SlideReveal direction="left">
            <p className="eyebrow-label mb-4">Quality &amp; Expertise Combined</p>
            <h2 className="font-display font-bold text-zinc-950" style={{ fontSize: "clamp(2rem,4vw,3rem)", letterSpacing: "-0.04em", lineHeight: 1.1 }}>
              A Decade of Expertise<br />in Every Bond
            </h2>
            <LineReveal className="mt-5 mb-6 bg-zinc-200" delay={0.2} />
            <p className="text-[15px] leading-[1.8] text-zinc-500">
              With over 10 years in the tile industry, FIXONEX has developed a balanced approach where durability, performance, and aesthetics come together seamlessly. We bring that depth of experience to every product, every specification, and every installation.
            </p>
            <p className="mt-4 text-[15px] leading-[1.8] text-zinc-500">
              Our product range is carefully tailored — from lightweight interior ceramics to heavy natural stone, exterior facades, and swimming pools. Whatever the project demands, there's a FIXONEX grade engineered for it.
            </p>
            <p className="mt-4 text-[15px] leading-[1.8] text-zinc-500">
              We are committed to ongoing innovation and staying ahead of evolving installation standards, tile formats, and construction methods — so your projects are always supported by the latest thinking.
            </p>

            {/* Key expertise points */}
            <ul className="mt-8 space-y-3">
              {expertisePoints.map((pt, i) => (
                <motion.li key={pt.label}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.07, ease: easeExpo }}
                  className="flex items-center gap-3"
                >
                  <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-primary/8 border border-primary/15">
                    <pt.icon className="h-4 w-4 text-primary" aria-hidden />
                  </span>
                  <span className="text-[14px] font-medium text-zinc-700">{pt.label}</span>
                </motion.li>
              ))}
            </ul>
          </SlideReveal>

          <SlideReveal direction="right">
            <div className="relative overflow-hidden rounded-3xl shadow-[0_24px_64px_rgba(0,0,0,0.1)] aspect-[3/4]">
              <ImageWithFallback
                src="https://picsum.photos/seed/fixonex-expertise/800/1200"
                alt="FIXONEX tile installation expertise"
                fill
                className="object-cover object-center transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-tl from-primary/8 via-transparent to-transparent" />
            </div>
          </SlideReveal>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="relative overflow-hidden border-b border-zinc-200/40 bg-white">
        <div className="site-container section-pad-md relative z-10">
          <div className="grid gap-6 sm:grid-cols-3">
            {stats.map((s, i) => (
              <motion.div key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: easeExpo }}
              >
                <TiltCard className="rounded-3xl border border-zinc-200/70 bg-white p-8 text-center shadow-[0_4px_24px_rgba(0,0,0,0.05)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.09)] transition-shadow duration-500">
                  <p className="font-display text-5xl font-black text-primary">
                    <CountUp value={String(s.value)} />{s.suffix}
                  </p>
                  <p className="mt-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-zinc-500">{s.label}</p>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Comprehensive Product Range ── */}
      <section className="relative overflow-hidden border-b border-zinc-200/40 bg-gradient-to-b from-[#f0f7ff] via-[#f4f7fb] to-[#eef2f8]">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-[10%] top-0 h-[60%] w-[40%] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(211,47,47,0.06) 0%, transparent 70%)", filter: "blur(80px)" }}
        />
        <div aria-hidden className="pointer-events-none absolute inset-0 dot-grid-subtle opacity-30" />
        <div className="site-container section-pad-lg relative z-10">
          <Reveal className="mb-12 text-center">
            <p className="eyebrow-label mx-auto mb-4">Comprehensive Product Range</p>
            <h2 className="font-display font-bold text-zinc-950" style={{ fontSize: "clamp(2rem,4vw,3rem)", letterSpacing: "-0.04em", lineHeight: 1.1 }}>
              One System.<br />Every Application.
            </h2>
            <p className="mt-5 mx-auto max-w-xl text-[15px] leading-[1.8] text-zinc-500">
              From adhesives and grouts for modest residential bathrooms to high-load commercial facades — FIXONEX products cover every tile type, substrate, and exposure condition.
            </p>
          </Reveal>

          <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {productCategories.map((cat) => (
              <StaggerItem key={cat.title}>
                <TransitionLink href={cat.href} className="group block h-full">
                  <TiltCard className="flex h-full flex-col overflow-hidden rounded-3xl border border-white/90 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_50px_rgba(0,0,0,0.10)] transition-shadow duration-500">
                    <div className="p-7 pb-5">
                      <span className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${cat.gradient} shadow-lg`}>
                        <cat.icon className="h-6 w-6 text-white" aria-hidden />
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col px-7 pb-7 pt-2">
                      <h3 className="font-display text-base font-semibold text-zinc-950 group-hover:text-primary transition-colors duration-300">{cat.title}</h3>
                      <p className="mt-2 text-[13px] leading-relaxed text-zinc-500">{cat.text}</p>
                      <div className="mt-auto pt-4 flex items-center gap-1 text-[12px] font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Learn more <ArrowRight className="h-3 w-3" aria-hidden />
                      </div>
                    </div>
                  </TiltCard>
                </TransitionLink>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── Certifications Marquee ── */}
      <CertificationsMarquee />

      {/* ── Built on Experience ── */}
      <section className="relative overflow-hidden border-b border-zinc-200/40 bg-gradient-to-b from-[#fdfcfb] via-[#faf7f5] to-[#f8f5f2]">
        <div aria-hidden className="pointer-events-none absolute inset-0 dot-grid-subtle opacity-30" />
        <div className="site-container section-pad-lg relative z-10 grid gap-14 lg:grid-cols-2 lg:items-center">
          <SlideReveal direction="left">
            <div className="relative overflow-hidden rounded-3xl shadow-[0_24px_64px_rgba(0,0,0,0.1)] aspect-[4/3]">
              <ImageWithFallback
                src="https://picsum.photos/seed/fixonex-built/1200/900"
                alt="FIXONEX quality manufacturing"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </SlideReveal>

          <SlideReveal direction="right">
            <p className="eyebrow-label mb-4">Built on Experience</p>
            <h2 className="font-display font-bold text-zinc-950" style={{ fontSize: "clamp(2rem,4vw,3rem)", letterSpacing: "-0.04em", lineHeight: 1.1 }}>
              Reliable, Durable Products<br />Backed by Research
            </h2>
            <LineReveal className="mt-5 mb-6 bg-zinc-200" delay={0.2} />
            <p className="text-[15px] leading-[1.8] text-zinc-500">
              More than 10 years in tile manufacturing means our formulations are refined by real-world learning — not just lab theory. Every FIXONEX product is stress-tested for Indian climate conditions, from coastal humidity to dry desert heat.
            </p>
            <p className="mt-4 text-[15px] leading-[1.8] text-zinc-500">
              Our ongoing commitment to research means you always benefit from the latest polymer science, substrate compatibility studies, and compliance updates.
            </p>

            <ul className="mt-8 space-y-3">
              {experiencePoints.map((point, i) => (
                <motion.li key={point}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.07, ease: easeExpo }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
                  <span className="text-[14px] leading-[1.7] text-zinc-600">{point}</span>
                </motion.li>
              ))}
            </ul>
          </SlideReveal>
        </div>
      </section>

      {/* ── Trusted by Professionals ── */}
      <section className="relative overflow-hidden border-b border-zinc-200/40 bg-white">
        <div aria-hidden className="pointer-events-none absolute left-[-10%] top-0 h-[60%] w-[40%] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(211,47,47,0.05) 0%, transparent 70%)", filter: "blur(80px)" }} />

        <div className="site-container section-pad-lg relative z-10">
          <div className="grid gap-14 lg:grid-cols-2 lg:items-start">
            <SlideReveal direction="left">
              <p className="eyebrow-label mb-4">Trusted by Professionals</p>
              <h2 className="font-display font-bold text-zinc-950" style={{ fontSize: "clamp(2rem,4vw,3rem)", letterSpacing: "-0.04em", lineHeight: 1.1 }}>
                The Choice of Architects,<br />Contractors &amp; Dealers
              </h2>
              <LineReveal className="mt-5 mb-6 bg-zinc-200" delay={0.2} />
              <p className="text-[15px] leading-[1.8] text-zinc-500">
                Across Gujarat and India, FIXONEX is the trusted specification for professionals who can't afford to gamble on a bond. Our products are designed to perform as documented — every bag, every batch, every time.
              </p>
              <p className="mt-4 text-[15px] leading-[1.8] text-zinc-500">
                Architects rely on our compliance with EN 12004 and IS 15477 to satisfy their project specifications. Contractors trust our consistent mix and open time to maintain installation speed. Dealers recommend FIXONEX because their customers come back satisfied.
              </p>
              <p className="mt-4 text-[15px] leading-[1.8] text-zinc-500">
                Whether you are specifying a premium hotel interior, laying a large commercial floor, or recommending a product to a homeowner — FIXONEX gives you confidence in every bond.
              </p>
            </SlideReveal>

            <SlideReveal direction="right" delay={0.1}>
              <div className="space-y-4 lg:pt-20">
                {[
                  { icon: ShieldCheck, title: "Independently Tested", text: "Thermal cycling, moisture resistance, and shear load testing beyond standard requirements." },
                  { icon: Zap,         title: "Modern Format Ready", text: "Large-format tiles, thin porcelain slabs, and natural stone demand higher-spec adhesives. We deliver." },
                  { icon: Award,       title: "Certified Documentation", text: "Full TDS, application guides, and compliance certificates available for every product grade." },
                ].map((item, i) => (
                  <motion.div key={item.title}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.09, ease: easeExpo }}
                    className="flex items-start gap-4 rounded-2xl border border-zinc-100 bg-zinc-50/60 px-5 py-4 hover:border-primary/20 hover:bg-white transition-all duration-300"
                  >
                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/8 border border-primary/15">
                      <item.icon className="h-4 w-4 text-primary" aria-hidden />
                    </span>
                    <div>
                      <p className="text-[14px] font-semibold text-zinc-900">{item.title}</p>
                      <p className="mt-1 text-[13px] leading-[1.7] text-zinc-500">{item.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </SlideReveal>
          </div>
        </div>
      </section>

      {/* ── CTA card ── */}
      <section className="relative overflow-hidden border-b border-zinc-200/40 bg-gradient-to-b from-[#fdfcfb] to-[#f8f5f2]">
        <div aria-hidden className="pointer-events-none absolute inset-0 dot-grid-subtle opacity-30" />
        <div className="site-container section-pad-md relative z-10">
          <FadeIn>
            <TiltCard className="overflow-hidden rounded-3xl border border-zinc-200/70 bg-white shadow-[0_8px_32px_rgba(0,0,0,0.07)]">
              <div className="p-8 md:p-12 text-center">
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-orange-500 shadow-lg mb-6">
                  <Star className="h-7 w-7 text-white" aria-hidden />
                </span>
                <h2 className="font-display text-2xl font-bold text-zinc-950">
                  Ready to Specify FIXONEX?
                </h2>
                <p className="mt-3 max-w-lg mx-auto text-[15px] text-zinc-500">
                  Explore our full range of certified tile adhesives and grout systems, or contact our technical team to discuss your project requirements.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-4">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button asChild variant="primary" className="rounded-full shadow-[0_4px_16px_rgba(211,47,47,0.3)]">
                      <TransitionLink href="/products" className="inline-flex items-center gap-2">
                        Explore Products <ArrowRight className="h-4 w-4" aria-hidden />
                      </TransitionLink>
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button asChild variant="outline" className="rounded-full border-zinc-300">
                      <TransitionLink href="/contact">Get Started</TransitionLink>
                    </Button>
                  </motion.div>
                </div>
              </div>
              <div className="h-1.5 bg-gradient-to-r from-primary via-orange-500 to-amber-400" />
            </TiltCard>
          </FadeIn>
        </div>
      </section>

      {/* ── Closing quote ── */}
      <section className="bg-white py-20 text-center">
        <div className="site-container">
          <FadeIn>
            <p className="font-display font-bold tracking-tight text-zinc-950" style={{ fontSize: "clamp(1.75rem,4vw,2.75rem)" }}>
              Every strong surface starts with the right bond.
            </p>
            <p className="mt-5 text-base text-zinc-500">{BRAND.tagline}</p>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
