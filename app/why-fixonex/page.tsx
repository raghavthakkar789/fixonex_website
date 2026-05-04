"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Award, CheckCircle2, FlaskConical, Handshake, Layers, ShieldCheck, Star, Zap, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
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

const reasons = [
  {
    icon: Award,
    title: "Certified Quality",
    text: "Every product line is aligned with EN 12004 international standards and IS 15477:2019, so you get tested, documented performance — not just marketing claims.",
    gradient: "from-amber-500 to-orange-500",
    bg: "from-amber-50 to-orange-50",
  },
  {
    icon: Layers,
    title: "Complete System Approach",
    text: "From substrate preparation to final grout finish, FIXONEX offers a coordinated system — adhesive, spacer, and grout — tested to work together.",
    gradient: "from-teal-500 to-emerald-500",
    bg: "from-teal-50 to-emerald-50",
  },
  {
    icon: FlaskConical,
    title: "Advanced Formulations",
    text: "Our in-house R&D team continuously refines polymer chemistry to deliver better open time, sag resistance, and long-term bond integrity.",
    gradient: "from-violet-500 to-purple-500",
    bg: "from-violet-50 to-purple-50",
  },
  {
    icon: Zap,
    title: "Ready for Modern Formats",
    text: "Large-format tiles, thin porcelain slabs, and natural stone demand high-coverage adhesives. FIXONEX products are engineered for today's installation realities.",
    gradient: "from-blue-500 to-indigo-500",
    bg: "from-blue-50 to-indigo-50",
  },
  {
    icon: ShieldCheck,
    title: "Durability You Can Count On",
    text: "Independently stress-tested for thermal cycling, moisture resistance, and shear load. Built for Indian climates — from coastal humidity to desert heat.",
    gradient: "from-rose-500 to-red-500",
    bg: "from-rose-50 to-red-50",
  },
  {
    icon: Handshake,
    title: "Dealer & Contractor Support",
    text: "Technical training, application guides, and responsive after-sales support. We treat your project as our project.",
    gradient: "from-cyan-500 to-sky-500",
    bg: "from-cyan-50 to-sky-50",
  },
];

const stats = [
  { value: 10, suffix: "+", label: "Years in the industry" },
  { value: 5, suffix: "", label: "Product grades (Type 1–5)" },
  { value: 20, suffix: "+", label: "Epoxy grout colours" },
];

const differentiators = [
  "Polymer-enhanced adhesive matrix for superior flexibility",
  "Non-slip formula — holds large tiles vertically without sagging",
  "Extended open time for precise large-format alignment",
  "Low VOC — safer for installers and occupants",
  "Compatible with underfloor heating systems",
  "Consistent batch-to-batch performance",
];

const processSteps = [
  {
    step: "01",
    title: "Specify",
    text: "Select the right grade for your tile format, substrate, and exposure conditions.",
    gradient: "from-rose-500 to-orange-500",
  },
  {
    step: "02",
    title: "Apply",
    text: "Follow our detailed application guides for optimal coverage and adhesion results.",
    gradient: "from-teal-500 to-emerald-500",
  },
  {
    step: "03",
    title: "Finish",
    text: "Complete with FIXONEX epoxy grout for a coordinated, durable installation.",
    gradient: "from-blue-500 to-indigo-500",
  },
];

export default function WhyFixonexPage() {
  return (
    <>
      <PageHero
        label="Why FIXONEX"
        title="The Smarter Choice for Tile Installation"
        subtitle="Performance-proven adhesives backed by a decade of expertise, international standards, and genuine technical support."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Why FIXONEX" }]}
        image="https://picsum.photos/seed/fixonex-why/1600/900"
      />

      {/* ── Intro + Stats — light ── */}
      <section className="relative overflow-hidden border-b border-zinc-200/40 bg-gradient-to-b from-[#fdfcfb] via-[#faf7f5] to-[#f8f5f2]">
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 top-0 h-[60%] w-[45%] rounded-full opacity-50"
          style={{ background: "radial-gradient(circle, rgba(211,47,47,0.06) 0%, transparent 70%)", filter: "blur(80px)" }}
        />
        <div aria-hidden className="pointer-events-none absolute inset-0 dot-grid-subtle opacity-50" />

        <div className="site-container section-pad-lg relative z-10 grid gap-16 lg:grid-cols-2 lg:items-start">
          <SlideReveal direction="left">
            <p className="eyebrow-label mb-4">The FIXONEX Difference</p>
            <h2 className="font-display font-bold text-zinc-950" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.04em", lineHeight: 1.1 }}>
              Quality Built Into<br />Every Layer
            </h2>
            <LineReveal className="mt-5 mb-6 bg-zinc-200" delay={0.2} />
            <p className="text-[15px] leading-[1.8] text-zinc-500">
              Choosing the wrong adhesive costs far more than the material itself — failed bonds mean rework, disputes, and damaged reputations. FIXONEX exists to eliminate that risk.
            </p>
            <p className="mt-4 text-[15px] leading-[1.8] text-zinc-500">
              Whether you are an architect specifying a premium interior, a contractor laying thousands of square metres, or a dealer recommending solutions — FIXONEX gives you confidence in every bond.
            </p>
          </SlideReveal>

          <SlideReveal direction="right" delay={0.1}>
            <div className="grid grid-cols-3 gap-4">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, scale: 0.92 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: easeExpo }}
                >
                  <TiltCard className="rounded-3xl border border-zinc-200/70 bg-white p-6 text-center shadow-[0_2px_16px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.09)] transition-shadow duration-400">
                    <p className="font-display font-bold leading-none text-primary stat-number" style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}>
                      <CountUp to={s.value} />{s.suffix}
                    </p>
                    <p className="mt-3 text-[12px] font-medium text-zinc-500">{s.label}</p>
                  </TiltCard>
                </motion.div>
              ))}
            </div>

            {/* IS & EN badge */}
            <motion.div
              className="mt-4"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3, ease: easeExpo }}
            >
              <TiltCard className="rounded-3xl border border-zinc-200/70 bg-white p-6 shadow-[0_2px_16px_rgba(0,0,0,0.05)]">
                <p className="font-display text-3xl font-bold text-primary">IS &amp; EN</p>
                <p className="mt-2 text-[12px] font-medium text-zinc-500">Certified standards — tested, documented performance.</p>
              </TiltCard>
            </motion.div>
          </SlideReveal>
        </div>
      </section>

      {/* ── 6 Reasons — light card grid ── */}
      <section className="relative overflow-hidden border-b border-zinc-200/40 bg-gradient-to-b from-[#f0f7ff] via-[#f4f7fb] to-[#eef2f8]">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-[10%] top-0 h-[60%] w-[40%] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(211,47,47,0.06) 0%, transparent 70%)", filter: "blur(80px)" }}
        />
        <div className="site-container section-pad-lg relative z-10">
          <Reveal className="mb-12">
            <p className="eyebrow-label mb-4">6 Reasons to Choose FIXONEX</p>
            <h2 className="font-display font-bold text-zinc-950" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.04em", lineHeight: 1.1 }}>
              What Sets Us Apart
            </h2>
          </Reveal>
          <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {reasons.map((item) => (
              <StaggerItem key={item.title}>
                <TiltCard className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/90 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_50px_rgba(0,0,0,0.1)] transition-shadow duration-500">
                  <div className={`p-7 pb-5 bg-gradient-to-br ${item.bg}`}>
                    <span className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${item.gradient} shadow-lg`}>
                      <item.icon className="h-6 w-6 text-white" aria-hidden />
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-7 pt-5">
                    <h3 className="font-display text-lg font-semibold text-zinc-950 group-hover:text-primary transition-colors duration-300">{item.title}</h3>
                    <p className="mt-3 text-[13px] leading-relaxed text-zinc-500">{item.text}</p>
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

      {/* ── Technical Edge — split screen ── */}
      <section className="relative overflow-hidden border-b border-zinc-200/40 bg-gradient-to-b from-[#fdfcfb] via-[#faf7f5] to-white">
        <div className="site-container section-pad-lg relative z-10 grid gap-16 lg:grid-cols-2 lg:items-start">
          <SlideReveal direction="left">
            <p className="eyebrow-label mb-4">Technical Edge</p>
            <h2 className="font-display font-bold text-zinc-950" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.04em", lineHeight: 1.1 }}>
              Engineered for<br />Modern Construction
            </h2>
            <LineReveal className="mt-5 mb-6 bg-zinc-200" delay={0.2} />
            <p className="text-[15px] leading-[1.8] text-zinc-500">
              Modern tiles are heavier, larger, and more demanding than ever. FIXONEX adhesives are purpose-built to handle the realities of contemporary installation.
            </p>
            <ul className="mt-8 space-y-3">
              {differentiators.map((point) => (
                <motion.li
                  key={point}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: easeExpo }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
                  <span className="text-[14px] leading-[1.7] text-zinc-600">{point}</span>
                </motion.li>
              ))}
            </ul>
          </SlideReveal>

          <SlideReveal direction="right" delay={0.1} className="flex flex-col gap-5 lg:pt-16">
            {[
              { icon: Star, title: "Trusted by Professionals", text: "Architects, interior designers, and tile contractors across Gujarat rely on FIXONEX for demanding residential and commercial projects.", gradient: "from-amber-500 to-orange-500" },
              { icon: FlaskConical, title: "Continuous Innovation", text: "Our formulations are regularly reviewed against emerging installation standards and new tile formats entering the Indian market.", gradient: "from-violet-500 to-purple-500" },
              { icon: ShieldCheck, title: "Sustainability Focus", text: "Reducing waste starts with bonds that last. Long-life installations mean fewer replacements, less demolition debris, and lower material throughput.", gradient: "from-teal-500 to-emerald-500" },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: easeExpo }}
              >
                <TiltCard className="group rounded-3xl border border-zinc-200/70 bg-white p-6 shadow-[0_2px_16px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.08)] transition-shadow duration-400">
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br ${card.gradient} shadow-md`}>
                      <card.icon className="h-4.5 w-4.5 text-white" aria-hidden />
                    </span>
                    <p className="font-display text-base font-bold text-zinc-950 group-hover:text-primary transition-colors duration-300">{card.title}</p>
                  </div>
                  <p className="text-[13px] leading-relaxed text-zinc-500">{card.text}</p>
                </TiltCard>
              </motion.div>
            ))}
          </SlideReveal>
        </div>
      </section>

      {/* ── How it Works — process steps ── */}
      <section className="relative overflow-hidden border-b border-zinc-200/40 bg-gradient-to-b from-[#f0fdf9] via-[#f5f5f5] to-[#eef8ff]">
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 bottom-0 h-[60%] w-[45%] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(13,148,136,0.07) 0%, transparent 70%)", filter: "blur(80px)" }}
        />
        <div className="site-container section-pad-lg relative z-10">
          <Reveal className="mb-12">
            <p className="eyebrow-label mb-4">Process</p>
            <h2 className="font-display font-bold text-zinc-950" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.04em", lineHeight: 1.1 }}>
              How FIXONEX Works For You
            </h2>
          </Reveal>
          <Stagger className="grid gap-6 sm:grid-cols-3">
            {processSteps.map((item) => (
              <StaggerItem key={item.step}>
                <TiltCard className="group relative overflow-hidden rounded-3xl border border-white/90 bg-white p-8 shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_50px_rgba(0,0,0,0.1)] transition-shadow duration-500">
                  <p className="font-display text-5xl font-black text-zinc-100 leading-none mb-4 group-hover:text-zinc-200 transition-colors duration-300">{item.step}</p>
                  <div className={`mb-5 h-1 w-8 rounded-full bg-gradient-to-r ${item.gradient}`} />
                  <h3 className="font-display text-xl font-semibold text-zinc-950 group-hover:text-primary transition-colors duration-300">{item.title}</h3>
                  <p className="mt-3 text-[13px] leading-relaxed text-zinc-500">{item.text}</p>
                </TiltCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── Commitment split ── */}
      <section className="grid lg:grid-cols-2">
        <div className="relative overflow-hidden bg-gradient-to-br from-[#fdfcfb] to-[#f8f5f2] px-6 py-16 md:px-16 md:py-20">
          <FadeIn>
            <p className="eyebrow-label mb-5">Our Commitment</p>
            <p className="text-[16px] leading-[1.8] text-zinc-600">
              We stand behind every product with transparent data sheets, application guides, and a technical team that picks up the phone. If a job has a challenge, we help solve it — before, during, and after the install.
            </p>
          </FadeIn>
        </div>
        <div className="relative overflow-hidden bg-gradient-to-br from-[#f8f5ff] to-[#f3f0ff] px-6 py-16 md:px-16 md:py-20">
          <FadeIn>
            <p className="eyebrow-label mb-5">Sustainability Focus</p>
            <p className="text-[16px] leading-[1.8] text-zinc-600">
              Reducing waste starts with bonds that last. Long-life installations mean fewer replacements, less demolition debris, and lower material throughput. FIXONEX adhesives are formulated to outlast the tile — so your project stays put for decades.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── CTA — light ── */}
      <section className="relative overflow-hidden border-b border-zinc-200/40 bg-gradient-to-br from-[#fdfcfb] via-[#fff7f7] to-[#faf0f0] py-24 text-center">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
        >
          <div
            className="h-[50%] w-[50%] rounded-full spotlight-pulse"
            style={{ background: "radial-gradient(circle, rgba(211,47,47,0.08) 0%, transparent 70%)", filter: "blur(80px)" }}
          />
        </div>
        <div
          aria-hidden
          className="absolute left-[6%] right-[6%] top-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(211,47,47,0.3) 50%, transparent)" }}
        />
        <div className="site-container relative z-10 mx-auto max-w-2xl">
          <FadeIn>
            <p className="eyebrow-label mx-auto mb-5">Ready to Specify FIXONEX?</p>
            <h2 className="font-display font-bold text-zinc-950" style={{ fontSize: "clamp(2rem, 4.5vw, 3.25rem)", letterSpacing: "-0.04em", lineHeight: 1.1 }}>
              Start with the Right Bond
            </h2>
            <p className="mt-5 text-[15px] text-zinc-500">
              Explore our full product range or reach out to discuss your project requirements with our technical team.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button asChild variant="outline" size="lg" className="rounded-full border-zinc-300 hover:border-primary/40 hover:text-primary">
                  <TransitionLink href="/products">View Products</TransitionLink>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button asChild variant="primary" size="lg" className="rounded-full shadow-[0_4px_20px_rgba(211,47,47,0.35)]">
                  <TransitionLink href="/contact" className="inline-flex items-center gap-2">
                    Contact Us <ArrowRight className="h-4 w-4" aria-hidden />
                  </TransitionLink>
                </Button>
              </motion.div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Closing ── */}
      <section className="bg-white py-20 text-center">
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
