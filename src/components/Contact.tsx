"use client";

import { FormEvent, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Linkedin, Mail, MapPin, MessageCircle, Phone } from "lucide-react";

import { useLanguage } from "@/components/LanguageProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { siteConfig, whatsappLink } from "@/lib/site";

const EMAIL = siteConfig.email;
const PHONE = siteConfig.phoneDisplay;
const PHONE_LINK = `tel:${siteConfig.phoneE164}`;
const LINKEDIN = siteConfig.linkedin;
const ADDRESS = siteConfig.address;

export default function Contact() {
  const shouldReduceMotion = useReducedMotion();
  const { locale, t } = useLanguage();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message, locale }),
      });

      if (!response.ok) {
        setStatus("error");
        return;
      }

      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="mx-auto w-full max-w-6xl px-6 py-20 md:px-8 md:py-24">
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
        whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.35 }}
        className="grid gap-10 rounded-2xl border border-white/10 bg-white/[0.03] p-8 md:grid-cols-2"
      >
        <div className="space-y-5">
          <p className="text-sm uppercase tracking-[0.2em] text-emerald-300/90">{t.contact.section}</p>
          <h2 className="font-display text-3xl tracking-tight text-zinc-50 md:text-4xl">{t.contact.title}</h2>

          <a
            href={`mailto:${EMAIL}`}
            className="inline-flex items-center gap-2 text-zinc-200 underline decoration-emerald-300/60 underline-offset-4 transition-colors hover:text-emerald-300"
          >
            <Mail className="size-4" />
            {EMAIL}
          </a>

          <a
            href={PHONE_LINK}
            className="flex items-center gap-2 text-sm text-zinc-300 transition-colors hover:text-emerald-300"
          >
            <Phone className="size-4" />
            <span className="text-zinc-400">{t.contact.phone}:</span>
            <span>{PHONE}</span>
          </a>

          <p className="flex items-center gap-2 text-sm text-zinc-300">
            <MapPin className="size-4" />
            <span className="text-zinc-400">{t.contact.address}:</span>
            <span>{ADDRESS}</span>
          </p>

          <div className="flex items-center gap-4 pt-2 text-zinc-300">
            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-300">
              <Linkedin className="size-5" />
            </a>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-300">
              <MessageCircle className="size-5" />
            </a>
          </div>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <Input
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder={t.contact.name}
            className="border-white/10 bg-zinc-900/70 text-zinc-100"
          />
          <Input
            required
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder={t.contact.email}
            className="border-white/10 bg-zinc-900/70 text-zinc-100"
          />
          <Textarea
            required
            rows={5}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder={t.contact.message}
            className="border-white/10 bg-zinc-900/70 text-zinc-100"
          />
          <Button
            type="submit"
            disabled={status === "loading"}
            className="w-full bg-emerald-400 text-zinc-950 hover:bg-emerald-300"
          >
            {status === "loading" ? t.contact.sending : t.contact.send}
          </Button>

          {status === "success" ? (
            <p className="rounded-md border border-emerald-300/40 bg-emerald-400/10 px-3 py-2 text-sm text-emerald-200">
              {t.contact.success}
            </p>
          ) : null}

          {status === "error" ? (
            <p className="rounded-md border border-red-400/40 bg-red-500/10 px-3 py-2 text-sm text-red-200">
              {t.contact.error}
            </p>
          ) : null}

          <Button
            asChild
            type="button"
            variant="outline"
            className="w-full border-emerald-300/40 bg-emerald-400/10 text-emerald-200 hover:bg-emerald-400/20"
          >
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="size-4" />
              {t.contact.whatsapp}
            </a>
          </Button>
        </form>
      </motion.div>

      <footer className="pt-8 text-center text-xs text-zinc-500">
        © {new Date().getFullYear()} DevLeonardis. {t.contact.footer}
      </footer>
    </section>
  );
}
