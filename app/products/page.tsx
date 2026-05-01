"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PageHero } from "@/components/ui/PageHero";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { ProductsShowcaseRow } from "@/components/products/ProductsShowcaseRow";
import { useReducedMotion } from "@/lib/useReducedMotion";

const guidanceRows: [string, string][] = [
  ["Interior Ceramic Wall", "FIX 111 (C1T)"],
  ["Large Vitrified Floor", "FIX 333 (C2TE)"],
  ["Exterior Facade", "FIX 444 or 555"],
  ["Swimming Pool", "FIX 555 (C2TES2)"],
  ["Metal / Plywood Substrate", "PU FIXO-999"],
  ["AAC Block Joints", "Block Joining Mortar"],
];

export default function ProductsPage() {
  const reduced = useReducedMotion();
  const imageWide = "https://picsum.photos/200";

  return (
    <>
      <PageHero
        label="Products"
        title="Our Products"
        subtitle="Engineered adhesion for every surface and application."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Products" }]}
      />

      <section className="section-pad bg-white">
        <div className="site-container grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="relative min-h-[420px] overflow-hidden rounded-2xl border border-border-strong bg-white shadow-sm">
            <ImageWithFallback src={imageWide} alt="Trusted adhesive applications" fill className="object-cover" />
          </div>
          <motion.div
            className="space-y-8"
            initial={reduced ? false : { opacity: 0, x: -24 }}
            whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
          >
            <div>
              <p className="section-eyebrow">Product Overview</p>
              <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-foreground">Engineered Product System</h2>
              <p className="section-subtext mt-5 text-dark">
                FIXONEX offers a complete system of tile installation solutions — from basic ceramic tile fixing to high-performance exterior applications and designer epoxy finishes.
              </p>
            </div>
            <motion.ol
              className="space-y-4"
              initial={reduced ? false : { opacity: 0, x: 24 }}
              whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
            >
              {["cho_tile", "cho_match", "cho_grout"].map((key, i98) => {
                const lines = [
                  ["Choose your tile type", "Match substrate, format, and exposure before selecting grade."],
                  ["Match the adhesive grade", "Step from C1T through C2TES2 — or PU for specialty bonds."],
                  ["Finish with epoxy grout", "20+ colours for durable, stain-resistant joints."],
                ];
                const [t, d] = lines[i98] ?? ["", ""];
                return (
                  <li key={key} className="flex gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary font-heading text-lg font-semibold text-white">
                      {i98 + 1}
                    </span>
                    <div>
                      <p className="font-semibold text-black">{t}</p>
                      <p className="mt-1 text-sm text-mid">{d}</p>
                    </div>
                  </li>
                );
              })}
            </motion.ol>
          </motion.div>
        </div>
      </section>

      <section className="section-pad section-flow-secondary">
        <div className="site-container">
          <motion.article
            initial={reduced ? false : { opacity: 0, y: 24 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            className="surface-card p-8 md:p-10"
          >
            <p className="inline-flex rounded-pill bg-chip/30 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-dark">Tiles Adhesive Range</p>
            <h3 className="mt-4 font-heading text-3xl font-semibold text-black">5 Certified Grades</h3>
            <p className="mt-3 max-w-[560px] text-sm leading-relaxed text-mid">
              From interior ceramics to swimming pools — one family covers every application.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {["C1T", "C2T", "C2TE", "C2TES1", "C2TES2"].map((code) => (
                <span key={code} className="rounded-pill bg-[#f3ede8] px-2.5 py-1 text-[11px] font-semibold text-[#3a3a3a]">
                  {code}
                </span>
              ))}
            </div>
            <Link href="/products/tiles-adhesive" className="mt-6 inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors duration-200 hover:bg-primary-dark">
              Explore All Grades
            </Link>
          </motion.article>
        </div>
      </section>

      <ProductsShowcaseRow />

      <section className="section-pad bg-white">
        <div className="site-container">
          <p className="section-eyebrow">Selection Guide</p>
          <h2 className="font-heading text-display font-semibold text-foreground">Which adhesive is right for me?</h2>
          <p className="section-subtext mt-3 max-w-2xl text-mid">Quick surface-to-product mapping — confirm with your TDS and specifier for final selection.</p>
          <div className="mt-10 overflow-hidden rounded-2xl border border-[#e5e0da] shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
            {guidanceRows.map(([surface, prod], i98) => (
              <div
                key={surface}
                className={`grid gap-2 border-b border-[#e5e0da] px-4 py-4 text-sm sm:grid-cols-2 sm:items-center sm:gap-8 md:px-6 ${
                  i98 % 2 === 0 ? "bg-white" : "bg-[#f8f5f2]"
                }`}
              >
                <div className="border-l-4 border-chip pl-4 font-medium text-foreground">{surface}</div>
                <div className="pl-4 text-mid sm:border-l sm:border-[#e5e0da] sm:pl-6">{prod}</div>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-mid">
            Need a documented recommendation?{" "}
            <Link href="/contact" className="font-semibold text-terracotta underline-offset-2 hover:underline">
              Contact our experts
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
