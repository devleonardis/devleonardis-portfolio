"use client";

import { PointerEvent } from "react";

import { useLanguage } from "@/components/LanguageProvider";

const onPointerMove = (event: PointerEvent<HTMLElement>) => {
  const rect = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty("--x", `${event.clientX - rect.left}px`);
  event.currentTarget.style.setProperty("--y", `${event.clientY - rect.top}px`);
};

export default function Services() {
  const { t } = useLanguage();

  return (
    <section id="services" className="relative mx-auto w-full max-w-6xl px-6 py-24 md:px-8 md:py-32">
      <h2 className="wide mb-12 font-display text-4xl font-semibold tracking-tight text-limestone md:text-5xl">
        {t.services.title}
      </h2>

      <ul className="grid gap-px overflow-hidden rounded-2xl border border-limestone/10 bg-limestone/10 md:grid-cols-3">
        {t.services.items.map((service) => (
          <li
            key={service.title}
            onPointerMove={onPointerMove}
            className="group relative isolate bg-ink p-7 md:min-h-72 md:p-8"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(320px circle at var(--x, 50%) var(--y, 50%), rgb(255 181 71 / 0.08), transparent 70%)",
              }}
            />
            <h3 className="font-display text-lg font-semibold text-limestone">{service.title}</h3>
            <p className="mt-4 leading-relaxed text-limestone/70">{service.copy}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
