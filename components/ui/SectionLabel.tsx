import { cn } from "@/lib/utils";

type SectionLabelProps = {
  text: string;
  color?: "warm" | "red" | "white";
  className?: string;
};

const colorMap = {
  warm: "text-warm",
  red: "text-red",
  white: "text-white",
} as const;

const dotMap = {
  warm: "bg-warm",
  red: "bg-red",
  white: "bg-white",
} as const;

export function SectionLabel({ text, color = "warm", className }: SectionLabelProps) {
  return (
    <p className={cn("mb-4 inline-flex items-center gap-2 font-body text-[11px] font-medium uppercase tracking-[0.12em]", colorMap[color], className)}>
      <span className={cn("h-1.5 w-1.5 rounded-full", dotMap[color])} aria-hidden />
      {text}
    </p>
  );
}
