"use client";

import { MessageCircle, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { WHATSAPP_HREF } from "@/data/social";
import { MagneticElement } from "@/components/ui/MagneticElement";
import { TransitionLink } from "@/components/navigation/TransitionLink";

/** Floating action stack — product helper + WhatsApp launcher */
export function StickyHelpButton() {
  const reduced = useReducedMotion();

  return (
    <div className="fixed bottom-4 right-4 z-[110] flex flex-col items-end gap-3 md:bottom-8 md:right-8">

      {/* ── Product helper button ── */}
      <div className="group relative flex items-center">
        <span className="glass-panel pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-2xl border border-zinc-200/95 bg-white/85 px-3 py-1.5 font-sans text-[13px] font-medium text-zinc-900 shadow-md opacity-0 transition-opacity duration-200 group-hover:opacity-100 lg:block">
          Choose the right product
        </span>
        <MagneticElement maxPx={6}>
          <motion.div
            className="relative"
            whileHover={reduced ? undefined : { scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            <TransitionLink
              href="/services#product-guidance"
              aria-label="Open product guidance"
              className={cn(
                "fx-float relative inline-flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900 text-white shadow-[0_4px_20px_rgba(0,0,0,0.25)] transition-colors hover:bg-primary md:h-[3rem] md:w-[3rem]",
              )}
            >
              <Sparkles className="h-5 w-5" strokeWidth={2} aria-hidden />
            </TransitionLink>
          </motion.div>
        </MagneticElement>
      </div>

      {/* ── WhatsApp button ── */}
      <div className="group relative flex items-center">
        <span className="glass-panel pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-2xl border border-zinc-200/95 bg-white/85 px-3 py-1.5 font-sans text-[13px] font-medium text-zinc-900 shadow-md opacity-0 transition-opacity duration-200 group-hover:opacity-100 lg:block">
          WhatsApp FIXONEX
        </span>
        <MagneticElement maxPx={6}>
          <motion.div className="relative" whileHover={reduced ? undefined : { scale: 1.04 }} whileTap={{ scale: 0.96 }}>
            <TransitionLink
              href={WHATSAPP_HREF}
              prefetch={false}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open WhatsApp chat with FIXONEX"
              className={cn("fx-float relative inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-cta transition-colors hover:bg-primary-dark md:h-[3.625rem] md:w-[3.625rem]")}
            >
              <MessageCircle className="h-6 w-6 md:h-7 md:w-7" strokeWidth={2} aria-hidden />
            </TransitionLink>
          </motion.div>
        </MagneticElement>
      </div>

    </div>
  );
}
