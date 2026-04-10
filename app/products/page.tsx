"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PageBanner } from "@/components/ui/PageBanner";
import { ProductCard } from "@/components/ui/ProductCard";
import { products } from "@/lib/data/products";
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
  const nonAdhesiveProducts = products.filter((product) => product.familySlug !== "tiles-adhesive");

  return (
    <>
      <PageBanner
        label="Products"
        title="Our Products"
        subtitle="Engineered adhesion for every surface and application."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Products" }]}
      />

      <section className="section-pad bg-warm">
        <div className="site-container grid gap-12 lg:grid-cols-2 lg:items-start">
          <motion.div
            initial={reduced ? false : { opacity: 0, x: -24 }}
            whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
          >
            <p className="text-base leading-[1.75] text-dark">
              FIXONEX offers a complete system of tile installation solutions — from basic ceramic tile fixing to high-performance exterior applications and designer epoxy finishes.
            </p>
          </motion.div>
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
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary font-display text-lg font-semibold text-white">
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
        </div>
      </section>

      <section className="section-pad bg-black">
        <div className="site-container">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <motion.article
              initial={reduced ? false : { opacity: 0, y: 24 }}
              whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              className="rounded-md border border-warm bg-warm p-7 sm:col-span-2"
            >
              <p className="inline-flex rounded-pill bg-warm/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-dark">Tiles Adhesive Range</p>
              <h3 className="mt-4 font-display text-3xl font-semibold text-black">5 Certified Grades</h3>
              <p className="mt-3 max-w-[560px] text-sm leading-relaxed text-mid">
                From interior ceramics to swimming pools — one family covers every application.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {["C1T", "C2T", "C2TE", "C2TES1", "C2TES2"].map((code) => (
                  <span key={code} className="rounded-pill bg-dark px-2.5 py-1 text-[11px] font-semibold text-warm">
                    {code}
                  </span>
                ))}
              </div>
              <Link href="/products/tiles-adhesive" className="mt-6 inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-dark">
                Explore All Grades
              </Link>
            </motion.article>

            {nonAdhesiveProducts.map((product, index) => (
              <ProductCard
                id={product.id}
                key={product.slug}
                name={product.name}
                slug={product.slug}
                badge={product.badge}
                standard={product.standard}
                applicationShort={product.applicationShort}
                sizesLine={product.sizesLine}
                image={product.image}
                dimensions={product.dimensions}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-dark">
        <div className="site-container">
          <h2 className="font-display text-display font-semibold text-white">Which adhesive is right for me?</h2>
          <p className="mt-3 max-w-2xl text-mid">Quick surface-to-product mapping — confirm with your TDS and specifier for final selection.</p>
          <div className="mt-10 overflow-hidden rounded-md border border-white/10">
            {guidanceRows.map(([surface, prod], i98) => (
              <div
                key={surface}
                className={`grid gap-2 border-b border-white/10 px-4 py-4 text-sm sm:grid-cols-2 sm:items-center sm:gap-8 md:px-6 ${
                  i98 % 2 === 0 ? "bg-black" : "bg-[#1A1A1A]"
                }`}
              >
                <div className="border-l-4 border-warm pl-4 font-medium text-white">{surface}</div>
                <div className="pl-4 text-mid sm:border-l sm:border-white/10 sm:pl-6">{prod}</div>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-mid">
            Need a documented recommendation?{" "}
            <Link href="/contact" className="font-semibold text-warm underline-offset-2 hover:underline">
              Contact our experts
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
