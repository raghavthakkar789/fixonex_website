"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { BRAND } from "@/lib/brand";
import { mainNav } from "@/data/navigation";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { TransitionLink } from "@/components/navigation/TransitionLink";

const easeExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

function activeFor(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

/* Four links shown in the center pill */
const pillLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/why-fixonex", label: "Why FIXONEX" },
  { href: "/support", label: "Support" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 4);
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? Math.min(y / total, 1) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-[100] transition-all duration-400",
        scrolled
          ? "border-b border-zinc-200/50 bg-white/90 shadow-[0_2px_20px_rgba(0,0,0,0.05)] backdrop-blur-xl"
          : "border-b border-transparent bg-white/70 backdrop-blur-md",
      )}
    >
      {/* Top red accent line — appears on scroll */}
      <motion.div
        className="absolute left-0 right-0 top-0 h-[2px] pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent 8%, #D32F2F 45%, #ea580c 55%, transparent 92%)" }}
        animate={{ opacity: scrolled ? 1 : 0 }}
        transition={{ duration: 0.35, ease: easeExpo }}
      />

      <div className="site-container flex h-16 items-center gap-6 max-md:h-14">

        {/* ── Logo ── */}
        <TransitionLink
          href="/"
          className="flex shrink-0 items-center gap-2.5"
          aria-label={`${BRAND.name} home`}
        >
          <span className="relative h-8 w-[110px] overflow-hidden md:h-9 md:w-[120px]">
            <ImageWithFallback
              src="/images/misc/logo.png"
              alt={`${BRAND.name} logo`}
              fill
              sizes="120px"
              className="object-contain object-left"
              reveal="none"
            />
          </span>
        </TransitionLink>

        {/* ── Center pill nav ── */}
        <nav
          className="mx-auto hidden lg:flex"
          aria-label="Primary"
        >
          <div className="flex items-center gap-1 rounded-full border border-zinc-200/60 bg-zinc-50/70 px-1.5 py-1.5 shadow-sm backdrop-blur-sm">
            {pillLinks.map((item) => {
              const on = activeFor(pathname, item.href);
              return (
                <TransitionLink
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-200",
                    on ? "text-zinc-950" : "text-zinc-500 hover:text-zinc-800",
                  )}
                >
                  {on && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-[1] rounded-full bg-white shadow-sm ring-1 ring-zinc-200/70"
                      transition={{ type: "spring", stiffness: 420, damping: 38 }}
                    />
                  )}
                  {item.label}
                </TransitionLink>
              );
            })}
          </div>
        </nav>

        {/* ── Right side ── */}
        <div className="ml-auto flex items-center gap-2">
          {/* Ghost link for desktop */}
          <TransitionLink
            href="/contact"
            className="hidden text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors duration-200 lg:block"
          >
            Contact
          </TransitionLink>

          {/* Primary CTA */}
          <motion.div
            whileHover={reduced ? undefined : { scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.18 }}
          >
            <TransitionLink
              href="/partner"
              className="rounded-full bg-zinc-900 px-5 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary"
            >
              Partnership
            </TransitionLink>
          </motion.div>

          {/* Hamburger */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="ml-1 inline-flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200/70 bg-white text-zinc-700 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <motion.span
              className="flex h-full w-full flex-col items-center justify-center gap-[5px]"
            >
              <motion.span
                animate={open ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.28, ease: easeExpo }}
                className="block h-[1.5px] w-4 rounded-full bg-current"
              />
              <motion.span
                animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.18 }}
                className="block h-[1.5px] w-4 rounded-full bg-current"
              />
              <motion.span
                animate={open ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.28, ease: easeExpo }}
                className="block h-[1.5px] w-4 rounded-full bg-current"
              />
            </motion.span>
          </button>
        </div>
      </div>

      {/* Scroll progress bar */}
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] origin-left pointer-events-none"
        style={{
          scaleX: scrollProgress,
          background: "linear-gradient(90deg, #D32F2F, #ea580c)",
        }}
      />

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            key="mob"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.32, ease: easeExpo }}
            className="overflow-hidden border-t border-zinc-100 bg-white/98 backdrop-blur-xl lg:hidden"
          >
            <div className="site-container py-4">
              <ul className="space-y-0.5">
                {[{ href: "/", label: "Home" }, ...mainNav].map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.28, ease: easeExpo }}
                  >
                    <TransitionLink
                      href={item.href}
                      className={cn(
                        "flex items-center justify-between rounded-xl px-3 py-2.5 text-[15px] font-medium transition-colors",
                        activeFor(pathname, item.href)
                          ? "bg-zinc-100 text-zinc-950"
                          : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900",
                      )}
                    >
                      {item.label}
                      {activeFor(pathname, item.href) && (
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      )}
                    </TransitionLink>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                className="mt-3 border-t border-zinc-100 pt-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.28 }}
              >
                <TransitionLink
                  href="/partner"
                  className="block w-full rounded-xl bg-zinc-900 py-3 text-center text-sm font-semibold text-white hover:bg-primary transition-colors"
                >
                  Partnership
                </TransitionLink>
              </motion.div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
