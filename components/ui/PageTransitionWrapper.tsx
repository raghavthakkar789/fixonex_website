"use client";

import { type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { easings, transitions, pageTransitionVariants } from "@/lib/animations";

const easeOut = easings.easeOutExpo as [number, number, number, number];
const easeIO = easings.easeInOutQuart as [number, number, number, number];

type Props = { children: ReactNode; className?: string };

/**
 * Per-page content wrapper. Entry after navigation; parent handles exit/overlay.
 */
export function PageTransitionWrapper({ children, className }: Props) {
  const reduced = useReducedMotion();
  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={pageTransitionVariants}
      initial="initial"
      animate="animate"
      transition={{ duration: 0.45, ease: easeOut }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Renders the exit transition via parent — this variant is the entry.
 */
export function pageEnterTransition() {
  return {
    initial: { scale: 0.96, filter: "blur(6px)", opacity: 0 } as const,
    animate: { scale: 1, filter: "blur(0px)", opacity: 1 } as const,
    exit: { scale: 0.96, filter: "blur(6px)", opacity: 0 } as const,
    tEnter: { duration: 0.45, ease: easeOut } as const,
    tExit: { duration: 0.35, ease: easeIO } as const,
  };
}

export { easings, transitions };
