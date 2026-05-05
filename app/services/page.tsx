"use client";

import dynamic from "next/dynamic";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { PageHero } from "@/components/ui/PageHero";
import { Layers, Clock, Shield } from "lucide-react";
import { CinematicMotionHero } from "@/components/heroes/CinematicMotionHero";

const TileAdhesiveSelector = dynamic(
  () =>
    import("@/components/home/TileAdhesiveSelector").then((m) => m.TileAdhesiveSelector),
  {
    loading: () => (
      <div
        className="min-h-[440px] animate-pulse rounded-2xl border border-zinc-200/60 bg-zinc-50/80"
        aria-busy
        aria-label="Loading product guidance"
      />
    ),
  },
);

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];
const serviceHeroImage = "/images/hero/products-hero.png";
const easeExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

const FEATURES = [
  {
    icon: Layers,
    title: "5-Step Precision",
    desc: "Area → Type → Tile → Size → Substrate. Every variable counts.",
  },
  {
    icon: Clock,
    title: "Instant Result",
    desc: "Recommendation updates in real time as you answer each step.",
  },
  {
    icon: Shield,
    title: "IS 15477:2019",
    desc: "All outputs are aligned to the Indian Standard for tile adhesives.",
  },
] as const;

function FadeIn({
  children, delay = 0, className = "",
}: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

export default function ServicePage() {
  return (
    <>
      <CinematicMotionHero
        variant="service"
        label="Service"
        titleLine1="Service"
        titleLine2="Guidance"
        subtitle="A guided helper that points you to the right FIXONEX product for your application — fast, free, and field-tested."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Service" }]}
      />

      {/* ── Product Guidance ────────────────────────────────────────────── */}
      <section
        id="wizard"
        className="scroll-mt-20 relative overflow-hidden border-b border-zinc-200/40 bg-gradient-to-br from-[#f8f9ff] via-white to-[#f0fdf9]"
      >
        {/* Background glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 top-0 h-[55%] w-[40%] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(13,148,136,0.07) 0%, transparent 70%)",
            filter: "blur(90px)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-[10%] h-[40%] w-[30%] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(211,47,47,0.05) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />

        <div className="site-container section-pad-lg relative z-10">

          {/* Header */}
          <FadeIn className="mb-10">
            <p className="eyebrow-label mb-4">Product Helper</p>
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-xl">
                <h2
                  className="font-display font-bold text-zinc-950"
                  style={{
                    fontSize: "clamp(1.8rem, 3.2vw, 2.6rem)",
                    letterSpacing: "-0.04em",
                    lineHeight: 1.1,
                  }}
                >
                  Find the right adhesive{" "}
                  <span className="text-primary">for your project.</span>
                </h2>
                <p className="mt-3 text-[14px] leading-relaxed text-zinc-500">
                  Answer five quick questions — get a product recommendation
                  aligned with IS 15477:2019. No sign-up, no guesswork.
                </p>
              </div>

              {/* Feature pills */}
              <div className="flex flex-wrap gap-3 lg:flex-col lg:items-end">
                {FEATURES.map(({ icon: Icon, title, desc }, i) => (
                  <FadeIn key={title} delay={0.08 * i}>
                    <div className="flex items-start gap-3 rounded-2xl border border-zinc-200/70 bg-white/80 px-4 py-3 shadow-sm backdrop-blur-sm lg:max-w-[240px]">
                      <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-primary/8 text-primary">
                        <Icon className="h-4 w-4" aria-hidden />
                      </span>
                      <div>
                        <p className="text-[12px] font-bold text-zinc-800">{title}</p>
                        <p className="text-[11px] leading-snug text-zinc-500">{desc}</p>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Divider */}
          <div className="mb-8 h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />

          {/* Selector widget */}
          <TileAdhesiveSelector />

        </div>
      </section>
    </>
  );
}
