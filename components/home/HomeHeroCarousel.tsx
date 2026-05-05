"use client";

import { forwardRef, useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { TransitionLink } from "@/components/navigation/TransitionLink";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { HOME_HERO_SLIDES } from "@/data/home-hero-slides";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { cn } from "@/lib/utils";

const easeExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];
const AUTO_MS = 3000;
const TEXT_DURATION = 0.5;
const BG_DURATION = 0.7;

const slides = HOME_HERO_SLIDES;

/** Product-pack hero slide: dedicated backdrop + grade (see `HomeHeroCarousel` background branch). */
const PU_HERO_SLIDE_ID = "pu-fixo-999";

/** Subtle film grain — data URL, used only on PU hero slide. */
const PU_HERO_GRAIN_SVG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cfilter id='a'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23a)'/%3E%3C/svg%3E";

const bgVariants = {
  enter: { opacity: 0 },
  center: { opacity: 1 },
  exit: { opacity: 0 },
};

const textVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 72 : -72,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({
    x: direction > 0 ? -72 : 72,
    opacity: 0,
  }),
};

type HomeHeroCarouselProps = {
  className?: string;
};

export const HomeHeroCarousel = forwardRef<HTMLElement, HomeHeroCarouselProps>(
  function HomeHeroCarousel({ className }, ref) {
    const reduced = useReducedMotion();
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(1);
    const [pauseHover, setPauseHover] = useState(false);
    const slide = slides[index]!;
    const n = slides.length;
    const isBrand = slide.id === "brand";
    const isPuHeroSlide = slide.id === PU_HERO_SLIDE_ID;

    const go = useCallback((delta: number) => {
      setDirection(delta > 0 ? 1 : -1);
      setIndex((i) => (i + delta + n) % n);
    }, [n]);

    useEffect(() => {
      if (reduced || pauseHover) return;
      const id = window.setInterval(() => {
        setDirection(1);
        setIndex((i) => (i + 1) % n);
      }, AUTO_MS);
      return () => window.clearInterval(id);
    }, [reduced, pauseHover, n, index]);

    const textTransition = reduced
      ? { duration: 0.2 }
      : { duration: TEXT_DURATION, ease: easeExpo };

    const bgTransition = reduced
      ? { duration: 0.2 }
      : { duration: BG_DURATION, ease: easeExpo };

    return (
      <section
        ref={ref}
        className={cn(
          /* Same footprint as pre-carousel home hero (commit 7e9b23f); navbar uses spacer in AppFrame */
          "relative h-[100svh] min-h-[100svh] w-full overflow-hidden text-white",
          className,
        )}
        aria-roledescription="carousel"
        aria-label="Featured FIXONEX solutions"
        onMouseEnter={() => setPauseHover(true)}
        onMouseLeave={() => setPauseHover(false)}
      >
        {/* Background images — crossfade */}
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={slide.id}
              className="absolute inset-0"
              variants={bgVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={bgTransition}
            >
              {isPuHeroSlide ? (
                <>
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-b from-[#14121e] via-[#0c0a12] to-[#060508]"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-90"
                    style={{
                      background:
                        "radial-gradient(ellipse 90% 72% at 50% 42%, rgba(109, 40, 217, 0.22) 0%, transparent 58%), radial-gradient(ellipse 55% 40% at 85% 15%, rgba(34, 211, 238, 0.14) 0%, transparent 45%), radial-gradient(ellipse 45% 35% at 12% 75%, rgba(249, 115, 22, 0.08) 0%, transparent 50%)",
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center px-5 pb-10 pt-16 sm:px-8 sm:pb-12 sm:pt-20">
                    <div className="relative h-[min(76vh,800px)] w-full max-w-5xl">
                      <ImageWithFallback
                        src={slide.image}
                        alt={slide.imageAlt}
                        fill
                        priority={index === 0}
                        reveal="none"
                        sizes="100vw"
                        imageTone="dark"
                        className="object-contain object-center drop-shadow-[0_28px_90px_rgba(0,0,0,0.72)]"
                      />
                    </div>
                  </div>
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_78%_58%_at_50%_48%,transparent_0%,rgba(0,0,0,0.4)_72%,rgba(0,0,0,0.9)_100%)]" />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-amber-400/[0.1] via-transparent to-cyan-300/[0.09]" />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_18%,rgba(255,250,235,0.14)_0%,transparent_38%)]"
                  />
                  {!reduced ? (
                    <motion.div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 mix-blend-overlay"
                      style={{
                        backgroundImage: `url("${PU_HERO_GRAIN_SVG}")`,
                        backgroundRepeat: "repeat",
                        backgroundSize: "280px 280px",
                      }}
                      animate={{ opacity: [0.16, 0.24, 0.16] }}
                      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    />
                  ) : (
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 opacity-[0.18] mix-blend-overlay"
                      style={{
                        backgroundImage: `url("${PU_HERO_GRAIN_SVG}")`,
                        backgroundRepeat: "repeat",
                        backgroundSize: "280px 280px",
                      }}
                    />
                  )}
                  <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_min(120px,12vw)_rgba(0,0,0,0.65)]" />
                </>
              ) : (
                <ImageWithFallback
                  src={slide.image}
                  alt={slide.imageAlt}
                  fill
                  priority={index === 0}
                  reveal="none"
                  sizes="100vw"
                  className="object-cover object-center"
                />
              )}
            </motion.div>
          </AnimatePresence>

          <div
            aria-hidden
            className={cn(
              "absolute inset-0",
              isPuHeroSlide ? "bg-black/38" : "bg-black/55",
            )}
          />
          <div
            aria-hidden
            className={cn(
              "absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30",
              isPuHeroSlide && "from-black/50 via-transparent to-black/22",
            )}
          />

          {/* Prev / Next */}
          <div
            className="pointer-events-none absolute inset-y-0 left-0 right-0 z-20 flex items-center justify-between px-3 sm:px-5"
            aria-hidden={false}
          >
            <button
              type="button"
              onClick={() => go(-1)}
              className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-black/35 text-white backdrop-blur-sm transition-colors hover:bg-black/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black/40 sm:h-12 sm:w-12"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-6 w-6" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-black/35 text-white backdrop-blur-sm transition-colors hover:bg-black/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black/40 sm:h-12 sm:w-12"
              aria-label="Next slide"
            >
              <ChevronRight className="h-6 w-6" aria-hidden />
            </button>
          </div>

          {/* Copy + CTAs — brand: same layout tree as legacy HomeView hero; products: compact bottom-left */}
          <div
            className={cn(
              "absolute inset-0 z-10 flex flex-col",
              isBrand
                ? "items-center justify-center px-4 text-center"
                : "justify-end pb-24 text-left sm:pb-28 md:pb-32 lg:pb-36 xl:pb-44",
            )}
          >
            <p className="sr-only" aria-live="polite">
              Slide {index + 1} of {n}: {slide.titleLine1}
            </p>

            {isBrand ? (
              <AnimatePresence initial={false} mode="wait">
                <motion.div
                  key="brand"
                  className="flex flex-col items-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: easeExpo }}
                >
                    <motion.p
                      className="mb-5 text-[11px] font-bold uppercase tracking-[0.3em] text-primary drop-shadow-md"
                      initial={reduced ? false : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, ease: easeExpo, delay: 0.2 }}
                    >
                      {slide.eyebrow}
                    </motion.p>

                    <h1
                      className="font-display font-black tracking-[-0.03em] drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]"
                      style={{ fontSize: "clamp(3rem, 8vw, 6.5rem)", lineHeight: 1.05 }}
                    >
                      <div className="overflow-hidden">
                        <motion.span
                          className="block text-white"
                          initial={reduced ? false : { y: "100%" }}
                          animate={{ y: "0%" }}
                          transition={{ duration: 0.75, ease: easeExpo, delay: 0.3 }}
                        >
                          {slide.titleLine1}
                        </motion.span>
                      </div>
                      {slide.titleLine2 ? (
                        <div className="overflow-hidden">
                          <motion.span
                            className="block text-primary"
                            initial={reduced ? false : { y: "100%" }}
                            animate={{ y: "0%" }}
                            transition={{ duration: 0.75, ease: easeExpo, delay: 0.42 }}
                          >
                            {slide.titleLine2}
                          </motion.span>
                        </div>
                      ) : null}
                    </h1>

                    <motion.p
                      className="mt-6 max-w-[40ch] text-base leading-relaxed text-zinc-200 drop-shadow-md"
                      initial={reduced ? false : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.7, delay: 0.56 }}
                    >
                      {slide.description}
                    </motion.p>

                    <motion.div
                      className="mt-8 flex flex-wrap justify-center gap-3"
                      initial={reduced ? false : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, ease: easeExpo, delay: 0.66 }}
                    >
                      <TransitionLink
                        href={slide.primaryCta.href}
                        className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-bold text-white shadow-[0_8px_28px_rgba(211,47,47,0.5)] transition-all hover:bg-primary/90"
                      >
                        {slide.primaryCta.label}{" "}
                        <ArrowRight className="h-4 w-4" aria-hidden />
                      </TransitionLink>
                      {slide.secondaryCta ? (
                        <TransitionLink
                          href={slide.secondaryCta.href}
                          className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-8 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition-all hover:bg-white/20"
                        >
                          {slide.secondaryCta.label}
                        </TransitionLink>
                      ) : null}
                    </motion.div>
                  </motion.div>
              </AnimatePresence>
            ) : (
              <div className="site-container w-full sm:pl-12 md:pl-20 lg:pl-32 xl:pl-40">
                <AnimatePresence initial={false} mode="wait">
                  <motion.div
                    key={slide.id}
                    custom={direction}
                    variants={textVariants}
                    initial={reduced ? "center" : "enter"}
                    animate="center"
                    exit={reduced ? "center" : "exit"}
                    transition={textTransition}
                    className="flex w-full max-w-none flex-col items-start"
                  >
                    <p className="mb-3 font-bold uppercase tracking-[0.22em] text-primary drop-shadow-md text-[10px] sm:text-[11px]">
                      {slide.eyebrow}
                    </p>

                    <h1
                      className="font-display font-bold tracking-[-0.03em] text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]"
                      style={{ fontSize: "clamp(1.25rem, 3.8vw, 2.35rem)", lineHeight: 1.12 }}
                    >
                      <span className="block text-white">{slide.titleLine1}</span>
                      {slide.titleLine2 ? (
                        <span className="mt-1 block text-primary">{slide.titleLine2}</span>
                      ) : null}
                    </h1>

                    <p className="mt-3 w-full max-w-none text-left text-pretty text-sm leading-relaxed text-zinc-200 drop-shadow-md sm:mt-4 sm:text-[15px] sm:leading-[1.65]">
                      {slide.description}
                    </p>

                    <div className="mt-5 flex flex-wrap justify-start gap-3 sm:mt-6">
                      <TransitionLink
                        href={slide.primaryCta.href}
                        className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs font-bold text-white shadow-[0_8px_28px_rgba(211,47,47,0.5)] transition-all hover:bg-primary/90 sm:px-6 sm:py-3 sm:text-sm"
                      >
                        {slide.primaryCta.label} <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
                      </TransitionLink>
                      {slide.secondaryCta ? (
                        <TransitionLink
                          href={slide.secondaryCta.href}
                          className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-5 py-2.5 text-xs font-bold text-white backdrop-blur-sm transition-all hover:bg-white/20 sm:px-6 sm:py-3 sm:text-sm"
                        >
                          {slide.secondaryCta.label}
                        </TransitionLink>
                      ) : (
                        <TransitionLink
                          href="/contact"
                          className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-5 py-2.5 text-xs font-bold text-white backdrop-blur-sm transition-all hover:bg-white/20 sm:px-6 sm:py-3 sm:text-sm"
                        >
                          Get in Touch
                        </TransitionLink>
                      )}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            )}
          </div>
    </section>
    );
  },
);
