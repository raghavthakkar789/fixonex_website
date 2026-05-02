"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type = "text", ...props }, ref) => (
  <input
    type={type}
    ref={ref}
    className={cn(
      "flex h-12 w-full rounded-md border border-border-strong bg-white px-3 text-[15px] text-foreground shadow-sm transition-[border-color,box-shadow] duration-200 placeholder:text-subhead focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/25 disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    {...props}
  />
));

Input.displayName = "Input";

export { Input };
