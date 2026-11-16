"use client";

import { PointerEvent, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ExternalLink, Eye, LoaderCircle, Sparkles } from "lucide-react";

import { Bug } from "@/components/BugHunt";
import { useLanguage } from "@/components/LanguageProvider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import type { Project } from "@/data/projects";
import { projects } from "@/data/projects";

function ProjectPreviewDialog({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);
  const { t, locale } = useLanguage();

  const onOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (nextOpen) {
      setLoaded(false);
      setErrored(false);
    }
  };

  useEffect(() => {
    if (!open || loaded) return;

    const timer = window.setTimeout(() => {
      setErrored(true);
    }, 8000);

    return () => {
      window.clearTimeout(timer);
    };
  }, [loaded, open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="border-limestone/25 bg-surface/50 text-limestone hover:border-phosphor/50 hover:bg-phosphor/10 transition-all text-xs"
        >
          <Eye className="size-3.5 mr-1 text-phosphor" />
          {t.projects.preview}
        </Button>
      </DialogTrigger>

      <DialogContent
        showCloseButton
        className="h-[100dvh] w-[100vw] max-w-none rounded-none border-limestone/15 bg-ink p-0 sm:h-[92vh] sm:w-[94vw] sm:max-w-[94vw] sm:rounded-2xl shadow-2xl"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.985 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.985 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="flex h-full flex-col"
        >
          <DialogHeader className="flex-row items-center justify-between gap-3 border-b border-limestone/10 bg-ink/90 px-4 py-3 sm:px-6 sm:py-4 text-left">
            <div className="space-y-1.5 min-w-0">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-phosphor/15 border border-phosphor/30 px-2 py-0.5 text-[11px] font-mono text-phosphor">
                  {project.badge[locale]}
                </span>
                <span className="text-xs text-steel">
                  • {project.categoryLabel[locale]}
                </span>
              </div>
              <DialogTitle className="wide font-display text-lg sm:text-xl font-semibold text-limestone truncate">
                {project.title}
              </DialogTitle>
              <div className="hidden sm:flex flex-wrap gap-1.5 pt-0.5">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="bg-limestone/10 font-normal text-limestone/80 text-[10px]">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <Button asChild className="bg-phosphor text-ink hover:bg-phosphor/85 shrink-0 text-xs font-semibold">
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                {t.projects.openNewTab}
                <ArrowUpRight className="size-4 ml-1" />
              </a>
            </Button>
          </DialogHeader>

          <div className="relative flex-1 bg-black/60">
            <AnimatePresence>
              {!loaded && !errored && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 bg-ink/90"
                >
                  <LoaderCircle className="size-8 animate-spin text-phosphor" />
                  <p className="text-sm text-limestone/80 font-mono">{t.projects.loading}</p>
                  <Skeleton className="h-6 w-48 bg-surface" />
                </motion.div>
              )}
            </AnimatePresence>

            {errored ? (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 bg-ink p-6 text-center">
                <p className="max-w-sm text-sm text-limestone/80">{t.projects.fallback}</p>
                <Button asChild className="bg-phosphor text-ink hover:bg-phosphor/85">
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    {t.projects.openNewTab}
                    <ExternalLink className="size-4 ml-1" />
                  </a>
                </Button>
              </div>
            ) : null}

            <iframe
              title={`${project.title} preview`}
              src={project.previewUrl}
              className="h-full w-full border-0"
              loading="lazy"
              onLoad={() => setLoaded(true)}
              onError={() => setErrored(true)}
            />
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}

function ProjectRow({ project }: { project: Project }) {
  const { locale, t } = useLanguage();

  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--x", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--y", `${event.clientY - rect.top}px`);
  };

  return (
    <li
      onPointerMove={onPointerMove}
      className="group relative isolate border-t border-limestone/10 last:border-b transition-colors hover:bg-surface/20"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(460px circle at var(--x, 50%) var(--y, 50%), rgb(92 242 176 / 0.08), transparent 65%)",
        }}
      />
      <div className="flex flex-col gap-4 py-8 md:flex-row md:items-center md:gap-8 md:py-10">
        {/* Year */}
        <div className="shrink-0 md:w-14">
          <span className="font-display text-xs font-mono text-steel">{project.year}</span>
        </div>

        {/* Info */}
        <div className="min-w-0 flex-1 space-y-2.5">
          {/* Metadata Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-phosphor/15 border border-phosphor/30 px-2.5 py-0.5 text-[11px] font-mono font-semibold text-phosphor">
              {project.badge[locale]}
            </span>
            <span className="text-xs font-mono text-steel">
              • {project.categoryLabel[locale]}
            </span>
            {project.metric && (
              <span className="rounded-full bg-surface border border-limestone/15 px-2.5 py-0.5 text-[11px] font-mono text-limestone/80">
                ⚡ {project.metric}
              </span>
            )}
          </div>

          <h3 className="wide font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-limestone break-words transition-transform duration-300 ease-out group-hover:translate-x-2">
            {project.title}
          </h3>

          <p className="max-w-2xl text-sm leading-relaxed text-limestone/75">
            {project.description[locale]}
          </p>

          <ul className="flex flex-wrap gap-x-3 gap-y-1.5 text-xs text-steel">
            {project.tags.map((tag) => (
              <li key={tag} className="flex items-center gap-1.5">
                <span className="size-1 rounded-full bg-steel/40" />
                <span>{tag}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA Actions */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0 pt-2 md:pt-0">
          <Button asChild className="bg-phosphor text-ink hover:bg-phosphor/85 text-xs font-semibold shadow-md">
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              {t.projects.live}
              <ArrowUpRight className="size-4 ml-1" />
            </a>
          </Button>
          <ProjectPreviewDialog project={project} />
        </div>
      </div>
    </li>
  );
}

export default function Projects() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<"all" | "platform" | "local">("all");

  const filteredProjects = projects.filter((p) => {
    if (filter === "all") return true;
    return p.type === filter;
  });

  return (
    <section id="projects" className="relative mx-auto w-full max-w-6xl px-6 py-24 md:px-8 md:py-32">
      <div className="mb-8">
        <p className="font-display text-xs tracking-wider text-phosphor uppercase flex items-center gap-2 mb-2">
          <Sparkles className="size-3.5" />
          <span>Lavori Selezionati • Produzione 2026</span>
        </p>
        <h2 className="wide font-display text-4xl font-semibold tracking-tight text-limestone md:text-5xl">
          {t.projects.title}
        </h2>
        <p className="mt-3 max-w-2xl text-sm sm:text-base text-limestone/70 leading-relaxed">
          {t.projects.subtitle}
        </p>

        {/* Filter buttons */}
        <div className="mt-8 flex flex-wrap items-center gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`rounded-full px-4 py-1.5 text-xs font-mono transition-all ${
              filter === "all"
                ? "bg-phosphor text-ink font-bold shadow-md shadow-phosphor/20"
                : "border border-limestone/20 bg-surface/40 text-steel hover:text-limestone"
            }`}
          >
            {t.projects.all} ({projects.length})
          </button>
          <button
            onClick={() => setFilter("platform")}
            className={`rounded-full px-4 py-1.5 text-xs font-mono transition-all ${
              filter === "platform"
                ? "bg-phosphor text-ink font-bold shadow-md shadow-phosphor/20"
                : "border border-limestone/20 bg-surface/40 text-steel hover:text-limestone"
            }`}
          >
            {t.projects.platforms} ({projects.filter((p) => p.type === "platform").length})
          </button>
          <button
            onClick={() => setFilter("local")}
            className={`rounded-full px-4 py-1.5 text-xs font-mono transition-all ${
              filter === "local"
                ? "bg-phosphor text-ink font-bold shadow-md shadow-phosphor/20"
                : "border border-limestone/20 bg-surface/40 text-steel hover:text-limestone"
            }`}
          >
            {t.projects.local} ({projects.filter((p) => p.type === "local").length})
          </button>
        </div>
      </div>

      <ol>
        {filteredProjects.map((project) => (
          <ProjectRow key={project.id} project={project} />
        ))}
      </ol>

      <Bug id="projects" className="right-6 bottom-10 md:right-2" />
    </section>
  );
}
