"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useAnimationFrame } from "framer-motion";
import Lenis from "lenis";
import BezierEasing from "bezier-easing";

type Props = { children: ReactNode };

/**
 * Syncs Lenis with Framer Motion by driving lenis.raf from useAnimationFrame.
 * Options: lerp 0.08, duration 1.2, easing cubic-bezier(0.16, 1, 0.3, 1)
 */
export function LenisRafProvider({ children }: Props) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const ease = BezierEasing(0.16, 1, 0.3, 1);
    const lenis = new Lenis({
      lerp: 0.08,
      duration: 1.2,
      easing: (t) => ease(t),
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
