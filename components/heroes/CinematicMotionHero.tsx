"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import {
  Award,
  ChevronRight,
  Handshake,
  Headphones,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import { TransitionLink } from "@/components/navigation/TransitionLink";
import { BRAND } from "@/lib/brand";
import { cn } from "@/lib/utils";

const easeExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

const GRAIN_SVG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E";

export type CinematicHeroVariant = "about" | "service" | "why" | "support" | "contact" | "partner";

type Crumb = { label: string; href?: string };

export type CinematicMotionHeroProps = {
  variant: CinematicHeroVariant;
  label: string;
  titleLine1: string;
  titleLine2: string;
  subtitle: string;
  breadcrumbs?: Crumb[];
  sectionClassName?: string;
};

const accentTitle: Record<CinematicHeroVariant, string> = {
  about: "text-primary",
  service: "text-teal-400",
  why: "text-amber-400",
  support: "text-sky-400",
  contact: "text-rose-400",
  partner: "text-violet-400",
};

function MotionBackdrop({
  variant,
  reduced,
}: {
  variant: CinematicHeroVariant;
  reduced: boolean;
}) {
  if (reduced) {
    const map: Record<CinematicHeroVariant, string> = {
      about: "from-zinc-950 via-[#141118] to-zinc-950",
      service: "from-slate-950 via-[#0d1816] to-slate-950",
      why: "from-stone-950 via-[#1a1510] to-stone-950",
      support: "from-slate-950 via-[#0f1729] to-slate-950",
      contact: "from-zinc-950 via-[#1a1014] to-zinc-950",
      partner: "from-zinc-950 via-[#161025] to-zinc-950",
    };
    return (
      <div
        aria-hidden
        className={cn("absolute inset-0 bg-gradient-to-br", map[variant])}
      />
    );
  }

  switch (variant) {
    case "about":
      return (
        <>
          <div aria-hidden className="absolute inset-0 bg-[#09080b]" />
          <motion.div
            aria-hidden
            className="absolute -left-[20%] top-[-15%] h-[70%] w-[70%] rounded-full bg-primary/[0.18] blur-[120px]"
            animate={{ x: [0, 40, -20, 0], y: [0, 30, -25, 0], scale: [1, 1.08, 1.02, 1] }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden
            className="absolute -right-[25%] bottom-[-20%] h-[75%] w-[75%] rounded-full bg-orange-500/[0.12] blur-[130px]"
            animate={{ x: [0, -35, 25, 0], y: [0, -40, 20, 0], scale: [1, 1.05, 0.98, 1] }}
            transition={{ duration: 26, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
          <motion.div
            aria-hidden
            className="absolute left-[30%] top-[40%] h-[45%] w-[45%] rounded-full bg-teal-500/[0.09] blur-[100px]"
            animate={{ x: [0, 50, -35, 0], y: [0, -30, 45, 0], opacity: [0.5, 0.85, 0.5] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
          <motion.div
            aria-hidden
            className="absolute inset-0 opacity-40"
            style={{
              background:
                "linear-gradient(105deg, transparent 0%, rgba(255,255,255,0.04) 45%, transparent 55%)",
              backgroundSize: "200% 100%",
            }}
            animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
            transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
          />
        </>
      );
    case "service":
      return (
        <>
          <div aria-hidden className="absolute inset-0 bg-[#070c0b]" />
          <motion.div
            aria-hidden
            className="absolute left-[-15%] top-[10%] h-[65%] w-[65%] rounded-full bg-teal-500/[0.2] blur-[110px]"
            animate={{ rotate: [0, 360], scale: [1, 1.06, 1] }}
            transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            aria-hidden
            className="absolute right-[-20%] bottom-[-10%] h-[70%] w-[70%] rounded-full bg-emerald-400/[0.14] blur-[120px]"
            animate={{ x: [0, -30, 20, 0], y: [0, 25, -20, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden
            className="absolute inset-0 opacity-[0.12]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(-12deg, transparent, transparent 38px, rgba(45,212,191,0.06) 38px, rgba(45,212,191,0.06) 39px)",
            }}
            animate={{ x: [0, 80, 0] }}
            transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
          />
        </>
      );
    case "why":
      return (
        <>
          <div aria-hidden className="absolute inset-0 bg-[#0c0a08]" />
          <motion.div
            aria-hidden
            className="absolute -left-[10%] top-[-20%] h-[80%] w-[80%] rounded-full bg-amber-500/[0.15] blur-[140px]"
            animate={{ scale: [1, 1.12, 1], opacity: [0.6, 0.9, 0.6] }}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden
            className="absolute right-[-15%] bottom-[-25%] h-[70%] w-[70%] rounded-full bg-orange-600/[0.12] blur-[110px]"
            animate={{ rotate: [0, -360] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          />
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              aria-hidden
              className="absolute left-1/2 top-1/2 h-[120%] w-[2px] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-transparent via-amber-400/20 to-transparent"
              style={{ rotate: `${i * 60}deg` }}
              animate={{ opacity: [0.2, 0.55, 0.2] }}
              transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
            />
          ))}
        </>
      );
    case "support":
      return (
        <>
          <div aria-hidden className="absolute inset-0 bg-[#080c14]" />
          <motion.div
            aria-hidden
            className="absolute -right-[10%] top-[-15%] h-[75%] w-[75%] rounded-full bg-sky-500/[0.16] blur-[130px]"
            animate={{ x: [0, -40, 25, 0], y: [0, 30, -15, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden
            className="absolute -left-[20%] bottom-[-10%] h-[60%] w-[60%] rounded-full bg-indigo-500/[0.14] blur-[100px]"
            animate={{ opacity: [0.45, 0.8, 0.45] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden
            className="absolute inset-0 opacity-20"
            style={{
              background:
                "radial-gradient(circle at 30% 40%, rgba(56,189,248,0.15) 0%, transparent 50%), radial-gradient(circle at 70% 60%, rgba(99,102,241,0.12) 0%, transparent 45%)",
            }}
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      );
    case "contact":
      return (
        <>
          <div aria-hidden className="absolute inset-0 bg-[#100a0c]" />
          <motion.div
            aria-hidden
            className="absolute left-1/2 top-1/2 h-[90%] w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose-500/[0.12] blur-[100px]"
            animate={{ scale: [0.95, 1.05, 0.95] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden
            className="absolute -right-[25%] top-[5%] h-[55%] w-[55%] rounded-full bg-orange-500/[0.1] blur-[90px]"
            animate={{ x: [0, 45, -20, 0] }}
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          />
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              aria-hidden
              className="absolute left-1/2 top-[48%] h-[min(85vw,420px)] w-[min(85vw,420px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-rose-400/[0.12]"
              initial={false}
              animate={{ scale: [0.3 + i * 0.25, 1.05 + i * 0.08], opacity: [0.5, 0] }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeOut",
                delay: i * 1.1,
              }}
            />
          ))}
        </>
      );
    case "partner":
      return (
        <>
          <div aria-hidden className="absolute inset-0 bg-[#0b0812]" />
          <motion.div
            aria-hidden
            className="absolute -left-[15%] top-[15%] h-[70%] w-[70%] rounded-full bg-violet-600/[0.16] blur-[125px]"
            animate={{ y: [0, 35, -25, 0], x: [0, 20, -15, 0] }}
            transition={{ duration: 21, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden
            className="absolute -right-[20%] bottom-[-15%] h-[65%] w-[65%] rounded-full bg-fuchsia-500/[0.1] blur-[115px]"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          />
          <div aria-hidden className="absolute inset-0 opacity-[0.08] dot-grid-subtle" />
        </>
      );
    default:
      return null;
  }
}

function HeroStage({
  variant,
  reduced,
}: {
  variant: CinematicHeroVariant;
  reduced: boolean;
}) {
  const iconShell =
    "relative z-[1] flex h-24 w-24 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] shadow-[0_0_60px_rgba(255,255,255,0.06)] sm:h-28 sm:w-28";

  switch (variant) {
    case "about":
      return (
        <motion.div
          className="relative flex min-h-[240px] items-center justify-center lg:min-h-[320px]"
          initial={reduced ? false : { opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: easeExpo }}
        >
          {!reduced ? (
            <>
              <motion.div
                aria-hidden
                className="absolute h-[min(72vw,380px)] w-[min(72vw,380px)] rounded-full border border-white/[0.08]"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 48, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                aria-hidden
                className="absolute h-[min(62vw,320px)] w-[min(62vw,320px)] rounded-full border border-primary/20"
                animate={{ rotate: [0, -360] }}
                transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                aria-hidden
                className="absolute h-[min(48vw,240px)] w-[min(48vw,240px)] rounded-full border border-white/[0.06]"
                animate={{ scale: [1, 1.04, 1], opacity: [0.4, 0.65, 0.4] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
            </>
          ) : null}
          <motion.div
            className="relative z-[1]"
            animate={reduced ? undefined : { y: [0, -10, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          >
            <div
              className="relative h-28 w-[220px] sm:h-32 sm:w-[260px]"
              style={{
                filter: reduced
                  ? undefined
                  : "drop-shadow(0 0 40px rgba(211,47,47,0.35)) drop-shadow(0 25px 50px rgba(0,0,0,0.5))",
              }}
            >
              <Image
                src="/images/misc/logo.png"
                alt={`${BRAND.name} logo`}
                fill
                priority
                className="object-contain"
                sizes="(min-width: 1024px) 260px, 220px"
              />
            </div>
          </motion.div>
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-3xl border border-white/[0.06]"
            animate={reduced ? undefined : { opacity: [0.35, 0.65, 0.35] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      );
    case "service":
      return (
        <div className="relative flex min-h-[240px] items-center justify-center lg:min-h-[320px]">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              aria-hidden
              className={cn(
                "absolute rounded-full border border-dashed border-teal-400/30",
                i === 0 && "h-[min(68vw,340px)] w-[min(68vw,340px)]",
                i === 1 && "h-[min(54vw,280px)] w-[min(54vw,280px)] border-teal-300/25",
                i === 2 && "h-[min(40vw,200px)] w-[min(40vw,200px)] border-emerald-400/20",
              )}
              animate={{ rotate: i % 2 === 0 ? [0, 360] : [0, -360] }}
              transition={{
                duration: 28 + i * 8,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
          <motion.div
            className={iconShell}
            animate={reduced ? undefined : { scale: [1, 1.04, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Sparkles className="h-11 w-11 text-teal-300 sm:h-12 sm:w-12" aria-hidden />
          </motion.div>
        </div>
      );
    case "why":
      return (
        <div className="relative flex min-h-[240px] items-center justify-center lg:min-h-[320px]">
          <motion.div
            aria-hidden
            className="absolute h-[min(72vw,360px)] w-[min(72vw,360px)] rounded-full border border-amber-400/20"
            animate={{ rotate: [0, 360], scale: [1, 1.03, 1] }}
            transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            aria-hidden
            className="absolute h-[min(58vw,280px)] w-[min(58vw,280px)] rounded-full border-2 border-transparent border-t-amber-400/50 border-r-orange-500/30"
            animate={{ rotate: [0, -360] }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className={iconShell}
            animate={
              reduced
                ? undefined
                : {
                    boxShadow: [
                      "0 0 40px rgba(251,191,36,0.15)",
                      "0 0 80px rgba(251,191,0.35)",
                      "0 0 40px rgba(251,191,36,0.15)",
                    ],
                  }
            }
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Award className="h-11 w-11 text-amber-300 sm:h-12 sm:w-12" aria-hidden />
          </motion.div>
        </div>
      );
    case "support":
      return (
        <div className="relative flex min-h-[240px] flex-col items-center justify-center gap-6 lg:min-h-[320px]">
          <div className="flex h-28 items-end justify-center gap-2 sm:h-32 sm:gap-3">
            {[0.35, 0.55, 0.85, 0.65, 0.45].map((base, i) => (
              <motion.div
                key={i}
                aria-hidden
                className="w-2 rounded-full bg-gradient-to-t from-sky-600 to-sky-300 sm:w-2.5"
                animate={
                  reduced
                    ? { height: `${base * 100}px` }
                    : {
                        height: [`${base * 70}px`, `${base * 110}px`, `${base * 70}px`],
                      }
                }
                transition={{ duration: 1.2 + i * 0.07, repeat: Infinity, ease: "easeInOut", delay: i * 0.08 }}
              />
            ))}
          </div>
          <motion.div className={iconShell} animate={reduced ? undefined : { y: [0, -6, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
            <Headphones className="h-11 w-11 text-sky-300 sm:h-12 sm:w-12" aria-hidden />
          </motion.div>
        </div>
      );
    case "contact":
      return (
        <div className="relative flex min-h-[240px] items-center justify-center lg:min-h-[320px]">
          <motion.div
            aria-hidden
            className="absolute flex h-[min(64vw,300px)] w-[min(64vw,300px)] items-center justify-center rounded-full bg-rose-500/10 blur-xl"
            animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className={cn(iconShell, "rounded-full border-rose-400/25")}
            animate={reduced ? undefined : { scale: [1, 1.05, 1] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <MessageCircle className="h-11 w-11 text-rose-300 sm:h-12 sm:w-12" aria-hidden />
          </motion.div>
        </div>
      );
    case "partner":
      return (
        <div className="relative flex min-h-[240px] items-center justify-center lg:min-h-[320px]">
          <motion.div
            aria-hidden
            className="absolute h-[min(72vw,380px)] w-[min(72vw,380px)] rounded-full border border-dashed border-violet-400/35"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 48, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            aria-hidden
            className="absolute h-[min(56vw,300px)] w-[min(56vw,300px)] rounded-full border border-violet-400/20"
            animate={{ rotate: [0, -360] }}
            transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
          />
          {[
            { cx: 70, cy: 70 },
            { cx: 130, cy: 75 },
            { cx: 100, cy: 130 },
          ].map((p, i) => (
            <motion.div
              key={i}
              aria-hidden
              className="absolute h-3 w-3 rounded-full bg-violet-400"
              style={{
                left: `calc(50% + ${(p.cx - 100) * 0.55}px)`,
                top: `calc(50% + ${(p.cy - 100) * 0.55}px)`,
              }}
              animate={{ opacity: [0.35, 1, 0.35], scale: [0.85, 1.15, 0.85] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: i * 0.35 }}
            />
          ))}
          <motion.div
            className={cn(iconShell, "border-violet-400/25")}
            animate={reduced ? undefined : { rotate: [0, 6, -6, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          >
            <Handshake className="h-11 w-11 text-violet-300 sm:h-12 sm:w-12" aria-hidden />
          </motion.div>
        </div>
      );
    default:
      return null;
  }
}

export function CinematicMotionHero({
  variant,
  label,
  titleLine1,
  titleLine2,
  subtitle,
  breadcrumbs = [],
  sectionClassName,
}: CinematicMotionHeroProps) {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const textY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, -36]);
  const stageScale = useTransform(scrollYProgress, [0, 1], reduced ? [1, 1] : [1, 0.94]);
  const backdropY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, 48]);

  const accent = accentTitle[variant];
  const eyebrowTone: Record<CinematicHeroVariant, string> = {
    about: "text-primary drop-shadow-[0_0_24px_rgba(211,47,47,0.35)]",
    service: "text-teal-400 drop-shadow-[0_0_20px_rgba(45,212,191,0.35)]",
    why: "text-amber-400 drop-shadow-[0_0_20px_rgba(251,191,36,0.3)]",
    support: "text-sky-400 drop-shadow-[0_0_20px_rgba(56,189,248,0.3)]",
    contact: "text-rose-400 drop-shadow-[0_0_20px_rgba(251,113,133,0.35)]",
    partner: "text-violet-400 drop-shadow-[0_0_20px_rgba(167,139,250,0.35)]",
  };
  const barGradient: Record<CinematicHeroVariant, string> = {
    about: "from-primary via-orange-400 to-amber-300 shadow-[0_0_20px_rgba(211,47,47,0.45)]",
    service: "from-teal-400 via-emerald-400 to-cyan-300 shadow-[0_0_20px_rgba(45,212,191,0.35)]",
    why: "from-amber-400 via-orange-500 to-yellow-300 shadow-[0_0_20px_rgba(251,191,36,0.35)]",
    support: "from-sky-400 via-indigo-400 to-violet-400 shadow-[0_0_20px_rgba(56,189,248,0.3)]",
    contact: "from-rose-500 via-pink-400 to-orange-300 shadow-[0_0_20px_rgba(251,113,133,0.35)]",
    partner: "from-violet-500 via-fuchsia-500 to-pink-400 shadow-[0_0_20px_rgba(167,139,250,0.35)]",
  };

  return (
    <motion.section
      ref={sectionRef}
      className={cn(
        "relative w-full overflow-hidden text-white",
        "min-h-[32rem] lg:min-h-[40rem]",
        sectionClassName,
      )}
    >
      <motion.div className="absolute inset-0" style={{ y: backdropY }}>
        <MotionBackdrop variant={variant} reduced={!!reduced} />
        {variant === "about" && !reduced ? (
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage: `
            linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)
          `,
              backgroundSize: "56px 56px",
            }}
          />
        ) : null}
      </motion.div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_85%_70%_at_50%_40%,transparent_0%,rgba(0,0,0,0.5)_75%,rgba(0,0,0,0.92)_100%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/50"
      />

      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 mix-blend-overlay",
          reduced ? "opacity-[0.12]" : "opacity-[0.18]",
        )}
        style={{
          backgroundImage: `url("${GRAIN_SVG}")`,
          backgroundRepeat: "repeat",
          backgroundSize: "240px 240px",
        }}
      />

      <div className="site-container relative z-10 grid min-h-[32rem] gap-12 py-16 lg:min-h-[40rem] lg:grid-cols-[1fr,minmax(260px,400px)] lg:items-center lg:gap-16 lg:py-20">
        <motion.div style={{ y: textY }} className="flex flex-col justify-center">
          {breadcrumbs.length > 0 && (
            <motion.nav
              aria-label="Breadcrumb"
              className="mb-6 flex flex-wrap items-center gap-1.5 text-[12px] text-zinc-400"
              initial={reduced ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: easeExpo }}
            >
              {breadcrumbs.map((crumb, index) => (
                <span key={`${crumb.label}-${index}`} className="inline-flex items-center gap-1.5">
                  {crumb.href ? (
                    <TransitionLink
                      href={crumb.href}
                      className="font-medium text-zinc-400 transition-colors hover:text-white"
                    >
                      {crumb.label}
                    </TransitionLink>
                  ) : (
                    <span className="font-semibold text-zinc-200">{crumb.label}</span>
                  )}
                  {index < breadcrumbs.length - 1 && (
                    <ChevronRight className="h-3 w-3 text-zinc-600" aria-hidden />
                  )}
                </span>
              ))}
            </motion.nav>
          )}

          <motion.p
            className={cn(
              "mb-4 text-[11px] font-bold uppercase tracking-[0.35em]",
              eyebrowTone[variant],
            )}
            initial={reduced ? false : { opacity: 0, letterSpacing: "0.5em" }}
            animate={{ opacity: 1, letterSpacing: "0.35em" }}
            transition={{ duration: 0.9, ease: easeExpo }}
          >
            {label}
          </motion.p>

          <div className="overflow-hidden">
            <motion.h1
              className="font-display font-black tracking-[-0.04em] text-white drop-shadow-[0_4px_32px_rgba(0,0,0,0.9)]"
              style={{ fontSize: "clamp(2.75rem, 8vw, 4.25rem)", lineHeight: 1.02 }}
              initial={reduced ? false : { opacity: 0, y: "100%" }}
              animate={{ opacity: 1, y: "0%" }}
              transition={{ duration: 0.85, delay: 0.08, ease: easeExpo }}
            >
              <span className="block">{titleLine1}</span>
              <motion.span
                className={cn("block", accent)}
                initial={reduced ? false : { opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: easeExpo }}
              >
                {titleLine2}
              </motion.span>
            </motion.h1>
          </div>

          <motion.p
            className="mt-6 max-w-xl text-[15px] leading-relaxed text-zinc-300 drop-shadow-md"
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.35, ease: easeExpo }}
          >
            {subtitle}
          </motion.p>

          <motion.div
            className={cn(
              "mt-8 h-[3px] w-24 rounded-full bg-gradient-to-r",
              barGradient[variant],
            )}
            initial={reduced ? false : { scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            style={{ transformOrigin: "left" }}
            transition={{ duration: 1, delay: 0.45, ease: easeExpo }}
          />
        </motion.div>

        <motion.div style={{ scale: stageScale }}>
          <HeroStage variant={variant} reduced={!!reduced} />
        </motion.div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
      />
    </motion.section>
  );
}
