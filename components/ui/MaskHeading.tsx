"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { easings } from "@/lib/animations";

const ease = easings.easeOutExpo as [number, number, number, number];

type Props = {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  delayStart?: number;
  wordStagger?: number;
};

/**
 * Per-word mask reveal: each word slides up 100% → 0 with stagger. Use for all section headings.
 */
export function MaskHeading({ children, className, as = "h2", delayStart = 0, wordStagger = 0.1 }: Props) {
  const Tag = as;
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();
  const words = children.split(/\s+/).filter(Boolean);

  if (reduced) {
    return (
      <Tag ref={ref as never} className={className}>
        {children}
      </Tag>
    );
  }

  return (
    <Tag ref={ref as never} className={className}>
      <span className="inline-block">
        {words.map((w, i) => (
          <span key={`${w}-${i}`} className="inline-block overflow-hidden">
            <motion.span
              className="inline-block"
              initial={{ y: "100%", opacity: 0.001 }}
              animate={inView ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0.001 }}
              transition={{ duration: 0.7, delay: delayStart + i * wordStagger, ease }}
            >
              {w}
              {i < words.length - 1 ? "\u00A0" : null}
            </motion.span>
          </span>
        ))}
      </span>
    </Tag>
  );
}

export function BodyFadeUp({ children, className, delay = 0.2 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ y: 30, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
      transition={{ duration: 0.6, delay, ease: easings.easeOutExpo as [number, number, number, number] }}
    >
      {children}
    </motion.div>
  );
}
