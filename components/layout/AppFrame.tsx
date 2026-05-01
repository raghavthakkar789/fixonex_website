"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useTransitionStore } from "@/lib/transitionStore";
import { LenisRafProvider } from "@/components/providers/LenisRafProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { StickyHelpButton } from "@/components/layout/StickyHelpButton";
import { PageLoadProgressBar } from "@/components/ui/PageLoadProgressBar";
import { ScrollProgressIndicator } from "@/components/ui/ScrollProgressIndicator";
import { RouteTransitionLayer } from "@/components/layout/RouteTransitionLayer";
import { PageTransitionWrapper } from "@/components/ui/PageTransitionWrapper";
import { TransitionLink } from "@/components/navigation/TransitionLink";

function PathColorSync() {
  const pathname = usePathname();
  useEffect(() => {
    useTransitionStore.getState().setPathForColors(pathname);
  }, [pathname]);
  return null;
}

function BreadcrumbTrail({ pathname }: { pathname: string }) {
  if (pathname === "/") return null;
  const clean = pathname.split("?")[0]?.split("#")[0] ?? pathname;
  const parts = clean.split("/").filter(Boolean);
  if (parts.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="border-b border-zinc-200/70 bg-white/90 backdrop-blur-sm">
      <div className="site-container flex flex-wrap items-center gap-2 py-2.5 text-xs font-medium text-zinc-600">
        <TransitionLink href="/" className="transition-colors hover:text-zinc-900">
          Home
        </TransitionLink>
        {parts.map((part, idx) => {
          const href = `/${parts.slice(0, idx + 1).join("/")}`;
          const label = decodeURIComponent(part).replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
          const isLast = idx === parts.length - 1;
          return (
            <span key={href} className="inline-flex items-center gap-2">
              <span className="text-zinc-400" aria-hidden>
                /
              </span>
              {isLast ? (
                <span className="text-zinc-900">{label}</span>
              ) : (
                <TransitionLink href={href} className="transition-colors hover:text-zinc-900">
                  {label}
                </TransitionLink>
              )}
            </span>
          );
        })}
      </div>
    </nav>
  );
}

export function AppFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <LenisRafProvider>
      <PathColorSync />
      <PageLoadProgressBar />
      <ScrollProgressIndicator />
      <RouteTransitionLayer />
      <Navbar />
      <BreadcrumbTrail pathname={pathname} />
      <main
        id="main-content"
        tabIndex={-1}
        className="relative z-[1] min-h-[50vh] bg-background outline-none [transition:transform_260ms_var(--ease-expo)]"
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
