"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import { BRAND } from "@/lib/brand";
import { easings } from "@/lib/animations";

const SEEN = "fixonex-initial-page-loader";
const ease = easings.easeOutExpo as [number, number, number, number];
const STAGGER = 0.06;
const HOLD_EXTRA_MS = 2000;
const POST_LINE_MS = 800 + 500 + HOLD_EXTRA_MS;

function shouldSkipLoaderClient(): boolean {
  if (typeof window === "undefined") return true;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return true;
  try {
    if (sessionStorage.getItem(SEEN) === "1") return true;
  } catch {
    // treat as not seen; may fail to persist at end in private mode
  }
  return false;
}

export function InitialPageLoader() {
  const [active, setActive] = useState(false);
  const [line, setLine] = useState(false);
  const fmReduced = useReducedMotion();
  const w = BRAND.name;
  const n = w.length;
  const textTime = n * STAGGER * 1000 + 200;
  const lineTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const endTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useLayoutEffect(() => {
    if (shouldSkipLoaderClient() || fmReduced) return;
    setActive(true);
  }, [fmReduced]);

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
      try {
        sessionStorage.setItem(SEEN, "1");
      } catch {
        // ignore
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

  useEffect(() => {
    if (fmReduced) {
      setActive(false);
      setLine(false);
    }
  }, [fmReduced]);

  if (fmReduced) {
    return null;
  }

  return (
    <AnimatePresence>
      {active ? (
        <motion.div
          key="ipl"
          role="presentation"
          aria-hidden
          className="fixed inset-0 z-[210] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: "#111111" }}
          initial={{ opacity: 1, scale: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.5, ease }}
        >
          <div className="flex flex-col items-center">
            <div className="flex" aria-label={w}>
              {w.split("").map((ch, i) => (
                <motion.span
                  key={`${ch}-${i}`}
                  className="font-['var(--font-playfair)',serif] text-[48px] font-medium text-[#C1B2A4]"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: i * STAGGER, ease }}
                >
                  {ch}
                </motion.span>
              ))}
            </div>
            <motion.p
              className="mt-3 text-center font-body text-[13px] font-medium uppercase tracking-[0.2em] text-[#C1B2A4]/85"
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.45, delay: n * STAGGER + 0.12, ease }}
            >
              {BRAND.logoMotto}
            </motion.p>
          </div>
          <div className="mt-6 h-0.5 w-[200px] overflow-hidden">
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
