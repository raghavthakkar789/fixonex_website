import type { Metadata } from "next";
import Link from "next/link";
import { PageBanner } from "@/components/sections/PageBanner";
import { PageSection } from "@/components/layout/PageSection";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { FaqWithFilters } from "@/components/faq/FaqWithFilters";
import { SupportLibraryGrid } from "@/components/support/SupportLibraryGrid";
import { supportGuides, usageSteps, safetyNotes } from "@/data/support-guides";
import { Button } from "@/components/ui/button";
import { cta, panelSurfaceClass } from "@/lib/ui-constants";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Support",
  description:
    "FIXONEX Support — how-to articles, on-site checklists, safety notes, and FAQs for adhesives, grout, and finishing.",
};

export default function SupportPage() {
  return (
    <>
      <PageBanner
        importance="compact"
        title="FIXONEX Support"
        subtitle="Short articles, a simple step list, safety reminders, and questions sorted by topic — written to clear confusion, not to impress with jargon."
      />
      <PageSection spacing="default" className="bg-muted">
        <p className="mb-6 max-w-lg text-xs leading-relaxed text-muted-foreground sm:mb-8 sm:text-sm">
          Start with an article when you want the “why.” Use the checklist when you only need the order of work. Open the FAQ when you are comparing options. Links point back to FIXONEX product pages where they help.
        </p>

        <div id="guides" className={cn("scroll-mt-24", panelSurfaceClass)}>
          <SectionHeading
            eyebrow="Library"
            title="How-to articles"
            description="Each card opens a full guide; related FIXONEX ranges are linked from the card when relevant."
            importance="primary"
            className="mb-6 max-w-2xl sm:mb-8"
          />
          <SupportLibraryGrid guides={supportGuides} />
        </div>

        <SectionHeading
          eyebrow="Checklist"
          title="Key steps on site"
          description="A practical order from prep through protecting fresh work — after someone has skimmed the sheet."
          importance="secondary"
          className="mb-5 mt-10 max-w-2xl sm:mb-7 sm:mt-12 lg:mt-14"
        />
        <ol className="grid gap-3 sm:grid-cols-2 sm:gap-4 md:gap-5">
          {usageSteps.map((s) => (
            <li
              key={s.step}
              className="flex gap-4 rounded-md border border-border bg-background p-4 shadow-card sm:gap-4 sm:p-5"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-foreground font-heading text-xs font-bold text-white sm:text-sm">
                {s.step}
              </span>
              <div>
                <p className="font-heading text-sm font-bold tracking-tight text-foreground">{s.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className={cn("mt-9 sm:mt-11", panelSurfaceClass)}>
          <SectionHeading
            eyebrow="Safety"
            title="Stay safe around mixes and kits"
            description="Basics to keep in mind on any job that opens a FIXONEX bag or chemical kit."
            importance="quiet"
            className="mb-4 max-w-xl"
          />
          <ul className="space-y-2 text-xs text-muted-foreground sm:text-sm">
            {safetyNotes.map((n) => (
              <li key={n} className="border-l-4 border-foreground pl-3">
                {n}
              </li>
            ))}
          </ul>
        </div>
      </PageSection>

      <PageSection spacing="compact" className="border-t border-border bg-background">
        <div id="faq" className="scroll-mt-24">
          <SectionHeading
            eyebrow="FAQ"
            title="Questions by topic"
            description="Still stuck? Contact gets you a human answer in plain language."
            importance="default"
            className="mb-6 max-w-2xl sm:mb-7"
          />
          <FaqWithFilters />
        </div>
      </PageSection>

      <div className="border-t border-border bg-foreground py-9 text-center sm:py-11">
        <p className="font-heading text-sm font-bold tracking-tight text-white sm:text-base">Want to talk to someone at FIXONEX?</p>
        <p className="mt-2 text-xs text-white/75 sm:text-sm">
          A short message is enough — we reply with clear next steps.
        </p>
        <Button asChild className="mt-6 w-full sm:w-auto" size="lg">
          <Link href="/contact">{cta.contact}</Link>
        </Button>
      </div>
    </>
  );
}
