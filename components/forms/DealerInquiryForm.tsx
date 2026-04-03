"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { mockSubmitForm, type FormStatus } from "@/lib/form-submit";
import { CheckCircle2, AlertCircle } from "lucide-react";

const initial = {
  businessName: "",
  contactPerson: "",
  phone: "",
  email: "",
  cityState: "",
  businessType: "",
  message: "",
};

export function DealerInquiryForm() {
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMessage("");
    if (
      !form.businessName.trim() ||
      !form.contactPerson.trim() ||
      !form.phone.trim() ||
      !form.email.trim()
    ) {
      setErrorMessage("Please complete business name, contact person, phone, and email.");
      return;
    }
    setStatus("submitting");
    /* TODO: Route to partner onboarding workflow — server-side only. */
    const res = await mockSubmitForm({ form: "dealer", ...form });
    setStatus(res.ok ? "success" : "error");
    if (res.ok) setForm(initial);
    else setErrorMessage("Unable to submit. Please email partnerships directly.");
  }

  if (status === "success") {
    return (
      <div
        className="flex flex-col items-center gap-3 rounded-sm border border-border bg-muted p-8 text-center"
        role="status"
      >
        <CheckCircle2 className="h-10 w-10 text-primary" aria-hidden />
        <p className="font-heading text-lg font-semibold text-foreground">Inquiry logged</p>
        <p className="text-sm text-muted-foreground max-w-md">
          Our channel team will review your profile and respond with next steps for territory and logistics alignment.
        </p>
        <Button type="button" variant="outline" onClick={() => setStatus("idle")}>
          Submit another inquiry
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="dealer-business">Business name</Label>
          <Input
            id="dealer-business"
            value={form.businessName}
            onChange={(e) => setForm((f) => ({ ...f, businessName: e.target.value }))}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="dealer-person">Contact person</Label>
          <Input
            id="dealer-person"
            value={form.contactPerson}
            onChange={(e) => setForm((f) => ({ ...f, contactPerson: e.target.value }))}
            autoComplete="name"
            required
          />
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="dealer-phone">Phone</Label>
          <Input
            id="dealer-phone"
            type="tel"
            value={form.phone}
            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="dealer-email">Email</Label>
          <Input
            id="dealer-email"
            type="email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            required
          />
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="dealer-location">City / state</Label>
          <Input
            id="dealer-location"
            value={form.cityState}
            onChange={(e) => setForm((f) => ({ ...f, cityState: e.target.value }))}
            placeholder="e.g. Ahmedabad, Gujarat"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="dealer-type">Business type</Label>
          <Input
            id="dealer-type"
            value={form.businessType}
            onChange={(e) => setForm((f) => ({ ...f, businessType: e.target.value }))}
            placeholder="Distributor, retailer, project dealer…"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="dealer-message">Message</Label>
        <Textarea
          id="dealer-message"
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          rows={5}
          placeholder="Territories served, warehouse capacity, and relevant contractor segments."
        />
      </div>
      {errorMessage && (
        <div className="flex items-center gap-2 text-sm text-primary" role="alert">
          <AlertCircle className="h-4 w-4 shrink-0" aria-hidden />
          {errorMessage}
        </div>
      )}
      <Button type="submit" disabled={status === "submitting"} size="lg">
        {status === "submitting" ? "Sending…" : "Submit partnership inquiry"}
      </Button>
    </form>
  );
}
