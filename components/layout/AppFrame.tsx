"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useTransitionStore } from "@/lib/transitionStore";
import { LenisRafProvider } from "@/components/providers/LenisRafProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { StickyHelpButton } from "@/components/layout/StickyHelpButton";
import { InitialPageLoader } from "@/components/ui/InitialPageLoader";
import { PageLoadProgressBar } from "@/components/ui/PageLoadProgressBar";
import { ScrollProgressIndicator } from "@/components/ui/ScrollProgressIndicator";
import { RouteTransitionLayer } from "@/components/layout/RouteTransitionLayer";
import { PageTransitionWrapper } from "@/components/ui/PageTransitionWrapper";
import { CursorFollower } from "@/components/layout/CursorFollower";
import { useReducedMotion } from "@/lib/useReducedMotion";

function PathColorSync() {
  const pathname = usePathname();
  useEffect(() => {
    useTransitionStore.getState().setPathForColors(pathname);
  }, [pathname]);
  return null;
}

export function AppFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduced = useReducedMotion();

  return (
    <LenisRafProvider>
      <PathColorSync />
      <PageLoadProgressBar />
      <ScrollProgressIndicator />
      <InitialPageLoader />
      <RouteTransitionLayer />
      <CursorFollower />
      <Navbar />
      <main
        id="main-content"
        tabIndex={-1}
        className="relative min-h-[50vh] outline-none [transition:transform_0.45s_cubic-bezier(0.16,1,0.3,1),filter_0.45s_cubic-bezier(0.16,1,0.3,1),opacity_0.45s_cubic-bezier(0.16,1,0.3,1)]"
        style={reduced ? undefined : { willChange: "auto" }}
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[min(380px,48vh)] bg-gradient-to-b from-primary/[0.045] via-sky-400/[0.03] to-transparent mix-blend-multiply"
          aria-hidden
        />
        <PageTransitionWrapper key={pathname} className="relative z-10">
          {children}
        </PageTransitionWrapper>
      </main>
      <Footer />
      <ScrollToTop />
      <StickyHelpButton />
    </LenisRafProvider>
  );
}
