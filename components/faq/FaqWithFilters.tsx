"use client";

import { useMemo, useState } from "react";
import { FaqAccordion } from "@/components/faq/FaqAccordion";
import { Button } from "@/components/ui/button";
import { faqs, faqsByCategory } from "@/data/faqs";
import type { FaqItem } from "@/types";
import { cn } from "@/lib/utils";

const FAQ_INITIAL = 6;
const FAQ_LOAD_MORE = 5;

const filters: { id: "all" | FaqItem["category"]; label: string }[] = [
  { id: "all", label: "All topics" },
  { id: "products", label: "Products" },
  { id: "surfaces", label: "Surfaces" },
  { id: "consultation", label: "Consultation" },
  { id: "support", label: "Support" },
];

export function FaqWithFilters() {
  const [category, setCategory] = useState<(typeof filters)[number]["id"]>("all");
  const [faqVisible, setFaqVisible] = useState(FAQ_INITIAL);

  const items = useMemo(
    () => (category === "all" ? faqs : faqsByCategory(category)),
    [category],
  );

  const visibleItems = useMemo(() => items.slice(0, faqVisible), [items, faqVisible]);
  const canLoadMoreFaq = faqVisible < items.length;
  const expandedBeyondInitialFaq = faqVisible > FAQ_INITIAL;

  const selectCategory = (id: (typeof filters)[number]["id"]) => {
    setCategory(id);
    setFaqVisible(FAQ_INITIAL);
  };

  return (
    <div>
      <div
        className="mb-8 flex flex-wrap gap-2"
        role="tablist"
        aria-label="Filter questions by topic"
      >
        {filters.map((f) => {
          const selected = category === f.id;
          return (
            <button
              key={f.id}
              type="button"
              role="tab"
              aria-selected={selected}
              className={cn(
                "min-h-11 rounded-sm border px-4 py-2 text-sm font-medium font-heading transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                selected
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background text-foreground hover:border-primary/50 hover:text-primary",
              )}
              onClick={() => selectCategory(f.id)}
            >
              {f.label}
            </button>
          );
        })}
      </div>
      {items.length === 0 ? (
        <p className="rounded-sm border border-dashed border-border bg-muted px-4 py-8 text-center text-sm text-muted-foreground">
          No questions in this topic yet. View <strong className="text-foreground">All</strong> or contact us for
          specifics.
        </p>
      ) : (
        <>
          <FaqAccordion key={category} items={visibleItems} />
          {canLoadMoreFaq || expandedBeyondInitialFaq ? (
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              {canLoadMoreFaq ? (
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  className="min-w-[10rem]"
                  onClick={() => setFaqVisible((v) => Math.min(v + FAQ_LOAD_MORE, items.length))}
                >
                  Load more
                </Button>
              ) : null}
              {expandedBeyondInitialFaq ? (
                <Button
                  type="button"
                  variant="ghost"
                  size="lg"
                  className="min-w-[10rem] text-muted-foreground hover:text-foreground"
                  onClick={() => setFaqVisible(FAQ_INITIAL)}
                >
                  Show less
                </Button>
              ) : null}
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}
