"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { useTransitionStore, callNavigationResolve } from "@/lib/transitionStore";
import { easings } from "@/lib/animations";
import { BRAND } from "@/lib/brand";

const D_EXIT_MS = 350;
const D_OVER_MS = 300;

const easeQ = easings.easeInOutQuart as [number, number, number, number];
const defOverlay = { bg: "#F5F5F5", wordmark: "#2B2B2B" as const };

/**
 * Overlay: slides down from the top (phase 1), router.push after exit window, on pathname change
 * (phase 2) slides back up; then reset + resolve the navigation promise.
 */
export function RouteTransitionLayer() {
  const phase = useTransitionStore((s) => s.phase);
  const pendingHref = useTransitionStore((s) => s.pendingHref);
  const overlay = useTransitionStore((s) => s.overlay) ?? defOverlay;
  const reset = useTransitionStore((s) => s.resetAfterNavigation);
  const router = useRouter();
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const pushT = useRef<number | null>(null);
  const expectedPath = useRef<string | null>(null);
  const prevPath = useRef(pathname);

  useEffect(() => {
    if (reduced) return;
    if (phase !== 1 || !pendingHref) return;
    document.documentElement.setAttribute("data-page-exit", "1");
    try {
      const u = new URL(pendingHref, window.location.origin);
      expectedPath.current = u.pathname;
    } catch {
      expectedPath.current = pendingHref;
    }

    if (pushT.current) clearTimeout(pushT.current);
    pushT.current = window.setTimeout(() => {
      if (useTransitionStore.getState().phase === 1 && useTransitionStore.getState().pendingHref) {
        const href = useTransitionStore.getState().pendingHref;
        if (href) router.push(href);
      }
    }, D_EXIT_MS);

    return () => {
      if (pushT.current) clearTimeout(pushT.current);
    };
  }, [phase, pendingHref, router, reduced]);

  useEffect(() => {
    if (reduced) return;
    if (prevPath.current === pathname) return;
    const wasNav = useTransitionStore.getState().phase === 1;
    const exp = expectedPath.current;
    const match = exp == null || pathname === exp || pathname.startsWith(`${exp}/`);
    if (wasNav && match) {
      useTransitionStore.setState({ phase: 2 });
      document.documentElement.removeAttribute("data-page-exit");
    }
    prevPath.current = pathname;
  }, [pathname, reduced]);

  if (reduced || phase === 0) return null;

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[190] flex items-center justify-center"
      style={{ background: overlay.bg }}
      key={phase}
      initial={phase === 1 ? { y: "-100%" } : { y: 0 }}
      animate={phase === 1 ? { y: 0 } : { y: "-100%" }}
      transition={{ duration: D_OVER_MS / 1000, ease: easeQ }}
      onAnimationComplete={() => {
        if (useTransitionStore.getState().phase === 2) {
          reset();
          callNavigationResolve();
        }
      }}
    >
      <p className="font-heading text-2xl font-semibold" style={{ color: overlay.wordmark }}>
        {BRAND.name}
      </p>
    </motion.div>
  );
}
