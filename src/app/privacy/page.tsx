import type { Metadata } from "next";

import LegalPage, { Section } from "@/components/LegalPage";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Informativa privacy",
  description:
    "Informativa sul trattamento dei dati personali (GDPR) per il modulo di onboarding su inizia.devleonardis.com e per il sito devleonardis.com.",
  alternates: { canonical: "/privacy" },
};

const UPDATED = "12 novembre 2026";

// Verificare con un professionista prima della pubblicazione: tempi di conservazione e
// ruoli dei fornitori (responsabili ex art. 28 vs titolari autonomi) sono ipotesi ragionevoli, non un parere legale.
export default function PrivacyPage() {
  return (
    <LegalPage
      title="Informativa privacy"
      updated={UPDATED}
      intro={
        <p>
          Questa informativa, resa ai sensi degli artt. 13 e 14 del Regolamento UE 2016/679 (GDPR), spiega come tratto
          i dati che inserisci nel modulo di onboarding su{" "}
          <a className="text-phosphor underline-offset-4 hover:underline" href="https://inizia.devleonardis.com">
            inizia.devleonardis.com
          </a>{" "}
          e nel modulo contatti di devleonardis.com.
        </p>
      }
    >
      <Section title="1. Titolare del trattamento">
        <p>
          {siteConfig.fullName} ({siteConfig.name}), {siteConfig.address}, P.IVA {siteConfig.vatNumber}. Per
          qualsiasi richiesta sui tuoi dati: <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
        </p>
      </Section>

      <Section title="2. Quali dati raccolgo">
        <ul>
          <li>
            <strong>Dati anagrafici e dell&apos;attività</strong>: nome dell&apos;attività, referente, città,
            indirizzo, Partita IVA o codice fiscale, settore, dominio desiderato.
          </li>
          <li>
            <strong>Dati di contatto</strong>: email e numero di telefono.
          </li>
          <li>
            <strong>Contenuti e materiali</strong>: descrizione dell&apos;attività, servizi e prezzi, orari, profili
            social, logo e foto che carichi. Se nelle foto compaiono persone, assicurati di avere il loro consenso.
          </li>
          <li>
            <strong>Dati sul pagamento</strong>: piano scelto, metodo di pagamento, importo, data e stato del pagamento.
            I dati della carta li gestisce Stripe e io non li vedo mai.
          </li>
          <li>
            <strong>Dati tecnici</strong>: indirizzo IP e informazioni di base sulla richiesta, registrati dai sistemi
            di hosting per sicurezza e prevenzione degli abusi.
          </li>
        </ul>
        <p>
          Non chiedo dati sulla salute né altre categorie particolari di dati. Se sei un professionista sanitario,
          non inviare informazioni sui tuoi pazienti.
        </p>
      </Section>

      <Section title="3. Perché li tratto e su quale base">
        <ul>
          <li>
            <strong>Realizzare, pubblicare e gestire il tuo sito</strong>, comunicare con te sull&apos;ordine, sulle
            modifiche e sui rinnovi: esecuzione del contratto e misure precontrattuali (art. 6.1.b GDPR).
          </li>
          <li>
            <strong>Fatturazione e adempimenti fiscali e contabili</strong>: obbligo di legge (art. 6.1.c GDPR).
          </li>
          <li>
            <strong>Sicurezza del servizio, prevenzione delle frodi e tutela dei miei diritti</strong>: legittimo
            interesse (art. 6.1.f GDPR).
          </li>
          <li>
            <strong>Rispondere ai messaggi del modulo contatti</strong>: misure precontrattuali su tua richiesta (art.
            6.1.b GDPR).
          </li>
        </ul>
        <p>
          Fornire i dati del modulo è necessario per attivare il servizio: senza, non posso realizzare il sito. Non uso
          i tuoi dati per marketing né per profilazione e non prendo decisioni automatizzate che ti riguardano.
        </p>
      </Section>

      <Section title="4. Strumenti e fornitori che usano i tuoi dati">
        <p>Per gestire il servizio mi appoggio a questi fornitori:</p>
        <ul>
          <li>
            <strong>Cloudflare, Inc.</strong>: hosting dei siti, del modulo di onboarding e di devleonardis.com.
          </li>
          <li>
            <strong>Google (Google Ireland Ltd.)</strong>: Google Drive per conservare i materiali che carichi, Google
            Sheets per il registro clienti e degli ordini, Gmail per le email di servizio.
          </li>
          <li>
            <strong>Stripe Payments Europe Ltd.</strong>: pagamenti con carta e rinnovi automatici.
          </li>
          <li>
            <strong>PayPal (Europe) S.à r.l. et Cie, S.C.A.</strong>: pagamenti tramite PayPal.
          </li>
          <li>
            <strong>La mia banca</strong>: incasso dei bonifici.
          </li>
          <li>
            <strong>Commercialista</strong>: per gli adempimenti fiscali, limitatamente ai dati di fatturazione.
          </li>
        </ul>
        <p>
          Questi soggetti trattano i dati come responsabili del trattamento per mio conto oppure, per i servizi di
          pagamento e bancari, come titolari autonomi secondo le proprie informative. Non vendo né cedo i tuoi dati a
          terzi per altri scopi.
        </p>
      </Section>

      <Section title="5. Trasferimenti fuori dall&apos;Unione Europea">
        <p>
          Alcuni fornitori (Cloudflare, Google, Stripe, PayPal) possono trattare dati anche negli Stati Uniti o in
          altri paesi extra UE. In questi casi il trasferimento avviene sulla base del Data Privacy Framework UE-USA,
          quando il fornitore vi aderisce, o delle Clausole Contrattuali Standard approvate dalla Commissione Europea
          (art. 45 e 46 GDPR).
        </p>
      </Section>

      <Section title="6. Per quanto tempo li conservo">
        <ul>
          <li>
            <strong>Materiali e dati del sito</strong>: per tutta la durata del servizio e fino a 12 mesi dalla sua
            cessazione, così da poterti aiutare in caso di migrazione; poi li cancello.
          </li>
          <li>
            <strong>Richieste non concluse</strong> (modulo inviato ma pagamento mai effettuato): fino a 12 mesi.
          </li>
          <li>
            <strong>Fatture e documenti contabili</strong>: 10 anni, come previsto dalla legge (art. 2220 c.c.).
          </li>
          <li>
            <strong>Messaggi del modulo contatti</strong>: per il tempo necessario a rispondere e al massimo 24 mesi se
            non segue un incarico.
          </li>
        </ul>
      </Section>

      <Section title="7. Cookie">
        <p>
          devleonardis.com e inizia.devleonardis.com <strong>non usano cookie di profilazione</strong> né strumenti di
          tracciamento pubblicitario o di analisi di terze parti. Possono essere usati solo cookie o memorie locali
          tecniche, necessarie al funzionamento (per esempio il record del minigioco salvato nel tuo browser), che non
          richiedono consenso. Le pagine di pagamento di Stripe e PayPal, su cui vieni reindirizzato, usano i propri
          cookie secondo le rispettive informative.
        </p>
      </Section>

      <Section title="8. I tuoi diritti">
        <p>In qualsiasi momento puoi chiedermi di:</p>
        <ul>
          <li>accedere ai tuoi dati e riceverne copia (art. 15);</li>
          <li>correggerli o aggiornarli (art. 16);</li>
          <li>cancellarli, quando non devo conservarli per legge (art. 17);</li>
          <li>limitarne il trattamento (art. 18);</li>
          <li>riceverli in un formato leggibile per portarli a un altro fornitore (art. 20);</li>
          <li>opporti ai trattamenti basati sul legittimo interesse (art. 21).</li>
        </ul>
        <p>
          Scrivi a <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>: rispondo entro 30 giorni. Se ritieni
          che il trattamento violi il GDPR puoi presentare reclamo al Garante per la protezione dei dati personali (
          <a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer">
            garanteprivacy.it
          </a>
          ).
        </p>
      </Section>

      <Section title="9. Sicurezza">
        <p>
          Le connessioni al sito e al modulo sono cifrate (HTTPS). L&apos;accesso a Drive, al registro e alla casella
          email è limitato al titolare e protetto da autenticazione a due fattori.
        </p>
      </Section>
    </LegalPage>
  );
}
