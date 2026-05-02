"use client";

import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { ProductsShowcaseRow } from "@/components/products/ProductsShowcaseRow";

const guidanceRows: [string, string][] = [
  ["Interior Ceramic Wall", "FIX 111 (C1T)"],
  ["Large Vitrified Floor", "FIX 333 (C2TE)"],
  ["Exterior Facade", "FIX 444 or 555"],
  ["Swimming Pool", "FIX 555 (C2TES2)"],
  ["Metal / Plywood Substrate", "PU FIXO-999"],
  ["AAC Block Joints", "Block Joining Mortar"],
];

export default function ProductsPage() {
  const imageWide = "https://picsum.photos/1400/850";

  return (
    <>
      <PageHero
        label="Products"
        title="Our Products"
        subtitle="Engineered adhesion for every surface and application."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Products" }]}
      />

      <section className="section-flow-light">
        <div className="site-container section-pad-lg grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="fx-image-placeholder min-h-[320px] lg:min-h-[460px]">
            <ImageWithFallback src={imageWide} alt="Trusted adhesive applications" fill className="object-cover" />
          </div>
          <div>
            <p className="section-eyebrow">Product overview</p>
            <h2 className="mt-2 text-[clamp(1.8rem,4vw,2.8rem)] font-bold text-foreground">Engineered product system</h2>
            <p className="section-subtext mt-4">
              FIXONEX offers a complete system of tile installation solutions — from basic ceramic tile fixing to high-performance exterior applications and designer epoxy finishes.
            </p>
            <ol className="mt-6 space-y-3 text-sm text-mid">
              <li>1. Choose your tile type and substrate conditions.</li>
              <li>2. Match the adhesive class from C1T to C2TES2 or PU.</li>
              <li>3. Finish with epoxy grout for durable, stain-resistant joints.</li>
            </ol>
          </div>
        </div>
      </section>

      <ProductsShowcaseRow />

      <section className="section-flow-secondary">
        <div className="site-container section-pad-md">
          <p className="section-eyebrow">Selection guide</p>
          <h2 className="mt-2 text-[clamp(1.6rem,3vw,2.2rem)] font-bold text-foreground">Which adhesive is right for me?</h2>
          <div className="mt-7 overflow-hidden rounded-xl border border-border-strong bg-white">
            {guidanceRows.map(([surface, product], i) => (
              <div key={surface} className={`grid gap-2 px-4 py-4 sm:grid-cols-2 sm:gap-6 ${i % 2 ? "bg-muted/35" : "bg-white"}`}>
                <p className="font-medium text-foreground">{surface}</p>
                <p className="text-mid">{product}</p>
              </div>
            ))}
          </div>
          <p className="mt-5 text-sm text-mid">
            Need a documented recommendation?{" "}
            <Link href="/contact" className="font-semibold text-primary hover:text-primary-dark">
              Contact our experts
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
