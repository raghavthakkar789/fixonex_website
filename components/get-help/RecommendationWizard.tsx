"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
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
    { value: "indoor", label: "Interior", description: "Climate-controlled or typical indoor exposure." },
    { value: "outdoor", label: "Exterior", description: "Facades, patios, or other outdoor assemblies." },
  ],
  moisture: [
    { value: "dry", label: "Dry areas", description: "Living spaces, offices, dry retail zones." },
    { value: "wet", label: "Wet areas", description: "Bathrooms, kitchens, back-of-house wash zones." },
    { value: "immersed", label: "Immersed / pools", description: "Tanks, pools, or prolonged water contact." },
  ],
  tileSize: [
    { value: "small", label: "Small modular", description: "Mosaics and modules under ~300 mm." },
    { value: "medium", label: "Standard format", description: "Typical wall and floor modules." },
    { value: "large", label: "Large-format", description: "Panels where flatness and trowel transfer are critical." },
    { value: "heavy", label: "Heavy units / stone", description: "Thick stone, large panels, or high dead load." },
  ],
  material: [
    { value: "ceramic-porcelain", label: "Ceramic / porcelain", description: "Glazed or unglazed factory tile." },
    { value: "natural-stone", label: "Natural stone / marble", description: "Marble, granite, limestone, and similar." },
    { value: "glass-block", label: "Glass block", description: "Mortared glass block partitions or features." },
    { value: "mixed", label: "Mixed site", description: "Multiple materials across one project." },
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
      <Card className="min-w-0 overflow-hidden">
        <CardHeader className="space-y-1 px-5 pb-2 pt-6 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
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
              Back
            </Button>
            {stepIndex < steps.length - 1 ? (
              <Button type="button" onClick={() => setStepIndex((i) => i + 1)}>
                Continue
              </Button>
            ) : (
              <Button type="button" variant="ghost" onClick={() => setStepIndex(0)}>
                Start over
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="min-w-0 border-primary/30 bg-muted/50 lg:sticky lg:top-24 lg:max-h-[calc(100dvh-8rem)] lg:overflow-y-auto">
        <CardHeader className="px-5 pt-6 sm:px-6">
          <CardTitle className="text-lg">Guidance snapshot</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 px-5 pb-6 text-sm sm:px-6">
          <div>
            <p className="font-heading font-semibold text-foreground">{result.headline}</p>
            <p className="mt-2 leading-relaxed text-muted-foreground">{result.rationale}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Related FIXONEX lines
            </p>
            <ul className="mt-2 space-y-2">
              {result.productSlugs.map((slug) => {
                const p = productBySlug(slug);
                if (!p) return null;
                return (
                  <li key={slug}>
                    <Link
                      href={`/products/${slug}`}
                      className="font-medium text-primary underline-offset-2 hover:text-primary-hover hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    >
                      {p.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <p className="border-t border-border pt-4 text-xs leading-relaxed text-muted-foreground">
            Orientation only—confirm with structural, waterproofing, and manufacturer data for your site before
            specification.
          </p>
          <Button asChild className="w-full">
            <Link href="/book-consultation">Request product guidance</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
