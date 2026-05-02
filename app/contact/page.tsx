"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Check, Loader2 } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { selectControlClass } from "@/lib/ui-constants";

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
        subtitle="We're here to help you get it right."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      <section className="section-flow-light">
        <div className="site-container section-pad-lg grid gap-10 lg:grid-cols-2 lg:items-start">
          <aside>
            <p className="section-eyebrow">Contact desk</p>
            <h2 className="mt-2 text-[clamp(1.8rem,4vw,2.8rem)] font-bold text-foreground">Speak with the FIXONEX team.</h2>
            <p className="section-subtext mt-4">
              Whether you need product advice, want to place an order, or have a technical question, our team is ready to help.
            </p>
            <div className="fx-image-placeholder mt-7 min-h-[280px]">
              <ImageWithFallback src="https://picsum.photos/900/700" alt="FIXONEX consultation support" fill className="object-cover" />
            </div>
            <div className="mt-6 space-y-2 text-sm">
              <p>
                <a href="tel:+917383838632" className="font-semibold text-primary hover:text-primary-dark">
                  +91 7383838632
                </a>
              </p>
              <p>
                <a href="mailto:info@fixonex.com" className="font-semibold text-foreground hover:text-primary">
                  info@fixonex.com
                </a>
              </p>
              <p className="text-mid">SWASTIK ENTERPRISES, FF, Block-D, Shop No. 102, Narayan Exotica, Ahmedabad-380052, Gujarat</p>
              <Button asChild variant="outline" className="mt-2">
                <Link href="https://wa.me/917383838632" target="_blank" rel="noopener noreferrer">
                  Chat on WhatsApp
                </Link>
              </Button>
            </div>
          </aside>

          <div className="surface-card p-6 sm:p-8">
            <p className="section-eyebrow">Inquiry form</p>
            {submitted ? (
              <div className="mt-4 rounded-lg border border-green-200 bg-green-50 p-4">
                <p className="inline-flex items-center gap-2 text-green-700">
                  <Check className="h-4 w-4" aria-hidden /> Thank you! We&apos;ll be in touch within 24 hours.
                </p>
                <Button type="button" variant="outline" className="mt-4" onClick={() => setSubmitted(false)}>
                  Send another message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-5">
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" {...register("fullName", { required: "Required" })} aria-invalid={!!errors.fullName} className="mt-1.5" />
                  {errors.fullName ? <p className="mt-1 text-xs text-red-600">{errors.fullName.message}</p> : null}
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" placeholder="+91 …" {...register("phone", { required: "Required" })} aria-invalid={!!errors.phone} className="mt-1.5" />
                  {errors.phone ? <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p> : null}
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" {...register("email")} className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="inquiryType">Inquiry Type</Label>
                  <select id="inquiryType" {...register("inquiryType", { required: true })} className={`${selectControlClass} mt-1.5`}>
                    {inquiryOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" rows={4} {...register("message", { required: "Required" })} aria-invalid={!!errors.message} className="mt-1.5" />
                  {errors.message ? <p className="mt-1 text-xs text-red-600">{errors.message.message}</p> : null}
                </div>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
