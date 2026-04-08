"use client";

import { AlertCircle, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";

export function FormSuccessPanel({
  resetLabel,
  onReset,
}: {
  resetLabel: string;
  onReset: () => void;
}) {
  return (
    <div
      className="flex flex-col items-center gap-4 rounded-md border border-border bg-muted p-7 text-center sm:p-8"
      role="status"
    >
      <CheckCircle2 className="h-10 w-10 text-subhead" aria-hidden />
      <p className="font-heading text-base font-bold tracking-tight text-foreground sm:text-lg">Request received</p>
      <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
        Our team will respond with clear next steps.
      </p>
      <Button type="button" variant="outline" onClick={onReset}>
        {resetLabel}
      </Button>
    </div>
  );
}

export function FormErrorAlert({ message }: { message: string }) {
  return (
    <div
      className="flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2.5 text-sm text-foreground"
      role="alert"
    >
      <AlertCircle className="h-4 w-4 shrink-0 text-primary" aria-hidden />
      {message}
    </div>
  );
}
