"use client";

import { FormEvent, useState } from "react";
import { Linkedin, Mail, MapPin, MessageCircle, Phone } from "lucide-react";

import { Bug } from "@/components/BugHunt";
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
    <section id="contact" className="relative mx-auto w-full max-w-6xl px-6 pt-24 md:px-8 md:pt-32">
      <div className="grid gap-12 md:grid-cols-2">
        <div className="space-y-6">
          <h2 className="wide font-display text-4xl font-semibold tracking-tight text-limestone md:text-5xl">
            {t.contact.title}
          </h2>

          <a
            href={`mailto:${EMAIL}`}
            className="inline-flex items-center gap-2 font-display text-lg text-limestone underline decoration-phosphor/60 underline-offset-8 transition-colors hover:text-phosphor"
          >
            <Mail className="size-4" />
            {EMAIL}
          </a>

          <a
            href={PHONE_LINK}
            className="flex items-center gap-2 text-sm text-limestone/80 transition-colors hover:text-phosphor"
          >
            <Phone className="size-4" />
            <span className="text-steel">{t.contact.phone}:</span>
            <span>{PHONE}</span>
          </a>

          <p className="flex items-center gap-2 text-sm text-limestone/80">
            <MapPin className="size-4" />
            <span className="text-steel">{t.contact.address}:</span>
            <span>{ADDRESS}</span>
          </p>

          <div className="flex items-center gap-4 pt-2 text-limestone/80">
            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-phosphor">
              <Linkedin className="size-5" />
            </a>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="hover:text-phosphor">
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
            className="h-11 border-limestone/15 bg-surface/70 text-limestone placeholder:text-steel"
          />
          <Input
            required
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder={t.contact.email}
            className="h-11 border-limestone/15 bg-surface/70 text-limestone placeholder:text-steel"
          />
          <Textarea
            required
            rows={5}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder={t.contact.message}
            className="h-11 border-limestone/15 bg-surface/70 text-limestone placeholder:text-steel"
          />
          <Button
            type="submit"
            disabled={status === "loading"}
            className="h-11 w-full bg-phosphor text-ink hover:bg-phosphor/85"
          >
            {status === "loading" ? t.contact.sending : t.contact.send}
          </Button>

          {status === "success" ? (
            <p className="rounded-md border border-phosphor/40 bg-phosphor/10 px-3 py-2 text-sm text-phosphor">
              {t.contact.success}
            </p>
          ) : null}

          {status === "error" ? (
            <p className="rounded-md border border-[#ff6b5b]/40 bg-[#ff6b5b]/10 px-3 py-2 text-sm text-[#ffb0a6]">
              {t.contact.error}
            </p>
          ) : null}

          <Button
            asChild
            type="button"
            variant="outline"
            className="w-full border-limestone/20 bg-transparent text-limestone hover:bg-limestone/10"
          >
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="size-4" />
              {t.contact.whatsapp}
            </a>
          </Button>
        </form>
      </div>

      <Bug id="contact" className="top-16 right-4 md:top-24 md:right-[48%]" />

      <footer className="mt-24 border-t border-limestone/10 pt-6 pb-10">
        <Wordmark />
        <p className="mt-6 text-center text-xs text-steel">
          © {new Date().getFullYear()} DevLeonardis. {t.contact.footer}
        </p>
      </footer>
    </section>
  );
}

function Wordmark() {
  return (
    <svg viewBox="0 0 1000 150" className="group w-full select-none" role="img" aria-label="DevLeonardis">
      <defs>
        <linearGradient id="wordmark-gradient" x1="0" x2="1">
          <stop offset="0%" stopColor="var(--phosphor)" />
          <stop offset="100%" stopColor="var(--sodium)" />
        </linearGradient>
      </defs>
      <text
        x="50%"
        y="54%"
        textAnchor="middle"
        dominantBaseline="middle"
        className="font-display"
        fontSize="116"
        fontWeight="700"
        letterSpacing="-6"
        fill="transparent"
        stroke="rgb(236 230 217 / 0.14)"
        strokeWidth="1.2"
      >
        DevLeonardis
      </text>
      <text
        x="50%"
        y="54%"
        textAnchor="middle"
        dominantBaseline="middle"
        className="font-display opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        fontSize="116"
        fontWeight="700"
        letterSpacing="-6"
        fill="url(#wordmark-gradient)"
      >
        DevLeonardis
      </text>
    </svg>
  );
}
