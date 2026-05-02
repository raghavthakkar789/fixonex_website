"use client";

import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
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

      <section className="section-flow-light">
        <div className="site-container section-pad-lg grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="section-eyebrow">Dealer network</p>
            <h2 className="mt-2 text-[clamp(1.8rem,4vw,2.8rem)] font-bold text-foreground">Become a FIXONEX dealer.</h2>
            <p className="section-subtext mt-4">
              Join our growing network of dealers and distributors across Gujarat and beyond.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-mid">
              <li>Strong Brand — Certified products with EN12004 & IS 15477:2019 compliance.</li>
              <li>Full Product Range — 10 products covering all tile installation needs.</li>
              <li>Business Support — Marketing materials, product training, and technical guidance.</li>
              <li>Growing Market — Tap into Gujarat&apos;s booming construction sector.</li>
            </ul>
          </div>
          <div className="fx-image-placeholder min-h-[320px] lg:min-h-[420px]">
            <ImageWithFallback src="https://picsum.photos/1400/860" alt="Partner growth with FIXONEX" fill className="object-cover" />
          </div>
        </div>
      </section>

      <section className="section-flow-secondary">
        <div className="site-container section-pad-md">
          <div className="surface-card mx-auto max-w-3xl p-6 sm:p-8">
            <p className="section-eyebrow">Dealer inquiry</p>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-4 grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
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
                <select id="type" {...register("businessType")} className={`${selectControlClass} mt-1.5`}>
                  {businessTypes.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="msg">Message / Additional Info</Label>
                <Textarea id="msg" rows={4} {...register("message")} className="mt-1.5" />
              </div>
              <div className="sm:col-span-2">
                <Button type="submit" disabled={submitting}>
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                      Submitting...
                    </>
                  ) : (
                    "Submit Inquiry"
                  )}
                </Button>
              </div>
            </form>
            <p className="mt-4 text-sm text-mid">
              Or call us directly at{" "}
              <a href="tel:+917383838632" className="font-semibold text-primary hover:text-primary-dark">
                +91 7383838632
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
