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
  preferredDate: "",
  preferredTime: "",
  projectRequirement: "",
  productType: "",
  notes: "",
};

export function ConsultationForm() {
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMessage("");
    if (
      !form.name.trim() ||
      !form.phone.trim() ||
      !form.email.trim() ||
      !form.projectRequirement.trim()
    ) {
      setErrorMessage("Please complete name, phone, email, and project requirements.");
      return;
    }
    setStatus("submitting");
    /* TODO: Wire to calendar backend or email — use env on server only. */
    const res = await mockSubmitForm({ form: "consultation", ...form });
    setStatus(res.ok ? "success" : "error");
    if (res.ok) setForm(initial);
    else setErrorMessage("Submission failed. Please contact us by phone or email.");
  }

  if (status === "success") {
    return (
      <div
        className="flex flex-col items-center gap-3 rounded-sm border border-border bg-muted p-8 text-center"
        role="status"
      >
        <CheckCircle2 className="h-10 w-10 text-primary" aria-hidden />
        <p className="font-heading text-lg font-semibold text-foreground">Request received</p>
        <p className="text-sm text-muted-foreground max-w-md">
          A technical representative will confirm your preferred time or propose alternatives.
        </p>
        <Button type="button" variant="outline" onClick={() => setStatus("idle")}>
          Book another slot
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="cons-name">Full name</Label>
          <Input
            id="cons-name"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            autoComplete="name"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cons-phone">Phone</Label>
          <Input
            id="cons-phone"
            type="tel"
            value={form.phone}
            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
            autoComplete="tel"
            required
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="cons-email">Email</Label>
        <Input
          id="cons-email"
          type="email"
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          autoComplete="email"
          required
        />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="cons-date">Preferred date</Label>
          <Input
            id="cons-date"
            type="date"
            value={form.preferredDate}
            onChange={(e) => setForm((f) => ({ ...f, preferredDate: e.target.value }))}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cons-time">Preferred time</Label>
          <Input
            id="cons-time"
            type="time"
            value={form.preferredTime}
            onChange={(e) => setForm((f) => ({ ...f, preferredTime: e.target.value }))}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="cons-project">Project requirement</Label>
        <Textarea
          id="cons-project"
          value={form.projectRequirement}
          onChange={(e) => setForm((f) => ({ ...f, projectRequirement: e.target.value }))}
          rows={4}
          required
          placeholder="Site location, building type, timeline, and key constraints."
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="cons-product">Product / application type</Label>
        <select
          id="cons-product"
          className="flex h-11 w-full rounded-sm border border-border bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          value={form.productType}
          onChange={(e) => setForm((f) => ({ ...f, productType: e.target.value }))}
        >
          <option value="">Select if known</option>
          {productCategories.map((p) => (
            <option key={p.slug} value={p.slug}>
              {p.title}
            </option>
          ))}
        </select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="cons-notes">Notes</Label>
        <Textarea
          id="cons-notes"
          value={form.notes}
          onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
          rows={3}
          placeholder="Optional: drawings reference, specifier contact, or mock-up needs."
        />
      </div>
      {errorMessage && (
        <div className="flex items-center gap-2 text-sm text-primary" role="alert">
          <AlertCircle className="h-4 w-4 shrink-0" aria-hidden />
          {errorMessage}
        </div>
      )}
      <Button type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? "Submitting…" : "Submit product request"}
      </Button>
    </form>
  );
}
