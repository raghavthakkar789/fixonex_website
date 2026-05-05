import { TransitionLink } from "@/components/navigation/TransitionLink";
import { ArrowRight, Building2, Home, Layers, Mountain, RefreshCw, Waves } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { ProductCard } from "@/components/ui/ProductCard";
import { getTileAdhesiveProducts } from "@/lib/data/products";
import { getHomeHeroImageForTileAdhesiveLine } from "@/data/home-hero-slides";

const easeExpo = [0.16, 1, 0.3, 1];

const useCases = [
  { icon: Home, title: "Interior ceramic bathroom wall", recommendation: "FIX 111", href: "/products/tiles-adhesive/fix-111" },
  { icon: Layers, title: "Large vitrified living room floor", recommendation: "FIX 222 or 333", href: "/products/tiles-adhesive/fix-222" },
  { icon: Building2, title: "Exterior building facade", recommendation: "FIX 444", href: "/products/tiles-adhesive/fix-444" },
  { icon: Mountain, title: "Marble or granite installation", recommendation: "FIX 333 or 444", href: "/products/tiles-adhesive/fix-333" },
  { icon: Waves, title: "Swimming pool tiling", recommendation: "FIX 555", href: "/products/tiles-adhesive/fix-555" },
  { icon: RefreshCw, title: "Tile over existing tiles", recommendation: "FIX 555 or PU FIXO-999", href: "/products/tiles-adhesive/fix-555" },
] as const;

const gradeTable = [
  ["fix-111", "FIX 111", "C1T · Type-1", "Interior ceramic wall and floor", "20 kg"],
  ["fix-222", "FIX 222", "C2T · Type-2", "Interior ceramic and vitrified tiles", "20 kg"],
  ["fix-333", "FIX 333", "C2TE · Type-3", "Large format tiles, marble, granite", "20 kg"],
  ["fix-444", "FIX 444", "C2TES1 · Type-4", "Exterior walls, large format, natural stone", "20 kg"],
  ["fix-555", "FIX 555", "C2TES2 · Type-5", "Exterior, porcelain, swimming pools, tile on tile", "20 kg"],
];

export default function TilesAdhesiveHubPage() {
  const family = getTileAdhesiveProducts();

  return (
    <>
      <PageHero
        label="Tile Adhesives"
        title="Tiles Adhesive Range"
        subtitle="Five certified grades — C1T through C2TES2 — engineered for every tile type, substrate, and exposure condition."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: "Tiles Adhesive" },
        ]}
        image={getHomeHeroImageForTileAdhesiveLine()}
      />

      {/* ── Grade Cards ── */}
      <section className="relative overflow-hidden border-b border-zinc-200/40 bg-gradient-to-b from-[#f0f7ff] via-[#f4f7fb] to-[#eef2f8] py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-[10%] top-0 h-[60%] w-[50%] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(211,47,47,0.06) 0%, transparent 70%)", filter: "blur(80px)" }}
        />
        <div aria-hidden className="pointer-events-none absolute inset-0 dot-grid-subtle opacity-40" />
        <div
          aria-hidden
          className="absolute left-[6%] right-[6%] top-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(211,47,47,0.25) 50%, transparent)" }}
        />
        <div className="site-container relative z-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-primary mb-3">5 Grades</p>
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.02em] text-zinc-950 leading-tight">
            The Complete Range
          </h2>
          <p className="mt-4 max-w-xl text-[15px] leading-[1.8] text-zinc-500">
            All five grades comply with EN 12004 and IS 15477:2019. Select the grade that matches your tile format, substrate, and exposure — then click through for full specs, usage steps, and TDS.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {family.map((p, i) => (
              <ProductCard
                key={p.id}
                id={p.id}
                name={p.name}
                slug={`tiles-adhesive/${p.subSlug}`}
                badge={p.badge}
                standard={p.standard}
                applicationShort={p.applicationShort}
                sizesLine={p.sizesLine}
                image={p.image}
                dimensions={p.dimensions}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Grade comparison table ── */}
      <section className="relative overflow-hidden border-b border-zinc-200/40 bg-gradient-to-b from-[#fdfcfb] via-[#faf7f5] to-[#f8f5f2] py-20">
        <div aria-hidden className="pointer-events-none absolute inset-0 dot-grid-subtle opacity-30" />
        <div className="site-container relative z-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-primary mb-3">Grade Guide</p>
          <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-bold tracking-[-0.02em] text-zinc-950 leading-tight mb-8">
            Which Grade Is Right for Me?
          </h2>
          <div className="overflow-hidden rounded-2xl border border-zinc-200/70 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.05)]">
            {/* Table header */}
            <div className="grid grid-cols-4 gap-3 border-b border-zinc-200/70 bg-zinc-50/80 px-6 py-3 text-[11px] font-bold uppercase tracking-[0.1em] text-zinc-500">
              <p>Product</p>
              <p>Grade</p>
              <p>Best For</p>
              <p>Size</p>
            </div>
            {gradeTable.map(([slug, name, grade, use, size], i) => (
              <div
                key={slug}
                className={`grid grid-cols-4 gap-3 border-b border-zinc-100 px-6 py-4 text-sm last:border-b-0 ${i % 2 === 0 ? "bg-white" : "bg-zinc-50/50"}`}
              >
                <TransitionLink
                  href={`/products/tiles-adhesive/${slug}`}
                  className="border-l-2 border-primary/60 pl-3 font-semibold text-primary hover:text-primary/80 transition-colors"
                >
                  {name}
                </TransitionLink>
                <p className="text-zinc-600">{grade}</p>
                <p className="text-zinc-600">{use}</p>
                <p className="text-zinc-500">{size}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-[13px] text-zinc-500">
            All FIXONEX tile adhesives are certified to EN 12004 and IS 15477:2019.
          </p>
        </div>
      </section>

      {/* ── Use-case quick finder ── */}
      <section className="relative overflow-hidden bg-white py-24">
        <div className="site-container">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary mb-3">Quick Finder</p>
          <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-bold tracking-[-0.02em] text-zinc-950 leading-tight mb-8">
            Not Sure Which Grade?
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {useCases.map((item) => (
              <TransitionLink
                key={item.title}
                href={item.href}
                className="group flex items-start justify-between gap-4 rounded-2xl border border-zinc-200 bg-zinc-50 p-5 transition-all duration-200 hover:border-primary/30 hover:bg-white hover:shadow-sm"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <item.icon className="h-4 w-4" aria-hidden />
                  </div>
                  <p className="text-[14px] font-medium text-zinc-700 leading-snug">{item.title}</p>
                </div>
                <span className="shrink-0 rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-bold text-primary whitespace-nowrap">
                  {item.recommendation}
                </span>
              </TransitionLink>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-primary py-8 text-center">
        <p className="site-container text-sm font-semibold text-white md:text-base">
          Need a documented recommendation?{" "}
          <TransitionLink href="/contact" className="underline underline-offset-2 hover:text-white/80 transition-colors">
            Contact our experts →
          </TransitionLink>
        </p>
      </section>
    </>
  );
}
