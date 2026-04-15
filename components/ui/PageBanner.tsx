"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";
type Crumb = { label: string; href?: string };

type PageBannerProps = {
  label: string;
  title: string;
  subtitle: string;
  breadcrumbs?: Crumb[];
};

export function PageBanner({ label, title, subtitle, breadcrumbs = [] }: PageBannerProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[220px] overflow-hidden bg-gradient-to-b from-[rgb(208,200,193)] to-[#c1b2a4] text-[#111111] md:min-h-[280px]"
    >
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: "radial-gradient(circle at 20% 10%, rgba(255,255,255,0.22), transparent 52%)",
          y: reduced ? undefined : bgY,
        }}
        aria-hidden
      />
      <div className="site-container relative flex flex-1 flex-col justify-center py-12 md:py-16">
        {breadcrumbs.length > 0 ? (
          <nav aria-label="Breadcrumb" className="mb-4 overflow-x-auto text-sm text-mid sm:overflow-visible">
            <div className="flex min-w-max flex-nowrap items-center gap-2 sm:min-w-0 sm:flex-wrap">
            {breadcrumbs.map((crumb, index) => (
              <span key={`${crumb.label}-${index}`} className="inline-flex items-center gap-2">
                {crumb.href ? (
                  <Link href={crumb.href} className="text-mid hover:text-[#111111]">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-warm">{crumb.label}</span>
                )}
                {index < breadcrumbs.length - 1 ? <span className="text-warm">›</span> : null}
              </span>
            ))}
            </div>
          </nav>
        ) : null}
        <div className="surface-card flex gap-5 p-7 md:p-9">
          <span className="w-1 shrink-0 rounded-sm bg-primary" aria-hidden />
          <div className="min-w-0">
            <p className="section-eyebrow">{label}</p>
            <div className="mt-3 overflow-hidden">
              <motion.h1
                className="max-w-3xl font-display text-hero font-bold text-[#111111]"
                initial={reduced ? false : { y: 60, opacity: 0 }}
                animate={reduced ? undefined : { y: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                {title}
              </motion.h1>
            </div>
            <motion.p
              className="section-subtext mt-4 max-w-2xl text-[#3a3a3a]"
              initial={reduced ? false : { opacity: 0 }}
              animate={reduced ? undefined : { opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              {subtitle}
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
