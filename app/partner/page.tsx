"use client";

import { useForm } from "react-hook-form";
import { Loader2, Network, Package, Shield, TrendingUp } from "lucide-react";
import { useState } from "react";
import { PageHero } from "@/components/ui/PageHero";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { selectControlClass } from "@/lib/ui-constants";

type DealerForm = {
  businessName: string;
  contactName: string;
  phone: string;
  city: string;
  businessType: string;
  message: string;
};

const businessTypes = ["Tile Shop", "Hardware Store", "Building Materials", "Contractor", "Other"] as const;

export default function PartnerPage() {
  const [submitting, setSubmitting] = useState(false);
  const imageWide = "https://picsum.photos/200";
  const { register, handleSubmit, reset } = useForm<DealerForm>({
    defaultValues: { businessType: businessTypes[0] },
  });

  const onSubmit = async () => {
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    setSubmitting(false);
    reset();
  };

  return (
    <>
      <PageHero
        label="Partners"
        title="Partner with FIXONEX"
        subtitle="Grow your business with a trusted construction chemical brand."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Partner" }]}
      />

      <section className="section-pad bg-white">
        <div className="site-container grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <p className="section-eyebrow">Channel Partnership</p>
            <h2 className="font-heading text-display font-semibold text-black">Become a FIXONEX Dealer</h2>
            <p className="section-subtext mt-5 text-dark">
              Join our growing network of dealers and distributors across Gujarat and beyond. FIXONEX offers competitive margins, marketing support, and a complete product portfolio to help you grow.
            </p>
          </div>
          <div className="relative min-h-[380px] overflow-hidden rounded-2xl border border-border-strong bg-white shadow-sm">
            <ImageWithFallback src={imageWide} alt="Partner growth with FIXONEX" fill className="object-cover" />
            <div className="absolute bottom-4 left-4 right-4 hidden flex-wrap gap-2 md:flex">
              {["Competitive Margins", "Marketing Support", "Technical Training"].map((pill) => (
                <span key={pill} className="rounded-pill bg-chip px-3 py-1.5 text-xs font-semibold text-dark">
                  {pill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad section-flow-secondary">
        <div className="site-container">
          <p className="section-eyebrow">Partner Benefits</p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Shield, title: "Strong Brand", text: "Certified products with EN12004 & IS 15477:2019 compliance." },
              { icon: Package, title: "Full Product Range", text: "10 products covering all tile installation needs." },
              { icon: Network, title: "Business Support", text: "Marketing materials, product training, and technical guidance." },
              { icon: TrendingUp, title: "Growing Market", text: "Tap into Gujarat&apos;s booming construction sector." },
            ].map((item) => (
              <article key={item.title} className="surface-card p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-chip text-black">
                  <item.icon className="h-5 w-5" aria-hidden />
                </div>
                <h3 className="mt-4 font-body text-lg font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm text-[#3a3a3a]">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-12 text-black">
        <div className="site-container flex flex-col items-center justify-center gap-8 md:flex-row md:gap-12">
          {["Product Samples", "Sales Training", "Co-branding Support"].map((label, i98) => (
            <div key={label} className="flex items-center gap-8">
              {i98 > 0 ? <span className="hidden h-10 w-px bg-primary md:block" aria-hidden /> : null}
              <div className="text-center md:text-left">
                <Package className="mx-auto mb-2 h-8 w-8 text-primary md:mx-0" aria-hidden />
                <p className="font-semibold">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section-pad section-flow-secondary">
        <div className="site-container mx-auto max-w-[640px]">
          <p className="section-eyebrow text-center">Dealer Inquiry</p>
          <h2 className="text-center font-heading text-display font-semibold text-foreground">Send Your Dealer Inquiry</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-10 space-y-5">
            <div>
              <Label htmlFor="biz">Business Name</Label>
              <Input id="biz" {...register("businessName", { required: true })} className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="contact">Contact Person Name</Label>
              <Input id="contact" {...register("contactName", { required: true })} className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" type="tel" {...register("phone", { required: true })} className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="city">City / Region</Label>
              <Input id="city" {...register("city", { required: true })} className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="type">Current Business Type</Label>
              <select
                id="type"
                {...register("businessType")}
                className={`mt-1.5 ${selectControlClass}`}
              >
                {businessTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="msg">Message / Additional Info</Label>
              <Textarea id="msg" rows={4} {...register("message")} className="mt-1.5" />
            </div>
            <Button type="submit" size="lg" className="w-full" disabled={submitting}>
              {submitting ? (
                <>
                  <Loader2 className="animate-spin" aria-hidden />
                  Submitting…
                </>
              ) : (
                "Submit Inquiry"
              )}
            </Button>
          </form>
          <p className="mt-8 text-center text-sm text-mid">
            Or call us directly at{" "}
            <a href="tel:+917383838632" className="font-semibold text-primary hover:underline">
              +91 7383838632
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
