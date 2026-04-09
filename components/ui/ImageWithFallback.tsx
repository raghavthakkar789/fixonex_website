"use client";

import Image from "next/image";
import { useState } from "react";
import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

type ImageWithFallbackProps = {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  placeholderClassName?: string;
  style?: CSSProperties;
};

export function ImageWithFallback({
  src,
  alt,
  className,
  fill,
  width,
  height,
  sizes,
  priority,
  placeholderClassName,
  style,
}: ImageWithFallbackProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <>
      {!hasError ? (
        <Image
          src={src}
          alt={alt}
          fill={fill}
          width={width}
          height={height}
          sizes={sizes}
          priority={priority}
          className={className}
          style={style}
          onError={() => setHasError(true)}
        />
      ) : null}
      <div
        aria-hidden
        className={cn("absolute inset-0 bg-[#C1B2A4]", placeholderClassName, !hasError && "hidden")}
      />
    </>
  );
}
