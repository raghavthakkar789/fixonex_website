"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const DEFAULT_MAX = 260;

function truncateAtWord(text: string, max: number): string {
  if (text.length <= max) return text;
  const slice = text.slice(0, max);
  const lastSpace = slice.lastIndexOf(" ");
  const cut = lastSpace > 48 ? slice.slice(0, lastSpace) : slice;
  return `${cut.trim()}…`;
}

type Props = {
  text: string;
  maxChars?: number;
  className?: string;
  textClassName?: string;
};

/** Single FAQ / blurb answer with load more when text exceeds maxChars. */
export function ExpandableAnswer({ text, maxChars = DEFAULT_MAX, className, textClassName }: Props) {
  const [expanded, setExpanded] = useState(false);
  const needsToggle = text.length > maxChars;
  const display = needsToggle && !expanded ? truncateAtWord(text, maxChars) : text;

  return (
    <div className={className}>
      <p className={cn("leading-relaxed", textClassName)}>{display}</p>
      {needsToggle ? (
        <Button
          type="button"
          variant="link"
          size="sm"
          className="mt-2 h-auto px-0 font-medium text-primary underline-offset-4 hover:underline"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
        >
          {expanded ? "Show less" : "Load more"}
        </Button>
      ) : null}
    </div>
  );
}
