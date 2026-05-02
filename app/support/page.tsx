"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { PageHero } from "@/components/ui/PageHero";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { Button } from "@/components/ui/button";
import { supportFaqs } from "@/lib/data/support-faqs";
import { supportGuides } from "@/data/support-guides";

const FAQ_INITIAL = 5;
const FAQ_LOAD_MORE = 4;
const GUIDE_INITIAL = 6;
const GUIDE_LOAD_MORE = 3;

const timelineSteps = [
  { title: "Surface Prep", desc: "Clean, sound, and flat substrate." },
  { title: "Mix Adhesive", desc: "Correct water ratio and slump." },
  { title: "Apply & Set Tiles", desc: "Full contact within open time." },
  { title: "Allow Cure Time", desc: "Before grout and loading." },
  { title: "Apply Grout", desc: "Epoxy or cement as specified." },
  { title: "Final Clean", desc: "Remove residues per TDS." },
];

export default function SupportPage() {
  const [faqVisible, setFaqVisible] = useState(FAQ_INITIAL);
  const [guideVisible, setGuideVisible] = useState(GUIDE_INITIAL);

  const visibleFaqs = useMemo(() => supportFaqs.slice(0, faqVisible), [faqVisible]);
  const visibleGuides = useMemo(() => supportGuides.slice(0, guideVisible), [guideVisible]);

  useEffect(() => {
    if (window.location.hash !== "#faq") return;
    const el = document.getElementById("faq");
    if (!el) return;
    const t = window.requestAnimationFrame(() => {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    return () => window.cancelAnimationFrame(t);
  }, []);

  return (
    <>
      <PageHero
        label="Support"
        title="Help & Support"
        subtitle="Your installation guide starts here."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Support" }]}
      />

      <section className="section-flow-light">
        <div className="site-container section-pad-lg grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="section-eyebrow">Support center</p>
            <h2 className="mt-2 text-[clamp(1.8rem,4vw,2.8rem)] font-bold text-foreground">Practical support for smooth execution.</h2>
            <p className="section-subtext mt-4">
              Everything you need to install FIXONEX products correctly — from surface preparation to final finishing.
            </p>
          </div>
          <div className="fx-image-placeholder min-h-[320px] lg:min-h-[420px]">
            <ImageWithFallback src="https://picsum.photos/1400/840" alt="Support guidance for adhesive application" fill className="object-cover" />
          </div>
        </div>
      </section>

      <section className="section-flow-secondary">
        <div className="site-container section-pad-md">
          <p className="section-eyebrow">How-to guides</p>
          <h2 className="mt-2 text-[clamp(1.6rem,3vw,2.2rem)] font-bold text-foreground">Guides that move from spec to site.</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {visibleGuides.map((g) => (
              <article key={g.id} className="surface-card p-5">
                <h3 className="text-lg font-semibold text-foreground">{g.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mid">{g.excerpt}</p>
                <Link href={`/support/guides/${g.id}`} className="mt-4 inline-flex text-sm font-semibold text-primary hover:text-primary-dark">
                  Read guide
                </Link>
              </article>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {guideVisible < supportGuides.length ? (
              <Button onClick={() => setGuideVisible((v) => Math.min(v + GUIDE_LOAD_MORE, supportGuides.length))}>Show more</Button>
            ) : null}
            {guideVisible > GUIDE_INITIAL ? <Button variant="outline" onClick={() => setGuideVisible(GUIDE_INITIAL)}>Show less</Button> : null}
          </div>
        </div>
      </section>

      <section className="section-flow-light">
        <div className="site-container section-pad-md">
          <p className="section-eyebrow">Site flow</p>
          <h2 className="mt-2 text-[clamp(1.6rem,3vw,2.2rem)] font-bold text-foreground">Key steps on site</h2>
          <ol className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {timelineSteps.map((step, i) => (
              <li key={step.title} className="surface-card p-5">
                <p className="text-helper text-primary">Step {i + 1}</p>
                <p className="mt-2 text-base font-semibold text-foreground">{step.title}</p>
                <p className="mt-1 text-sm text-mid">{step.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="faq" className="section-flow-secondary">
        <div className="site-container section-pad-md">
          <p className="section-eyebrow">FAQ</p>
          <h2 className="mt-2 text-[clamp(1.6rem,3vw,2.2rem)] font-bold text-foreground">Frequently Asked Questions</h2>
          <div className="mt-7">
            <FAQAccordion items={visibleFaqs} defaultOpen={null} />
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {faqVisible < supportFaqs.length ? (
              <Button onClick={() => setFaqVisible((v) => Math.min(v + FAQ_LOAD_MORE, supportFaqs.length))}>Show more</Button>
            ) : null}
            {faqVisible > FAQ_INITIAL ? <Button variant="outline" onClick={() => setFaqVisible(FAQ_INITIAL)}>Show less</Button> : null}
          </div>
        </div>
      </section>

      <section className="section-flow-light">
        <div className="site-container section-pad-md text-center">
          <h2 className="text-[clamp(1.6rem,3vw,2.2rem)] font-bold text-foreground">Still need help?</h2>
          <Button asChild className="mt-5">
            <Link href="/contact">Contact our experts</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
