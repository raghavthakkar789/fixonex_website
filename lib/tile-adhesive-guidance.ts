/**
 * Product-guidance matrix for tile adhesives.
 *
 * Source of truth: internal application chart (Tiles Adhesive Type-1…Type-5)
 * with columns for area, moisture, tile body, plaster, tile-on-tile, and size ref.
 * Note on the chart: “pu for metal/ply always.”
 *
 * Type-2 tile-body cells are blank on the chart; that row is size-ref 2 on
 * interior floor + dry + plaster, which is vitrified (ceramic is Type-1 only).
 */

export type AreaId = "interior-floor" | "interior-wall" | "exterior-floor" | "exterior-wall";
export type TypeId = "dry-area" | "wet-area" | "submerged-area";
export type TileId = "ceramic" | "vitrified" | "granite-marble";
export type TileSizeId = "s-300" | "s-600" | "s-600x1200" | "s-1200" | "s-above-1200";
export type SubstrateId =
  | "cement-plaster"
  | "cement-concrete"
  | "tile-on-tile"
  | "wood-metal"
  | "others";

export type ProductKey =
  | "fix-111"
  | "fix-222"
  | "fix-333"
  | "fix-444"
  | "fix-555"
  | "pu-fixo-999";

export type GuidanceAnswers = {
  area: AreaId;
  type: TypeId;
  tile: TileId;
  tileSize: TileSizeId;
  substrate: SubstrateId;
};

type ChartSubstrate = "plaster" | "tile-on-tile";
type Grade = 1 | 2 | 3 | 4 | 5;

type GradeRule = {
  grade: Grade;
  product: Exclude<ProductKey, "pu-fixo-999">;
  areas: readonly AreaId[];
  moisture: readonly TypeId[];
  tiles: readonly TileId[];
  substrates: readonly ChartSubstrate[];
  sizes: readonly TileSizeId[];
};

/** Size ref 1 — Type-1: ceramic 300 mm, vitrified 600 mm. */
const SIZE_REF_1: readonly TileSizeId[] = ["s-300", "s-600"];
/** Size ref 2 — Type-2: up to 600 × 1200 mm. */
const SIZE_REF_2: readonly TileSizeId[] = ["s-600x1200"];
/** Size ref 3 — Type-3 / 4 / 5: 600 mm stone through slab format. */
const SIZE_REF_3: readonly TileSizeId[] = ["s-600", "s-600x1200", "s-1200", "s-above-1200"];

const INTERIOR: readonly AreaId[] = ["interior-wall", "interior-floor"];
const ALL_AREAS: readonly AreaId[] = ["interior-wall", "interior-floor", "exterior-wall", "exterior-floor"];
const VIT_STONE: readonly TileId[] = ["vitrified", "granite-marble"];
const PLASTER_AND_OVERLAY: readonly ChartSubstrate[] = ["plaster", "tile-on-tile"];

const GRADES: readonly GradeRule[] = [
  {
    grade: 1,
    product: "fix-111",
    areas: INTERIOR,
    moisture: ["dry-area"],
    tiles: ["ceramic", "vitrified"],
    substrates: ["plaster"],
    sizes: SIZE_REF_1,
  },
  {
    grade: 2,
    product: "fix-222",
    areas: ["interior-floor"],
    moisture: ["dry-area"],
    tiles: ["vitrified"],
    substrates: ["plaster"],
    sizes: SIZE_REF_2,
  },
  {
    grade: 3,
    product: "fix-333",
    areas: INTERIOR,
    moisture: ["dry-area"],
    tiles: VIT_STONE,
    substrates: PLASTER_AND_OVERLAY,
    sizes: SIZE_REF_3,
  },
  {
    grade: 4,
    product: "fix-444",
    areas: ALL_AREAS,
    moisture: ["dry-area", "wet-area"],
    tiles: VIT_STONE,
    substrates: PLASTER_AND_OVERLAY,
    sizes: SIZE_REF_3,
  },
  {
    grade: 5,
    product: "fix-555",
    areas: ALL_AREAS,
    moisture: ["dry-area", "wet-area", "submerged-area"],
    tiles: VIT_STONE,
    substrates: PLASTER_AND_OVERLAY,
    sizes: SIZE_REF_3,
  },
];

const TILE_ORDER: readonly TileId[] = ["ceramic", "vitrified", "granite-marble"];
const SIZE_ORDER: readonly TileSizeId[] = ["s-300", "s-600", "s-600x1200", "s-1200", "s-above-1200"];

export const TILE_LABEL: Record<TileId, string> = {
  ceramic: "Ceramic Tile",
  vitrified: "Vitrified Tile",
  "granite-marble": "Granite / Marble",
};

function chartSubstrate(substrate: SubstrateId): ChartSubstrate | null {
  if (substrate === "tile-on-tile") return "tile-on-tile";
  if (substrate === "wood-metal") return null;
  return "plaster";
}

function ruleFits(
  rule: GradeRule,
  area: AreaId,
  moisture: TypeId,
  tile?: TileId,
  tileSize?: TileSizeId,
  chartBase?: ChartSubstrate | null,
): boolean {
  if (!rule.areas.includes(area)) return false;
  if (!rule.moisture.includes(moisture)) return false;
  if (tile && !rule.tiles.includes(tile)) return false;
  if (tileSize && !rule.sizes.includes(tileSize)) return false;
  if (chartBase && !rule.substrates.includes(chartBase)) return false;
  return true;
}

function uniqueInOrder<T>(ids: Iterable<T>, order: readonly T[]): T[] {
  const set = new Set(ids);
  return order.filter((id) => set.has(id));
}

export function getTileOptions(area: AreaId, moisture: TypeId): { id: TileId; label: string }[] {
  const ids = new Set<TileId>();
  for (const rule of GRADES) {
    if (ruleFits(rule, area, moisture)) {
      for (const tile of rule.tiles) ids.add(tile);
    }
  }
  return uniqueInOrder(ids, TILE_ORDER).map((id) => ({ id, label: TILE_LABEL[id] }));
}

export function getEligibleTileSizes(area: AreaId, moisture: TypeId, tile: TileId): TileSizeId[] {
  const ids = new Set<TileSizeId>();
  for (const rule of GRADES) {
    if (ruleFits(rule, area, moisture, tile)) {
      for (const size of rule.sizes) {
        if (tile === "ceramic" && size !== "s-300") continue;
        if (tile !== "ceramic" && size === "s-300") continue;
        ids.add(size);
      }
    }
  }
  return uniqueInOrder(ids, SIZE_ORDER);
}

export function getEligibleSubstrates(a: Omit<GuidanceAnswers, "substrate">): SubstrateId[] {
  const shown: SubstrateId[] = ["cement-plaster", "cement-concrete"];
  const overlayOk = GRADES.some((rule) =>
    ruleFits(rule, a.area, a.type, a.tile, a.tileSize, "tile-on-tile"),
  );
  if (overlayOk) shown.push("tile-on-tile");
  shown.push("wood-metal", "others");
  return shown;
}

/** Lowest chart grade that satisfies every selected column; PU when the base is metal/ply. */
export function recommend(a: GuidanceAnswers): ProductKey {
  if (a.substrate === "wood-metal") return "pu-fixo-999";

  const base = chartSubstrate(a.substrate);
  const matches = GRADES.filter((rule) =>
    ruleFits(rule, a.area, a.type, a.tile, a.tileSize, base),
  );

  if (matches.length === 0) {
    const fallback = GRADES.filter((rule) => ruleFits(rule, a.area, a.type, a.tile, a.tileSize)).at(-1);
    return fallback?.product ?? "fix-555";
  }

  return matches[0]!.product;
}
