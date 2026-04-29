"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useAnimationFrame } from "framer-motion";
import Lenis from "lenis";

type Props = { children: ReactNode };

/** Approximates cubic-bezier(0.16, 1, 0.3, 1) — avoids extra deps */
function easeOutExpoLike(t: number) {
  return 1 - Math.pow(1 - t, 4);
}

/**
 * Syncs Lenis with Framer Motion by driving lenis.raf from useAnimationFrame.
 */
export function LenisRafProvider({ children }: Props) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      duration: 1.2,
      easing: (t) => easeOutExpoLike(t),
    });
    lenisRef.current = lenis;
    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useAnimationFrame((t) => {
    lenisRef.current?.raf(t);
  });

  return <>{children}</>;
}
