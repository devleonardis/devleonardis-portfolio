"use client";

import { RefObject, useEffect, useState } from "react";

/** Tracks whether an element is near the viewport, so canvases can stop rendering when off screen. */
export function useInView(ref: RefObject<Element | null>, rootMargin = "120px") {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin });
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, rootMargin]);

  return inView;
}
