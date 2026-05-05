"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { TransitionLink } from "@/components/navigation/TransitionLink";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

const easeExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Matches the home hero asset when a page does not pass `image`. */
const DEFAULT_PAGE_HERO_IMAGE = "/images/hero/hero-main.jpeg";

type Crumb = { label: string; href?: string };
type PageHeroProps = {
  label: string;
  title: string;
  subtitle: string;
  breadcrumbs?: Crumb[];
  bannerLayoutId?: string;
  /** Full-bleed background image; defaults to the same main hero as the home page. */
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
  const heroSrc = image ?? DEFAULT_PAGE_HERO_IMAGE;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, 80]);
  const textY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, -30]);

  return (
    <motion.section
      ref={sectionRef}
      className={cn(
        "relative w-full overflow-hidden text-white",
        "min-h-[28rem] lg:min-h-[34rem]",
        sectionClassName,
      )}
      layoutId={!reduced && bannerLayoutId ? bannerLayoutId : undefined}
    >
      {/* Full-bleed background — same layering idea as the home hero */}
      <motion.div
        aria-hidden
        className="absolute inset-0 h-[110%] w-full -top-[5%]"
        style={{ y: imgY }}
      >
        <ImageWithFallback
          src={heroSrc}
          alt=""
          fill
          priority
          reveal="none"
          sizes="100vw"
          className={cn("object-cover object-center", imageClassName)}
        />
      </motion.div>

      {/* Overlays — mirror HomeView hero for readable type */}
      <div aria-hidden className="absolute inset-0 bg-black/55" />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30"
      />

      <div
        className={cn(
          "site-container relative z-10 flex min-h-[28rem] flex-col justify-center py-16 lg:min-h-[34rem] lg:py-20",
          contentClassName,
        )}
      >
        <motion.div style={{ y: textY }} className="max-w-4xl">
          {breadcrumbs.length > 0 && (
            <motion.nav
              aria-label="Breadcrumb"
              className="mb-6 flex flex-wrap items-center gap-1.5 text-[12px] text-zinc-300"
              initial={reduced ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: easeExpo }}
            >
              {breadcrumbs.map((crumb, index) => (
                <span key={`${crumb.label}-${index}`} className="inline-flex items-center gap-1.5">
                  {crumb.href ? (
                    <TransitionLink
                      href={crumb.href}
                      className="font-medium text-zinc-300 transition-colors duration-200 hover:text-white"
                    >
                      {crumb.label}
                    </TransitionLink>
                  ) : (
                    <span className="font-semibold text-zinc-100">{crumb.label}</span>
                  )}
                  {index < breadcrumbs.length - 1 && (
                    <ChevronRight className="h-3 w-3 text-zinc-500" aria-hidden />
                  )}
                </span>
              ))}
            </motion.nav>
          )}

          <motion.p
            className="eyebrow-label mb-5 drop-shadow-md"
            initial={reduced ? false : { opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.05, ease: easeExpo }}
          >
            {label}
          </motion.p>

          <div className="overflow-hidden">
            <motion.h1
              className="max-w-3xl font-display font-bold leading-[1.06] tracking-[-0.04em] text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]"
              style={{ fontSize: "clamp(2.2rem, 5vw, 3.75rem)" }}
              initial={reduced ? false : { y: "100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.1, ease: easeExpo }}
            >
              {title}
            </motion.h1>
          </div>

          <motion.p
            className="mt-5 max-w-xl text-[16px] leading-relaxed text-zinc-200 drop-shadow-md"
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22, ease: easeExpo }}
          >
            {subtitle}
          </motion.p>

          <motion.div
            className="mt-8 h-[3px] w-16 rounded-full bg-gradient-to-r from-primary to-orange-500"
            initial={reduced ? false : { scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            style={{ transformOrigin: "left" }}
            transition={{ duration: 0.9, delay: 0.35, ease: easeExpo }}
          />
        </motion.div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
      />
    </motion.section>
  );
}
