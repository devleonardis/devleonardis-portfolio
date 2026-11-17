import { ArrowUpRight, Check } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getSector, plans, sectors } from "@/data/sectors";
import { siteConfig, whatsappLink } from "@/lib/site";

type Props = { params: Promise<{ settore: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return sectors.map((s) => ({ settore: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const sector = getSector((await params).settore);
  if (!sector) return {};
  const url = `/siti/${sector.slug}`;
  return {
    title: sector.metaTitle,
    description: sector.metaDescription,
    alternates: { canonical: url },
    openGraph: { title: sector.metaTitle, description: sector.metaDescription, url, locale: "it_IT", type: "website" },
  };
}

const onboardingUrl = (settore: string, piano?: string) =>
  `https://inizia.devleonardis.com/?settore=${settore}${piano ? `&piano=${piano}` : ""}`;

export default async function SectorPage({ params }: Props) {
  const sector = getSector((await params).settore);
  if (!sector) notFound();

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: sector.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  const safeJsonLd = JSON.stringify(faqJsonLd).replace(/</g, "\\u003c");

  return (
    <div className="relative min-h-screen text-foreground">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd }} />

      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 pt-8 md:px-8">
        <Link href="/" className="font-display text-sm font-semibold text-limestone">
          DL<span className="text-phosphor">_</span>
        </Link>
        <Link
          href="/#offerta"
          className="rounded-full border border-limestone/10 px-3 py-1.5 font-display text-xs text-steel transition-colors hover:text-limestone"
        >
          Tutti i settori
        </Link>
      </header>

      <main className="mx-auto w-full max-w-6xl px-6 pb-24 md:px-8">
        {/* Hero */}
        <section className="pt-16 md:pt-24">
          <p className="font-display text-xs tracking-wide text-phosphor uppercase">{sector.eyebrow}</p>
          <h1 className="wide mt-3 max-w-4xl font-display text-4xl font-semibold tracking-tight text-limestone md:text-6xl">
            {sector.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-limestone/75">{sector.lead}</p>
          <div className="mt-8 inline-flex flex-wrap items-baseline gap-x-2 rounded-full border border-phosphor/30 bg-phosphor/5 px-4 py-2 text-sm">
            <span className="font-display font-semibold text-phosphor">Online in 14 giorni</span>
            <span className="text-limestone/60">dal pagamento e dalla ricezione del materiale completo</span>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={onboardingUrl(sector.onboarding)}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-phosphor px-6 py-3 font-medium text-ink transition-colors hover:bg-phosphor/90"
            >
              Inizia ora <ArrowUpRight aria-hidden="true" className="size-4" />
            </a>
            <a
              href={sector.demo.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-limestone/15 px-6 py-3 text-limestone/85 transition-colors hover:border-phosphor/40 hover:text-limestone"
            >
              Guarda la demo <ArrowUpRight aria-hidden="true" className="size-4 text-steel" />
            </a>
          </div>
        </section>

        {/* Problemi */}
        <section className="mt-24">
          <h2 className="font-display text-2xl font-semibold text-limestone md:text-3xl">Perché un sito tuo</h2>
          <ul className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-limestone/10 bg-limestone/10 md:grid-cols-3">
            {sector.problems.map((p) => (
              <li key={p.title} className="bg-ink p-7">
                <h3 className="font-display font-semibold text-limestone">{p.title}</h3>
                <p className="mt-3 leading-relaxed text-limestone/70">{p.text}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Cosa c'è nel sito + demo */}
        <section className="mt-24 grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-start">
          <div>
            <h2 className="font-display text-2xl font-semibold text-limestone md:text-3xl">Cosa c&apos;è nel sito</h2>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {sector.sections.map((s) => (
                <li key={s} className="flex gap-3 text-limestone/80">
                  <Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-phosphor" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
          <a
            href={sector.demo.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-2xl border border-limestone/10 p-7 transition-colors hover:border-phosphor/40"
          >
            <p className="font-display text-xs tracking-wide text-steel uppercase">Demo dal vivo</p>
            <p className="mt-3 font-display text-lg font-semibold text-limestone">{sector.demo.label}</p>
            <p className="mt-3 leading-relaxed text-limestone/70">
              Un sito d&apos;esempio sul template del tuo settore, con nomi e immagini segnaposto. Il tuo avrà i tuoi
              testi, le tue foto e i tuoi colori.
            </p>
            <span className="mt-5 inline-flex items-center gap-2 text-sm text-phosphor">
              Apri la demo <ArrowUpRight aria-hidden="true" className="size-4" />
            </span>
          </a>
        </section>

        {/* Piani */}
        <section className="mt-24">
          <h2 className="font-display text-2xl font-semibold text-limestone md:text-3xl">Prezzi</h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-limestone/70">{sector.suggestedWhy}</p>
          <ul className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-limestone/10 bg-limestone/10 md:grid-cols-2">
            {plans.map((plan) => (
              <li key={plan.id} className="flex flex-col bg-ink p-7 md:p-8">
                <div className="flex items-center gap-3">
                  <h3 className="font-display text-lg font-semibold text-limestone">{plan.name}</h3>
                  {plan.id === sector.suggested ? (
                    <span className="rounded-full border border-phosphor/40 px-2 py-0.5 font-display text-[11px] text-phosphor">
                      consigliato
                    </span>
                  ) : null}
                </div>
                <p className="mt-5 flex items-baseline gap-1">
                  <span className="font-display text-4xl font-semibold text-limestone tabular-nums">{plan.yearly}</span>
                  <span className="text-limestone/60">/anno</span>
                </p>
                <p className="mt-1 text-sm text-steel">+ {plan.setup} attivazione</p>
                <ul className="mt-6 flex-1 space-y-3 text-limestone/75">
                  {plan.features.map((f) => (
                    <li key={f} className="flex gap-3">
                      <Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-phosphor" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={onboardingUrl(sector.onboarding, plan.id)}
                  className="mt-8 inline-flex items-center justify-center gap-2 rounded-md border border-phosphor/40 px-5 py-2.5 text-sm text-phosphor transition-colors hover:bg-phosphor hover:text-ink"
                >
                  Scegli {plan.name} <ArrowUpRight aria-hidden="true" className="size-4" />
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs leading-relaxed text-steel">
            Prezzi senza IVA (regime forfettario). Al momento dell&apos;ordine si pagano attivazione e primo anno.
            Rinnovo annuale con avviso 30 giorni prima, disdetta quando vuoi.{" "}
            <Link href="/condizioni" className="text-limestone/70 underline underline-offset-4 hover:text-limestone">
              Condizioni del servizio
            </Link>
          </p>
        </section>

        {/* Come funziona */}
        <section className="mt-24 grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-semibold text-limestone md:text-3xl">Come funziona</h2>
            <ol className="mt-8 space-y-6">
              {[
                ["Compili il modulo", "Su inizia.devleonardis.com scegli il piano e mi racconti la tua attività. Ci vogliono pochi minuti."],
                ["Paghi e mi mandi il materiale", "Carta, PayPal o bonifico. Carichi foto e testi, o me li mandi dopo."],
                ["Controlli l'anteprima", "Ti mando il sito prima di pubblicarlo. Correggiamo insieme quello che serve."],
                ["Va online", "Entro 14 giorni, sul tuo dominio. Poi mi scrivi quando vuoi cambiare qualcosa."],
              ].map(([t, d], i) => (
                <li key={t} className="flex gap-4">
                  <span className="font-display text-sm text-phosphor tabular-nums">0{i + 1}</span>
                  <div>
                    <h3 className="font-display font-semibold text-limestone">{t}</h3>
                    <p className="mt-1 leading-relaxed text-limestone/70">{d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="rounded-2xl border border-limestone/10 p-7">
            <h3 className="font-display font-semibold text-limestone">Cosa ti chiedo</h3>
            <ul className="mt-5 space-y-3 text-limestone/75">
              {sector.material.map((m) => (
                <li key={m} className="flex gap-3">
                  <Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-phosphor" />
                  <span>{m}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm leading-relaxed text-steel">
              I 14 giorni partono quando ho il materiale completo. Se manca qualcosa te lo scrivo io.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-24">
          <h2 className="font-display text-2xl font-semibold text-limestone md:text-3xl">Domande frequenti</h2>
          <div className="mt-8 divide-y divide-limestone/10 border-y border-limestone/10">
            {sector.faq.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 font-display font-semibold text-limestone">
                  {f.q}
                  <span aria-hidden="true" className="text-phosphor transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 max-w-3xl leading-relaxed text-limestone/70">{f.a}</p>
              </details>
            ))}
          </div>
          {sector.note ? <p className="mt-6 max-w-3xl text-sm leading-relaxed text-steel">{sector.note}</p> : null}
        </section>

        {/* CTA finale */}
        <section className="mt-24 rounded-2xl border border-phosphor/30 bg-phosphor/5 p-8 md:p-12">
          <h2 className="font-display text-2xl font-semibold text-limestone md:text-3xl">Partiamo?</h2>
          <p className="mt-3 max-w-2xl leading-relaxed text-limestone/75">
            Compila il modulo e in 14 giorni il tuo sito è online. Se prima vuoi fare una domanda, scrivimi su WhatsApp.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={onboardingUrl(sector.onboarding)}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-phosphor px-6 py-3 font-medium text-ink transition-colors hover:bg-phosphor/90"
            >
              Inizia ora <ArrowUpRight aria-hidden="true" className="size-4" />
            </a>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-limestone/15 px-6 py-3 text-limestone/85 transition-colors hover:border-phosphor/40 hover:text-limestone"
            >
              Scrivimi su WhatsApp
            </a>
          </div>
        </section>

        {/* Altri settori */}
        <nav aria-label="Altri settori" className="mt-16">
          <h2 className="font-display text-sm font-semibold text-limestone">Altri settori</h2>
          <ul className="mt-4 flex flex-wrap gap-3">
            {sectors
              .filter((s) => s.slug !== sector.slug)
              .map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/siti/${s.slug}`}
                    className="inline-block rounded-full border border-limestone/10 px-4 py-2 text-sm text-limestone/75 transition-colors hover:border-phosphor/40 hover:text-limestone"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
          </ul>
        </nav>
      </main>

      <footer className="mx-auto w-full max-w-6xl border-t border-limestone/10 px-6 pt-6 pb-10 text-xs text-steel md:px-8">
        <p>
          {siteConfig.fullName} ({siteConfig.name}) · {siteConfig.address} · P.IVA {siteConfig.vatNumber} ·{" "}
          <a className="underline-offset-4 hover:text-limestone hover:underline" href={`mailto:${siteConfig.email}`}>
            {siteConfig.email}
          </a>
        </p>
        <p className="mt-3 flex gap-4">
          <Link className="hover:text-limestone" href="/condizioni">
            Condizioni del servizio
          </Link>
          <Link className="hover:text-limestone" href="/privacy">
            Privacy
          </Link>
        </p>
      </footer>
    </div>
  );
}
