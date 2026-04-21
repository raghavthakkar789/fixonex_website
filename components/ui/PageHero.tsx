"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

type Crumb = { label: string; href?: string };
type PageHeroProps = {
  label: string;
  title: string;
  subtitle: string;
  breadcrumbs?: Crumb[];
};

export function PageHero({ label, title, subtitle, breadcrumbs = [] }: PageHeroProps) {
  const reduced = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-brand text-white">
      <div className="absolute inset-0 opacity-25" aria-hidden style={{ backgroundImage: "radial-gradient(circle at 18% 22%, rgba(193,178,164,0.35), transparent 45%)" }} />
      <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-dark opacity-70" aria-hidden />
      <div className="site-container relative flex min-h-[280px] flex-col justify-center py-14 lg:min-h-[360px]">
        {breadcrumbs.length > 0 ? (
          <nav aria-label="Breadcrumb" className="mb-5 flex flex-wrap items-center gap-2 text-sm text-[#c8c8c8]">
            {breadcrumbs.map((crumb, index) => (
              <span key={`${crumb.label}-${index}`} className="inline-flex items-center gap-2">
                {crumb.href ? (
                  <Link href={crumb.href} className="transition-colors hover:text-white">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-warm">{crumb.label}</span>
                )}
                {index < breadcrumbs.length - 1 ? <span className="text-warm">›</span> : null}
              </span>
            ))}
          </nav>
        ) : null}
        <p className="section-eyebrow text-warm">{label}</p>
        <motion.h1 initial={reduced ? false : { y: 24, opacity: 0 }} animate={reduced ? undefined : { y: 0, opacity: 1 }} transition={{ duration: 0.55, ease: [0, 0, 0.2, 1] }} className="max-w-4xl font-display text-[clamp(2.2rem,5vw,3.8rem)] font-bold tracking-[-0.02em] text-white">
          {title}
        </motion.h1>
        <motion.p initial={reduced ? false : { y: 18, opacity: 0 }} animate={reduced ? undefined : { y: 0, opacity: 1 }} transition={{ duration: 0.55, delay: 0.08, ease: [0, 0, 0.2, 1] }} className="mt-4 max-w-2xl text-md text-[#e2e2e2]">
          {subtitle}
        </motion.p>
      </div>
    </section>
  );
}
