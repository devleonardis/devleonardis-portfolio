import type { Metadata } from "next";

import LegalPage, { Section } from "@/components/LegalPage";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Condizioni del servizio",
  description:
    "Condizioni del servizio siti web DevLeonardis per piccole attività: piani Start e Business, consegna in 14 giorni, piccole modifiche, rinnovo e disdetta.",
  alternates: { canonical: "/condizioni" },
};

const UPDATED = "12 novembre 2026";

export default function CondizioniPage() {
  return (
    <LegalPage
      title="Condizioni del servizio"
      updated={UPDATED}
      intro={
        <p>
          Queste condizioni regolano il servizio di realizzazione e gestione di siti web per piccole attività
          offerto da <strong className="text-limestone">{siteConfig.fullName}</strong> ({siteConfig.name}). Inviando
          il modulo su{" "}
          <a className="text-phosphor underline-offset-4 hover:underline" href="https://inizia.devleonardis.com">
            inizia.devleonardis.com
          </a>{" "}
          e pagando, dichiari di averle lette e accettate.
        </p>
      }
    >
      <Section title="1. Chi fornisce il servizio">
        <ul>
          <li>
            <strong>Fornitore:</strong> {siteConfig.fullName}, ditta individuale ({siteConfig.name})
          </li>
          <li>
            <strong>Sede:</strong> {siteConfig.address}
          </li>
          <li>
            <strong>P.IVA:</strong> {siteConfig.vatNumber}
          </li>
          <li>
            <strong>Contatti:</strong> <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> ·{" "}
            {siteConfig.phoneDisplay}
          </li>
        </ul>
        <p>
          Il fornitore aderisce al regime forfettario: le operazioni sono effettuate senza applicazione dell&apos;IVA
          ai sensi dell&apos;art. 1, commi 54-89, della Legge 190/2014. I prezzi indicati sono quindi importi finali.
        </p>
      </Section>

      <Section title="2. Piani e prezzi">
        <p>Il servizio prevede un costo di attivazione una tantum e un canone annuale.</p>
        <ul>
          <li>
            <strong>Start</strong>: 99 € di attivazione + 79 € l&apos;anno. Sito one-page sul template del settore,
            form contatti e pulsante WhatsApp, 2 piccole modifiche l&apos;anno.
          </li>
          <li>
            <strong>Business</strong>: 249 € di attivazione + 149 € l&apos;anno. Sito fino a 5 pagine, SEO locale e
            configurazione della scheda Google Business, 6 piccole modifiche l&apos;anno.
          </li>
        </ul>
        <p>
          In entrambi i piani il canone comprende registrazione e rinnovo del dominio (estensioni standard come .it o
          .com; domini a tariffa maggiorata si concordano a parte), hosting, certificato SSL e manutenzione tecnica.
          Al momento dell&apos;ordine si pagano l&apos;attivazione e il primo anno di canone.
        </p>
        <p>
          Si può pagare con carta (Stripe), PayPal o bonifico. Con la carta il canone si rinnova in automatico; con
          PayPal o bonifico ricevi la richiesta di pagamento prima della scadenza.
        </p>
      </Section>

      <Section title="3. Consegna entro 14 giorni">
        <p>
          Il sito viene pubblicato <strong>entro 14 giorni di calendario</strong> dal momento in cui si verificano
          entrambe queste condizioni:
        </p>
        <ul>
          <li>il pagamento è confermato (per il bonifico, quando l&apos;importo è accreditato);</li>
          <li>
            ho ricevuto il materiale completo: testi o informazioni sull&apos;attività, servizi, orari, logo e foto
            necessari a costruire il sito.
          </li>
        </ul>
        <p>
          Se il materiale arriva incompleto ti scrivo cosa manca; i 14 giorni partono quando lo ricevo. Prima della
          pubblicazione ti invio un&apos;anteprima per controllare i contenuti. Se una tua risposta (approvazione,
          correzioni, accesso a un dominio esistente) tarda, la consegna slitta degli stessi giorni.
        </p>
      </Section>

      <Section title="4. Cosa si intende per piccola modifica">
        <p>
          Il canone include un numero di piccole modifiche l&apos;anno (2 per Start, 6 per Business). Una piccola
          modifica è un intervento sui contenuti già presenti nel sito, per esempio:
        </p>
        <ul>
          <li>aggiornare o correggere testi esistenti;</li>
          <li>cambiare orari, prezzi, recapiti o link;</li>
          <li>sostituire o aggiungere foto nelle sezioni esistenti;</li>
          <li>aggiungere o togliere una voce da un elenco esistente (un servizio, una camera, un trattamento).</li>
        </ul>
        <p>
          Una richiesta che raggruppa più cambi inviati insieme nella stessa email conta come una modifica. Non sono
          piccole modifiche, e si preventivano a parte:
        </p>
        <ul>
          <li>nuove sezioni o nuove pagine;</li>
          <li>cambi di grafica, struttura o template (redesign);</li>
          <li>nuove funzionalità (prenotazioni, e-commerce, aree riservate, integrazioni);</li>
          <li>traduzioni del sito in altre lingue.</li>
        </ul>
        <p>
          Le modifiche non usate non si accumulano sull&apos;anno successivo. Le eseguo di norma entro 5 giorni
          lavorativi dalla richiesta.
        </p>
      </Section>

      <Section title="5. Contenuti e responsabilità del cliente">
        <p>
          Sei responsabile dei contenuti che mi fornisci: devono essere veritieri e devi avere il diritto di usarli
          (foto, loghi, testi). Se la tua attività è soggetta a regole specifiche sulla comunicazione, come le
          professioni sanitarie, i contenuti devono rispettarle: niente promesse di risultato né testimonianze dove
          non consentite, e indicazione dell&apos;iscrizione all&apos;albo quando prevista. Posso proporre modifiche ai
          testi ma la scelta finale resta tua.
        </p>
        <p>
          Il sito pubblicato è un sito vetrina: obblighi legati alla tua attività (per esempio informativa privacy
          dei tuoi clienti, dati fiscali da mostrare) restano a tuo carico. Se me li fornisci, li inserisco.
        </p>
      </Section>

      <Section title="6. Dominio intestato a te">
        <p>
          Il dominio viene registrato <strong>a nome tuo</strong> (o della tua attività): ne sei il titolare anche se
          la gestione tecnica la curo io. Se hai già un dominio, resta tuo e lo collego al sito. In qualsiasi momento
          puoi chiedere i codici per trasferirlo.
        </p>
      </Section>

      <Section title="7. Durata, rinnovo e disdetta">
        <p>
          Il servizio dura un anno dalla pubblicazione e si rinnova di anno in anno. Almeno{" "}
          <strong>30 giorni prima della scadenza</strong> ti mando un&apos;email con data e importo del rinnovo.
        </p>
        <p>
          Puoi disdire in qualsiasi momento scrivendo a{" "}
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>. La disdetta ha effetto alla fine
          dell&apos;anno già pagato: il sito resta online fino a quella data e il rinnovo successivo non viene
          addebitato. Per evitare l&apos;addebito automatico con carta, la disdetta deve arrivare prima della data di
          rinnovo.
        </p>
        <p>
          Se il rinnovo non viene pagato entro 15 giorni dalla scadenza, il sito può essere sospeso. Il dominio resta
          comunque tuo.
        </p>
      </Section>

      <Section title="8. Uscita e migrazione assistita">
        <p>
          Se vuoi spostare il sito altrove, a fine servizio o in qualsiasi momento, ti fornisco il necessario per
          farlo: trasferimento del dominio, esportazione dei tuoi contenuti (testi, foto, logo) e dei file statici del
          sito. La <strong>migrazione assistita costa 19,99 €</strong> una tantum e comprende il supporto tecnico per
          il passaggio al nuovo fornitore o hosting.
        </p>
        <p>
          Il codice del template e i componenti riutilizzati su più siti restano di proprietà del fornitore; ti viene
          concessa una licenza d&apos;uso illimitata dei file del tuo sito così come esportati.
        </p>
      </Section>

      {/*
        DA VERIFICARE CON UN PROFESSIONISTA (avvocato o commercialista) prima della pubblicazione:
        - il servizio è venduto sia a professionisti/imprese (con P.IVA, fuori dal Codice del Consumo)
          sia potenzialmente a consumatori;
        - per i consumatori la clausola si basa su artt. 52, 57 c. 3 e 59 lett. a) e c) D.Lgs. 206/2005
          (recesso 14 giorni; esecuzione anticipata su richiesta espressa; perdita del recesso a prestazione completa;
          esclusione per servizi/beni personalizzati). Va confermata l'applicabilità al caso concreto, in particolare
          la qualificazione del sito come "personalizzato", la raccolta del consenso espresso nel form di onboarding
          (oggi c'è una sola casella generica) e l'eventuale modulo tipo di recesso (Allegato I, parte B).
      */}
      <Section title="9. Diritto di recesso">
        <p>
          <strong>Se acquisti come professionista o impresa</strong> (con Partita IVA, per la tua attività), il diritto
          di recesso previsto dal Codice del Consumo non si applica. Puoi comunque annullare l&apos;ordine con
          rimborso completo scrivendomi prima che io abbia iniziato a lavorare al sito.
        </p>
        <p>
          <strong>Se acquisti come consumatore</strong>, hai diritto di recedere entro 14 giorni dal pagamento, senza
          dover dare motivazioni, scrivendo a <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>{" "}
          (artt. 52 e seguenti del D.Lgs. 206/2005). Inviando il materiale e chiedendo di iniziare entro i 14 giorni,
          chiedi espressamente che il lavoro parta subito durante il periodo di recesso. In questo caso:
        </p>
        <ul>
          <li>se recedi prima che il sito sia pubblicato, ti rimborso quanto pagato meno la parte proporzionale al
            lavoro già svolto fino alla comunicazione del recesso;</li>
          <li>una volta che il sito è pubblicato con la tua approvazione, la prestazione di realizzazione è completa e
            il diritto di recesso sull&apos;attivazione non è più esercitabile, perché si tratta di un lavoro fatto
            su misura per te.</li>
        </ul>
        <p>
          Resta sempre possibile disdire il rinnovo come descritto al punto 7. I rimborsi avvengono con lo stesso
          metodo usato per pagare, entro 14 giorni dalla comunicazione del recesso.
        </p>
      </Section>

      <Section title="10. Disponibilità e responsabilità">
        <p>
          Il sito è ospitato su infrastruttura Cloudflare. Mi impegno a mantenerlo online e funzionante, ma non posso
          garantire l&apos;assenza totale di interruzioni dovute a fornitori terzi o a cause di forza maggiore. Salvo
          dolo o colpa grave, la responsabilità del fornitore è limitata a quanto pagato dal cliente negli ultimi 12
          mesi. Non garantisco risultati commerciali (numero di contatti, prenotazioni o posizionamento su Google).
        </p>
      </Section>

      <Section title="11. Privacy">
        <p>
          I dati che mi invii sono trattati come descritto nell&apos;<a href="/privacy">informativa privacy</a>.
        </p>
      </Section>

      <Section title="12. Legge applicabile e foro">
        <p>
          Queste condizioni sono regolate dalla legge italiana. Per i professionisti e le imprese è competente in via
          esclusiva il foro di Bari; per i consumatori è competente il foro del luogo di residenza o domicilio del
          consumatore. Il fornitore può aggiornare queste condizioni: le modifiche valgono dal rinnovo successivo e ti
          vengono comunicate con l&apos;avviso di rinnovo.
        </p>
      </Section>
    </LegalPage>
  );
}
