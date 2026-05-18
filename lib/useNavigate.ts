"use client";

import { useCallback } from "react";
import { useTransitionStore } from "@/lib/transitionStore";
import { pathnameKeysEqual } from "@/lib/utils";
import { toRoutePath } from "@/lib/route-path";

/**
 * All internal client navigations that should use the page transition
 * (exit → overlay → push → entry). External URLs open normally.
 */
export function useAppNavigate() {
  const startNavigation = useTransitionStore((s) => s.startNavigation);

  return useCallback(
    (href: string) => {
      if (typeof window === "undefined") return Promise.resolve();

      let dest: URL;
      try {
        dest = new URL(href, window.location.origin);
      } catch {
        return Promise.resolve();
      }

      const hereSearch = window.location.search || "";
      const hereRoute = toRoutePath(window.location.pathname);
      const samePathAndSearch =
        pathnameKeysEqual(dest.pathname, hereRoute) && dest.search === hereSearch;

      if (samePathAndSearch) {
        if (dest.hash) {
          const id = dest.hash.slice(1);
          document.getElementById(id ?? "")?.scrollIntoView({ behavior: "smooth" });
        }
        return Promise.resolve();
      }

      if (/^(https?:|mailto:|tel:)/.test(href)) {
        window.location.assign(href);
        return Promise.resolve();
      }

      const pathWithQsHash = `${dest.pathname}${dest.search}${dest.hash}`;
      const internal =
        pathWithQsHash.startsWith("/") ? pathWithQsHash : `/${pathWithQsHash}`;
      return startNavigation(internal);
    },
    [startNavigation],
  );
}

/** Alias matching the spec name. */
export const useNavigate = useAppNavigate;
