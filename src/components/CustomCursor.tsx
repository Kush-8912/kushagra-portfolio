"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { damping: 30, stiffness: 400, mass: 0.4 });
  const sy = useSpring(y, { damping: 30, stiffness: 400, mass: 0.4 });
  const ringX = useSpring(x, { damping: 20, stiffness: 150, mass: 0.6 });
  const ringY = useSpring(y, { damping: 20, stiffness: 150, mass: 0.6 });
  const raf = useRef<number | null>(null);

  useEffect(() => {
    function move(e: MouseEvent) {
      setVisible(true);
      x.set(e.clientX);
      y.set(e.clientY);
    }
    function over(e: MouseEvent) {
      const target = e.target as HTMLElement;
      setHovering(!!target.closest("a, button, [data-cursor-hover]"));
    }
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [x, y]);

  if (!visible) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-2 w-2 rounded-full bg-accent-2 md:block"
        style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden rounded-full border border-fg/30 md:block"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: hovering ? 56 : 32,
          height: hovering ? 56 : 32,
          borderColor: hovering
            ? "rgba(139,92,246,0.8)"
            : "color-mix(in srgb, var(--fg) 30%, transparent)",
        }}
        transition={{ duration: 0.25 }}
      />
    </>
  );
}
