import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      suppressHydrationWarning
      className={cn(
        "flex h-12 w-full rounded-md border border-border bg-white px-3 text-[15px] text-black outline-none placeholder:text-mid focus-visible:ring-2 focus-visible:ring-warm disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
