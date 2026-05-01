"use client";

import { MapPin, Phone, Mail } from "lucide-react";
import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { BRAND } from "@/lib/brand";
import { products } from "@/lib/data/products";
import { TransitionLink } from "@/components/navigation/TransitionLink";
import { socialLinks } from "@/data/social";
import { socialIconMap } from "@/lib/social-icons";

export function Footer() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-32px", amount: 0.25 });
  const reduced = useReducedMotion();

  const footerProducts = [
    { label: "Tiles Adhesive", href: "/products/tiles-adhesive" },
    ...products
      .filter((p) => p.familySlug !== "tiles-adhesive")
      .map((p) => ({ label: p.name, href: `/products/${p.slug}` })),
  ];

  const quickLinks = [
    { label: "Why FIXONEX", href: "/why-fixonex" },
    { label: "FAQ", href: "/faq" },
    { label: "Services", href: "/services" },
    { label: "Company & legal", href: "/company-info" },
  ];

  const rise =
    reduced
      ? { opacity: 1, y: 0 }
      : ({ opacity: inView ? 1 : 0, y: inView ? 0 : 12 } as const);

  return (
    <footer ref={ref} className="border-t border-border-strong bg-[#111111] text-zinc-100">
      <div className="site-container pb-14 pt-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-10">
          <motion.section className="rounded-2xl border border-white/12 bg-white/[0.02] p-6 lg:col-span-4" animate={rise} transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}>
            <p className="font-display text-3xl font-semibold tracking-tight text-white">{BRAND.name}</p>
            <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">{BRAND.logoMotto}</p>
            <p className="mt-7 max-w-sm text-[15px] leading-relaxed text-zinc-300">{BRAND.tagline}</p>
            <p className="mt-2 max-w-xs text-xs text-zinc-500">{BRAND.taglineHi}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              {socialLinks.map((s) => {
                const Icon = socialIconMap[s.icon];
                return (
                  <a
                    key={s.id}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/16 bg-white/5 text-zinc-300 transition-colors hover:border-white/35 hover:bg-white/10 hover:text-white active:translate-y-[1px]"
                  >
                    <Icon className="h-[18px] w-[18px]" aria-hidden />
                  </a>
                );
              })}
            </div>
          </motion.section>

          <motion.nav className="lg:col-span-2" animate={rise} transition={{ duration: 0.55, delay: 0.05, ease: [0.16, 1, 0.3, 1] }} aria-labelledby="footer-products-heading">
            <p id="footer-products-heading" className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
              Catalogue
            </p>
            <ul className="mt-7 space-y-3">
              {footerProducts.slice(0, 8).map((p) => (
                <li key={p.href}>
                  <TransitionLink href={p.href} className="text-sm text-zinc-300 hover:text-white">
                    {p.label}
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </motion.nav>

          <motion.nav className="lg:col-span-2" animate={rise} transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500">Explore</p>
            <ul className="mt-7 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <TransitionLink href={link.href} className="text-sm text-zinc-300 hover:text-white">
                    {link.label}
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </motion.nav>

          <motion.address className="not-italic lg:col-span-4" animate={rise} transition={{ duration: 0.55, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500">Contact</p>
            <ul className="mt-7 space-y-6 text-[15px] leading-relaxed text-zinc-400">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-white/90" aria-hidden />
                SWASTIK ENTERPRISES, FF, Block-D, Shop No. 102, Narayan Exotica, Ahmedabad-380052, Gujarat
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 shrink-0 text-white/90" aria-hidden />
                <a href="tel:+917383838632" className="hover:text-white">
                  +91 7383838632
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 shrink-0 text-white/90" aria-hidden />
                <a href="mailto:info@fixonex.com" className="hover:text-white">
                  info@fixonex.com
                </a>
              </li>
            </ul>
          </motion.address>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-white/12 pt-8 text-[12px] text-zinc-500">
          <p>
            © {new Date().getFullYear()} {BRAND.name} ·{' '}
            <span className="hidden sm:inline">www.fixonex.com</span>
          </p>
          <TransitionLink href="/contact" className="font-semibold text-zinc-200 hover:text-white">
            Start a specification →
          </TransitionLink>
        </div>
      </div>
    </footer>
  );
}
