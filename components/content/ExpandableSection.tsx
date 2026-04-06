"use client";

import { ExpandableParagraphs } from "@/components/content/ExpandableParagraphs";

type Props = {
  heading: string;
  paragraphs: string[];
  previewCount?: number;
  className?: string;
};

/** Article section with optional load-more for long paragraph stacks. */
export function ExpandableSection({ heading, paragraphs, previewCount = 2, className }: Props) {
  return (
    <section className={className ?? "mt-10 first:mt-0"}>
      <h2 className="font-heading text-xl font-semibold tracking-tight text-foreground">{heading}</h2>
      <ExpandableParagraphs paragraphs={paragraphs} previewCount={previewCount} className="mt-4" />
    </section>
  );
}
