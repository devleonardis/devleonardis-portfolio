import Link from "next/link";
import type { ReactNode } from "react";

import { siteConfig } from "@/lib/site";

type LegalPageProps = {
  title: string;
  updated: string;
  intro?: ReactNode;
  children: ReactNode;
};

// Shared shell for /condizioni and /privacy: static, Italian only, no 3D or client JS.
export default function LegalPage({ title, updated, intro, children }: LegalPageProps) {
  return (
    <div className="relative min-h-screen text-foreground">
      <header className="mx-auto flex w-full max-w-3xl items-center justify-between px-6 pt-8 md:px-8">
        <Link href="/" className="font-display text-sm font-semibold text-limestone">
          DL<span className="text-phosphor">_</span>
        </Link>
        <Link
          href="/#offerta"
          className="rounded-full border border-limestone/10 px-3 py-1.5 font-display text-xs text-steel transition-colors hover:text-limestone"
        >
          ← Torna al sito
        </Link>
      </header>

      <main className="mx-auto w-full max-w-3xl px-6 pt-16 pb-24 md:px-8 md:pt-24">
        <p className="font-display text-xs tracking-wide text-phosphor uppercase">Documento</p>
        <h1 className="wide mt-3 font-display text-3xl font-semibold tracking-tight text-limestone md:text-5xl">
          {title}
        </h1>
        <p className="mt-4 text-sm text-steel">Ultimo aggiornamento: {updated}</p>
        {intro ? <div className="mt-8 leading-relaxed text-limestone/80">{intro}</div> : null}

        <div className="legal mt-12 space-y-12">{children}</div>
      </main>

      <footer className="mx-auto w-full max-w-3xl border-t border-limestone/10 px-6 pt-6 pb-10 text-xs text-steel md:px-8">
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

export function Section({ id, title, children }: { id?: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="font-display text-lg font-semibold text-limestone md:text-xl">{title}</h2>
      <div className="mt-4 space-y-4 leading-relaxed text-limestone/75 [&_a]:text-phosphor [&_a]:underline-offset-4 [&_a:hover]:underline [&_li]:pl-1 [&_strong]:font-semibold [&_strong]:text-limestone [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
        {children}
      </div>
    </section>
  );
}
