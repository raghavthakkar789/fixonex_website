"use client";

import { TransitionLink } from "@/components/navigation/TransitionLink";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Grid3X3,
  Layers,
  MessageCircle,
  Package,
  Palette,
  Shield,
} from "lucide-react";
import { WHATSAPP_HREF } from "@/data/social";
import { Button } from "@/components/ui/button";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { BRAND } from "@/lib/brand";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/Reveal";

const productRange = [
  {
    title: "Tile adhesives",
    icon: Grid3X3,
    badge: "Pro Grade",
    desc: "Five certified grades — interior to heavy industrial.",
    href: "/products",
    techHref: "/products/tiles-adhesive",
    image: "/images/products/fix-111.png",
  },
  {
    title: "Epoxy grout",
    icon: Palette,
    badge: "Designer range",
    desc: "Stain-resistant, broad colour palette, pool to kitchen.",
    href: "/products",
    techHref: "/products/epoxy-grout",
    image: "/images/products/epoxy-grout.png",
  },
  {
    title: "Specialty line",
    icon: Package,
    badge: "Full system",
    desc: "Block mortar, ancillary lines & cleaners — coordinated.",
    href: "/products",
    techHref: "/products/tiles-adhesive/fix-555",
    image: "/images/products/block-mortar.png",
  },
] as const;

const pillars = [
  { icon: Shield, title: "Certified range", text: "EN 12004 & IS 15477:2019 alignment across the map." },
  { icon: Layers, title: "Designed to bond", text: "Formulations matched to substrates and real site stress." },
  { icon: Palette, title: "Finish that lasts", text: "Epoxy grouts built for colour-fast, clean joints." },
  { icon: Package, title: "Supply confidence", text: "Traceable batches and practical support through execution." },
] as const;

const pillarIconShell = [
  "bg-zinc-100 text-zinc-700",
  "bg-zinc-100 text-zinc-700",
  "bg-zinc-100 text-zinc-700",
  "bg-zinc-100 text-zinc-700",
] as const;

const stats = [
  ["10+", "Years live on sites"],
  ["10", "Core solution lines"],
  ["20+", "Grout colourways"],
  ["IS 15477", "India standard"],
] as const;

export function HomeView() {
  const reduced = useReducedMotion();

  return (
    <>
      <section className="relative overflow-hidden border-b border-border-strong bg-[#111111] text-white">
        <div className="site-container relative grid gap-10 py-16 md:py-20 lg:grid-cols-12 lg:items-center lg:gap-14 lg:py-24">
          <div className="lg:col-span-6">
            <motion.p
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-4 py-1 text-helper text-zinc-200"
              initial={false}
              animate={reduced ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              Industrial fixing systems
            </motion.p>

            <h1 className="mt-6 max-w-[15ch] font-display text-hero tracking-tighter text-white">
              <span className="block">Specification-grade</span>
              <span className="mt-2 block text-zinc-200">
                bonds that survive the pour.
              </span>
            </h1>

            <p className="mt-5 max-w-lg text-[1.05rem] leading-relaxed text-zinc-300">
              Tile adhesives and epoxy systems for teams who refuse ambiguity on site — clear grades, labelled batches, Ahmedabad-based engineering backing.
            </p>
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500">{BRAND.taglineHi.trim()}</p>

            <div className="mt-10 flex flex-wrap gap-3">
              <Button asChild size="lg" variant="primary">
                <TransitionLink href="/products" className="gap-2">
                  Explore catalogue <ArrowRight className="-mr-0.5" aria-hidden />
                </TransitionLink>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white">
                <TransitionLink href="/contact">Book consultation</TransitionLink>
              </Button>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-6 border-t border-white/12 pt-8 sm:grid-cols-4">
              {stats.map(([k, label], i) => (
                <motion.div
                  key={k}
                  initial={reduced ? false : { opacity: 0, y: 12 }}
                  animate={reduced ? undefined : { opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.45 }}
                >
                  <dl>
                    <dt className="font-display text-3xl tabular-nums text-white">{k}</dt>
                    <dd className="mt-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500">{label}</dd>
                  </dl>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-white/20 lg:col-span-6">
            <div className="relative aspect-[16/11] min-h-[22rem]">
              <ImageWithFallback
                src="/images/hero/hero-main.jpeg"
                alt="FIXONEX on-site tiling and fixation context"
                fill
                priority
                reveal="none"
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 42vw"
              />
              <div className="absolute inset-0 bg-black/25" aria-hidden />
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad border-b border-border-strong bg-white">
        <div className="site-container grid gap-10 lg:grid-cols-12 lg:items-center">
          <Reveal className="lg:col-span-6">
            <p className="section-eyebrow">Company Intro</p>
            <h2 className="mt-3 font-display text-display text-foreground">Built for serious site execution.</h2>
            <p className="mt-4 max-w-xl text-[1.05rem] text-mid">
              FIXONEX is engineered for teams that need clarity in specification, confidence in bonding, and dependable supply from brief to handover.
            </p>
            <Button asChild className="mt-8" size="lg">
              <TransitionLink href="/about">Know FIXONEX</TransitionLink>
            </Button>
          </Reveal>
          <Reveal className="relative min-h-[320px] overflow-hidden rounded-2xl border border-border-strong lg:col-span-6">
            <ImageWithFallback src="/images/hero/hero-main.jpeg" alt="FIXONEX installation context" fill className="object-cover" />
          </Reveal>
        </div>
      </section>

      <section className="section-pad border-b border-border-strong section-flow-secondary">
        <Reveal className="site-container">
          <div className="max-w-2xl">
            <p className="section-eyebrow">Why FIXONEX</p>
            <h2 className="mt-3 font-display text-display text-foreground">Four reasons teams stay with us.</h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {pillars.map((item, i) => (
              <Reveal key={item.title} delay={0.02} className="surface-card p-7">
                <span className={cn("inline-flex rounded-2xl p-4", pillarIconShell[i])}>
                  <item.icon className="h-6 w-6" strokeWidth={1.85} aria-hidden />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold text-zinc-900">{item.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-mid">{item.text}</p>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="section-pad border-b border-border-strong bg-white">
        <div className="site-container flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="section-eyebrow">Product Categories</p>
            <h2 className="mt-2 font-display text-display text-zinc-900">Built for façade, podium, and interiors.</h2>
          </div>
          <TransitionLink href="/products" className="group inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-hover">
            View full catalogue <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </TransitionLink>
        </div>

        <div className="site-container mt-10 grid gap-8 md:grid-cols-3">
          {productRange.map((c) => (
            <article key={c.title} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border-strong bg-white shadow-sm transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-md">
              <div className="relative aspect-[5/3] border-b border-border-strong bg-zinc-50">
                <span className="absolute left-4 top-4 z-[1] rounded-full bg-zinc-900 px-3 py-[3px] text-[11px] font-bold uppercase tracking-wide text-white">{c.badge}</span>
                  <ImageWithFallback
                    src={c.image}
                    alt={`${c.title}`}
                    fill
                    className="object-contain p-6 transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
              </div>
              <div className="flex flex-1 flex-col p-6 pt-8">
                  <c.icon className="h-5 w-5 text-primary" aria-hidden />
                  <h3 className="mt-4 font-display text-xl font-semibold text-zinc-950">{c.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-mid">{c.desc}</p>
                  <div className="mt-6 flex items-center gap-6">
                    <TransitionLink href={c.href} className="text-sm font-semibold text-primary hover:text-primary-hover">
                      Learn more →
                    </TransitionLink>
                    <TransitionLink href={c.techHref} className="text-[13px] font-semibold uppercase tracking-[0.1em] text-zinc-500 hover:text-orange-700">
                      Spec PDF
                    </TransitionLink>
                  </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-pad border-b border-border-strong section-flow-light">
        <div className="site-container grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <p className="section-eyebrow">Product Guidance</p>
            <h2 className="mt-2 font-display text-display font-semibold text-zinc-900">Choosing the right adhesive should be straightforward.</h2>
            <ul className="mt-10 space-y-5">
              {(
                [
                  ["Surface telemetry", Layers],
                  ["Tile modulus & sizing", Grid3X3],
                  ["Standard alignment", Shield],
                ] as const
              ).map(([label, Icon]) => (
                <li key={label as string} className="flex gap-5 rounded-xl border border-border-strong bg-white px-5 py-4">
                  <Icon className="mt-1 h-6 w-6 shrink-0 text-primary" aria-hidden />
                  <div>
                    <p className="font-display text-[1.0625rem] font-semibold text-zinc-900">{label}</p>
                    <p className="mt-1 text-sm text-zinc-600">Captured once, circulated to QA + dispatch.</p>
                  </div>
                </li>
              ))}
            </ul>
            <Button asChild className="mt-10" variant="primary" size="lg">
              <TransitionLink href="/contact">Request specification support</TransitionLink>
            </Button>
          </Reveal>

          <Reveal className="relative min-h-[340px] overflow-hidden rounded-2xl border border-border-strong">
            <ImageWithFallback src="/images/hero/hero-main.jpeg" alt="Guidance and technical support" fill className="object-cover" />
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#111111] text-white">
        <div className="site-container relative py-20 md:py-24">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-semibold">Ready to specify with confidence?</h2>
            <p className="mt-6 text-[17px] leading-relaxed text-white/88">
              Share substrate photos, VOC constraints, grout colour intent — our engineers consolidate it into deployable SKU lists.
            </p>
            <div className="mt-14 flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" variant="secondary" className="bg-white text-primary shadow-xl hover:bg-zinc-100">
                <TransitionLink href="/products">Explore catalogue</TransitionLink>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-white/70 bg-transparent text-white hover:bg-white/12 hover:text-white">
                <TransitionLink href="/contact">Schedule call</TransitionLink>
              </Button>
            </div>
            <motion.a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-12 inline-flex items-center gap-2 rounded-full border border-white/50 px-8 py-3 text-sm font-semibold text-white/95 hover:bg-white/10"
              whileHover={reduced ? undefined : { scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <MessageCircle className="h-5 w-5" aria-hidden />
              WhatsApp FIXONEX logistics cell
            </motion.a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
