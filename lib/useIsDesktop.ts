"use client";

import { useEffect, useState } from "react";

const QUERY = "(min-width: 1024px)";

export function useIsDesktop(): boolean {
  const [ok, setOk] = useState(false);

  useEffect(() => {
    const mm = window.matchMedia(QUERY);
    const f = () => setOk(mm.matches);
    f();
    mm.addEventListener("change", f);
    return () => mm.removeEventListener("change", f);
  }, []);

  return ok;
}
