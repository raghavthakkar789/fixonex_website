"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { BRAND } from "@/lib/brand";
import { mainNav } from "@/data/navigation";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { TransitionLink } from "@/components/navigation/TransitionLink";

const routes = [{ href: "/", label: "Home" }, ...mainNav] as const;

const navEase = [0.16, 1, 0.3, 1] as const;

function activeFor(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
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
    <header className={cn(
      "relative sticky top-0 z-[100] transition-[backdrop-filter,box-shadow,border-color] duration-300",
      "after:pointer-events-none after:absolute after:inset-x-8 after:-bottom-[1px] after:h-[2px] after:rounded-full after:opacity-0 after:[background:linear-gradient(90deg,transparent,#d32f2f,#ea580c,#0f766e,_transparent)] after:[box-shadow:0_0_32px_-4px_rgba(211,47,47,0.55)]",
      scrolled ? "glass-panel border-b border-orange-950/12 bg-[rgba(251,251,251,0.9)] shadow-nav backdrop-blur-md after:opacity-100" : "glass-panel border-b border-transparent bg-white/[0.9] backdrop-blur-sm after:opacity-0",
    )}>
      <div className="site-container flex h-[4.125rem] max-md:h-[3.625rem] items-center gap-4">
        <TransitionLink href="/" className="flex min-w-0 shrink-0 items-center gap-3" aria-label={`${BRAND.name} home`}>
          <span className="relative h-9 w-[118px] overflow-hidden md:h-10 md:w-[128px]">
            <ImageWithFallback
              src="/images/misc/logo.png"
              alt={`${BRAND.name} logo`}
              fill
              sizes="132px"
              className="object-contain object-left"
              reveal="none"
            />
          </span>
          <span className="hidden min-w-0 flex-col leading-none lg:flex">
            <span className="font-display text-lg font-semibold tracking-tight text-zinc-900">{BRAND.name}</span>
            <span className="mt-1 text-[0.65rem] font-medium uppercase tracking-[0.26em] text-zinc-500">{BRAND.logoMotto}</span>
          </span>
        </TransitionLink>

        <nav
          className="mx-auto hidden min-w-0 flex-1 items-center justify-center lg:flex"
          aria-label="Primary"
        >
          <div className="glass-panel inline-flex flex-wrap justify-center gap-0.5 rounded-full border border-zinc-200/90 bg-zinc-50/72 p-[5px] shadow-soft ring-1 ring-white/[0.65] backdrop-blur-[4px]">
            {routes.map((item) => {
              const on = activeFor(pathname, item.href);
              return (
                <TransitionLink
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative rounded-full px-[0.82rem] py-2 text-[0.785rem] font-semibold transition-colors xl:px-[0.94rem]",
                    on ? "text-zinc-950" : "text-zinc-500 hover:bg-white/85 hover:text-zinc-950",
                  )}
                >
                  {on ? (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-[1] rounded-full bg-gradient-to-br from-orange-100/93 via-orange-700/34 to-transparent shadow-inner ring-2 ring-orange-700/52"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  ) : null}
                  <span>{item.label}</span>
                </TransitionLink>
              );
            })}
          </div>
        </nav>

        <div className="ml-auto flex flex-shrink-0 items-center gap-1.5 sm:gap-2">
          <TransitionLink
            href="/why-fixonex"
            className={cn(
              "hidden rounded-full border border-zinc-200/92 bg-white px-[0.75rem] py-2 text-[0.76rem] font-semibold shadow-soft transition-colors sm:inline-flex",
              activeFor(pathname, "/why-fixonex")
                ? "border-orange-800/62 bg-orange-50/95 text-orange-950"
                : "text-zinc-700 hover:border-orange-950/54 hover:bg-orange-50/55 hover:text-orange-950",
            )}
          >
            Why FIXONEX
          </TransitionLink>
          <TransitionLink
            href="/products"
            className={cn(
              "hidden rounded-full border border-zinc-200/92 bg-white px-[0.75rem] py-2 text-[0.76rem] font-semibold shadow-soft transition-colors sm:inline-flex md:min-w-[9.25rem] md:justify-center",
              activeFor(pathname, "/products")
                ? "border-orange-950/92 bg-gradient-to-br from-orange-900/[0.14] via-white to-orange-950/[0.14] text-orange-950"
                : "text-zinc-800 hover:border-orange-950/74 hover:bg-orange-50/38 hover:text-orange-950",
            )}
          >
            Catalogue
          </TransitionLink>
          <TransitionLink
            href="/support"
            className={cn(
              "hidden rounded-full border border-zinc-200/92 bg-white px-[0.75rem] py-2 text-[0.76rem] font-semibold shadow-soft transition-colors md:inline-flex",
              activeFor(pathname, "/support") ? "border-teal-950/92 bg-teal-50/[0.93] text-teal-950" : "text-zinc-700 hover:border-teal-800/92 hover:bg-teal-50/65 hover:text-teal-950",
            )}
          >
            Support
          </TransitionLink>
          <TransitionLink
            href="/contact"
            className="hidden items-center justify-center rounded-full bg-gradient-to-br from-[#dc2626] via-[#c81e1e] to-[#9a3412] px-[0.94rem] py-2 text-[0.785rem] font-semibold text-white shadow-xl shadow-orange-950/40 ring-[3px] ring-orange-950/45 transition-[filter,transform] hover:-translate-y-0.5 hover:brightness-105 md:inline-flex"
          >
            Get a quote
          </TransitionLink>
          <motion.button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-11 w-11 flex-col items-center justify-center rounded-full border border-zinc-200/90 bg-white text-zinc-900 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close navigation" : "Open navigation"}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.18, ease: navEase }}
          >
            <motion.span
              animate={open ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.32, ease: navEase }}
              className="block h-[2px] w-5 rounded-full bg-current"
            />
            <motion.span
              animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              className="mt-1.5 block h-[2px] w-5 rounded-full bg-current"
            />
            <motion.span
              animate={open ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.32, ease: navEase }}
              className="mt-1.5 block h-[2px] w-5 rounded-full bg-current"
            />
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.nav
            id="mobile-menu"
            key="mob"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: navEase }}
            className="border-t border-zinc-200/90 bg-white/96 backdrop-blur-lg lg:hidden"
          >
            <div className="site-container grid gap-px py-5">
              {routes.map((item) => (
                <TransitionLink key={item.href} href={item.href} className="rounded-xl px-3 py-3.5 text-lg font-semibold text-zinc-800 hover:bg-zinc-50">
                  {item.label}
                </TransitionLink>
              ))}
              <div className="mt-4 grid grid-cols-1 gap-2 border-t border-zinc-200/80 pt-4 sm:grid-cols-2">
                <TransitionLink href="/why-fixonex" className="rounded-xl border border-zinc-200/95 bg-white px-4 py-3 text-center text-sm font-semibold text-zinc-800 shadow-soft">
                  Why FIXONEX
                </TransitionLink>
                <TransitionLink href="/products" className="rounded-xl border border-orange-900/62 bg-orange-50/75 px-4 py-3 text-center text-sm font-semibold text-orange-950">
                  Catalogue
                </TransitionLink>
                <TransitionLink href="/support" className="rounded-xl border border-teal-900/72 bg-teal-50/75 px-4 py-3 text-center text-sm font-semibold text-teal-950 sm:col-span-2">
                  Support library
                </TransitionLink>
                <TransitionLink href="/contact" className="rounded-xl bg-primary px-4 py-3 text-center font-semibold text-white shadow-lg sm:col-span-2">
                  Get a quote
                </TransitionLink>
              </div>
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
