"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { BRAND } from "@/lib/brand";
import { products } from "@/lib/data/products";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { TransitionLink } from "@/components/navigation/TransitionLink";
import { socialLinks } from "@/data/social";
import { socialIconMap } from "@/lib/social-icons";

const stagger = 0.06;

export function Footer() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduced = useReducedMotion();
  const footerProducts = [
    { label: "Tiles Adhesive", href: "/products/tiles-adhesive" },
    ...products
      .filter((p) => p.familySlug !== "tiles-adhesive")
      .map((p) => ({ label: p.name, href: `/products/${p.slug}` })),
  ];

  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Support", href: "/support" },
    { label: "Partner with Us", href: "/partner" },
  ];

  return (
    <footer ref={ref} className="border-t border-[rgba(193,178,164,0.45)] bg-[rgb(208,200,193)] text-[#3a3a3a]">
      <div className="site-container pt-16 pb-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <motion.section
            initial={false}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ delay: 0 }}
          >
            <div className="relative flex flex-col leading-none">
              <span className="pointer-events-none absolute -top-7 text-[52px] font-bold tracking-tight text-[#8a7a6e]/15">{BRAND.name}</span>
              <span className="relative z-10 font-display text-[44px] font-bold tracking-tight text-[#111111]">{BRAND.name}</span>
              <span className="mt-1 text-[12px] tracking-wide text-[#6b6b6b]">{BRAND.logoMotto}</span>
            </div>
            <p className="mt-5 text-[15px] leading-relaxed text-[#3a3a3a]">{BRAND.tagline}</p>
            <p className="mt-2 text-[15px] text-[#6b6b6b]">{BRAND.taglineHi}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              {socialLinks.map((s, si) => {
                const Icon = socialIconMap[s.icon];
                return (
                  <motion.a
                    key={s.id}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="icon-hover-standalone inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#c1b2a4] bg-white/80 text-[#111111] transition-colors duration-200 hover:border-primary"
                    initial={false}
                    animate={inView && !reduced ? { y: [0, -6, 0] } : undefined}
                    transition={{ delay: 0.2 + si * 0.1, duration: 0.45, ease: [0.34, 1.56, 0.64, 1] }}
                  >
                    <Icon className="h-4 w-4" aria-hidden />
                  </motion.a>
                );
              })}
            </div>
          </motion.section>

          <motion.section
            initial={false}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ delay: stagger }}
          >
            <p className="label-caps text-[#8a7a6e]">Products</p>
            <ul className="mt-4 space-y-2">
              {footerProducts.map((p) => (
                <li key={p.href}>
                  <TransitionLink href={p.href} className="text-[14px] text-[#3a3a3a] transition-colors duration-200 hover:text-[#111111]">
                    {p.label}
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </motion.section>

          <motion.section
            initial={false}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ delay: stagger * 2 }}
          >
            <p className="label-caps text-[#8a7a6e]">Quick links</p>
            <ul className="mt-4 space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <TransitionLink href={link.href} className="text-[14px] text-[#3a3a3a] transition-colors duration-200 hover:text-[#111111]">
                    {link.label}
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </motion.section>

          <motion.section
            initial={false}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ delay: stagger * 3 }}
          >
            <p className="label-caps text-[#8a7a6e]">Contact</p>
            <ul className="mt-4 space-y-3 text-[14px] text-[#3a3a3a]">
              <li>
                <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#c1b2a4] text-black">⌂</span>
                SWASTIK ENTERPRISES, FF, Block-D, Shop No. 102, Narayan Exotica, Ahmedabad-380052, Gujarat
              </li>
              <li>
                <a href="tel:+917383838632" className="transition-colors duration-200 hover:text-[#111111]">
                  +91 7383838632
                </a>
              </li>
              <li>
                <a href="mailto:info@fixonex.com" className="transition-colors duration-200 hover:text-[#111111]">
                  info@fixonex.com
                </a>
              </li>
            </ul>
          </motion.section>
        </div>

        <div className="relative mt-12 border-t border-[rgba(193,178,164,0.45)] pt-6">
          <p className="flex flex-col items-center justify-center gap-1 text-center text-[13px] text-[#6b6b6b] sm:flex-row sm:gap-2">
            <span>© {new Date().getFullYear()} {BRAND.name}.</span>
            <span className="break-all text-[#8a7a6e] sm:break-normal">www.fixonex.com</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
