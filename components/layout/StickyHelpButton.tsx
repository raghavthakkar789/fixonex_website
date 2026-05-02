"use client";

import { MessageCircle } from "lucide-react";
import { WHATSAPP_HREF } from "@/data/social";
import { TransitionLink } from "@/components/navigation/TransitionLink";

export function StickyHelpButton() {
  return (
    <div className="fixed bottom-5 right-5 z-[90]">
      <TransitionLink
        href={WHATSAPP_HREF}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-full border border-primary bg-primary px-4 py-2 text-sm font-semibold text-white shadow-md transition-transform hover:-translate-y-0.5 hover:bg-primary-hover"
      >
        <MessageCircle className="h-4 w-4" aria-hidden />
        Help
      </TransitionLink>
    </div>
  );
}
