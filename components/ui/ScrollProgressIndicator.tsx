"use client";

import { useReducedMotion, motion, useScroll, useSpring, useTransform } from "framer-motion";

export function ScrollProgressIndicator() {
  const { scrollYProgress } = useScroll();
  const reduced = useReducedMotion();
  const s = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.0001 });
  const scaleX = useTransform(s, (v) => (Number.isFinite(v) ? v : 0));

  if (reduced) return null;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-[3px] z-[211] h-[3px] w-full origin-left"
      style={{
        scaleX,
        backgroundColor: "rgb(193 178 164 / 0.4)",
      }}
    />
  );
}
