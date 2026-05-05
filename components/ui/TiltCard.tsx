"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

export function TiltCard({
  children,
  className,
  intensity = 6,
}: {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    const y = -(e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    setTilt({ x: x * intensity, y: y * intensity });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  };
  const handleMouseEnter = () => setHovered(true);

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      animate={{
        rotateX: tilt.x,
        rotateY: tilt.y,
        scale: hovered ? 1.015 : 1,
        z: hovered ? 30 : 0,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 28, mass: 0.6 }}
      style={{ transformStyle: "preserve-3d", perspective: 1200 }}
    >
      {/* Nudge content forward in 3D space so anchors, buttons, and inputs stay
          reliably clickable under preserve-3d + rotate transforms (Safari /
          Chrome quirk without this layer). */}
      <div
        className="h-full w-full min-h-0"
        style={{
          transform: "translateZ(42px)",
          transformStyle: "preserve-3d",
          backfaceVisibility: "hidden",
        }}
      >
        {children}
      </div>
    </motion.div>
  );
}
