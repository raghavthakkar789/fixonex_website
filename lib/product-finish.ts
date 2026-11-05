// The same family keeps the same material sample on home, catalogue and guidance.
export function productFinish(slug: string) {
  if (slug.startsWith("fix-") || slug === "tiles-adhesive") return "finish-limestone";
  if (slug === "epoxy-grout" || slug === "tile-cleaner") return "finish-sage";
  if (slug === "block-joining-mortar") return "finish-clay";
  if (slug === "pu-fixo-999") return "finish-shale";
  return "finish-slate";
}
