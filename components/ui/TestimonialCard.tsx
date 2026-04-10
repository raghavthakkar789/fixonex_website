"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

type TestimonialCardProps = {
  quote: string;
  name: string;
  role: string;
  index?: number;
};

export function TestimonialCard({ quote, name, role, index = 0 }: TestimonialCardProps) {
  const reduced = useReducedMotion();
  const drift = [6, 8, 7][index % 3] ?? 7;

  return (
    <motion.article
      initial={false}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: index * 0.15 }}
      className="relative overflow-hidden rounded-md border-l-4 border-primary bg-warm p-8"
      animate={reduced ? undefined : { x: [0, 4, 0] }}
      transition={reduced ? undefined : { duration: drift, repeat: Infinity, ease: "easeInOut" }}
    >
      <p className="pointer-events-none font-display text-[72px] leading-none text-primary opacity-55" aria-hidden>
        &ldquo;
      </p>
      <p className="-mt-4 text-base italic leading-[1.75] text-black">{quote}</p>
      <p className="mt-6 font-body text-base font-bold text-black">{name}</p>
      <p className="mt-1 text-sm text-dark">{role}</p>
    </motion.article>
  );
}
