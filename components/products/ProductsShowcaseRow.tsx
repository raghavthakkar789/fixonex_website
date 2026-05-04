"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Grid3X3, Layers } from "lucide-react";
import { ProductCard } from "@/components/ui/ProductCard";
import { products } from "@/lib/data/products";
import { TransitionLink } from "@/components/navigation/TransitionLink";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { productImageUrls } from "@/data/product-images";
import { TiltCard } from "@/components/ui/TiltCard";
import { Stagger, StaggerItem, Reveal } from "@/components/motion/Reveal";

const easeExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

const specialty = products.filter((p) => p.familySlug !== "tiles-adhesive");

export function ProductsShowcaseRow() {
  return (
    <section className="relative overflow-hidden border-b border-zinc-200/40 bg-gradient-to-b from-[#f0f7ff] via-[#f4f7fb] to-[#eef2f8]">
      {/* Ambient glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[10%] top-[10%] h-[60%] w-[45%] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(211,47,47,0.06) 0%, transparent 70%)", filter: "blur(100px)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-[10%] bottom-[10%] h-[50%] w-[40%] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(13,148,136,0.06) 0%, transparent 70%)", filter: "blur(80px)" }}
      />
      {/* Dot grid background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 dot-grid-subtle opacity-60" />

      <div className="site-container relative z-10 section-pad-lg">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <Reveal>
            <p className="eyebrow-label mb-4">Complete Range</p>
            <h2
              className="font-display font-bold text-zinc-900"
              style={{ fontSize: "clamp(1.8rem, 3.8vw, 2.7rem)", letterSpacing: "-0.04em", lineHeight: 1.12 }}
            >
              Complete Product Catalogue
            </h2>
            <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-zinc-500">
              From interior ceramics to specialty substrates — every product links to a full profile with specs, usage guide, and TDS.
            </p>
          </Reveal>
        </div>

        {/* Grid */}
        <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* ── Tile Adhesives — featured aggregate card ── */}
          <StaggerItem className="sm:col-span-2 lg:col-span-1">
            <TiltCard className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/90 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_50px_rgba(0,0,0,0.12)] transition-shadow duration-500">
              {/* Image zone */}
              <div className="relative aspect-[5/3] overflow-hidden border-b border-zinc-100 bg-gradient-to-br from-rose-500/20 to-orange-400/10">
                <span className="absolute left-4 top-4 z-[1] rounded-full bg-gradient-to-br from-orange-600 to-orange-700 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-md">
                  5 Grades
                </span>
                <ImageWithFallback
                  src={productImageUrls.fix111}
                  alt="FIXONEX Tile Adhesives"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-contain p-6 transition-transform duration-700 group-hover:scale-[1.07]"
                />
                {/* Grade pills */}
                <div className="absolute bottom-4 left-4 flex flex-wrap gap-1.5 z-[1]">
                  {["C1T", "C2T", "C2TE", "C2TES1", "C2TES2"].map((code) => (
                    <span
                      key={code}
                      className="rounded-full border border-zinc-300/80 bg-white/90 px-2 py-0.5 text-[10px] font-bold text-zinc-700 backdrop-blur-sm shadow-sm"
                    >
                      {code}
                    </span>
                  ))}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-6 pt-7">
                <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.25 }}>
                  <Layers className="h-5 w-5 text-primary" aria-hidden />
                </motion.div>
                <h3 className="mt-4 font-display text-xl font-semibold text-zinc-950 group-hover:text-primary transition-colors duration-300">
                  Tile Adhesives
                </h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-zinc-600">
                  Five certified grades — C1T through C2TES2 — for every tile type and substrate condition.
                </p>
                <p className="mt-2 text-[12px] font-medium text-zinc-400">EN 12004 | IS 15477:2019</p>
                <div className="mt-auto pt-6 flex items-center gap-5">
                  <TransitionLink
                    href="/products/tiles-adhesive"
                    className="group/link inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                  >
                    Explore all grades
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" aria-hidden />
                  </TransitionLink>
                  <TransitionLink
                    href="/products"
                    className="text-[12px] font-semibold uppercase tracking-[0.12em] text-zinc-400 hover:text-zinc-700 transition-colors"
                  >
                    Full range
                  </TransitionLink>
                </div>
              </div>
            </TiltCard>
          </StaggerItem>

          {/* ── Specialty & Accessories ── */}
          {specialty.map((p, i) => (
            <StaggerItem key={p.id}>
              <ProductCard
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
            </StaggerItem>
          ))}
        </Stagger>

        {/* Bottom note */}
        <motion.p
          className="mt-10 text-center text-[13px] text-zinc-500"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Need help choosing?{" "}
          <TransitionLink href="/contact" className="font-semibold text-primary hover:underline">
            Talk to our experts →
          </TransitionLink>
        </motion.p>
      </div>
    </section>
  );
}
