"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useReducedMotion } from "@/lib/useReducedMotion";

type FAQItem = { question: string; answer: string };

type FAQAccordionProps = {
  items: FAQItem[];
  defaultOpen?: number | null;
};

export function FAQAccordion({ items, defaultOpen = null }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpen);
  const reduced = useReducedMotion();

  useEffect(() => {
    setOpenIndex((prev) => {
      if (prev === null) return null;
      return prev < items.length ? prev : null;
    });
  }, [items.length]);

  return (
    <div className="divide-y divide-border rounded-md border border-border bg-white">
      {items.map((item, index) => {
        const isOpen = index === openIndex;
        return (
          <article key={item.question}>
            <button
              type="button"
              suppressHydrationWarning
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left md:px-6 md:py-5"
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${index}`}
              onClick={() => setOpenIndex(isOpen ? null : index)}
            >
              <span className="font-body text-base font-semibold text-black">{item.question}</span>
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: reduced ? 0 : 0.25 }}
                className="shrink-0 text-primary"
              >
                <ChevronDown className="h-5 w-5" aria-hidden />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  id={`faq-answer-${index}`}
                  initial={reduced ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduced ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="border-t border-border px-5 pb-5 text-[15px] leading-[1.75] text-mid md:px-6">{item.answer}</p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </article>
        );
      })}
    </div>
  );
}
