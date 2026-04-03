import type { Metadata } from "next";
import { PageBanner } from "@/components/sections/PageBanner";
import { PageSection } from "@/components/layout/PageSection";
import { projects } from "@/data/projects";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Projects & Gallery",
  description:
    "FIXONEX project showcase: commercial, retail, healthcare, hospitality, and residential tile assemblies.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageBanner
        title="Projects & gallery"
        subtitle="Representative projects built with FIXONEX products. Replace placeholders with photography cleared for public marketing."
      />
      <PageSection>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((proj) => (
            <Card key={proj.id} className="overflow-hidden">
              <div
                className="aspect-[4/3] w-full bg-[repeating-linear-gradient(135deg,#E0E0E0_0,#E0E0E0_1px,transparent_1px,transparent_10px)]"
                role="img"
                aria-label={proj.imageAlt}
              />
              <CardContent className="p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-primary">{proj.sector}</p>
                <h2 className="mt-1 font-heading text-lg font-semibold text-foreground">{proj.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{proj.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </PageSection>
    </>
  );
}
