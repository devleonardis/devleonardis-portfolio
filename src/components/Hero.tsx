"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import { MessageCircle } from "lucide-react";

import { Bug } from "@/components/BugHunt";
import { useLanguage } from "@/components/LanguageProvider";
import ScrambleText from "@/components/ScrambleText";
import { orbSignal } from "@/components/three/signals";
import { Button } from "@/components/ui/button";
import { whatsappLink } from "@/lib/site";

const Orb = dynamic(() => import("@/components/three/Orb"), { ssr: false });

const excite = {
  onPointerEnter: () => {
    orbSignal.excite = 1;
  },
  onPointerLeave: () => {
    orbSignal.excite = 0;
  },
};

export default function Hero() {
  const reduced = useReducedMotion();
  const { t } = useLanguage();
  const reveal = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <section id="top" className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-24 pb-16">
      <div className="grid-floor absolute inset-0 -z-20" aria-hidden="true" />

      <motion.div
        aria-hidden="true"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.4 }}
        className="absolute inset-0 -z-10 opacity-45 md:left-auto md:right-[-12%] md:w-[68%] md:opacity-100"
      >
        <Orb />
      </motion.div>

      <div className="mx-auto w-full max-w-6xl px-6 md:px-8">
        <div className="max-w-3xl">
          <p className="font-display text-sm text-steel">
            <ScrambleText text={t.hero.prompt} duration={500} />
          </p>

          <h1 className="wide mt-5 font-display text-[clamp(1.9rem,8vw,7.5rem)] whitespace-nowrap leading-[0.9] font-semibold tracking-[-0.04em] text-limestone">
            <ScrambleText text="DevLeonardis" delay={350} duration={1200} />
            <span className="caret" aria-hidden="true" />
          </h1>

          <motion.p {...reveal(1.2)} className="mt-8 max-w-xl text-lg leading-relaxed text-limestone/80 md:text-xl">
            {t.hero.lead}
          </motion.p>

          <motion.div {...reveal(1.35)} className="mt-10 flex flex-wrap items-center gap-3">
            <Button asChild size="lg" className="bg-phosphor text-ink hover:bg-phosphor/85" {...excite}>
              <a href="#projects">{t.hero.projectsCta}</a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-limestone/20 bg-ink/40 text-limestone backdrop-blur hover:bg-limestone/10"
              {...excite}
            >
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="size-4" />
                {t.hero.whatsappCta}
              </a>
            </Button>
          </motion.div>
        </div>
      </div>

      <motion.a
        href="#build"
        {...reveal(1.8)}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 text-xs text-steel transition-colors hover:text-phosphor"
      >
        <span className="font-display">{t.hero.hint}</span>
        <span className="relative h-10 w-px overflow-hidden bg-limestone/15">
          <motion.span
            className="absolute inset-x-0 top-0 h-4 bg-phosphor"
            animate={reduced ? undefined : { y: [-16, 40] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.a>

      <Bug id="hero" className="right-[8%] bottom-[22%] md:right-[46%] md:bottom-[30%]" />
    </section>
  );
}
