"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

type Props = {
  items: string[];
  previewCount?: number;
  listClassName?: string;
};

export function ExpandableBulletList({ items, previewCount = 4, listClassName }: Props) {
  const [expanded, setExpanded] = useState(false);
  const needsToggle = items.length > previewCount;
  const hiddenCount = items.length - previewCount;
  const shown = needsToggle && !expanded ? items.slice(0, previewCount) : items;

  return (
    <div>
      <ul className={listClassName ?? "list-inside list-disc space-y-1.5"}>
        {shown.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      {needsToggle ? (
        <Button
          type="button"
          variant="link"
          size="sm"
          className="mt-2 h-auto px-0 font-medium text-primary underline-offset-4 hover:underline"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
        >
          {expanded ? "Show less" : `Load more (${hiddenCount} item${hiddenCount === 1 ? "" : "s"})`}
        </Button>
      ) : null}
    </div>
  );
}
