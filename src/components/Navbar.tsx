"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

import { useLanguage } from "@/components/LanguageProvider";
import { Button } from "@/components/ui/button";
import { whatsappLink } from "@/lib/site";

export default function Navbar() {
  const { locale, setLocale, t } = useLanguage();

  const navLinks = [
    { label: t.nav.projects, href: "#projects" },
    { label: t.nav.about, href: "#about" },
    { label: t.nav.services, href: "#services" },
    { label: t.nav.contact, href: "#contact" },
  ];

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="sticky top-0 z-40 border-b border-white/10 bg-black/40 backdrop-blur-xl"
    >
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-6 py-4 md:px-8">
        <a href="#top" className="font-display text-lg tracking-tight text-zinc-100">
          DevLeonardis
        </a>

        <ul className="hidden items-center gap-5 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-zinc-300 transition-colors hover:text-emerald-300"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <div className="inline-flex items-center rounded-md border border-white/10 bg-white/[0.03] p-1">
            <button
              type="button"
              onClick={() => setLocale("it")}
              aria-label={`${t.nav.languageLabel}: Italiano`}
              className={`rounded px-2 py-1 text-xs transition-colors ${
                locale === "it" ? "bg-emerald-400 text-zinc-950" : "text-zinc-300 hover:text-zinc-100"
              }`}
            >
              IT
            </button>
            <button
              type="button"
              onClick={() => setLocale("en")}
              aria-label={`${t.nav.languageLabel}: English`}
              className={`rounded px-2 py-1 text-xs transition-colors ${
                locale === "en" ? "bg-emerald-400 text-zinc-950" : "text-zinc-300 hover:text-zinc-100"
              }`}
            >
              EN
            </button>
          </div>

          <Button
            asChild
            variant="outline"
            className="hidden border-emerald-300/40 bg-emerald-400/10 text-emerald-200 hover:bg-emerald-400/20 lg:inline-flex"
          >
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" aria-label={t.nav.whatsapp}>
              <MessageCircle className="size-4" />
              {t.nav.whatsapp}
            </a>
          </Button>

          <Button asChild className="hidden bg-emerald-400 text-zinc-950 hover:bg-emerald-300 sm:inline-flex">
            <a href="#contact">{t.nav.cta}</a>
          </Button>
        </div>
      </nav>
    </motion.header>
  );
}
