import type { Metadata } from "next";
import { Building2, FileText, Landmark, Shield, Scale } from "lucide-react";
import { SimplePageHero } from "@/components/ui/SimplePageHero";
import { TransitionLink } from "@/components/navigation/TransitionLink";
import { companyInfo } from "@/data/company";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Company & Legal",
  description: `Registered business information, legal notices, privacy summary, and terms of use for ${BRAND.name} and ${companyInfo.displayName}.`,
};

const SITE_ORIGIN = "https://www.fixonex.com";

export default function CompanyLegalPage() {
  return (
    <>
      <SimplePageHero
        label="Compliance"
        titleLine1="Company"
        titleLine2="& Legal"
        subtitle={`Registered details, policies, and notices for ${BRAND.name}. For quotations and technical validation, contact our team directly.`}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Company & Legal" }]}
      />

      <section
        id="company-details"
        className="relative scroll-mt-24 border-b border-zinc-200/40 bg-white"
      >
        <div aria-hidden className="pointer-events-none absolute inset-0 dot-grid-subtle opacity-30" />
        <div className="site-container section-pad-lg relative z-10">
          <div className="mx-auto max-w-3xl">
            <div className="mb-10 flex items-center gap-3">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-primary/15 bg-primary/8 text-primary">
                <Building2 className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <p className="eyebrow-label mb-1">Corporate</p>
                <h2 className="font-display text-2xl font-bold tracking-tight text-zinc-950">
                  Company information
                </h2>
              </div>
            </div>

            <div className="space-y-6 rounded-2xl border border-zinc-200/80 bg-zinc-50/40 p-8 text-[15px] leading-[1.8] text-zinc-600">
              <p>
                <strong className="font-semibold text-zinc-900">{BRAND.name}</strong> is the customer-facing tile-adhesive,
                grout, and construction-chemical brand. Commercial operations referenced on this website are conducted under{" "}
                <strong className="font-semibold text-zinc-900">{companyInfo.displayName}</strong>, Ahmedabad, Gujarat,
                India.
              </p>
              <dl className="grid gap-5 sm:grid-cols-[8.5rem_1fr] sm:gap-x-8 sm:gap-y-4">
                <dt className="text-[13px] font-bold uppercase tracking-wider text-zinc-400">Legal name</dt>
                <dd className="font-medium text-zinc-900">{companyInfo.legalName}</dd>
                <dt className="text-[13px] font-bold uppercase tracking-wider text-zinc-400">Trading name</dt>
                <dd className="font-medium text-zinc-900">{companyInfo.displayName}</dd>
                <dt className="flex items-center gap-2 text-[13px] font-bold uppercase tracking-wider text-zinc-400">
                  <Landmark className="h-3.5 w-3.5 shrink-0" aria-hidden />
                  Address
                </dt>
                <dd>{companyInfo.formattedAddress}</dd>
                <dt className="text-[13px] font-bold uppercase tracking-wider text-zinc-400">Phone</dt>
                <dd>
                  <a href={`tel:${companyInfo.phone.replace(/\s/g, "")}`} className="font-medium text-primary hover:underline">
                    {companyInfo.phone}
                  </a>
                </dd>
                <dt className="text-[13px] font-bold uppercase tracking-wider text-zinc-400">Email</dt>
                <dd>
                  <a href={`mailto:${companyInfo.email}`} className="font-medium text-primary hover:underline">
                    {companyInfo.email}
                  </a>
                </dd>
                <dt className="text-[13px] font-bold uppercase tracking-wider text-zinc-400">Hours</dt>
                <dd>{companyInfo.businessHours}</dd>
              </dl>
              <p className="border-t border-zinc-200/80 pt-6 text-[14px] text-zinc-500">
                GSTIN, PAN, MSME, or other statutory identifiers appear on quotations, tax invoices, and agreements as issued
                under applicable law — request copies from accounts or{" "}
                <a href={`mailto:${companyInfo.email}`} className="font-semibold text-primary hover:underline">
                  {companyInfo.email}
                </a>
                .
              </p>
              <TransitionLink href="/contact" className="inline-flex text-[14px] font-semibold text-primary hover:underline">
                Go to Contact →
              </TransitionLink>
            </div>
          </div>
        </div>
      </section>

      <section id="legal-disclaimers" className="relative scroll-mt-24 border-b border-zinc-200/40 bg-gradient-to-b from-[#fdfcfb] to-[#f8f5f2]">
        <div className="site-container section-pad-lg">
          <div className="mx-auto max-w-3xl">
            <div className="mb-10 flex items-center gap-3">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-800">
                <Scale className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <p className="eyebrow-label mb-1">Website</p>
                <h2 className="font-display text-2xl font-bold tracking-tight text-zinc-950">
                  Legal disclaimers
                </h2>
              </div>
            </div>
            <div className="space-y-5 text-[15px] leading-[1.8] text-zinc-600">
              <p>
                Content on <span className="font-medium text-zinc-800">{SITE_ORIGIN}</span> is provided for general product
                education and marketing. It does not replace project-specific structural, waterproofing, or compatibility
                sign-off by your engineer, architect, contractor, or the tile/adhesive supplier when required.
              </p>
              <p>
                {BRAND.name} trademarks, packaging designs, logos, photography, text, and selection tools are proprietary.
                Unauthorized reproduction or scraping may infringe intellectual property laws in India and elsewhere.
              </p>
              <p>
                We may update descriptions, classifications, certifications, imagery, links, or availability without prior
                notice. Each page shows information believed accurate at publication; errors or omissions corrected when
                identified.
              </p>
              <p className="text-[14px] text-zinc-500">
                Last reviewed:{" "}
                <time dateTime="2026-05-14">
                  May 2026
                </time>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="privacy" className="relative scroll-mt-24 border-b border-zinc-200/40 bg-white">
        <div aria-hidden className="pointer-events-none absolute inset-0 dot-grid-subtle opacity-25" />
        <div className="site-container section-pad-lg relative z-10">
          <div className="mx-auto max-w-3xl">
            <div className="mb-10 flex items-center gap-3">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-primary/15 bg-primary/8 text-primary">
                <Shield className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <p className="eyebrow-label mb-1">Privacy</p>
                <h2 className="font-display text-2xl font-bold tracking-tight text-zinc-950">
                  Privacy summary
                </h2>
              </div>
            </div>
            <div className="space-y-5 text-[15px] leading-[1.8] text-zinc-600">
              <p>
                When you use enquiry forms or email us, we process the identifiers you voluntarily supply (typically name,
                phone or email, and message content) strictly to reply, fulfil support, operate our business relationship,
                and — where lawful — send follow-up correspondence you have opted into.
              </p>
              <p>
                We do not sell personal data. Hosting, analytics (if enabled), Maps embeds on the Contact page, and email
                delivery may transmit limited technical signals to subprocessors governed by their own policies — review
                their documentation when interacting with embedded third-party widgets.
              </p>
              <p>
                You may ask to correct or delete conversational records that are not required for legal retention. Write to{" "}
                <a href={`mailto:${companyInfo.supportEmail}`} className="font-semibold text-primary hover:underline">
                  {companyInfo.supportEmail}
                </a>
                {" "}with subject line &ldquo;Privacy request&rdquo;.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="terms" className="relative scroll-mt-24 border-b border-zinc-200/40 bg-gradient-to-b from-[#fdfcfb] to-[#f8f5f2]">
        <div className="site-container section-pad-lg">
          <div className="mx-auto max-w-3xl">
            <div className="mb-10 flex items-center gap-3">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-800">
                <FileText className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <p className="eyebrow-label mb-1">Website use</p>
                <h2 className="font-display text-2xl font-bold tracking-tight text-zinc-950">
                  Terms of use (summary)
                </h2>
              </div>
            </div>
            <div className="space-y-5 text-[15px] leading-[1.8] text-zinc-600">
              <p>
                By browsing or submitting forms on our site you agree not to misuse the service (including attempting to gain
                unauthorized access, inject malware, or overload infrastructure). Automated bulk scraping of commercial
                content without consent is prohibited.
              </p>
              <p>
                External hyperlinks leave our environment; linked sites maintain independent terms. Any dispute touching{" "}
                {BRAND.name} / {companyInfo.displayName}, this website, or purchase contracts is subject to substantive laws
                of India; courts / tribunals at Ahmedabad, Gujarat, India shall retain exclusive territorial jurisdiction unless
                a signed contract states otherwise.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="product-compliance" className="relative bg-white section-pad-md">
        <div className="site-container">
          <div className="mx-auto max-w-3xl rounded-2xl border border-zinc-200/70 bg-white p-8 text-center shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
            <div className="mx-auto mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Shield className="h-5 w-5" aria-hidden />
            </div>
            <p className="eyebrow-label mb-3">Specifications</p>
            <h2 className="font-display text-xl font-bold text-zinc-950">
              Standards & datasheets
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-[1.8] text-zinc-600">
              {companyInfo.certificationsNote}
            </p>
            <TransitionLink
              href="/support"
              className="mt-6 inline-flex text-[14px] font-semibold text-primary hover:underline"
            >
              Visit Support & guides →
            </TransitionLink>
          </div>
        </div>
      </section>
    </>
  );
}
