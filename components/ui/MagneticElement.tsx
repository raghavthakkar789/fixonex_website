"use client";

import { useRef, useCallback, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  maxPx?: number;
};

/**
 * Nudges the child toward the cursor; max offset scales with element size (capped at maxPx, default 8).
 */
export function MagneticElement({ children, className, maxPx = 8 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 20, mass: 1 });
  const sy = useSpring(y, { stiffness: 300, damping: 20, mass: 1 });

  const onMove = useCallback(
    (e: React.MouseEvent) => {
      if (reduced) return;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const inv = 2 * Math.max(r.width, r.height) || 1;
      const t = (maxPx * Math.hypot(r.width, r.height)) / inv;
      const k = Math.min(t, maxPx);
      const dx = (e.clientX - cx) / (r.width / 2);
      const dy = (e.clientY - cy) / (r.height / 2);
      x.set(dx * (k * 0.5));
      y.set(dy * (k * 0.5));
    },
    [maxPx, reduced, x, y],
  );

  const onLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  if (reduced) {
    return <span className={className}>{children}</span>;
  }

  return (
    <motion.span ref={ref} className={cn("inline-flex", className)} style={{ x: sx, y: sy }} onMouseMove={onMove} onMouseLeave={onLeave}>
      {children}
    </motion.span>
  );
}
