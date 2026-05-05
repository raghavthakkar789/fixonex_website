"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { BRAND } from "@/lib/brand";
import { easings } from "@/lib/animations";
import { useTransitionStore, callNavigationResolve } from "@/lib/transitionStore";

/**
 * Module-level guard so the splash only plays ONCE per page-load lifecycle on
 * hard refresh. A full page reload re-evaluates this module → resets to
 * `false` → splash shows again. Internal client-side route changes leave it
 * `true`, but they trigger the same loader through the navigation flow below
 * (driven by the transition store).
 */
let _hasShownLoader = false;

const easeExpo = easings.easeOutExpo as [number, number, number, number];
const easeInOut = easings.easeInOutExpo as [number, number, number, number];

/** How long the splash holds on a hard reload before exiting. */
const RELOAD_HOLD_MS = 1300;
/** How long after the loader appears before we push the new route. */
const NAV_PUSH_DELAY_MS = 360;
/** Duration of the fade-out exit. */
const EXIT_MS = 500;

type Phase = "active" | "exiting" | "done";
type Source = "initial" | "navigation";

export function InitialPageLoader() {
  // Start ACTIVE so the splash paints immediately on hard refresh / hydration.
  // The layout effect below reconciles this for repeat in-session mounts and
  // reduced-motion users.
  const [phase, setPhase] = useState<Phase>("active");
  const [source, setSource] = useState<Source>("initial");

  const reducedRef = useRef(false);
  const expectedPath = useRef<string | null>(null);
  const pushTimer = useRef<number | null>(null);
  const exitTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const doneTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const storePhase = useTransitionStore((s) => s.phase);
  const pendingHref = useTransitionStore((s) => s.pendingHref);
  const resetStore = useTransitionStore((s) => s.resetAfterNavigation);

  const router = useRouter();
  const pathname = usePathname();

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    reducedRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedRef.current || _hasShownLoader) {
      setPhase("done");
      return;
    }
    _hasShownLoader = true;
  }, []);

  // Initial-load auto-exit: hold for RELOAD_HOLD_MS, then start fading out.
  useEffect(() => {
    if (source !== "initial" || phase !== "active") return;
    exitTimer.current = setTimeout(() => setPhase("exiting"), RELOAD_HOLD_MS);
    return () => {
      if (exitTimer.current) clearTimeout(exitTimer.current);
    };
  }, [source, phase]);

  // Navigation-trigger: when the transition store says a navigation is pending,
  // raise the loader (interrupting any in-flight initial-load timer) and
  // schedule the actual `router.push`.
  useEffect(() => {
    if (reducedRef.current) return;
    if (storePhase !== 1 || !pendingHref) return;

    setSource("navigation");
    setPhase("active");

    try {
      const u = new URL(pendingHref, window.location.origin);
      expectedPath.current = u.pathname;
    } catch {
      expectedPath.current = pendingHref;
    }

    if (pushTimer.current) window.clearTimeout(pushTimer.current);
    pushTimer.current = window.setTimeout(() => {
      const state = useTransitionStore.getState();
      if (state.phase === 1 && state.pendingHref) {
        router.push(state.pendingHref);
      }
    }, NAV_PUSH_DELAY_MS);

    return () => {
      if (pushTimer.current) window.clearTimeout(pushTimer.current);
    };
  }, [storePhase, pendingHref, router]);

  // When the pathname catches up to the navigation target, begin the exit.
  useEffect(() => {
    if (reducedRef.current) return;
    if (source !== "navigation" || phase !== "active") return;
    const exp = expectedPath.current;
    const matched = exp == null || pathname === exp || pathname.startsWith(`${exp}/`);
    if (matched) {
      useTransitionStore.setState({ phase: 2 });
      setPhase("exiting");
    }
  }, [pathname, source, phase]);

  // Final cleanup once the exit fade has played.
  useEffect(() => {
    if (phase !== "exiting") return;
    doneTimer.current = setTimeout(() => {
      if (source === "navigation") {
        resetStore();
        callNavigationResolve();
      }
      expectedPath.current = null;
      setPhase("done");
    }, EXIT_MS);
    return () => {
      if (doneTimer.current) clearTimeout(doneTimer.current);
    };
  }, [phase, source, resetStore]);

  // Lock body scroll while the splash covers the page so the user can't
  // scroll the underlying content during the brief hold.
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (phase === "done") return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [phase]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          key="ipl"
          role="presentation"
          aria-hidden
          className="fixed inset-0 z-[300] flex flex-col items-center justify-center bg-white"
          initial={{ opacity: 1 }}
          animate={{ opacity: phase === "exiting" ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: EXIT_MS / 1000, ease: easeInOut }}
        >
          {/* Logo — uses `fill` with an aspect-ratio-locked parent (400:120)
              to match the source asset and avoid Next.js Image aspect warnings. */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeExpo }}
            className="relative h-28 w-[280px] sm:h-32 sm:w-[320px] md:h-36 md:w-[360px] lg:h-44 lg:w-[440px]"
          >
            <Image
              src="/images/misc/logo.png"
              alt={BRAND.name}
              fill
              priority
              sizes="(min-width: 1024px) 440px, (min-width: 768px) 360px, (min-width: 640px) 320px, 280px"
              className="object-contain"
            />
          </motion.div>

          {/* Loading animation — indeterminate sliding bar BELOW the logo */}
          <motion.div
            className="relative mt-10 h-[3px] w-48 overflow-hidden rounded-full bg-zinc-100 sm:mt-12 sm:w-56 md:w-64"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: easeExpo, delay: 0.25 }}
          >
            <motion.div
              className="absolute inset-y-0 w-1/3 rounded-full"
              style={{ background: "linear-gradient(90deg, #D32F2F, #ea580c)" }}
              animate={{ x: ["-110%", "320%"] }}
              transition={{ duration: 1.15, ease: easeInOut, repeat: Infinity }}
            />
          </motion.div>

          <motion.p
            className="mt-4 text-[11px] font-semibold uppercase tracking-[0.32em] text-zinc-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: easeExpo, delay: 0.35 }}
          >
            Loading
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
