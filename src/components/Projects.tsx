"use client";

import { PointerEvent, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ExternalLink, LoaderCircle } from "lucide-react";

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
  const { t } = useLanguage();

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
        <Button variant="outline" className="border-limestone/20 bg-transparent text-limestone hover:bg-limestone/10">
          {t.projects.preview}
        </Button>
      </DialogTrigger>

      <DialogContent
        showCloseButton
        className="h-[100vh] w-[100vw] max-w-none rounded-none border-limestone/10 bg-ink p-0 sm:h-[90vh] sm:w-[90vw] sm:max-w-[90vw] sm:rounded-2xl"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.985 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.985 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="flex h-full flex-col"
        >
          <DialogHeader className="flex-row items-center justify-between gap-4 border-b border-limestone/10 px-6 py-5 text-left">
            <div className="space-y-2">
              <DialogTitle className="wide font-display text-xl font-semibold text-limestone">{project.title}</DialogTitle>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="bg-limestone/10 font-normal text-limestone/80">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <Button asChild className="bg-phosphor text-ink hover:bg-phosphor/85">
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                {t.projects.openNewTab}
                <ArrowUpRight className="size-4" />
              </a>
            </Button>
          </DialogHeader>

          <div className="relative flex-1 bg-black/40">
            <AnimatePresence>
              {!loaded && !errored && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 bg-ink/80"
                >
                  <LoaderCircle className="size-8 animate-spin text-phosphor" />
                  <p className="text-sm text-limestone/80">{t.projects.loading}</p>
                  <Skeleton className="h-8 w-40 bg-surface" />
                </motion.div>
              )}
            </AnimatePresence>

            {errored ? (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 bg-ink p-6 text-center">
                <p className="max-w-sm text-sm text-limestone/80">{t.projects.fallback}</p>
                <Button asChild className="bg-phosphor text-ink hover:bg-phosphor/85">
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    {t.projects.openNewTab}
                    <ExternalLink className="size-4" />
                  </a>
                </Button>
              </div>
            ) : null}

            <iframe
              title={`${project.title} preview`}
              src={project.previewUrl}
              className="h-full w-full"
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
      className="group relative isolate border-t border-limestone/10 last:border-b"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(420px circle at var(--x, 50%) var(--y, 50%), rgb(92 242 176 / 0.09), transparent 65%)",
        }}
      />
      <div className="grid gap-5 py-8 md:grid-cols-[4rem_minmax(0,1fr)_auto] md:items-center md:gap-8 md:py-10">
        <span className="font-display text-xs text-steel">{project.year}</span>

        <div className="min-w-0">
          <h3 className="wide font-display text-2xl font-semibold tracking-tight text-limestone transition-transform duration-300 ease-out group-hover:translate-x-2 md:text-4xl">
            {project.title}
          </h3>
          <p className="mt-3 max-w-xl text-limestone/70">{project.description[locale]}</p>
          <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-steel">
            {project.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-3">
          <Button asChild className="bg-phosphor text-ink hover:bg-phosphor/85">
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              {t.projects.live}
              <ArrowUpRight className="size-4" />
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

  return (
    <section id="projects" className="relative mx-auto w-full max-w-6xl px-6 py-24 md:px-8 md:py-32">
      <h2 className="wide mb-12 font-display text-4xl font-semibold tracking-tight text-limestone md:text-5xl">
        {t.projects.title}
      </h2>

      <ol>
        {projects.map((project) => (
          <ProjectRow key={project.id} project={project} />
        ))}
      </ol>

      <Bug id="projects" className="right-6 bottom-10 md:right-2" />
    </section>
  );
}
