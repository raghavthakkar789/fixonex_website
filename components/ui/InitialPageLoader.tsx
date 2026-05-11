"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { easings } from "@/lib/animations";
import { useTransitionStore, callNavigationResolve } from "@/lib/transitionStore";
import { pathnameKeysEqual } from "@/lib/utils";

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

/** Compact loader — short hold, gentle fade. */
const RELOAD_HOLD_MS = 2000;
const NAV_PUSH_DELAY_MS = 360;
const EXIT_MS = 550;

type Phase = "active" | "exiting" | "done";
type Source = "initial" | "navigation";

/* White-theme palette — deepened for stronger presence */
const COLOR_BG = "#FAFAF9";    // site background
const COLOR_FAINT = "#B8B0A6"; // deeper faint — was #D4CCC2
const COLOR_MUTED = "#6B6158"; // brand muted
const COLOR_BRIGHT = "#0F0D0B"; // near-black with a warm brand tint — was #2C2622

/* Arc geometry — the visible mark is ~60px on mobile, ~72px on desktop */
const R = 28;
const C = 2 * Math.PI * R; // circumference

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

  // Initial-load auto-exit: hold for RELOAD_HOLD_MS, then start the fade.
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
    if (storePhase !== 1 || !pendingHref) return;

    try {
      const u = new URL(pendingHref, window.location.origin);
      expectedPath.current = u.pathname;
    } catch {
      expectedPath.current = pendingHref;
    }

    if (!reducedRef.current) {
      setSource("navigation");
      setPhase("active");
    } else {
      setSource("navigation");
    }

    const delay = reducedRef.current ? 0 : NAV_PUSH_DELAY_MS;

    if (pushTimer.current) window.clearTimeout(pushTimer.current);
    pushTimer.current = window.setTimeout(() => {
      const state = useTransitionStore.getState();
      if (state.phase === 1 && state.pendingHref) {
        router.push(state.pendingHref);
      }
    }, delay);

    return () => {
      if (pushTimer.current) window.clearTimeout(pushTimer.current);
    };
  }, [storePhase, pendingHref, router]);

  // When the pathname catches up to the navigation target, begin the exit.
  useEffect(() => {
    if (source !== "navigation") return;
    const exp = expectedPath.current;
    if (exp == null || exp === "") return;
    if (!pathnameKeysEqual(pathname, exp)) return;

    useTransitionStore.setState({ phase: 2 });

    if (reducedRef.current) {
      useTransitionStore.getState().resetAfterNavigation();
      callNavigationResolve();
      expectedPath.current = null;
      setSource("initial");
      return;
    }

    if (phase !== "active") return;
    setPhase("exiting");
  }, [pathname, source, phase]);

  // Final cleanup once the fade has played.
  useEffect(() => {
    if (phase !== "exiting") return;
    doneTimer.current = setTimeout(() => {
      if (source === "navigation") {
        useTransitionStore.getState().resetAfterNavigation();
        callNavigationResolve();
      }
      expectedPath.current = null;
      setPhase("done");
    }, EXIT_MS);
    return () => {
      if (doneTimer.current) clearTimeout(doneTimer.current);
    };
  }, [phase, source]);

  // Lock body scroll while the splash covers the page.
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (phase === "done") return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [phase]);

  const isExiting = phase === "exiting";

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          key="ipl"
          role="presentation"
          aria-hidden
          className="fixed inset-0 z-[300] flex items-center justify-center"
          style={{ background: COLOR_BG }}
          initial={{ opacity: 1 }}
          animate={{ opacity: isExiting ? 0 : 1 }}
          transition={{ duration: EXIT_MS / 1000, ease: easeInOut }}
        >
          <motion.div
            className="flex flex-col items-center gap-7 sm:gap-9 md:gap-10"
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: easeExpo }}
          >
            {/* Mark — many small motions layered into one canvas */}
            <svg
              viewBox="-46 -46 92 92"
              className="h-40 w-40 sm:h-48 sm:w-48 md:h-56 md:w-56"
              aria-hidden
            >
              <defs>
                <linearGradient id="ipl-arc" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor={COLOR_BRIGHT} stopOpacity={0} />
                  <stop offset="55%" stopColor={COLOR_BRIGHT} stopOpacity={0.3} />
                  <stop offset="100%" stopColor={COLOR_BRIGHT} stopOpacity={1} />
                </linearGradient>
              </defs>

              {/* (1) Outermost dashed ring — slow counter-rotation */}
              <motion.circle
                cx={0}
                cy={0}
                r={38}
                fill="none"
                stroke={COLOR_FAINT}
                strokeWidth={0.5}
                strokeDasharray="0.5 4"
                animate={{ rotate: -360 }}
                transition={{ duration: 9, ease: "linear", repeat: Infinity }}
                style={{ transformOrigin: "0 0" }}
              />

              {/* (2) Four cardinal tick marks — pulse in sequence */}
              {[0, 90, 180, 270].map((deg, i) => (
                <motion.line
                  key={`tick-${deg}`}
                  x1={0}
                  y1={-33}
                  x2={0}
                  y2={-41}
                  stroke={COLOR_BRIGHT}
                  strokeWidth={0.9}
                  strokeLinecap="round"
                  transform={`rotate(${deg})`}
                  animate={{ opacity: [0.25, 1, 0.25] }}
                  transition={{
                    duration: 1.8,
                    ease: "easeInOut",
                    repeat: Infinity,
                    delay: i * 0.22,
                  }}
                />
              ))}

              {/* (3) Two outward ripples — staggered so one is always traveling */}
              {[0, 1.1].map((delay, i) => (
                <motion.circle
                  key={`ripple-${i}`}
                  cx={0}
                  cy={0}
                  r={6}
                  fill="none"
                  stroke={COLOR_BRIGHT}
                  strokeWidth={0.6}
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: [0.6, 4.4], opacity: [0.55, 0] }}
                  transition={{
                    duration: 2.2,
                    ease: "easeOut",
                    repeat: Infinity,
                    delay: 0.4 + delay,
                  }}
                />
              ))}

              {/* (4) Main faint ring */}
              <circle
                cx={0}
                cy={0}
                r={R}
                fill="none"
                stroke={COLOR_FAINT}
                strokeWidth={1.25}
              />

              {/* (5) Rotating gradient arc — covers ~70% of the ring */}
              <motion.circle
                cx={0}
                cy={0}
                r={R}
                fill="none"
                stroke="url(#ipl-arc)"
                strokeWidth={1.75}
                strokeLinecap="round"
                strokeDasharray={`${C * 0.7} ${C}`}
                animate={{ rotate: 360 }}
                transition={{ duration: 1.4, ease: "linear", repeat: Infinity }}
                style={{ transformOrigin: "0 0" }}
              />

              {/* (6) Two tiny orbital dots on an inner radius, opposite sides */}
              <motion.g
                animate={{ rotate: -360 }}
                transition={{ duration: 2.6, ease: "linear", repeat: Infinity }}
                style={{ transformOrigin: "0 0" }}
              >
                <circle cx={18} cy={0} r={1.4} fill={COLOR_BRIGHT} />
                <circle cx={-18} cy={0} r={1.4} fill={COLOR_BRIGHT} />
              </motion.g>

              {/* (7) Tiny breathing core */}
              <motion.g
                animate={{ scale: [1, 1.6, 1], opacity: [1, 0.55, 1] }}
                transition={{ duration: 1.6, ease: "easeInOut", repeat: Infinity }}
                style={{ transformOrigin: "0 0" }}
              >
                <circle cx={0} cy={0} r={2.25} fill={COLOR_BRIGHT} />
              </motion.g>
            </svg>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
