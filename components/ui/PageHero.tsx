"use client";

import { motion, useReducedMotion } from "framer-motion";
import { TransitionLink } from "@/components/navigation/TransitionLink";
import { MaskHeading, BodyFadeUp } from "@/components/ui/MaskHeading";

type Crumb = { label: string; href?: string };
type PageHeroProps = {
  label: string;
  title: string;
  subtitle: string;
  breadcrumbs?: Crumb[];
  /** Framer `layoutId` for shared product card → detail transition */
  bannerLayoutId?: string;
};

export function PageHero({ label, title, subtitle, breadcrumbs = [], bannerLayoutId }: PageHeroProps) {
  const reduced = useReducedMotion();

  return (
    <motion.section
      className="relative border-b border-border-soft bg-white"
      layoutId={!reduced && bannerLayoutId ? bannerLayoutId : undefined}
    >
      <div className="site-container relative flex min-h-[16.5rem] flex-col justify-center py-14 sm:min-h-[19rem] lg:min-h-[20rem] lg:py-[4.25rem]">
        {breadcrumbs.length > 0 ? (
          <nav aria-label="Breadcrumb" className="mb-5 flex flex-wrap items-center gap-2 text-sm text-mid">
            {breadcrumbs.map((crumb, index) => (
              <span key={`${crumb.label}-${index}`} className="inline-flex items-center gap-2">
                {crumb.href ? (
                  <TransitionLink href={crumb.href} className="transition-colors duration-200 hover:text-foreground">
                    {crumb.label}
                  </TransitionLink>
                ) : (
                  <span className="text-foreground">{crumb.label}</span>
                )}
                {index < breadcrumbs.length - 1 ? (
                  <span className="text-terracotta/90" aria-hidden>
                    ›
                  </span>
                ) : null}
              </span>
            ))}
          </nav>
        ) : null}
        <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-primary">{label}</p>
        <MaskHeading
          as="h1"
          className="max-w-4xl font-display text-[clamp(2rem,4.8vw,3.25rem)] font-bold tracking-[-0.02em] text-foreground"
          delayStart={0.05}
          wordStagger={0.08}
        >
          {title}
        </MaskHeading>
        <BodyFadeUp className="mt-4 max-w-2xl text-base leading-relaxed text-mid">
          <p>{subtitle}</p>
        </BodyFadeUp>
      </div>
    </motion.section>
  );
}
