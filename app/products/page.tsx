"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Layers, Grid3X3, Shield, CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { ProductsShowcaseRow } from "@/components/products/ProductsShowcaseRow";
import { TransitionLink } from "@/components/navigation/TransitionLink";
import { Reveal, Stagger, StaggerItem, LineReveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/ui/TiltCard";

const easeExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];
const productsHeroImage = "/images/hero/products-hero.png";

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

const guidanceRows: [string, string, string][] = [
  ["Interior Ceramic Wall", "FIX 111 (C1T)", "from-rose-500/15 to-orange-400/10"],
  ["Large Vitrified Floor", "FIX 333 (C2TE)", "from-blue-500/15 to-indigo-400/10"],
  ["Exterior Facade", "FIX 444 or 555", "from-teal-500/15 to-emerald-400/10"],
  ["Swimming Pool", "FIX 555 (C2TES2)", "from-cyan-500/15 to-sky-400/10"],
  ["Metal / Plywood Substrate", "PU FIXO-999", "from-violet-500/15 to-purple-400/10"],
  ["AAC Block Joints", "Block Joining Mortar", "from-amber-500/15 to-yellow-400/10"],
];

const steps = [
  { n: "01", title: "Choose your tile type", text: "Match substrate, format, and exposure before selecting grade.", icon: Grid3X3, color: "from-rose-500 to-orange-500" },
  { n: "02", title: "Match the adhesive grade", text: "Step from C1T through C2TES2 — or PU for specialty bonds.", icon: Layers, color: "from-teal-500 to-emerald-500" },
  { n: "03", title: "Finish with epoxy grout", text: "20+ colours for durable, stain-resistant joints.", icon: Shield, color: "from-blue-500 to-indigo-500" },
];

export default function ProductsPage() {
  return (
    <>
      <PageHero
        label="Products"
        title="Our Products"
        subtitle="Engineered adhesion for every surface and application — from interior ceramics to exterior facades."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Products" }]}
        image={productsHeroImage}
        imageClassName="object-contain object-center md:object-right"
      />

      {/* ── System Overview — light split ── */}
      <section className="relative overflow-hidden border-b border-zinc-200/40 bg-gradient-to-b from-[#fdfcfb] via-[#faf7f5] to-[#f8f5f2]">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-[10%] top-0 h-[70%] w-[50%] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(211,47,47,0.06) 0%, transparent 70%)", filter: "blur(80px)" }}
        />
        <div aria-hidden className="pointer-events-none absolute inset-0 dot-grid-subtle opacity-50" />

        <div className="site-container section-pad-lg relative z-10">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-start">
            <FadeIn>
              <p className="eyebrow-label mb-4">Product Overview</p>
              <h2 className="font-display font-bold text-zinc-950" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.04em", lineHeight: 1.1 }}>
                Engineered Product System
              </h2>
              <LineReveal className="mt-5 mb-6 bg-zinc-200" delay={0.2} />
              <p className="text-[15px] leading-[1.8] text-zinc-500">
                FIXONEX offers a complete system of tile installation solutions — from basic ceramic tile fixing to high-performance exterior applications and designer epoxy finishes.
              </p>
            </FadeIn>

            <FadeIn delay={0.1}>
              <ol className="space-y-4">
                {steps.map((s, i) => (
                  <motion.li
                    key={s.n}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1, ease: easeExpo }}
                  >
                    <TiltCard className="group flex items-start gap-5 rounded-3xl border border-zinc-200/70 bg-white p-5 shadow-[0_2px_16px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.09)] transition-shadow duration-400">
                      <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${s.color} shadow-lg`}>
                        <s.icon className="h-6 w-6 text-white" aria-hidden />
                      </span>
                      <div>
                        <p className="font-display font-bold text-zinc-950 group-hover:text-primary transition-colors duration-300">{s.title}</p>
                        <p className="mt-1 text-[13px] text-zinc-500">{s.text}</p>
                      </div>
                      <span className="ml-auto shrink-0 font-display text-3xl font-black text-zinc-100 group-hover:text-zinc-200 transition-colors duration-300">{s.n}</span>
                    </TiltCard>
                  </motion.li>
                ))}
              </ol>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Grades banner — white card ── */}
      <section className="relative overflow-hidden border-b border-zinc-200/40 bg-gradient-to-b from-white to-[#f4f7fb]">
        <div aria-hidden className="pointer-events-none absolute inset-0 dot-grid-subtle opacity-40" />
        <div className="site-container section-pad-md relative z-10">
          <FadeIn>
            <TiltCard className="overflow-hidden rounded-3xl border border-zinc-100 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
              <div className="flex flex-wrap items-start justify-between gap-6 p-8 md:p-10">
                <div>
                  <span className="eyebrow-label mb-4 inline-flex">Tiles Adhesive Range</span>
                  <h3 className="mt-2 font-display text-3xl font-bold text-zinc-950">5 Certified Grades</h3>
                  <p className="mt-2 max-w-lg text-[14px] text-zinc-500">
                    From interior ceramics to swimming pools — one family covers every application.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {[
                      { code: "C1T", color: "bg-rose-50 text-rose-700 border-rose-200" },
                      { code: "C2T", color: "bg-orange-50 text-orange-700 border-orange-200" },
                      { code: "C2TE", color: "bg-teal-50 text-teal-700 border-teal-200" },
                      { code: "C2TES1", color: "bg-blue-50 text-blue-700 border-blue-200" },
                      { code: "C2TES2", color: "bg-violet-50 text-violet-700 border-violet-200" },
                    ].map(({ code, color }) => (
                      <motion.span
                        key={code}
                        className={`rounded-full border px-3 py-1 text-[11px] font-bold ${color}`}
                        whileHover={{ scale: 1.08 }}
                        transition={{ duration: 0.2 }}
                      >
                        {code}
                      </motion.span>
                    ))}
                  </div>
                </div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <TransitionLink
                    href="/products/tiles-adhesive"
                    className="inline-flex shrink-0 items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-[0_4px_16px_rgba(211,47,47,0.3)] transition-all hover:bg-primary/90 hover:shadow-[0_6px_24px_rgba(211,47,47,0.4)]"
                  >
                    Explore All Grades
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </TransitionLink>
                </motion.div>
              </div>
              {/* Decorative strip */}
              <div className="h-1.5 bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500" />
            </TiltCard>
          </FadeIn>
        </div>
      </section>

      {/* Product Cards */}
      <ProductsShowcaseRow />

      {/* ── Selection Guide — light version ── */}
      <section className="relative overflow-hidden border-b border-zinc-200/40 bg-gradient-to-b from-[#faf7f5] to-white">
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 bottom-0 h-[60%] w-[45%] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(234,88,12,0.05) 0%, transparent 70%)", filter: "blur(80px)" }}
        />
        <div aria-hidden className="pointer-events-none absolute inset-0 dot-grid-subtle opacity-40" />
        <div
          aria-hidden
          className="absolute left-[6%] right-[6%] top-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(211,47,47,0.25) 50%, transparent)" }}
        />
        <div className="site-container section-pad-lg relative z-10">
          <FadeIn>
            <p className="eyebrow-label mb-4">Selection Guide</p>
            <h2 className="font-display font-bold text-zinc-950" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.04em", lineHeight: 1.1 }}>
              Which adhesive is right for me?
            </h2>
            <p className="mt-4 max-w-xl text-[14px] text-zinc-500">
              Quick surface-to-product mapping — confirm with your TDS and specifier for final selection.
            </p>
          </FadeIn>
          <div className="mt-10 overflow-hidden rounded-3xl border border-zinc-200/70 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
            {guidanceRows.map(([surface, prod, gradient], i) => (
              <motion.div
                key={surface}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.06, ease: easeExpo }}
                className="group grid gap-2 border-b border-zinc-100 px-6 py-4 text-sm sm:grid-cols-2 sm:items-center sm:gap-8 last:border-b-0 transition-colors duration-200 hover:bg-zinc-50/80"
              >
                <div className="flex items-center gap-3">
                  <div className={`h-7 w-7 shrink-0 rounded-lg bg-gradient-to-br ${gradient}`} />
                  <span className="font-medium text-zinc-800">{surface}</span>
                </div>
                <div className="flex items-center gap-2 sm:border-l sm:border-zinc-100 sm:pl-6">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                  <span className="font-semibold text-zinc-700">{prod}</span>
                </div>
              </motion.div>
            ))}
          </div>
          <p className="mt-8 text-center text-[13px] text-zinc-500">
            Need a documented recommendation?{" "}
            <TransitionLink href="/contact" className="font-semibold text-primary hover:underline">
              Contact our experts
            </TransitionLink>
          </p>
        </div>
      </section>
    </>
  );
}
