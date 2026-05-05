"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2, Mail, MapPin, MessageCircle, Phone, ArrowRight, Send } from "lucide-react";
import { CinematicMotionHero } from "@/components/heroes/CinematicMotionHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/PhoneInput";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { TiltCard } from "@/components/ui/TiltCard";
import { TransitionLink } from "@/components/navigation/TransitionLink";
import { companyInfo } from "@/data/company";
import { socialLinks } from "@/data/social";
import { socialIconMap } from "@/lib/social-icons";

/** Per-platform hover tint for the "Follow Us" socials row. Keyed by
 *  the central `SocialLink.id` so visual treatment stays in sync with the
 *  ordering defined in `data/social.ts`. */
const socialHoverTint: Record<string, string> = {
  linkedin: "hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700",
  instagram: "hover:bg-pink-50 hover:border-pink-200 hover:text-pink-700",
  facebook: "hover:bg-sky-50 hover:border-sky-200 hover:text-sky-700",
  whatsapp: "hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-700",
};

const easeExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

type ContactFormValues = {
  fullName: string;
  phone: string;
  email: string;
  inquiryType: string;
  message: string;
};

const inquiryOptions = ["Product Information", "Technical Guidance", "Dealer Inquiry", "General"] as const;

export default function ContactPage() {
  const [isSubmitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const reduced = useReducedMotion();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<ContactFormValues>({
    defaultValues: { inquiryType: inquiryOptions[0] ?? "General", phone: "" },
  });

  const onSubmit = async () => {
    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 900));
    setSubmitting(false);
    setSubmitted(true);
    reset();
  };

  return (
    <>
      <CinematicMotionHero
        variant="contact"
        label="Contact"
        titleLine1="Contact"
        titleLine2="Consultation"
        subtitle="Whether you need product advice, want to place an order, or have a technical question — our team is ready to help."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      {/* Main form + info */}
      <section className="relative overflow-hidden border-b border-zinc-200/40 bg-gradient-to-b from-[#fdfcfb] via-[#faf7f5] to-white">
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 top-0 h-[60%] w-[40%] rounded-full opacity-50"
          style={{ background: "radial-gradient(circle, rgba(211,47,47,0.06) 0%, transparent 70%)", filter: "blur(80px)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-[10%] bottom-0 h-[50%] w-[40%] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(13,148,136,0.05) 0%, transparent 70%)", filter: "blur(80px)" }}
        />
        <div aria-hidden className="pointer-events-none absolute inset-0 dot-grid-subtle opacity-40" />

        <div className="site-container section-pad-lg relative z-10 grid gap-10 lg:grid-cols-12">

          {/* Form */}
          <motion.div
            className="lg:col-span-7"
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeExpo }}
          >
            <TiltCard className="overflow-hidden rounded-3xl border border-zinc-200/70 bg-white shadow-[0_8px_32px_rgba(0,0,0,0.07)]">
              {/* Card header stripe */}
              <div className="h-1.5 bg-gradient-to-r from-primary via-orange-500 to-amber-500" />
              <div className="relative z-10 p-8 md:p-10">
                <p className="eyebrow-label mb-3">Inquiry Form</p>
                <h2 className="font-display text-2xl font-bold text-zinc-950 mb-8">Send us a message</h2>

                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="thanks"
                      initial={reduced ? false : { opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center py-12 text-center"
                    >
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-orange-500 text-white shadow-[0_8px_24px_rgba(211,47,47,0.35)]"
                      >
                        <Check className="h-8 w-8" strokeWidth={2.5} aria-hidden />
                      </motion.span>
                      <p className="mt-6 font-display text-xl font-bold text-zinc-950">Message Sent!</p>
                      <p className="mt-2 text-sm text-zinc-500">We&apos;ll be in touch within 24 hours.</p>
                      <button
                        type="button"
                        onClick={() => setSubmitted(false)}
                        className="mt-6 text-sm font-medium text-primary hover:underline"
                      >
                        Send another message
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      exit={reduced ? undefined : { opacity: 0 }}
                      onSubmit={handleSubmit(onSubmit)}
                      className="space-y-5"
                    >
                      <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                          <Label htmlFor="fullName" className="text-zinc-700 font-semibold text-[13px]">Full Name</Label>
                          <Input
                            id="fullName"
                            {...register("fullName", { required: "Required" })}
                            className="mt-1.5 rounded-xl border-zinc-200 bg-zinc-50/50 focus:border-primary/40 focus:ring-primary/10 transition-colors"
                            aria-invalid={!!errors.fullName}
                          />
                          {errors.fullName && <p className="mt-1 text-xs text-primary">{errors.fullName.message}</p>}
                        </div>
                        <div>
                          <Label htmlFor="phone" className="text-zinc-700 font-semibold text-[13px]">Phone Number</Label>
                          <Controller
                            control={control}
                            name="phone"
                            rules={{ required: "Required" }}
                            render={({ field }) => (
                              <PhoneInput
                                id="phone"
                                name={field.name}
                                value={field.value || ""}
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                                placeholder="98765 43210"
                                required
                                aria-invalid={!!errors.phone}
                                className="mt-1.5"
                                triggerClassName="rounded-l-xl border-zinc-200 bg-zinc-50/50"
                                inputClassName="rounded-r-xl border-zinc-200 bg-zinc-50/50 focus-visible:border-primary/40 focus-visible:ring-primary/10"
                              />
                            )}
                          />
                          {errors.phone && <p className="mt-1 text-xs text-primary">{errors.phone.message}</p>}
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-zinc-700 font-semibold text-[13px]">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          {...register("email")}
                          className="mt-1.5 rounded-xl border-zinc-200 bg-zinc-50/50 focus:border-primary/40 focus:ring-primary/10 transition-colors"
                        />
                      </div>
                      <div>
                        <Label htmlFor="inquiryType" className="text-zinc-700 font-semibold text-[13px]">Inquiry Type</Label>
                        <select
                          id="inquiryType"
                          {...register("inquiryType", { required: true })}
                          className="mt-1.5 flex h-11 w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-3 text-[14px] text-zinc-900 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-colors"
                        >
                          {inquiryOptions.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <Label htmlFor="message" className="text-zinc-700 font-semibold text-[13px]">Message</Label>
                        <Textarea
                          id="message"
                          rows={4}
                          {...register("message", { required: "Required" })}
                          className="mt-1.5 rounded-xl border-zinc-200 bg-zinc-50/50 focus:border-primary/40 focus:ring-primary/10 transition-colors"
                          aria-invalid={!!errors.message}
                        />
                        {errors.message && <p className="mt-1 text-xs text-primary">{errors.message.message}</p>}
                      </div>
                      <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                        <Button
                          type="submit"
                          size="lg"
                          variant="primary"
                          className="w-full rounded-full shadow-[0_4px_20px_rgba(211,47,47,0.3)] hover:shadow-[0_6px_28px_rgba(211,47,47,0.45)]"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <><Loader2 className="animate-spin" aria-hidden /> Sending…</>
                          ) : (
                            <><Send className="h-4 w-4" aria-hidden /><span>Send Message</span></>
                          )}
                        </Button>
                      </motion.div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </TiltCard>
          </motion.div>

          {/* Contact info */}
          <motion.aside
            className="lg:col-span-5 flex flex-col gap-5"
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: easeExpo }}
          >
            {/* Direct contact */}
            <TiltCard className="overflow-hidden rounded-3xl border border-zinc-200/70 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
              <div className="h-1 bg-gradient-to-r from-teal-500 to-emerald-500" />
              <div className="relative z-10 p-7">
                <p className="eyebrow-label mb-5">Reach Us Directly</p>
                <ul className="space-y-5">
                  {[
                    { icon: Phone, label: "Phone", value: "+91 7383838632", href: "tel:+917383838632", color: "from-primary to-orange-500" },
                    { icon: Mail, label: "Email", value: "info@fixonex.com", href: "mailto:info@fixonex.com", color: "from-teal-500 to-emerald-500" },
                  ].map(({ icon: Icon, label, value, href, color }) => (
                    <li key={label} className="group flex gap-4">
                      <div className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${color} shadow-md`}>
                        <Icon className="h-4.5 w-4.5 text-white" aria-hidden />
                      </div>
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-400">{label}</p>
                        <a href={href} className="mt-0.5 block text-sm font-semibold text-zinc-900 hover:text-primary transition-colors">
                          {value}
                        </a>
                      </div>
                    </li>
                  ))}
                  <li className="flex gap-4">
                    <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 shadow-md">
                      <MapPin className="h-4.5 w-4.5 text-white" aria-hidden />
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-400">Address</p>
                      <a
                        href={companyInfo.mapsLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open ${companyInfo.displayName} address in Google Maps`}
                        className="mt-0.5 block text-sm text-zinc-600 leading-relaxed hover:text-primary hover:underline underline-offset-4 transition-colors"
                      >
                        {companyInfo.registeredAddress.line1},
                        <br />
                        {companyInfo.registeredAddress.line2}, {companyInfo.registeredAddress.city},
                        <br />
                        {companyInfo.registeredAddress.state} {companyInfo.registeredAddress.postalCode}
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
            </TiltCard>

            {/* WhatsApp CTA */}
            <motion.a
              href="https://wa.me/917383838632"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-green-50 px-6 py-5 text-zinc-900 transition-all duration-300 hover:shadow-[0_8px_32px_rgba(37,211,102,0.2)] hover:border-emerald-300"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#25D366] to-[#128C7E] shadow-lg">
                <MessageCircle className="h-6 w-6 text-white" aria-hidden />
              </div>
              <div className="flex-1">
                <p className="font-display font-bold text-[15px] text-zinc-950">Chat on WhatsApp</p>
                <p className="text-xs text-zinc-500 mt-0.5">Usually responds within minutes</p>
              </div>
              <ArrowRight className="h-5 w-5 shrink-0 text-zinc-400 group-hover:text-zinc-700 transition-colors" aria-hidden />
            </motion.a>

            {/* Socials */}
            <TiltCard className="rounded-3xl border border-zinc-200/70 bg-white p-6 shadow-[0_4px_24px_rgba(0,0,0,0.05)]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-400 mb-4">Follow Us</p>
              <div className="relative z-10 flex flex-wrap gap-3">
                {socialLinks.map((s) => {
                  const Icon = socialIconMap[s.icon];
                  if (s.disabled) {
                    return (
                      <span
                        key={s.id}
                        role="link"
                        aria-disabled="true"
                        aria-label={`${s.label} — coming soon`}
                        title={`${s.label} — coming soon`}
                        className="inline-flex h-10 w-10 cursor-not-allowed items-center justify-center rounded-xl border border-dashed border-zinc-200 bg-zinc-50 text-zinc-400"
                      >
                        <Icon className="h-4 w-4" aria-hidden />
                      </span>
                    );
                  }
                  const tint = socialHoverTint[s.id] ?? "hover:bg-zinc-50";
                  return (
                    <a
                      key={s.id}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className={`relative z-10 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-500 transition-all duration-300 hover:scale-110 hover:-translate-y-0.5 active:scale-95 ${tint}`}
                    >
                      <Icon className="h-4 w-4" aria-hidden />
                    </a>
                  );
                })}
              </div>
            </TiltCard>
          </motion.aside>
        </div>
      </section>

      {/* ── Map — find us ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-zinc-200/40 bg-gradient-to-b from-white to-[#faf7f5]">
        <div aria-hidden className="pointer-events-none absolute inset-0 dot-grid-subtle opacity-30" />
        <div className="site-container section-pad-md relative z-10">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, ease: easeExpo }}
          >
            <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="eyebrow-label mb-3">Find Us</p>
                <h2 className="font-display text-3xl font-bold tracking-tight text-zinc-950">
                  Visit our showroom
                </h2>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-zinc-500">
                  {companyInfo.formattedAddress}
                </p>
              </div>
              <motion.a
                href={companyInfo.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Get directions to ${companyInfo.displayName} on Google Maps`}
                className="inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-[0_4px_16px_rgba(211,47,47,0.3)] transition-all hover:bg-primary/90 hover:shadow-[0_6px_24px_rgba(211,47,47,0.4)] sm:self-end"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <MapPin className="h-4 w-4" aria-hidden />
                Get directions
                <ArrowRight className="h-4 w-4" aria-hidden />
              </motion.a>
            </div>

            <TiltCard className="overflow-hidden rounded-3xl border border-zinc-200/70 bg-white shadow-[0_8px_32px_rgba(0,0,0,0.07)]">
              <div className="h-1.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500" />
              <div className="relative h-[360px] w-full md:h-[440px]">
                <iframe
                  src={companyInfo.mapsEmbedUrl}
                  title={`Map showing the location of ${companyInfo.displayName}`}
                  className="absolute inset-0 h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </section>
    </>
  );
}
