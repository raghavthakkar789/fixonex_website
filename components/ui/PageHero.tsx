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
    <motion.section className="relative overflow-hidden bg-brand text-white" layoutId={!reduced && bannerLayoutId ? bannerLayoutId : undefined}>
      <div className="absolute inset-0 opacity-25" aria-hidden style={{ backgroundImage: "radial-gradient(circle at 18% 22%, rgba(193,178,164,0.35), transparent 45%)" }} />
      <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-dark opacity-70" aria-hidden />
      <div className="site-container relative flex min-h-[280px] flex-col justify-center py-14 lg:min-h-[360px]">
        {breadcrumbs.length > 0 ? (
          <nav aria-label="Breadcrumb" className="mb-5 flex flex-wrap items-center gap-2 text-sm text-[#c8c8c8]">
            {breadcrumbs.map((crumb, index) => (
              <span key={`${crumb.label}-${index}`} className="inline-flex items-center gap-2">
                {crumb.href ? (
                  <TransitionLink href={crumb.href} className="transition-colors duration-200 hover:text-white">
                    {crumb.label}
                  </TransitionLink>
                ) : (
                  <span className="text-warm">{crumb.label}</span>
                )}
                {index < breadcrumbs.length - 1 ? <span className="text-warm">›</span> : null}
              </span>
            ))}
          </nav>
        ) : null}
        <p className="section-eyebrow text-warm">{label}</p>
        <MaskHeading as="h1" className="max-w-4xl font-display text-[clamp(2.2rem,5vw,3.8rem)] font-bold tracking-[-0.02em] text-white" delayStart={0.05} wordStagger={0.08}>
          {title}
        </MaskHeading>
        <BodyFadeUp className="mt-4 max-w-2xl text-md text-[#e2e2e2]">
          <p>{subtitle}</p>
        </BodyFadeUp>
      </div>
    </motion.section>
  );
}
