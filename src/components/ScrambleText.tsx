"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

const GLYPHS = "!<>-_\\/[]{}=+*^?#01$%&";

type ScrambleTextProps = {
  text: string;
  delay?: number;
  duration?: number;
  className?: string;
};

/** Renders the final text on the server, then decodes it from noise once mounted. */
export default function ScrambleText({ text, delay = 0, duration = 1100, className }: ScrambleTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const element = ref.current;
    if (!element || reduced) return;

    let frame = 0;
    let start = 0;

    const tick = (now: number) => {
      if (!start) start = now + delay;
      const progress = Math.max(0, Math.min(1, (now - start) / duration));
      const resolved = Math.floor(progress * text.length);
      let output = "";
      for (let i = 0; i < text.length; i += 1) {
        if (i < resolved || text[i] === " ") output += text[i];
        else output += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }
      element.textContent = output;
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      element.textContent = text;
    };
  }, [delay, duration, reduced, text]);

  return (
    <span aria-label={text} className={cn("whitespace-nowrap", className)}>
      <span ref={ref} aria-hidden="true">
        {text}
      </span>
    </span>
  );
}
