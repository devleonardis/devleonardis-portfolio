"use client";

import { AnimatePresence, motion } from "framer-motion";
import { createContext, ReactNode, useCallback, useContext, useMemo, useRef, useState } from "react";

import { useLanguage } from "@/components/LanguageProvider";
import { cn } from "@/lib/utils";

export const BUG_IDS = ["hero", "build", "projects", "play", "contact"] as const;
export type BugId = (typeof BUG_IDS)[number];

type Toast = { id: number; message: string; tone: "phosphor" | "sodium" };

type BugHuntValue = {
  found: ReadonlySet<BugId>;
  total: number;
  catchBug: (id: BugId) => void;
  notify: (message: string, tone?: Toast["tone"]) => void;
};

const BugHuntContext = createContext<BugHuntValue | null>(null);

export function BugHuntProvider({ children }: { children: ReactNode }) {
  const { t } = useLanguage();
  const [found, setFound] = useState<ReadonlySet<BugId>>(new Set());
  const [toasts, setToasts] = useState<Toast[]>([]);
  const nextId = useRef(0);

  const notify = useCallback((message: string, tone: Toast["tone"] = "phosphor") => {
    const id = nextId.current++;
    setToasts((current) => [...current.slice(-2), { id, message, tone }]);
    window.setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id));
    }, 3200);
  }, []);

  const catchBug = useCallback(
    (id: BugId) => {
      if (found.has(id)) return;
      const next = new Set(found);
      next.add(id);
      setFound(next);
      notify(
        next.size === BUG_IDS.length ? t.bugs.done : `${t.bugs.found} ${next.size}/${BUG_IDS.length}`,
        next.size === BUG_IDS.length ? "phosphor" : "sodium",
      );
    },
    [found, notify, t.bugs.done, t.bugs.found],
  );

  const value = useMemo(
    () => ({ found, total: BUG_IDS.length, catchBug, notify }),
    [catchBug, found, notify],
  );

  return (
    <BugHuntContext.Provider value={value}>
      {children}
      <div
        aria-live="polite"
        className="pointer-events-none fixed bottom-5 left-5 z-[60] flex flex-col items-start gap-2"
      >
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.p
              key={toast.id}
              layout
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ type: "spring", stiffness: 420, damping: 32 }}
              className={cn(
                "rounded-md border bg-ink/90 px-3 py-2 font-display text-xs backdrop-blur",
                toast.tone === "sodium" ? "border-sodium/40 text-sodium" : "border-phosphor/40 text-phosphor",
              )}
            >
              {toast.message}
            </motion.p>
          ))}
        </AnimatePresence>
      </div>
    </BugHuntContext.Provider>
  );
}

export function useBugHunt() {
  const context = useContext(BugHuntContext);
  if (!context) throw new Error("useBugHunt must be used inside BugHuntProvider");
  return context;
}

export function Bug({ id, className }: { id: BugId; className?: string }) {
  const { found, catchBug } = useBugHunt();
  const { t } = useLanguage();
  const caught = found.has(id);

  return (
    <AnimatePresence>
      {!caught && (
        <motion.button
          type="button"
          aria-label={t.bugs.label}
          onClick={() => catchBug(id)}
          exit={{ scale: [1, 1.6, 0], rotate: 90, opacity: 0 }}
          transition={{ duration: 0.35 }}
          whileHover={{ scale: 1.25 }}
          className={cn(
            "absolute z-20 grid size-8 place-items-center rounded-full text-sodium/70 transition-colors hover:text-sodium",
            className,
          )}
        >
          <svg
            viewBox="0 0 24 24"
            className="size-4 animate-[bug-wiggle_1.6s_ease-in-out_infinite] motion-reduce:animate-none"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <ellipse cx="12" cy="13.5" rx="4.2" ry="5.5" fill="currentColor" fillOpacity="0.25" />
            <path d="M12 8V19M9.5 6.5 8 4.5M14.5 6.5 16 4.5M7.8 11H4.5M7.8 15H5M16.2 11h3.3M16.2 15H19M8.5 18.5l-2 2M15.5 18.5l2 2" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
