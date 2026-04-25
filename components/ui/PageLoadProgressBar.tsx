"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { useTransitionStore } from "@/lib/transitionStore";
import { easings } from "@/lib/animations";

const ease = easings.easeOutExpo as [number, number, number, number];

/** Red bar at top: jumps to ~70% when a client transition starts, completes on route change, then fades. */
export function PageLoadProgressBar() {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const hasNav = useTransitionStore((s) => s.hasNavStart);
  const [widthPct, setWidthPct] = useState(0);
  const [opacity, setOpacity] = useState(0);
  const prevPath = useRef(pathname);

  useEffect(() => {
    if (reduced) return;
    if (hasNav) {
      setOpacity(1);
      setWidthPct(70);
    }
  }, [hasNav, reduced]);

  useEffect(() => {
    if (reduced) return;
    if (prevPath.current === pathname) return;
    prevPath.current = pathname;
    setOpacity(1);
    setWidthPct(100);
    const t = window.setTimeout(() => {
      setOpacity(0);
      setWidthPct(0);
    }, 300);
    return () => clearTimeout(t);
  }, [pathname, reduced]);

  if (reduced) return null;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[220] h-[3px] origin-left bg-primary"
      style={{ width: `${widthPct}%` }}
      transition={{ duration: widthPct === 70 && hasNav ? 0.12 : 0.28, ease }}
      animate={{ opacity }}
    />
  );
}
