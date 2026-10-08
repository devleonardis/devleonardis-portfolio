"use client";

import dynamic from "next/dynamic";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { useRef, useState } from "react";

import { Bug } from "@/components/BugHunt";
import { useLanguage } from "@/components/LanguageProvider";
import { cn } from "@/lib/utils";

const VoxelScene = dynamic(() => import("@/components/three/VoxelScene"), { ssr: false });

export default function BuildSequence() {
  const { t } = useLanguage();
  const section = useRef<HTMLElement>(null);
  const progress = useRef(0);
  const [step, setStep] = useState(0);

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const rail = useSpring(scrollYProgress, { stiffness: 200, damping: 40 });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    progress.current = value;
    const next = value < 0.25 ? 0 : value < 0.65 ? 1 : 2;
    setStep((current) => (current === next ? current : next));
  });

  const active = t.build.steps[step];

  return (
    <section id="build" ref={section} className="relative h-[340vh]" aria-label={t.build.title}>
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div className="absolute inset-0">
          <VoxelScene progress={progress} />
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,var(--ink)_0%,transparent_22%,transparent_62%,var(--ink)_100%)] opacity-80"
        />

        <div className="pointer-events-none relative mx-auto flex h-full w-full max-w-6xl flex-col justify-between px-6 pt-28 pb-10 md:px-8">
          <h2 className="max-w-md font-display text-2xl leading-tight text-limestone md:text-3xl">{t.build.title}</h2>

          <div className="grid items-end gap-8 md:grid-cols-[1fr_auto]">
            <div className="max-w-sm">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
                  transition={{ duration: 0.35 }}
                >
                  <p className="wide font-display text-4xl font-semibold text-phosphor md:text-5xl">{active.title}</p>
                  <p className="mt-3 text-base leading-relaxed text-limestone/80">{active.copy}</p>
                </motion.div>
              </AnimatePresence>
              <p className="mt-6 text-xs text-steel">
                <span className="hidden [@media(pointer:fine)]:inline">{t.build.hintPointer}</span>
                <span className="[@media(pointer:fine)]:hidden">{t.build.hintTouch}</span>
              </p>
            </div>

            <ol className="flex gap-6 md:flex-col md:gap-3 md:text-right">
              {t.build.steps.map((item, index) => (
                <li
                  key={item.title}
                  className={cn(
                    "font-display text-xs transition-colors duration-300",
                    index === step ? "text-limestone" : "text-steel/60",
                  )}
                >
                  <span className={index === step ? "text-phosphor" : undefined}>0{index + 1}</span> {item.title}
                </li>
              ))}
              <li aria-hidden="true" className="hidden h-24 w-px self-end overflow-hidden bg-limestone/10 md:block">
                <motion.span className="block h-full w-full origin-top bg-phosphor" style={{ scaleY: rail }} />
              </li>
            </ol>
          </div>
        </div>

        <Bug id="build" className="pointer-events-auto top-[38%] left-[6%]" />
      </div>
    </section>
  );
}

