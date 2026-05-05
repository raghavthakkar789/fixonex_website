"use client";

import dynamic from "next/dynamic";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { PageHero } from "@/components/ui/PageHero";

const ProductGuidanceWizard = dynamic(
  () =>
    import("@/components/products/ProductGuidanceWizard").then((m) => m.ProductGuidanceWizard),
  {
    loading: () => (
      <div
        className="min-h-[280px] rounded-xl border border-zinc-200/60 bg-zinc-50/80"
        aria-busy
        aria-label="Loading product helper"
      />
    ),
  },
);

const easeExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];
const serviceHeroImage = "/images/hero/products-hero.png";

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: easeExpo }}
    >
      {children}
    </motion.div>
  );
}

export default function ServicePage() {
  return (
    <>
      <PageHero
        label="Service"
        title="Service"
        subtitle="A guided helper that points you to the right FIXONEX product for your application — fast, free, and field-tested."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Service" }]}
        image={serviceHeroImage}
        imageClassName="object-contain object-center md:object-right"
      />

      {/* ── Product Guidance Wizard ── */}
      <section
        id="wizard"
        className="scroll-mt-20 relative overflow-hidden border-b border-zinc-200/40 bg-gradient-to-br from-[#f0fdf9] via-[#f5f5f5] to-[#eef8ff]"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 top-0 h-[60%] w-[45%] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(13,148,136,0.07) 0%, transparent 70%)", filter: "blur(80px)" }}
        />
        <div className="site-container section-pad-lg relative z-10">
          <FadeIn>
            <p className="eyebrow-label mb-4">Product Helper</p>
            <h2
              className="font-display font-bold text-zinc-950"
              style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", letterSpacing: "-0.04em", lineHeight: 1.1 }}
            >
              Answer a few prompts — get the right starting range.
            </h2>
            <p className="mt-3 max-w-xl text-[14px] text-zinc-500">
              Not a substitute for datasheets or a FIXONEX advisor, but a fast orientation across our catalogue.
            </p>
          </FadeIn>
          <div className="mt-10">
            <ProductGuidanceWizard />
          </div>
        </div>
      </section>
    </>
  );
}
