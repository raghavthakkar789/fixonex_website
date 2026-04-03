import type { Metadata } from "next";
import { PageBanner } from "@/components/sections/PageBanner";
import { PageSection } from "@/components/layout/PageSection";
import { SocialLinksGrid } from "@/components/sections/SocialLinksGrid";
import { socialLinks } from "@/data/social";
import { companyInfo } from "@/data/company";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Direct Connect",
  description: "Connect with FIXONEX on Instagram, LinkedIn, YouTube, Facebook, and WhatsApp.",
};

export default function ConnectPage() {
  return (
    <>
      <PageBanner
        title="Direct connect"
        subtitle="Follow FIXONEX for product updates, application guidance, and channel announcements. Replace URLs in data/social.ts with your verified profiles."
      />
      <PageSection>
        <Card className="mb-10">
          <CardContent className="p-6 text-sm text-muted-foreground">
            <p>
              WhatsApp deep links use the number configured in{" "}
              <code className="rounded bg-muted px-1 text-xs">data/company.ts</code> (
              <code className="rounded bg-muted px-1 text-xs">whatsappNumber</code>). Social URLs live in{" "}
              <code className="rounded bg-muted px-1 text-xs">data/social.ts</code>.
            </p>
            <p className="mt-2">
              Quick WhatsApp:{" "}
              <a
                href={`https://wa.me/${companyInfo.whatsappNumber}`}
                className="font-medium text-primary underline-offset-2 transition-colors hover:text-primary-hover hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                Start WhatsApp chat
              </a>
            </p>
          </CardContent>
        </Card>
        <SocialLinksGrid links={socialLinks} />
      </PageSection>
    </>
  );
}
