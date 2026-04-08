"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { StickyHelpButton } from "@/components/layout/StickyHelpButton";
import { InitialLoader } from "@/components/layout/InitialLoader";
import { useReducedMotion } from "@/lib/useReducedMotion";

export function AppFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduced = useReducedMotion();

  return (
    <>
      <InitialLoader />
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          id="main-content"
          key={pathname}
          tabIndex={-1}
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          exit={reduced ? undefined : { opacity: 0, y: -10 }}
          transition={{ duration: 0.35 }}
        >
          {children}
        </motion.main>
      </AnimatePresence>
      <Footer />
      <ScrollToTop />
      <StickyHelpButton />
    </>
  );
}
