"use client";

import { useCallback } from "react";
import { useTransitionStore } from "@/lib/transitionStore";

/**
 * All internal client navigations that should use the page transition
 * (exit → overlay → push → entry). External URLs open normally.
 */
export function useAppNavigate() {
  const startNavigation = useTransitionStore((s) => s.startNavigation);

  return useCallback(
    (href: string) => {
      if (typeof window === "undefined") return Promise.resolve();
      const path = new URL(href, window.location.origin).pathname;
      if (path === window.location.pathname && href.split("#")[0] === window.location.pathname + (window.location.search || "")) {
        if (href.includes("#")) {
          const id = href.split("#")[1];
          document.getElementById(id ?? "")?.scrollIntoView({ behavior: "smooth" });
        }
        return Promise.resolve();
      }
      if (/^(https?:|mailto:|tel:)/.test(href)) {
        window.location.assign(href);
        return Promise.resolve();
      }
      return startNavigation(href.startsWith("/") ? href : `/${href}`);
    },
    [startNavigation],
  );
}

/** Alias matching the spec name. */
export const useNavigate = useAppNavigate;
