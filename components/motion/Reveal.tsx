"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

const expo = [0.16, 1, 0.3, 1] as const;
const circ = [0.0, 0.55, 0.45, 1] as const;
const inOut = [0.76, 0, 0.24, 1] as const;

type ViewOpts = { once?: boolean; margin?: string; amount?: number };
const DEFAULT_VIEW: ViewOpts = { once: true, margin: "-10%", amount: 0.2 };

/* ─── Reveal ─────────────────────────────────────────────────────────────── */

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
};

export function Reveal({ children, className, delay = 0, y = 32, duration = 0.7 }: RevealProps) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={DEFAULT_VIEW}
      transition={{ duration, ease: expo, delay }}
    >
      {children}
    </motion.div>
  );
}

/* ─── ClipReveal ─────────────────────────────────────────────────────────── */

type ClipDirection = "bottom" | "top" | "left" | "right";

const clipInitial: Record<ClipDirection, string> = {
  bottom: "inset(100% 0 0 0)",
  top: "inset(0 0 100% 0)",
  left: "inset(0 100% 0 0)",
  right: "inset(0 0 0 100%)",
};

type ClipRevealProps = {
  children: ReactNode;
  className?: string;
  direction?: ClipDirection;
  delay?: number;
  duration?: number;
};

export function ClipReveal({ children, className, direction = "bottom", delay = 0, duration = 0.75 }: ClipRevealProps) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ clipPath: clipInitial[direction], opacity: 0 }}
      whileInView={{ clipPath: "inset(0% 0 0 0)", opacity: 1 }}
      viewport={DEFAULT_VIEW}
      transition={{ duration, ease: circ, delay }}
    >
      {children}
    </motion.div>
  );
}

/* ─── SplitReveal — word-by-word text animation ──────────────────────────── */

type SplitRevealProps = {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
};

export function SplitReveal({
  text,
  className,
  wordClassName,
  delay = 0,
  stagger = 0.055,
  duration = 0.75,
  as: Tag = "span",
}: SplitRevealProps) {
  const reduced = useReducedMotion();
  const words = text.split(" ");

  if (reduced) return <Tag className={className}>{text}</Tag>;

  return (
    <Tag className={cn("inline", className)}>
      <motion.span
        className="inline"
        initial="hidden"
        whileInView="show"
        viewport={DEFAULT_VIEW}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: stagger, delayChildren: delay } },
        }}
      >
        {words.map((word, i) => (
          <span key={`${word}-${i}`} className="inline-block overflow-hidden">
            <motion.span
              className={cn("inline-block", wordClassName)}
              variants={{
                hidden: { y: "110%", opacity: 0 },
                show: { y: "0%", opacity: 1, transition: { duration, ease: expo } },
              }}
            >
              {word}
            </motion.span>
            {i < words.length - 1 ? " " : ""}
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}

/* ─── LineReveal — animated horizontal line ─────────────────────────────── */

type LineRevealProps = {
  className?: string;
  delay?: number;
  duration?: number;
  color?: string;
};

export function LineReveal({ className, delay = 0, duration = 0.9, color }: LineRevealProps) {
  const reduced = useReducedMotion();
  if (reduced) return <hr className={className} />;
  return (
    <motion.div
      className={cn("h-px origin-left", className)}
      style={{ background: color ?? "rgba(24,24,27,0.15)" }}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={DEFAULT_VIEW}
      transition={{ duration, ease: expo, delay }}
    />
  );
}

/* ─── CountUp — number reveal animation ─────────────────────────────────── */

type CountUpProps = {
  value: string;
  suffix?: string;
  className?: string;
  delay?: number;
};

export function CountUp({ value, suffix = "", className, delay = 0 }: CountUpProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });
  const [displayed, setDisplayed] = useState("0");
  const isNumeric = /^\d+(\.\d+)?$/.test(value);
  const target = isNumeric ? parseFloat(value) : 0;

  useEffect(() => {
    if (!inView || reduced || !isNumeric) {
      setDisplayed(value);
      return;
    }
    let start = 0;
    const totalDuration = 1400;
    const startTime = performance.now() + delay * 1000;

    function tick(now: number) {
      if (now < startTime) {
        requestAnimationFrame(tick);
        return;
      }
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / totalDuration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      const current = Math.round(eased * target);
      setDisplayed(String(current));
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [inView, target, isNumeric, value, delay, reduced]);

  if (reduced) return <span className={className}>{value}{suffix}</span>;

  return (
    <span ref={ref} className={cn("overflow-hidden inline-block", className)}>
      <motion.span
        className="inline-block"
        initial={{ y: "60%", opacity: 0 }}
        animate={inView ? { y: "0%", opacity: 1 } : {}}
        transition={{ duration: 0.6, ease: expo, delay }}
      >
        {displayed}{suffix}
      </motion.span>
    </span>
  );
}

/* ─── Stagger / StaggerItem ─────────────────────────────────────────────── */

type StaggerProps = {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
};

export function Stagger({ children, className, stagger = 0.07, delay = 0.06 }: StaggerProps) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10%" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {children}
    </motion.div>
  );
}

type StaggerItemProps = {
  children: ReactNode;
  className?: string;
  y?: number;
};

export function StaggerItem({ children, className, y = 24 }: StaggerItemProps) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: expo } },
      }}
    >
      {children}
    </motion.div>
  );
}

/* ─── ParallaxSection — scroll-linked vertical offset ───────────────────── */

type ParallaxSectionProps = {
  children: ReactNode;
  className?: string;
  speed?: number;
};

export function ParallaxSection({ children, className, speed = 0.15 }: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [-40 * speed * 10, 40 * speed * 10]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}

/* ─── FadeGroup — staggered opacity reveals ─────────────────────────────── */

type FadeGroupProps = {
  children: ReactNode;
  className?: string;
  stagger?: number;
};

export function FadeGroup({ children, className, stagger = 0.08 }: FadeGroupProps) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-8%" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: 0.1 } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function FadeGroupItem({ children, className }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: expo } },
      }}
    >
      {children}
    </motion.div>
  );
}

/* ─── ScaleReveal — scale + fade for images / cards ─────────────────────── */

type ScaleRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  scale?: number;
};

export function ScaleReveal({ children, className, delay = 0, scale = 0.93 }: ScaleRevealProps) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={DEFAULT_VIEW}
      transition={{ duration: 0.85, ease: expo, delay }}
    >
      {children}
    </motion.div>
  );
}

/* ─── SlideReveal — directional slide + fade ────────────────────────────── */

type SlideRevealProps = {
  children: ReactNode;
  className?: string;
  direction?: "left" | "right" | "up" | "down";
  delay?: number;
  distance?: number;
  duration?: number;
};

export function SlideReveal({ children, className, direction = "up", delay = 0, distance = 40, duration = 0.7 }: SlideRevealProps) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;

  const getInitial = () => {
    switch (direction) {
      case "left": return { x: distance, opacity: 0 };
      case "right": return { x: -distance, opacity: 0 };
      case "up": return { y: distance, opacity: 0 };
      case "down": return { y: -distance, opacity: 0 };
    }
  };

  return (
    <motion.div
      className={className}
      initial={getInitial()}
      whileInView={{ x: 0, y: 0, opacity: 1 }}
      viewport={DEFAULT_VIEW}
      transition={{ duration, ease: expo, delay }}
    >
      {children}
    </motion.div>
  );
}
