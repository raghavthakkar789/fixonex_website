"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { BRAND } from "@/lib/brand";
import { easings } from "@/lib/animations";

let _hasShownLoader = false;

const easeExpo  = easings.easeOutExpo   as [number, number, number, number];
const easeInOut = easings.easeInOutExpo as [number, number, number, number];

const HOLD_MS = 600;

function shouldSkip(): boolean {
  if (typeof window === "undefined") return true;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return true;
  return _hasShownLoader;
}

type Phase = "idle" | "entering" | "holding" | "exiting";

export function InitialPageLoader() {
  const [phase, setPhase]     = useState<Phase>("idle");
  const [barFull, setBarFull] = useState(false);
  const t1 = useRef<ReturnType<typeof setTimeout> | null>(null);
  const t2 = useRef<ReturnType<typeof setTimeout> | null>(null);
  const t3 = useRef<ReturnType<typeof setTimeout> | null>(null);

  useLayoutEffect(() => {
    if (shouldSkip()) return;
    _hasShownLoader = true;
    setPhase("entering");
  }, []);

  useEffect(() => {
    if (phase !== "entering") return;
    t1.current = setTimeout(() => setBarFull(true),    400);
    t2.current = setTimeout(() => setPhase("holding"), 900);
    return () => { clearTimeout(t1.current!); clearTimeout(t2.current!); };
  }, [phase]);

  useEffect(() => {
    if (phase !== "holding") return;
    t3.current = setTimeout(() => setPhase("exiting"), HOLD_MS);
    return () => clearTimeout(t3.current!);
  }, [phase]);

  const isActive  = phase === "entering" || phase === "holding";
  const isExiting = phase === "exiting";

  return (
    <AnimatePresence mode="wait">
      {(isActive || isExiting) && (
        <motion.div
          key="ipl"
          role="presentation"
          aria-hidden
          className="fixed inset-0 z-[300] overflow-hidden"
        >
          {/* Split-door exit — top half up, bottom half down */}
          <motion.div
            className="absolute inset-x-0 top-0 h-1/2"
            style={{ background: "linear-gradient(180deg,#ffffff 0%,#fdfcfb 100%)" }}
            animate={isExiting ? { y: "-100%" } : { y: 0 }}
            transition={{ duration: 0.7, ease: easeInOut, delay: 0.08 }}
          />
          <motion.div
            className="absolute inset-x-0 bottom-0 h-1/2"
            style={{ background: "linear-gradient(0deg,#ffffff 0%,#fdfcfb 100%)" }}
            animate={isExiting ? { y: "100%" } : { y: 0 }}
            transition={{ duration: 0.7, ease: easeInOut, delay: 0.08 }}
          />

          {/* Soft red glow behind logo */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 55% 45% at 50% 50%, rgba(211,47,47,0.07) 0%, transparent 70%)",
            }}
          />

          {/* Top red stripe */}
          <motion.div
            className="absolute inset-x-0 top-0 h-[3px]"
            style={{ background: "linear-gradient(90deg,transparent,#D32F2F 40%,#ea580c 60%,transparent)" }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, ease: easeExpo, delay: 0.05 }}
          />

          {/* Corner brackets */}
          {(["top-5 left-5 border-t-2 border-l-2",
             "top-5 right-5 border-t-2 border-r-2",
             "bottom-5 left-5 border-b-2 border-l-2",
             "bottom-5 right-5 border-b-2 border-r-2"] as const
          ).map((pos, i) => (
            <motion.div
              key={pos}
              className={`absolute h-6 w-6 ${pos} border-zinc-200`}
              initial={{ opacity: 0, scale: 0.3 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.05, ease: easeExpo }}
            />
          ))}

          {/* Centre — logo only */}
          <motion.div
            className="absolute inset-0 z-10 flex flex-col items-center justify-center"
            animate={isExiting ? { opacity: 0, scale: 0.94 } : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.28, ease: easeExpo }}
          >
            {/* Logo — scale + fade in */}
            <motion.div
              initial={{ opacity: 0, scale: 0.82, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.65, ease: easeExpo, delay: 0.1 }}
            >
              <Image
                src="/images/misc/logo.png"
                alt={BRAND.name}
                width={220}
                height={68}
                priority
                className="h-16 w-auto object-contain"
              />
            </motion.div>

            {/* Progress bar */}
            <div className="mt-10 h-[2px] w-32 overflow-hidden rounded-full bg-zinc-100">
              <motion.div
                className="h-full origin-left rounded-full"
                style={{ background: "linear-gradient(90deg,#D32F2F,#ea580c)" }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: barFull ? 1 : 0 }}
                transition={barFull ? { duration: 0.55, ease: easeExpo } : { duration: 0 }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
