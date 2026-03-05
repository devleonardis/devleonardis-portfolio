"use client";

import { MessageCircle } from "lucide-react";

import { useLanguage } from "@/components/LanguageProvider";
import { whatsappLink } from "@/lib/site";

export default function WhatsAppCTA() {
  const { locale } = useLanguage();
  const label = locale === "it" ? "WhatsApp" : "WhatsApp";

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full border border-emerald-300/40 bg-emerald-400 px-4 py-3 text-sm font-semibold text-zinc-950 shadow-[0_12px_30px_-12px_rgba(52,211,153,0.75)] transition-transform hover:scale-[1.02] hover:bg-emerald-300"
    >
      <MessageCircle className="size-5" />
      <span className="hidden sm:inline">{label}</span>
    </a>
  );
}
