"use client";

import { motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { Command } from "lucide-react";
import { useState } from "react";

import { useBugHunt } from "@/components/BugHunt";
import { PALETTE_EVENT } from "@/components/CommandPalette";
import { useLanguage } from "@/components/LanguageProvider";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const { locale, setLocale, t } = useLanguage();
  const { found, total, notify } = useBugHunt();
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 260, damping: 40 });
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setHidden(latest > previous && latest > 240);
  });

  const navLinks = [
    { label: t.nav.projects, href: "#projects" },
    { label: t.nav.play, href: "#play" },
    { label: t.nav.about, href: "#about" },
    { label: t.nav.contact, href: "#contact" },
  ];

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-phosphor"
        style={{ scaleX: progress }}
      />

      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: hidden ? -90 : 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 32 }}
        className="fixed inset-x-0 top-4 z-40 flex justify-center px-4"
      >
        <nav className="flex w-full max-w-3xl items-center justify-between gap-2 rounded-full border border-limestone/10 bg-ink/70 py-1.5 pr-1.5 pl-5 shadow-[0_10px_40px_-15px_rgb(0_0_0/0.8)] backdrop-blur-xl">
          <a href="#top" className="font-display text-sm font-semibold text-limestone">
            DL<span className="text-phosphor">_</span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="rounded-full px-3 py-1.5 text-sm text-limestone/75 transition-colors hover:bg-limestone/5 hover:text-limestone"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => notify(t.bugs.hint, "sodium")}
              aria-label={`${t.nav.bugs}: ${found.size}/${total}`}
              className={cn(
                "rounded-full px-2.5 py-1.5 font-display text-xs tabular-nums transition-colors hover:bg-limestone/5",
                found.size === total ? "text-phosphor" : "text-sodium",
              )}
            >
              bug {found.size}/{total}
            </button>

            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent(PALETTE_EVENT))}
              aria-label={t.nav.commands}
              className="hidden items-center gap-1 rounded-full border border-limestone/10 px-2.5 py-1.5 font-display text-xs text-steel transition-colors hover:text-limestone sm:inline-flex"
            >
              <Command className="size-3" />K
            </button>

            <button
              type="button"
              onClick={() => setLocale(locale === "it" ? "en" : "it")}
              aria-label={`${t.nav.languageLabel}: ${locale === "it" ? "English" : "Italiano"}`}
              className="rounded-full px-2.5 py-1.5 font-display text-xs text-limestone/75 transition-colors hover:bg-limestone/5 hover:text-limestone"
            >
              {locale === "it" ? "EN" : "IT"}
            </button>

            <a
              href="#contact"
              className="rounded-full bg-phosphor px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-phosphor/85"
            >
              {t.nav.cta}
            </a>
          </div>
        </nav>
      </motion.header>
    </>
  );
}
