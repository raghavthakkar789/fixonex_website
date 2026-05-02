"use client";

import { motion, useReducedMotion } from "framer-motion";
import { TransitionLink } from "@/components/navigation/TransitionLink";

const easeExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

type Crumb = { label: string; href?: string };
type PageHeroProps = {
  label: string;
  title: string;
  subtitle: string;
  breadcrumbs?: Crumb[];
  bannerLayoutId?: string;
};

export function PageHero({ label, title, subtitle, breadcrumbs = [], bannerLayoutId }: PageHeroProps) {
  const reduced = useReducedMotion();

  return (
    <motion.section
      className="relative overflow-hidden bg-[#09090d]"
      layoutId={!reduced && bannerLayoutId ? bannerLayoutId : undefined}
    >
      {/* Gradient orbs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-[10%] top-[-30%] h-[70%] w-[50%] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(211,47,47,0.18) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[5%] bottom-[-20%] h-[50%] w-[40%] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(234,88,12,0.1) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Top glow line */}
      <div
        aria-hidden
        className="absolute left-[6%] right-[6%] top-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(211,47,47,0.6) 50%, transparent)" }}
      />

      {/* Grain */}
      <div aria-hidden className="grain-noise absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none" />

      {/* Bottom border */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.07) 50%, transparent 100%)" }}
      />

      <div className="site-container relative z-10 flex min-h-[18rem] flex-col justify-center py-16 sm:min-h-[22rem] lg:min-h-[24rem] lg:py-20">
        {/* Breadcrumbs */}
        {breadcrumbs.length > 0 && (
          <motion.nav
            aria-label="Breadcrumb"
            className="mb-6 flex flex-wrap items-center gap-2 text-[12px] text-zinc-600"
            initial={reduced ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: easeExpo }}
          >
            {breadcrumbs.map((crumb, index) => (
              <span key={`${crumb.label}-${index}`} className="inline-flex items-center gap-2">
                {crumb.href ? (
                  <TransitionLink href={crumb.href} className="transition-colors duration-200 hover:text-zinc-300">
                    {crumb.label}
                  </TransitionLink>
                ) : (
                  <span className="text-zinc-400">{crumb.label}</span>
                )}
                {index < breadcrumbs.length - 1 && (
                  <span className="text-zinc-700" aria-hidden>›</span>
                )}
              </span>
            ))}
          </motion.nav>
        )}

        {/* Label */}
        <motion.p
          className="mb-4 text-[10px] font-bold uppercase tracking-[0.25em] text-primary"
          initial={reduced ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05, ease: easeExpo }}
        >
          {label}
        </motion.p>

        {/* Title — clip reveal per word */}
        <div className="overflow-hidden">
          <motion.h1
            className="max-w-4xl font-display text-[clamp(2.2rem,5vw,3.75rem)] font-bold leading-[1.05] tracking-[-0.03em] text-white"
            initial={reduced ? false : { y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.1, ease: easeExpo }}
          >
            {title}
          </motion.h1>
        </div>

        {/* Subtitle */}
        <motion.p
          className="mt-5 max-w-2xl text-[15px] leading-relaxed text-zinc-400"
          initial={reduced ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.22, ease: easeExpo }}
        >
          {subtitle}
        </motion.p>

        {/* Decorative accent line */}
        <motion.div
          className="mt-8 h-px w-16 rounded-full"
          style={{ background: "linear-gradient(90deg, #D32F2F, transparent)" }}
          initial={reduced ? false : { scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.35, ease: easeExpo }}
        />
      </div>
    </motion.section>
  );
}
