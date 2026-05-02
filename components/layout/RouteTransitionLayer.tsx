"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { useTransitionStore, callNavigationResolve } from "@/lib/transitionStore";
import { easings } from "@/lib/animations";
import { BRAND } from "@/lib/brand";

const D_EXIT_MS = 380;
const D_OVER_MS = 320;

const easeInOut = easings.easeInOutExpo as [number, number, number, number];
const easeOut = easings.easeOutExpo as [number, number, number, number];
const defOverlay = { bg: "#050508", wordmark: "#ffffff" as const };

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

  const isEnter = phase === 1;

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[190] flex items-center justify-center overflow-hidden"
      key={phase}
      initial={isEnter ? { y: "100%" } : { y: 0 }}
      animate={isEnter ? { y: 0 } : { y: "-100%" }}
      transition={{ duration: D_OVER_MS / 1000, ease: easeInOut }}
      onAnimationComplete={() => {
        if (useTransitionStore.getState().phase === 2) {
          reset();
          callNavigationResolve();
        }
      }}
      style={{ background: overlay.bg === "#F5F5F5" ? "#050508" : overlay.bg }}
    >
      {/* Gradient overlays */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(211,47,47,0.15) 0%, transparent 70%)",
        }}
      />
      <div
        className="grain-noise absolute inset-0 opacity-40 mix-blend-overlay pointer-events-none"
        aria-hidden
      />

      {/* Wordmark */}
      <motion.div
        className="relative z-10 flex flex-col items-center gap-3"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35, ease: easeOut, delay: 0.05 }}
      >
        <p
          className="font-display font-bold tracking-[-0.04em] text-white"
          style={{ fontSize: "clamp(1.75rem, 5vw, 2.5rem)" }}
        >
          {BRAND.name}
        </p>
        <motion.div
          className="h-px w-16 origin-left rounded-full"
          style={{ background: "linear-gradient(90deg, #D32F2F, #ea580c)" }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, ease: easeOut, delay: 0.15 }}
        />
      </motion.div>

      {/* Corner brackets */}
      {["top-4 left-4 border-t border-l", "top-4 right-4 border-t border-r", "bottom-4 left-4 border-b border-l", "bottom-4 right-4 border-b border-r"].map((pos) => (
        <div key={pos} className={`absolute h-4 w-4 ${pos} border-white/20`} />
      ))}
    </motion.div>
  );
}
