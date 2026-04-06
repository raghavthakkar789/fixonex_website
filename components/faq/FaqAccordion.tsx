"use client";

import type { FaqItem } from "@/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ExpandableAnswer } from "@/components/content/ExpandableAnswer";

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {items.map((item) => (
        <AccordionItem key={item.id} value={item.id}>
          <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            <ExpandableAnswer text={item.answer} maxChars={280} textClassName="text-sm" />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
