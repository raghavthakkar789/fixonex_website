"use client";

import { TransitionLink } from "@/components/navigation/TransitionLink";
import { MessageCircleQuestion } from "lucide-react";

/** Global sticky CTA — bottom-right; links to Contact (see ScrollToTop for bottom-left). */
export function StickyGetHelp() {
  return (
    <TransitionLink
      href="/contact"
      aria-label="Get help — contact FIXONEX"
      className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-[60] inline-flex items-center gap-2 rounded-md bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-canvas sm:right-6"
    >
      <MessageCircleQuestion className="h-5 w-5 shrink-0" aria-hidden />
      <span className="max-[380px]:sr-only">Get Help</span>
    </TransitionLink>
  );
}
