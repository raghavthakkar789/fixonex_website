"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { BRAND } from "@/lib/brand";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { TransitionLink } from "@/components/navigation/TransitionLink";
import { MagneticElement } from "@/components/ui/MagneticElement";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About FIXONEX" },
  { href: "/why-fixonex", label: "Why FIXONEX" },
  { href: "/support", label: "Support" },
  { href: "/contact", label: "Contact" },
  { href: "/partner", label: "Partner with FIXONEX" },
] as const;

const isActivePath = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-50">
      <div
        className={cn(
          "w-full border-b border-border/70 bg-[rgba(255,252,249,0.78)] backdrop-blur-[18px] transition-[box-shadow,backdrop-filter,background-color] duration-300",
          scrolled &&
            "border-border/90 bg-[rgba(255,252,249,0.92)] shadow-[0_2px_22px_rgba(0,0,0,0.07),0_0_48px_rgba(255,94,108,0.06),0_0_64px_rgba(56,189,248,0.04)] backdrop-blur-[24px]",
        )}
      >
        <div className="site-container flex h-[68px] items-center gap-4 max-md:h-[56px]">
          <MagneticElement maxPx={6} className="shrink-0">
            <TransitionLink
              href="/"
              className="group flex items-center gap-3 leading-none"
              aria-label={`${BRAND.name} home`}
            >
              <div className="relative h-10 w-[132px] overflow-hidden">
                <ImageWithFallback
                  src="/images/misc/logo.png"
                  alt={`${BRAND.name} logo`}
                  fill
                  sizes="132px"
                  className="object-contain object-left"
                  reveal="none"
                />
              </div>
              <div className="hidden flex-col sm:flex">
                <span className="logo-shimmer font-display text-[22px] font-bold">{BRAND.name}</span>
                <span className="text-[10px] tracking-wide text-dark">{BRAND.logoMotto}</span>
              </div>
            </TransitionLink>
          </MagneticElement>

          <nav className="mx-2 hidden min-w-0 flex-1 items-center justify-center gap-5 lg:flex xl:gap-7">
            {navItems.map((item) => {
              const active = isActivePath(pathname, item.href);
              return (
                <TransitionLink
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "nav-link-underline relative whitespace-nowrap py-1 text-[14px] font-medium text-[#3a3a3a] transition-colors duration-300",
                    !active && "hover:text-[#111111]",
                    active && "nlu-active text-[#111111]",
                  )}
                >
                  {item.label}
                </TransitionLink>
              );
            })}
          </nav>

          <motion.button
            type="button"
            suppressHydrationWarning
            onClick={() => setOpen((v) => !v)}
            className="ml-auto inline-flex h-10 w-10 flex-col items-center justify-center gap-1.5 text-black lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            animate={reduced ? undefined : { rotate: open ? 0 : 0 }}
          >
            <motion.span
              className="block h-0.5 w-[22px] rounded-sm bg-black"
              animate={reduced ? undefined : open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.span
              className="block h-0.5 w-[22px] rounded-sm bg-black"
              animate={reduced ? undefined : open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block h-0.5 w-[22px] rounded-sm bg-black"
              animate={reduced ? undefined : open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            />
          </motion.button>
        </div>

        <AnimatePresence>
          {open ? (
            <motion.nav
              key="mobile-nav"
              initial={reduced ? false : { y: "-100%" }}
              animate={reduced ? undefined : { y: 0 }}
              exit={reduced ? undefined : { y: "-100%" }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="max-h-[calc(100vh-56px)] overflow-y-auto border-t border-border/70 bg-[rgba(255,252,249,0.98)] shadow-md lg:hidden"
            >
              <div className="flex flex-col px-5 py-3">
                {navItems.map((item, i) => {
                  const active = isActivePath(pathname, item.href);
                  return (
                    <motion.div
                      key={item.href}
                      initial={reduced ? false : { opacity: 0, x: -12 }}
                      animate={reduced ? undefined : { opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <TransitionLink
                        href={item.href}
                        className={cn(
                          "block border-b border-[#e5e0da] py-4 text-[17px] font-medium text-black transition-colors duration-200 last:border-b-0",
                          active ? "text-primary" : "hover:text-primary",
                        )}
                      >
                        {item.label}
                      </TransitionLink>
                    </motion.div>
                  );
                })}
              </div>
            </motion.nav>
          ) : null}
        </AnimatePresence>
      </div>
    </header>
  );
}
