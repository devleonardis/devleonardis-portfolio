import About from "@/components/About";
import BackgroundFX from "@/components/BackgroundFX";
import BuildSequence from "@/components/BuildSequence";
import CommandPalette from "@/components/CommandPalette";
import Contact from "@/components/Contact";
import EasterEggSnake from "@/components/EasterEggSnake";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Playground from "@/components/Playground";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import { siteConfig } from "@/lib/site";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteConfig.url}#person`,
        name: siteConfig.fullName,
        alternateName: siteConfig.name,
        url: siteConfig.url,
        image: `${siteConfig.url}/profile-photo.jpeg`,
        jobTitle: "Web Engineer",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Via Papa Innocenzo XII, 19",
          addressLocality: "Bari",
          addressCountry: "IT",
        },
        email: siteConfig.email,
        telephone: siteConfig.phoneE164,
        sameAs: [siteConfig.linkedin],
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        inLanguage: "it-IT",
      },
      {
        "@type": "WebPage",
        "@id": `${siteConfig.url}#webpage`,
        url: siteConfig.url,
        name: siteConfig.title,
        description: siteConfig.description,
        isPartOf: {
          "@id": `${siteConfig.url}#website`,
        },
      },
    ],
  };

  return (
    <div className="relative min-h-screen overflow-x-clip text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BackgroundFX />
      <Navbar />
      <main>
        <Hero />
        <BuildSequence />
        <Projects />
        <Playground />
        <About />
        <Services />
        <Contact />
      </main>
      <WhatsAppCTA />
      <CommandPalette />
      <EasterEggSnake />
    </div>
  );
}
