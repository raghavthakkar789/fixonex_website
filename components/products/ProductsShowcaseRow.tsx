"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";
import { ProductCard } from "@/components/ui/ProductCard";
import type { ProductCardProps } from "@/components/ui/ProductCard";
import { useIsDesktop } from "@/lib/useIsDesktop";
import { cn } from "@/lib/utils";
import { products } from "@/lib/data/products";

const nonAdhesive = products.filter((p) => p.familySlug !== "tiles-adhesive");
const W_GAP = 24;

type RowProps = { cards: (ProductCardProps & { slug: string })[] };

/**
 * On lg+: vertical scroll in this section maps to horizontal product card motion.
 * Mobile: standard stacked grid.
 */
function HorizontalTrack({ cards }: RowProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const scroll = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const raw = useTransform(scroll.scrollYProgress, [0, 1], [0, 1]);
  const smooth = useSpring(raw, { stiffness: 100, damping: 40, restDelta: 0.0001 });
  const total = 320 * cards.length + W_GAP * (cards.length - 1);
  const x = useTransform(smooth, (p) => {
    if (typeof window === "undefined") return 0;
    const vw = window.innerWidth;
    const max = Math.max(0, total - vw * 0.9);
    return -p * max;
  });

  return (
    <section
      ref={sectionRef}
      className="section-pad section-flow-light relative"
      style={{ minHeight: "min(200vh, 1200px)" }}
    >
      <div className="site-container">
        <p className="section-eyebrow">Our Range</p>
        <h2 className="font-heading text-display font-semibold text-foreground">Product Cards</h2>
        <p className="section-subtext mt-3 max-w-2xl">Scroll to explore. Each card links to a full product profile.</p>
        <div className="mt-8 overflow-x-hidden">
          <motion.div
            className="flex w-max flex-nowrap gap-6 pb-4 pt-1"
            style={{ x, gap: W_GAP, willChange: "transform" }}
          >
            {cards.map((p, i) => (
              <div key={p.slug} className="w-[min(92vw,320px)] flex-shrink-0">
                <ProductCard {...p} index={i} />
              </div>
            ))}
          </motion.div>
        </div>
        <div className="mt-3 h-0.5 w-full overflow-hidden rounded bg-border-strong/65">
          <motion.div
            className="h-full origin-left bg-chip/80"
            style={{ scaleX: smooth, transformOrigin: "left" }}
          />
        </div>
      </div>
    </section>
  );
}

function Stacked({ cards }: RowProps) {
  return (
    <section className="section-pad section-flow-light">
      <div className="site-container">
        <p className="section-eyebrow">Our Range</p>
        <h2 className="font-heading text-display font-semibold text-foreground">Product Cards</h2>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {cards.map((p, i) => (
            <ProductCard key={p.slug} {...p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProductsShowcaseRow() {
  const desktop = useIsDesktop();
  const reduced = useReducedMotion();
  const cards = nonAdhesive.map((product, index) => ({
    id: product.id,
    name: product.name,
    slug: product.slug,
    badge: product.badge,
    standard: product.standard,
    applicationShort: product.applicationShort,
    sizesLine: product.sizesLine,
    image: product.image,
    dimensions: product.dimensions,
    index,
  }));

  if (!desktop || reduced) {
    return <Stacked cards={cards} />;
  }
  return <HorizontalTrack cards={cards} />;
}
