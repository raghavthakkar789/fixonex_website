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
        className="relative z-[1] min-h-[50vh] bg-transparent outline-none [transition:transform_0.3s_cubic-bezier(0.16,1,0.3,1),filter_0.3s_cubic-bezier(0.16,1,0.3,1),opacity_0.3s_cubic-bezier(0.16,1,0.3,1)]"
        style={reduced ? undefined : { willChange: "auto" }}
      >
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
