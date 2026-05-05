"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { BRAND } from "@/lib/brand";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { TransitionLink } from "@/components/navigation/TransitionLink";
import { CatalogRequestButton } from "@/components/layout/CatalogRequestButton";

const easeExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

function activeFor(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

const pillLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Service" },
  { href: "/why-fixonex", label: "Why FIXONEX" },
  { href: "/support", label: "Support" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
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
    <>
      {/* ── Wrapper: transitions padding from 0 (top) → px-4 pt-3 (scrolled) ── */}
      <motion.div
        className="fixed left-0 right-0 top-0 z-[100] flex justify-center"
        animate={
          scrolled
            ? { paddingLeft: 16, paddingRight: 16, paddingTop: 12 }
            : { paddingLeft: 0, paddingRight: 0, paddingTop: 0 }
        }
        transition={{ duration: 0.45, ease: easeExpo }}
      >
        <motion.header
          className={cn(
            "relative w-full overflow-visible",
            // CSS transitions handle appearance; Framer Motion handles geometry
            "transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300",
            scrolled
              ? "border border-zinc-200/80 bg-white/95 shadow-[0_8px_32px_rgba(0,0,0,0.10)] backdrop-blur-xl"
              : "border-b border-zinc-200/60 bg-white/85 backdrop-blur-md shadow-none",
          )}
          animate={
            scrolled
              ? { borderRadius: 16, maxWidth: 1024 }
              : { borderRadius: 0, maxWidth: 9999 }
          }
          transition={{ duration: 0.45, ease: easeExpo }}
        >
          {/* Top red accent line — fades in on scroll */}
          <motion.div
            className="absolute left-4 right-4 top-0 h-[2px] rounded-full pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, transparent, #D32F2F 40%, #ea580c 60%, transparent)",
            }}
            animate={{ opacity: scrolled ? 1 : 0 }}
            transition={{ duration: 0.35, ease: easeExpo }}
          />

          <div className="flex h-14 items-center gap-3 px-4 md:px-6">

            {/* ── Logo ── */}
            <TransitionLink
              href="/"
              className="flex shrink-0 items-center"
              aria-label={`${BRAND.name} home`}
            >
              <span className="relative h-7 w-[100px] overflow-hidden md:h-8 md:w-[110px]">
                <ImageWithFallback
                  src="/images/misc/logo.png"
                  alt={`${BRAND.name} logo`}
                  fill
                  sizes="110px"
                  className="object-contain object-left"
                  reveal="none"
                />
              </span>
            </TransitionLink>

            {/* ── Center pill nav — desktop ── */}
            <nav className="mx-auto hidden lg:flex" aria-label="Primary">
              <div
                className={cn(
                  "flex items-center gap-0.5 rounded-xl px-1 py-1 transition-colors duration-300",
                  scrolled ? "bg-zinc-100/80" : "bg-zinc-100/50",
                )}
              >
                {pillLinks.map((item) => {
                  const on = activeFor(pathname, item.href);
                  return (
                    <TransitionLink
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "relative rounded-lg px-3.5 py-1.5 text-[13px] font-medium transition-colors duration-150",
                        on ? "text-zinc-950" : "text-zinc-500 hover:text-zinc-800",
                      )}
                    >
                      {on && (
                        <motion.span
                          layoutId="nav-pill"
                          className="absolute inset-0 -z-[1] rounded-lg bg-white shadow-sm ring-1 ring-zinc-200/80"
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
            <div className="ml-auto flex shrink-0 items-center gap-2">
              {/* Catalog gate — visible on every viewport. Captures lead details, then opens the PDF.
                  Desktop: sits between the pill nav (last item: Support) and Contact.
                  Mobile/tablet: Contact + Partnership are hidden, so this lands directly left of the hamburger. */}
              <CatalogRequestButton />

              {/* Contact — desktop only */}
              <TransitionLink
                href="/contact"
                className="hidden text-[13px] font-medium text-zinc-500 transition-colors duration-150 hover:text-zinc-900 lg:block"
              >
                Contact
              </TransitionLink>

              {/* Partnership CTA — desktop only */}
              <motion.div
                className="hidden lg:block"
                whileHover={reduced ? undefined : { scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.15 }}
              >
                <TransitionLink
                  href="/partner"
                  className="rounded-xl bg-primary px-4 py-2 text-[13px] font-semibold text-white transition-colors hover:bg-primary/90"
                >
                  Partnership
                </TransitionLink>
              </motion.div>

              {/* Hamburger — mobile/tablet only.
                  "Compass reticle → X" toggle: four short pill arms arranged
                  as a + sign with a centre gap (closed). On open they slide
                  to the centre and rotate ±45° simultaneously to lock into
                  a tight X. A faint outer ring fades in on open to reinforce
                  the reticle motif. */}
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className="group relative inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50 text-zinc-700 transition-colors hover:border-primary/30 hover:bg-white hover:text-primary lg:hidden"
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? "Close menu" : "Open menu"}
              >
                {/* Outer reticle ring — fades in on open */}
                <motion.span
                  aria-hidden
                  className="pointer-events-none absolute h-5 w-5 rounded-full border border-current"
                  initial={false}
                  animate={{
                    opacity: open ? 0.35 : 0,
                    scale: open ? 1 : 0.7,
                    rotate: open ? 90 : 0,
                  }}
                  transition={{ duration: 0.4, ease: easeExpo }}
                />

                {/* Soft red glow behind the icon on open */}
                <motion.span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-xl"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 50%, rgba(211,47,47,0.14), transparent 70%)",
                  }}
                  animate={{ opacity: open ? 1 : 0 }}
                  transition={{ duration: 0.25, ease: easeExpo }}
                />

                <span className="relative flex h-full w-full items-center justify-center">
                  {[
                    // Each arm: pill drawn vertically by default. `closedRot`
                    // is its resting angle when the menu is closed (forming
                    // the + reticle). `openRot` is the angle it locks to
                    // when open. `cx/cy` are the closed-state offsets from
                    // centre, which animate to (0,0) so arms converge.
                    { cx: 0, cy: -4.5, closedRot: 0, openRot: 45 },   // N
                    { cx: 0, cy: 4.5, closedRot: 0, openRot: 45 },    // S → overlaps with N to make ↘ diagonal
                    { cx: 4.5, cy: 0, closedRot: 90, openRot: -45 },  // E
                    { cx: -4.5, cy: 0, closedRot: 90, openRot: -45 }, // W → overlaps with E to make ↙ diagonal
                  ].map((arm, i) => (
                    <motion.span
                      key={i}
                      aria-hidden
                      className="absolute block rounded-full bg-current"
                      style={{ width: 1.75, height: 7 }}
                      initial={false}
                      animate={
                        open
                          ? { x: 0, y: 0, rotate: arm.openRot, scaleY: 1.55 }
                          : { x: arm.cx, y: arm.cy, rotate: arm.closedRot, scaleY: 1 }
                      }
                      transition={{
                        duration: 0.42,
                        ease: easeExpo,
                        delay: i * 0.035,
                      }}
                    />
                  ))}
                </span>
              </button>
            </div>
          </div>

          {/* ── Mobile menu (drops inside the card) ── */}
          <AnimatePresence>
            {open && (
              <motion.nav
                id="mobile-menu"
                key="mob"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.28, ease: easeExpo }}
                className="overflow-hidden border-t border-zinc-100 lg:hidden"
              >
                <div className="px-3 pb-3 pt-2">
                  {/* Nav links */}
                  <ul className="space-y-0.5">
                    {pillLinks.map((item, i) => {
                      const on = activeFor(pathname, item.href);
                      return (
                        <motion.li
                          key={item.href}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.035, duration: 0.22, ease: easeExpo }}
                        >
                          <TransitionLink
                            href={item.href}
                            className={cn(
                              "flex items-center justify-between rounded-xl px-3.5 py-2.5 text-[14px] font-medium transition-colors",
                              on
                                ? "bg-primary text-white"
                                : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900",
                            )}
                          >
                            {item.label}
                            {on && <span className="h-1.5 w-1.5 rounded-full bg-primary" />}
                          </TransitionLink>
                        </motion.li>
                      );
                    })}
                  </ul>

                  {/* CTA buttons */}
                  <motion.div
                    className="mt-3 grid grid-cols-2 gap-2 border-t border-zinc-100 pt-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.22 }}
                  >
                    <TransitionLink
                      href="/contact"
                      className="flex items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50 py-2.5 text-[13px] font-semibold text-zinc-700 transition-colors hover:bg-zinc-100"
                    >
                      Contact Us
                    </TransitionLink>
                    <TransitionLink
                      href="/partner"
                      className="flex items-center justify-center rounded-xl bg-primary py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-primary/90"
                    >
                      Partnership
                    </TransitionLink>
                  </motion.div>
                </div>
              </motion.nav>
            )}
          </AnimatePresence>
        </motion.header>
      </motion.div>
    </>
  );
}
