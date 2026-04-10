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
    <header
      className={cn(
        "sticky top-0 z-50 h-[72px] border-b border-black/10 bg-warm transition-[background-color,box-shadow] duration-300",
        scrolled ? "bg-warm-dark shadow-nav" : "shadow-none",
      )}
    >
      <div className="site-container flex h-full items-center gap-4">
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

        <nav className="mx-2 hidden min-w-0 flex-1 items-center justify-center gap-4 xl:gap-6 lg:flex">
          {navItems.map((item) => {
            const active = isActivePath(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative whitespace-nowrap py-1 text-[13px] font-medium text-dark transition-colors duration-200 xl:text-[14px]",
                  !active && "hover:text-black",
                )}
              >
                {item.label}
                <span
                  className={cn(
                    "absolute -bottom-1 left-0 h-0.5 rounded-sm bg-primary transition-all duration-200",
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
          className="ml-auto inline-flex h-11 w-11 items-center justify-center text-black lg:hidden"
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
            className="max-h-[calc(100vh-72px)] overflow-y-auto border-t border-black/10 bg-warm lg:hidden"
          >
            <div className="site-container flex flex-col py-2">
              {navItems.map((item) => {
                const active = isActivePath(pathname, item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "border-b border-black/10 py-4 text-[17px] font-medium text-black transition-colors duration-200 last:border-b-0",
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
    </header>
  );
}
