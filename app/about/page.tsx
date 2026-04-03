import type { Metadata } from "next";
import { PageBanner } from "@/components/sections/PageBanner";
import { PageSection } from "@/components/layout/PageSection";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about FIXONEX: tile adhesives, block mortar, PU, epoxy grout, cleaners, and spacers—supplied from Ahmedabad with dealer support and remote product guidance.",
};

export default function AboutPage() {
  return (
    <>
      <PageBanner
        title="About FIXONEX"
        subtitle="Industrial-grade tile adhesives, block joining mortar, PU FIXO-999, epoxy grout, cleaners, and spacers for residential and commercial programs across India."
      />
      <PageSection>
        <div className="max-w-none space-y-6 text-sm leading-relaxed text-muted-foreground">
          <p className="text-base font-medium text-foreground">
            {BRAND.name} exists to remove guesswork from tile and stone installations. We work with teams that cannot
            afford mismatched submittals, avoidable callbacks, or maintenance chemistry that fights the grout you
            specified.
          </p>
          <p>
            Our experience runs the length of the ceramic supply chain—from formulation discipline and batch consistency
            through dealer logistics and product-inquiry handling. That shapes how we document products, train channels,
            and answer when a specifier requests a defensible alternate mid-tender.
          </p>
          <SectionHeading
            title="What we cover"
            description="The portfolio is organized around the sequence installers actually execute on site—not catalog chapters."
            className="mt-12 max-w-2xl"
          />
          <ul className="mt-6 max-w-3xl space-y-4">
            <li>
              <strong className="text-foreground">Tile adhesives:</strong> cementitious and polymer-modified systems for
              interior and exterior assemblies, with attention to open time, transfer, and large-format demands.
            </li>
            <li>
              <strong className="text-foreground">Tile cleaners:</strong> haze control and maintenance chemistry that
              respects grout lines and factory finishes when used as directed.
            </li>
            <li>
              <strong className="text-foreground">Jointing solutions:</strong> cementitious grouts tuned to traffic,
              joint width, and cleaning expectations across commercial and residential programs.
            </li>
            <li>
              <strong className="text-foreground">PU products:</strong> polyurethane systems for elastic interfaces
              where engineered movement and perimeter details matter as much as bond.
            </li>
            <li>
              <strong className="text-foreground">Epoxy grout:</strong> high-performance jointing for kitchens,
              laboratories, and other environments with aggressive cleaning regimes—when crews are trained for the
              chemistry.
            </li>
            <li>
              <strong className="text-foreground">Tile spacers:</strong> precision accessories that keep joint rhythm
              consistent across long runs and visible grids.
            </li>
          </ul>
          <p className="mt-10 max-w-3xl border-l-4 border-primary py-1 pl-6 text-foreground">
            Reliability is traceable recommendations, conservative claims where data is still maturing, and timely answers
            when your site sequence is under pressure—not a tagline on a bag.
          </p>
        </div>
      </PageSection>
    </>
  );
}
