"use client";

import Image from "next/image";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { PointerEvent, useEffect, useState } from "react";

import { useLanguage } from "@/components/LanguageProvider";

const stack = ["Next.js", "React", "TypeScript", "Tailwind CSS", "three.js", "Astro", "Node.js", "Vercel", "Cloudflare"];

function useRomeTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const format = new Intl.DateTimeFormat("it-IT", {
      timeZone: "Europe/Rome",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    const tick = () => setTime(format.format(new Date()));
    const first = window.setTimeout(tick, 0);
    const interval = window.setInterval(tick, 1000);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(interval);
    };
  }, []);

  return time ?? "--:--:--";
}

function TiltPhoto() {
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { stiffness: 220, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), { stiffness: 220, damping: 20 });

  const onMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reduced) return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left) / rect.width - 0.5);
    y.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <div className="mx-auto w-full max-w-[300px] [perspective:900px] md:max-w-none" onPointerMove={onMove} onPointerLeave={() => (x.set(0), y.set(0))}>
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="group relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-limestone/10 bg-surface"
      >
        <Image
          src="/profile-photo.jpeg"
          alt="Simone De Leonardis"
          fill
          sizes="(max-width: 768px) 90vw, 380px"
          className="object-cover object-center grayscale-[35%] transition duration-500 group-hover:grayscale-0"
        />
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100 motion-reduce:hidden">
          <div className="photo-glitch-layer photo-glitch-r" />
          <div className="photo-glitch-layer photo-glitch-b" />
          <div className="photo-scanlines" />
        </div>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 to-transparent p-5 [transform:translateZ(40px)]">
          <p className="font-display text-sm text-limestone">Simone De Leonardis</p>
        </div>
      </motion.div>
    </div>
  );
}

export default function About() {
  const { t } = useLanguage();
  const reduced = useReducedMotion();
  const time = useRomeTime();

  const lines: Array<{ prompt?: string; output?: string; live?: boolean; stack?: boolean }> = [
    { prompt: "cat chi-sono.md" },
    ...t.about.points.map((point) => ({ output: point })),
    { prompt: "date" },
    { output: `${t.about.location}, ${t.about.localTime} ${time}`, live: true },
    { prompt: "cat stack.txt" },
    { output: stack.join("  "), stack: true },
  ];

  return (
    <section id="about" className="relative mx-auto w-full max-w-6xl px-6 py-24 md:px-8 md:py-32">
      <h2 className="wide mb-12 font-display text-4xl font-semibold tracking-tight text-limestone md:text-5xl">
        {t.about.title}
      </h2>

      <div className="grid gap-10 md:grid-cols-[minmax(0,340px)_minmax(0,1fr)] md:items-start">
        <TiltPhoto />

        <div className="overflow-hidden rounded-2xl border border-limestone/10 bg-surface/70 backdrop-blur">
          <div className="flex items-center gap-2 border-b border-limestone/10 px-4 py-3" aria-hidden="true">
            <span className="size-2.5 rounded-full bg-[#ff6b5b]/80" />
            <span className="size-2.5 rounded-full bg-sodium/80" />
            <span className="size-2.5 rounded-full bg-phosphor/80" />
            <span className="ml-3 font-display text-xs text-steel">simone@bari: ~</span>
          </div>

          <motion.ol
            className="space-y-2.5 p-5 font-display text-[13px] leading-relaxed md:p-7 md:text-sm"
            initial={reduced ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
          >
            {lines.map((line, index) => (
              <motion.li
                key={index}
                variants={{ hidden: { opacity: 0, x: -8 }, visible: { opacity: 1, x: 0 } }}
                className={line.prompt ? "pt-2 text-limestone first:pt-0" : "text-limestone/70"}
              >
                {line.prompt ? (
                  <>
                    <span className="text-phosphor">$</span> {line.prompt}
                  </>
                ) : line.stack ? (
                  <span className="text-sodium/90">{line.output}</span>
                ) : (
                  <span className={line.live ? "tabular-nums" : undefined}>{line.output}</span>
                )}
              </motion.li>
            ))}
            <motion.li variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} className="pt-2 text-limestone">
              <span className="text-phosphor">$</span>
              <span className="caret" aria-hidden="true" />
            </motion.li>
          </motion.ol>
        </div>
      </div>
    </section>
  );
}
