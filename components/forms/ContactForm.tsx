"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { mockSubmitForm, type FormStatus } from "@/lib/form-submit";
import { productCategories } from "@/data/products";
import { CheckCircle2, AlertCircle } from "lucide-react";

const initial = {
  name: "",
  phone: "",
  email: "",
  productInterest: "",
  message: "",
};

export function ContactForm() {
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMessage("");
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setErrorMessage("Please complete name, email, and message.");
      return;
    }
    setStatus("submitting");
    /*
     * TODO: Replace with Server Action or fetch("/api/contact") that uses
     * env vars (e.g. RESEND_API_KEY, CRM_WEBHOOK_URL) — never expose secrets client-side.
     */
    const res = await mockSubmitForm({ form: "contact", ...form });
    setStatus(res.ok ? "success" : "error");
    if (res.ok) setForm(initial);
    else setErrorMessage("Something went wrong. Please call or email us directly.");
  }

  if (status === "success") {
    return (
      <div
        className="flex flex-col items-center gap-3 rounded-sm border border-border bg-muted p-8 text-center"
        role="status"
      >
        <CheckCircle2 className="h-10 w-10 text-primary" aria-hidden />
        <p className="font-heading text-lg font-semibold text-foreground">Thank you</p>
        <p className="text-sm text-muted-foreground max-w-md">
          Your inquiry was received. Our team will respond during the next business window.
        </p>
        <Button type="button" variant="outline" onClick={() => setStatus("idle")}>
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
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
          <Input
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
          />
        </div>
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
      <div className="space-y-2">
        <Label htmlFor="contact-product">Product interest (optional)</Label>
        <select
          id="contact-product"
          name="productInterest"
          className="flex h-11 w-full rounded-sm border border-border bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          value={form.productInterest}
          onChange={(e) => setForm((f) => ({ ...f, productInterest: e.target.value }))}
        >
          <option value="">Select a category</option>
          {productCategories.map((p) => (
            <option key={p.slug} value={p.slug}>
              {p.title}
            </option>
          ))}
        </select>
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
        />
      </div>
      {errorMessage && (
        <div className="flex items-center gap-2 text-sm text-primary" role="alert">
          <AlertCircle className="h-4 w-4 shrink-0" aria-hidden />
          {errorMessage}
        </div>
      )}
      <Button type="submit" disabled={status === "submitting"} className="w-full sm:w-auto">
        {status === "submitting" ? "Sending…" : "Submit inquiry"}
      </Button>
    </form>
  );
}
