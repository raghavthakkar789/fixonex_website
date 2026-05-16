"use client";

import Image from "next/image";
import { useState, useRef, type CSSProperties } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { easings, transitions } from "@/lib/animations";
import { cn } from "@/lib/utils";

const ease = easings.easeOutExpo as [number, number, number, number];

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
  imageTone?: "light" | "dark";
  /** "blur" = Gaussian+scale; "clip" = horizontal curtain; "none" = static */
  reveal?: "blur" | "clip" | "none";
  /**
   * When `eager`, the browser fetches immediately (no lazy near-viewport deferral).
   * Default `eager` so below-the-fold imagery is ready before the user scrolls.
   */
  loading?: "eager" | "lazy";
};

/** Expands IO root (~one tall viewport beyond each edge) so clip reveals activate soon after paint. */
const IN_VIEW_PREFETCH_MARGIN = "900px";

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
  imageTone = "light",
  reveal = "blur",
  loading = "eager",
}: ImageWithFallbackProps) {
  const [hasError, setHasError] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: IN_VIEW_PREFETCH_MARGIN });
  const reduced = useReducedMotion();
  const ph = imageTone === "light" ? "bg-off-white" : "bg-charcoal";
  const bg = imageTone === "light" ? "#F5F5F5" : "#1E1E1E";

  const onDone = () => setLoaded(true);

  /** Reduces Drive 403s when embedding thumbnails (hotlink policies). */
  const driveReferrer = src.includes("drive.google.com") ? "no-referrer" : undefined;

  /** When eager, decoded pixels can reveal immediately (no scroll-gated unveil). */
  const revealUnlock = priority || loading === "eager" || inView;

  const inner = !hasError ? (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      width={width}
      height={height}
      sizes={sizes}
      priority={priority}
      loading={priority ? undefined : loading}
      referrerPolicy={driveReferrer}
      className={className}
      style={style}
      onError={() => setHasError(true)}
      onLoad={onDone}
      onLoadingComplete={onDone}
    />
  ) : null;

  if (reveal === "none" || reduced) {
    return (
      <div
        ref={ref}
        className={cn((fill && "absolute inset-0") || "relative", (fill && "h-full w-full") || "")}
      >
        {inner}
        <div
          aria-hidden
          className={cn("absolute inset-0", ph, placeholderClassName, !hasError && loaded && "hidden")}
        />
      </div>
    );
  }

  if (reveal === "clip") {
    return (
      <div ref={ref} className={cn("relative", (fill && "absolute inset-0 h-full w-full") || "")}>
        <motion.div
          className={cn("overflow-hidden", (fill && "absolute inset-0") || "relative h-full w-full")}
          initial={false}
          animate={inView || loading === "eager" || priority ? { clipPath: "inset(0 0% 0 0)" } : { clipPath: "inset(0 100% 0 0)" }}
          transition={{ duration: 1, ease }}
        >
          {inner}
        </motion.div>
        <div
          aria-hidden
          className={cn("absolute inset-0 z-[1] transition-opacity", ph, placeholderClassName, loaded && "pointer-events-none opacity-0")}
          style={!loaded ? { background: bg } : undefined}
        />
      </div>
    );
  }

  return (
    <div ref={ref} className={cn("relative overflow-hidden", (fill && "absolute inset-0 h-full w-full") || "")}>
      {!hasError ? (
        <motion.div
          className={cn("relative h-full w-full", (fill && "absolute inset-0") || "")}
          initial={priority ? false : { scale: 1.05, opacity: 0, filter: "blur(12px)" }}
          animate={loaded && revealUnlock ? { scale: 1, opacity: 1, filter: "blur(0px)" } : undefined}
          transition={{ ...transitions.medium, ease }}
        >
          <Image
            src={src}
            alt={alt}
            fill={fill}
            width={width}
            height={height}
            sizes={sizes}
            priority={priority}
            loading={priority ? undefined : loading}
            referrerPolicy={driveReferrer}
            className={className}
            style={style}
            onError={() => setHasError(true)}
            onLoad={onDone}
            onLoadingComplete={onDone}
          />
        </motion.div>
      ) : null}
      <div
        aria-hidden
        className={cn("absolute inset-0 z-[1] transition-opacity duration-200", ph, placeholderClassName, (loaded || hasError) && "pointer-events-none opacity-0")}
        style={!loaded && !hasError ? { background: bg } : undefined}
      />
    </div>
  );
}
