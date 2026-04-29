"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      suppressHydrationWarning
      className={cn(
        "flex h-12 w-full rounded-md border border-border-strong bg-elevated px-3 font-sans text-[15px] text-foreground outline-none placeholder:text-muted-foreground",
        "shadow-neo-inset",
        "transition-[border-color,box-shadow] duration-150",
        "focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/25 focus-visible:ring-offset-2 focus-visible:ring-offset-elevated",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      ref={ref}
      {...props}
    />
  ),
);
Input.displayName = "Input";

export { Input };
