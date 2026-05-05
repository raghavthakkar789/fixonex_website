"use client";

/**
 * TileAdhesiveSelector — Product Guidance Widget
 *
 * 5 sequential steps (Ardex Endura–inspired). One step open at a time.
 * Changing any answer clears all subsequent answers (rollback).
 * Result appears ONLY after all 5 steps answered.
 * Right panel: credibility content while answering → recommendation when done.
 */

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle2, RotateCcw, ChevronRight, ArrowRight,
  MapPin, Layers, Grid3X3, Maximize2, Blocks,
  Award, Users, ShieldCheck, Zap, ChevronDown,
} from "lucide-react";
import { TransitionLink } from "@/components/navigation/TransitionLink";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ─── Types ───────────────────────────────────────────────────────────────── */
type AreaId      = "interior-floor" | "interior-wall" | "exterior-floor" | "exterior-wall";
type TypeId      = "residential" | "commercial" | "swimming-pool";
type TileId      = "ceramic" | "vitrified-porcelain" | "marble" | "natural-stone" | "mosaic";
type TileSizeId  = "small" | "large";
type SubstrateId =
  | "concrete"
  | "sand-cement-screed"
  | "sand-cement-plaster"
  | "gypsum-board"
  | "existing-tiles";

interface Answers {
  area?:      AreaId;
  type?:      TypeId;
  tile?:      TileId;
  tileSize?:  TileSizeId;
  substrate?: SubstrateId;
}

const STEP_ORDER: (keyof Answers)[] = ["area", "type", "tile", "tileSize", "substrate"];

/* ─── Step 1 — Area ──────────────────────────────────────────────────────── */
const AREA_OPTIONS: { id: AreaId; label: string }[] = [
  { id: "interior-floor", label: "Interior Floor" },
  { id: "interior-wall",  label: "Interior Wall"  },
  { id: "exterior-floor", label: "Exterior Floor" },
  { id: "exterior-wall",  label: "Exterior Wall"  },
];

/* ─── Step 2 — Type of Area ──────────────────────────────────────────────── */
const TYPE_BY_AREA: Record<AreaId, { id: TypeId; label: string }[]> = {
  "interior-floor": [
    { id: "residential",   label: "Residential"   },
    { id: "commercial",    label: "Commercial"    },
    { id: "swimming-pool", label: "Swimming Pool" },
  ],
  "interior-wall": [
    { id: "residential",   label: "Residential"   },
    { id: "commercial",    label: "Commercial"    },
    { id: "swimming-pool", label: "Swimming Pool" },
  ],
  "exterior-floor": [
    { id: "residential",   label: "Residential"   },
    { id: "commercial",    label: "Commercial"    },
    { id: "swimming-pool", label: "Swimming Pool" },
  ],
  "exterior-wall": [
    { id: "residential", label: "Residential" },
    { id: "commercial",  label: "Commercial"  },
  ],
};

/* ─── Step 3 — Tile / Stone Type ─────────────────────────────────────────── */
const ALL_TILES: { id: TileId; label: string }[] = [
  { id: "ceramic",             label: "Ceramic"              },
  { id: "vitrified-porcelain", label: "Vitrified / Porcelain" },
  { id: "marble",              label: "Marble"               },
  { id: "natural-stone",       label: "Natural Stone"        },
  { id: "mosaic",              label: "Mosaic"               },
];

function getTileOptions(_area: AreaId, type: TypeId) {
  return type === "swimming-pool"
    ? ALL_TILES.filter((t) => t.id !== "marble")
    : ALL_TILES;
}

/* ─── Step 4 — Tile Size ─────────────────────────────────────────────────── */
const TILE_SIZE_OPTIONS: { id: TileSizeId; label: string; sub: string }[] = [
  { id: "small", label: "Less than 600 × 600 mm", sub: "Standard format" },
  { id: "large", label: "600 × 600 mm & above",   sub: "Large / slim format" },
];

/* ─── Step 5 — Substrate ─────────────────────────────────────────────────── */
function getSubstrateOptions(area: AreaId, type: TypeId): { id: SubstrateId; label: string }[] {
  if (type === "swimming-pool") {
    return [
      { id: "concrete",       label: "Concrete"       },
      { id: "existing-tiles", label: "Existing Tiles" },
    ];
  }
  const isFloor = area === "interior-floor" || area === "exterior-floor";
  if (isFloor) {
    return [
      { id: "concrete",           label: "Concrete"           },
      { id: "sand-cement-screed", label: "Sand Cement Screed" },
      { id: "existing-tiles",     label: "Existing Tiles"     },
    ];
  }
  if (area === "interior-wall") {
    return [
      { id: "concrete",            label: "Concrete / Block Work" },
      { id: "sand-cement-plaster", label: "Sand Cement Plaster"   },
      { id: "gypsum-board",        label: "Gypsum Board"          },
      { id: "existing-tiles",      label: "Existing Tiles"        },
    ];
  }
  return [
    { id: "concrete",            label: "Concrete / Block Work" },
    { id: "sand-cement-plaster", label: "Sand Cement Plaster"   },
    { id: "existing-tiles",      label: "Existing Tiles"        },
  ];
}

/* ─── Products ───────────────────────────────────────────────────────────── */
type ProductKey = "fix-111" | "fix-222" | "fix-333" | "fix-444" | "fix-555";
const GRADE_ORDER: ProductKey[] = ["fix-111", "fix-222", "fix-333", "fix-444", "fix-555"];

const PRODUCTS: Record<ProductKey, {
  name: string; grade: string; tagline: string;
  color: string; bg: string; href: string;
}> = {
  "fix-111": {
    name: "FIX 111", grade: "C1T · Type-1", color: "#d97706", bg: "#fffbeb",
    tagline: "Standard polymer-modified adhesive for interior ceramic wall and floor tiles.",
    href: "/products/tiles-adhesive/fix-111",
  },
  "fix-222": {
    name: "FIX 222", grade: "C2T · Type-2", color: "#2563eb", bg: "#eff6ff",
    tagline: "Improved-adhesion mortar for interior ceramic and vitrified tile systems.",
    href: "/products/tiles-adhesive/fix-222",
  },
  "fix-333": {
    name: "FIX 333", grade: "C2TE · Type-3", color: "#059669", bg: "#ecfdf5",
    tagline: "Enhanced deformable adhesive for large-format tiles, marble, and granite.",
    href: "/products/tiles-adhesive/fix-333",
  },
  "fix-444": {
    name: "FIX 444", grade: "C2TES1 · Type-4", color: "#7c3aed", bg: "#f5f3ff",
    tagline: "High-performance adhesive for exterior walls and natural stone cladding.",
    href: "/products/tiles-adhesive/fix-444",
  },
  "fix-555": {
    name: "FIX 555", grade: "C2TES2 · Type-5", color: "#dc2626", bg: "#fef2f2",
    tagline: "Maximum-deformability adhesive for swimming pools, exteriors, and tile-on-tile.",
    href: "/products/tiles-adhesive/fix-555",
  },
};

/* ─── Companion products ─────────────────────────────────────────────────── */
interface Companion { id: string; name: string; desc: string; href: string; always: boolean }
const COMPANIONS: Companion[] = [
  {
    id: "epoxy-grout",
    name: "Epoxy Grout",
    desc: "Stain-resistant, hygienic joints for pools, exteriors, and commercial wet areas.",
    href: "/products/epoxy-grout",
    always: false,
  },
  {
    id: "tile-cleaner",
    name: "Tile Cleaner",
    desc: "Post-installation cleaner that removes haze and restores showroom finish.",
    href: "/products/tile-cleaner",
    always: true,
  },
  {
    id: "tile-spacer",
    name: "Tile Spacer",
    desc: "Uniform joint width from mosaic modules to large-format slabs.",
    href: "/products/tile-spacer",
    always: true,
  },
];

function getCompanions(a: Required<Answers>): Companion[] {
  const needsEpoxy =
    a.type === "swimming-pool" ||
    a.type === "commercial" ||
    a.area === "exterior-floor" ||
    a.area === "exterior-wall" ||
    a.substrate === "gypsum-board";
  return COMPANIONS.filter((c) => c.always || (c.id === "epoxy-grout" && needsEpoxy));
}

/* ─── Recommendation matrix ──────────────────────────────────────────────── */
type FullAnswers = Required<Answers>;

function upgrade(k: ProductKey): ProductKey {
  const i = GRADE_ORDER.indexOf(k);
  return i < GRADE_ORDER.length - 1 ? GRADE_ORDER[i + 1] : k;
}

function baseRecommend(a: FullAnswers): ProductKey {
  const { area, type, tile, substrate } = a;
  if (substrate === "existing-tiles") return "fix-555";
  if (type === "swimming-pool")       return "fix-555";

  const isInterior = area === "interior-floor" || area === "interior-wall";
  if (isInterior) {
    if (type === "residential") {
      if (tile === "ceramic")             return "fix-111";
      if (tile === "vitrified-porcelain") return "fix-222";
      if (tile === "marble")              return "fix-333";
      if (tile === "natural-stone")       return "fix-333";
      if (tile === "mosaic")              return "fix-222";
    }
    if (type === "commercial") {
      if (tile === "ceramic")             return "fix-222";
      if (tile === "vitrified-porcelain") return "fix-333";
      if (tile === "marble")              return "fix-333";
      if (tile === "natural-stone")       return "fix-444";
      if (tile === "mosaic")              return "fix-333";
    }
  }
  if (area === "exterior-floor") {
    if (type === "residential") {
      if (tile === "ceramic")             return "fix-222";
      if (tile === "vitrified-porcelain") return "fix-333";
      if (tile === "marble")              return "fix-444";
      if (tile === "natural-stone")       return "fix-444";
      if (tile === "mosaic")              return "fix-333";
    }
    if (type === "commercial") {
      if (tile === "ceramic")             return "fix-333";
      if (tile === "vitrified-porcelain") return "fix-444";
      if (tile === "marble")              return "fix-444";
      if (tile === "natural-stone")       return "fix-444";
      if (tile === "mosaic")              return "fix-444";
    }
  }
  if (area === "exterior-wall") {
    if (type === "residential") {
      if (tile === "ceramic")             return "fix-333";
      if (tile === "vitrified-porcelain") return "fix-444";
      if (tile === "marble")              return "fix-444";
      if (tile === "natural-stone")       return "fix-444";
      if (tile === "mosaic")              return "fix-333";
    }
    if (type === "commercial") {
      if (tile === "ceramic")             return "fix-333";
      if (tile === "vitrified-porcelain") return "fix-444";
      if (tile === "marble")              return "fix-444";
      if (tile === "natural-stone")       return "fix-555";
      if (tile === "mosaic")              return "fix-444";
    }
  }
  return "fix-222";
}

function recommend(a: FullAnswers): ProductKey {
  const base = baseRecommend(a);
  return a.tileSize === "large" ? upgrade(base) : base;
}

/* ─── Credibility panel (right panel empty state) ────────────────────────── */
const CRED_STATS = [
  { icon: Award,       value: "IS 15477:2019", label: "Certified standard"     },
  { icon: ShieldCheck, value: "5 Grades",      label: "C1T through C2TES2"     },
  { icon: Users,       value: "1,000+",        label: "Projects across India"  },
  { icon: Zap,         value: "5 Steps",       label: "To your right product"  },
] as const;

function CredibilityPanel() {
  return (
    <div className="flex flex-col gap-5">
      {/* Headline */}
      <div>
        <p className="text-[10px] font-black uppercase tracking-[0.22em] text-zinc-400">
          Why FIXONEX
        </p>
        <h3 className="mt-2 font-display text-[1.35rem] font-bold leading-snug text-zinc-900"
          style={{ letterSpacing: "-0.03em" }}>
          India's field-tested tile adhesive — certified, graded, proven.
        </h3>
        <p className="mt-2 text-[13px] leading-relaxed text-zinc-500">
          Answer five questions and we'll pinpoint the exact FIXONEX grade for
          your substrate, area type, and tile format — aligned to IS 15477:2019.
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3">
        {CRED_STATS.map(({ icon: Icon, value, label }) => (
          <div
            key={label}
            className="flex flex-col gap-1.5 rounded-xl border border-zinc-200/70 bg-white px-4 py-3 shadow-[0_1px_4px_rgba(0,0,0,0.04)]"
          >
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-primary/8 text-primary">
              <Icon className="h-3.5 w-3.5" aria-hidden />
            </span>
            <p className="font-display text-[15px] font-black leading-tight text-zinc-900">{value}</p>
            <p className="text-[10px] font-medium leading-tight text-zinc-500">{label}</p>
          </div>
        ))}
      </div>

      {/* Certification strip */}
      <div className="rounded-xl border border-primary/15 bg-primary/[0.03] px-4 py-3">
        <p className="text-[11px] font-semibold leading-relaxed text-zinc-600">
          Every recommendation follows{" "}
          <span className="font-black text-primary">IS Code IS 15477:2019</span>
          {" "}— the Indian Standard for cementitious tile adhesives. Consult our
          technical team for complex specifications.
        </p>
      </div>

      {/* Quote */}
      <div className="relative pl-4">
        <div className="absolute inset-y-0 left-0 w-[3px] rounded-full bg-gradient-to-b from-primary to-primary/20" />
        <p className="text-[12px] italic leading-relaxed text-zinc-500">
          "The right adhesive grade is not optional — it's the difference between
          a 25-year installation and a 3-year callback."
        </p>
        <p className="mt-1 text-[10px] font-bold text-zinc-400">FIXONEX Technical Team</p>
      </div>

      {/* CTA */}
      <TransitionLink
        href="/contact"
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-3 text-[13px] font-bold text-zinc-700 shadow-sm transition-all hover:border-primary/30 hover:text-primary"
      >
        Talk to a FIXONEX Expert <ArrowRight className="h-4 w-4" />
      </TransitionLink>
    </div>
  );
}

/* ─── Result panel (right panel complete state) ──────────────────────────── */
function ResultPanel({ productKey, companions }: {
  productKey: ProductKey;
  companions: Companion[];
}) {
  const p = PRODUCTS[productKey];
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease }}
      className="flex flex-col gap-4"
    >
      <p className="text-[10px] font-black uppercase tracking-[0.22em] text-zinc-400">
        Recommended Product
      </p>

      {/* Main product card */}
      <div
        className="relative overflow-hidden rounded-2xl border"
        style={{ borderColor: `${p.color}35`, background: p.bg, boxShadow: `0 4px 28px ${p.color}18` }}
      >
        <div className="h-[3px]" style={{ background: `linear-gradient(90deg,${p.color},${p.color}80)` }} />
        <div className="p-5">
          <span
            className="mb-3 inline-block rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-[0.18em]"
            style={{ background: `${p.color}18`, color: p.color }}
          >
            Recommended
          </span>
          <p className="font-display text-[28px] font-black leading-none" style={{ color: p.color }}>
            {p.name}
          </p>
          <p className="mt-1 text-[11px] font-semibold tracking-wide" style={{ color: `${p.color}99` }}>
            {p.grade}
          </p>
          <p className="mt-3 text-[13px] leading-relaxed text-zinc-600">{p.tagline}</p>
          <p className="mt-2 text-[10px] text-zinc-400">IS Code IS 15477:2019 compliant</p>
          <TransitionLink
            href={`${p.href}?from=guidance`}
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-[13px] font-bold text-white transition-all hover:opacity-90"
            style={{ background: p.color }}
          >
            View Full Product Details <ChevronRight className="h-4 w-4" />
          </TransitionLink>
        </div>
      </div>

      {/* Companion products */}
      {companions.length > 0 && (
        <div>
          <p className="mb-2.5 text-[10px] font-black uppercase tracking-[0.18em] text-zinc-400">
            Complete Your System
          </p>
          <div className="space-y-2">
            {companions.map((c) => (
              <TransitionLink
                key={c.id}
                href={`${c.href}?from=guidance`}
                className="group flex items-center gap-3 rounded-xl border border-zinc-200/80 bg-white px-4 py-3 shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all hover:border-primary/25 hover:shadow-[0_2px_12px_rgba(0,0,0,0.07)]"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-[12px] font-bold text-zinc-800 group-hover:text-primary transition-colors">{c.name}</p>
                  <p className="text-[11px] leading-tight text-zinc-500">{c.desc}</p>
                </div>
                <ChevronRight className="h-4 w-4 shrink-0 text-zinc-300 transition-colors group-hover:text-primary" />
              </TransitionLink>
            ))}
          </div>
        </div>
      )}

      {/* IS code + consult */}
      <div className="flex items-center justify-between rounded-xl border border-zinc-100 bg-zinc-50/70 px-4 py-3">
        <p className="text-[11px] text-zinc-500">
          Per <span className="font-semibold text-zinc-700">IS 15477:2019</span>
        </p>
        <TransitionLink
          href="/contact"
          className="inline-flex items-center gap-1 text-[11px] font-bold text-primary hover:underline"
        >
          Need help? <ArrowRight className="h-3 w-3" />
        </TransitionLink>
      </div>
    </motion.div>
  );
}

/* ─── Option button ──────────────────────────────────────────────────────── */
function OptionBtn({
  label, sub, selected, onClick,
}: { label: string; sub?: string; selected: boolean; onClick: () => void }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.97 }}
      className={[
        "group relative flex w-full flex-col gap-0.5 rounded-xl border px-4 py-3 text-left transition-all duration-150",
        selected
          ? "border-primary bg-primary text-white shadow-[0_2px_16px_rgba(211,47,47,0.22)]"
          : "border-zinc-200 bg-white text-zinc-700 hover:border-primary/50 hover:bg-primary/[0.03] hover:text-primary",
      ].join(" ")}
    >
      <span className="flex items-center justify-between gap-2">
        <span className="text-[13px] font-semibold leading-snug">{label}</span>
        {selected && <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden />}
      </span>
      {sub && (
        <span className={[
          "text-[11px] leading-tight",
          selected ? "text-white/65" : "text-zinc-400 group-hover:text-primary/60",
        ].join(" ")}>
          {sub}
        </span>
      )}
    </motion.button>
  );
}

/* ─── Main component ──────────────────────────────────────────────────────── */
export function TileAdhesiveSelector() {
  const [answers, setAnswers] = useState<Answers>({});

  const answeredCount = STEP_ORDER.filter((k) => answers[k] !== undefined).length;
  const isDone        = answeredCount === STEP_ORDER.length;
  const resultKey     = isDone ? recommend(answers as FullAnswers) : null;
  const companions    = isDone ? getCompanions(answers as FullAnswers) : [];

  /** Pick an answer; clear all subsequent answers. */
  function pick<K extends keyof Answers>(key: K, value: Answers[K]) {
    setAnswers((prev) => {
      const idx  = STEP_ORDER.indexOf(key);
      const next: Answers = {};
      for (let i = 0; i < idx; i++) {
        const k = STEP_ORDER[i];
        if (prev[k] !== undefined) (next as Record<string, unknown>)[k] = prev[k];
      }
      (next as Record<string, unknown>)[key] = value;
      return next;
    });
  }

  /** Reopen a completed step: keep answers up to (but not including) that step. */
  function reopen(stepIdx: number) {
    setAnswers((prev) => {
      const next: Answers = {};
      for (let i = 0; i < stepIdx; i++) {
        const k = STEP_ORDER[i];
        if (prev[k] !== undefined) (next as Record<string, unknown>)[k] = prev[k];
      }
      return next;
    });
  }

  function reset() { setAnswers({}); }

  // Derived option lists (only computed when needed)
  const typeOptions      = answers.area ? TYPE_BY_AREA[answers.area] : [];
  const tileOptions      = answers.area && answers.type ? getTileOptions(answers.area, answers.type) : [];
  const substrateOptions = answers.area && answers.type ? getSubstrateOptions(answers.area, answers.type) : [];

  type StepDef = {
    key:      keyof Answers;
    question: string;
    desc:     string;
    Icon:     React.ElementType;
    options:  { id: string; label: string; sub?: string }[];
  };

  const steps: StepDef[] = [
    { key: "area",      question: "Select Area",               desc: "Where will the tiles be installed?",     Icon: MapPin,    options: AREA_OPTIONS      },
    { key: "type",      question: "Select Type of Area",       desc: "What is the nature of the space?",       Icon: Layers,    options: typeOptions        },
    { key: "tile",      question: "Select Tile or Stone Type", desc: "What material are your tiles?",          Icon: Grid3X3,   options: tileOptions        },
    { key: "tileSize",  question: "Select Tile Size",          desc: "What is the tile format size?",          Icon: Maximize2, options: TILE_SIZE_OPTIONS  },
    { key: "substrate", question: "Select Substrate",          desc: "What is the base surface?",              Icon: Blocks,    options: substrateOptions   },
  ];

  return (
    <div className="relative">

      {/* ── Top bar ── */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-[12px] text-zinc-500">
          Recommendations per{" "}
          <span className="font-semibold text-zinc-700">IS Code IS 15477:2019</span>
        </p>
        <AnimatePresence>
          {answeredCount > 0 && (
            <motion.button
              type="button" onClick={reset}
              initial={{ opacity: 0, x: 6 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 6 }}
              transition={{ duration: 0.2, ease }}
              className="flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-3.5 py-1.5 text-[12px] font-semibold text-zinc-500 shadow-sm transition-all hover:border-primary/40 hover:text-primary"
            >
              <RotateCcw className="h-3.5 w-3.5" /> Clear All
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* ── Progress bar ── */}
      <div className="mb-8 flex gap-1.5">
        {steps.map((s, i) => {
          const done   = answers[s.key] !== undefined;
          const active = i === answeredCount;
          return (
            <div key={s.key} className="flex min-w-0 flex-1 flex-col gap-1">
              <div className={[
                "h-1 w-full rounded-full transition-all duration-500",
                done ? "bg-primary" : active ? "bg-primary/30" : "bg-zinc-200",
              ].join(" ")} />
              <p className={[
                "hidden truncate text-[9px] font-bold uppercase tracking-[0.12em] sm:block",
                done || active ? "text-primary" : "text-zinc-400",
              ].join(" ")}>
                {["Area", "Type", "Tile", "Size", "Substrate"][i]}
              </p>
            </div>
          );
        })}
      </div>

      {/* ── Two-column body ── */}
      <div className="grid gap-6 lg:grid-cols-[1fr_340px] lg:items-start xl:grid-cols-[1fr_380px]">

        {/* Left — steps accordion */}
        <div className="space-y-2.5">
          {steps.map((step, idx) => {
            const prevAnswered = idx === 0 || answers[STEP_ORDER[idx - 1]] !== undefined;
            const isAnswered   = answers[step.key] !== undefined;
            const isActive     = prevAnswered && !isAnswered;

            // Don't render steps whose parent hasn't been answered yet
            if (!prevAnswered && !isAnswered) return null;
            // Don't render steps with no options (shouldn't happen but guard)
            if (step.options.length === 0) return null;

            const selectedLabel = isAnswered
              ? step.options.find((o) => o.id === (answers[step.key] as string))?.label
              : null;

            const n = step.options.length;
            const colsCls =
              n <= 2 ? "grid-cols-2" :
              n === 3 ? "grid-cols-2 sm:grid-cols-3" :
              n === 5 ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5" :
              "grid-cols-2 sm:grid-cols-4";

            return (
              <motion.div
                key={step.key}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease }}
                className={[
                  "overflow-hidden rounded-2xl border transition-all duration-300",
                  isActive
                    ? "border-primary/20 bg-white shadow-[0_2px_20px_rgba(0,0,0,0.06)]"
                    : isAnswered
                      ? "border-zinc-200/50 bg-zinc-50/50"
                      : "border-zinc-200/40 bg-zinc-50/30 opacity-60",
                ].join(" ")}
              >
                {/* Header — clickable on answered steps to re-select */}
                <button
                  type="button"
                  onClick={() => isAnswered && reopen(idx)}
                  disabled={!isAnswered && !isActive}
                  className={[
                    "flex w-full items-center gap-3 px-5 py-3.5 text-left",
                    isAnswered ? "cursor-pointer hover:bg-zinc-50/80" : "cursor-default",
                  ].join(" ")}
                  aria-expanded={isActive}
                >
                  {/* Circle number */}
                  <span className={[
                    "inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-black transition-all duration-300",
                    isAnswered
                      ? "bg-primary text-white"
                      : isActive
                        ? "border-2 border-primary/50 bg-primary/8 text-primary"
                        : "bg-zinc-200 text-zinc-400",
                  ].join(" ")}>
                    {isAnswered
                      ? <CheckCircle2 className="h-3.5 w-3.5" aria-hidden />
                      : <span>{idx + 1}</span>}
                  </span>

                  <div className="flex min-w-0 flex-1 items-center justify-between gap-2">
                    <div className="min-w-0">
                      <p className={[
                        "text-[13px] font-bold leading-tight",
                        isAnswered ? "text-zinc-500" : isActive ? "text-zinc-900" : "text-zinc-400",
                      ].join(" ")}>
                        {step.question}
                      </p>
                      {isActive && (
                        <p className="mt-0.5 text-[11px] text-zinc-400">{step.desc}</p>
                      )}
                    </div>
                    <div className="flex shrink-0 items-center gap-1.5">
                      {selectedLabel && (
                        <span className="rounded-lg bg-primary/8 px-2.5 py-0.5 text-[11px] font-bold text-primary">
                          {selectedLabel}
                        </span>
                      )}
                      {isAnswered && (
                        <ChevronDown className="h-3.5 w-3.5 text-zinc-400" aria-hidden />
                      )}
                    </div>
                  </div>
                </button>

                {/* Options — only when active */}
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease }}
                    >
                      <div className="border-t border-zinc-100 px-4 pb-4 pt-3">
                        <div className={`grid gap-2 ${colsCls}`}>
                          {step.options.map((opt) => (
                            <OptionBtn
                              key={opt.id}
                              label={opt.label}
                              sub={"sub" in opt ? (opt as { sub?: string }).sub : undefined}
                              selected={answers[step.key] === opt.id}
                              onClick={() => pick(step.key, opt.id as Answers[typeof step.key])}
                            />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}

          {/* ── Inline result (mobile — below steps) ── */}
          <AnimatePresence>
            {resultKey && (
              <motion.div
                key="mobile-result"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease }}
                className="block lg:hidden pt-2"
              >
                <ResultPanel productKey={resultKey} companions={companions} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right — sticky panel */}
        <div className="hidden lg:block lg:sticky lg:top-8">
          <AnimatePresence mode="wait">
            {resultKey ? (
              <motion.div
                key="result"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease }}
              >
                <ResultPanel productKey={resultKey} companions={companions} />
              </motion.div>
            ) : (
              <motion.div
                key="cred"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease }}
              >
                <CredibilityPanel />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
