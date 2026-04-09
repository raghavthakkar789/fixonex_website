"use client";

import { useInView } from "framer-motion";
import { useRef } from "react";
import { useCountUp } from "@/lib/useCountUp";
import { useReducedMotion } from "@/lib/useReducedMotion";

type StatItem = { value: string; label: string };

type StatsStripProps = { stats: StatItem[]; className?: string };

function StatValue({ value, start }: { value: string; start: boolean }) {
  const text = useCountUp(value, start, { durationMs: 1500 });
  return <span>{text}</span>;
}

export function StatsStrip({ stats, className = "" }: StatsStripProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const reduced = useReducedMotion();

  return (
    <section ref={ref} className={`bg-primary py-12 text-white md:py-16 ${className}`}>
      <div className="site-container grid grid-cols-2 gap-8 md:grid-cols-4">
        {stats.map((stat, index) => (
          <div key={stat.label} className="relative text-center md:text-left">
            {index > 0 ? <span className="absolute -left-4 top-1/2 hidden h-12 w-px -translate-y-1/2 bg-white/40 md:block" aria-hidden /> : null}
            <p className="font-display text-[clamp(32px,5vw,52px)] font-bold tracking-tight">
              <StatValue value={stat.value} start={inView || reduced} />
            </p>
            <p className="mt-2 text-sm font-medium uppercase tracking-[0.08em] text-white/90">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
