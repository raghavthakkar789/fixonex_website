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
      <div className="mb-8 max-w-md">
        <label htmlFor="product-filter" className="sr-only">
          Filter products
        </label>
        <Input
          id="product-filter"
          placeholder="Filter by name or keyword…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      {filtered.length === 0 ? (
        <p className="rounded-sm border border-dashed border-border bg-muted px-4 py-8 text-center text-sm text-muted-foreground">
          No categories match that filter. Clear the field to see all products.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
