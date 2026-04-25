"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, onFocus, onBlur, ...props }, ref) => {
  const [focus, setFocus] = React.useState(false);
  return (
    <textarea
      suppressHydrationWarning
      className={cn(
        "flex min-h-[120px] w-full rounded-md border border-[rgba(193,178,164,0.2)] bg-white px-3 py-3 text-[15px] text-black",
        "placeholder:text-mid focus-visible:outline-none focus-visible:ring-0",
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
Textarea.displayName = "Textarea";

export { Textarea };
