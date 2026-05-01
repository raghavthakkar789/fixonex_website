"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => (
  <textarea
    suppressHydrationWarning
    className={cn(
      "flex min-h-[120px] w-full rounded-md border border-border-strong bg-elevated px-3 py-3 font-sans text-[15px] text-foreground",
      "placeholder:text-muted-foreground shadow-sm transition-[border-color,box-shadow] duration-200",
      "focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/25 focus-visible:ring-offset-2 focus-visible:ring-offset-elevated",
      "disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    ref={ref}
    {...props}
  />
));
Textarea.displayName = "Textarea";

export { Textarea };
