import type { Transition, Variants } from "framer-motion";

export type Cubic = [number, number, number, number];

export const easings: Record<string, string | Cubic> = {
  /** cubic-bezier(0.16, 1, 0.3, 1) */
  easeOutExpo: [0.16, 1, 0.3, 1] as const,
  /** cubic-bezier(0.76, 0, 0.24, 1) */
  easeInOutQuart: [0.76, 0, 0.24, 1] as const,
  /** cubic-bezier(0.34, 1.56, 0.64, 1) */
  easeOutBack: [0.34, 1.56, 0.64, 1] as const,
  /** cubic-bezier(0.37, 0, 0.63, 1) */
  easeInOutSine: [0.37, 0, 0.63, 1] as const,
} as const;

const ease = easings as { easeOutExpo: Cubic; easeInOutQuart: Cubic; easeOutBack: Cubic; easeInOutSine: Cubic };

export const transitions: {
  fast: Transition;
  medium: Transition;
  slow: Transition;
  spring: Transition;
  gentleSpring: Transition;
} = {
  fast: { duration: 0.3, ease: ease.easeOutExpo },
  medium: { duration: 0.6, ease: ease.easeOutExpo },
  slow: { duration: 0.9, ease: ease.easeOutExpo },
  spring: { type: "spring" as const, stiffness: 300, damping: 25, mass: 1 },
  gentleSpring: { type: "spring" as const, stiffness: 150, damping: 20, mass: 1.2 },
};

export const variants: Record<string, Variants> = {
  fadeUp: {
    initial: { y: 40, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  },
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  },
  slideInLeft: {
    initial: { x: -60, opacity: 0 },
    animate: { x: 0, opacity: 1 },
  },
  slideInRight: {
    initial: { x: 60, opacity: 0 },
    animate: { x: 0, opacity: 1 },
  },
  scaleIn: {
    initial: { scale: 0.92, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
  },
  clipRevealLeft: {
    initial: { clipPath: "inset(0 100% 0 0)" },
    animate: { clipPath: "inset(0 0% 0 0)" },
  },
  clipRevealBottom: {
    initial: { clipPath: "inset(100% 0 0 0)" },
    animate: { clipPath: "inset(0% 0 0 0)" },
  },
  staggerContainer: {
    initial: {},
    animate: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  },
};

export const pageTransitionVariants: Variants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -6 },
};

export const easingsWAAPI = {
  /** Web Animations API / CSS: cubic-bezier(0.16, 1, 0.3, 1) */
  easeOutExpoCss: "cubic-bezier(0.16, 1, 0.3, 1)",
} as const;
