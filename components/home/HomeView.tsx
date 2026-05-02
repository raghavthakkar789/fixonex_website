"use client";

import { ArrowRight } from "lucide-react";
import { TransitionLink } from "@/components/navigation/TransitionLink";
import { Button } from "@/components/ui/button";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { WHATSAPP_HREF } from "@/data/social";
import { BRAND } from "@/lib/brand";

const productRange = [
  {
    title: "Tile adhesives",
    badge: "Pro Grade",
    desc: "Five certified grades — interior to heavy industrial.",
    href: "/products",
    techHref: "/products/tiles-adhesive",
    image: "/images/products/fix-111.png",
  },
  {
    title: "Epoxy grout",
    badge: "Designer range",
    desc: "Stain-resistant, broad colour palette for long-life finishing.",
    href: "/products",
    techHref: "/products/epoxy-grout",
    image: "/images/products/epoxy-grout.png",
  },
  {
    title: "Specialty line",
    badge: "Full system",
    desc: "Block mortar, ancillary lines and cleaners in one ecosystem.",
    href: "/products",
    techHref: "/products/tiles-adhesive/fix-555",
    image: "/images/products/block-mortar.png",
  },
] as const;

const pillars = [
  { title: "Certified range", text: "EN 12004 and IS 15477:2019 aligned formulations." },
  { title: "Designed to bond", text: "Formulations matched to substrate and site stress." },
  { title: "Finish that lasts", text: "Epoxy grouts built for stain resistance and retention." },
  { title: "Supply confidence", text: "Traceable batches with practical execution support." },
] as const;

const stats = [
  ["10+", "Years on projects"],
  ["10", "Core solution lines"],
  ["20+", "Grout colorways"],
  ["IS 15477", "Certified standard"],
] as const;

export function HomeView() {
  return (
    <>
      <section className="section-flow-light bg-accent-sunrise">
        <div className="site-container section-pad-lg grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="section-eyebrow">Industrial fixing systems</p>
            <h1 className="mt-3 text-[clamp(2.25rem,5.5vw,4rem)] font-bold tracking-tight text-foreground">
              Specification-grade bonds
              <br />
              that survive the pour.
            </h1>
            <p className="mt-5 max-w-[56ch] text-base leading-relaxed text-mid">
              Tile adhesives and epoxy systems for teams who refuse ambiguity on site — clear grades, labelled batches, Ahmedabad-based engineering backing.
            </p>
            <p className="mt-4 text-helper text-subhead">{BRAND.taglineHi.trim()}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <TransitionLink href="/products">
                  Explore catalogue <ArrowRight className="h-4 w-4" aria-hidden />
                </TransitionLink>
              </Button>
              <Button asChild size="lg" variant="outline">
                <TransitionLink href="/contact">Book consultation</TransitionLink>
              </Button>
            </div>
            <ul className="mt-10 grid gap-3 text-sm sm:grid-cols-2">
              {stats.map(([key, label]) => (
                <li key={key} className="surface-card px-4 py-3">
                  <strong className="text-foreground">{key}</strong>
                  <p className="mt-1 text-mid">{label}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="fx-image-placeholder min-h-[380px] lg:min-h-[540px]">
            <ImageWithFallback src="/images/hero/hero-main.jpeg" alt="FIXONEX on-site tiling and fixation context" fill className="object-cover" priority />
          </div>
        </div>
      </section>

      <section className="section-flow-secondary bg-accent-cool">
        <div className="site-container section-pad-lg grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="fx-image-placeholder min-h-[320px] lg:order-1 lg:min-h-[420px]">
            <ImageWithFallback src="https://picsum.photos/1400/900" alt="Construction team applying adhesive system" fill className="object-cover" />
          </div>
          <div className="lg:order-0">
            <p className="section-eyebrow">Company intro</p>
            <h2 className="mt-2 text-[clamp(1.8rem,4vw,2.8rem)] font-bold text-foreground">Built for modern surfaces and real site pressure.</h2>
            <p className="section-subtext mt-4">
              FIXONEX blends tested chemistry, practical site understanding, and clean documentation so architects, contractors, and dealers can move faster with less risk.
            </p>
          </div>
        </div>
      </section>

      <section className="section-flow-light bg-accent-mint">
        <div className="site-container section-pad-lg">
          <p className="section-eyebrow">Why FIXONEX</p>
          <h2 className="mt-2 text-[clamp(1.8rem,4vw,2.8rem)] font-bold text-foreground">Four strengths that keep execution clean.</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((item) => (
              <article key={item.title} className="interactive-card p-6">
                <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mid">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-flow-secondary bg-accent-cool">
        <div className="site-container section-pad-lg">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="section-eyebrow">Product categories</p>
              <h2 className="mt-2 text-[clamp(1.8rem,4vw,2.8rem)] font-bold text-foreground">Fewer choices. Better fit.</h2>
            </div>
            <TransitionLink href="/products" className="font-semibold text-primary hover:text-primary-dark">
              View full catalogue
            </TransitionLink>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {productRange.map((item) => (
              <article key={item.title} className="surface-card overflow-hidden">
                <div className="fx-image-placeholder min-h-[220px] rounded-none border-0 border-b">
                  <ImageWithFallback src={item.image} alt={item.title} fill className="object-contain p-7" />
                </div>
                <div className="p-6">
                  <p className="text-helper text-subhead">{item.badge}</p>
                  <h3 className="mt-2 text-xl font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-mid">{item.desc}</p>
                  <div className="mt-5 flex flex-wrap gap-5 text-sm font-semibold">
                    <TransitionLink href={item.href} className="text-primary hover:text-primary-dark">
                      Learn more
                    </TransitionLink>
                    <TransitionLink href={item.techHref} className="text-subhead hover:text-foreground">
                      Spec PDF
                    </TransitionLink>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-flow-light">
        <div className="site-container section-pad-lg grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="section-eyebrow">Product guidance</p>
            <h2 className="mt-2 text-[clamp(1.8rem,4vw,2.8rem)] font-bold text-foreground">Need a precise system match?</h2>
            <p className="section-subtext mt-4">
              Share substrate, tile format, and site exposure. Our team maps the right adhesive class and finishing system.
            </p>
            <Button asChild className="mt-6">
              <TransitionLink href="/contact">Request specification support</TransitionLink>
            </Button>
          </div>
          <div className="fx-image-placeholder min-h-[320px] lg:min-h-[420px]">
            <ImageWithFallback src="https://picsum.photos/1400/901" alt="Technical consultation and product planning" fill className="object-cover" />
          </div>
        </div>
      </section>

      <section className="section-flow-dark">
        <div className="site-container section-pad-lg text-center">
          <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-bold text-white">Ready to specify with confidence?</h2>
          <p className="mx-auto mt-4 max-w-prose text-zinc-300">
            Share substrate photos, VOC constraints, and grout intent. We convert your brief into a clean execution-ready list.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" variant="secondary">
              <TransitionLink href="/products">Explore catalogue</TransitionLink>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-zinc-500 text-white hover:bg-zinc-800">
              <TransitionLink href="/contact">Schedule call</TransitionLink>
            </Button>
          </div>
          <p className="mt-5 text-sm">
            <a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" className="text-zinc-300 hover:text-white">
              WhatsApp FIXONEX logistics cell
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
