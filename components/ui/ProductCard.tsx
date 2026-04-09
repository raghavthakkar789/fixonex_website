"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { cn } from "@/lib/utils";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";

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

export function ProductCard({ id, name, slug, badge, standard, applicationShort, sizesLine, image, dimensions, index = 0 }: ProductCardProps) {
  const reduced = useReducedMotion();
  const isTileSpacer = id === "spacer";

  return (
    <motion.article
      initial={false}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className={cn(
        "group flex h-full min-h-[520px] flex-col overflow-hidden rounded-md border border-border bg-white",
        "shadow-sm transition-[transform,box-shadow,border-color] duration-[250ms] hover:-translate-y-1.5 hover:border-warm hover:shadow-warm",
      )}
    >
      {image ? (
        isTileSpacer ? (
          <div className="relative h-[200px] w-full overflow-hidden bg-[#F5F5F5]">
            <ImageWithFallback
              src={image}
              alt={name}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover object-center"
              placeholderClassName="bg-[#F5F5F5]"
            />
          </div>
        ) : (
          <div className="relative h-[240px] w-full overflow-hidden bg-[#F5F5F5]">
            <ImageWithFallback
              src={image}
              alt={name}
              width={dimensions?.width ?? 2655}
              height={dimensions?.height ?? 4333}
              sizes="(max-width: 768px) 100vw, 33vw"
              className="absolute inset-0 h-full w-full object-contain bg-[#F5F5F5]"
              placeholderClassName="bg-[#F5F5F5]"
            />
          </div>
        )
      ) : null}
      <div className="h-1 w-full bg-warm" aria-hidden />
      <div className="flex flex-1 flex-col p-6">
        <span className="inline-flex w-fit rounded-pill bg-warm-dim px-3 py-1 text-[11px] font-medium uppercase tracking-[0.08em] text-dark">
          {badge}
        </span>
        <h3 className="mt-4 font-display text-xl font-bold text-black">{name}</h3>
        <span className="mt-2 inline-flex w-fit rounded-pill border border-border bg-light px-2.5 py-0.5 text-[11px] font-medium text-dark">{standard}</span>
        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-mid">{applicationShort}</p>
        <p className="mt-3 text-sm font-medium text-dark">{sizesLine}</p>
        <Link
          href={`/products/${slug}`}
          className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-primary transition-colors hover:text-primary-dark"
        >
          Learn More
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
        </Link>
      </div>
    </motion.article>
  );
}
