"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FileDown, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/PhoneInput";
import { Button } from "@/components/ui/button";
import { FormErrorAlert } from "@/components/forms/form-feedback";
import { mockSubmitForm, type FormStatus } from "@/lib/form-submit";
import { cn } from "@/lib/utils";

const CATALOG_PDF_URL = "/FIXONEX%20E-CATALOG%20%20BY%20EAGLE%20EYE.pdf";

const easeExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

const initial = { name: "", phone: "", email: "" };

/**
 * Navbar catalog CTA. Opens a lightweight gate form that captures
 * name + phone (required) and email (optional) before opening the
 * FIXONEX e-catalog PDF in a new tab.
 */
export function CatalogRequestButton() {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const firstFieldRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const id = window.setTimeout(() => firstFieldRef.current?.focus(), 60);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      window.clearTimeout(id);
    };
  }, [open]);

  function reset() {
    setForm(initial);
    setStatus("idle");
    setErrorMessage("");
  }

  function close() {
    setOpen(false);
    window.setTimeout(reset, 250);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMessage("");

    const name = form.name.trim();
    const phone = form.phone.trim();
    const email = form.email.trim();

    if (!name) {
      setErrorMessage("Please enter your name.");
      return;
    }
    if (!phone) {
      setErrorMessage("Please enter a contact number.");
      return;
    }
    if (!/^[0-9+\-()\s]{7,}$/.test(phone)) {
      setErrorMessage("Please enter a valid contact number.");
      return;
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMessage("Please enter a valid email address, or leave it blank.");
      return;
    }

    setStatus("submitting");
    const res = await mockSubmitForm({ form: "catalog-request", name, phone, email });
    if (!res.ok) {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
      return;
    }

    setStatus("success");
    if (typeof window !== "undefined") {
      window.open(CATALOG_PDF_URL, "_blank", "noopener,noreferrer");
    }
    window.setTimeout(() => {
      setOpen(false);
      reset();
    }, 700);
  }

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        whileHover={reduced ? undefined : { scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.15 }}
        className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-3 py-1.5 text-[12px] font-semibold text-white shadow-sm ring-1 ring-primary/20 transition-colors hover:bg-primary/90 lg:mr-4 lg:px-8 lg:py-2 lg:text-[13px]"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label="Request the FIXONEX product catalog"
      >
        <FileDown className="h-3.5 w-3.5 shrink-0" aria-hidden />
        <span>Catalog</span>
      </motion.button>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                key="catalog-gate"
                className="fixed inset-0 z-[200] flex items-center justify-center px-4 py-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: easeExpo }}
                role="dialog"
                aria-modal="true"
                aria-labelledby="catalog-gate-title"
                aria-describedby="catalog-gate-desc"
              >
                <motion.div
                  className="absolute inset-0 bg-zinc-950/55 backdrop-blur-sm"
                  onClick={close}
                  aria-hidden
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.div
                  className="relative w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-6 shadow-2xl sm:p-7"
                  initial={{ opacity: 0, y: 16, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  transition={{ duration: 0.28, ease: easeExpo }}
                >
                  <button
                    type="button"
                    onClick={close}
                    className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    aria-label="Close"
                  >
                    <X className="h-4 w-4" aria-hidden />
                  </button>

                  <div className="mb-5 pr-8">
                    <h2
                      id="catalog-gate-title"
                      className="font-display text-xl font-bold tracking-tight text-zinc-900 sm:text-2xl"
                    >
                      Get the FIXONEX catalog
                    </h2>
                    <p id="catalog-gate-desc" className="mt-1.5 text-[13px] leading-relaxed text-zinc-600">
                      Share a few quick details and we&apos;ll open the e-catalog right away.
                    </p>
                  </div>

                  <form onSubmit={onSubmit} className="space-y-4" noValidate>
                    <div className="space-y-1.5">
                      <Label htmlFor="catalog-name">
                        Full name <span className="text-primary">*</span>
                      </Label>
                      <Input
                        id="catalog-name"
                        ref={firstFieldRef}
                        name="name"
                        autoComplete="name"
                        value={form.name}
                        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                        placeholder="Your name"
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="catalog-phone">
                        Contact number <span className="text-primary">*</span>
                      </Label>
                      <PhoneInput
                        id="catalog-phone"
                        name="phone"
                        value={form.phone}
                        onChange={(v) => setForm((f) => ({ ...f, phone: v }))}
                        placeholder="98765 43210"
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="catalog-email">
                        Email <span className="text-zinc-400 font-normal">(optional)</span>
                      </Label>
                      <Input
                        id="catalog-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={form.email}
                        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                        placeholder="you@example.com"
                      />
                    </div>

                    {errorMessage ? <FormErrorAlert message={errorMessage} /> : null}

                    <div className="flex flex-col-reverse gap-2 pt-1 sm:flex-row sm:items-center sm:justify-end">
                      <Button
                        type="button"
                        variant="outlineNeutral"
                        size="sm"
                        onClick={close}
                        disabled={status === "submitting"}
                        className="w-full sm:w-auto"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        variant="primary"
                        size="sm"
                        disabled={status === "submitting"}
                        className={cn("w-full sm:w-auto", status === "success" && "pointer-events-none")}
                      >
                        {status === "submitting"
                          ? "Opening…"
                          : status === "success"
                          ? "Opening catalog"
                          : "Open catalog"}
                      </Button>
                    </div>
                  </form>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
