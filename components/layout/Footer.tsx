"use client";

import Link from "next/link";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { motion } from "framer-motion";
import { BRAND } from "@/lib/brand";
import { products } from "@/lib/data/products";
import { useReducedMotion } from "@/lib/useReducedMotion";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Support", href: "/support" },
  { label: "Partner with Us", href: "/partner" },
];

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
                  <Link href={p.href} className="text-[14px] text-[#3a3a3a] transition-colors duration-200 hover:text-[#111111]">
                    {p.label}
                  </Link>
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
                  <Link href={link.href} className="text-[14px] text-[#3a3a3a] transition-colors duration-200 hover:text-[#111111]">
                    {link.label}
                  </Link>
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
                <a href="tel:+917383838632" className="transition-colors hover:text-[#111111]">
                  +91 7383838632
                </a>
              </li>
              <li>
                <a href="mailto:info@fixonex.com" className="transition-colors hover:text-[#111111]">
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
