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
    <footer ref={ref} className="bg-black text-white">
      <div className="site-container pt-16 pb-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          <motion.section
            initial={false}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ delay: 0 }}
          >
            <div className="flex flex-col leading-none">
              <span className="font-display text-[22px] font-bold tracking-tight">{BRAND.name}</span>
              <span className="mt-1 text-[11px] font-medium tracking-wide text-warm">{BRAND.logoMotto}</span>
            </div>
            <p className="mt-4 text-[15px] font-medium capitalize text-white">{BRAND.tagline}</p>
            <p className="mt-3 text-[18px] italic text-warm">{BRAND.taglineHi}</p>
          </motion.section>

          <motion.section
            initial={false}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ delay: stagger }}
          >
            <p className="label-caps text-mid">Products</p>
            <ul className="mt-4 space-y-2">
              {footerProducts.map((p) => (
                <li key={p.href}>
                  <Link href={p.href} className="text-sm text-mid transition-all duration-200 hover:translate-x-1 hover:text-white">
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
            <p className="label-caps text-mid">Quick links</p>
            <ul className="mt-4 space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-mid transition-all duration-200 hover:translate-x-1 hover:text-white">
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
            <p className="label-caps text-mid">Contact</p>
            <ul className="mt-4 space-y-3 text-sm text-mid">
              <li>
                SWASTIK ENTERPRISES, FF, Block-D, Shop No. 102, Narayan Exotica, Ahmedabad-380052, Gujarat
              </li>
              <li>
                <a href="tel:+917383838632" className="transition-colors hover:text-white">
                  +91 7383838632
                </a>
              </li>
              <li>
                <a href="mailto:info@fixonex.com" className="transition-colors hover:text-white">
                  info@fixonex.com
                </a>
              </li>
            </ul>
          </motion.section>
        </div>

        <div className="relative mt-12 border-t border-warm pt-6">
          <p className="flex flex-col items-center justify-center gap-1 text-center text-[13px] text-mid sm:flex-row sm:gap-2">
            <span>© {new Date().getFullYear()} {BRAND.name}.</span>
            <span className="break-all sm:break-normal">www.fixonex.com</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
