"use client";

import { useCallback, useState } from "react";

export function useMouseParallax(maxPx = 4) {
  const [shift, setShift] = useState({ x: 0, y: 0 });

  const onMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const el = e.currentTarget;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const nx = (e.clientX - cx) / (r.width / 2);
      const ny = (e.clientY - cy) / (r.height / 2);
      setShift({ x: nx * maxPx, y: ny * maxPx });
    },
    [maxPx],
  );

  const onLeave = useCallback(() => setShift({ x: 0, y: 0 }), []);

  return { shift, onMove, onLeave };
}
