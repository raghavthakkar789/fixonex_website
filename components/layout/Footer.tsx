"use client";

import { MapPin, Phone, Mail, ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { BRAND } from "@/lib/brand";
import { products } from "@/lib/data/products";
import { TransitionLink } from "@/components/navigation/TransitionLink";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { socialLinks } from "@/data/social";
import { socialIconMap } from "@/lib/social-icons";

const easeExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

function FooterColumn({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-16px", amount: 0.2 });
  const reduced = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={className}
      animate={reduced ? {} : { opacity: inView ? 1 : 0, y: inView ? 0 : 24 }}
      initial={{ opacity: 0, y: 24 }}
      transition={{ duration: 0.65, ease: easeExpo, delay }}
    >
      {children}
    </motion.div>
  );
}

export function Footer() {
  const ref = useRef<HTMLElement>(null);
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

  return (
    <footer
      ref={ref}
      className="relative overflow-hidden border-t border-zinc-200/60 bg-gradient-to-b from-[#fdfcfb] to-[#f8f5f2] text-zinc-700"
    >
      {/* Top glow line */}
      <div
        aria-hidden
        className="absolute left-[6%] right-[6%] top-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(211,47,47,0.4) 50%, transparent)",
        }}
      />

      {/* Background orbs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-[15%] top-[-10%] h-[60%] w-[50%] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(211,47,47,0.05) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[10%] bottom-[-10%] h-[50%] w-[45%] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(234,88,12,0.04) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* Dot grid */}
      <div aria-hidden className="pointer-events-none absolute inset-0 dot-grid-subtle opacity-30" />

      <div className="site-container pb-14 pt-16 relative z-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-10">

          {/* Brand column */}
          <FooterColumn delay={0} className="lg:col-span-4">
            <div className="rounded-3xl border border-zinc-200/70 bg-white p-6 shadow-[0_4px_24px_rgba(0,0,0,0.05)]">
              <TransitionLink
                href="/"
                aria-label={`${BRAND.name} home`}
                className="relative block h-12 w-[180px] overflow-hidden md:h-14 md:w-[200px]"
              >
                <ImageWithFallback
                  src="/images/misc/logo.png"
                  alt={`${BRAND.name} logo`}
                  fill
                  sizes="200px"
                  className="object-contain object-left"
                  reveal="none"
                />
              </TransitionLink>
              <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-zinc-600">{BRAND.tagline}</p>
              <p className="mt-1.5 max-w-xs text-[12px] italic text-zinc-400">{BRAND.taglineHi}</p>

              {/* Social links */}
              <div className="mt-8 flex flex-wrap gap-2.5">
                {socialLinks.map((s) => {
                  const Icon = socialIconMap[s.icon];
                  return (
                    <motion.a
                      key={s.id}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-500 transition-all duration-300 hover:border-primary/30 hover:bg-primary/5 hover:text-primary shadow-sm"
                      whileHover={reduced ? undefined : { scale: 1.08, y: -1 }}
                      whileTap={{ scale: 0.94 }}
                      transition={{ duration: 0.2, ease: easeExpo }}
                    >
                      <Icon className="h-[17px] w-[17px]" aria-hidden />
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </FooterColumn>

          {/* Catalogue column */}
          <FooterColumn delay={0.06} className="lg:col-span-2">
            <nav aria-labelledby="footer-products-heading">
              <p
                id="footer-products-heading"
                className="text-[10px] font-bold uppercase tracking-[0.26em] text-zinc-400 mb-6"
              >
                Catalogue
              </p>
              <ul className="space-y-2.5">
                {footerProducts.slice(0, 8).map((p, i) => (
                  <motion.li
                    key={p.href}
                    initial={reduced ? false : { opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-5%" }}
                    transition={{ duration: 0.4, ease: easeExpo, delay: i * 0.04 }}
                  >
                    <TransitionLink
                      href={p.href}
                      className="group inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-primary transition-colors duration-250"
                    >
                      <span className="h-px w-3 bg-zinc-300 group-hover:w-4 group-hover:bg-primary/70 transition-all duration-300 rounded" />
                      {p.label}
                    </TransitionLink>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </FooterColumn>

          {/* Explore column */}
          <FooterColumn delay={0.1} className="lg:col-span-2">
            <nav>
              <p className="text-[10px] font-bold uppercase tracking-[0.26em] text-zinc-600 mb-6">
                Explore
              </p>
              <ul className="space-y-2.5">
                {quickLinks.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={reduced ? false : { opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-5%" }}
                    transition={{ duration: 0.4, ease: easeExpo, delay: i * 0.04 }}
                  >
                    <TransitionLink
                      href={link.href}
                      className="group inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-primary transition-colors duration-250"
                    >
                      <span className="h-px w-3 bg-zinc-300 group-hover:w-4 group-hover:bg-orange-500/70 transition-all duration-300 rounded" />
                      {link.label}
                    </TransitionLink>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </FooterColumn>

          {/* Contact column */}
          <FooterColumn delay={0.14} className="lg:col-span-4">
            <address className="not-italic">
              <p className="text-[10px] font-bold uppercase tracking-[0.26em] text-zinc-600 mb-6">
                Contact
              </p>
              <ul className="space-y-5 text-[14px] leading-relaxed text-zinc-500">
                <li className="flex gap-3 group">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-zinc-400 group-hover:text-primary transition-colors duration-300" aria-hidden />
                  <span className="group-hover:text-zinc-700 transition-colors duration-300">
                    SWASTIK ENTERPRISES, FF, Block-D, Shop No. 102, Narayan Exotica, Ahmedabad-380052, Gujarat
                  </span>
                </li>
                <li className="flex items-center gap-3 group">
                  <Phone className="h-5 w-5 shrink-0 text-zinc-400 group-hover:text-primary transition-colors duration-300" aria-hidden />
                  <a
                    href="tel:+917383838632"
                    className="hover:text-zinc-900 transition-colors duration-250"
                  >
                    +91 7383838632
                  </a>
                </li>
                <li className="flex items-center gap-3 group">
                  <Mail className="h-5 w-5 shrink-0 text-zinc-400 group-hover:text-primary transition-colors duration-300" aria-hidden />
                  <a
                    href="mailto:info@fixonex.com"
                    className="hover:text-zinc-900 transition-colors duration-250"
                  >
                    info@fixonex.com
                  </a>
                </li>
              </ul>
            </address>
          </FooterColumn>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-zinc-200/70 pt-8">
          <div className="flex items-center gap-3">
            <p className="text-[12px] text-zinc-400">
              © {new Date().getFullYear()} {BRAND.name}
            </p>
            <span className="text-zinc-300">·</span>
            <p className="hidden text-[12px] text-zinc-400 sm:block">www.fixonex.com</p>
          </div>

          <motion.div
            whileHover={{ x: 2 }}
            transition={{ duration: 0.2 }}
          >
            <TransitionLink
              href="/contact"
              className="group inline-flex items-center gap-1.5 text-[13px] font-semibold text-zinc-500 hover:text-primary transition-colors duration-250"
            >
              Start a specification
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 duration-200" />
            </TransitionLink>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
