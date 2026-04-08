"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "@/components/sections/ProductCard";
import { Input } from "@/components/ui/input";
import type { ProductCategory } from "@/types";

export function ProductGridWithFilter({ products }: { products: ProductCategory[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.slug.replace(/-/g, " ").includes(q),
    );
  }, [products, query]);

  return (
    <div>
      <div className="mb-6 max-w-md sm:mb-7">
        <label htmlFor="product-filter" className="sr-only">
          Search FIXONEX products
        </label>
        <Input
          id="product-filter"
          placeholder="Search by name or keyword"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      {filtered.length === 0 ? (
        <p className="rounded-md border border-dashed border-border bg-muted px-4 py-8 text-center text-sm text-muted-foreground">
          No match — clear the search to see all products.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
          {filtered.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
