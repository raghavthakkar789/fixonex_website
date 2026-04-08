"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BRAND } from "@/lib/brand";
import { useReducedMotion } from "@/lib/useReducedMotion";

export function InitialLoader() {
  const [visible, setVisible] = useState(true);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      setVisible(false);
      return;
    }
    const t = window.setTimeout(() => setVisible(false), 900);
    return () => clearTimeout(t);
  }, [reduced]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="loader"
          role="presentation"
          aria-hidden
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-white"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          <p className="font-display text-2xl font-bold tracking-tight text-black md:text-3xl">{BRAND.name}</p>
          <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.12em] text-warm">{BRAND.logoMotto}</p>
          <div className="absolute bottom-0 left-0 right-0 h-1 overflow-hidden bg-light">
            <motion.div
              className="h-full bg-primary"
              initial={{ width: "0%" }}
              animate={reduced ? { width: "100%" } : { width: "100%" }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            />
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
