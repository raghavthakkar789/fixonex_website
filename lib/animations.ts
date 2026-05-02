import type { Transition, Variants } from "framer-motion";

export type Cubic = [number, number, number, number];

export const easings = {
  /** cubic-bezier(0.16, 1, 0.3, 1) — fast out, dramatic */
  easeOutExpo: [0.16, 1, 0.3, 1] as const,
  /** cubic-bezier(0.76, 0, 0.24, 1) */
  easeInOutQuart: [0.76, 0, 0.24, 1] as const,
  /** cubic-bezier(0.34, 1.56, 0.64, 1) — spring-like overshoot */
  easeOutBack: [0.34, 1.56, 0.64, 1] as const,
  /** cubic-bezier(0.37, 0, 0.63, 1) */
  easeInOutSine: [0.37, 0, 0.63, 1] as const,
  /** cubic-bezier(0.0, 0.55, 0.45, 1) — cinematic ease out circ */
  easeOutCirc: [0.0, 0.55, 0.45, 1] as const,
  /** cubic-bezier(0.33, 1, 0.68, 1) — standard smooth */
  easeOutCubic: [0.33, 1, 0.68, 1] as const,
  /** cubic-bezier(0.87, 0, 0.13, 1) — dramatic in-out */
  easeInOutExpo: [0.87, 0, 0.13, 1] as const,
} as const;

const ease = easings as {
  easeOutExpo: Cubic;
  easeInOutQuart: Cubic;
  easeOutBack: Cubic;
  easeInOutSine: Cubic;
  easeOutCirc: Cubic;
  easeOutCubic: Cubic;
  easeInOutExpo: Cubic;
};

export const transitions: {
  fast: Transition;
  medium: Transition;
  slow: Transition;
  ultraSlow: Transition;
  spring: Transition;
  gentleSpring: Transition;
  bouncySpring: Transition;
  cinematic: Transition;
} = {
  fast: { duration: 0.3, ease: ease.easeOutExpo },
  medium: { duration: 0.6, ease: ease.easeOutExpo },
  slow: { duration: 0.9, ease: ease.easeOutExpo },
  ultraSlow: { duration: 1.4, ease: ease.easeOutExpo },
  spring: { type: "spring" as const, stiffness: 300, damping: 25, mass: 1 },
  gentleSpring: { type: "spring" as const, stiffness: 150, damping: 20, mass: 1.2 },
  bouncySpring: { type: "spring" as const, stiffness: 400, damping: 22, mass: 0.8 },
  cinematic: { duration: 1.1, ease: ease.easeInOutExpo },
};

/** Standard animation variants */
export const variants: Record<string, Variants> = {
  fadeUp: {
    initial: { y: 40, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  },
  fadeDown: {
    initial: { y: -40, opacity: 0 },
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
  scaleInSmall: {
    initial: { scale: 0.96, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
  },

  /* Cinematic clip-path reveals */
  clipRevealBottom: {
    initial: { clipPath: "inset(100% 0 0 0)", opacity: 0 },
    animate: { clipPath: "inset(0% 0 0 0)", opacity: 1 },
  },
  clipRevealTop: {
    initial: { clipPath: "inset(0 0 100% 0)", opacity: 0 },
    animate: { clipPath: "inset(0 0 0% 0)", opacity: 1 },
  },
  clipRevealLeft: {
    initial: { clipPath: "inset(0 100% 0 0)" },
    animate: { clipPath: "inset(0 0% 0 0)" },
  },
  clipRevealRight: {
    initial: { clipPath: "inset(0 0 0 100%)" },
    animate: { clipPath: "inset(0 0 0 0%)" },
  },

  /* Text line reveal (parent clips overflow) */
  textRevealUp: {
    initial: { y: "110%", opacity: 0 },
    animate: { y: "0%", opacity: 1 },
  },

  /* Stagger containers */
  staggerContainer: {
    initial: {},
    animate: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  },
  staggerContainerFast: {
    initial: {},
    animate: { transition: { staggerChildren: 0.055, delayChildren: 0.05 } },
  },
  staggerContainerSlow: {
    initial: {},
    animate: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
  },

  /* Stagger children */
  staggerChild: {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
  },
  staggerChildFast: {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
  },
};

/** Page transition animations */
export const pageTransitionVariants: Variants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -6 },
};

/** Hero entrance variants */
export const heroVariants: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const heroChild: Variants = {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: ease.easeOutExpo },
  },
};

/** Card hover variants */
export const cardHover: Variants = {
  rest: { y: 0, boxShadow: "0 2px 12px rgba(9,9,11,0.04)" },
  hover: {
    y: -4,
    boxShadow: "0 20px 50px rgba(9,9,11,0.1)",
    transition: { duration: 0.4, ease: ease.easeOutExpo },
  },
};

export const easingsWAAPI = {
  easeOutExpoCss: "cubic-bezier(0.16, 1, 0.3, 1)",
  easeInOutQuartCss: "cubic-bezier(0.76, 0, 0.24, 1)",
  easeOutCircCss: "cubic-bezier(0.0, 0.55, 0.45, 1)",
} as const;
