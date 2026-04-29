"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Phone, Mail } from "lucide-react";
import { BRAND } from "@/lib/brand";
import { products } from "@/lib/data/products";
import { TransitionLink } from "@/components/navigation/TransitionLink";
import { socialLinks } from "@/data/social";
import { socialIconMap } from "@/lib/social-icons";

const stagger = 0.06;

export function Footer() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

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
    { label: "Partner with us", href: "/partner" },
  ];

  return (
    <footer ref={ref} className="relative border-t border-border-strong/35 bg-footer text-foreground">
      <div className="site-container relative pb-10 pt-10 max-md:pt-9">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          <motion.section initial={false} animate={inView ? { opacity: 1, y: 0 } : undefined} transition={{ delay: 0 }}>
            <p className="font-heading text-[2.4rem] font-semibold leading-tight tracking-tight text-foreground md:text-[2.65rem]">
              {BRAND.name}
            </p>
            <p className="mt-1 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">{BRAND.logoMotto}</p>
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-mid">{BRAND.tagline}</p>
            <p className="mt-2 text-sm text-muted-foreground">{BRAND.taglineHi}</p>
            <div className="mt-7 flex flex-wrap gap-2.5">
              {socialLinks.map((s) => {
                const Icon = socialIconMap[s.icon];
                return (
                  <a
                    key={s.id}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border-strong bg-elevated text-mid transition-colors duration-200 hover:-translate-y-0.5 hover:border-terracotta/60 hover:bg-elevated hover:text-terracotta-dark"
                  >
                    <Icon className="h-4 w-4" aria-hidden />
                  </a>
                );
              })}
            </div>
          </motion.section>

          <motion.section initial={false} animate={inView ? { opacity: 1, y: 0 } : undefined} transition={{ delay: stagger }}>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-subhead">Products</p>
            <ul className="mt-5 space-y-2.5">
              {footerProducts.map((p) => (
                <li key={p.href}>
                  <TransitionLink href={p.href} className="text-[14px] text-mid transition-colors duration-150 hover:text-foreground">
                    {p.label}
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </motion.section>

          <motion.section initial={false} animate={inView ? { opacity: 1, y: 0 } : undefined} transition={{ delay: stagger * 2 }}>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-subhead">Quick links</p>
            <ul className="mt-5 space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <TransitionLink href={link.href} className="text-[14px] text-mid transition-colors duration-150 hover:text-foreground">
                    {link.label}
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </motion.section>

          <motion.section initial={false} animate={inView ? { opacity: 1, y: 0 } : undefined} transition={{ delay: stagger * 3 }}>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-subhead">Contact</p>
            <ul className="mt-5 space-y-4 text-[14px] text-mid">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                <span>SWASTIK ENTERPRISES, FF, Block-D, Shop No. 102, Narayan Exotica, Ahmedabad-380052, Gujarat</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                <a href="tel:+917383838632" className="transition-colors hover:text-foreground">
                  +91 7383838632
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                <a href="mailto:info@fixonex.com" className="transition-colors hover:text-foreground">
                  info@fixonex.com
                </a>
              </li>
            </ul>
          </motion.section>
        </div>

        <div className="relative mt-10 border-t border-border-strong/35 pt-8">
          <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center text-[12px] text-mid">
            <TransitionLink href="/company-info" className="hover:text-foreground">
              Company & legal
            </TransitionLink>
            <span aria-hidden className="text-border-strong">
              ·
            </span>
            <span>© {new Date().getFullYear()} {BRAND.name}</span>
            <span className="hidden h-1 w-1 rounded-full bg-mid/35 sm:block" aria-hidden />
            <span className="break-all text-mid sm:break-normal">www.fixonex.com</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
