"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BRAND } from "@/lib/brand";
import { easings } from "@/lib/animations";

const SEEN = "fixonex-initial-page-loader";
const easeExpo = easings.easeOutExpo as [number, number, number, number];
const easeInOut = easings.easeInOutExpo as [number, number, number, number];

const LETTER_STAGGER = 0.055;
const HOLD_EXTRA_MS = 1600;
const isProd = process.env.NODE_ENV === "production";

function shouldSkipLoaderClient(): boolean {
  if (typeof window === "undefined") return true;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return true;
  if (!isProd) return false;
  try {
    if (sessionStorage.getItem(SEEN) === "1") return true;
  } catch { /* private mode */ }
  return false;
}

export function InitialPageLoader() {
  const [phase, setPhase] = useState<"idle" | "entering" | "holding" | "exiting">("idle");
  const [progressComplete, setProgressComplete] = useState(false);
  const w = BRAND.name;
  const n = w.length;
  const lettersTime = n * LETTER_STAGGER * 1000 + 300;
  const t1 = useRef<ReturnType<typeof setTimeout> | null>(null);
  const t2 = useRef<ReturnType<typeof setTimeout> | null>(null);
  const t3 = useRef<ReturnType<typeof setTimeout> | null>(null);

  useLayoutEffect(() => {
    if (shouldSkipLoaderClient()) return;
    setPhase("entering");
  }, []);

  useEffect(() => {
    if (phase !== "entering") return;
    t1.current = setTimeout(() => {
      setProgressComplete(true);
    }, lettersTime + 200);
    t2.current = setTimeout(() => {
      setPhase("holding");
    }, lettersTime + 600);
    return () => {
      if (t1.current) clearTimeout(t1.current);
      if (t2.current) clearTimeout(t2.current);
    };
  }, [phase, lettersTime]);

  useEffect(() => {
    if (phase !== "holding") return;
    t3.current = setTimeout(() => {
      if (isProd) {
        try { sessionStorage.setItem(SEEN, "1"); } catch { /* ignore */ }
      }
      setPhase("exiting");
    }, HOLD_EXTRA_MS);
    return () => {
      if (t3.current) clearTimeout(t3.current);
    };
  }, [phase]);

  const isActive = phase === "entering" || phase === "holding";
  const isExiting = phase === "exiting";

  return (
    <AnimatePresence mode="wait">
      {(isActive || isExiting) ? (
        <motion.div
          key="ipl"
          role="presentation"
          aria-hidden
          className="fixed inset-0 z-[300] overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 1 }}
        >
          {/* Dark background panel that slides up on exit */}
          <motion.div
            className="absolute inset-0"
            style={{ background: "linear-gradient(160deg, #050508 0%, #0d0d14 40%, #12060a 100%)" }}
            initial={{ y: 0 }}
            animate={isExiting ? { y: "-100%" } : { y: 0 }}
            transition={{ duration: 0.85, ease: easeInOut, delay: isExiting ? 0 : 0 }}
          />

          {/* Animated background orbs */}
          {!isExiting && (
            <>
              <div
                className="absolute -left-[15%] top-[-20%] h-[60%] w-[60%] rounded-full opacity-30"
                style={{
                  background: "radial-gradient(circle, rgba(211,47,47,0.7) 0%, transparent 70%)",
                  filter: "blur(80px)",
                  animation: "orbDrift 18s ease-in-out infinite",
                }}
              />
              <div
                className="absolute -right-[10%] bottom-[-15%] h-[50%] w-[50%] rounded-full opacity-20"
                style={{
                  background: "radial-gradient(circle, rgba(234,88,12,0.6) 0%, transparent 70%)",
                  filter: "blur(100px)",
                  animation: "orbDrift 24s ease-in-out infinite reverse",
                }}
              />
              <div
                className="absolute left-1/2 top-1/2 h-[30%] w-[40%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-10"
                style={{
                  background: "radial-gradient(circle, rgba(13,148,136,0.8) 0%, transparent 70%)",
                  filter: "blur(60px)",
                }}
              />
            </>
          )}

          {/* Subtle grain texture */}
          <div
            className="grain-noise absolute inset-0 opacity-50 mix-blend-overlay pointer-events-none"
            aria-hidden
          />

          {/* Center content */}
          <motion.div
            className="relative z-10 flex h-full flex-col items-center justify-center"
            animate={isExiting ? { y: -40, opacity: 0 } : { y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: easeExpo, delay: isExiting ? 0 : 0 }}
          >
            {/* Brand name — letters slide up from clip */}
            <div className="flex items-end gap-0" aria-label={w}>
              {w.split("").map((ch, i) => (
                <div key={`${ch}-${i}`} className="overflow-hidden">
                  <motion.span
                    className="block font-display font-bold tracking-[-0.04em] text-white"
                    style={{ fontSize: "clamp(2.8rem, 8vw, 5rem)", lineHeight: 1 }}
                    initial={{ y: "110%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    transition={{
                      duration: 0.65,
                      delay: 0.1 + i * LETTER_STAGGER,
                      ease: easeExpo,
                    }}
                  >
                    {ch}
                  </motion.span>
                </div>
              ))}
            </div>

            {/* Tagline */}
            <motion.p
              className="mt-4 text-center font-body text-[0.625rem] font-semibold uppercase tracking-[0.35em] text-white/45"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: n * LETTER_STAGGER + 0.3, ease: easeExpo }}
            >
              {BRAND.logoMotto}
            </motion.p>

            {/* Progress bar */}
            <div className="mt-12 h-[1.5px] w-48 max-w-[200px] overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full origin-left rounded-full"
                style={{ background: "linear-gradient(90deg, #D32F2F, #ea580c)" }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: progressComplete ? 1 : 0 }}
                transition={
                  progressComplete
                    ? { duration: 0.7, ease: easeExpo }
                    : { duration: 0 }
                }
              />
            </div>
          </motion.div>

          {/* Top decorative line */}
          <motion.div
            className="absolute left-[6%] right-[6%] top-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent, rgba(211,47,47,0.7) 50%, transparent)" }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: easeExpo }}
          />

          {/* Bottom decorative line */}
          <motion.div
            className="absolute bottom-0 left-[6%] right-[6%] h-px"
            style={{ background: "linear-gradient(90deg, transparent, rgba(234,88,12,0.4) 50%, transparent)" }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: easeExpo }}
          />

          {/* Corner marks */}
          {[
            "top-6 left-6 border-t border-l",
            "top-6 right-6 border-t border-r",
            "bottom-6 left-6 border-b border-l",
            "bottom-6 right-6 border-b border-r",
          ].map((pos, i) => (
            <motion.div
              key={pos}
              className={`absolute h-5 w-5 ${pos} border-white/20`}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.4 + i * 0.06, ease: easeExpo }}
            />
          ))}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
