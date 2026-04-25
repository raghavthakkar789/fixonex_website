"use client";

import { MessageCircle } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { transitions } from "@/lib/animations";
import { MagneticElement } from "@/components/ui/MagneticElement";
import { TransitionLink } from "@/components/navigation/TransitionLink";

export function StickyHelpButton() {
  const reduced = useReducedMotion();

  return (
    <div className="fixed bottom-4 right-4 z-[60] md:bottom-8 md:right-8">
      <div className="group relative flex items-center">
        <span
          className="help-pulse-ring pointer-events-none absolute inset-0 rounded-full border border-warm"
          aria-hidden
        />
        <span
          className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-md bg-white px-3 py-1.5 text-[13px] font-medium text-[#111111] opacity-0 shadow-[0_10px_30px_rgba(0,0,0,0.12)] transition-all duration-200 translate-x-2 group-hover:translate-x-0 group-hover:opacity-100 lg:block"
          role="tooltip"
        >
          Get Help
        </span>
        <MagneticElement maxPx={8}>
          <motion.div
            className="relative"
            whileHover={reduced ? undefined : { scale: 1.1 }}
            transition={transitions.gentleSpring}
          >
            <TransitionLink
              href="/contact"
              aria-label="Get Help"
              className={cn(
                "relative inline-flex items-center justify-center rounded-full bg-primary text-white shadow-red transition-colors duration-200 ease-out hover:bg-primary-dark",
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
