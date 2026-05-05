"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";

type Props = { children: ReactNode };

/** Approximates cubic-bezier(0.16, 1, 0.3, 1) — avoids extra deps */
function easeOutExpoLike(t: number) {
  return 1 - Math.pow(1 - t, 4);
}

/**
 * Drives Lenis with a native rAF loop (no Framer dependency) so the smooth-scroll
 * runtime stays smaller and main-thread work is easier to schedule.
 */
export function LenisRafProvider({ children }: Props) {
  useEffect(() => {
    let cancelled = false;
    let rafId = 0;
    let idleId = 0;
    let lenisInstance: Lenis | null = null;

    const runLoop = (lenis: Lenis) => {
      const loop = (time: number) => {
        if (cancelled) return;
        lenis.raf(time);
        rafId = requestAnimationFrame(loop);
      };
      rafId = requestAnimationFrame(loop);
    };

    const start = () => {
      if (cancelled) return;
      lenisInstance = new Lenis({
        lerp: 0.08,
        duration: 1.2,
        easing: (t) => easeOutExpoLike(t),
      });
      runLoop(lenisInstance);
    };

    let schedule: "idle" | "timeout" = "idle";

    // After first paint / when the browser is idle — keeps TTI and first interaction snappier.
    if (typeof requestIdleCallback !== "undefined") {
      idleId = requestIdleCallback(start, { timeout: 380 });
      schedule = "idle";
    } else {
      idleId = window.setTimeout(start, 0) as unknown as number;
      schedule = "timeout";
    }

    return () => {
      cancelled = true;
      if (schedule === "idle" && typeof cancelIdleCallback !== "undefined") {
        cancelIdleCallback(idleId);
      } else {
        window.clearTimeout(idleId);
      }
      cancelAnimationFrame(rafId);
      lenisInstance?.destroy();
      lenisInstance = null;
    };
  }, []);

  return <>{children}</>;
}
