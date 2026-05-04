"use client";

import { motion, useReducedMotion } from "framer-motion";
import { TransitionLink } from "@/components/navigation/TransitionLink";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";

const easeExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

type Crumb = { label: string; href?: string };
type PageHeroProps = {
  label: string;
  title: string;
  subtitle: string;
  breadcrumbs?: Crumb[];
  bannerLayoutId?: string;
  image?: string;
};

export function PageHero({ label, title, subtitle, breadcrumbs = [], bannerLayoutId, image }: PageHeroProps) {
  const reduced = useReducedMotion();

  return (
    <motion.section
      className="relative overflow-hidden"
      style={{ minHeight: "22rem" }}
      layoutId={!reduced && bannerLayoutId ? bannerLayoutId : undefined}
    >
      {/* Background image */}
      <ImageWithFallback
        src={image ?? "/images/hero/hero-main.jpeg"}
        alt=""
        fill
        priority
        reveal="none"
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Overlays — same treatment as home hero */}
      <div aria-hidden className="absolute inset-0 bg-black/55" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />

      {/* Content */}
      <div className="site-container relative z-10 flex min-h-[22rem] flex-col justify-center py-16 sm:min-h-[22rem] lg:min-h-[26rem] lg:py-20">

        {/* Breadcrumbs */}
        {breadcrumbs.length > 0 && (
          <motion.nav
            aria-label="Breadcrumb"
            className="mb-6 flex flex-wrap items-center gap-2 text-[12px] text-white/50"
            initial={reduced ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: easeExpo }}
          >
            {breadcrumbs.map((crumb, index) => (
              <span key={`${crumb.label}-${index}`} className="inline-flex items-center gap-2">
                {crumb.href ? (
                  <TransitionLink href={crumb.href} className="transition-colors duration-200 hover:text-white">
                    {crumb.label}
                  </TransitionLink>
                ) : (
                  <span className="text-white/70">{crumb.label}</span>
                )}
                {index < breadcrumbs.length - 1 && (
                  <span className="text-white/30" aria-hidden>›</span>
                )}
              </span>
            ))}
          </motion.nav>
        )}

        {/* Label */}
        <motion.p
          className="mb-4 text-[10px] font-bold uppercase tracking-[0.28em] text-primary drop-shadow-md"
          initial={reduced ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05, ease: easeExpo }}
        >
          {label}
        </motion.p>

        {/* Title */}
        <div className="overflow-hidden">
          <motion.h1
            className="max-w-4xl font-display text-[clamp(2.2rem,5vw,3.75rem)] font-bold leading-[1.05] tracking-[-0.03em] text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]"
            initial={reduced ? false : { y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.1, ease: easeExpo }}
          >
            {title}
          </motion.h1>
        </div>

        {/* Subtitle */}
        <motion.p
          className="mt-5 max-w-2xl text-[15px] leading-relaxed text-zinc-200 drop-shadow-md"
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
