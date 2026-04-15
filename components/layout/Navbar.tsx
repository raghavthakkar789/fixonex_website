"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { BRAND } from "@/lib/brand";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";

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
          "w-full border-b border-[rgba(193,178,164,0.3)] bg-[rgba(208,200,193,0.82)] backdrop-blur-[16px] transition-[box-shadow,backdrop-filter] duration-300",
          scrolled && "backdrop-blur-[22px] shadow-[0_4px_24px_rgba(138,122,110,0.12)]",
        )}
      >
      <div className="site-container flex h-[68px] items-center gap-4 max-md:h-[56px]">
        <Link href="/" className="flex shrink-0 items-center gap-3 leading-none" aria-label={`${BRAND.name} home`}>
          <div className="relative h-10 w-[132px] overflow-hidden">
            <ImageWithFallback
              src="/images/misc/logo.png"
              alt={`${BRAND.name} logo`}
              fill
              sizes="132px"
              className="object-contain object-left"
            />
          </div>
          <div className="hidden flex-col sm:flex">
            <span className="font-display text-[22px] font-bold text-black">{BRAND.name}</span>
            <span className="text-[10px] tracking-wide text-dark">{BRAND.logoMotto}</span>
          </div>
        </Link>

        <nav className="mx-2 hidden min-w-0 flex-1 items-center justify-center gap-5 lg:flex xl:gap-7">
          {navItems.map((item) => {
            const active = isActivePath(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative whitespace-nowrap py-1 text-[14px] font-medium text-[#3a3a3a] transition-colors duration-300",
                  !active && "hover:text-[#111111]",
                )}
              >
                {item.label}
                <span
                  className={cn(
                    "absolute -bottom-1 left-0 h-0.5 rounded-sm bg-[#d32f2f] transition-all duration-200",
                    active ? "w-full" : "w-0 hover:w-full",
                  )}
                  aria-hidden
                />
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          suppressHydrationWarning
          onClick={() => setOpen((v) => !v)}
          className="ml-auto inline-flex h-10 w-10 items-center justify-center text-black lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.nav
            key="mobile-nav"
            initial={reduced ? false : { y: "-100%" }}
            animate={reduced ? undefined : { y: 0 }}
            exit={reduced ? undefined : { y: "-100%" }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="max-h-[calc(100vh-56px)] overflow-y-auto border-t border-[rgba(193,178,164,0.3)] bg-[rgba(208,200,193,0.96)] shadow-[0_12px_24px_rgba(138,122,110,0.12)] lg:hidden"
          >
            <div className="flex flex-col px-5 py-3">
              {navItems.map((item) => {
                const active = isActivePath(pathname, item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "border-b border-[#e5e0da] py-4 text-[17px] font-medium text-black transition-colors duration-200 last:border-b-0",
                      active ? "text-primary" : "hover:text-primary",
                    )}
                  >
                    {item.label}
                  </Link>
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
