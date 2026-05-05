"use client";

import { useForm, Controller } from "react-hook-form";
import { Loader2, Network, Package, Shield, TrendingUp, ArrowRight, CheckCircle2, Send } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/PhoneInput";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { TiltCard } from "@/components/ui/TiltCard";
import { Reveal, Stagger, StaggerItem, SlideReveal, LineReveal, CountUp } from "@/components/motion/Reveal";

const easeExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

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
  {
    icon: Shield,
    title: "Strong Brand",
    text: "Certified products with EN12004 & IS 15477:2019 compliance — your customers can trust the specification.",
    gradient: "from-primary to-orange-500",
    bg: "from-rose-50 to-orange-50",
  },
  {
    icon: Package,
    title: "Full Product Range",
    text: "10 products covering all tile installation needs, from standard to heavy-duty formats.",
    gradient: "from-teal-500 to-emerald-500",
    bg: "from-teal-50 to-emerald-50",
  },
  {
    icon: Network,
    title: "Business Support",
    text: "Marketing materials, product training, and dedicated technical guidance at every stage.",
    gradient: "from-blue-500 to-indigo-500",
    bg: "from-blue-50 to-indigo-50",
  },
  {
    icon: TrendingUp,
    title: "Growing Market",
    text: "Tap into Gujarat's booming construction sector with a brand built for modern installation.",
    gradient: "from-violet-500 to-purple-500",
    bg: "from-violet-50 to-purple-50",
  },
];

const perks = [
  "Competitive dealer margins",
  "Product samples for demonstration",
  "Sales & application training",
  "Co-branding support",
  "Responsive after-sales service",
  "Dedicated account management",
];

const stats = [
  { value: 10, suffix: "+", label: "Years Experience" },
  { value: 5, suffix: "", label: "Product Grades" },
  { value: 20, suffix: "+", label: "Grout Colours" },
];

export default function PartnerPage() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, control, reset } = useForm<DealerForm>({
    defaultValues: { businessType: businessTypes[0], phone: "" },
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

      {/* ── Intro + Benefits — split ── */}
      <section className="relative overflow-hidden border-b border-zinc-200/40 bg-gradient-to-b from-[#fdfcfb] via-[#faf7f5] to-[#f8f5f2]">
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 top-0 h-[60%] w-[45%] rounded-full opacity-50"
          style={{ background: "radial-gradient(circle, rgba(211,47,47,0.06) 0%, transparent 70%)", filter: "blur(80px)" }}
        />
        <div aria-hidden className="pointer-events-none absolute inset-0 dot-grid-subtle opacity-40" />

        <div className="site-container section-pad-lg relative z-10 grid gap-16 lg:grid-cols-2 lg:items-start">
          <SlideReveal direction="left">
            <p className="eyebrow-label mb-4">Channel Partnership</p>
            <h2 className="font-display font-bold text-zinc-950" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.04em", lineHeight: 1.1 }}>
              Become a<br />FIXONEX Dealer
            </h2>
            <LineReveal className="mt-5 mb-6 bg-zinc-200" delay={0.2} />
            <p className="text-[15px] leading-[1.8] text-zinc-500">
              Join our growing network of dealers and distributors across Gujarat and beyond. FIXONEX offers competitive margins, marketing support, and a complete product portfolio to help you grow your business.
            </p>
            <ul className="mt-8 space-y-3">
              {perks.map((perk, i) => (
                <motion.li
                  key={perk}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.06, ease: easeExpo }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" aria-hidden />
                  <span className="text-[14px] text-zinc-600">{perk}</span>
                </motion.li>
              ))}
            </ul>
          </SlideReveal>

          <SlideReveal direction="right" delay={0.1}>
            <Stagger className="grid gap-4 sm:grid-cols-2">
              {benefits.map((item) => (
                <StaggerItem key={item.title}>
                  <TiltCard className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/90 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_50px_rgba(0,0,0,0.1)] transition-shadow duration-500">
                    <div className={`p-5 pb-4 bg-gradient-to-br ${item.bg}`}>
                      <span className={`inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br ${item.gradient} shadow-md`}>
                        <item.icon className="h-5 w-5 text-white" aria-hidden />
                      </span>
                    </div>
                    <div className="p-5 pt-4">
                      <h3 className="font-display text-base font-bold text-zinc-950 group-hover:text-primary transition-colors duration-300">{item.title}</h3>
                      <p className="mt-2 text-[12px] leading-relaxed text-zinc-500">{item.text}</p>
                    </div>
                  </TiltCard>
                </StaggerItem>
              ))}
            </Stagger>
          </SlideReveal>
        </div>
      </section>

      {/* ── Stats banner — light ── */}
      <section className="relative overflow-hidden border-b border-zinc-200/40 bg-gradient-to-b from-[#f0f7ff] via-[#f4f7fb] to-[#eef2f8]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(211,47,47,0.05) 0%, transparent 70%)" }}
        />
        <div
          aria-hidden
          className="absolute left-[6%] right-[6%] top-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(211,47,47,0.25) 50%, transparent)" }}
        />
        <div className="site-container section-pad-md relative z-10">
          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: easeExpo }}
              >
                <TiltCard className="min-w-[140px] rounded-3xl border border-zinc-200/70 bg-white p-6 text-center shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
                  <p className="font-display text-4xl font-bold text-primary stat-number tracking-tight">
                    <CountUp value={String(s.value)} />{s.suffix}
                  </p>
                  <p className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500">{s.label}</p>
                </TiltCard>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3, ease: easeExpo }}
            >
              <TiltCard className="min-w-[140px] rounded-3xl border border-zinc-200/70 bg-white p-6 text-center shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
                <p className="font-display text-4xl font-bold text-primary tracking-tight">IS &amp; EN</p>
                <p className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500">Certified</p>
              </TiltCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Dealer form — light ── */}
      <section className="relative overflow-hidden border-b border-zinc-200/40 bg-gradient-to-b from-[#fdfcfb] via-white to-[#faf7f5]">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-[10%] bottom-0 h-[60%] w-[40%] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(13,148,136,0.05) 0%, transparent 70%)", filter: "blur(80px)" }}
        />
        <div className="site-container section-pad-lg relative z-10">
          <Reveal className="mb-10 text-center">
            <p className="eyebrow-label mx-auto mb-4">Dealer Inquiry</p>
            <h2 className="font-display font-bold text-zinc-950" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.04em", lineHeight: 1.1 }}>
              Send Your Dealer Inquiry
            </h2>
          </Reveal>

          <div className="mx-auto max-w-[680px]">
            <TiltCard className="overflow-hidden rounded-3xl border border-zinc-200/70 bg-white shadow-[0_8px_32px_rgba(0,0,0,0.07)]">
              <div className="h-1.5 bg-gradient-to-r from-primary via-orange-500 to-amber-500" />
              <div className="p-8 md:p-10">
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="thanks"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center py-10 text-center"
                    >
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-orange-500 text-white shadow-[0_8px_24px_rgba(211,47,47,0.35)]"
                      >
                        <CheckCircle2 className="h-8 w-8" aria-hidden />
                      </motion.span>
                      <p className="mt-6 font-display text-xl font-bold text-zinc-950">Inquiry Received!</p>
                      <p className="mt-2 text-sm text-zinc-500">Our team will reach out to you shortly to discuss the partnership.</p>
                      <button type="button" onClick={() => setSubmitted(false)} className="mt-6 text-sm font-medium text-primary hover:underline">
                        Submit another inquiry
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit(onSubmit)}
                      className="space-y-5"
                    >
                      <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                          <Label htmlFor="biz" className="text-zinc-700 font-semibold text-[13px]">Business Name</Label>
                          <Input id="biz" {...register("businessName", { required: true })} className="mt-1.5 rounded-xl border-zinc-200 bg-zinc-50/50" />
                        </div>
                        <div>
                          <Label htmlFor="contact" className="text-zinc-700 font-semibold text-[13px]">Contact Person</Label>
                          <Input id="contact" {...register("contactName", { required: true })} className="mt-1.5 rounded-xl border-zinc-200 bg-zinc-50/50" />
                        </div>
                      </div>
                      <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                          <Label htmlFor="phone" className="text-zinc-700 font-semibold text-[13px]">Phone</Label>
                          <Controller
                            control={control}
                            name="phone"
                            rules={{ required: true }}
                            render={({ field }) => (
                              <PhoneInput
                                id="phone"
                                name={field.name}
                                value={field.value || ""}
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                                placeholder="98765 43210"
                                required
                                className="mt-1.5"
                                triggerClassName="rounded-l-xl border-zinc-200 bg-zinc-50/50"
                                inputClassName="rounded-r-xl border-zinc-200 bg-zinc-50/50"
                              />
                            )}
                          />
                        </div>
                        <div>
                          <Label htmlFor="city" className="text-zinc-700 font-semibold text-[13px]">City / Region</Label>
                          <Input id="city" {...register("city", { required: true })} className="mt-1.5 rounded-xl border-zinc-200 bg-zinc-50/50" />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="type" className="text-zinc-700 font-semibold text-[13px]">Current Business Type</Label>
                        <select
                          id="type"
                          {...register("businessType")}
                          className="mt-1.5 flex h-11 w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-3 text-[14px] text-zinc-900 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-colors"
                        >
                          {businessTypes.map((t) => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <Label htmlFor="msg" className="text-zinc-700 font-semibold text-[13px]">Message / Additional Info</Label>
                        <Textarea id="msg" rows={4} {...register("message")} className="mt-1.5 rounded-xl border-zinc-200 bg-zinc-50/50" />
                      </div>
                      <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                        <Button
                          type="submit"
                          size="lg"
                          variant="primary"
                          className="w-full rounded-full shadow-[0_4px_20px_rgba(211,47,47,0.3)]"
                          disabled={submitting}
                        >
                          {submitting ? (
                            <><Loader2 className="animate-spin" aria-hidden /> Submitting…</>
                          ) : (
                            <><Send className="h-4 w-4" aria-hidden /><span>Submit Inquiry</span></>
                          )}
                        </Button>
                      </motion.div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </TiltCard>
            <p className="mt-6 text-center text-sm text-zinc-500">
              Or call us directly at{" "}
              <a href="tel:+917383838632" className="font-semibold text-primary hover:underline">
                +91 7383838632
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
