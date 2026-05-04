"use client";

import * as React from "react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Curated, deduplicated list of dial codes. India first (default), then a set
 * commonly used by FIXONEX customers / dealers. Display intentionally shows
 * the dial code only — no country names.
 */
const DIAL_CODES: readonly string[] = [
  "+91",
  "+1",
  "+44",
  "+971",
  "+966",
  "+65",
  "+61",
  "+86",
  "+81",
  "+49",
  "+33",
  "+39",
  "+34",
  "+27",
  "+880",
  "+92",
  "+94",
  "+977",
  "+975",
  "+960",
  "+7",
  "+82",
  "+62",
  "+60",
  "+66",
  "+84",
  "+63",
  "+20",
  "+234",
  "+90",
  "+98",
  "+964",
  "+974",
  "+973",
  "+968",
  "+965",
  "+52",
  "+55",
  "+54",
];

const DEFAULT_DIAL = "+91";

/** Split a free-form phone string into a dial code (if it starts with +) and the rest. */
function splitPhone(value: string): { dial: string; rest: string } {
  const trimmed = value.trim();
  if (!trimmed.startsWith("+")) {
    return { dial: DEFAULT_DIAL, rest: trimmed };
  }
  const match = trimmed.match(/^(\+\d{1,4})\s*(.*)$/);
  if (!match) return { dial: DEFAULT_DIAL, rest: trimmed };
  const candidate = match[1] ?? DEFAULT_DIAL;
  const rest = match[2] ?? "";
  const dial = DIAL_CODES.includes(candidate) ? candidate : DEFAULT_DIAL;
  return { dial, rest };
}

export type PhoneInputProps = {
  id?: string;
  name?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  autoComplete?: string;
  /** Wrapper-level classes (layout/margin) */
  className?: string;
  /** Override classes for the dial-code trigger button */
  triggerClassName?: string;
  /** Override classes for the inner phone-number input */
  inputClassName?: string;
  /** Default dial code if `value` doesn't include one. Defaults to "+91". */
  defaultDialCode?: string;
  "aria-invalid"?: boolean | "false" | "true";
  "aria-label"?: string;
};

const baseTriggerClass =
  "inline-flex h-12 items-center gap-1 rounded-l-md border border-r-0 border-border-strong bg-elevated px-3 font-sans text-[15px] text-foreground shadow-sm transition-[border-color,box-shadow,background-color] duration-150 hover:bg-zinc-50 focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/25 disabled:cursor-not-allowed disabled:opacity-50";

const baseInputClass =
  "flex h-12 w-full min-w-0 rounded-r-md border border-l-0 border-border-strong bg-elevated px-3 font-sans text-[15px] text-foreground outline-none placeholder:text-muted-foreground shadow-sm transition-[border-color,box-shadow] duration-150 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/25 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50";

/**
 * Phone-number input with a left-attached dial-code dropdown.
 * Trigger displays only the dial code (e.g. "+91") — no country name.
 * Default dial code is `+91` (India).
 */
export function PhoneInput({
  id,
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  required,
  disabled,
  autoComplete = "tel",
  className,
  triggerClassName,
  inputClassName,
  defaultDialCode = DEFAULT_DIAL,
  "aria-invalid": ariaInvalid,
  "aria-label": ariaLabel,
}: PhoneInputProps) {
  const initialSplit = React.useMemo(() => splitPhone(value || ""), []); // eslint-disable-line react-hooks/exhaustive-deps
  const [dial, setDial] = React.useState<string>(initialSplit.dial || defaultDialCode);
  const [open, setOpen] = React.useState(false);

  const wrapperRef = React.useRef<HTMLDivElement | null>(null);
  const triggerRef = React.useRef<HTMLButtonElement | null>(null);

  const number = React.useMemo(() => splitPhone(value || "").rest, [value]);

  React.useEffect(() => {
    const incoming = splitPhone(value || "");
    if (incoming.dial && incoming.dial !== dial && (value || "").trim().startsWith("+")) {
      setDial(incoming.dial);
    }
  }, [value, dial]);

  React.useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function emit(nextDial: string, nextNumber: string) {
    const trimmed = nextNumber.trim();
    if (!trimmed) {
      onChange("");
      return;
    }
    onChange(`${nextDial} ${trimmed}`);
  }

  function handleSelectDial(code: string) {
    setDial(code);
    setOpen(false);
    emit(code, number);
    triggerRef.current?.focus();
  }

  function handleNumberChange(e: React.ChangeEvent<HTMLInputElement>) {
    emit(dial, e.target.value);
  }

  return (
    <div ref={wrapperRef} className={cn("relative flex items-stretch", className)}>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => !disabled && setOpen((v) => !v)}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Country code, currently ${dial}`}
        className={cn(baseTriggerClass, triggerClassName)}
      >
        <span className="font-medium tabular-nums">{dial}</span>
        <ChevronDown
          className={cn("h-4 w-4 text-zinc-500 transition-transform duration-200", open && "rotate-180")}
          aria-hidden
        />
      </button>

      <input
        id={id}
        name={name}
        type="tel"
        inputMode="tel"
        autoComplete={autoComplete}
        value={number}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        onChange={handleNumberChange}
        onBlur={onBlur}
        aria-invalid={ariaInvalid}
        aria-label={ariaLabel}
        suppressHydrationWarning
        className={cn(baseInputClass, inputClassName)}
      />

      {open && (
        <ul
          role="listbox"
          aria-label="Select country code"
          className="absolute left-0 top-full z-50 mt-1 max-h-60 w-[7.5rem] overflow-y-auto rounded-md border border-zinc-200 bg-white py-1 shadow-lg"
        >
          {DIAL_CODES.map((code) => {
            const selected = code === dial;
            return (
              <li key={code}>
                <button
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => handleSelectDial(code)}
                  className={cn(
                    "flex w-full items-center justify-between px-3 py-1.5 text-left text-[14px] tabular-nums transition-colors",
                    selected
                      ? "bg-primary/10 font-semibold text-primary"
                      : "text-zinc-700 hover:bg-zinc-50",
                  )}
                >
                  <span>{code}</span>
                  {selected && <Check className="h-3.5 w-3.5" aria-hidden />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
