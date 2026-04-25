"use client";

import { useRef, useState, useCallback, type ReactNode, type CSSProperties } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { useIsDesktop } from "@/lib/useIsDesktop";
import { cn } from "@/lib/utils";

const rx = 8;

type Props = { children: ReactNode; className?: string };

/**
 * 3D tilt on desktop: rotateX / rotateY + moving sheen. Touch: no effect.
 */
export function BentoTiltCard({ children, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const isDesktop = useIsDesktop();
  const reduced = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 200, damping: 25 });
  const sy = useSpring(my, { stiffness: 200, damping: 25 });
  const [pos, setPos] = useState({ x: 50, y: 50 });

  const onMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDesktop || reduced) return;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      mx.set((y - 0.5) * 2 * rx);
      my.set((0.5 - x) * 2 * rx);
      setPos({ x: x * 100, y: y * 100 });
    },
    [isDesktop, reduced, mx, my],
  );

  const onLeave = useCallback(() => {
    mx.set(0);
    my.set(0);
  }, [mx, my]);

  if (!isDesktop || reduced) {
    return <div className={className}>{children}</div>;
  }

  const sheenStyle: CSSProperties = {
    background: `radial-gradient(ellipse 80% 50% at ${100 - pos.x}% ${100 - pos.y}%, rgba(255,255,255,0.06) 0%, transparent 50%)`,
  };

  return (
    <motion.div
      ref={ref}
      className={cn("relative", className)}
      style={{ perspective: 1000, rotateX: sx, rotateY: sy, transformStyle: "preserve-3d" }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <div className="pointer-events-none absolute inset-0 z-10" style={sheenStyle} aria-hidden />
      {children}
    </motion.div>
  );
}
