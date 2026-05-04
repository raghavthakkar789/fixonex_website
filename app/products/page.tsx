"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { ProductsShowcaseRow } from "@/components/products/ProductsShowcaseRow";
import { ProductGuidanceWizard } from "@/components/products/ProductGuidanceWizard";

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

const guidanceRows: [string, string][] = [
  ["Interior Ceramic Wall", "FIX 111 (C1T)"],
  ["Large Vitrified Floor", "FIX 333 (C2TE)"],
  ["Exterior Facade", "FIX 444 or 555"],
  ["Swimming Pool", "FIX 555 (C2TES2)"],
  ["Metal / Plywood Substrate", "PU FIXO-999"],
  ["AAC Block Joints", "Block Joining Mortar"],
];

const steps = [
  { n: "01", title: "Choose your tile type", text: "Match substrate, format, and exposure before selecting grade." },
  { n: "02", title: "Match the adhesive grade", text: "Step from C1T through C2TES2 — or PU for specialty bonds." },
  { n: "03", title: "Finish with epoxy grout", text: "20+ colours for durable, stain-resistant joints." },
];

export default function ProductsPage() {
  return (
    <>
      <div className="mb-8 md:mb-12">
        <PageHero
          label="Products"
          title="Our Products"
          subtitle="Engineered adhesion for every surface and application — from interior ceramics to exterior facades."
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "Products" }]}
          image={productsHeroImage}
          imageClassName="object-contain object-center md:object-right"
          sectionClassName="min-h-[34rem] bg-[#1a1713] md:min-h-[40rem] lg:min-h-[46rem]"
          contentClassName="min-h-[34rem] md:min-h-[40rem] lg:min-h-[46rem]"
        />
      </div>

      {/* System Overview — dark */}
      <section className="relative overflow-hidden bg-[#09090d] py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-[10%] top-0 h-[70%] w-[50%] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(211,47,47,0.1) 0%, transparent 70%)", filter: "blur(80px)" }}
        />
        <div className="grain-noise absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none" aria-hidden />
        <div className="site-container relative z-10">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-start">
            <FadeIn>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary mb-3">Product Overview</p>
              <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.02em] text-white leading-tight">
                Engineered Product System
              </h2>
              <p className="mt-6 text-[15px] leading-[1.8] text-zinc-400">
                FIXONEX offers a complete system of tile installation solutions — from basic ceramic tile fixing to high-performance exterior applications and designer epoxy finishes.
              </p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <ol className="space-y-5">
                {steps.map((s, i) => (
                  <motion.li
                    key={s.n}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.08, ease: easeExpo }}
                    className="flex gap-5 items-start rounded-2xl border border-white/8 bg-white/[0.03] p-5"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary font-display text-sm font-bold text-white">
                      {s.n}
                    </span>
                    <div>
                      <p className="font-display font-bold text-white">{s.title}</p>
                      <p className="mt-1 text-[13px] text-zinc-400">{s.text}</p>
                    </div>
                  </motion.li>
                ))}
              </ol>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Grades banner — white */}
      <section className="bg-white py-16">
        <div className="site-container">
          <FadeIn>
            <div className="rounded-2xl border border-zinc-100 bg-zinc-50 p-8 md:p-10">
              <div className="flex flex-wrap items-start justify-between gap-6">
                <div>
                  <span className="inline-flex rounded-full border border-zinc-200 bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-500">
                    Tiles Adhesive Range
                  </span>
                  <h3 className="mt-4 font-display text-3xl font-bold text-zinc-950">5 Certified Grades</h3>
                  <p className="mt-2 max-w-lg text-[14px] text-zinc-500">
                    From interior ceramics to swimming pools — one family covers every application.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {["C1T", "C2T", "C2TE", "C2TES1", "C2TES2"].map((code) => (
                      <span key={code} className="rounded-full bg-zinc-100 px-3 py-1 text-[11px] font-bold text-zinc-600">
                        {code}
                      </span>
                    ))}
                  </div>
                </div>
                <Link
                  href="/products/tiles-adhesive"
                  className="inline-flex shrink-0 items-center gap-2 rounded-full bg-zinc-950 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-primary"
                >
                  Explore All Grades
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Product Cards */}
      <ProductsShowcaseRow />

      {/* ── Product Guidance Wizard ── */}
      <section id="wizard" className="scroll-mt-20 bg-zinc-50 py-20">
        <div className="site-container">
          <FadeIn>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary mb-3">Product Helper</p>
            <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-bold tracking-[-0.02em] text-zinc-950 leading-tight max-w-2xl">
              Answer a few prompts — get the right starting range.
            </h2>
            <p className="mt-3 max-w-xl text-[14px] text-zinc-500">
              Not a substitute for datasheets or a FIXONEX advisor, but a fast orientation across our catalogue.
            </p>
          </FadeIn>
          <div className="mt-10">
            <ProductGuidanceWizard />
          </div>
        </div>
      </section>

      {/* Selection Guide — dark */}
      <section className="relative overflow-hidden bg-[#09090d] py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 bottom-0 h-[60%] w-[45%] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(234,88,12,0.08) 0%, transparent 70%)", filter: "blur(80px)" }}
        />
        <div className="grain-noise absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none" aria-hidden />
        <div
          aria-hidden
          className="absolute left-[6%] right-[6%] top-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(211,47,47,0.4) 50%, transparent)" }}
        />
        <div className="site-container relative z-10">
          <FadeIn>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary mb-3">Selection Guide</p>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.02em] text-white leading-tight max-w-xl">
              Which adhesive is right for me?
            </h2>
            <p className="mt-4 max-w-xl text-[14px] text-zinc-400">
              Quick surface-to-product mapping — confirm with your TDS and specifier for final selection.
            </p>
          </FadeIn>
          <div className="mt-10 overflow-hidden rounded-2xl border border-white/8">
            {guidanceRows.map(([surface, prod], i) => (
              <motion.div
                key={surface}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.05, ease: easeExpo }}
                className="grid gap-2 border-b border-white/[0.06] px-6 py-4 text-sm sm:grid-cols-2 sm:items-center sm:gap-8 last:border-b-0 odd:bg-white/[0.02] even:bg-transparent"
              >
                <div className="border-l-2 border-primary/50 pl-4 font-medium text-white">{surface}</div>
                <div className="pl-4 text-zinc-400 sm:border-l sm:border-white/[0.06] sm:pl-6">{prod}</div>
              </motion.div>
            ))}
          </div>
          <p className="mt-8 text-center text-[13px] text-zinc-500">
            Need a documented recommendation?{" "}
            <Link href="/contact" className="font-semibold text-primary hover:underline">
              Contact our experts
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
