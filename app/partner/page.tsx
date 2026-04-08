"use client";

import { useForm } from "react-hook-form";
import { Loader2, Network, Package, Shield, TrendingUp } from "lucide-react";
import { useState } from "react";
import { PageBanner } from "@/components/ui/PageBanner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

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
      <PageBanner
        label="Partners"
        title="Partner with FIXONEX"
        subtitle="Grow your business with a trusted construction chemical brand."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Partner" }]}
      />

      <section className="section-pad bg-white">
        <div className="site-container grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <h2 className="font-display text-display font-semibold text-black">Become a FIXONEX Dealer</h2>
            <p className="mt-5 text-base leading-[1.75] text-dark">
              Join our growing network of dealers and distributors across Gujarat and beyond. FIXONEX offers competitive margins, marketing support, and a complete product portfolio to help you grow.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            {["Competitive Margins", "Marketing Support", "Technical Training"].map((pill) => (
              <span key={pill} className="rounded-pill bg-warm px-5 py-3 text-center text-sm font-semibold text-dark">
                {pill}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-light">
        <div className="site-container">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Shield, title: "Strong Brand", text: "Certified products with EN12004 & IS 15477:2019 compliance." },
              { icon: Package, title: "Full Product Range", text: "10 products covering all tile installation needs." },
              { icon: Network, title: "Business Support", text: "Marketing materials, product training, and technical guidance." },
              { icon: TrendingUp, title: "Growing Market", text: "Tap into Gujarat&apos;s booming construction sector." },
            ].map((item) => (
              <article key={item.title} className="border-t-4 border-warm bg-white p-6 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-accent-rose text-primary">
                  <item.icon className="h-5 w-5" aria-hidden />
                </div>
                <h3 className="mt-4 font-body text-lg font-semibold text-black">{item.title}</h3>
                <p className="mt-2 text-sm text-mid">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-dark py-12 text-white">
        <div className="site-container flex flex-col items-center justify-center gap-8 md:flex-row md:gap-12">
          {["Product Samples", "Sales Training", "Co-branding Support"].map((label, i98) => (
            <div key={label} className="flex items-center gap-8">
              {i98 > 0 ? <span className="hidden h-10 w-px bg-warm md:block" aria-hidden /> : null}
              <div className="text-center md:text-left">
                <Package className="mx-auto mb-2 h-8 w-8 text-warm md:mx-0" aria-hidden />
                <p className="font-semibold">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="site-container mx-auto max-w-[640px]">
          <h2 className="text-center font-display text-display font-semibold text-black">Send Your Dealer Inquiry</h2>
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
                className="mt-1.5 flex h-12 w-full rounded-md border border-border bg-white px-3 text-[15px] outline-none focus-visible:ring-2 focus-visible:ring-warm"
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
