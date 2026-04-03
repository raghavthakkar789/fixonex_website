import type { Metadata } from "next";
import { PageBanner } from "@/components/sections/PageBanner";
import { PageSection } from "@/components/layout/PageSection";

export const metadata: Metadata = {
  title: "Services",
  description: "FIXONEX is a product supplier. Services information will be added here when available.",
};

export default function ServicesPage() {
  return (
    <>
      <PageBanner title="Services" />
      <PageSection>
        <p className="text-base leading-relaxed text-muted-foreground">Services to be added.</p>
      </PageSection>
    </>
  );
}
