"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import { easings, transitions, variants } from "@/lib/animations";

const M = { section: motion.section, div: motion.div, article: motion.article };

const variantMap: Record<string, Variants> = {
  fadeUp: variants.fadeUp,
  fadeIn: variants.fadeIn,
  slideInLeft: variants.slideInLeft,
  slideInRight: variants.slideInRight,
  scaleIn: variants.scaleIn,
  clipRevealLeft: variants.clipRevealLeft,
  clipRevealBottom: variants.clipRevealBottom,
};

type VariantKey = keyof typeof variantMap;

type Props = {
  children: ReactNode;
  variant?: VariantKey;
  delay?: number;
  className?: string;
  once?: boolean;
  as?: "section" | "div" | "article";
};

export function AnimatedSection({ children, variant = "fadeUp", delay = 0, className, once = true, as: asProp = "section" }: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once, margin: "-80px" });
  const reduced = useReducedMotion();
  const v = variantMap[variant] ?? variants.fadeUp;
  const Tag = M[asProp];

  return (
    <Tag
      ref={ref as never}
      className={className}
      initial={reduced ? "animate" : "initial"}
      animate={reduced || Boolean(inView) ? "animate" : "initial"}
      variants={v}
      transition={{ ...transitions.medium, delay, ease: easings.easeOutExpo as [number, number, number, number] }}
    >
      {children}
    </Tag>
  );
}
