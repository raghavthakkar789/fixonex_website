"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { cn } from "@/lib/utils";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { TransitionLink } from "@/components/navigation/TransitionLink";
import { easings } from "@/lib/animations";

const ease = easings.easeOutExpo as [number, number, number, number];

export type ProductCardProps = {
  id?: string;
  name: string;
  slug: string;
  badge: string;
  standard: string;
  applicationShort: string;
  sizesLine: string;
  image?: string;
  dimensions?: { width: number; height: number };
  index?: number;
};

export function ProductCard({
  id,
  name,
  slug,
  badge,
  standard,
  applicationShort,
  sizesLine,
  image,
  dimensions,
  index = 0,
}: ProductCardProps) {
  const reduced = useReducedMotion();
  const isTileSpacer = id === "spacer";
  const layoutId = `product-hero-${slug}`;

  return (
    <motion.article
      layoutId={reduced ? undefined : layoutId}
      initial={reduced ? false : { opacity: 0, y: 12, scale: 0.94 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45, delay: index * 0.08, ease }}
      className={cn(
        "pop-shadow-interactive group flex h-full min-h-[520px] flex-col overflow-hidden rounded-2xl border border-[#e5e0da] bg-white",
        "will-change-transform",
        "md:hover:-translate-y-2",
      )}
    >
      {image ? (
        isTileSpacer ? (
          <div className="relative h-[200px] w-full overflow-hidden bg-[#f3ede8]">
            <ImageWithFallback
              src={image}
              alt={name}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover object-center transition-transform duration-[400ms] ease-out group-hover:scale-[1.06]"
              placeholderClassName="bg-[#f3ede8]"
            />
          </div>
        ) : (
          <div className="relative h-[240px] w-full overflow-hidden bg-[#f3ede8]">
            <ImageWithFallback
              src={image}
              alt={name}
              width={dimensions?.width ?? 2655}
              height={dimensions?.height ?? 4333}
              sizes="(max-width: 768px) 100vw, 33vw"
              className="absolute inset-0 h-full w-full object-contain bg-[#f3ede8] transition-transform duration-[400ms] ease-out group-hover:scale-[1.06]"
              placeholderClassName="bg-[#f3ede8]"
            />
          </div>
        )
      ) : null}
      <div
        className="h-1 w-full origin-top bg-primary transition-all duration-200 ease-out group-hover:h-1.5"
        style={{ backgroundColor: "#C1B2A4" }}
        aria-hidden
      />
      <div className="flex flex-1 flex-col p-6">
        <span className="inline-flex w-fit rounded-pill bg-[#f3ede8] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.08em] text-[#3a3a3a]">
          {badge}
        </span>
        <h3 className="mt-4 font-display text-xl font-bold text-[#111111]">{name}</h3>
        <span className="mt-2 inline-flex w-fit rounded-pill border border-[#e5e0da] bg-[#f8f5f2] px-2.5 py-0.5 text-[11px] font-medium text-[#6b6b6b]">
          {standard}
        </span>
        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-mid">{applicationShort}</p>
        <p className="mt-3 text-sm font-medium text-[#3a3a3a]">{sizesLine}</p>
        <TransitionLink
          href={`/products/${slug}`}
          className="mt-auto inline-flex items-center gap-1.5 overflow-hidden pt-6 text-sm font-semibold text-primary transition-transform duration-200 group-hover:translate-x-1 hover:text-primary-dark"
        >
          <ArrowRight
            className="h-4 w-4 -translate-x-3 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
            aria-hidden
          />
          <span>Learn More</span>
        </TransitionLink>
      </div>
    </motion.article>
  );
}
