"use client";

import { MessageCircle } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { MagneticElement } from "@/components/ui/MagneticElement";
import { TransitionLink } from "@/components/navigation/TransitionLink";

/** Fake glass tooltip (no backdrop blur paired with motion) — real blur reserved for Navbar. */
export function StickyHelpButton() {
  const reduced = useReducedMotion();

  return (
    <div className="fixed bottom-4 right-4 z-[60] md:bottom-8 md:right-8">
      <div className="group relative flex items-center">
        <span
          className="help-pulse-ring pointer-events-none absolute inset-0 rounded-full border border-chip"
          aria-hidden
        />
        <span
          className="glass-fake pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-glass px-3 py-1.5 font-sans text-[13px] font-medium text-foreground opacity-0 shadow-neo transition-opacity duration-200 group-hover:opacity-100 lg:block"
          role="tooltip"
        >
          Get Help
        </span>
        <MagneticElement maxPx={8}>
          <motion.div
            className="relative"
            whileHover={reduced ? undefined : { scale: 1.03 }}
            transition={{ duration: 0.2, ease: [0.2, 0, 0.2, 1] }}
          >
            <TransitionLink
              href="/contact"
              aria-label="Get Help"
              className={cn(
                "relative inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground shadow-cta transition-colors duration-200 ease-out hover:bg-primary-dark",
                "h-12 w-12 md:h-14 md:w-14",
              )}
            >
              <MessageCircle className="h-6 w-6" strokeWidth={2} aria-hidden />
            </TransitionLink>
          </motion.div>
        </MagneticElement>
      </div>
    </div>
  );
}
