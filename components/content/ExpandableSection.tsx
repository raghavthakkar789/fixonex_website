"use client";

import { ExpandableParagraphs } from "@/components/content/ExpandableParagraphs";
import { cn } from "@/lib/utils";

type Props = {
  heading: string;
  paragraphs: string[];
  previewCount?: number;
  className?: string;
  headingClassName?: string;
  paragraphClassName?: string;
};

/** Article section with optional load-more for long paragraph stacks. */
export function ExpandableSection({
  heading,
  paragraphs,
  previewCount = 2,
  className,
  headingClassName,
  paragraphClassName,
}: Props) {
  return (
    <section className={className ?? "mt-10 first:mt-0"}>
      <h2
        className={cn(
          "font-heading text-xl font-semibold tracking-tight text-foreground",
          headingClassName,
        )}
      >
        {heading}
      </h2>
      <ExpandableParagraphs
        paragraphs={paragraphs}
        previewCount={previewCount}
        className="mt-4"
        paragraphClassName={paragraphClassName}
      />
    </section>
  );
}
