"use client";

import { motion, useReducedMotion } from "framer-motion";

import { useLanguage } from "@/components/LanguageProvider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Services() {
  const shouldReduceMotion = useReducedMotion();
  const { t } = useLanguage();

  return (
    <section id="services" className="mx-auto w-full max-w-6xl px-6 py-20 md:px-8 md:py-24">
      <div className="mb-10">
        <p className="text-sm uppercase tracking-[0.2em] text-emerald-300/90">{t.services.section}</p>
        <h2 className="mt-3 font-display text-3xl tracking-tight text-zinc-50 md:text-4xl">{t.services.title}</h2>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {t.services.items.map((service, index) => (
          <motion.div
            key={service.title}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.35, delay: index * 0.08 }}
            whileHover={shouldReduceMotion ? {} : { y: -3 }}
          >
            <Card className="h-full border-white/10 bg-white/[0.03] py-0 transition-colors hover:border-emerald-300/40">
              <CardHeader className="px-5 pt-6 pb-3">
                <CardTitle className="font-display text-2xl text-zinc-100">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="px-5 pb-6 text-zinc-300">{service.copy}</CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
