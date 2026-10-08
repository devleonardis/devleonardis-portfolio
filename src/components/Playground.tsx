"use client";

import { AnimatePresence, motion } from "framer-motion";
import { KeyboardEvent, useCallback, useEffect, useRef, useState } from "react";

import { Bug } from "@/components/BugHunt";
import { useLanguage } from "@/components/LanguageProvider";
import type { StackGame } from "@/components/three/stackGame";
import { useInView } from "@/components/three/useInView";
import { Button } from "@/components/ui/button";

const BEST_KEY = "devleonardis:stack-best";

type Commit = { id: number; hash: string; message: string; perfect: boolean };

const randomHash = () => Math.floor(Math.random() * 0xfffffff).toString(16).padStart(7, "0");

function readBest() {
  try {
    return Number(window.localStorage.getItem(BEST_KEY)) || 0;
  } catch {
    return 0;
  }
}

function writeBest(value: number) {
  try {
    window.localStorage.setItem(BEST_KEY, String(value));
  } catch {
    // Storage can be unavailable (private mode): the record just won't persist.
  }
}

export default function Playground() {
  const { t } = useLanguage();
  const stage = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const game = useRef<StackGame | null>(null);
  const inView = useInView(stage, "0px");
  const copyRef = useRef(t.play);
  const bestRef = useRef(0);

  const [status, setStatus] = useState<"idle" | "playing" | "over">("idle");
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [newBest, setNewBest] = useState(false);
  const [log, setLog] = useState<Commit[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    copyRef.current = t.play;
  }, [t.play]);

  useEffect(() => {
    const element = canvas.current;
    if (!element) return;
    let disposed = false;
    let observer: ResizeObserver | null = null;
    import("@/components/three/stackGame").then(({ StackGame }) => {
      if (disposed) return;
      bestRef.current = readBest();
      setBest(bestRef.current);
      const instance = new StackGame(element, {
        onPlace: ({ score: next, perfect }) => {
          setScore(next);
          const copy = copyRef.current;
          setLog((current) =>
            [
              {
                id: next,
                hash: randomHash(),
                message: perfect ? copy.perfect : copy.trimmed,
                perfect,
              },
              ...current,
            ].slice(0, 5),
          );
        },
        onOver: (final) => {
          setStatus("over");
          if (final > bestRef.current) {
            bestRef.current = final;
            writeBest(final);
            setBest(final);
            setNewBest(true);
          }
        },
      });
      game.current = instance;
      observer = new ResizeObserver(() => instance.resize());
      observer.observe(element.parentElement ?? element);
      setReady(true);
    });

    return () => {
      disposed = true;
      observer?.disconnect();
      game.current?.dispose();
      game.current = null;
    };
  }, []);

  useEffect(() => {
    game.current?.setActive(inView);
  }, [inView, ready]);

  const start = useCallback(() => {
    if (!game.current) return;
    game.current.start();
    setScore(0);
    setLog([]);
    setNewBest(false);
    setStatus("playing");
    stage.current?.focus({ preventScroll: true });
  }, []);

  const act = useCallback(() => {
    if (status === "playing") game.current?.place();
    else start();
  }, [start, status]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return;
    if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
      act();
    }
  };

  return (
    <section id="play" className="relative mx-auto w-full max-w-6xl px-6 py-24 md:px-8 md:py-32">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-center">
        <div className="relative">
          <h2 className="wide font-display text-4xl font-semibold tracking-tight text-limestone md:text-5xl">
            {t.play.title}
          </h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-limestone/75">{t.play.copy}</p>
          <p className="mt-3 text-sm text-steel">{t.play.controls}</p>

          <dl className="mt-10 flex gap-10">
            <div>
              <dt className="text-sm text-steel">{t.play.score}</dt>
              <dd className="wide font-display text-6xl font-semibold text-sodium tabular-nums">{score}</dd>
            </div>
            <div>
              <dt className="text-sm text-steel">{t.play.best}</dt>
              <dd className="wide font-display text-6xl font-semibold text-limestone/40 tabular-nums">{best}</dd>
            </div>
          </dl>

          <ol className="mt-8 space-y-1.5 lg:min-h-[8.5rem] font-display text-xs" aria-live="polite">
            <AnimatePresence initial={false}>
              {log.map((commit, index) => (
                <motion.li
                  key={commit.id}
                  layout
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1 - index * 0.18, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex gap-3 whitespace-nowrap"
                >
                  <span className="text-sodium/80">{commit.hash}</span>
                  <span className={commit.perfect ? "text-phosphor" : "text-steel"}>{commit.message}</span>
                </motion.li>
              ))}
            </AnimatePresence>
          </ol>

          <Bug id="play" className="-top-10 right-4" />
        </div>

        <div
          ref={stage}
          role="application"
          aria-label={`${t.play.title}. ${t.play.controls}`}
          tabIndex={0}
          onKeyDown={onKeyDown}
          onPointerDown={() => {
            if (status === "playing") game.current?.place();
          }}
          className="relative h-[68svh] max-h-[640px] min-h-[420px] touch-manipulation overflow-hidden rounded-2xl border border-limestone/10 bg-surface/50 select-none"
        >
          <div className="grid-floor pointer-events-none absolute inset-0" aria-hidden="true" />
          <canvas ref={canvas} className="relative block h-full w-full" />

          <AnimatePresence>
            {status !== "playing" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-3 bg-gradient-to-t from-ink/90 to-transparent px-6 pt-20 pb-8 text-center"
              >
                {status === "over" && (
                  <p className="font-display text-sm text-limestone">
                    {t.play.failed} {score}
                    {newBest && <span className="block pt-1 text-sodium">{t.play.newBest}</span>}
                  </p>
                )}
                <Button
                  size="lg"
                  disabled={!ready}
                  onPointerDown={(event) => event.stopPropagation()}
                  onClick={start}
                  className="bg-phosphor text-ink hover:bg-phosphor/85"
                >
                  {status === "over" ? t.play.retry : t.play.start}
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
