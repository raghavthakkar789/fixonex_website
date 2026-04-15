"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { cn } from "@/lib/utils";

export function StickyHelpButton() {
  const reduced = useReducedMotion();

  return (
    <div className="fixed bottom-4 right-4 z-[60] md:bottom-8 md:right-8">
      <div className="group relative flex items-center">
        <span
          className="pointer-events-none absolute -inset-2 rounded-full border-2 border-warm/70 opacity-0 animate-help-pulse motion-reduce:animate-none md:-inset-2.5"
          aria-hidden
        />
        <span
          className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-md bg-white px-3 py-1.5 text-[13px] font-medium text-[#111111] opacity-0 shadow-[0_10px_30px_rgba(0,0,0,0.12)] transition-all duration-200 translate-x-2 group-hover:translate-x-0 group-hover:opacity-100 lg:block"
          role="tooltip"
        >
          Get Help
        </span>
        <motion.div whileHover={reduced ? undefined : { scale: 1.04 }} whileTap={reduced ? undefined : { scale: 0.97 }}>
          <Link
            href="/contact"
            aria-label="Get Help"
            className={cn(
              "relative inline-flex items-center justify-center rounded-full bg-primary text-white shadow-red transition-colors hover:bg-primary-dark",
              "h-12 w-12 md:h-14 md:w-14",
            )}
          >
            <MessageCircle className="h-6 w-6" strokeWidth={2} aria-hidden />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
