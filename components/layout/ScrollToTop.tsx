"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <Button
      type="button"
      variant="default"
      size="icon"
      className={cn(
        "fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-4 z-40 h-12 w-12 rounded-full border border-terracotta-dark/35 bg-gradient-to-br from-terracotta to-terracotta-dark p-0 text-white shadow-neo-hover sm:left-6",
      )}
      aria-label="Scroll to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <ArrowUp className="h-5 w-5" />
    </Button>
  );
}
