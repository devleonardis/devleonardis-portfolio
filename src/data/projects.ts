import type { Locale } from "@/data/copy";

export type Project = {
  id: string;
  title: string;
  description: Record<Locale, string>;
  tags: string[];
  liveUrl: string;
  previewUrl: string;
  year: number;
  featured: boolean;
};

export const projects: Project[] = [
  {
    id: "phoenix-elettronica",
    title: "Phoenix Elettronica",
    description: {
      it: "Sito business locale per impianti elettrici con SEO locale e CTA ad alta conversione.",
      en: "Local business website for electrical services with local SEO and high-conversion CTAs.",
    },
    tags: ["Next.js", "React", "Tailwind CSS", "Vercel"],
    liveUrl: "https://phoenixelettronica.vercel.app/",
    previewUrl: "https://phoenixelettronica.vercel.app/",
    year: 2026,
    featured: true,
  },
  {
    id: "hamburgeria-menu",
    title: "Hamburgeria Menù",
    description: {
      it: "Sito vetrina/menu per hamburgeria con navigazione rapida e CTA dirette.",
      en: "Showcase and menu website for a burger restaurant with quick navigation and direct CTAs.",
    },
    tags: ["Astro", "Cloudflare Workers", "View Transitions", "CSS"],
    liveUrl: "https://okayburger.simonedele03.workers.dev/",
    previewUrl: "https://okayburger.simonedele03.workers.dev/",
    year: 2026,
    featured: true,
  },
  {
    id: "inception",
    title: "Inception",
    description: {
      it: "Meta-progetto: una card che riapre il portfolio DevLeonardis.",
      en: "Meta project: a card that opens the DevLeonardis portfolio itself.",
    },
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    liveUrl: "https://devleonardis.com/",
    previewUrl: "https://devleonardis.com/",
    year: 2026,
    featured: true,
  },
  {
    id: "1998-recording-studio",
    title: "19.98 Studio",
    description: {
      it: "Sito vetrina per studio di registrazione a Bari con servizi di produzione, registrazione, mix e mastering.",
      en: "Showcase website for a recording studio in Bari offering production, recording, mixing and mastering services.",
    },
    tags: ["Next.js", "React", "Tailwind CSS", "Vercel"],
    liveUrl: "https://1998recordingstudio-web.vercel.app/",
    previewUrl: "https://1998recordingstudio-web.vercel.app/",
    year: 2026,
    featured: true,
  },
];
