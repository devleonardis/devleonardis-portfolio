"use client";

import { ArrowUpRight, Check } from "lucide-react";
import Link from "next/link";
import { PointerEvent } from "react";

import { useLanguage } from "@/components/LanguageProvider";
import { Button } from "@/components/ui/button";

const onPointerMove = (event: PointerEvent<HTMLElement>) => {
  const rect = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty("--x", `${event.clientX - rect.left}px`);
  event.currentTarget.style.setProperty("--y", `${event.clientY - rect.top}px`);
};

export default function Offer() {
  const { t } = useLanguage();
  const offer = t.offer;

  return (
    <section id="offerta" className="relative mx-auto w-full max-w-6xl scroll-mt-24 px-6 py-24 md:px-8 md:py-32">
      <p className="font-display text-xs tracking-wide text-phosphor uppercase">{offer.eyebrow}</p>
      <div className="mt-3 grid gap-6 md:grid-cols-[1.4fr_1fr] md:items-end">
        <h2 className="wide font-display text-4xl font-semibold tracking-tight text-limestone md:text-5xl">
          {offer.title}
        </h2>
        <p className="leading-relaxed text-limestone/70">{offer.lead}</p>
      </div>

      <div className="mt-10 inline-flex flex-wrap items-baseline gap-x-2 rounded-full border border-phosphor/30 bg-phosphor/5 px-4 py-2 text-sm">
        <span className="font-display font-semibold text-phosphor">{offer.delivery}</span>
        <span className="text-limestone/60">{offer.deliveryNote}</span>
      </div>

      <ul className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-limestone/10 bg-limestone/10 md:grid-cols-2">
        {offer.plans.map((plan) => (
          <li
            key={plan.name}
            onPointerMove={onPointerMove}
            className="group relative isolate flex flex-col bg-ink p-7 md:p-8"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(320px circle at var(--x, 50%) var(--y, 50%), rgb(255 181 71 / 0.08), transparent 70%)",
              }}
            />
            <h3 className="font-display text-lg font-semibold text-limestone">{plan.name}</h3>
            <p className="mt-5 flex items-baseline gap-1">
              <span className="font-display text-4xl font-semibold text-limestone tabular-nums">{plan.yearly}</span>
              <span className="text-limestone/60">{offer.yearly}</span>
            </p>
            <p className="mt-1 text-sm text-steel">
              + {plan.setup} {offer.setup}
            </p>
            <ul className="mt-6 space-y-3 text-limestone/75">
              {plan.features.map((feature) => (
                <li key={feature} className="flex gap-3">
                  <Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-phosphor" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      <h3 className="mt-14 font-display text-sm font-semibold text-limestone">{offer.sectorsTitle}</h3>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {offer.sectors.map((sector) => (
          <li key={sector.href}>
            <a
              href={sector.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full items-center justify-between gap-3 rounded-xl border border-limestone/10 px-4 py-3 text-sm text-limestone/80 transition-colors hover:border-phosphor/40 hover:text-limestone"
            >
              <span>{sector.name}</span>
              <ArrowUpRight
                aria-hidden="true"
                className="size-4 shrink-0 text-steel transition-colors group-hover:text-phosphor"
              />
            </a>
          </li>
        ))}
      </ul>

      <div className="mt-12 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <Button asChild size="lg" className="bg-phosphor text-ink hover:bg-phosphor/90">
          <a href={offer.ctaHref}>
            {offer.cta}
            <ArrowUpRight className="size-4" />
          </a>
        </Button>
        <p className="max-w-md text-xs leading-relaxed text-steel">
          {offer.note}{" "}
          <Link href="/condizioni" className="text-limestone/70 underline underline-offset-4 hover:text-limestone">
            {offer.terms}
          </Link>
        </p>
      </div>
    </section>
  );
}
