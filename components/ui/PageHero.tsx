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
      className="relative overflow-hidden border-b border-white/10 bg-[#0a0908] text-white"
      layoutId={!reduced && bannerLayoutId ? bannerLayoutId : undefined}
    >
      <div
        className="absolute inset-0"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(ellipse 90% 70% at 0% 0%, rgba(140,160,175,0.28), transparent 55%), radial-gradient(ellipse 50% 45% at 100% 0%, rgba(211,47,47,0.15), transparent 45%)",
        }}
      />
      <div
        className="absolute inset-0 bg-[repeating-linear-gradient(120deg,transparent,transparent_28px,rgba(255,255,255,0.03)_28px,rgba(255,255,255,0.03)_29px)]"
        aria-hidden
      />
      <div className="absolute -right-24 -top-28 h-[min(100vw,26rem)] w-[min(100vw,26rem)] rounded-full bg-primary/20 blur-3xl" aria-hidden />
      <div className="site-container relative flex min-h-[17rem] flex-col justify-center py-16 sm:min-h-[20rem] lg:min-h-[22rem] lg:py-20">
        {breadcrumbs.length > 0 ? (
          <nav aria-label="Breadcrumb" className="mb-5 flex flex-wrap items-center gap-2 text-sm text-[#c8c8c8]">
            {breadcrumbs.map((crumb, index) => (
              <span key={`${crumb.label}-${index}`} className="inline-flex items-center gap-2">
                {crumb.href ? (
                  <TransitionLink href={crumb.href} className="transition-colors duration-200 hover:text-white">
                    {crumb.label}
                  </TransitionLink>
                ) : (
                  <span className="text-terracotta">{crumb.label}</span>
                )}
                {index < breadcrumbs.length - 1 ? <span className="text-terracotta">›</span> : null}
              </span>
            ))}
          </nav>
        ) : null}
        <p className="section-eyebrow text-terracotta">{label}</p>
        <MaskHeading as="h1" className="max-w-4xl font-heading text-[clamp(2.2rem,5vw,3.8rem)] font-bold tracking-[-0.02em] text-white" delayStart={0.05} wordStagger={0.08}>
          {title}
        </MaskHeading>
        <BodyFadeUp className="mt-4 max-w-2xl text-base leading-relaxed text-white/80">
          <p>{subtitle}</p>
        </BodyFadeUp>
      </div>
    </motion.section>
  );
}
