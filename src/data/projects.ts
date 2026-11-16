import type { Locale } from "@/data/copy";

export type Project = {
  id: string;
  title: string;
  category: "saas" | "ecommerce" | "medical" | "realestate" | "hospitality" | "client";
  categoryLabel: Record<Locale, string>;
  type: "platform" | "local";
  badge: Record<Locale, string>;
  description: Record<Locale, string>;
  tags: string[];
  metric?: string;
  liveUrl: string;
  previewUrl: string;
  year: number;
  featured: boolean;
};

export const projects: Project[] = [
  {
    id: "kinetix-saas",
    title: "Kinetix",
    category: "saas",
    categoryLabel: {
      it: "SaaS & Piattaforma Cloud",
      en: "SaaS & Cloud Platform",
    },
    type: "platform",
    badge: {
      it: "SaaS Platform",
      en: "SaaS Platform",
    },
    description: {
      it: "Piattaforma SaaS di telemetria ad alto traffico ed edge computing distribuito. Console di monitoraggio reattiva in tempo reale, analisi throughput su 180+ nodi edge e calcolatore di pricing a consumo.",
      en: "High-traffic SaaS telemetry and distributed edge computing platform. Real-time reactive monitoring console, edge throughput analytics, and usage-based pricing engine.",
    },
    tags: ["Next.js 16", "React 19", "Tailwind CSS v4", "High-Traffic Console", "Framer Motion", "SaaS UI"],
    metric: "< 4.2ms P99 Latency",
    liveUrl: "/demo/saas",
    previewUrl: "/demo/saas",
    year: 2026,
    featured: true,
  },
  {
    id: "aura-atelier",
    title: "AURA Atelier",
    category: "ecommerce",
    categoryLabel: {
      it: "E-Commerce di Lusso",
      en: "Luxury E-Commerce",
    },
    type: "platform",
    badge: {
      it: "Luxury E-Commerce",
      en: "Luxury E-Commerce",
    },
    description: {
      it: "Boutique e-commerce editoriale per complementi d'arredo e creazioni sartoriali. Catalogo con filtri istantanei per categoria, selettore varianti colore e carrello slide-over con calcolo spedizioni e voucher promozionali.",
      en: "Editorial boutique e-commerce for artisanal furniture and fashion. Catalog with instant category filtering, color swatches, and slide-over cart with live shipping calculation and promo vouchers.",
    },
    tags: ["E-Commerce", "React 19", "Slide-over Cart", "Instant Filters", "Tailwind CSS", "Micro-Interactions"],
    metric: "Slide-over Cart & Dynamic Subtotal",
    liveUrl: "/demo/ecommerce",
    previewUrl: "/demo/ecommerce",
    year: 2026,
    featured: true,
  },
  {
    id: "san-pietro-clinic",
    title: "Clinica San Pietro",
    category: "medical",
    categoryLabel: {
      it: "Sanità & Studio Medico",
      en: "Medical & Healthcare",
    },
    type: "platform",
    badge: {
      it: "Poliambulatorio & Sanità",
      en: "Healthcare & Clinic",
    },
    description: {
      it: "Portale per istituto medico d'eccellenza con motore di prenotazione visite guidato in 4 passaggi, comparatore clinico prima/dopo per trattamenti estetici e directory medici con agende in tempo reale.",
      en: "Premier clinical institute portal featuring a guided 4-step appointment booking engine, interactive clinical before/after comparison slider, and certified specialist directory.",
    },
    tags: ["Medical & Healthcare", "Booking Engine", "Before/After 3D", "Next.js 16", "Accessibility", "Tailwind CSS"],
    metric: "4-Step Booking & Before/After 3D",
    liveUrl: "/demo/clinica",
    previewUrl: "/demo/clinica",
    year: 2026,
    featured: true,
  },
  {
    id: "prestige-living",
    title: "Prestige Living",
    category: "realestate",
    categoryLabel: {
      it: "Real Estate di Lusso",
      en: "Luxury Real Estate",
    },
    type: "platform",
    badge: {
      it: "Real Estate di Lusso",
      en: "Luxury Real Estate",
    },
    description: {
      it: "Piattaforma per agenzia immobiliare di alta gamma con ricerca multi-parametro istantanea (zona, tipologia, budget), schede tecniche architettoniche e calcolatore finanziario di rata mutuo e ammortamento.",
      en: "Luxury real estate platform with instant multi-parameter filtering, architectural property specs, and real-time interactive mortgage financial calculation engine.",
    },
    tags: ["Real Estate Luxury", "Mortgage Engine", "Multi-Filter Search", "Next.js 16", "Tailwind CSS", "Interactive UI"],
    metric: "Real-time Mortgage Formula",
    liveUrl: "/demo/immobiliare",
    previewUrl: "/demo/immobiliare",
    year: 2026,
    featured: true,
  },
  {
    id: "novecento-dining",
    title: "Novecento Ristorante",
    category: "hospitality",
    categoryLabel: {
      it: "Hospitality & Ristorazione",
      en: "Fine Dining & Hospitality",
    },
    type: "platform",
    badge: {
      it: "Fine Dining & Ristorazione",
      en: "Fine Dining & Restaurant",
    },
    description: {
      it: "Esperienza digitale per ristorante gourmet con menù degustazione interattivo a schede, abbinamento calici del sommelier, filtri allergeni e sistema di prenotazione tavolo con selezione sala ed atmosfera.",
      en: "Digital fine dining experience featuring an interactive tasting menu, sommelier wine pairing notes, dietary filters, and table reservation with room ambience selection.",
    },
    tags: ["Fine Dining", "Interactive Menu", "Table Reservation", "Framer Motion", "Tailwind CSS", "Next.js 16"],
    metric: "Interactive Tasting Menu & Booking",
    liveUrl: "/demo/ristorante",
    previewUrl: "/demo/ristorante",
    year: 2026,
    featured: true,
  },
  {
    id: "phoenix-elettronica",
    title: "Phoenix Elettronica",
    category: "client",
    categoryLabel: {
      it: "Impianti & Business Locale",
      en: "Local Business & Electrical",
    },
    type: "local",
    badge: {
      it: "Business Locale",
      en: "Local Business",
    },
    description: {
      it: "Sito business locale per impianti elettrici con SEO mirata per il territorio pugliese e CTA ad alta conversione per richiesta preventivi.",
      en: "Local business website for electrical installations with targeted local SEO and high-conversion CTAs.",
    },
    tags: ["Next.js", "React", "Tailwind CSS", "Vercel", "Local SEO"],
    metric: "Live Client • 100% SEO",
    liveUrl: "https://phoenixelettronica.vercel.app/",
    previewUrl: "https://phoenixelettronica.vercel.app/",
    year: 2026,
    featured: true,
  },
  {
    id: "1998-recording-studio",
    title: "19.98 Studio",
    category: "client",
    categoryLabel: {
      it: "Studio di Registrazione",
      en: "Recording Studio",
    },
    type: "local",
    badge: {
      it: "Studio di Registrazione",
      en: "Recording Studio",
    },
    description: {
      it: "Sito vetrina per studio di registrazione a Bari con presentazione servizi di produzione, registrazione, mix e mastering audio professionale.",
      en: "Showcase website for a recording studio in Bari offering production, recording, mixing and professional mastering services.",
    },
    tags: ["Next.js", "React", "Tailwind CSS", "Vercel", "Audio Studio"],
    metric: "Live Client • Bari",
    liveUrl: "https://1998recordingstudio-web.vercel.app/",
    previewUrl: "https://1998recordingstudio-web.vercel.app/",
    year: 2026,
    featured: true,
  },
];
