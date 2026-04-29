"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { cn } from "@/lib/utils";

type TestimonialCardProps = {
  quote: string;
  name: string;
  role: string;
  index?: number;
  /** When false, no per-card scroll/hover motion (parent may animate the group). */
  animated?: boolean;
  featured?: boolean;
  projectLabel?: string;
};

function initialsFromName(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

const cardBase =
  "pop-shadow-quote relative flex min-h-[220px] flex-col overflow-hidden rounded-2xl border border-border-strong/55 bg-elevated/95 p-5 ring-1 ring-border-soft backdrop-blur-[1px] before:absolute before:left-0 before:top-0 before:h-1 before:w-full before:bg-gradient-to-r before:from-primary before:to-terracotta before:content-[''] transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-neo-hover md:p-6";

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
    <>
      <p
        className={cn(
          "pointer-events-none font-heading leading-none text-chip/35",
          featured ? "text-[100px]" : "text-[72px]",
        )}
        aria-hidden
      >
        &ldquo;
      </p>
      <div className="flex flex-wrap items-center gap-2 pt-2" aria-hidden>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-3.5 w-3.5 fill-terracotta text-terracotta" strokeWidth={0} />
        ))}
      </div>
      <p className={cn("-mt-1 flex-1 italic leading-[1.72] text-dark", featured ? "text-[1.05rem] md:text-lg" : "text-base")}>
        {quote}
      </p>
      {projectLabel ? (
        <p className="mt-4 text-[11px] font-medium uppercase tracking-[0.1em] text-mid">
          Project: <span className="font-body normal-case italic tracking-normal text-foreground">{projectLabel}</span>
        </p>
      ) : null}
      <div className="mt-6 flex items-center gap-3 border-t border-border-soft pt-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-terracotta to-terracotta-dark font-heading text-sm font-semibold text-white shadow-sm ring-2 ring-white/55">
          {initialsFromName(name)}
        </span>
        <div>
          <p className="font-body text-base font-bold text-foreground">{name}</p>
          <p className="mt-0.5 text-sm text-mid">{role}</p>
        </div>
      </div>
      <span
        className="pointer-events-none absolute bottom-3 right-4 font-serif text-[4.5rem] leading-none text-foreground/[0.06]"
        aria-hidden
      >
        &rdquo;
      </span>
    </>
  );

  const shellClass = cn(cardBase, featured && "shadow-lg ring-terracotta/25 md:min-h-[260px]");

  if (!animated) {
    return <article className={shellClass}>{inner}</article>;
  }

  return (
    <motion.article
      initial={false}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: index * 0.12 }}
      whileHover={reduced ? undefined : { y: -4 }}
      className={shellClass}
    >
      {inner}
    </motion.article>
  );
}
