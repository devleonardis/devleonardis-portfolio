export const siteConfig = {
  name: "DevLeonardis",
  fullName: "Simone De Leonardis",
  url: "https://devleonardis.com",
  title: "DevLeonardis | Simone De Leonardis",
  description:
    "Portfolio di Simone De Leonardis, Web Engineer a Bari: sviluppo web, UI motion, landing SEO e integrazioni.",
  ogImage: "/og-image.svg",
  locale: "it_IT",
  location: "Bari, Italy",
  email: "info@devleonardis.com",
  mailFrom: "mailfrom@devleonardis.com",
  phoneDisplay: "+39 366 525 2021",
  phoneE164: "+393665252021",
  address: "Via Papa Innocenzo XII, 19, Bari",
  linkedin: "https://www.linkedin.com/in/simone-de-leonardis-49680322b/",
  whatsappMessage: "Ciao Simone, ho visto il tuo portfolio e vorrei parlare di un progetto.",
} as const;

export const whatsappLink = `https://wa.me/${siteConfig.phoneE164.replace(/\D/g, "")}?text=${encodeURIComponent(
  siteConfig.whatsappMessage,
)}`;
