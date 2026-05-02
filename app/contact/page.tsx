"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Instagram, Linkedin, Loader2, Mail, MapPin, MessageCircle, Phone, Youtube, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useReducedMotion } from "@/lib/useReducedMotion";

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
    formState: { errors },
    reset,
  } = useForm<ContactFormValues>({
    defaultValues: { inquiryType: inquiryOptions[0] ?? "General" },
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
      <PageHero
        label="Contact"
        title="Contact & Consultation"
        subtitle="Whether you need product advice, want to place an order, or have a technical question — our team is ready to help."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      {/* Main form + info */}
      <section className="relative overflow-hidden bg-white py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 top-0 h-[60%] w-[40%] rounded-full opacity-50"
          style={{ background: "radial-gradient(circle, rgba(211,47,47,0.06) 0%, transparent 70%)", filter: "blur(80px)" }}
        />
        <div className="site-container grid gap-10 lg:grid-cols-12">

          {/* Form */}
          <motion.div
            className="lg:col-span-7 rounded-2xl border border-zinc-100 bg-zinc-50 p-8 md:p-10"
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeExpo }}
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary mb-2">Inquiry Form</p>
            <h2 className="font-display text-2xl font-bold text-zinc-950 mb-8">Send us a message</h2>
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="thanks"
                  initial={reduced ? false : { opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center py-12 text-center"
                >
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Check className="h-8 w-8" strokeWidth={2.5} aria-hidden />
                  </span>
                  <p className="mt-6 font-display text-xl font-bold text-zinc-950">Message Sent!</p>
                  <p className="mt-2 text-sm text-zinc-500">We&apos;ll be in touch within 24 hours.</p>
                  <button type="button" onClick={() => setSubmitted(false)} className="mt-6 text-sm font-medium text-primary hover:underline">
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
                      <Label htmlFor="fullName" className="text-zinc-700">Full Name</Label>
                      <Input
                        id="fullName"
                        {...register("fullName", { required: "Required" })}
                        className="mt-1.5 bg-white"
                        aria-invalid={!!errors.fullName}
                      />
                      {errors.fullName && <p className="mt-1 text-xs text-primary">{errors.fullName.message}</p>}
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-zinc-700">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+91 …"
                        {...register("phone", { required: "Required" })}
                        className="mt-1.5 bg-white"
                        aria-invalid={!!errors.phone}
                      />
                      {errors.phone && <p className="mt-1 text-xs text-primary">{errors.phone.message}</p>}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-zinc-700">Email</Label>
                    <Input id="email" type="email" {...register("email")} className="mt-1.5 bg-white" />
                  </div>
                  <div>
                    <Label htmlFor="inquiryType" className="text-zinc-700">Inquiry Type</Label>
                    <select
                      id="inquiryType"
                      {...register("inquiryType", { required: true })}
                      className="mt-1.5 flex h-11 w-full rounded-lg border border-zinc-200 bg-white px-3 text-[14px] text-zinc-900 outline-none focus:ring-2 focus:ring-primary/30"
                    >
                      {inquiryOptions.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="message" className="text-zinc-700">Message</Label>
                    <Textarea
                      id="message"
                      rows={4}
                      {...register("message", { required: "Required" })}
                      className="mt-1.5 bg-white"
                      aria-invalid={!!errors.message}
                    />
                    {errors.message && <p className="mt-1 text-xs text-primary">{errors.message.message}</p>}
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full rounded-full bg-zinc-950 text-white hover:bg-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <><Loader2 className="animate-spin" aria-hidden /> Sending…</>
                    ) : (
                      <><span>Send Message</span><ArrowRight className="h-4 w-4" aria-hidden /></>
                    )}
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Contact info */}
          <motion.aside
            className="lg:col-span-5 flex flex-col gap-6"
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: easeExpo }}
          >
            <div className="rounded-2xl border border-zinc-100 bg-zinc-50 p-8">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary mb-6">Reach Us Directly</p>
              <ul className="space-y-5">
                <li className="flex gap-4">
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Phone className="h-4 w-4" aria-hidden />
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 mb-0.5">Phone</p>
                    <a href="tel:+917383838632" className="text-sm font-semibold text-zinc-900 hover:text-primary transition-colors">
                      +91 7383838632
                    </a>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Mail className="h-4 w-4" aria-hidden />
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 mb-0.5">Email</p>
                    <a href="mailto:info@fixonex.com" className="text-sm font-semibold text-zinc-900 hover:text-primary transition-colors">
                      info@fixonex.com
                    </a>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <MapPin className="h-4 w-4" aria-hidden />
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 mb-0.5">Address</p>
                    <p className="text-sm text-zinc-700 leading-relaxed">
                      SWASTIK ENTERPRISES, FF, Block-D, Shop No. 102, Narayan Exotica, Ahmedabad-380052, Gujarat
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            {/* WhatsApp CTA */}
            <Link
              href="https://wa.me/917383838632"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-2xl bg-[#25D366] px-6 py-5 text-white transition-all hover:bg-[#20b858]"
            >
              <MessageCircle className="h-6 w-6 shrink-0" aria-hidden />
              <div>
                <p className="font-display font-bold text-sm">Chat on WhatsApp</p>
                <p className="text-xs text-white/75 mt-0.5">Usually responds within minutes</p>
              </div>
              <ArrowRight className="ml-auto h-5 w-5 shrink-0 opacity-70" aria-hidden />
            </Link>

            {/* Socials */}
            <div className="rounded-2xl border border-zinc-100 bg-zinc-50 p-6">
              <p className="text-xs font-semibold text-zinc-500 mb-4">Follow Us</p>
              <div className="flex flex-wrap gap-3">
                {[
                  { href: "https://wa.me/917383838632", icon: MessageCircle, label: "WhatsApp" },
                  { href: "#", icon: Instagram, label: "Instagram" },
                  { href: "#", icon: Linkedin, label: "LinkedIn" },
                  { href: "#", icon: Youtube, label: "YouTube" },
                ].map(({ href, icon: Icon, label }) => (
                  <Link
                    key={label}
                    href={href}
                    aria-label={label}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-500 transition-colors hover:border-primary/30 hover:text-primary"
                  >
                    <Icon className="h-4 w-4" />
                  </Link>
                ))}
              </div>
            </div>
          </motion.aside>
        </div>
      </section>
    </>
  );
}
