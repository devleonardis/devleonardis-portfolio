"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ExternalLink, LoaderCircle } from "lucide-react";

import { useLanguage } from "@/components/LanguageProvider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
        <Button variant="outline" className="border-white/15 bg-transparent text-zinc-200 hover:bg-white/10">
          {t.projects.preview}
        </Button>
      </DialogTrigger>

      <DialogContent
        showCloseButton
        className="h-[100vh] w-[100vw] max-w-none rounded-none border-white/10 bg-zinc-950 p-0 sm:h-[90vh] sm:w-[90vw] sm:max-w-[90vw] sm:rounded-2xl"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.985 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.985 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="flex h-full flex-col"
        >
          <DialogHeader className="flex-row items-center justify-between gap-4 border-b border-white/10 px-6 py-5 text-left">
            <div className="space-y-2">
              <DialogTitle className="font-display text-2xl text-zinc-100">{project.title}</DialogTitle>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="bg-white/10 text-zinc-200">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <Button asChild className="bg-emerald-400 text-zinc-950 hover:bg-emerald-300">
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
                  className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 bg-zinc-950/80"
                >
                  <LoaderCircle className="size-8 animate-spin text-emerald-300" />
                  <p className="text-sm text-zinc-300">{t.projects.loading}</p>
                  <Skeleton className="h-8 w-40 bg-zinc-800" />
                </motion.div>
              )}
            </AnimatePresence>

            {errored ? (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 bg-zinc-950 p-6 text-center">
                <p className="max-w-sm text-sm text-zinc-300">{t.projects.fallback}</p>
                <Button asChild className="bg-emerald-400 text-zinc-950 hover:bg-emerald-300">
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

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const shouldReduceMotion = useReducedMotion();
  const { locale, t } = useLanguage();

  return (
    <motion.article
      initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      whileHover={shouldReduceMotion ? {} : { y: -4 }}
    >
      <Card className="h-full border-white/10 bg-white/[0.03] py-0 backdrop-blur transition-colors hover:border-emerald-300/40">
        <CardHeader className="space-y-4 px-5 pt-5">
          <div className="flex items-center justify-between">
            <CardTitle className="font-display text-xl text-zinc-100">{project.title}</CardTitle>
            <span className="text-xs text-zinc-400">{project.year}</span>
          </div>
          <CardDescription className="line-clamp-1 text-zinc-300">{project.description[locale]}</CardDescription>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="border-white/15 text-zinc-300">
                {tag}
              </Badge>
            ))}
          </div>
        </CardHeader>

        <CardContent className="px-5" />

        <CardFooter className="flex items-center gap-3 px-5 pb-5">
          <Button asChild className="bg-emerald-400 text-zinc-950 hover:bg-emerald-300">
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              {t.projects.live}
              <ArrowUpRight className="size-4" />
            </a>
          </Button>
          <ProjectPreviewDialog project={project} />
        </CardFooter>
      </Card>
    </motion.article>
  );
}

export default function Projects() {
  const [tab, setTab] = useState("featured");
  const { t } = useLanguage();

  const featuredProjects = useMemo(() => projects.filter((project) => project.featured), []);
  const list = tab === "featured" ? featuredProjects : projects;

  return (
    <section id="projects" className="mx-auto w-full max-w-6xl px-6 py-20 md:px-8 md:py-24">
      <div className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-emerald-300/90">{t.projects.section}</p>
          <h2 className="mt-3 font-display text-3xl tracking-tight text-zinc-50 md:text-4xl">
            {t.projects.title}
          </h2>
        </div>

        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="border border-white/10 bg-white/[0.03]">
            <TabsTrigger value="featured">{t.projects.featured}</TabsTrigger>
            <TabsTrigger value="all">{t.projects.all}</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {list.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
