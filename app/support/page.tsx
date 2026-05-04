"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, BookOpen, ArrowRight, CheckCircle2, ChevronDown, Search } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { Button } from "@/components/ui/button";
import { supportFaqs } from "@/lib/data/support-faqs";
import { supportGuides } from "@/data/support-guides";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { TiltCard } from "@/components/ui/TiltCard";
import { Reveal, Stagger, StaggerItem, LineReveal } from "@/components/motion/Reveal";
import { TransitionLink } from "@/components/navigation/TransitionLink";

const FAQ_INITIAL = 5;
const FAQ_LOAD_MORE = 4;
const GUIDE_INITIAL = 6;
const GUIDE_LOAD_MORE = 3;
const easeExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

const timelineSteps = [
  { title: "Surface Prep", desc: "Clean, sound, and flat substrate.", gradient: "from-rose-500 to-orange-500" },
  { title: "Mix Adhesive", desc: "Correct water ratio and slump.", gradient: "from-orange-500 to-amber-500" },
  { title: "Apply & Set Tiles", desc: "Full contact within open time.", gradient: "from-teal-500 to-emerald-500" },
  { title: "Allow Cure Time", desc: "Before grout and loading.", gradient: "from-blue-500 to-indigo-500" },
  { title: "Apply Grout", desc: "Epoxy or cement as specified.", gradient: "from-violet-500 to-purple-500" },
  { title: "Final Clean", desc: "Remove residues per TDS.", gradient: "from-cyan-500 to-sky-500" },
];

const guideGradients = [
  "from-rose-500/20 to-orange-400/10",
  "from-teal-500/20 to-emerald-400/10",
  "from-blue-500/20 to-indigo-400/10",
  "from-violet-500/20 to-purple-400/10",
  "from-amber-500/20 to-yellow-400/10",
  "from-cyan-500/20 to-sky-400/10",
];

export default function SupportPage() {
  const reduced = useReducedMotion();
  const [faqVisible, setFaqVisible] = useState(FAQ_INITIAL);
  const [guideVisible, setGuideVisible] = useState(GUIDE_INITIAL);
  const [faqSearch, setFaqSearch] = useState("");

  const visibleFaqs = useMemo(() => {
    if (faqSearch.trim()) {
      return supportFaqs.filter(
        (f) =>
          f.question.toLowerCase().includes(faqSearch.toLowerCase()) ||
          f.answer.toLowerCase().includes(faqSearch.toLowerCase()),
      );
    }
    return supportFaqs.slice(0, faqVisible);
  }, [faqVisible, faqSearch]);

  const visibleGuides = useMemo(() => supportGuides.slice(0, guideVisible), [guideVisible]);

  const canLoadMoreFaq = !faqSearch.trim() && faqVisible < supportFaqs.length;
  const expandedBeyondInitialFaq = !faqSearch.trim() && faqVisible > FAQ_INITIAL;
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
      <PageHero
        label="Support"
        title="Help & Support"
        subtitle="Everything you need to install FIXONEX products correctly — from surface preparation to final finishing."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Support" }]}
        image="https://picsum.photos/seed/fixonex-support/1600/900"
      />

      {/* ── Installation Timeline ── */}
      <section className="relative overflow-hidden border-b border-zinc-200/40 bg-gradient-to-b from-[#fdfcfb] via-[#faf7f5] to-[#f8f5f2]">
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 top-0 h-[60%] w-[40%] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(211,47,47,0.06) 0%, transparent 70%)", filter: "blur(80px)" }}
        />
        <div aria-hidden className="pointer-events-none absolute inset-0 dot-grid-subtle opacity-40" />

        <div className="site-container section-pad-lg relative z-10">
          <Reveal className="mb-12">
            <p className="eyebrow-label mb-4">Execution Flow</p>
            <h2 className="font-display font-bold text-zinc-950" style={{ fontSize: "clamp(1.9rem, 4vw, 2.9rem)", letterSpacing: "-0.04em", lineHeight: 1.12 }}>
              Key Steps On Site
            </h2>
          </Reveal>

          <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {timelineSteps.map((step, i) => (
              <StaggerItem key={step.title}>
                <TiltCard className="group flex h-full flex-col rounded-3xl border border-white/90 bg-white p-6 shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_50px_rgba(0,0,0,0.1)] transition-shadow duration-500">
                  <span className={`inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br ${step.gradient} font-display text-sm font-bold text-white shadow-md`}>
                    {i + 1}
                  </span>
                  <h3 className="mt-4 font-display text-base font-semibold text-zinc-950 group-hover:text-primary transition-colors duration-300">{step.title}</h3>
                  <p className="mt-1.5 text-[12px] leading-relaxed text-zinc-500">{step.desc}</p>
                </TiltCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── How-to Guides ── */}
      <section className="relative overflow-hidden border-b border-zinc-200/40 bg-gradient-to-b from-[#f0f7ff] via-[#f4f7fb] to-[#eef2f8]">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-[10%] top-0 h-[60%] w-[40%] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(13,148,136,0.07) 0%, transparent 70%)", filter: "blur(80px)" }}
        />

        <div className="site-container section-pad-lg relative z-10">
          <Reveal className="mb-12">
            <p className="eyebrow-label mb-4">Guides</p>
            <h2 className="font-display font-bold text-zinc-950" style={{ fontSize: "clamp(1.9rem, 4vw, 2.9rem)", letterSpacing: "-0.04em", lineHeight: 1.12 }}>
              How-to Guides
            </h2>
          </Reveal>

          <Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {visibleGuides.map((g, i) => (
              <StaggerItem key={g.id}>
                <TiltCard className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/90 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_50px_rgba(0,0,0,0.1)] transition-shadow duration-500">
                  <div className={`relative h-24 bg-gradient-to-br ${guideGradients[i % guideGradients.length]} overflow-hidden`}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <BookOpen className="h-10 w-10 text-white/30" aria-hidden />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <div className="flex flex-1 flex-col p-6 pt-5">
                    <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.25 }}>
                      <BookOpen className="h-5 w-5 text-primary" aria-hidden />
                    </motion.div>
                    <h3 className="mt-3 font-display text-lg font-semibold text-zinc-950 group-hover:text-primary transition-colors duration-300">{g.title}</h3>
                    <p className="mt-2 flex-1 text-[13px] leading-relaxed text-zinc-500">{g.excerpt}</p>
                    <div className="mt-5">
                      <TransitionLink
                        href={`/support/guides/${g.id}`}
                        className="group/link inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                      >
                        Read Guide
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-0.5" aria-hidden />
                      </TransitionLink>
                    </div>
                  </div>
                </TiltCard>
              </StaggerItem>
            ))}
          </Stagger>

          {(canLoadMoreGuides || expandedBeyondInitialGuides) && (
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              {canLoadMoreGuides && (
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    type="button"
                    variant="outline"
                    className="rounded-full border-zinc-300 hover:border-primary/40 hover:text-primary"
                    onClick={() => setGuideVisible((v) => Math.min(v + GUIDE_LOAD_MORE, supportGuides.length))}
                  >
                    Show more guides
                  </Button>
                </motion.div>
              )}
              {expandedBeyondInitialGuides && (
                <Button
                  type="button"
                  variant="ghost"
                  className="rounded-full text-zinc-500 hover:text-zinc-800"
                  onClick={() => setGuideVisible(GUIDE_INITIAL)}
                >
                  Show less
                </Button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ── Safety ── */}
      <section className="relative overflow-hidden border-b border-zinc-200/40 bg-gradient-to-b from-[#faf7f5] to-white">
        <div className="site-container section-pad-md relative z-10">
          <Reveal>
            <TiltCard className="overflow-hidden rounded-3xl border border-amber-200/70 bg-gradient-to-br from-amber-50 to-orange-50 shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
              <div className="flex items-start gap-5 p-7 md:p-8">
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 shadow-lg">
                  <AlertTriangle className="h-6 w-6 text-white" aria-hidden />
                </span>
                <div>
                  <p className="font-display text-xl font-bold text-zinc-950">Safety &amp; Handling</p>
                  <ul className="mt-4 space-y-2">
                    {[
                      "Keep out of reach of children.",
                      "Wash hands after use.",
                      "Store in a cool, dry place away from moisture.",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2.5 text-[14px] text-zinc-600">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-orange-500" aria-hidden />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </TiltCard>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="scroll-mt-28 relative overflow-hidden border-b border-zinc-200/40 bg-gradient-to-b from-[#f8f5ff] to-[#f3f0ff] lg:scroll-mt-24">
        <div
          aria-hidden
          className="pointer-events-none absolute right-[-8%] top-[-10%] h-[50%] w-[45%]"
          style={{ background: "radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)", filter: "blur(80px)" }}
        />

        <div className="site-container section-pad-lg relative z-10">
          <Reveal className="mb-10">
            <p className="eyebrow-label mb-4">FAQ</p>
            <h2 className="font-display font-bold text-zinc-950" style={{ fontSize: "clamp(1.9rem, 4vw, 2.9rem)", letterSpacing: "-0.04em", lineHeight: 1.12 }}>
              Frequently Asked Questions
            </h2>
          </Reveal>

          {/* Search */}
          <label className="mx-auto mb-10 flex max-w-xl items-center gap-3 rounded-full border border-zinc-200/90 bg-white px-5 py-3 shadow-md ring-4 ring-transparent focus-within:border-violet-400 focus-within:ring-violet-100 transition-all duration-300 focus-within:scale-[1.01]">
            <Search className="h-5 w-5 text-zinc-400 shrink-0" aria-hidden />
            <input
              type="search"
              value={faqSearch}
              onChange={(e) => setFaqSearch(e.target.value)}
              placeholder="Search FAQs…"
              className="w-full bg-transparent text-sm outline-none placeholder:text-zinc-400"
            />
          </label>

          <div className="max-w-3xl">
            <FAQAccordion items={visibleFaqs} defaultOpen={null} />

            {visibleFaqs.length === 0 && (
              <p className="py-14 text-center text-sm text-zinc-500">No matches — try a different keyword.</p>
            )}

            {(canLoadMoreFaq || expandedBeyondInitialFaq) && !faqSearch.trim() && (
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                {canLoadMoreFaq && (
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      type="button"
                      variant="outline"
                      className="rounded-full border-zinc-300 hover:border-violet-300 hover:text-violet-800"
                      onClick={() => setFaqVisible((v) => Math.min(v + FAQ_LOAD_MORE, supportFaqs.length))}
                    >
                      Show more FAQs
                    </Button>
                  </motion.div>
                )}
                {expandedBeyondInitialFaq && (
                  <Button
                    type="button"
                    variant="ghost"
                    className="rounded-full text-zinc-500 hover:text-zinc-800"
                    onClick={() => setFaqVisible(FAQ_INITIAL)}
                  >
                    Show less
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Still need help ── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#fdfcfb] to-white py-20 text-center">
        <div aria-hidden className="pointer-events-none absolute inset-0 dot-grid-subtle opacity-30" />
        <div className="site-container relative z-10 mx-auto max-w-[560px]">
          <Reveal>
            <h2 className="font-display text-2xl font-bold text-zinc-950">Still need help?</h2>
            <p className="mt-3 text-[15px] text-zinc-500">Our technical team is ready to assist with your installation questions.</p>
            <motion.div className="mt-8" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button asChild size="lg" variant="primary" className="rounded-full shadow-[0_4px_20px_rgba(211,47,47,0.3)]">
                <TransitionLink href="/contact" className="inline-flex items-center gap-2">
                  Contact Our Experts <ArrowRight className="h-4 w-4" aria-hidden />
                </TransitionLink>
              </Button>
            </motion.div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
