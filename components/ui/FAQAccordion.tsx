"use client";

import { useEffect, useState } from "react";

type FAQItem = { question: string; answer: string };

type FAQAccordionProps = {
  items: FAQItem[];
  defaultOpen?: number | null;
};

export function FAQAccordion({ items, defaultOpen = null }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpen);

  useEffect(() => {
    setOpenIndex((prev) => {
      if (prev === null) return null;
      return prev < items.length ? prev : null;
    });
  }, [items.length]);

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const isOpen = index === openIndex;
        return (
          <article key={item.question} className="overflow-hidden rounded-lg border border-border-strong bg-white">
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${index}`}
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left text-base font-semibold text-foreground"
            >
              <span>{item.question}</span>
              <span className="text-xl leading-none text-subhead" aria-hidden>
                {isOpen ? "−" : "+"}
              </span>
            </button>
            {isOpen ? (
              <p id={`faq-answer-${index}`} className="border-t border-border px-4 py-4 text-sm leading-relaxed text-mid">
                {item.answer}
              </p>
            ) : null}
          </article>
        );
      })}
    </div>
  );
}
