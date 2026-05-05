"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  CheckCircle2, ArrowRight, Lightbulb, HeartHandshake,
  BadgeCheck, Leaf, Phone, Award
} from "lucide-react";
import { CertificationsMarquee } from "@/components/ui/CertificationsMarquee";
import { PageHero } from "@/components/ui/PageHero";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { BRAND } from "@/lib/brand";
import { companyInfo } from "@/data/company";
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

const keyPoints = [
  { icon: BadgeCheck, label: "Backed by 10+ years of experience" },
  { icon: Award,      label: "High-quality adhesives & grout systems" },
  { icon: Lightbulb,  label: "Focused on innovation & quality" },
  { icon: HeartHandshake, label: "Providing exceptional support" },
];

const stats = [
  { value: 10, suffix: "+", label: "Years of expertise" },
  { value: 5,  suffix: "",  label: "Product grades" },
  { value: 20, suffix: "+", label: "Grout colours" },
];

const certifications = [
  { label: "EN 12004",     sub: "European Standard" },
  { label: "IS 15477",     sub: "India Standard" },
  { label: "BIS",          sub: "Bureau of Indian Standards" },
  { label: "Made in India",sub: "Proudly local" },
];

const excellencePoints = [
  "Expert guidance for architects, contractors, and dealers at every stage.",
  "Tailored solutions that match your tile format, substrate, and exposure conditions.",
  "Consistent batch quality backed by certified formulations.",
  "Responsive after-sales support — we're with you from specification to punch-list.",
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="About"
        title="About FIXONEX"
        subtitle="Explore our premium adhesives and grout systems — built for flawless tile installations."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
        image="https://picsum.photos/seed/fixonex-about/1600/900"
      />

      {/* ── Who We Are ── */}
      <section className="relative overflow-hidden border-b border-zinc-200/40 bg-gradient-to-b from-[#fdfcfb] via-[#faf7f5] to-[#f8f5f2]">
        <div aria-hidden className="pointer-events-none absolute -right-[10%] top-[-10%] h-[60%] w-[50%] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(211,47,47,0.06) 0%, transparent 70%)", filter: "blur(80px)" }} />
        <div aria-hidden className="pointer-events-none absolute inset-0 dot-grid-subtle opacity-40" />

        <div className="site-container section-pad-lg relative z-10 grid gap-14 lg:grid-cols-2 lg:items-center">
          <SlideReveal direction="left">
            <p className="eyebrow-label mb-4">Who We Are</p>
            <h2 className="font-display font-bold text-zinc-950" style={{ fontSize: "clamp(2rem,4vw,3rem)", letterSpacing: "-0.04em", lineHeight: 1.1 }}>
              Driving Excellence in<br />Tile Installation
            </h2>
            <LineReveal className="mt-5 mb-6 bg-zinc-200" delay={0.2} />
            <p className="text-[15px] leading-[1.8] text-zinc-500">
              At FIXONEX, we bring over 10 years of tile industry expertise to deliver premium adhesives and grout systems tailored for flawless tile installations. Built on deep market knowledge, technical precision, and an unwavering commitment to quality.
            </p>

            {/* Key points */}
            <ul className="mt-8 space-y-3">
              {keyPoints.map((pt, i) => (
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
                src="https://picsum.photos/seed/fixonex-story/800/1200"
                alt="FIXONEX craftsmanship"
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

      {/* ── Building a Better Tiling Experience ── */}
      <section className="relative overflow-hidden border-b border-zinc-200/40 bg-gradient-to-b from-[#fdfcfb] via-[#faf7f5] to-[#f8f5f2]">
        <div aria-hidden className="pointer-events-none absolute inset-0 dot-grid-subtle opacity-30" />
        <div className="site-container section-pad-lg relative z-10 grid gap-14 lg:grid-cols-2 lg:items-center">
          <SlideReveal direction="left">
            <div className="relative overflow-hidden rounded-3xl shadow-[0_24px_64px_rgba(0,0,0,0.1)] aspect-[4/3]">
              <ImageWithFallback
                src="https://picsum.photos/seed/fixonex-mission/1200/800"
                alt="FIXONEX team at work"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </SlideReveal>

          <SlideReveal direction="right">
            <p className="eyebrow-label mb-4">Our Purpose</p>
            <h2 className="font-display font-bold text-zinc-950" style={{ fontSize: "clamp(2rem,4vw,3rem)", letterSpacing: "-0.04em", lineHeight: 1.1 }}>
              Building a Better<br />Tiling Experience
            </h2>
            <LineReveal className="mt-5 mb-8 bg-zinc-200" delay={0.2} />

            <div className="space-y-5">
              <TiltCard className="rounded-3xl border border-zinc-200/70 bg-white p-6 shadow-[0_2px_16px_rgba(0,0,0,0.05)]">
                <div className="flex items-center gap-3 mb-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-orange-500 shadow-md">
                    <Lightbulb className="h-4 w-4 text-white" aria-hidden />
                  </span>
                  <p className="font-display text-base font-bold text-zinc-950">Our Mission</p>
                </div>
                <p className="text-[14px] leading-[1.8] text-zinc-600">
                  We are on a mission to provide high-quality adhesives and grout systems, along with expert guidance, ensuring seamless, durable, and beautiful tile installations across India.
                </p>
              </TiltCard>

              <TiltCard className="rounded-3xl border border-zinc-200/70 bg-white p-6 shadow-[0_2px_16px_rgba(0,0,0,0.05)]">
                <div className="flex items-center gap-3 mb-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-emerald-500 shadow-md">
                    <Award className="h-4 w-4 text-white" aria-hidden />
                  </span>
                  <p className="font-display text-base font-bold text-zinc-950">Our Vision</p>
                </div>
                <p className="text-[14px] leading-[1.8] text-zinc-600">
                  To become the benchmark for tile installation solutions in India — delivering world-class adhesives and construction chemicals for modern architecture and lasting results.
                </p>
              </TiltCard>
            </div>
          </SlideReveal>
        </div>
      </section>

      {/* ── Choice for Excellence ── */}
      <section className="relative overflow-hidden border-b border-zinc-200/40 bg-white">
        <div aria-hidden className="pointer-events-none absolute left-[-10%] top-0 h-[60%] w-[40%] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(211,47,47,0.05) 0%, transparent 70%)", filter: "blur(80px)" }} />

        <div className="site-container section-pad-lg relative z-10">
          <div className="grid gap-14 lg:grid-cols-2 lg:items-start">
            <SlideReveal direction="left">
              <p className="eyebrow-label mb-4">The Choice for Excellence</p>
              <h2 className="font-display font-bold text-zinc-950" style={{ fontSize: "clamp(2rem,4vw,3rem)", letterSpacing: "-0.04em", lineHeight: 1.1 }}>
                in Tile Solutions
              </h2>
              <LineReveal className="mt-5 mb-6 bg-zinc-200" delay={0.2} />
              <p className="text-[15px] leading-[1.8] text-zinc-500">
                Trust FIXONEX for superior adhesives, grout systems, and installation solutions. FIXONEX stands as a trusted name in the tile installation industry, with over 10 years of expertise. We offer a comprehensive range of high-quality adhesives and grouts, tailored for various tile types and applications.
              </p>
              <p className="mt-4 text-[15px] leading-[1.8] text-zinc-500">
                Our products ensure durable, long-lasting results while enhancing the aesthetic appeal of your spaces.
              </p>
              <p className="mt-4 text-[15px] leading-[1.8] text-zinc-500">
                What sets us apart is our deep commitment to providing expert guidance to customers. Whether you're a professional contractor, architect, or dealer — we help you select the right products for each unique project.
              </p>
            </SlideReveal>

            <SlideReveal direction="right" delay={0.1}>
              <div className="space-y-4 lg:pt-20">
                {excellencePoints.map((point, i) => (
                  <motion.div key={point}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.08, ease: easeExpo }}
                    className="flex items-start gap-4 rounded-2xl border border-zinc-100 bg-zinc-50/60 px-5 py-4 hover:border-primary/20 hover:bg-white transition-all duration-300"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
                    <p className="text-[14px] leading-[1.7] text-zinc-600">{point}</p>
                  </motion.div>
                ))}
              </div>
            </SlideReveal>
          </div>
        </div>
      </section>

      {/* ── Certifications ── */}
      <section className="relative overflow-hidden border-b border-zinc-200/40 bg-gradient-to-b from-[#fdfcfb] to-[#f8f5f2]">
        <div aria-hidden className="pointer-events-none absolute inset-0 dot-grid-subtle opacity-30" />
        <div className="site-container section-pad-md relative z-10">
          <Reveal className="mb-10 text-center">
            <p className="eyebrow-label mx-auto mb-4">Certifications</p>
            <h2 className="font-display font-bold text-zinc-950" style={{ fontSize: "clamp(1.75rem,3.5vw,2.5rem)", letterSpacing: "-0.04em" }}>
              Standards You Can Trust
            </h2>
          </Reveal>
          <Stagger className="grid gap-5 grid-cols-2 sm:grid-cols-4">
            {certifications.map((cert) => (
              <StaggerItem key={cert.label}>
                <TiltCard className="flex flex-col items-center justify-center gap-2 rounded-3xl border border-zinc-200/70 bg-white p-6 text-center shadow-[0_4px_24px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.09)] transition-shadow duration-400">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-orange-500/10 border border-primary/15">
                    <BadgeCheck className="h-6 w-6 text-primary" aria-hidden />
                  </span>
                  <p className="font-display text-base font-bold text-zinc-950">{cert.label}</p>
                  <p className="text-[11px] text-zinc-500">{cert.sub}</p>
                </TiltCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── Certifications Marquee ── */}
      <CertificationsMarquee />

      {/* ── Indian Innovation, National Sustainability ── */}
      <section className="relative overflow-hidden border-b border-zinc-200/40 bg-white">
        <div className="site-container section-pad-lg relative z-10">
          <div className="grid gap-8 lg:grid-cols-2">
            <FadeIn>
              <TiltCard className="h-full overflow-hidden rounded-3xl border border-zinc-200/70 bg-gradient-to-br from-[#fdfcfb] to-[#f8f5f2] p-8 shadow-[0_4px_24px_rgba(0,0,0,0.05)]">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 shadow-lg mb-5">
                  <Leaf className="h-6 w-6 text-white" aria-hidden />
                </span>
                <h3 className="font-display text-xl font-bold text-zinc-950 mb-3">Indian Innovation</h3>
                <p className="text-[14px] leading-[1.8] text-zinc-600">
                  Driven by innovative solutions from India, we create high-quality tile installation products that meet global standards for performance and durability. Proudly manufacturing in Gujarat, fostering local innovation and growth.
                </p>
              </TiltCard>
            </FadeIn>
            <FadeIn delay={0.1}>
              <TiltCard className="h-full overflow-hidden rounded-3xl border border-zinc-200/70 bg-gradient-to-br from-[#f0fdf9] to-[#f5f5f5] p-8 shadow-[0_4px_24px_rgba(0,0,0,0.05)]">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-500 shadow-lg mb-5">
                  <Leaf className="h-6 w-6 text-white" aria-hidden />
                </span>
                <h3 className="font-display text-xl font-bold text-zinc-950 mb-3">Sustainability Focus</h3>
                <p className="text-[14px] leading-[1.8] text-zinc-600">
                  Committed to responsible practices — formulating low-VOC products and ensuring long-lasting bonds that reduce rework, demolition waste, and material throughput. Bonds that last are bonds that matter.
                </p>
              </TiltCard>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Always Ready to Help ── */}
      <section className="relative overflow-hidden border-b border-zinc-200/40 bg-gradient-to-b from-[#fdfcfb] to-[#f8f5f2]">
        <div aria-hidden className="pointer-events-none absolute inset-0 dot-grid-subtle opacity-30" />
        <div className="site-container section-pad-md relative z-10">
          <FadeIn>
            <TiltCard className="overflow-hidden rounded-3xl border border-zinc-200/70 bg-white shadow-[0_8px_32px_rgba(0,0,0,0.07)]">
              <div className="p-8 md:p-12 text-center">
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-orange-500 shadow-lg mb-6">
                  <Phone className="h-7 w-7 text-white" aria-hidden />
                </span>
                <h2 className="font-display text-2xl font-bold text-zinc-950">
                  We're Always Ready to Help You
                </h2>
                <p className="mt-3 text-[15px] text-zinc-500">
                  Answer your questions, validate your specification, or guide your installation. Our team is one call away.
                </p>
                <p className="mt-4 font-display text-2xl font-black text-primary">+91 7383838632</p>
                <p className="mt-1 text-sm text-zinc-400">
                  {companyInfo.registeredAddress.city}, {companyInfo.registeredAddress.state}
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-4">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button asChild variant="primary" className="rounded-full shadow-[0_4px_16px_rgba(211,47,47,0.3)]">
                      <TransitionLink href="/contact" className="inline-flex items-center gap-2">
                        Contact Us <ArrowRight className="h-4 w-4" aria-hidden />
                      </TransitionLink>
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button asChild variant="outline" className="rounded-full border-zinc-300">
                      <TransitionLink href="/products">Explore Products</TransitionLink>
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
