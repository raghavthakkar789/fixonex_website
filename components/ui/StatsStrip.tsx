"use client";

import { useInView } from "framer-motion";
import { useRef } from "react";
import { useCountUp } from "@/lib/useCountUp";
import { useReducedMotion } from "@/lib/useReducedMotion";

type StatItem = { value: string; label: string };

type StatsStripProps = { stats: StatItem[]; className?: string };

function StatValue({ value, start }: { value: string; start: boolean }) {
  const text = useCountUp(value, start, { durationMs: 2000 });
  return <span>{text}</span>;
}

export function StatsStrip({ stats, className = "" }: StatsStripProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const reduced = useReducedMotion();

  return (
    <section ref={ref} className={`border-y border-border-soft bg-elevated py-14 text-foreground md:py-18 ${className}`}>
      <div className="relative z-10 site-container grid grid-cols-2 gap-10 md:grid-cols-4 md:gap-8">
        {stats.map((stat, index) => (
          <div key={stat.label} className="relative text-center md:text-left">
            {index > 0 ? (
              <span
                className="absolute -left-4 top-1/2 hidden h-14 w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-border to-transparent md:block"
                aria-hidden
              />
            ) : null}
            <p className="font-heading text-[clamp(32px,5vw,52px)] font-bold tracking-[-0.02em] text-foreground">
              <StatValue value={stat.value} start={reduced || Boolean(inView)} />
            </p>
            <p className="mt-2 text-sm font-medium uppercase tracking-[0.08em] text-mid">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
