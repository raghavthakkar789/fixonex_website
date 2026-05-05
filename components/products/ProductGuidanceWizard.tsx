"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  BadgeCheck,
  Headset,
  Layers,
  Palette,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { TransitionLink } from "@/components/navigation/TransitionLink";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import {
  type GuidanceAnswers,
  type WizardMoisture,
  type InstallArea,
  type SizeType,
  type WizardMaterial,
  getSpecificRecommendation,
  guidanceQuestions,
} from "@/data/help-recommendations";

const easeExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];
const TOTAL = guidanceQuestions.length; // 4

/** Per-tab key for the wizard's progress + answers. Cleared on tab close
 *  so cross-session privacy stays intact, but preserved while the visitor
 *  hops between the wizard and recommended product pages. */
const STORAGE_KEY = "fixonex:product-guidance-state:v1";

type PartialAnswers = Partial<GuidanceAnswers>;

type StoredWizardState = {
  answers: PartialAnswers;
  activeStep: number;
};

/** Append `from=guidance` so the destination product page can render a
 *  "Back to Product Guidance" link that returns to the wizard section. */
function withGuidanceFlag(href: string): string {
  const sep = href.includes("?") ? "&" : "?";
  return `${href}${sep}from=guidance`;
}

function readStoredState(): StoredWizardState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<StoredWizardState> | null;
    if (!parsed || typeof parsed !== "object") return null;
    const answers = (parsed.answers && typeof parsed.answers === "object" ? parsed.answers : {}) as PartialAnswers;
    const activeStep =
      typeof parsed.activeStep === "number" && Number.isFinite(parsed.activeStep)
        ? Math.max(0, Math.min(TOTAL, parsed.activeStep))
        : 0;
    return { answers, activeStep };
  } catch {
    return null;
  }
}

/* ── Companion product logic ─────────────────────────────────── */
interface Companion {
  name: string;
  desc: string;
  href: string;
  image: string;
}
function getCompanions(a: GuidanceAnswers): Companion[] {
  const out: Companion[] = [];
  // Epoxy grout: any demanding condition
  if (a.moisture !== "dry" || a.area === "outdoor" || a.size === "large" || a.size === "heavy") {
    out.push({
      name: "Epoxy Grout",
      desc: "Stain-resistant joints in 20+ colourways",
      href: "/products/epoxy-grout",
      image: "/images/products/epoxy-grout.png",
    });
  }
  // Tile cleaner: outdoor or damp
  if (a.area === "outdoor" || a.moisture !== "dry") {
    out.push({
      name: "Tile Cleaners",
      desc: "Compatible surface maintenance",
      href: "/products/tile-cleaner",
      image: "/images/products/tile-cleaner.png",
    });
  }
  // Tile spacers: any cementitious installation
  if (a.material !== "glass") {
    out.push({
      name: "Tile Spacers",
      desc: "Precise joint width on any format",
      href: "/products/tile-spacer",
      image: "/images/products/tile-spacer.png",
    });
  }
  return out;
}

/* ── Credibility data for empty state ───────────────────────── */
const stats = [
  { value: "10+", label: "Years on site" },
  { value: "5", label: "Certified grades" },
  { value: "20+", label: "Grout colours" },
];
const certs = ["EN 12004", "IS 15477:2019"];
const gradeSteps = [
  { code: "C1T", hint: "Interior dry" },
  { code: "C2T", hint: "Polymer" },
  { code: "C2TE", hint: "Large / stone" },
  { code: "C2TES1", hint: "Exterior" },
  { code: "C2TES2", hint: "Immersed" },
];
const valueProps = [
  { icon: BadgeCheck, text: "Certified across all adhesive grades" },
  { icon: Layers, text: "Full system from adhesive to grout" },
  { icon: Palette, text: "Designer epoxy grout, 20+ colourways" },
  { icon: Headset, text: "Engineer support spec-to-site" },
];

/* ── Main component ──────────────────────────────────────────── */
export function ProductGuidanceWizard() {
  const [activeStep, setActiveStep] = useState(0); // next unlocked question index
  const [answers, setAnswers] = useState<PartialAnswers>({});
  // Guard the persist effect until we've attempted a one-time hydrate from
  // sessionStorage — otherwise the initial empty render would clobber any
  // saved selections before they are restored.
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = readStoredState();
    if (stored) {
      setAnswers(stored.answers);
      setActiveStep(stored.activeStep);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    if (typeof window === "undefined") return;
    try {
      const isEmpty = activeStep === 0 && Object.keys(answers).length === 0;
      if (isEmpty) {
        window.sessionStorage.removeItem(STORAGE_KEY);
      } else {
        const payload: StoredWizardState = { answers, activeStep };
        window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      }
    } catch {
      // Storage may be unavailable (private mode, quota); fail silently.
    }
  }, [answers, activeStep, hydrated]);

  function select(stepIndex: number, field: keyof GuidanceAnswers, value: string) {
    const next: PartialAnswers = { ...answers, [field]: value };
    // Roll back all subsequent answers
    guidanceQuestions.slice(stepIndex + 1).forEach((q) => {
      delete next[q.id as keyof GuidanceAnswers];
    });
    setAnswers(next);
    setActiveStep(stepIndex + 1); // advance frontier (4 = all done)
  }

  function reset() {
    setAnswers({});
    setActiveStep(0);
    if (typeof window !== "undefined") {
      try {
        window.sessionStorage.removeItem(STORAGE_KEY);
      } catch {
        // ignore
      }
    }
  }

  const allAnswered =
    guidanceQuestions.every((q) => answers[q.id as keyof GuidanceAnswers] !== undefined);
  const result = allAnswered ? getSpecificRecommendation(answers as GuidanceAnswers) : null;
  const companions = allAnswered ? getCompanions(answers as GuidanceAnswers) : [];

  return (
    <div className="overflow-hidden rounded-3xl border border-zinc-200/80 bg-white shadow-[0_4px_40px_rgba(0,0,0,0.06)]">
      {/* ── Header ─────────────────────────────────────────────── */}
      <div className="flex items-center justify-between border-b border-zinc-100 px-5 py-4">
        <div className="flex items-center gap-2.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
            <Sparkles className="h-3.5 w-3.5 text-primary" aria-hidden />
          </span>
          <span className="text-[13px] font-semibold text-zinc-800">Product helper</span>
          {activeStep > 0 && (
            <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[11px] font-medium text-zinc-500">
              {allAnswered ? "Complete" : `${activeStep} of ${TOTAL} answered`}
            </span>
          )}
        </div>
        {activeStep > 0 && (
          <button
            onClick={reset}
            className="flex items-center gap-1.5 text-[12px] font-medium text-zinc-400 transition-colors hover:text-zinc-700"
          >
            <RotateCcw className="h-3 w-3" aria-hidden />
            Reset
          </button>
        )}
      </div>

      {/* ── Two-column body ─────────────────────────────────────── */}
      <div className="grid lg:grid-cols-2 lg:divide-x lg:divide-zinc-100">

        {/* LEFT — Questions (always visible) */}
        <div className="divide-y divide-zinc-100/80">
          {guidanceQuestions.map((q, i) => {
            if (i > activeStep) return null; // not yet unlocked

            const selectedVal = answers[q.id as keyof GuidanceAnswers] as string | undefined;

            return (
              <motion.div
                key={q.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28, ease: easeExpo }}
                className="px-5 py-5"
              >
                {/* Question label */}
                <div className="mb-3.5 flex items-center gap-2.5">
                  <span
                    className={cn(
                      "flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold transition-colors duration-200",
                      selectedVal
                        ? "bg-primary text-white"
                        : "border-2 border-zinc-300 text-zinc-400",
                    )}
                  >
                    {i + 1}
                  </span>
                  <span className="text-[14px] font-semibold text-zinc-800">{q.label}</span>
                </div>

                {/* Option buttons — two per row on ≥sm */}
                <div className="grid gap-2 sm:grid-cols-2">
                  {q.options.map((opt) => {
                    const on = selectedVal === opt.value;
                    return (
                      <button
                        key={opt.value}
                        onClick={() =>
                          select(i, q.id as keyof GuidanceAnswers, opt.value)
                        }
                        className={cn(
                          "group flex w-full items-center justify-between gap-2 rounded-xl border px-4 py-3 text-left text-[13px] font-medium transition-all duration-200",
                          on
                            ? "border-primary/40 bg-primary/[0.06] text-zinc-900 ring-1 ring-primary/20 shadow-sm"
                            : "border-zinc-200 bg-zinc-50/50 text-zinc-500 hover:border-primary/25 hover:bg-white hover:text-zinc-800 hover:shadow-sm",
                        )}
                      >
                        <span>{opt.label}</span>
                        <span
                          className={cn(
                            "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-200",
                            on ? "border-primary bg-primary" : "border-zinc-300 group-hover:border-primary/50",
                          )}
                        >
                          {on && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}

          {/* Hint while in progress */}
          {!allAnswered && activeStep > 0 && (
            <p className="px-5 py-4 text-[12px] text-zinc-400">
              Answer all {TOTAL} prompts to see your recommended product.
            </p>
          )}
        </div>

        {/* RIGHT — Result or credibility empty state */}
        <div className={cn("lg:sticky lg:top-[72px] lg:self-start", !allAnswered && "hidden lg:block")}>
          <AnimatePresence mode="wait">

            {allAnswered && result ? (
              /* ── RESULT ── */
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.38, ease: easeExpo }}
                className="p-5 bg-gradient-to-br from-zinc-50/60 to-white"
              >
                <p className="mb-4 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                  <Sparkles className="h-3 w-3" aria-hidden />
                  We recommend
                </p>

                {/* Primary product card */}
                <TransitionLink
                  href={withGuidanceFlag(result.href)}
                  className="group block rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm transition-all duration-200 hover:border-primary/30 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  aria-label={`View ${result.name} product page`}
                >
                  <div className="flex gap-4">
                    <div className="relative h-[88px] w-[72px] shrink-0 overflow-hidden rounded-xl bg-zinc-100">
                      <ImageWithFallback
                        src={result.image}
                        alt={result.name}
                        fill
                        sizes="72px"
                        className="object-contain p-2"
                        reveal="none"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-baseline gap-2">
                        <span className="font-display text-[1.35rem] font-bold leading-none text-zinc-950 transition-colors group-hover:text-primary">
                          {result.name}
                        </span>
                        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
                          {result.badge}
                        </span>
                      </div>
                      <p className="mt-0.5 text-[11px] text-zinc-400">{result.grade}</p>
                      <p className="mt-2 text-[12.5px] leading-relaxed text-zinc-600">
                        {result.application}
                      </p>
                    </div>
                    <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-zinc-300 transition-all group-hover:translate-x-0.5 group-hover:text-primary" aria-hidden />
                  </div>
                  <div className="mt-3 border-t border-zinc-100 pt-3">
                    <p className="text-[12px] leading-relaxed text-zinc-500">{result.rationale}</p>
                  </div>
                </TransitionLink>

                {/* Companion products */}
                {companions.length > 0 && (
                  <div className="mt-5">
                    <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-400">
                      Also consider
                    </p>
                    <div className="space-y-2">
                      {companions.map((c) => (
                        <TransitionLink
                          key={c.name}
                          href={withGuidanceFlag(c.href)}
                          className="group flex items-center gap-3 rounded-xl border border-zinc-200 bg-white px-3.5 py-3 transition-all duration-200 hover:border-primary/30 hover:shadow-sm"
                        >
                          <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-lg bg-zinc-100">
                            <ImageWithFallback
                              src={c.image}
                              alt={c.name}
                              fill
                              sizes="36px"
                              className="object-contain p-1"
                              reveal="none"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-[13px] font-semibold text-zinc-800 group-hover:text-primary transition-colors">
                              {c.name}
                            </p>
                            <p className="text-[11px] text-zinc-400">{c.desc}</p>
                          </div>
                          <ArrowRight className="h-3.5 w-3.5 shrink-0 text-zinc-300 transition-all group-hover:translate-x-0.5 group-hover:text-primary" />
                        </TransitionLink>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTAs */}
                <div className="mt-5 flex flex-wrap gap-2.5">
                  <TransitionLink
                    href={withGuidanceFlag(result.href)}
                    className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-primary/90"
                  >
                    View Product
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                  </TransitionLink>
                  <TransitionLink
                    href="/contact"
                    className="flex items-center rounded-xl border border-zinc-200 bg-white px-5 py-2.5 text-[13px] font-semibold text-zinc-600 transition-colors hover:bg-zinc-50"
                  >
                    Talk to FIXONEX
                  </TransitionLink>
                </div>

                <p className="mt-3 text-[11px] leading-relaxed text-zinc-400">
                  Category-level guidance only — confirm grade, substrate prep, and coverage with datasheets and FIXONEX advisors.
                </p>
              </motion.div>
            ) : (

              /* ── EMPTY STATE — Credibility ── */
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-6 bg-[#0c0c0f] p-6"
              >
                {/* Eyebrow + headline */}
                <div>
                  <div className="mb-1 flex items-center gap-1.5">
                    <span className="h-px w-5 bg-primary/60" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-primary">
                      Why FIXONEX
                    </span>
                  </div>
                  <h3
                    className="font-display font-bold text-white leading-tight"
                    style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.5rem)" }}
                  >
                    Engineered for every bond.<br />
                    <span className="text-zinc-400">Certified for every site.</span>
                  </h3>
                  <p className="mt-2.5 text-[13px] leading-relaxed text-zinc-500">
                    Answer the prompts and we'll point you to the exact grade — from standard interior ceramics to immersed swimming pool environments.
                  </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2.5">
                  {stats.map((s) => (
                    <div
                      key={s.label}
                      className="flex flex-col items-center rounded-xl border border-white/[0.06] bg-white/[0.04] px-2 py-3 text-center"
                    >
                      <span className="font-display text-2xl font-bold text-white">{s.value}</span>
                      <span className="mt-1 text-[10px] leading-snug text-zinc-500">{s.label}</span>
                    </div>
                  ))}
                </div>

                {/* Certifications */}
                <div>
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-600">
                    Certified to
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {certs.map((c) => (
                      <span
                        key={c}
                        className="flex items-center gap-1.5 rounded-lg border border-primary/25 bg-primary/10 px-2.5 py-1.5 text-[11px] font-semibold text-primary"
                      >
                        <Award className="h-3 w-3" aria-hidden />
                        {c}
                      </span>
                    ))}
                    <span className="flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.04] px-2.5 py-1.5 text-[11px] font-semibold text-zinc-400">
                      <BadgeCheck className="h-3 w-3" aria-hidden />
                      C1T – C2TES2
                    </span>
                  </div>
                </div>

                {/* Grade ladder */}
                <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-4">
                  <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-600">
                    Grade ladder
                  </p>
                  <div className="flex flex-wrap items-end gap-x-1 gap-y-2">
                    {gradeSteps.map((g, i) => (
                      <div key={g.code} className="flex items-end gap-1">
                        <div className="flex flex-col items-center gap-1">
                          <span className="text-[9px] text-zinc-600">{g.hint}</span>
                          <span
                            className="rounded-md px-2 py-1 text-[10px] font-bold text-white"
                            style={{
                              background: `rgba(211,47,47,${0.35 + i * 0.13})`,
                            }}
                          >
                            {g.code}
                          </span>
                        </div>
                        {i < gradeSteps.length - 1 && (
                          <span className="mb-1.5 text-[10px] text-zinc-700">›</span>
                        )}
                      </div>
                    ))}
                  </div>
                  <p className="mt-2.5 text-[11px] text-zinc-600">
                    From interior dry to permanently submerged — one family covers it all.
                  </p>
                </div>

                {/* Value props */}
                <div className="space-y-2.5">
                  {valueProps.map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-3">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/[0.06] text-primary">
                        <Icon className="h-3.5 w-3.5" aria-hidden />
                      </span>
                      <span className="text-[13px] text-zinc-400">{text}</span>
                    </div>
                  ))}
                </div>

                {/* Bottom nudge */}
                <div className="rounded-xl border border-primary/20 bg-primary/[0.07] px-4 py-3">
                  <p className="text-[12px] font-medium text-zinc-300">
                    ← Answer the prompts to get your exact product recommendation in seconds.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
