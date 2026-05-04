"use client";

import { motion } from "framer-motion";
import { ArrowRight, Grid3X3, Package, Palette, Layers, Droplets, Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { TransitionLink } from "@/components/navigation/TransitionLink";
import { TiltCard } from "@/components/ui/TiltCard";
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

const accentMap: Record<string, string> = {
  "tile-adhesive": "from-rose-500/20 to-orange-400/10",
  "epoxy-grout":   "from-teal-500/20 to-emerald-400/10",
  "block-mortar":  "from-blue-500/20 to-indigo-400/10",
  "pu-fixo":       "from-violet-500/20 to-purple-400/10",
  "cleaner":       "from-cyan-500/20 to-sky-400/10",
  "spacer":        "from-amber-500/20 to-yellow-400/10",
  default:         "from-zinc-200/60 to-zinc-100/40",
};

const iconMap: Record<string, React.ElementType> = {
  "tile-adhesive": Grid3X3,
  "epoxy-grout":   Palette,
  "block-mortar":  Layers,
  "pu-fixo":       Package,
  "cleaner":       Droplets,
  "spacer":        Maximize2,
  default:         Package,
};

function getAccent(slug: string): string {
  for (const key of Object.keys(accentMap)) {
    if (slug.includes(key)) return accentMap[key]!;
  }
  return accentMap["default"]!;
}

function getIcon(id?: string, slug?: string): React.ElementType {
  const key = id ?? slug ?? "";
  for (const k of Object.keys(iconMap)) {
    if (key.includes(k)) return iconMap[k]!;
  }
  return iconMap["default"]!;
}

export function ProductCard({
  id,
  name,
  slug,
  badge,
  standard,
  applicationShort,
  sizesLine,
  image,
  index = 0,
}: ProductCardProps) {
  const accent = getAccent(slug);
  const Icon = getIcon(id, slug);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.08, ease }}
    >
      <TiltCard className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/90 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_50px_rgba(0,0,0,0.12)] transition-shadow duration-500">

        {/* Image zone */}
        <div className={cn("relative aspect-[5/3] overflow-hidden border-b border-zinc-100 bg-gradient-to-br", accent)}>
          {/* Badge */}
          <span className="absolute left-4 top-4 z-[1] rounded-full bg-gradient-to-br from-orange-600 to-orange-700 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-md">
            {badge}
          </span>

          {image ? (
            <ImageWithFallback
              src={image}
              alt={name}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-contain p-6 transition-transform duration-700 group-hover:scale-[1.07]"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-20 w-20 rounded-full bg-white/40 backdrop-blur-sm" />
            </div>
          )}

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-6 pt-7">
          <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.25 }}>
            <Icon className="h-5 w-5 text-primary" aria-hidden />
          </motion.div>

          <h3 className="mt-4 font-display text-xl font-semibold text-zinc-950 group-hover:text-primary transition-colors duration-300">
            {name}
          </h3>
          <p className="mt-2.5 text-[15px] leading-relaxed text-zinc-600 line-clamp-2">
            {applicationShort}
          </p>
          <p className="mt-2 text-[12px] font-medium text-zinc-400">{sizesLine}</p>

          <div className="mt-auto pt-6 flex items-center gap-5">
            <TransitionLink
              href={`/products/${slug}`}
              className="group/link inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              View product
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-0.5" aria-hidden />
            </TransitionLink>
            <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-zinc-400">
              {standard}
            </span>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}
