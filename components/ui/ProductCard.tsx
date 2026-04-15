"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";
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
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(my, { stiffness: 200, damping: 20 });
  const ry = useSpring(mx, { stiffness: 200, damping: 20 });

  return (
    <motion.article
      initial={reduced ? false : { opacity: 0, y: 50, scale: 0.96 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      style={reduced ? undefined : { rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
      onMouseMove={(e) => {
        if (reduced) return;
        const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        mx.set((px - 0.5) * 16);
        my.set((0.5 - py) * 16);
      }}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      className={cn(
        "group flex h-full min-h-[520px] flex-col overflow-hidden rounded-2xl border border-[#e5e0da] bg-white [perspective:1000px]",
        "shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-[transform,box-shadow,border-color] duration-[300ms] hover:-translate-y-1.5 hover:shadow-[0_16px_36px_rgba(0,0,0,0.12)]",
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
              className="object-cover object-center transition-transform duration-[400ms] group-hover:scale-[1.04]"
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
              className="absolute inset-0 h-full w-full object-contain bg-[#f3ede8] transition-transform duration-[400ms] group-hover:scale-[1.04]"
              placeholderClassName="bg-[#f3ede8]"
            />
          </div>
        )
      ) : null}
      <div className="h-1 w-full bg-[#d8ccc0]" aria-hidden />
      <div className="flex flex-1 flex-col p-6">
        <span className="inline-flex w-fit rounded-pill bg-[#f3ede8] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.08em] text-[#3a3a3a]">
          {badge}
        </span>
        <h3 className="mt-4 font-display text-xl font-bold text-[#111111]">{name}</h3>
        <span className="mt-2 inline-flex w-fit rounded-pill border border-[#e5e0da] bg-[#f8f5f2] px-2.5 py-0.5 text-[11px] font-medium text-[#6b6b6b]">{standard}</span>
        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-mid">{applicationShort}</p>
        <p className="mt-3 text-sm font-medium text-[#3a3a3a]">{sizesLine}</p>
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
