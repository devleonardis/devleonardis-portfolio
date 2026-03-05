import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import FaviconSwitcher from "@/components/FaviconSwitcher";
import { LanguageProvider } from "@/components/LanguageProvider";
import { siteConfig } from "@/lib/site";

import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: "%s | DevLeonardis",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "Simone De Leonardis",
    "DevLeonardis",
    "Web Engineer Bari",
    "Sviluppatore web Bari",
    "Next.js developer",
    "Frontend developer",
    "UI motion",
    "Landing page SEO",
    "Integrazioni API",
  ],
  authors: [{ name: siteConfig.fullName, url: siteConfig.url }],
  creator: siteConfig.fullName,
  publisher: siteConfig.name,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} Portfolio`,
      },
    ],
    locale: siteConfig.locale,
    alternateLocale: ["en_US"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className="dark">
      <body className={`${inter.variable} ${spaceGrotesk.variable} bg-background font-sans antialiased`}>
        <LanguageProvider>
          <FaviconSwitcher />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
