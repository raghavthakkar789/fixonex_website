"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Instagram, Linkedin, Loader2, Mail, MapPin, MessageCircle, Phone, Youtube } from "lucide-react";
import { PageBanner } from "@/components/ui/PageBanner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useReducedMotion } from "@/lib/useReducedMotion";

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
    defaultValues: {
      inquiryType: inquiryOptions[0] ?? "General",
    },
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
      <PageBanner
        label="Contact"
        title="Contact & Consultation"
        subtitle="We're here to help you get it right."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      <section className="section-pad section-flow-warm">
        <div className="site-container mx-auto max-w-[680px] text-center">
          <p className="section-eyebrow text-center">Contact Desk</p>
          <p className="section-subtext mx-auto text-dark">
            Whether you need product advice, want to place an order, or have a technical question — our team is ready to help.
          </p>
        </div>
      </section>

      <section className="section-pad section-flow-light">
        <div className="site-container grid gap-12 lg:grid-cols-12">
          <div className="surface-card p-8 lg:col-span-7 md:p-10">
            <p className="section-eyebrow">Inquiry Form</p>
            <h2 className="font-display text-2xl font-semibold text-black sr-only">Contact form</h2>
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="thanks"
                  initial={reduced ? false : { opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center py-10 text-center"
                >
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent-rose text-primary">
                    <Check className="h-8 w-8" strokeWidth={2.5} aria-hidden />
                  </span>
                  <p className="mt-6 text-lg font-semibold text-black">Thank you! We&apos;ll be in touch within 24 hours.</p>
                  <Button type="button" variant="ghost" className="mt-6" onClick={() => setSubmitted(false)}>
                    Send another message
                  </Button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  exit={reduced ? undefined : { opacity: 0 }}
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-5"
                >
                  <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input id="fullName" {...register("fullName", { required: "Required" })} className="mt-1.5" aria-invalid={!!errors.fullName} />
                    {errors.fullName ? <p className="mt-1 text-sm text-primary">{errors.fullName.message}</p> : null}
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+91 …"
                      {...register("phone", { required: "Required" })}
                      className="mt-1.5"
                      aria-invalid={!!errors.phone}
                    />
                    {errors.phone ? <p className="mt-1 text-sm text-primary">{errors.phone.message}</p> : null}
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" {...register("email")} className="mt-1.5" />
                  </div>
                  <div>
                    <Label htmlFor="inquiryType">Inquiry Type</Label>
                    <select
                      id="inquiryType"
                      {...register("inquiryType", { required: true })}
                      className="mt-1.5 flex h-12 w-full rounded-md border border-[#e5e0da] bg-white px-3 text-[15px] text-[#111111] outline-none focus-visible:ring-2 focus-visible:ring-warm"
                    >
                      {inquiryOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" rows={4} {...register("message", { required: "Required" })} className="mt-1.5" aria-invalid={!!errors.message} />
                    {errors.message ? <p className="mt-1 text-sm text-primary">{errors.message.message}</p> : null}
                  </div>
                  <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="animate-spin" aria-hidden />
                        Sending…
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          <aside className="surface-card p-8 lg:col-span-5">
            <p className="section-eyebrow">Reach Us Directly</p>
            <ul className="mt-6 space-y-5 text-[#111111]">
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
                <a href="tel:+917383838632" className="font-medium hover:text-primary">
                  +91 7383838632
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
                <a href="mailto:info@fixonex.com" className="font-medium hover:text-primary">
                  info@fixonex.com
                </a>
              </li>
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
                <span>SWASTIK ENTERPRISES, FF, Block-D, Shop No. 102, Narayan Exotica, Ahmedabad-380052, Gujarat</span>
              </li>
            </ul>
            <Button asChild size="lg" className="mt-8 w-full">
              <Link href="https://wa.me/917383838632" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-5 w-5" aria-hidden />
                Chat on WhatsApp
              </Link>
            </Button>
          </aside>
        </div>
      </section>

      <section className="section-pad section-flow-warm">
        <div className="site-container">
          <p className="text-center text-sm font-medium text-mid">Connect with us</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
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
                className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#e5e0da] bg-white text-[#6b6b6b] transition-colors hover:border-[#c1b2a4] hover:text-primary"
              >
                <Icon className="h-5 w-5" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
