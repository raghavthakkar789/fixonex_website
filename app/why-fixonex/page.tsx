"use client";

import Link from "next/link";
import { Award, CheckCircle2, FlaskConical, Handshake, Layers, ShieldCheck, Star, Zap, ArrowRight } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { PageHero } from "@/components/ui/PageHero";
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

const reasons = [
  {
    icon: Award,
    title: "Certified Quality",
    text: "Every product line is aligned with EN 12004 international standards and IS 15477:2019, so you get tested, documented performance — not just marketing claims.",
  },
  {
    icon: Layers,
    title: "Complete System Approach",
    text: "From substrate preparation to final grout finish, FIXONEX offers a coordinated system — adhesive, spacer, and grout — tested to work together.",
  },
  {
    icon: FlaskConical,
    title: "Advanced Formulations",
    text: "Our in-house R&D team continuously refines polymer chemistry to deliver better open time, sag resistance, and long-term bond integrity.",
  },
  {
    icon: Zap,
    title: "Ready for Modern Formats",
    text: "Large-format tiles, thin porcelain slabs, and natural stone demand high-coverage adhesives. FIXONEX products are engineered for today's installation realities.",
  },
  {
    icon: ShieldCheck,
    title: "Durability You Can Count On",
    text: "Independently stress-tested for thermal cycling, moisture resistance, and shear load. Built for Indian climates — from coastal humidity to desert heat.",
  },
  {
    icon: Handshake,
    title: "Dealer & Contractor Support",
    text: "Technical training, application guides, and responsive after-sales support. We treat your project as our project.",
  },
];

const stats = [
  { value: "10+", label: "Years in the industry" },
  { value: "5", label: "Product grades (Type 1–5)" },
  { value: "20+", label: "Epoxy grout colours" },
  { value: "IS & EN", label: "Certified standards" },
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
  { step: "01", title: "Specify", text: "Select the right grade for your tile format, substrate, and exposure conditions." },
  { step: "02", title: "Apply", text: "Follow our detailed application guides for optimal coverage and adhesion results." },
  { step: "03", title: "Finish", text: "Complete with FIXONEX epoxy grout for a coordinated, durable installation." },
];

export default function WhyFixonexPage() {
  return (
    <>
      <PageHero
        label="Why FIXONEX"
        title="The Smarter Choice for Tile Installation"
        subtitle="Performance-proven adhesives backed by a decade of expertise, international standards, and genuine technical support."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Why FIXONEX" }]}
      />

      {/* Intro + Stats */}
      <section className="relative overflow-hidden bg-white py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 top-0 h-[60%] w-[45%] rounded-full opacity-50"
          style={{ background: "radial-gradient(circle, rgba(211,47,47,0.06) 0%, transparent 70%)", filter: "blur(80px)" }}
        />
        <div className="site-container grid gap-16 lg:grid-cols-2 lg:items-start">
          <FadeIn>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary mb-3">The FIXONEX Difference</p>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.02em] text-zinc-950 leading-tight">
              Quality Built Into<br />Every Layer
            </h2>
            <p className="mt-6 text-[15px] leading-[1.8] text-zinc-500">
              Choosing the wrong adhesive costs far more than the material itself — failed bonds mean rework, disputes, and damaged reputations. FIXONEX exists to eliminate that risk. Our formulations are engineered for Indian site conditions, tested to international benchmarks, and backed by a team that understands installation challenges at the project level.
            </p>
            <p className="mt-4 text-[15px] leading-[1.8] text-zinc-500">
              Whether you are an architect specifying a premium interior, a contractor laying thousands of square metres, or a dealer recommending solutions to homeowners — FIXONEX gives you confidence in every bond.
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, scale: 0.92 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.07, ease: easeExpo }}
                  className="rounded-2xl border border-zinc-100 bg-zinc-50 p-6 text-center"
                >
                  <p className="font-display text-[clamp(2rem,5vw,3rem)] font-bold leading-none text-primary">{s.value}</p>
                  <p className="mt-3 text-[13px] font-medium text-zinc-500">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 6 Reasons — dark */}
      <section className="relative overflow-hidden bg-[#09090d] py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-[10%] top-0 h-[60%] w-[40%] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(211,47,47,0.1) 0%, transparent 70%)", filter: "blur(80px)" }}
        />
        <div className="grain-noise absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none" aria-hidden />
        <div className="site-container relative z-10">
          <FadeIn>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary mb-3">6 Reasons to Choose FIXONEX</p>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.02em] text-white leading-tight max-w-xl">
              What Sets Us Apart
            </h2>
          </FadeIn>
          <div className="mt-14 grid grid-rows-[masonry] gap-6 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
            {reasons.map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.06} className="h-full">
                <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/8 bg-white/[0.03] p-7 transition-all duration-300 hover:border-primary/30 hover:bg-white/[0.05]">
                  <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <item.icon className="h-5 w-5" aria-hidden />
                  </div>
                  <h3 className="font-display text-lg font-bold text-white">{item.title}</h3>
                  <p className="mt-3 text-[13px] leading-relaxed text-zinc-400">{item.text}</p>
                  <div className="mt-auto pt-5 h-px w-0 bg-primary/40 transition-all duration-500 group-hover:w-full" aria-hidden />
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Edge */}
      <section className="bg-white py-24">
        <div className="site-container grid gap-16 lg:grid-cols-2 lg:items-start">
          <FadeIn>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary mb-3">Technical Edge</p>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.02em] text-zinc-950 leading-tight">
              Engineered for<br />Modern Construction
            </h2>
            <p className="mt-6 text-[15px] leading-[1.8] text-zinc-500">
              Modern tiles are heavier, larger, and more demanding than ever. FIXONEX adhesives are purpose-built to handle the realities of contemporary installation — not yesterday's standard brick-and-mortar tiles.
            </p>
            <ul className="mt-8 space-y-3">
              {differentiators.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
                  <span className="text-[14px] leading-[1.7] text-zinc-600">{point}</span>
                </li>
              ))}
            </ul>
          </FadeIn>
          <FadeIn delay={0.1} className="flex flex-col gap-5 lg:pt-16">
            <div className="rounded-2xl border border-zinc-100 bg-zinc-50 p-7">
              <div className="flex items-center gap-3 mb-4">
                <Star className="h-5 w-5 text-primary" aria-hidden />
                <p className="font-display text-lg font-bold text-zinc-950">Trusted by Professionals</p>
              </div>
              <p className="text-[14px] leading-relaxed text-zinc-500">
                Architects, interior designers, and tile contractors across Gujarat rely on FIXONEX for demanding residential and commercial projects.
              </p>
            </div>
            <div className="rounded-2xl border border-zinc-100 bg-zinc-50 p-7">
              <div className="flex items-center gap-3 mb-4">
                <FlaskConical className="h-5 w-5 text-primary" aria-hidden />
                <p className="font-display text-lg font-bold text-zinc-950">Continuous Innovation</p>
              </div>
              <p className="text-[14px] leading-relaxed text-zinc-500">
                Our formulations are regularly reviewed against emerging installation standards and new tile formats entering the Indian market.
              </p>
            </div>
            <div className="rounded-2xl border border-zinc-100 bg-zinc-50 p-7">
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheck className="h-5 w-5 text-primary" aria-hidden />
                <p className="font-display text-lg font-bold text-zinc-950">Sustainability Focus</p>
              </div>
              <p className="text-[14px] leading-relaxed text-zinc-500">
                Reducing waste starts with bonds that last. Long-life installations mean fewer replacements, less demolition debris, and lower material throughput.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* How it Works */}
      <section className="relative overflow-hidden bg-[#09090d] py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 bottom-0 h-[60%] w-[45%] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(234,88,12,0.08) 0%, transparent 70%)", filter: "blur(80px)" }}
        />
        <div className="grain-noise absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none" aria-hidden />
        <div className="site-container relative z-10">
          <FadeIn>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary mb-3">Process</p>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.02em] text-white leading-tight max-w-xl">
              How FIXONEX Works For You
            </h2>
          </FadeIn>
          <div className="mt-14 grid gap-6 sm:grid-cols-3">
            {processSteps.map((item, i) => (
              <FadeIn key={item.step} delay={i * 0.08}>
                <div className="relative rounded-2xl border border-white/8 bg-white/[0.03] p-8">
                  <p className="font-display text-5xl font-bold text-white/[0.07] leading-none mb-4">{item.step}</p>
                  <h3 className="font-display text-xl font-bold text-white">{item.title}</h3>
                  <p className="mt-3 text-[13px] leading-relaxed text-zinc-400">{item.text}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Commitment split */}
      <section className="grid lg:grid-cols-2">
        <div className="bg-white px-6 py-16 md:px-16 md:py-20">
          <FadeIn>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary mb-5">Our Commitment</p>
            <p className="text-[16px] leading-[1.8] text-zinc-600">
              We stand behind every product with transparent data sheets, application guides, and a technical team that picks up the phone. If a job has a challenge, we help solve it — before, during, and after the install.
            </p>
          </FadeIn>
        </div>
        <div className="bg-zinc-950 px-6 py-16 md:px-16 md:py-20">
          <FadeIn>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary mb-5">Sustainability Focus</p>
            <p className="text-[16px] leading-[1.8] text-zinc-300">
              Reducing waste starts with bonds that last. Long-life installations mean fewer replacements, less demolition debris, and lower material throughput. FIXONEX adhesives are formulated to outlast the tile — so your project stays put for decades.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* CTA — dark */}
      <section className="relative overflow-hidden bg-[#09090d] py-24 text-center">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
        >
          <div
            className="h-[50%] w-[50%] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(211,47,47,0.12) 0%, transparent 70%)", filter: "blur(80px)" }}
          />
        </div>
        <div
          aria-hidden
          className="absolute left-[6%] right-[6%] top-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(211,47,47,0.5) 50%, transparent)" }}
        />
        <div className="grain-noise absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none" aria-hidden />
        <div className="site-container relative z-10 mx-auto max-w-2xl">
          <FadeIn>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary mb-4">Ready to Specify FIXONEX?</p>
            <h2 className="font-display text-[clamp(2rem,4.5vw,3.25rem)] font-bold tracking-[-0.02em] text-white leading-tight">
              Start with the Right Bond
            </h2>
            <p className="mt-5 text-[15px] text-zinc-400">
              Explore our full product range or reach out to discuss your project requirements with our technical team.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-7 py-3.5 text-sm font-semibold text-white transition-all hover:border-white/30 hover:bg-white/10"
              >
                View Products
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-primary/90"
              >
                Contact Us
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Closing */}
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
