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

  return (
    <motion.article
      initial={false}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: index * 0.15 }}
      whileHover={reduced ? undefined : { y: -6 }}
      className="pop-shadow-quote relative overflow-hidden rounded-lg border-l-4 border-warm bg-white p-8"
    >
      <p className="pointer-events-none font-display text-[72px] leading-none text-warm/55" aria-hidden>
        &ldquo;
      </p>
      <p className="-mt-4 text-base italic leading-[1.75] text-dark">{quote}</p>
      <div className="mt-6 border-t border-light pt-4">
        <p className="font-body text-base font-bold text-black">{name}</p>
        <p className="mt-1 text-sm text-mid">{role}</p>
      </div>
    </motion.article>
  );
}
