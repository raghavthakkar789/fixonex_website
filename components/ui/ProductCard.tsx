"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
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
      initial={reduced ? false : { opacity: 0, y: 20 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.07, ease }}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl bg-[#09090d] border border-white/8",
        "transition-all duration-300 hover:border-primary/30 hover:shadow-[0_0_40px_rgba(211,47,47,0.12)]",
        "will-change-transform",
      )}
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-zinc-900" style={{ paddingBottom: "60%" }}>
        {image ? (
          <ImageWithFallback
            src={image}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className={cn(
              "object-contain transition-transform duration-500 ease-out group-hover:scale-[1.05]",
              isTileSpacer ? "object-cover" : "object-contain bg-zinc-900",
            )}
            placeholderClassName="bg-zinc-900"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-zinc-900">
            <div className="h-16 w-16 rounded-full bg-white/5" />
          </div>
        )}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090d] via-transparent to-transparent opacity-60" />

        {/* Badge top-left */}
        <div className="absolute left-3 top-3">
          <span className="rounded-full border border-white/15 bg-black/60 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-zinc-300 backdrop-blur-sm">
            {badge}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-lg font-bold leading-tight text-white">{name}</h3>
          <span className="mt-0.5 shrink-0 rounded-full border border-zinc-700 px-2 py-0.5 text-[10px] font-medium text-zinc-500">
            {standard}
          </span>
        </div>

        <p className="mt-3 line-clamp-2 text-[13px] leading-relaxed text-zinc-400">{applicationShort}</p>

        <p className="mt-3 text-[12px] font-medium text-zinc-500">{sizesLine}</p>

        {/* Bottom row */}
        <div className="mt-auto flex items-center justify-between pt-6">
          <div className="h-px flex-1 bg-white/[0.06]" />
          <TransitionLink
            href={`/products/${slug}`}
            className="ml-4 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-[12px] font-semibold text-zinc-300 transition-all duration-200 hover:border-primary/40 hover:bg-primary/10 hover:text-white"
          >
            View
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
          </TransitionLink>
        </div>
      </div>

      {/* Bottom glow line on hover */}
      <div
        aria-hidden
        className="absolute bottom-0 left-[10%] right-[10%] h-px origin-center scale-x-0 rounded-full bg-primary/50 transition-transform duration-300 group-hover:scale-x-100"
      />
    </motion.article>
  );
}
