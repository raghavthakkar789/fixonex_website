"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { ProductsShowcaseRow } from "@/components/products/ProductsShowcaseRow";
import { TransitionLink } from "@/components/navigation/TransitionLink";
import { Reveal, LineReveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { Button } from "@/components/ui/button";
import { cta } from "@/lib/ui-constants";

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

const overviewBullets = [
  "Adhesives for ceramics, porcelain, stone, and demanding sites.",
  "Grouts and ancillaries that pair with the same range.",
  "Specs and support when you need a clear pick.",
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

      {/* ── Product Overview ── */}
      <section className="relative overflow-hidden border-b border-zinc-200/40 bg-gradient-to-b from-[#fdfcfb] via-[#faf8f6] to-[#f3f1ee]">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-[12%] top-[-15%] h-[75%] w-[55%] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(211,47,47,0.07) 0%, transparent 68%)", filter: "blur(90px)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-[8%] bottom-[-20%] h-[55%] w-[45%] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(13,148,136,0.06) 0%, transparent 70%)", filter: "blur(85px)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.45]"
          style={{
            backgroundImage: "radial-gradient(rgba(0,0,0,0.022) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        <div className="site-container section-pad-lg relative z-10">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow-label mb-4">Product Overview</p>
            <h2
              className="font-display font-bold text-zinc-950"
              style={{ fontSize: "clamp(1.85rem, 3.5vw, 2.65rem)", letterSpacing: "-0.04em", lineHeight: 1.12 }}
            >
              Adhesives, grouts, and extras — in one range.
            </h2>
            <LineReveal
              className="mx-auto mt-5 mb-5 max-w-sm bg-gradient-to-r from-primary/40 via-orange-400/50 to-transparent"
              delay={0.12}
            />
            <p className="text-[15px] leading-relaxed text-zinc-600">
              Pick what fits your site; details live on each product page and TDS.
            </p>

            <ul className="mx-auto mt-8 max-w-md space-y-3 text-left sm:mt-10">
              {overviewBullets.map((line) => (
                <li key={line} className="flex gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <CheckCircle2 className="h-3.5 w-3.5" aria-hidden strokeWidth={2.5} />
                  </span>
                  <span className="text-[14px] leading-snug text-zinc-600">{line}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Button asChild variant="primary" className="rounded-full shadow-[0_4px_16px_rgba(211,47,47,0.28)]">
                <TransitionLink href="/services#product-guidance" className="inline-flex items-center gap-2">
                  {cta.guidance}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </TransitionLink>
              </Button>
              <Button asChild variant="outline" className="rounded-full border-zinc-300 bg-white/80">
                <TransitionLink href="/products/tiles-adhesive">Tile adhesive range</TransitionLink>
              </Button>
            </div>
          </Reveal>
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
