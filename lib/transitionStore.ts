import { create } from "zustand";

/** Route overlays — warm shells aligned with anchor `#C1B2A4`, band-alt, and cream surfaces. */
/** Route overlays — light canvas + brand wordmark; aligns with page shells. */
const routeOverlayColors: Record<string, { bg: string; wordmark: string }> = {
  "/products": { bg: "#F6F5F3", wordmark: "#D32F2F" },
  "/about": { bg: "#EAE6DE", wordmark: "#2C2622" },
  "/contact": { bg: "#FAFAF9", wordmark: "#D32F2F" },
  "/partner": { bg: "#F3F2EF", wordmark: "#D32F2F" },
  "/support": { bg: "#FFFFFF", wordmark: "#2C2622" },
};

function pathOnlyFromHref(href: string) {
  try {
    return new URL(href, "http://localhost").pathname;
  } catch {
    return href.split("?")[0]!.split("#")[0] || "/";
  }
}

function colorsForPath(path: string) {
  const p = pathOnlyFromHref(path) || path;
  if (p === "/") return { bg: "#FAFAF9", wordmark: "#2C2622" };
  const k = Object.keys(routeOverlayColors).find((key) => p === key || p.startsWith(`${key}/`));
  if (k) return routeOverlayColors[k]!;
  return { bg: "#F3F2EF", wordmark: "#2C2622" };
}

type State = {
  /** Target href when a transition is in flight (internal routes only) */
  pendingHref: string | null;
  /** Overlay + wordmark (synced to destination route) */
  overlay: { bg: string; wordmark: string } | null;
  /** 0: idle, 1: phase A — exit + cover, 2: after push, slide overlay up */
  phase: 0 | 1 | 2;
  loadProgress: number;
  hasNavStart: boolean;
  setPathForColors: (path: string) => void;
  startNavigation: (href: string) => Promise<void>;
  resetAfterNavigation: () => void;
  setLoadProgress: (v: number) => void;
  setNavStart: (v: boolean) => void;
};

let resolveOne: (() => void) | null = null;

export const useTransitionStore = create<State>((set, get) => ({
  pendingHref: null,
  overlay: null,
  phase: 0,
  loadProgress: 0,
  hasNavStart: false,

  setPathForColors: (path) => {
    if (get().phase === 0) set({ overlay: colorsForPath(path) });
  },

  startNavigation: (href) =>
    new Promise((resolve) => {
      if (typeof window === "undefined") {
        resolve();
        return;
      }
      if (get().phase !== 0) {
        resolve();
        return;
      }
      get().setPathForColors(href);
      resolveOne = () => {
        resolve();
        resolveOne = null;
      };
      set({ pendingHref: href, phase: 1, hasNavStart: true, loadProgress: 0.7, overlay: colorsForPath(pathOnlyFromHref(href)) });
    }),

  resetAfterNavigation: () => {
    if (typeof window === "undefined") return;
    set({ pendingHref: null, phase: 0, loadProgress: 1, hasNavStart: false });
    window.setTimeout(() => {
      set((s) => (s.loadProgress === 1 ? { loadProgress: 0 } : {}));
    }, 300);
  },

  setLoadProgress: (v) => set({ loadProgress: v }),
  setNavStart: (v) => set({ hasNavStart: v }),
}));

export function callNavigationResolve() {
  resolveOne?.();
}
