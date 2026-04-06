"use client";

import { useId, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  paragraphs: string[];
  /** Number of paragraphs visible before "Load more" (only shown when there are more paragraphs). */
  previewCount?: number;
  className?: string;
  paragraphClassName?: string;
  firstParagraphClassName?: string;
};

export function ExpandableParagraphs({
  paragraphs,
  previewCount = 2,
  className,
  paragraphClassName,
  firstParagraphClassName,
}: Props) {
  const [expanded, setExpanded] = useState(false);
  const panelId = useId();
  const needsToggle = paragraphs.length > previewCount;
  const hiddenCount = paragraphs.length - previewCount;

  const shown = needsToggle && !expanded ? paragraphs.slice(0, previewCount) : paragraphs;

  return (
    <div className={className}>
      <div
        id={`${panelId}-content`}
        className={cn("space-y-4 text-base leading-relaxed text-muted-foreground", paragraphClassName)}
      >
        {shown.map((text, i) => (
          <p
            key={`${i}-${text.slice(0, 24)}`}
            className={cn(i === 0 ? firstParagraphClassName : undefined)}
          >
            {text}
          </p>
        ))}
      </div>
      {needsToggle ? (
        <Button
          type="button"
          variant="link"
          size="sm"
          className="mt-3 h-auto px-0 font-medium text-primary underline-offset-4 hover:underline"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          aria-controls={`${panelId}-content`}
        >
          {expanded ? "Show less" : `Load more (${hiddenCount} paragraph${hiddenCount === 1 ? "" : "s"})`}
        </Button>
      ) : null}
    </div>
  );
}
