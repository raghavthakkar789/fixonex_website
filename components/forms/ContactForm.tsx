"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/PhoneInput";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FormErrorAlert, FormSuccessPanel } from "@/components/forms/form-feedback";
import { mockSubmitForm, type FormStatus } from "@/lib/form-submit";
import { isTenDigitNationalNumber, PHONE_EXACTLY_TEN_DIGITS_MESSAGE } from "@/lib/phone-validation";
import { cta, formStackClass, formTitleClass, selectControlClass } from "@/lib/ui-constants";
import { cn } from "@/lib/utils";

const inquiryTypes = [
  { value: "sales", label: "Sales enquiry" },
  { value: "general", label: "General enquiry" },
  { value: "partner", label: "Partner inquiry" },
  { value: "other", label: "Other" },
] as const;

const initial = {
  inquiryType: "" as string,
  name: "",
  phone: "",
  email: "",
  message: "",
};

export function ContactForm() {
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMessage("");
    if (!form.inquiryType || !form.name.trim() || !form.phone.trim() || !form.email.trim() || !form.message.trim()) {
      setErrorMessage("Please choose an inquiry type and fill in name, phone, email, and message.");
      return;
    }
    if (!isTenDigitNationalNumber(form.phone)) {
      setErrorMessage(PHONE_EXACTLY_TEN_DIGITS_MESSAGE);
      return;
    }
    setStatus("submitting");
    const res = await mockSubmitForm({ form: "contact", ...form });
    setStatus(res.ok ? "success" : "error");
    if (res.ok) setForm(initial);
    else setErrorMessage("Something went wrong. Please try again or contact us directly.");
  }

  if (status === "success") {
    return (
      <FormSuccessPanel resetLabel={cta.sendAnother} onReset={() => setStatus("idle")} />
    );
  }

  return (
    <form onSubmit={onSubmit} className={formStackClass} noValidate>
      <p className={cn(formTitleClass)}>{cta.talkTeam}</p>

      <div className="space-y-2">
        <Label htmlFor="contact-inquiry-type">What can we help with?</Label>
        <select
          id="contact-inquiry-type"
          name="inquiryType"
          className={selectControlClass}
          value={form.inquiryType}
          onChange={(e) => setForm((f) => ({ ...f, inquiryType: e.target.value }))}
          required
        >
          <option value="">Select one</option>
          {inquiryTypes.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="contact-name">Full name</Label>
          <Input
            id="contact-name"
            name="name"
            autoComplete="name"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contact-phone">Phone</Label>
          <PhoneInput
            id="contact-phone"
            name="phone"
            value={form.phone}
            onChange={(v) => setForm((f) => ({ ...f, phone: v }))}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contact-email">Email</Label>
          <Input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact-message">Message</Label>
        <Textarea
          id="contact-message"
          name="message"
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          required
          rows={5}
          placeholder="Project type, city, timeline, or anything we should know."
        />
      </div>

      {errorMessage ? <FormErrorAlert message={errorMessage} /> : null}

      <Button type="submit" disabled={status === "submitting"} size="lg" className="w-full sm:w-auto">
        {status === "submitting" ? cta.sending : cta.submitEnquiry}
      </Button>
    </form>
  );
}
