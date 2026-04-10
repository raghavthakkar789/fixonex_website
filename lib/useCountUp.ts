"use client";

import { useEffect, useMemo, useState } from "react";

export function parseStatValue(value: string): { numeric: number; prefix: string; suffix: string } {
  if (!/^\d/.test(value.trim())) {
    return { numeric: 0, prefix: "", suffix: value };
  }
  const match = value.match(/^(\D*)(\d+)(\D*)$/);
  if (!match) return { numeric: 0, prefix: "", suffix: value };
  const [, prefix, num, suffix] = match;
  return { numeric: Number(num), prefix: prefix ?? "", suffix: suffix ?? "" };
}

type UseCountUpOptions = {
  durationMs?: number;
};

const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));

/** Animate from 0 to numeric when `start` becomes true. Non-numeric values return as-is immediately. */
export function useCountUp(value: string, start: boolean, options: UseCountUpOptions = {}): string {
  const { durationMs = 2000 } = options;
  const { numeric, prefix, suffix } = useMemo(() => parseStatValue(value), [value]);
  const [display, setDisplay] = useState(0);
  const isTextOnly = suffix.length > 0 && numeric === 0 && prefix === "";

  useEffect(() => {
    if (isTextOnly) return;
    if (!start) return;
    let frame = 0;
    const begin = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - begin) / durationMs, 1);
      setDisplay(Math.round(easeOutExpo(t) * numeric));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [start, numeric, durationMs, isTextOnly]);

  if (isTextOnly) return value;
  return `${prefix}${display}${suffix}`;
}
