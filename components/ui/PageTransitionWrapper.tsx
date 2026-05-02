"use client";

import { type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { easings, transitions, pageTransitionVariants } from "@/lib/animations";

const easeOut = easings.easeOutExpo as [number, number, number, number];
const easeIO = easings.easeInOutQuart as [number, number, number, number];

type Props = { children: ReactNode; className?: string };

export function PageTransitionWrapper({ children, className }: Props) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.55, ease: easeOut }}
    >
      {children}
    </motion.div>
  );
}

export function pageEnterTransition() {
  return {
    initial: { scale: 0.97, filter: "blur(6px)", opacity: 0 } as const,
    animate: { scale: 1, filter: "blur(0px)", opacity: 1 } as const,
    exit: { scale: 0.97, filter: "blur(6px)", opacity: 0 } as const,
    tEnter: { duration: 0.5, ease: easeOut } as const,
    tExit: { duration: 0.35, ease: easeIO } as const,
  };
}

export { easings, transitions };
