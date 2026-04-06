"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

type Props = { href: string };

/** For static export (`output: "export"`): server redirects are not prerenderable; client replace preserves basePath. */
export function ClientRedirect({ href }: Props) {
  const router = useRouter();
  useEffect(() => {
    router.replace(href);
  }, [router, href]);
  return (
    <p className="mx-auto max-w-xl px-4 py-16 text-center text-sm text-muted-foreground">
      Redirecting…
    </p>
  );
}
