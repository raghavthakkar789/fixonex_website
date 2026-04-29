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
        "pop-shadow-interactive group flex h-full min-h-[520px] flex-col overflow-hidden rounded-2xl border border-border-strong bg-elevated",
        "will-change-transform",
        "md:hover:-translate-y-2",
      )}
    >
      {image ? (
        isTileSpacer ? (
          <div className="relative h-[200px] w-full overflow-hidden bg-muted">
            <ImageWithFallback
              src={image}
              alt={name}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover object-center transition-transform duration-[400ms] ease-out group-hover:scale-[1.06]"
              placeholderClassName="bg-muted"
            />
          </div>
        ) : (
          <div className="relative h-[240px] w-full overflow-hidden bg-muted">
            <ImageWithFallback
              src={image}
              alt={name}
              width={dimensions?.width ?? 2655}
              height={dimensions?.height ?? 4333}
              sizes="(max-width: 768px) 100vw, 33vw"
              className="absolute inset-0 h-full w-full object-contain bg-muted transition-transform duration-[400ms] ease-out group-hover:scale-[1.06]"
              placeholderClassName="bg-muted"
            />
          </div>
        )
      ) : null}
      <div
        className="h-1 w-full origin-top bg-primary transition-all duration-200 ease-out group-hover:h-1.5"
        aria-hidden
      />
      <div className="flex flex-1 flex-col p-6">
        <span className="inline-flex w-fit rounded-pill bg-secondary/70 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.08em] text-mid">
          {badge}
        </span>
        <h3 className="mt-4 font-heading text-xl font-bold text-foreground">{name}</h3>
        <span className="mt-2 inline-flex w-fit rounded-pill border border-border-soft bg-muted px-2.5 py-0.5 text-[11px] font-medium text-mid">
          {standard}
        </span>
        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-mid">{applicationShort}</p>
        <p className="mt-3 text-sm font-medium text-foreground">{sizesLine}</p>
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
