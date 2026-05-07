"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, Sparkles } from "lucide-react";
import { TransitionLink } from "@/components/navigation/TransitionLink";

/**
 * Slim hero-rail shown at the top of a product detail page when the visitor
 * arrived from product guidance on the Service page (URL carries
 * `?from=guidance`). It pairs a primary-tinted pill button with a reassurance
 * line confirming saved selections, and routes back to `/services#product-guidance`.
 *
 * Renders nothing when the param is absent.
 */
export function BackToGuidanceLink() {
  const [fromGuidance, setFromGuidance] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    setFromGuidance(params.get("from") === "guidance");
  }, []);

  if (!fromGuidance) return null;

  return (
    <div className="relative border-b border-zinc-200/60 bg-gradient-to-b from-primary/[0.045] via-primary/[0.015] to-transparent">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-[8%] top-0 h-full w-[35%] rounded-full"
        style={{
          background:
            "radial-gradient(ellipse, rgba(211,47,47,0.06) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="site-container relative z-10 flex flex-wrap items-center gap-x-4 gap-y-2 py-3.5">
        <TransitionLink
          href="/services#product-guidance"
          aria-label="Back to product guidance on the Service page"
          className="group inline-flex items-center gap-2 rounded-full border border-primary/25 bg-white px-3.5 py-1.5 text-[12.5px] font-semibold text-primary shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-all duration-200 hover:-translate-y-[1px] hover:border-primary/45 hover:bg-primary/[0.04] hover:shadow-[0_4px_12px_rgba(211,47,47,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 transition-colors duration-200 group-hover:bg-primary/15">
            <ArrowLeft
              className="h-3 w-3 transition-transform duration-200 group-hover:-translate-x-0.5"
              aria-hidden
            />
          </span>
          <span className="tracking-tight">Back to product guidance</span>
        </TransitionLink>

        <span className="hidden items-center gap-1.5 text-[11.5px] font-medium text-zinc-500 sm:inline-flex">
          <Sparkles className="h-3 w-3 text-primary/60" aria-hidden />
          Your answers are saved — resume from where you left off
        </span>
      </div>
    </div>
  );
}
