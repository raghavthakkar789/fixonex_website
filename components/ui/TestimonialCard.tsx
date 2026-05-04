"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { cn } from "@/lib/utils";

type TestimonialCardProps = {
  quote: string;
  name: string;
  role: string;
  index?: number;
  animated?: boolean;
  featured?: boolean;
  projectLabel?: string;
};

function initialsFromName(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
  return (parts[0]![0]! + parts[parts.length - 1]![0]!).toUpperCase();
}

const easeExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function TestimonialCard({
  quote,
  name,
  role,
  index = 0,
  animated = true,
  featured = false,
  projectLabel,
}: TestimonialCardProps) {
  const reduced = useReducedMotion();

  const inner = (
    <div className="relative flex h-full flex-col">
      {/* Top row: stars + quote icon */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-1" aria-hidden>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-500" strokeWidth={0} />
          ))}
        </div>
        <Quote className="h-6 w-6 text-violet-400/40" aria-hidden />
      </div>

      {/* Quote text */}
      <p className={cn(
        "flex-1 leading-[1.75] text-zinc-600",
        featured ? "text-[1.05rem]" : "text-[14px]",
      )}>
        &ldquo;{quote}&rdquo;
      </p>

      {/* Project label */}
      {projectLabel && (
        <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-400">
          {projectLabel}
        </p>
      )}

      {/* Divider */}
      <div className="my-5 h-px w-full bg-zinc-200/70" aria-hidden />

      {/* Author */}
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-orange-600 font-display text-sm font-bold text-white shadow-md">
          {initialsFromName(name)}
        </span>
        <div>
          <p className="font-display text-[14px] font-bold text-zinc-900">{name}</p>
          <p className="mt-0.5 text-[12px] text-zinc-500">{role}</p>
        </div>
      </div>
    </div>
  );

  const shellClass = cn(
    "relative overflow-hidden rounded-3xl border border-zinc-200/70 bg-white p-6 shadow-[0_2px_16px_rgba(0,0,0,0.05)] transition-all duration-300",
    "hover:shadow-[0_12px_40px_rgba(0,0,0,0.09)] hover:border-violet-200/60",
    featured && "border-violet-200/50 shadow-[0_4px_24px_rgba(124,58,237,0.08)]",
  );

  if (!animated) {
    return <article className={shellClass}>{inner}</article>;
  }

  return (
    <motion.article
      initial={reduced ? false : { opacity: 0, y: 20 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: easeExpo, delay: index * 0.1 }}
      whileHover={reduced ? undefined : { y: -3 }}
      className={shellClass}
    >
      {inner}
    </motion.article>
  );
}
