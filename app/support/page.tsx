"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, BookOpen } from "lucide-react";
import { PageBanner } from "@/components/ui/PageBanner";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { Button } from "@/components/ui/button";
import { supportFaqs } from "@/lib/data/support-faqs";
import { supportGuides } from "@/data/support-guides";
import { useReducedMotion } from "@/lib/useReducedMotion";

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
  const reduced = useReducedMotion();
  const [faqVisible, setFaqVisible] = useState(FAQ_INITIAL);
  const [guideVisible, setGuideVisible] = useState(GUIDE_INITIAL);

  const visibleFaqs = useMemo(
    () => supportFaqs.slice(0, faqVisible),
    [faqVisible],
  );
  const visibleGuides = useMemo(
    () => supportGuides.slice(0, guideVisible),
    [guideVisible],
  );

  const canLoadMoreFaq = faqVisible < supportFaqs.length;
  const expandedBeyondInitialFaq = faqVisible > FAQ_INITIAL;
  const canLoadMoreGuides = guideVisible < supportGuides.length;
  const expandedBeyondInitialGuides = guideVisible > GUIDE_INITIAL;

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
      <PageBanner
        label="Support"
        title="Help & Support"
        subtitle="Your installation guide starts here."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Support" }]}
      />

      <section className="section-pad bg-white">
        <div className="site-container mx-auto max-w-[720px] text-center">
          <p className="text-base leading-[1.75] text-dark">
            Everything you need to install FIXONEX products correctly — from surface preparation to final finishing.
          </p>
        </div>
      </section>

      <section className="section-pad bg-light">
        <div className="site-container">
          <h2 className="font-display text-display font-semibold text-black">How-to Guides</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {visibleGuides.map((g, i98) => (
              <motion.article
                key={g.id}
                initial={reduced ? false : { opacity: 0, y: 20 }}
                whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i98 * 0.06 }}
                className="flex flex-col overflow-hidden rounded-md border border-border bg-white shadow-sm"
              >
                <div className="h-2 bg-warm" />
                <div className="h-24 bg-gradient-to-br from-warm/50 to-warm-dark/40" />
                <div className="flex flex-1 flex-col p-6">
                  <BookOpen className="h-6 w-6 text-primary" aria-hidden />
                  <h3 className="mt-3 font-body text-lg font-semibold text-black">{g.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-mid">{g.excerpt}</p>
                  <Link
                    href={`/support/guides/${g.id}`}
                    className="mt-4 text-sm font-semibold text-primary"
                  >
                    Read Guide →
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
          {canLoadMoreGuides || expandedBeyondInitialGuides ? (
            <div className="mt-8 flex flex-wrap justify-center gap-3 sm:mt-10">
              {canLoadMoreGuides ? (
                <Button
                  type="button"
                  variant="outline"
                  size="default"
                  className="min-w-[10rem]"
                  onClick={() =>
                    setGuideVisible((v) => Math.min(v + GUIDE_LOAD_MORE, supportGuides.length))
                  }
                >
                  Show more
                </Button>
              ) : null}
              {expandedBeyondInitialGuides ? (
                <Button
                  type="button"
                  variant="ghost"
                  size="default"
                  className="min-w-[10rem] text-mid hover:text-black"
                  onClick={() => setGuideVisible(GUIDE_INITIAL)}
                >
                  Show less
                </Button>
              ) : null}
            </div>
          ) : null}
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="site-container">
          <h2 className="font-display text-display font-semibold text-black">Key Steps On Site</h2>
          <div className="mt-10 flex flex-col gap-6 md:flex-row md:flex-wrap md:justify-center lg:flex-nowrap">
            {timelineSteps.map((step, i98) => (
              <motion.div
                key={step.title}
                initial={reduced ? false : { opacity: 0, y: 16 }}
                whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ delay: i98 * 0.15 }}
                className="flex flex-1 flex-col items-center border border-border bg-light px-4 py-5 text-center md:min-w-[140px] lg:min-w-0"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary font-display text-base font-bold text-white">
                  {i98 + 1}
                </span>
                <p className="mt-3 font-semibold text-black">{step.title}</p>
                <p className="mt-1 text-xs text-mid">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-accent-rose">
        <div className="site-container">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-8 w-8 shrink-0 text-primary" aria-hidden />
            <div>
              <h2 className="font-display text-2xl font-semibold text-black">Safety &amp; Handling</h2>
              <ul className="mt-4 space-y-2 text-sm text-dark">
                <li>Keep out of reach of children.</li>
                <li>Wash hands after use.</li>
                <li>Store in a cool, dry place away from moisture.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="scroll-mt-28 section-pad bg-white lg:scroll-mt-24">
        <div className="site-container">
          <h2 className="font-display text-display font-semibold text-black">FAQ</h2>
          <div className="mt-8 max-w-3xl">
            <FAQAccordion items={visibleFaqs} defaultOpen={null} />
            {canLoadMoreFaq || expandedBeyondInitialFaq ? (
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                {canLoadMoreFaq ? (
                  <Button
                    type="button"
                    variant="outline"
                    size="default"
                    className="min-w-[10rem]"
                    onClick={() =>
                      setFaqVisible((v) => Math.min(v + FAQ_LOAD_MORE, supportFaqs.length))
                    }
                  >
                    Show more
                  </Button>
                ) : null}
                {expandedBeyondInitialFaq ? (
                  <Button
                    type="button"
                    variant="ghost"
                    size="default"
                    className="min-w-[10rem] text-mid hover:text-black"
                    onClick={() => setFaqVisible(FAQ_INITIAL)}
                  >
                    Show less
                  </Button>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section className="bg-dark py-16 text-center text-white">
        <div className="site-container mx-auto max-w-[560px]">
          <h2 className="font-display text-2xl font-semibold">Still need help?</h2>
          <Button asChild className="mt-8" size="lg" variant="primary">
            <Link href="/contact">Contact Our Experts</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
