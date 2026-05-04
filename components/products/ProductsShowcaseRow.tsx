"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Layers } from "lucide-react";
import { ProductCard } from "@/components/ui/ProductCard";
import { products } from "@/lib/data/products";
import { TransitionLink } from "@/components/navigation/TransitionLink";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { productImageUrls } from "@/data/product-images";

const easeExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

const specialty = products.filter((p) => p.familySlug !== "tiles-adhesive");

export function ProductsShowcaseRow() {
  return (
    <section className="relative overflow-hidden bg-[#09090d] py-24">
      {/* Ambient glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[10%] top-[10%] h-[60%] w-[45%] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(211,47,47,0.08) 0%, transparent 70%)", filter: "blur(100px)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-[10%] bottom-[10%] h-[50%] w-[40%] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(234,88,12,0.06) 0%, transparent 70%)", filter: "blur(80px)" }}
      />
      <div className="grain-noise absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none" aria-hidden />
      <div
        aria-hidden
        className="absolute left-[6%] right-[6%] top-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(211,47,47,0.4) 50%, transparent)" }}
      />

      <div className="site-container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: easeExpo }}
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-primary mb-3">Our Range</p>
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.02em] text-white leading-tight">
            Complete Product Catalogue
          </h2>
          <p className="mt-4 max-w-xl text-[15px] leading-[1.8] text-zinc-400">
            From interior ceramics to specialty substrates — every product links to a full profile with specs, usage guide, and TDS.
          </p>
        </motion.div>

        {/* Grid — Tile Adhesives featured card + specialty cards */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {/* ── Tile Adhesives — featured aggregate card ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0, ease: easeExpo }}
            className="sm:col-span-2 lg:col-span-1"
          >
            <TransitionLink
              href="/products/tiles-adhesive"
              className="group relative flex h-full min-h-[340px] flex-col overflow-hidden rounded-2xl border border-white/8 bg-[#09090d] transition-all duration-300 hover:border-primary/40 hover:shadow-[0_0_50px_rgba(211,47,47,0.15)]"
            >
              {/* Image strip — shows FIX 111 bag */}
              <div className="relative flex-1 overflow-hidden bg-zinc-900">
                <ImageWithFallback
                  src={productImageUrls.fix111}
                  alt="FIXONEX Tile Adhesives"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-contain transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                  placeholderClassName="bg-zinc-900"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#09090d] via-[#09090d]/40 to-transparent" />

                {/* 5 grades pill strip */}
                <div className="absolute bottom-4 left-4 flex flex-wrap gap-1.5">
                  {["C1T", "C2T", "C2TE", "C2TES1", "C2TES2"].map((code) => (
                    <span
                      key={code}
                      className="rounded-full border border-white/20 bg-black/60 px-2 py-0.5 text-[10px] font-bold text-zinc-300 backdrop-blur-sm"
                    >
                      {code}
                    </span>
                  ))}
                </div>

                {/* Badge */}
                <div className="absolute left-3 top-3">
                  <span className="rounded-full border border-primary/40 bg-primary/20 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-primary backdrop-blur-sm">
                    5 Grades
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Layers className="h-4 w-4 text-primary" aria-hidden />
                    <h3 className="font-display text-lg font-bold text-white">Tile Adhesives</h3>
                  </div>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-zinc-500 transition-all duration-200 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
                </div>
                <p className="mt-2 text-[13px] leading-relaxed text-zinc-400">
                  Five certified grades — C1T through C2TES2 — for every tile type and substrate condition.
                </p>
                <p className="mt-3 text-[12px] font-medium text-zinc-500">EN 12004 | IS 15477:2019</p>
                <div className="mt-4 flex items-center gap-2 text-[12px] font-semibold text-primary">
                  Explore all grades
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
                </div>
              </div>

              {/* Bottom glow line */}
              <div
                aria-hidden
                className="absolute bottom-0 left-[10%] right-[10%] h-px origin-center scale-x-0 rounded-full bg-primary/50 transition-transform duration-300 group-hover:scale-x-100"
              />
            </TransitionLink>
          </motion.div>

          {/* ── Specialty & Accessories ── */}
          {specialty.map((p, i) => (
            <ProductCard
              key={p.id}
              id={p.id}
              name={p.name}
              slug={p.slug}
              badge={p.badge}
              standard={p.standard}
              applicationShort={p.applicationShort}
              sizesLine={p.sizesLine}
              image={p.image}
              dimensions={p.dimensions}
              index={i + 1}
            />
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          className="mt-10 text-center text-[13px] text-zinc-500"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Need help choosing?{" "}
          <a href="/contact" className="font-semibold text-primary hover:underline">
            Talk to our experts →
          </a>
        </motion.p>
      </div>
    </section>
  );
}
