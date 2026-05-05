/**
 * Resolves `ProductCategory.slug` from `@/data/products` to a URL that exists as a static
 * `app/products/**` route (required for `output: "export"`).
 *
 * Catalog detail slugs in `@/lib/data/products` differ (e.g. `pu-fixo-999` vs `pu-products`).
 */
export function hrefForProductCategorySlug(categorySlug: string): string {
  switch (categorySlug) {
    case "tile-adhesives":
      return "/products/tiles-adhesive";
    case "pu-products":
      return "/products/pu-fixo-999";
    case "tile-cleaners":
      return "/products/tile-cleaner";
    case "tile-spacers":
      return "/products/tile-spacer";
    default:
      return `/products/${categorySlug}`;
  }
}
