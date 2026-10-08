"use client";

import Lenis from "lenis";
import { useEffect } from "react";

import { registerLenis } from "@/lib/scroll";

export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ autoRaf: true, anchors: { offset: -24 }, lerp: 0.11 });
    registerLenis(lenis);
    if (process.env.NODE_ENV === "development") Object.assign(window, { __lenis: lenis });

    return () => {
      registerLenis(null);
      lenis.destroy();
    };
  }, []);

  return null;
}
