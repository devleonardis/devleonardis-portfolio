"use client";

import { motion, useReducedMotion } from "framer-motion";

import { useLanguage } from "@/components/LanguageProvider";

export default function About() {
  const shouldReduceMotion = useReducedMotion();
  const { t } = useLanguage();

  return (
    <section id="about" className="mx-auto w-full max-w-6xl px-6 py-20 md:px-8 md:py-24">
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
        whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.35 }}
        className="grid gap-8 rounded-2xl border border-white/10 bg-white/[0.03] p-8 md:grid-cols-2"
      >
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-emerald-300/90">{t.about.section}</p>
          <h2 className="mt-3 font-display text-3xl tracking-tight text-zinc-50">{t.about.title}</h2>
        </div>

        <div className="space-y-4 text-zinc-300">
          <ul className="space-y-3">
            {t.about.points.map((point) => (
              <li key={point} className="flex gap-3">
                <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-emerald-300" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
          <p className="pt-2 text-sm text-zinc-400">{t.about.location}</p>
        </div>
      </motion.div>
    </section>
  );
}
