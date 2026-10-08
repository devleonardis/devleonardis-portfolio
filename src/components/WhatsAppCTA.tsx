"use client";

import { MessageCircle } from "lucide-react";

import { useLanguage } from "@/components/LanguageProvider";
import { whatsappLink } from "@/lib/site";

export default function WhatsAppCTA() {
  const { t } = useLanguage();
  const label = t.nav.whatsapp;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full border border-phosphor/40 bg-phosphor px-4 py-3 text-sm font-semibold text-ink shadow-[0_12px_30px_-12px_rgb(92_242_176/0.75)] transition-transform hover:scale-[1.02] hover:bg-phosphor/85"
    >
      <MessageCircle className="size-5" />
      <span className="hidden sm:inline">{label}</span>
    </a>
  );
}
