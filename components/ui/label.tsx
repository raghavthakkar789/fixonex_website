"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cn } from "@/lib/utils";

const labelBase =
  "text-xs font-semibold tracking-tight text-dark peer-disabled:cursor-not-allowed peer-disabled:opacity-70 sm:text-sm sm:font-medium";

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root ref={ref} className={cn(labelBase, className)} {...props} />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
