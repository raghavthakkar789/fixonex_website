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
      className="flex flex-col items-center gap-3 rounded-sm border border-border bg-muted p-8 text-center"
      role="status"
    >
      <CheckCircle2 className="h-10 w-10 text-primary" aria-hidden />
      <p className="font-heading text-lg font-semibold text-foreground">Got your request.</p>
      <p className="max-w-md text-sm text-muted-foreground">Our team will get back to you shortly.</p>
      <Button type="button" variant="outline" onClick={onReset}>
        {resetLabel}
      </Button>
    </div>
  );
}

export function FormErrorAlert({ message }: { message: string }) {
  return (
    <div className="flex items-center gap-2 text-sm text-primary" role="alert">
      <AlertCircle className="h-4 w-4 shrink-0" aria-hidden />
      {message}
    </div>
  );
}
