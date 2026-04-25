"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, onFocus, onBlur, ...props }, ref) => {
  const [focus, setFocus] = React.useState(false);
  return (
    <input
      type={type}
      suppressHydrationWarning
      className={cn(
        "flex h-12 w-full rounded-md border border-[rgba(193,178,164,0.2)] bg-white px-3 text-[15px] text-black outline-none",
        "placeholder:text-mid",
        "focus-visible:ring-0",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "shadow-[inset_4px_4px_8px_#0a0a0a,inset_-4px_-4px_8px_#1c1c1c]",
        "transition-[border-color,box-shadow] duration-200",
        className,
      )}
      style={
        focus
          ? {
              borderColor: "rgba(193,178,164,0.7)",
              boxShadow: "0 0 0 3px rgba(193,178,164,0.12), inset 6px 6px 12px #080808, inset -6px -6px 12px #1C1C1C",
            }
          : undefined
      }
      ref={ref}
      onFocus={(e) => {
        setFocus(true);
        onFocus?.(e);
      }}
      onBlur={(e) => {
        setFocus(false);
        onBlur?.(e);
      }}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
