"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { TransitionLink } from "@/components/navigation/TransitionLink";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

const easeExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

type Crumb = { label: string; href?: string };
type PageHeroProps = {
  label: string;
  title: string;
  subtitle: string;
  breadcrumbs?: Crumb[];
  bannerLayoutId?: string;
  image?: string;
  imageClassName?: string;
  sectionClassName?: string;
  contentClassName?: string;
};

export function PageHero({
  label,
  title,
  subtitle,
  breadcrumbs = [],
  bannerLayoutId,
  image,
  imageClassName,
  sectionClassName,
  contentClassName,
}: PageHeroProps) {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, 60]);
  const textY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, -30]);

  return (
    <motion.section
      ref={sectionRef}
      className={cn(
        "relative overflow-hidden bg-gradient-to-br from-[#fdfcfb] via-[#faf7f5] to-[#f4f0ec]",
        "min-h-[28rem] lg:min-h-[34rem]",
        sectionClassName,
      )}
      layoutId={!reduced && bannerLayoutId ? bannerLayoutId : undefined}
    >
      {/* Background decorative elements */}
      <div aria-hidden className="pointer-events-none absolute inset-0 dot-grid-subtle opacity-50" />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[10%] top-[-20%] h-[70%] w-[55%] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(211,47,47,0.07) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-[10%] bottom-[-10%] h-[50%] w-[40%] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(13,148,136,0.06) 0%, transparent 70%)",
          filter: "blur(70px)",
        }}
      />

      {/* Animated line top */}
      <div
        aria-hidden
        className="absolute left-0 right-0 top-0 h-[2px]"
        style={{ background: "linear-gradient(90deg, transparent 5%, rgba(211,47,47,0.6) 50%, transparent 95%)" }}
      />

      <div
        className={cn(
          "site-container relative z-10 grid min-h-[28rem] gap-10 py-16 lg:min-h-[34rem] lg:grid-cols-[1fr_0.9fr] lg:items-center lg:py-20",
          contentClassName,
        )}
      >
        {/* Left: Text content */}
        <motion.div style={{ y: textY }}>
          {/* Breadcrumbs */}
          {breadcrumbs.length > 0 && (
            <motion.nav
              aria-label="Breadcrumb"
              className="mb-6 flex flex-wrap items-center gap-1.5 text-[12px] text-zinc-400"
              initial={reduced ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: easeExpo }}
            >
              {breadcrumbs.map((crumb, index) => (
                <span key={`${crumb.label}-${index}`} className="inline-flex items-center gap-1.5">
                  {crumb.href ? (
                    <TransitionLink
                      href={crumb.href}
                      className="transition-colors duration-200 hover:text-primary font-medium"
                    >
                      {crumb.label}
                    </TransitionLink>
                  ) : (
                    <span className="text-zinc-600 font-semibold">{crumb.label}</span>
                  )}
                  {index < breadcrumbs.length - 1 && (
                    <ChevronRight className="h-3 w-3 text-zinc-300" aria-hidden />
                  )}
                </span>
              ))}
            </motion.nav>
          )}

          {/* Label */}
          <motion.p
            className="eyebrow-label mb-5"
            initial={reduced ? false : { opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.05, ease: easeExpo }}
          >
            {label}
          </motion.p>

          {/* Title */}
          <div className="overflow-hidden">
            <motion.h1
              className="max-w-3xl font-display font-bold leading-[1.06] tracking-[-0.04em] text-zinc-950"
              style={{ fontSize: "clamp(2.2rem, 5vw, 3.75rem)" }}
              initial={reduced ? false : { y: "100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.1, ease: easeExpo }}
            >
              {title}
            </motion.h1>
          </div>

          {/* Subtitle */}
          <motion.p
            className="mt-5 max-w-xl text-[16px] leading-relaxed text-zinc-500"
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22, ease: easeExpo }}
          >
            {subtitle}
          </motion.p>

          {/* Accent line */}
          <motion.div
            className="mt-8 h-[3px] w-16 rounded-full bg-gradient-to-r from-primary to-orange-500"
            initial={reduced ? false : { scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            style={{ transformOrigin: "left" }}
            transition={{ duration: 0.9, delay: 0.35, ease: easeExpo }}
          />
        </motion.div>

        {/* Right: Image with decorative frame */}
        {image && (
          <motion.div
            className="relative hidden lg:block"
            initial={reduced ? false : { opacity: 0, x: 40, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: easeExpo }}
            style={{ y: imgY }}
          >
            {/* Decorative rings */}
            <div
              aria-hidden
              className="absolute -right-6 -top-6 h-32 w-32 rounded-full border border-primary/15"
            />
            <div
              aria-hidden
              className="absolute -left-4 -bottom-4 h-20 w-20 rounded-full border border-teal-500/20"
            />

            {/* Main image */}
            <div className="relative overflow-hidden rounded-3xl shadow-[0_24px_64px_rgba(0,0,0,0.12)] aspect-[4/3]">
              <ImageWithFallback
                src={image}
                alt=""
                fill
                priority
                reveal="none"
                sizes="(max-width: 1024px) 0vw, 40vw"
                className={cn("object-cover object-center transition-transform duration-700 group-hover:scale-105", imageClassName)}
              />
              {/* Subtle gradient on image */}
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-tl from-primary/5 via-transparent to-transparent"
              />
            </div>

            {/* Floating badge */}
            <motion.div
              className="absolute -bottom-5 -left-6 rounded-2xl border border-zinc-200/80 bg-white p-4 shadow-[0_8px_32px_rgba(0,0,0,0.1)]"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-500">FIXONEX</p>
              <p className="mt-0.5 font-display text-sm font-bold text-zinc-900">Simply strong.</p>
            </motion.div>
          </motion.div>
        )}
      </div>

      {/* Bottom border */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent"
      />
    </motion.section>
  );
}
