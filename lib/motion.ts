import { easings, transitions, variants } from "./animations";

export const premiumEase = easings.easeOutExpo as [number, number, number, number];
export { easings, transitions, variants };

export const headingReveal = {
  initial: { y: 60, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.7, ease: premiumEase },
};

export const cardReveal = (index = 0) => ({
  initial: { y: 50, opacity: 0, scale: 0.96 },
  whileInView: { y: 0, opacity: 1, scale: 1 },
  viewport: { once: true, margin: "-40px" as const },
  transition: { duration: 0.5, delay: index * 0.08, ease: premiumEase },
});
