"use client";

import { useMemo, useState } from "react";
import { TransitionLink } from "@/components/navigation/TransitionLink";
import { evaluateHelpSelection } from "@/data/help-recommendations";
import type {
  HelpEnvironment,
  HelpMaterial,
  HelpMoisture,
  HelpTileSize,
} from "@/types";
import { productCategories } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { asideMicroHeadingClass, cta } from "@/lib/ui-constants";
import { cn } from "@/lib/utils";

const steps = [
  { id: "environment", title: "Where is the installation?" },
  { id: "moisture", title: "What is the moisture exposure?" },
  { id: "tileSize", title: "What scale of tile or panel?" },
  { id: "material", title: "Primary finish material?" },
] as const;

type StepId = (typeof steps)[number]["id"];

const options: Record<
  StepId,
  { value: string; label: string; description: string }[]
> = {
  environment: [
    { value: "indoor", label: "Inside the building", description: "Rooms, corridors, typical interior conditions." },
    { value: "outdoor", label: "Outside / façade", description: "Patios, elevations, or anywhere sun and rain hit." },
  ],
  moisture: [
    { value: "dry", label: "Stays mostly dry", description: "Bedrooms, offices, dry shops—no regular soaking." },
    { value: "wet", label: "Often wet or splashed", description: "Bathrooms, kitchens, service areas with water." },
    { value: "immersed", label: "Pools or always under water", description: "Swimming pools, tanks, long-term immersion." },
  ],
  tileSize: [
    { value: "small", label: "Small tiles", description: "Mosaics and small modules—usually under about 300 mm." },
    { value: "medium", label: "Everyday sizes", description: "Common wall and floor formats most homes use." },
    { value: "large", label: "Large slabs / panels", description: "Big formats that need very flat backgrounds." },
    { value: "heavy", label: "Heavy stone or thick units", description: "Dense stone, thick pieces, or high dead weight." },
  ],
  material: [
    { value: "ceramic-porcelain", label: "Ceramic or vitrified tile", description: "Factory-made tile or porcelain." },
    { value: "natural-stone", label: "Natural stone", description: "Marble, granite, limestone, or similar." },
    { value: "glass-block", label: "Glass block", description: "Glass block walls or feature panels." },
    { value: "mixed", label: "More than one material", description: "Different finishes on the same project." },
  ],
};

function productBySlug(slug: string) {
  return productCategories.find((p) => p.slug === slug);
}

export function RecommendationWizard() {
  const [stepIndex, setStepIndex] = useState(0);
  const [selection, setSelection] = useState({
    environment: "indoor" as HelpEnvironment,
    moisture: "dry" as HelpMoisture,
    tileSize: "medium" as HelpTileSize,
    material: "ceramic-porcelain" as HelpMaterial,
  });

  const current = steps[stepIndex];

  const result = useMemo(
    () => evaluateHelpSelection(selection),
    [selection],
  );

  function setField(step: StepId, value: string) {
    setSelection((s) => {
      switch (step) {
        case "environment":
          return { ...s, environment: value as HelpEnvironment };
        case "moisture":
          return { ...s, moisture: value as HelpMoisture };
        case "tileSize":
          return { ...s, tileSize: value as HelpTileSize };
        case "material":
          return { ...s, material: value as HelpMaterial };
        default:
          return s;
      }
    });
  }

  return (
    <div className="grid min-w-0 gap-8 lg:grid-cols-[minmax(0,1fr)_min(100%,380px)] lg:items-start lg:gap-10">
      <Card variant="elevated" className="min-w-0 overflow-hidden">
        <CardHeader className="space-y-1 px-5 pb-2 pt-6 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-subhead">
            Step {stepIndex + 1} of {steps.length}
          </p>
          <CardTitle className="text-lg sm:text-xl">{current.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 px-5 pb-6 sm:px-6">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {options[current.id].map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setField(current.id, opt.value)}
                className={cn(
                  "min-h-[4.5rem] rounded-sm border p-4 text-left text-sm transition-colors hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                  selection[current.id] === opt.value
                    ? "border-primary bg-muted ring-1 ring-primary"
                    : "border-border bg-background",
                )}
              >
                <span className="font-heading font-semibold text-foreground">{opt.label}</span>
                <span className="mt-1 block text-muted-foreground">{opt.description}</span>
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              disabled={stepIndex === 0}
              onClick={() => setStepIndex((i) => Math.max(0, i - 1))}
            >
              Previous
            </Button>
            {stepIndex < steps.length - 1 ? (
              <Button type="button" onClick={() => setStepIndex((i) => i + 1)}>
                Next
              </Button>
            ) : (
              <Button type="button" variant="ghost" onClick={() => setStepIndex(0)}>
                Start again
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <Card variant="quiet" className="min-w-0 bg-background lg:sticky lg:top-24 lg:max-h-[calc(100dvh-8rem)] lg:overflow-y-auto">
        <CardHeader className="px-5 pt-6 sm:px-6">
          <CardTitle className="text-lg">Suggested starting point</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 px-5 pb-6 text-sm sm:px-6">
          <div>
            <p className="font-heading font-semibold text-foreground">{result.headline}</p>
            <p className="mt-2 leading-relaxed text-muted-foreground">{result.rationale}</p>
          </div>
          <div>
            <p className={asideMicroHeadingClass}>Pages to open first</p>
            <ul className="mt-2 space-y-2">
              {result.productSlugs.map((slug) => {
                const p = productBySlug(slug);
                if (!p) return null;
                return (
                  <li key={slug}>
                    <TransitionLink
                      href={`/products/${slug}`}
                      className="font-semibold text-foreground underline underline-offset-2 hover:text-subhead focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    >
                      {p.title}
                    </TransitionLink>
                  </li>
                );
              })}
            </ul>
          </div>
          <p className="border-t border-border pt-4 text-xs leading-relaxed text-muted-foreground">
            This is a first suggestion only. Waterproofing, structure, and your tile or stone supplier still rule when
            they say something different.
          </p>
          <Button asChild className="w-full" size="default">
            <TransitionLink href="/contact">{cta.contact}</TransitionLink>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
