"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { StickyHelpButton } from "@/components/layout/StickyHelpButton";
import { InitialLoader } from "@/components/layout/InitialLoader";
import { useReducedMotion } from "@/lib/useReducedMotion";

export function AppFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progressX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.2 });

  return (
    <>
      <motion.div className="fixed left-0 top-0 z-[100] h-0.5 w-full origin-left bg-primary" style={{ scaleX: progressX }} aria-hidden />
      <InitialLoader />
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          id="main-content"
          key={pathname}
          tabIndex={-1}
          initial={reduced ? false : { opacity: 0, scale: 0.97, filter: "blur(8px)" }}
          animate={reduced ? undefined : { opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={reduced ? undefined : { opacity: 0, scale: 0.97, filter: "blur(8px)" }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
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
