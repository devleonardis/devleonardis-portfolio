"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

export default function BackgroundFX() {
  const shouldReduceMotion = useReducedMotion();
  const [position, setPosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    if (shouldReduceMotion) return;

    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 100;
      const y = (event.clientY / window.innerHeight) * 100;
      setPosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [shouldReduceMotion]);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="noise-layer absolute inset-0 opacity-25" />

      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 15% 20%, rgba(16, 185, 129, 0.10), transparent 38%), radial-gradient(circle at 85% 78%, rgba(59, 130, 246, 0.10), transparent 42%), radial-gradient(circle at 50% 50%, rgba(8, 12, 20, 0.95), rgba(3, 6, 12, 1))",
          willChange: "transform",
        }}
        animate={
          shouldReduceMotion
            ? undefined
            : {
                backgroundPosition: ["0% 0%", "3% 4%", "0% 0%"],
              }
        }
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {!shouldReduceMotion && (
        <motion.div
          className="spotlight absolute inset-0"
          style={{
            background: `radial-gradient(500px circle at ${position.x}% ${position.y}%, rgba(29, 78, 216, 0.14), transparent 45%)`,
          }}
        />
      )}
    </div>
  );
}
