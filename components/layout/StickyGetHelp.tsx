"use client";

import Link from "next/link";
import { MessageCircleQuestion } from "lucide-react";

/** Global sticky CTA — always links to Contact (kept left so it does not sit under the scroll-to-top control). */
export function StickyGetHelp() {
  return (
    <Link
      href="/contact"
      aria-label="Get help — contact and consultation"
      className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-4 z-[60] inline-flex items-center gap-2 rounded-sm bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:left-6"
    >
      <MessageCircleQuestion className="h-5 w-5 shrink-0" aria-hidden />
      <span className="max-[380px]:sr-only">Get Help</span>
    </Link>
  );
}
