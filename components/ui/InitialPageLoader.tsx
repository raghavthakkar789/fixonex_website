"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BRAND } from "@/lib/brand";
import { easings } from "@/lib/animations";

const SEEN = "fixonex-initial-page-loader";
const ease = easings.easeOutExpo as [number, number, number, number];
const STAGGER = 0.06;
const HOLD_EXTRA_MS = 2000;
const POST_LINE_MS = 800 + 500 + HOLD_EXTRA_MS;

const isProd = process.env.NODE_ENV === "production";

/**
 * Do not use Framer's `useReducedMotion()` here: it snapshots `prefers-reduced-motion`
 * once in `useState` and can stay out of sync with `matchMedia`, which hides the
 * entire loader via `return null` while `shouldSkipLoaderClient()` would still run.
 */
function shouldSkipLoaderClient(): boolean {
  if (typeof window === "undefined") return true;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return true;
  if (!isProd) return false;
  try {
    if (sessionStorage.getItem(SEEN) === "1") return true;
  } catch {
    // treat as not seen; may fail in private mode
  }
  return false;
}

export function InitialPageLoader() {
  const [active, setActive] = useState(false);
  const [line, setLine] = useState(false);
  const w = BRAND.name;
  const n = w.length;
  const textTime = n * STAGGER * 1000 + 200;
  const lineTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const endTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useLayoutEffect(() => {
    if (shouldSkipLoaderClient()) return;
    setActive(true);
  }, []);

  useEffect(() => {
    if (!active) {
      setLine(false);
      if (lineTimeoutRef.current) {
        clearTimeout(lineTimeoutRef.current);
        lineTimeoutRef.current = null;
      }
      if (endTimeoutRef.current) {
        clearTimeout(endTimeoutRef.current);
        endTimeoutRef.current = null;
      }
      return;
    }
    if (lineTimeoutRef.current) clearTimeout(lineTimeoutRef.current);
    lineTimeoutRef.current = setTimeout(() => {
      setLine(true);
      lineTimeoutRef.current = null;
    }, textTime);
    return () => {
      if (lineTimeoutRef.current) {
        clearTimeout(lineTimeoutRef.current);
        lineTimeoutRef.current = null;
      }
    };
  }, [active, textTime]);

  useEffect(() => {
    if (!active || !line) {
      if (endTimeoutRef.current) {
        clearTimeout(endTimeoutRef.current);
        endTimeoutRef.current = null;
      }
      return;
    }
    if (endTimeoutRef.current) clearTimeout(endTimeoutRef.current);
    endTimeoutRef.current = setTimeout(() => {
      if (isProd) {
        try {
          sessionStorage.setItem(SEEN, "1");
        } catch {
          // ignore
        }
      }
      setActive(false);
      setLine(false);
      endTimeoutRef.current = null;
    }, POST_LINE_MS);
    return () => {
      if (endTimeoutRef.current) {
        clearTimeout(endTimeoutRef.current);
        endTimeoutRef.current = null;
      }
    };
  }, [active, line]);

  return (
    <AnimatePresence>
      {active ? (
        <motion.div
          key="ipl"
          role="presentation"
          aria-hidden
          className="fixed inset-0 z-[300] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: "#C1B2A4" }}
          initial={{ opacity: 1, scale: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.5, ease }}
        >
          <div className="flex flex-col items-center">
            <div className="flex" aria-label={w}>
              {w.split("").map((ch, i) => (
                <motion.span
                  key={`${ch}-${i}`}
                  className="font-heading text-type-headline font-semibold tracking-[-0.02em] text-foreground"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: i * STAGGER, ease }}
                >
                  {ch}
                </motion.span>
              ))}
            </div>
            <motion.p
              className="mt-ds-3 text-center font-body text-type-caption font-normal uppercase tracking-[0.2em] text-muted-foreground"
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.45, delay: n * STAGGER + 0.12, ease }}
            >
              {BRAND.logoMotto}
            </motion.p>
          </div>
          <div className="mt-ds-6 h-0.5 w-ds-11 max-w-full overflow-hidden">
            <motion.div
              className="h-full w-full origin-left bg-primary"
              initial={{ scaleX: 0 }}
              animate={line ? { scaleX: 1 } : { scaleX: 0 }}
              transition={line ? { duration: 0.8, ease } : { duration: 0 }}
            />
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
