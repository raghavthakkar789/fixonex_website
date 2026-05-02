"use client";

import { BRAND } from "@/lib/brand";
import { products } from "@/lib/data/products";
import { TransitionLink } from "@/components/navigation/TransitionLink";

export function Footer() {
  const footerProducts = [
    { label: "Tiles Adhesive", href: "/products/tiles-adhesive" },
    ...products
      .filter((p) => p.familySlug !== "tiles-adhesive")
      .map((p) => ({ label: p.name, href: `/products/${p.slug}` })),
  ];

  return (
    <footer className="border-t border-border-strong bg-[#111111] text-zinc-200">
      <div className="site-container section-pad-md grid gap-10 md:grid-cols-[1.2fr_1fr]">
        <div>
          <p className="text-2xl font-bold tracking-tight text-white">{BRAND.name}</p>
          <p className="mt-3 max-w-prose text-sm leading-relaxed text-zinc-400">{BRAND.tagline}</p>
        </div>
        <div>
          <p className="text-helper text-zinc-500">Products</p>
          <nav aria-label="Footer products" className="mt-4">
            <ul className="grid gap-2 sm:grid-cols-2">
              {footerProducts.slice(0, 8).map((p) => (
                <li key={p.href}>
                  <TransitionLink href={p.href} className="text-sm text-zinc-300 hover:text-white">
                    {p.label}
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
      <div className="border-t border-zinc-800 py-4">
        <div className="site-container text-sm text-zinc-500">© {new Date().getFullYear()} {BRAND.name}. All rights reserved.</div>
      </div>
    </footer>
  );
}
