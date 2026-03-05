"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MessageCircle } from "lucide-react";

import { useLanguage } from "@/components/LanguageProvider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { whatsappLink } from "@/lib/site";

const pills = ["Frontend", "Backend", "UI Motion"];
export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const { t } = useLanguage();

  return (
    <section id="top" className="mx-auto w-full max-w-6xl px-6 pb-20 pt-20 md:px-8 md:pt-28">
      <div className="grid items-center gap-12 lg:grid-cols-[1fr_380px]">
        <div className="max-w-3xl space-y-8">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-sm uppercase tracking-[0.2em] text-emerald-300/90"
          >
            Simone De Leonardis
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-display text-5xl leading-none tracking-tight text-zinc-50 md:text-7xl"
          >
            <span className={shouldReduceMotion ? "" : "micro-glitch"}>DevLeonardis</span>
            <span className="highlight-sweep ml-2 inline-block align-middle text-emerald-300">•</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.15 }}
            className="max-w-xl text-lg text-zinc-300"
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex flex-wrap items-center gap-3"
          >
            <Button asChild className="bg-emerald-400 text-zinc-950 hover:bg-emerald-300">
              <a href="#projects">{t.hero.projectsCta}</a>
            </Button>
            <Button asChild variant="outline" className="border-white/20 bg-transparent text-zinc-200 hover:bg-white/10">
              <a href="#contact">{t.hero.contactCta}</a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-emerald-300/40 bg-emerald-400/10 text-emerald-200 hover:bg-emerald-400/20"
            >
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="size-4" />
                {t.hero.whatsappCta}
              </a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex flex-wrap gap-3"
          >
            {pills.map((pill) => (
              <Badge key={pill} className="border border-white/15 bg-white/5 px-3 py-1 text-zinc-200">
                {pill}
              </Badge>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative mx-auto hidden w-full max-w-[340px] md:block"
        >
          <div className="relative overflow-hidden rounded-[999px] border border-emerald-300/25 bg-zinc-950/70 p-2 shadow-[0_0_55px_rgba(16,185,129,0.16)]">
            <div className="relative aspect-square overflow-hidden rounded-full">
              <Image
                src="/profile-photo.jpeg"
                alt="Simone De Leonardis"
                fill
                priority
                sizes="(max-width: 767px) 0px, (max-width: 1280px) 340px, 380px"
                className="object-cover object-center"
              />

              <AnimatePresence>
                {!shouldReduceMotion && (
                  <motion.div
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.55, delay: 1.35 }}
                    className="pointer-events-none absolute inset-0 z-20 overflow-hidden rounded-full"
                  >
                    <div className="photo-glitch-layer photo-glitch-r" />
                    <div className="photo-glitch-layer photo-glitch-b" />
                    <div className="photo-glitch-noise" />
                    <div className="photo-scanlines" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
