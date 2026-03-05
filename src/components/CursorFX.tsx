"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function CursorFX() {
  const rafRef = useRef<number | null>(null);
  const visibleRef = useRef(false);
  const posRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });

  const [enabled, setEnabled] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const supportsHoverCursor = window.matchMedia("(hover: hover)").matches;
    if (!supportsHoverCursor) return;

    const enableFrame = window.requestAnimationFrame(() => {
      setEnabled(true);
    });
    document.body.classList.add("has-custom-cursor");

    const animate = () => {
      posRef.current.x += (targetRef.current.x - posRef.current.x) * 0.18;
      posRef.current.y += (targetRef.current.y - posRef.current.y) * 0.18;
      setPosition({ x: posRef.current.x, y: posRef.current.y });
      rafRef.current = window.requestAnimationFrame(animate);
    };

    const onMove = (event: MouseEvent) => {
      targetRef.current = { x: event.clientX, y: event.clientY };
      if (!visibleRef.current) {
        visibleRef.current = true;
        setVisible(true);
      }
    };

    const onOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const interactive = target?.closest("a, button, input, textarea, [role='button']");
      setHovered(Boolean(interactive));
    };

    const onLeaveWindow = () => {
      visibleRef.current = false;
      setVisible(false);
    };

    rafRef.current = window.requestAnimationFrame(animate);
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mouseout", onOver, { passive: true });
    window.addEventListener("mouseleave", onLeaveWindow);

    return () => {
      window.cancelAnimationFrame(enableFrame);
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout", onOver);
      window.removeEventListener("mouseleave", onLeaveWindow);
      document.body.classList.remove("has-custom-cursor");
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed z-[2147483647] size-2.5 rounded-full bg-emerald-300 shadow-[0_0_14px_rgba(16,185,129,0.95)]"
        animate={{
          opacity: visible ? 1 : 0,
          x: position.x - 5,
          y: position.y - 5,
          scale: hovered ? 1.4 : 1,
        }}
        transition={{ type: "spring", stiffness: 600, damping: 35, mass: 0.2 }}
      />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed z-[2147483646] size-12 rounded-full border border-emerald-300/80 bg-emerald-300/8 shadow-[0_0_32px_rgba(16,185,129,0.55)]"
        animate={{
          opacity: visible ? 1 : 0,
          x: position.x - 24,
          y: position.y - 24,
          scale: hovered ? 1.35 : 1,
        }}
        transition={{ type: "spring", stiffness: 260, damping: 26, mass: 0.35 }}
      />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed z-[2147483647] font-mono text-[11px] text-emerald-200"
        animate={{
          opacity: visible ? (hovered ? 1 : 0.45) : 0,
          x: position.x + 14,
          y: position.y + 10,
        }}
        transition={{ type: "spring", stiffness: 240, damping: 28, mass: 0.4 }}
      >
        {hovered ? "run()" : "</>"}
      </motion.div>
    </>
  );
}
