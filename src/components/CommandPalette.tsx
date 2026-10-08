"use client";

import { Dialog as DialogPrimitive } from "radix-ui";
import {
  ArrowUp,
  Bug as BugIcon,
  Copy,
  Gamepad2,
  Languages,
  Linkedin,
  Mail,
  MessageCircle,
  Search,
  Terminal,
  type LucideIcon,
} from "lucide-react";
import { KeyboardEvent, useEffect, useMemo, useRef, useState } from "react";

import { useBugHunt } from "@/components/BugHunt";
import { useLanguage } from "@/components/LanguageProvider";
import { scrollToTarget } from "@/lib/scroll";
import { siteConfig, whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";

export const PALETTE_EVENT = "devleonardis:palette";

type Command = {
  id: string;
  group: "navigate" | "actions" | "secrets";
  label: string;
  keywords: string;
  icon: LucideIcon;
  run: () => void;
};

export default function CommandPalette() {
  const { locale, setLocale, t } = useLanguage();
  const { notify, found, total } = useBugHunt();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const list = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const onKey = (event: globalThis.KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((value) => !value);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener(PALETTE_EVENT, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(PALETTE_EVENT, onOpen);
    };
  }, []);

  const commands = useMemo<Command[]>(() => {
    const go = (target: string) => () => scrollToTarget(target);
    return [
      { id: "projects", group: "navigate", label: t.nav.projects, keywords: "projects progetti work lavori", icon: Terminal, run: go("#projects") },
      { id: "play", group: "navigate", label: `${t.nav.play}: ${t.play.title}`, keywords: "game gioco play stack 3d", icon: Gamepad2, run: go("#play") },
      { id: "about", group: "navigate", label: t.nav.about, keywords: "about chi sono simone", icon: Terminal, run: go("#about") },
      { id: "services", group: "navigate", label: t.nav.services, keywords: "services servizi", icon: Terminal, run: go("#services") },
      { id: "contact", group: "navigate", label: t.nav.contact, keywords: "contact contatti form", icon: Mail, run: go("#contact") },
      { id: "top", group: "navigate", label: t.palette.top, keywords: "top home inizio", icon: ArrowUp, run: () => scrollToTarget(0) },
      {
        id: "email",
        group: "actions",
        label: t.palette.copyEmail,
        keywords: "email mail copy copia",
        icon: Copy,
        run: () => {
          navigator.clipboard?.writeText(siteConfig.email).then(
            () => notify(t.palette.copied),
            () => notify(siteConfig.email),
          );
        },
      },
      {
        id: "lang",
        group: "actions",
        label: t.palette.toggleLang,
        keywords: "language lingua english italiano",
        icon: Languages,
        run: () => setLocale(locale === "it" ? "en" : "it"),
      },
      { id: "whatsapp", group: "actions", label: t.palette.openWhatsapp, keywords: "whatsapp chat", icon: MessageCircle, run: () => window.open(whatsappLink, "_blank", "noopener,noreferrer") },
      { id: "linkedin", group: "actions", label: t.palette.openLinkedin, keywords: "linkedin social", icon: Linkedin, run: () => window.open(siteConfig.linkedin, "_blank", "noopener,noreferrer") },
      {
        id: "bugs",
        group: "secrets",
        label: `${t.nav.bugs}: ${found.size}/${total}`,
        keywords: "bug hunt caccia",
        icon: BugIcon,
        run: () => notify(t.bugs.hint, "sodium"),
      },
      {
        id: "snake",
        group: "secrets",
        label: t.palette.snake,
        keywords: "snake game gioco nardi",
        icon: Gamepad2,
        run: () => window.dispatchEvent(new CustomEvent("devleonardis:snake")),
      },
      {
        id: "hire",
        group: "secrets",
        label: t.palette.hire,
        keywords: "sudo hire assumi",
        icon: Terminal,
        run: () => {
          notify(t.palette.hired);
          scrollToTarget("#contact");
        },
      },
    ];
  }, [found.size, locale, notify, setLocale, t, total]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((command) => `${command.label} ${command.keywords}`.toLowerCase().includes(q));
  }, [commands, query]);

  const onOpenChange = (next: boolean) => {
    setOpen(next);
    if (next) {
      setQuery("");
      setActive(0);
    }
  };

  const runCommand = (command: Command | undefined) => {
    if (!command) return;
    setOpen(false);
    window.setTimeout(command.run, 60);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const delta = event.key === "ArrowDown" ? 1 : -1;
      const next = (active + delta + filtered.length) % Math.max(filtered.length, 1);
      setActive(next);
      list.current?.querySelector(`[data-index="${next}"]`)?.scrollIntoView({ block: "nearest" });
    }
    if (event.key === "Enter") {
      event.preventDefault();
      runCommand(filtered[active]);
    }
  };

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-[70] bg-ink/70 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          data-lenis-prevent
          className="fixed top-[14vh] left-1/2 z-[71] w-[min(560px,calc(100vw-2rem))] -translate-x-1/2 overflow-hidden rounded-xl border border-limestone/15 bg-surface shadow-[0_30px_80px_-20px_rgb(0_0_0/0.7)] outline-none data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95"
        >
          <DialogPrimitive.Title className="sr-only">{t.nav.commands}</DialogPrimitive.Title>
          <DialogPrimitive.Description className="sr-only">{t.palette.placeholder}</DialogPrimitive.Description>
          <div className="flex items-center gap-3 border-b border-limestone/10 px-4">
            <Search className="size-4 text-steel" aria-hidden="true" />
            <input
              autoFocus
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setActive(0);
              }}
              onKeyDown={onKeyDown}
              placeholder={t.palette.placeholder}
              aria-label={t.palette.placeholder}
              className="h-14 flex-1 bg-transparent font-display text-sm text-limestone outline-none placeholder:text-steel"
            />
            <kbd className="rounded border border-limestone/15 px-1.5 py-0.5 font-display text-[10px] text-steel">esc</kbd>
          </div>

          <ul ref={list} role="listbox" className="max-h-[50vh] overflow-y-auto p-2">
            {filtered.length === 0 && <li className="px-3 py-6 text-center text-sm text-steel">{t.palette.empty}</li>}
            {filtered.map((command, index) => {
              const header =
                command.group !== filtered[index - 1]?.group ? t.palette.groups[command.group] : null;
              const Icon = command.icon;
              return (
                <li key={command.id} role="presentation">
                  {header && <p className="px-3 pt-3 pb-1.5 text-xs text-steel">{header}</p>}
                  <button
                    type="button"
                    role="option"
                    aria-selected={index === active}
                    data-index={index}
                    onPointerMove={() => setActive(index)}
                    onClick={() => runCommand(command)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm transition-colors",
                      index === active ? "bg-phosphor/10 text-limestone" : "text-limestone/75",
                    )}
                  >
                    <Icon className={cn("size-4", index === active ? "text-phosphor" : "text-steel")} />
                    <span className={command.group === "secrets" ? "font-display text-[13px]" : undefined}>
                      {command.label}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
