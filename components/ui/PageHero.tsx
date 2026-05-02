"use client";

import { motion } from "framer-motion";
import { TransitionLink } from "@/components/navigation/TransitionLink";

type Crumb = { label: string; href?: string };
type PageHeroProps = {
  label: string;
  title: string;
  subtitle: string;
  breadcrumbs?: Crumb[];
  bannerLayoutId?: string;
};

export function PageHero({ label, title, subtitle, breadcrumbs = [], bannerLayoutId }: PageHeroProps) {
  return (
    <motion.section
      className="relative overflow-hidden border-b border-border-strong bg-gradient-to-b from-white via-white to-[#f7f8fb]"
      layoutId={bannerLayoutId}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <div className="pointer-events-none absolute -right-24 top-0 h-64 w-64 rounded-full bg-red-50" aria-hidden />
      <div className="pointer-events-none absolute -left-20 bottom-0 h-48 w-48 rounded-full bg-sky-50" aria-hidden />
      <div className="site-container relative section-pad-md">
        {breadcrumbs.length > 0 ? (
          <nav aria-label="Breadcrumb" className="mb-5 flex flex-wrap items-center gap-2 text-sm text-subhead">
            {breadcrumbs.map((crumb, index) => (
              <span key={`${crumb.label}-${index}`} className="inline-flex items-center gap-2">
                {crumb.href ? (
                  <TransitionLink href={crumb.href} className="hover:text-foreground">
                    {crumb.label}
                  </TransitionLink>
                ) : (
                  <span className="text-foreground">{crumb.label}</span>
                )}
                {index < breadcrumbs.length - 1 ? <span aria-hidden>/</span> : null}
              </span>
            ))}
          </nav>
        ) : null}
        <p className="section-eyebrow">{label}</p>
        <h1 className="mt-2 max-w-4xl text-[clamp(2rem,5vw,3.4rem)] font-bold tracking-tight text-foreground">{title}</h1>
        <p className="section-subtext mt-4">{subtitle}</p>
      </div>
    </motion.section>
  );
}
