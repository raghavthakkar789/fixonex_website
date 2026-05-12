"use client";

/**
 * Tile adhesive selector — used under **Product guidance** on the Service page.
 *
 * Sequential steps; each answered step stays expanded so choices can be changed
 * directly (later answers reset when an earlier answer changes).
 * Right panel: rich credibility + system essentials until complete; then recommendation.
 *
 * Flow:
 *   Q1 Area → Q2 Type of Area (Dry/Wet/Submerged) → Q3 Tile or Stone Type
 *   → Q4 Tile Size (depends on tile) → Q5 Substrate
 * Every step's option list is derived from prior answers; later answers reset
 * automatically when an earlier answer changes.
 */

import { Fragment, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle2, RotateCcw, ChevronRight, ArrowRight,
  MapPin, Layers, Grid3X3, Maximize2, Blocks,
  ShieldCheck, Sparkles,
} from "lucide-react";
import { TransitionLink } from "@/components/navigation/TransitionLink";
import { cn } from "@/lib/utils";
import { panelEditorialClass } from "@/lib/ui-constants";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ─── Types ───────────────────────────────────────────────────────────────── */
type AreaId      = "interior-floor" | "interior-wall" | "exterior-floor" | "exterior-wall";
type TypeId      = "dry-area" | "wet-area" | "submerged-area";
type TileId      =
  | "ceramic"
  | "vitrified"
  | "granite-marble"
  | "engineered-stone"
  | "glass-mosaic"
  | "chemical-resistant";
type TileSizeId  =
  | "s-300"
  | "s-600"
  | "s-600x1200"
  | "s-1200"
  | "s-above-1200"
  | "s-sheets";
type SubstrateId =
  | "cement-plaster"
  | "cement-concrete"
  | "tile-on-tile"
  | "wood-metal"
  | "others";

interface Answers {
  area?:      AreaId;
  type?:      TypeId;
  tile?:      TileId;
  tileSize?:  TileSizeId;
  substrate?: SubstrateId;
}

const STEP_ORDER: (keyof Answers)[] = ["area", "type", "tile", "tileSize", "substrate"];

const STEP_SHORT_LABELS = ["Area", "Type", "Tile", "Size", "Base"] as const;

/* ─── Step 1 — Area ──────────────────────────────────────────────────────── */
const AREA_OPTIONS: { id: AreaId; label: string }[] = [
  { id: "interior-floor", label: "Interior Floor" },
  { id: "interior-wall",  label: "Interior Wall"  },
  { id: "exterior-floor", label: "Exterior Floor" },
  { id: "exterior-wall",  label: "Exterior Wall"  },
];

/* ─── Step 2 — Type of Area ──────────────────────────────────────────────── */
/** Same three options regardless of area — branching happens at the tile step. */
const TYPE_OPTIONS: { id: TypeId; label: string; sub?: string }[] = [
  { id: "dry-area",       label: "Dry Area",       sub: "Bedrooms, living, hallways" },
  { id: "wet-area",       label: "Wet Area",       sub: "Bathrooms, kitchens, balconies" },
  { id: "submerged-area", label: "Submerged Area", sub: "Pools, water tanks, fountains" },
];

/* ─── Step 3 — Tile / Stone Type ─────────────────────────────────────────── */
const TILE_LABEL: Record<TileId, string> = {
  "ceramic":            "Ceramic Tile",
  "vitrified":          "Vitrified Tile",
  "granite-marble":     "Granite / Marble",
  "engineered-stone":   "Engineered Stone",
  "glass-mosaic":       "Glass Mosaic Tile",
  "chemical-resistant": "Chemical Resistant Tile",
};

function getTileOptions(area: AreaId, type: TypeId): { id: TileId; label: string }[] {
  const isExterior = area === "exterior-floor" || area === "exterior-wall";

  if (isExterior) {
    if (type === "dry-area") {
      return (["vitrified", "granite-marble", "engineered-stone"] as TileId[])
        .map((id) => ({ id, label: TILE_LABEL[id] }));
    }
    if (type === "wet-area") {
      return (["vitrified", "granite-marble"] as TileId[])
        .map((id) => ({ id, label: TILE_LABEL[id] }));
    }
    // submerged
    return [{ id: "glass-mosaic", label: TILE_LABEL["glass-mosaic"] }];
  }

  // interior floor or wall
  if (type === "dry-area") {
    return (["ceramic", "vitrified", "granite-marble", "engineered-stone"] as TileId[])
      .map((id) => ({ id, label: TILE_LABEL[id] }));
  }
  // wet or submerged — same list for interior per spec
  return (["vitrified", "glass-mosaic", "granite-marble", "chemical-resistant"] as TileId[])
    .map((id) => ({ id, label: TILE_LABEL[id] }));
}

/* ─── Step 4 — Tile Size (depends on tile) ───────────────────────────────── */
type TileSizeOption = { id: TileSizeId; label: string; sub?: string };

const SIZE_UPTO_600:        TileSizeOption = { id: "s-600",        label: "Upto 600 × 600 mm",   sub: "≈ 2 ft × 2 ft"      };
const SIZE_UPTO_600x1200:   TileSizeOption = { id: "s-600x1200",   label: "Upto 600 × 1200 mm",  sub: "≈ 2 ft × 4 ft"      };
const SIZE_UPTO_1200:       TileSizeOption = { id: "s-1200",       label: "Upto 1200 × 1200 mm", sub: "≈ 4 ft × 4 ft"      };
const SIZE_ABOVE_1200:      TileSizeOption = { id: "s-above-1200", label: "Above 1200 × 1200 mm", sub: "Large / slab format" };
const SIZE_UPTO_300:        TileSizeOption = { id: "s-300",        label: "Upto 300 × 300 mm",   sub: "≈ 1 ft × 1 ft"      };
const SIZE_SHEETS:          TileSizeOption = { id: "s-sheets",     label: "Sheets",              sub: "Mosaic sheet format" };

function getTileSizeOptions(tile: TileId): TileSizeOption[] {
  switch (tile) {
    case "vitrified":
    case "granite-marble":
      return [SIZE_UPTO_600, SIZE_UPTO_600x1200, SIZE_UPTO_1200, SIZE_ABOVE_1200];
    case "ceramic":
      return [SIZE_UPTO_300];
    case "engineered-stone":
      return [SIZE_UPTO_1200, SIZE_ABOVE_1200];
    case "glass-mosaic":
      return [SIZE_SHEETS];
    case "chemical-resistant":
      return [SIZE_UPTO_600, SIZE_UPTO_1200];
  }
}

/* ─── Step 5 — Substrate (same 5 options always) ─────────────────────────── */
const SUBSTRATE_OPTIONS: { id: SubstrateId; label: string; sub?: string }[] = [
  { id: "cement-plaster",  label: "Cementitious — Plaster / Screed", sub: "Sand-cement plaster or screed bed" },
  { id: "cement-concrete", label: "Cementitious — Concrete",         sub: "Block work or cured concrete" },
  { id: "tile-on-tile",    label: "Tile on Tile",                    sub: "Existing tiled surface" },
  { id: "wood-metal",      label: "Wood / Metal",                    sub: "Plywood, MDF, steel, or composite" },
  { id: "others",          label: "Others",                          sub: "Speciality or non-standard base" },
];

/* ─── Products ───────────────────────────────────────────────────────────── */
type ProductKey = "fix-111" | "fix-222" | "fix-333" | "fix-444" | "fix-555";
const GRADE_ORDER: ProductKey[] = ["fix-111", "fix-222", "fix-333", "fix-444", "fix-555"];

const PRODUCTS: Record<ProductKey, {
  name: string; grade: string; tagline: string;
  color: string; bg: string; href: string; image: string;
}> = {
  "fix-111": {
    name: "FIX 111", grade: "C1T · Type-1", color: "#d97706", bg: "#fffbeb",
    tagline: "Standard polymer-modified adhesive for interior ceramic wall and floor tiles.",
    href: "/products/tiles-adhesive/fix-111",
    image: "/images/products/fix-111.png",
  },
  "fix-222": {
    name: "FIX 222", grade: "C2T · Type-2", color: "#2563eb", bg: "#eff6ff",
    tagline: "Improved-adhesion mortar for interior ceramic and vitrified tile systems.",
    href: "/products/tiles-adhesive/fix-222",
    image: "/images/products/fix-222.png",
  },
  "fix-333": {
    name: "FIX 333", grade: "C2TE · Type-3", color: "#059669", bg: "#ecfdf5",
    tagline: "Enhanced deformable adhesive for large-format tiles, marble, and granite.",
    href: "/products/tiles-adhesive/fix-333",
    image: "/images/products/fix-333.png",
  },
  "fix-444": {
    name: "FIX 444", grade: "C2TES1 · Type-4", color: "#7c3aed", bg: "#f5f3ff",
    tagline: "High-performance adhesive for exterior walls and natural stone cladding.",
    href: "/products/tiles-adhesive/fix-444",
    image: "/images/products/fix-444.png",
  },
  "fix-555": {
    name: "FIX 555", grade: "C2TES2 · Type-5", color: "#dc2626", bg: "#fef2f2",
    tagline: "Maximum-deformability adhesive for swimming pools, exteriors, and tile-on-tile.",
    href: "/products/tiles-adhesive/fix-555",
    image: "/images/products/fix-555.png",
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

/** Partial answers — patterns where epoxy is commonly paired. */
function epoxyLikelyFromPartial(a: Answers): boolean {
  return (
    a.type === "wet-area" ||
    a.type === "submerged-area" ||
    a.area === "exterior-floor" ||
    a.area === "exterior-wall" ||
    a.tile === "chemical-resistant" ||
    a.substrate === "tile-on-tile"
  );
}

function getCompanions(a: Required<Answers>): Companion[] {
  const needsEpoxy = epoxyLikelyFromPartial(a);
  return COMPANIONS.filter((c) => c.always || (c.id === "epoxy-grout" && needsEpoxy));
}

const COMPANION_UI: {
  id: Companion["id"];
  name: string;
  short: string;
  href: string;
  image: string;
}[] = [
  {
    id: "epoxy-grout",
    name: "Epoxy Grout",
    short: "Stain-resistant, hygienic joints for pools, exteriors, and demanding wet areas.",
    href: "/products/epoxy-grout",
    image: "/images/products/epoxy-grout.png",
  },
  {
    id: "tile-cleaner",
    name: "Tile Cleaner",
    short: "Post-install haze removal and a showroom-grade finish.",
    href: "/products/tile-cleaner",
    image: "/images/products/tile-cleaner.png",
  },
  {
    id: "tile-spacer",
    name: "Tile Spacer",
    short: "Uniform joints from mosaic modules to large-format slabs.",
    href: "/products/tile-spacer",
    image: "/images/products/tile-spacer.png",
  },
];

/* ─── Recommendation matrix ──────────────────────────────────────────────── */
type FullAnswers = Required<Answers>;

/**
 * Map full answers to a FIX grade.
 *
 * Hard rules (always cap at the top):
 *   - Tile on tile  → FIX 555
 *   - Submerged     → FIX 555
 *
 * Otherwise compute a 0..4 level by stacking bumps:
 *   tile base + exterior + wet + size + substrate, clamped to [0,4].
 */
function recommend(a: FullAnswers): ProductKey {
  if (a.substrate === "tile-on-tile") return "fix-555";
  if (a.type === "submerged-area")    return "fix-555";

  let level: number;
  switch (a.tile) {
    case "ceramic":            level = 0; break;
    case "vitrified":          level = 1; break;
    case "granite-marble":     level = 2; break;
    case "engineered-stone":   level = 2; break;
    case "glass-mosaic":       level = 2; break;
    case "chemical-resistant": level = 3; break;
  }

  if (a.area === "exterior-floor" || a.area === "exterior-wall") level += 1;
  if (a.type === "wet-area") level += 1;

  if (a.substrate === "wood-metal") level = Math.max(level, 3);
  if (a.substrate === "others")     level += 1;

  if (a.tileSize === "s-600x1200")   level += 1;
  if (a.tileSize === "s-1200")        level += 1;
  if (a.tileSize === "s-above-1200")  level += 2;

  level = Math.max(0, Math.min(4, level));
  return GRADE_ORDER[level];
}

/* ─── Result panel — rendered below the steps once everything is answered ─ */
function ResultPanel({
  productKey,
  suggestedCompanionIds,
}: {
  productKey: ProductKey;
  suggestedCompanionIds: Set<string>;
}) {
  const p = PRODUCTS[productKey];
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease }}
      className="flex flex-col gap-5"
    >
      <div className="flex items-center gap-2">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Sparkles className="h-4 w-4" aria-hidden />
        </span>
        <div>
          <p className="eyebrow-label text-[10px] text-subhead">Your recommendation</p>
          <p className="text-[13px] font-semibold text-zinc-800">Best match for your answers</p>
        </div>
      </div>

      {/* Main product card — image aside the text */}
      <div
        className="relative overflow-hidden rounded-2xl border border-zinc-200/70 shadow-[0_24px_60px_-32px_rgba(0,0,0,0.35)]"
        style={{
          borderColor: `${p.color}40`,
          background: `linear-gradient(145deg, ${p.bg} 0%, white 52%, ${p.bg} 100%)`,
          boxShadow: `0 20px 48px -28px ${p.color}50, 0 1px 0 rgba(255,255,255,0.6) inset`,
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -right-6 top-0 h-32 w-32 rounded-full opacity-[0.35] blur-3xl"
          style={{ background: p.color }}
        />
        <div className="h-1 w-full" style={{ background: `linear-gradient(90deg,${p.color},${p.color}55,transparent)` }} />
        <div className="relative p-5 sm:p-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-6">
            {/* Product image */}
            <div
              className="relative mx-auto h-32 w-32 shrink-0 overflow-hidden rounded-xl border border-white/70 bg-white/75 p-2.5 shadow-[0_8px_20px_-12px_rgba(0,0,0,0.18)] backdrop-blur-sm sm:mx-0 sm:h-40 sm:w-40"
              style={{ boxShadow: `0 14px 28px -18px ${p.color}66, 0 1px 0 rgba(255,255,255,0.7) inset` }}
            >
              <Image
                src={p.image}
                alt={p.name}
                fill
                sizes="(min-width: 640px) 160px, 128px"
                className="object-contain"
              />
            </div>

            {/* Text content */}
            <div className="min-w-0 flex-1">
              <span
                className="mb-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider"
                style={{ background: `${p.color}20`, color: p.color }}
              >
                <CheckCircle2 className="h-3 w-3" aria-hidden />
                Recommended grade
              </span>
              <p className="font-display text-[1.75rem] font-bold leading-none tracking-tight sm:text-[2rem]" style={{ color: p.color }}>
                {p.name}
              </p>
              <p className="mt-1.5 text-xs font-semibold tracking-wide text-zinc-600">{p.grade}</p>
              <p className="mt-3 text-[13px] leading-relaxed text-zinc-600">{p.tagline}</p>
              <p className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-zinc-200/80 bg-white/70 px-2.5 py-1 text-[10px] font-medium text-zinc-500 backdrop-blur-sm">
                <ShieldCheck className="h-3.5 w-3.5 text-primary" aria-hidden />
                IS 15477:2019 aligned
              </p>
            </div>
          </div>

          <TransitionLink
            href={`${p.href}?from=guidance`}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl py-3 text-[13px] font-bold text-white shadow-lg transition-[transform,box-shadow] hover:scale-[1.01] hover:shadow-xl active:scale-[0.99]"
            style={{ background: p.color, boxShadow: `0 12px 28px -8px ${p.color}88` }}
          >
            View product details <ChevronRight className="h-4 w-4" aria-hidden />
          </TransitionLink>
        </div>
      </div>

      {/* Companion products — always list all three; highlight when rule suggests */}
      <div>
        <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-zinc-400">
          Complete your system
        </p>
        <div className="space-y-2">
          {COMPANION_UI.map(({ id, name, short, href, image }) => {
            const matched = suggestedCompanionIds.has(id);
            const isEpoxy = id === "epoxy-grout";
            return (
              <TransitionLink
                key={id}
                href={`${href}?from=guidance`}
                className={cn(
                  "group flex items-start gap-3 rounded-xl border px-4 py-3.5 shadow-sm transition-all hover:-translate-y-px hover:shadow-md",
                  matched
                    ? "border-primary/30 bg-primary/[0.04] hover:border-primary/45"
                    : isEpoxy
                      ? "border-dashed border-zinc-300/90 bg-zinc-50/80 hover:border-primary/25"
                      : "border-zinc-200/90 bg-white hover:border-primary/30",
                )}
              >
                <span
                  className={cn(
                    "relative mt-0.5 h-14 w-14 shrink-0 overflow-hidden rounded-lg border p-1.5 transition-colors",
                    matched
                      ? "border-primary/25 bg-white"
                      : "border-zinc-200/80 bg-white group-hover:border-primary/25",
                  )}
                >
                  <Image
                    src={image}
                    alt={name}
                    fill
                    sizes="56px"
                    className="object-contain"
                  />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-[12px] font-bold text-zinc-800 transition-colors group-hover:text-primary">
                      {name}
                    </p>
                    {matched ? (
                      <span className="rounded-md bg-primary/15 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-primary">
                        Suggested
                      </span>
                    ) : isEpoxy ? (
                      <span className="rounded-md bg-zinc-200/80 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-zinc-500">
                        Optional
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-0.5 text-[11px] leading-snug text-zinc-500">{short}</p>
                </div>
                <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-zinc-300 transition-colors group-hover:text-primary" aria-hidden />
              </TransitionLink>
            );
          })}
        </div>
      </div>

      {/* IS code + consult */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-zinc-200/80 bg-zinc-50/90 px-4 py-3">
        <p className="text-[11px] text-zinc-600">
          Based on <span className="font-semibold text-zinc-800">IS 15477:2019</span>
        </p>
        <TransitionLink
          href="/contact"
          className="inline-flex items-center gap-1 text-[11px] font-bold text-primary underline-offset-2 hover:underline"
        >
          Questions? Contact us <ArrowRight className="h-3 w-3" aria-hidden />
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
      whileTap={{ scale: 0.985 }}
      className={cn(
        "group relative flex w-full flex-col gap-0.5 rounded-xl border px-4 py-3.5 text-left transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2",
        selected
          ? "border-primary/90 bg-gradient-to-br from-primary/[0.08] to-primary/[0.02] text-zinc-900 shadow-[0_0_0_1px_rgba(211,47,47,0.12),0_8px_24px_-12px_rgba(211,47,47,0.25)]"
          : "border-zinc-200/90 bg-white text-zinc-800 hover:border-primary/45 hover:bg-zinc-50/80 hover:shadow-sm",
      )}
    >
      <span className="flex items-start justify-between gap-2">
        <span className="text-[13px] font-semibold leading-snug">{label}</span>
        <span
          className={cn(
            "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
            selected
              ? "border-primary bg-primary text-white"
              : "border-zinc-200 bg-white group-hover:border-primary/40",
          )}
        >
          {selected ? <CheckCircle2 className="h-3 w-3" aria-hidden /> : null}
        </span>
      </span>
      {sub && (
        <span
          className={cn(
            "text-[11px] leading-snug",
            selected ? "text-zinc-600" : "text-zinc-500 group-hover:text-zinc-600",
          )}
        >
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
  const suggestedCompanionIds = new Set(companions.map((c) => c.id));

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

  function reset() { setAnswers({}); }

  // Derived option lists — re-derived on every render from current answers.
  // Changing any earlier answer clears later answers via pick(), so this is
  // always consistent with the partial state shown on screen.
  const typeOptions      = answers.area ? TYPE_OPTIONS : [];
  const tileOptions      = answers.area && answers.type ? getTileOptions(answers.area, answers.type) : [];
  const tileSizeOptions  = answers.tile ? getTileSizeOptions(answers.tile) : [];
  const substrateOptions = answers.tileSize ? SUBSTRATE_OPTIONS : [];

  type StepDef = {
    key:      keyof Answers;
    question: string;
    desc:     string;
    Icon:     React.ElementType;
    options:  { id: string; label: string; sub?: string }[];
  };

  const steps: StepDef[] = [
    { key: "area",      question: "Select Area",               desc: "Where will the tiles be installed?",                        Icon: MapPin,    options: AREA_OPTIONS      },
    { key: "type",      question: "Select Type of Area",       desc: "Will the space stay dry, get wet, or be fully submerged?",  Icon: Layers,    options: typeOptions       },
    { key: "tile",      question: "Select Tile or Stone Type", desc: "Which material are you installing?",                        Icon: Grid3X3,   options: tileOptions       },
    { key: "tileSize",  question: "Select Tile Size",          desc: "Pick the tile format — sizes shown match the chosen material.", Icon: Maximize2, options: tileSizeOptions   },
    { key: "substrate", question: "Select Substrate",          desc: "What is the base surface you are tiling onto?",             Icon: Blocks,    options: substrateOptions  },
  ];

  return (
    <div
      className={cn(
        panelEditorialClass,
        "relative overflow-hidden",
        "shadow-[0_28px_80px_-48px_rgba(0,0,0,0.28)] ring-1 ring-zinc-200/30",
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent"
      />

      {/* ── Top bar ── */}
      <div className="relative mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200/80 bg-zinc-50/80 px-3.5 py-2 text-[11px] font-medium text-zinc-600 backdrop-blur-sm">
          <ShieldCheck className="h-3.5 w-3.5 text-primary" aria-hidden />
          <span>
            Aligned with{" "}
            <span className="font-semibold text-zinc-800">IS 15477:2019</span>
          </span>
        </div>
        <AnimatePresence>
          {answeredCount > 0 && (
            <motion.button
              type="button"
              onClick={reset}
              initial={{ opacity: 0, x: 6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 6 }}
              transition={{ duration: 0.2, ease }}
              className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3.5 py-2 text-[12px] font-semibold text-zinc-600 shadow-sm transition-all hover:border-primary/35 hover:text-primary"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden />
              Start over
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* ── Stepper ── */}
      <nav aria-label="Your selection steps" className="relative mb-8">
        <div className="flex w-full items-center">
          {steps.map((step, i) => {
            const done = answers[step.key] !== undefined;
            const active = i === answeredCount;
            const StepIcon = step.Icon;
            return (
              <Fragment key={step.key}>
                {i > 0 && (
                  <div
                    className={cn(
                      "mb-5 h-[3px] min-w-[4px] flex-1 rounded-full transition-colors duration-500 sm:mb-6",
                      answers[steps[i - 1].key] !== undefined ? "bg-primary" : "bg-zinc-100",
                    )}
                    aria-hidden
                  />
                )}
                <div className="flex shrink-0 flex-col items-center gap-1 sm:gap-1.5">
                  <span
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-xl border-2 transition-all duration-300 sm:h-9 sm:w-9",
                      done && "border-primary bg-primary text-white shadow-md shadow-primary/20",
                      active && !done && "border-primary bg-primary/[0.07] text-primary shadow-sm",
                      !done && !active && "border-zinc-200 bg-white text-zinc-300",
                    )}
                  >
                    {done ? (
                      <CheckCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden />
                    ) : (
                      <StepIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden />
                    )}
                  </span>
                  <span
                    className={cn(
                      "max-w-[4.25rem] text-center text-[8px] font-bold uppercase leading-tight tracking-wide text-zinc-400 sm:max-w-[5rem] sm:text-[9px]",
                      (done || active) && "text-zinc-800",
                    )}
                  >
                    {STEP_SHORT_LABELS[i]}
                  </span>
                </div>
              </Fragment>
            );
          })}
        </div>
      </nav>

      {/* ── Body — single column ── */}
      <div>
        <div className="space-y-2.5">
          {steps.map((step, idx) => {
            const prevAnswered = idx === 0 || answers[STEP_ORDER[idx - 1]] !== undefined;
            const isAnswered   = answers[step.key] !== undefined;
            const isActive     = prevAnswered && !isAnswered;
            const showOptions  = isAnswered || isActive;

            // Don't render steps whose parent hasn't been answered yet
            if (!prevAnswered && !isAnswered) return null;
            // Don't render steps with no options (shouldn't happen but guard)
            if (step.options.length === 0) return null;

            const selectedLabel = isAnswered
              ? step.options.find((o) => o.id === (answers[step.key] as string))?.label
              : null;

            const n = step.options.length;
            const colsCls =
              n === 1 ? "grid-cols-1" :
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
                className={cn(
                  "overflow-hidden rounded-2xl border transition-all duration-300",
                  isActive &&
                    "border-primary/30 bg-white shadow-[0_8px_40px_-16px_rgba(211,47,47,0.15),0_2px_12px_rgba(0,0,0,0.04)] ring-1 ring-primary/10",
                  isAnswered && !isActive && "border-zinc-200/60 bg-white shadow-sm ring-1 ring-zinc-200/40",
                  !isActive && !isAnswered && "border-zinc-200/40 bg-zinc-50/30 opacity-60",
                )}
              >
                <div
                  className={cn(
                    "flex w-full items-center gap-3 px-4 py-3.5 text-left sm:px-5 sm:py-4",
                  )}
                >
                  <span
                    className={cn(
                      "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border text-[10px] font-bold transition-all duration-300 sm:h-9 sm:w-9",
                      isAnswered && "border-primary bg-primary text-white shadow-sm",
                      isActive &&
                        !isAnswered &&
                        "border-primary/45 bg-primary/10 text-primary",
                      !isAnswered && !isActive && "border-zinc-200 bg-white text-zinc-400",
                    )}
                  >
                    {isAnswered ? (
                      <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden />
                    ) : isActive ? (
                      <step.Icon className="h-4 w-4 shrink-0" aria-hidden />
                    ) : (
                      <span>{idx + 1}</span>
                    )}
                  </span>

                  <div className="flex min-w-0 flex-1 items-center justify-between gap-2">
                    <div className="min-w-0">
                      <p
                        className={cn(
                          "text-[13px] font-bold leading-tight sm:text-sm",
                          isAnswered && "text-zinc-700",
                          isActive && "text-zinc-900",
                          !isActive && !isAnswered && "text-zinc-400",
                        )}
                      >
                        {step.question}
                      </p>
                      {isActive && (
                        <p className="mt-1 text-[11px] leading-snug text-zinc-500">{step.desc}</p>
                      )}
                      {isAnswered && !isActive && (
                        <p className="mt-1 text-[10px] font-medium text-zinc-400">
                          Change your choice anytime — later steps update automatically.
                        </p>
                      )}
                    </div>
                    {selectedLabel ? (
                      <span className="shrink-0 rounded-lg bg-primary/8 px-2.5 py-0.5 text-[11px] font-bold text-primary">
                        {selectedLabel}
                      </span>
                    ) : null}
                  </div>
                </div>

                {showOptions ? (
                  <div className="border-t border-zinc-100/90 bg-zinc-50/30 px-3 pb-4 pt-3 sm:px-4">
                    <div className={cn("grid gap-2.5", colsCls)}>
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
                ) : null}
              </motion.div>
            );
          })}

        </div>
      </div>

      {/* ── Result — appears below the steps once every question is answered ── */}
      <AnimatePresence>
        {resultKey && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.5, ease }}
            className="mt-10 border-t border-zinc-200/70 pt-8 sm:mt-12 sm:pt-10"
          >
            <ResultPanel
              productKey={resultKey}
              suggestedCompanionIds={suggestedCompanionIds}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
