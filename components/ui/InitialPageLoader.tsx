"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Lottie from "lottie-react";
import { usePathname, useRouter } from "next/navigation";
import { easings } from "@/lib/animations";
import loadingDotsBw from "@/data/lottie/loading-dots-bw.json";
import { useTransitionStore, callNavigationResolve } from "@/lib/transitionStore";
import { pathnameKeysEqual, cn } from "@/lib/utils";
import { internalHrefToLocationUrl, toRoutePath } from "@/lib/route-path";

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

/** Pure white shell; Lottie uses black dots only. */
const LOADER_BG = "#ffffff";

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

  /** `usePathname` can lag `window.location` with static export + basePath; poll briefly. */
  const [locPulse, setLocPulse] = useState(0);
  const navWatchdog = useRef<number | null>(null);

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

  useEffect(() => {
    if (source !== "navigation" || phase !== "active") return;
    const id = window.setInterval(() => setLocPulse((x) => x + 1), 200);
    return () => clearInterval(id);
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

    if (navWatchdog.current) window.clearTimeout(navWatchdog.current);
    navWatchdog.current = null;

    if (pushTimer.current) window.clearTimeout(pushTimer.current);
    pushTimer.current = window.setTimeout(() => {
      const state = useTransitionStore.getState();
      const pending = state.pendingHref;
      if (!pending || state.phase !== 1) return;

      router.push(pending);

      navWatchdog.current = window.setTimeout(() => {
        navWatchdog.current = null;
        const st = useTransitionStore.getState();
        if (st.phase !== 1 || !pending) return;
        let destPathForCompare = pending.split("?")[0]!.split("#")[0] || "/";
        try {
          destPathForCompare = new URL(pending, window.location.origin).pathname;
        } catch {
          /* keep split fallback */
        }
        const winRoute = toRoutePath(window.location.pathname);
        if (!pathnameKeysEqual(winRoute, destPathForCompare)) {
          window.location.assign(internalHrefToLocationUrl(pending));
        }
      }, 1200);
    }, delay);

    return () => {
      if (pushTimer.current) window.clearTimeout(pushTimer.current);
      if (navWatchdog.current) {
        window.clearTimeout(navWatchdog.current);
        navWatchdog.current = null;
      }
    };
  }, [storePhase, pendingHref, router]);

  // When the pathname catches up to the navigation target, begin the exit.
  useEffect(() => {
    if (source !== "navigation") return;
    const exp = expectedPath.current;
    if (exp == null || exp === "") return;

    const fromNext = toRoutePath(pathname);
    const fromWindow =
      typeof window !== "undefined" ? toRoutePath(window.location.pathname) : fromNext;
    if (!pathnameKeysEqual(fromNext, exp) && !pathnameKeysEqual(fromWindow, exp)) return;

    if (navWatchdog.current) {
      window.clearTimeout(navWatchdog.current);
      navWatchdog.current = null;
    }

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
  }, [pathname, source, phase, locPulse]);

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
          className={cn(
            "fixed inset-0 z-[300] flex items-center justify-center",
            isExiting && "pointer-events-none",
          )}
          style={{ background: LOADER_BG }}
          initial={{ opacity: 1 }}
          animate={{ opacity: isExiting ? 0 : 1 }}
          transition={{ duration: EXIT_MS / 1000, ease: easeInOut }}
        >
          <motion.div
            className="flex w-full max-w-[min(92vw,520px)] flex-col items-center justify-center px-6"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, ease: easeExpo }}
          >
            <Lottie
              className="aspect-[1920/1080] w-full max-h-[min(40vh,280px)] [&_svg]:!bg-transparent"
              animationData={loadingDotsBw}
              loop
              aria-hidden
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
