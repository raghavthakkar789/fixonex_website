"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export function CursorFollower() {
  const [noFinePointer, setNoFinePointer] = useState(false);
  const [interactive, setInteractive] = useState(false);
  const [hidden, setHidden] = useState(true);
  const smallX = useSpring(0, { stiffness: 400, damping: 28 });
  const smallY = useSpring(0, { stiffness: 400, damping: 28 });
  const ringX = useSpring(0, { stiffness: 150, damping: 20 });
  const ringY = useSpring(0, { stiffness: 150, damping: 20 });

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const upd = () => setNoFinePointer(!mq.matches);
    upd();
    mq.addEventListener("change", upd);
    return () => mq.removeEventListener("change", upd);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const isTextField = !!target?.closest("input, textarea, select, [contenteditable='true']");
      setHidden(isTextField);
      setInteractive(!!target?.closest("a, button, [role='button'], [data-interactive='true']"));
      smallX.set(e.clientX);
      smallY.set(e.clientY);
      ringX.set(e.clientX);
      ringY.set(e.clientY);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [ringX, ringY, smallX, smallY]);

  if (noFinePointer) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[120] rounded-full bg-chip mix-blend-screen"
        style={{
          x: smallX,
          y: smallY,
          width: interactive ? 20 : 12,
          height: interactive ? 20 : 12,
          opacity: hidden ? 0 : 1,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[119] rounded-full border border-primary"
        style={{
          x: ringX,
          y: ringY,
          width: interactive ? 60 : 40,
          height: interactive ? 60 : 40,
          opacity: hidden ? 0 : interactive ? 0.6 : 0.3,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
    </>
  );
}
