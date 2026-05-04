"use client";

import { useForm } from "react-hook-form";
import { Loader2, Network, Package, Shield, TrendingUp, ArrowRight, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const easeExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: easeExpo }}
    >
      {children}
    </motion.div>
  );
}

type DealerForm = {
  businessName: string;
  contactName: string;
  phone: string;
  city: string;
  businessType: string;
  message: string;
};

const businessTypes = ["Tile Shop", "Hardware Store", "Building Materials", "Contractor", "Other"] as const;

const benefits = [
  { icon: Shield, title: "Strong Brand", text: "Certified products with EN12004 & IS 15477:2019 compliance — your customers can trust the specification." },
  { icon: Package, title: "Full Product Range", text: "10 products covering all tile installation needs, from standard to heavy-duty formats." },
  { icon: Network, title: "Business Support", text: "Marketing materials, product training, and dedicated technical guidance at every stage." },
  { icon: TrendingUp, title: "Growing Market", text: "Tap into Gujarat's booming construction sector with a brand built for modern installation." },
];

const perks = [
  "Competitive dealer margins",
  "Product samples for demonstration",
  "Sales & application training",
  "Co-branding support",
  "Responsive after-sales service",
  "Dedicated account management",
];

export default function PartnerPage() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, reset } = useForm<DealerForm>({
    defaultValues: { businessType: businessTypes[0] },
  });

  const onSubmit = async () => {
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    setSubmitting(false);
    setSubmitted(true);
    reset();
  };

  return (
    <>
      <PageHero
        label="Partners"
        title="Partner with FIXONEX"
        subtitle="Join our growing network of dealers and distributors. Competitive margins, full support, and a brand that delivers."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Partner" }]}
        image="https://picsum.photos/seed/fixonex-partner/1600/900"
      />

      {/* Intro */}
      <section className="relative overflow-hidden bg-white py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 top-0 h-[60%] w-[45%] rounded-full opacity-40"
          style={{ background: "radial-gradient(circle, rgba(211,47,47,0.06) 0%, transparent 70%)", filter: "blur(80px)" }}
        />
        <div className="site-container grid gap-16 lg:grid-cols-2 lg:items-start">
          <FadeIn>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary mb-3">Channel Partnership</p>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.02em] text-zinc-950 leading-tight">
              Become a<br />FIXONEX Dealer
            </h2>
            <p className="mt-6 text-[15px] leading-[1.8] text-zinc-500">
              Join our growing network of dealers and distributors across Gujarat and beyond. FIXONEX offers competitive margins, marketing support, and a complete product portfolio to help you grow your business.
            </p>
            <ul className="mt-8 space-y-3">
              {perks.map((perk) => (
                <li key={perk} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" aria-hidden />
                  <span className="text-[14px] text-zinc-600">{perk}</span>
                </li>
              ))}
            </ul>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="grid gap-5 sm:grid-cols-2">
              {benefits.map((item, i) => (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.07, ease: easeExpo }}
                  className="rounded-2xl border border-zinc-100 bg-zinc-50 p-6"
                >
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <item.icon className="h-5 w-5" aria-hidden />
                  </div>
                  <h3 className="font-display text-base font-bold text-zinc-950">{item.title}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-zinc-500">{item.text}</p>
                </motion.article>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Stats banner — dark */}
      <section className="relative overflow-hidden bg-[#09090d] py-16">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(211,47,47,0.08) 0%, transparent 70%)" }}
        />
        <div
          aria-hidden
          className="absolute left-[6%] right-[6%] top-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(211,47,47,0.4) 50%, transparent)" }}
        />
        <div className="grain-noise absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none" aria-hidden />
        <div className="site-container relative z-10">
          <div className="flex flex-wrap justify-center gap-10 md:gap-16">
            {[
              { value: "10+", label: "Years Experience" },
              { value: "5", label: "Product Grades" },
              { value: "20+", label: "Grout Colours" },
              { value: "IS & EN", label: "Certified" },
            ].map((s, i) => (
              <FadeIn key={s.label} delay={i * 0.07}>
                <div className="text-center">
                  <p className="font-display text-4xl font-bold text-white tracking-tight">{s.value}</p>
                  <p className="mt-1.5 text-[12px] font-medium text-zinc-500 uppercase tracking-[0.12em]">{s.label}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Dealer form */}
      <section className="bg-white py-24">
        <div className="site-container mx-auto max-w-[680px]">
          <FadeIn>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary mb-3 text-center">Dealer Inquiry</p>
            <h2 className="text-center font-display text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.02em] text-zinc-950 leading-tight mb-10">
              Send Your Dealer Inquiry
            </h2>
          </FadeIn>
          <FadeIn delay={0.08}>
            <div className="rounded-2xl border border-zinc-100 bg-zinc-50 p-8 md:p-10">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center py-10 text-center"
                >
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <CheckCircle2 className="h-8 w-8" aria-hidden />
                  </span>
                  <p className="mt-6 font-display text-xl font-bold text-zinc-950">Inquiry Received!</p>
                  <p className="mt-2 text-sm text-zinc-500">Our team will reach out to you shortly to discuss the partnership.</p>
                  <button type="button" onClick={() => setSubmitted(false)} className="mt-6 text-sm font-medium text-primary hover:underline">
                    Submit another inquiry
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="biz" className="text-zinc-700">Business Name</Label>
                      <Input id="biz" {...register("businessName", { required: true })} className="mt-1.5 bg-white" />
                    </div>
                    <div>
                      <Label htmlFor="contact" className="text-zinc-700">Contact Person</Label>
                      <Input id="contact" {...register("contactName", { required: true })} className="mt-1.5 bg-white" />
                    </div>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="phone" className="text-zinc-700">Phone</Label>
                      <Input id="phone" type="tel" {...register("phone", { required: true })} className="mt-1.5 bg-white" />
                    </div>
                    <div>
                      <Label htmlFor="city" className="text-zinc-700">City / Region</Label>
                      <Input id="city" {...register("city", { required: true })} className="mt-1.5 bg-white" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="type" className="text-zinc-700">Current Business Type</Label>
                    <select
                      id="type"
                      {...register("businessType")}
                      className="mt-1.5 flex h-11 w-full rounded-lg border border-zinc-200 bg-white px-3 text-[14px] text-zinc-900 outline-none focus:ring-2 focus:ring-primary/30"
                    >
                      {businessTypes.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="msg" className="text-zinc-700">Message / Additional Info</Label>
                    <Textarea id="msg" rows={4} {...register("message")} className="mt-1.5 bg-white" />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full rounded-full bg-zinc-950 text-white hover:bg-primary"
                    disabled={submitting}
                  >
                    {submitting ? (
                      <><Loader2 className="animate-spin" aria-hidden /> Submitting…</>
                    ) : (
                      <><span>Submit Inquiry</span><ArrowRight className="h-4 w-4" aria-hidden /></>
                    )}
                  </Button>
                </form>
              )}
            </div>
            <p className="mt-6 text-center text-sm text-zinc-500">
              Or call us directly at{" "}
              <a href="tel:+917383838632" className="font-semibold text-primary hover:underline">
                +91 7383838632
              </a>
            </p>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
