"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useTransitionStore, callNavigationResolve } from "@/lib/transitionStore";
import { easings } from "@/lib/animations";
import { BRAND } from "@/lib/brand";

const D_EXIT_MS = 360;
const D_OVER_MS = 310;

const easeInOut = easings.easeInOutExpo as [number, number, number, number];
const easeOut   = easings.easeOutExpo   as [number, number, number, number];

export function RouteTransitionLayer() {
  const phase        = useTransitionStore((s) => s.phase);
  const pendingHref  = useTransitionStore((s) => s.pendingHref);
  const reset        = useTransitionStore((s) => s.resetAfterNavigation);
  const router       = useRouter();
  const pathname     = usePathname();
  const reduced      = useReducedMotion();
  const pushT        = useRef<number | null>(null);
  const expectedPath = useRef<string | null>(null);
  const prevPath     = useRef(pathname);

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
      if (
        useTransitionStore.getState().phase === 1 &&
        useTransitionStore.getState().pendingHref
      ) {
        const href = useTransitionStore.getState().pendingHref;
        if (href) router.push(href);
      }
    }, D_EXIT_MS);
    return () => { if (pushT.current) clearTimeout(pushT.current); };
  }, [phase, pendingHref, router, reduced]);

  useEffect(() => {
    if (reduced) return;
    const wasNav = useTransitionStore.getState().phase === 1;
    const exp    = expectedPath.current;
    const match  = exp == null || pathname === exp || pathname.startsWith(`${exp}/`);
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
      style={{ background: "linear-gradient(160deg,#ffffff 0%,#fdfcfb 55%,#faf7f5 100%)" }}
      onAnimationComplete={() => {
        if (useTransitionStore.getState().phase === 2) {
          reset();
          callNavigationResolve();
        }
      }}
    >
      {/* Top red stripe */}
      <div
        className="absolute inset-x-0 top-0 h-[3px]"
        style={{ background: "linear-gradient(90deg,transparent,#D32F2F 40%,#ea580c 60%,transparent)" }}
      />

      {/* Soft glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(211,47,47,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Corner brackets */}
      {(["top-4 left-4 border-t-2 border-l-2",
         "top-4 right-4 border-t-2 border-r-2",
         "bottom-4 left-4 border-b-2 border-l-2",
         "bottom-4 right-4 border-b-2 border-r-2"] as const
      ).map((pos) => (
        <div key={pos} className={`absolute h-5 w-5 ${pos} border-zinc-200`} />
      ))}

      {/* Logo only — pops in */}
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, scale: 0.88, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.2, ease: easeOut, delay: 0.04 }}
      >
        <Image
          src="/images/misc/logo.png"
          alt={BRAND.name}
          width={180}
          height={56}
          className="h-14 w-auto object-contain"
        />
      </motion.div>

      {/* Bottom sweep bar */}
      <motion.div
        className="absolute inset-x-0 bottom-0 h-[3px] origin-left"
        style={{ background: "linear-gradient(90deg,#D32F2F,#ea580c)" }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isEnter ? 1 : 0 }}
        transition={{ duration: D_OVER_MS / 1000, ease: easeInOut }}
      />
    </motion.div>
  );
}
