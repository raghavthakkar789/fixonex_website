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
    <motion.div layout className="divide-y divide-light rounded-lg border border-light bg-white shadow-sm">
      {items.map((item, index) => {
        const isOpen = index === openIndex;
        return (
          <motion.article layout key={item.question}>
            <button
              type="button"
              suppressHydrationWarning
              className={`flex w-full items-center justify-between gap-4 px-5 py-4 text-left md:px-6 md:py-5 ${isOpen ? "border-l-[3px] border-warm pl-4 md:pl-5" : ""}`}
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${index}`}
              onClick={() => setOpenIndex(isOpen ? null : index)}
            >
              <span className="font-display text-base font-semibold text-[#111111]">{item.question}</span>
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 200, damping: 30, mass: 1 }}
                className="shrink-0 text-warm"
              >
                <ChevronDown className="h-5 w-5" aria-hidden />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  layout
                  id={`faq-answer-${index}`}
                  initial={reduced ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduced ? undefined : { height: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 28, mass: 1.1 }}
                  className="overflow-hidden"
                >
                  <p className="border-t border-light px-5 pb-5 text-[15px] leading-[1.75] text-mid md:px-6">{item.answer}</p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </motion.article>
        );
      })}
    </motion.div>
  );
}
