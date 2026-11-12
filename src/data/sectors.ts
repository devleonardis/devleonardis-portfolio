// Landing di settore su /siti/<slug>. Solo italiano, come le pagine legali.
// Niente promesse di risultato (condizioni, punto 10) e, per la salute, niente testimonianze.

export type Sector = {
  slug: string;
  onboarding: "bnb" | "artigiani" | "beauty" | "salute"; // valore del campo "settore" su inizia.devleonardis.com
  name: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  lead: string;
  demo: { href: string; label: string };
  problems: { title: string; text: string }[];
  sections: string[];
  suggested: "start" | "business";
  suggestedWhy: string;
  material: string[];
  faq: { q: string; a: string }[];
  note?: string;
};

export const sectors: Sector[] = [
  {
    slug: "bnb-case-vacanza",
    onboarding: "bnb",
    name: "B&B e case vacanza",
    metaTitle: "Sito web per B&B e case vacanza",
    metaDescription:
      "Sito per B&B e case vacanza con camere, foto, posizione e richiesta di disponibilità su WhatsApp. Da 99 € + 79 €/anno, online in 14 giorni.",
    eyebrow: "Siti per B&B e case vacanza",
    title: "Un sito tuo, per farti prenotare anche fuori dai portali",
    lead: "Camere, foto, servizi e posizione in una pagina chiara. Gli ospiti ti scrivono su WhatsApp o via email per chiedere disponibilità, senza passare dalle commissioni dei portali.",
    demo: { href: "https://demo-bnb.devleonardis.com", label: "demo-bnb.devleonardis.com" },
    problems: [
      {
        title: "Dipendi solo dai portali",
        text: "Chi ti trova su Booking o Airbnb e torna una seconda volta ha bisogno di un posto dove contattarti direttamente.",
      },
      {
        title: "Le foto sono sparse",
        text: "Instagram, portali e Google Maps mostrano versioni diverse della struttura. Il sito raccoglie tutto in un solo indirizzo.",
      },
      {
        title: "Gli ospiti chiedono sempre le stesse cose",
        text: "Check-in, parcheggio, colazione, distanza dal centro: le risposte stanno sul sito e tu rispondi meno messaggi.",
      },
    ],
    sections: [
      "Presentazione della struttura con foto grandi",
      "Camere o appartamenti con servizi e capienza",
      "Galleria fotografica",
      "Servizi inclusi (colazione, wi-fi, parcheggio, animali)",
      "Posizione con mappa e cosa c'è vicino",
      "Richiesta di disponibilità via WhatsApp o email",
      "Informazioni utili: check-in, check-out, regole della casa",
      "Codice identificativo (CIN) nel piè di pagina",
    ],
    suggested: "business",
    suggestedWhy:
      "Con Business puoi avere una pagina per ogni camera o appartamento e la scheda Google Business curata, utile per chi cerca \"B&B a\" più la tua città.",
    material: [
      "Foto della struttura e delle camere",
      "Nome, indirizzo e CIN",
      "Elenco camere con posti letto e servizi",
      "Orari di check-in e check-out, regole della casa",
    ],
    faq: [
      {
        q: "Il sito ha un calendario con prenotazione e pagamento online?",
        a: "No: gli ospiti ti mandano una richiesta di disponibilità su WhatsApp o via email e confermi tu. Un motore di prenotazione è una funzionalità in più e si preventiva a parte.",
      },
      {
        q: "Posso mettere i link a Booking e Airbnb?",
        a: "Sì, puoi avere i pulsanti verso i tuoi annunci accanto al contatto diretto.",
      },
      {
        q: "Il sito è anche in inglese?",
        a: "Il piano include il sito in una lingua. La traduzione in altre lingue si preventiva a parte.",
      },
      {
        q: "Cambiano i prezzi o apro una camera nuova: cosa faccio?",
        a: "Mi scrivi e aggiorno io: rientra nelle piccole modifiche incluse nel canone (2 l'anno con Start, 6 con Business).",
      },
    ],
  },
  {
    slug: "artigiani",
    onboarding: "artigiani",
    name: "Artigiani e impiantisti",
    metaTitle: "Sito web per artigiani e impiantisti",
    metaDescription:
      "Sito per idraulici, elettricisti, falegnami e impiantisti: servizi, zona di lavoro, lavori fatti e richiesta di preventivo su WhatsApp. Da 99 € + 79 €/anno.",
    eyebrow: "Siti per artigiani e impiantisti",
    title: "Fatti trovare da chi cerca un artigiano nella tua zona",
    lead: "Servizi, zone servite e foto dei lavori fatti, con il pulsante per chiamarti o chiedere un preventivo su WhatsApp. Pensato per idraulici, elettricisti, falegnami, imbianchini e impiantisti.",
    demo: { href: "https://demo-artigiani.devleonardis.com", label: "demo-artigiani.devleonardis.com" },
    problems: [
      {
        title: "Vivi di passaparola",
        text: "Chi riceve il tuo nome da un amico ti cerca su Google prima di chiamare. Un sito chiaro gli dà la conferma che cercava.",
      },
      {
        title: "Non hai tempo per i social",
        text: "Il sito lo preparo io con il materiale che mi mandi. Tu continui a lavorare in cantiere.",
      },
      {
        title: "Ti chiamano per lavori che non fai",
        text: "Servizi e zone servite scritti bene filtrano le richieste prima che arrivino al telefono.",
      },
    ],
    sections: [
      "Chi sei e da quanto lavori",
      "Servizi offerti, uno per uno",
      "Zone e comuni serviti",
      "Foto dei lavori fatti, prima e dopo",
      "Pulsanti per chiamare e per WhatsApp sempre visibili",
      "Modulo per chiedere un preventivo",
      "Orari, reperibilità ed eventuale pronto intervento",
      "Dati aziendali e P.IVA nel piè di pagina",
    ],
    suggested: "start",
    suggestedWhy:
      "Start basta per una pagina con servizi, foto e contatti. Business conviene se vuoi una pagina per ogni servizio e la scheda Google Business curata per farti trovare in più comuni.",
    material: [
      "Logo, se ce l'hai",
      "Foto di lavori fatti (anche dal telefono)",
      "Elenco servizi e comuni in cui lavori",
      "Recapiti, orari e P.IVA",
    ],
    faq: [
      {
        q: "Non ho un logo. È un problema?",
        a: "No: uso il nome della ditta con un carattere pulito. Se poi fai un logo, lo sostituisco con una piccola modifica.",
      },
      {
        q: "Le foto fatte col telefono vanno bene?",
        a: "Sì, purché siano a fuoco e luminose. Le ritaglio e le ottimizzo io per il sito.",
      },
      {
        q: "Posso aggiungere nuovi lavori nella galleria?",
        a: "Sì: aggiungere foto nelle sezioni esistenti è una piccola modifica inclusa nel canone.",
      },
      {
        q: "Mi garantisci di uscire primo su Google?",
        a: "No, nessuno può garantirlo onestamente. Il sito è veloce, fatto bene per i motori di ricerca e, con Business, curo anche la scheda Google Business.",
      },
    ],
  },
  {
    slug: "estetiste-barbieri",
    onboarding: "beauty",
    name: "Estetiste, parrucchieri e barbieri",
    metaTitle: "Sito web per estetiste, parrucchieri e barbieri",
    metaDescription:
      "Sito per centri estetici, parrucchieri e barbieri con listino trattamenti, foto del salone, orari e prenotazione su WhatsApp. Da 99 € + 79 €/anno.",
    eyebrow: "Siti per estetiste, parrucchieri e barbieri",
    title: "Il tuo salone, il tuo listino, un messaggio per prenotare",
    lead: "Trattamenti con prezzi e durata, foto del salone e del team, orari aggiornati. Le clienti prenotano con un messaggio WhatsApp già compilato.",
    demo: { href: "https://demo-beauty.devleonardis.com", label: "demo-beauty.devleonardis.com" },
    problems: [
      {
        title: "Il listino è solo su Instagram",
        text: "Chi ti scopre per la prima volta non trova prezzi e durata dei trattamenti e ti scrive per chiederli.",
      },
      {
        title: "Gli orari cambiano e nessuno lo sa",
        text: "Chiusure, aperture straordinarie e ferie stanno in un posto solo, che aggiorno io quando me lo chiedi.",
      },
      {
        title: "Ti cercano su Google Maps",
        text: "Un sito collegato alla scheda Google fa capire subito chi sei, dove sei e cosa offri.",
      },
    ],
    sections: [
      "Presentazione del salone con foto",
      "Listino trattamenti con prezzo e durata",
      "Il team",
      "Galleria dei lavori",
      "Prenotazione con messaggio WhatsApp precompilato",
      "Orari e giorni di chiusura",
      "Come arrivare, con mappa",
      "Link a Instagram e Facebook",
    ],
    suggested: "start",
    suggestedWhy:
      "Start basta per salone, listino e prenotazione su WhatsApp. Business conviene se hai molti trattamenti da dividere in pagine o più operatori da presentare.",
    material: [
      "Logo e foto del salone",
      "Listino con prezzi e durata",
      "Orari e giorni di chiusura",
      "Profili social",
    ],
    faq: [
      {
        q: "Posso avere la prenotazione online con il calendario?",
        a: "Il sito include la prenotazione su WhatsApp. Se usi già un gestionale di prenotazioni, metto il pulsante che porta lì. Un calendario integrato si preventiva a parte.",
      },
      {
        q: "Cambio i prezzi del listino: quanto mi costa?",
        a: "Niente in più: aggiornare prezzi e trattamenti rientra nelle piccole modifiche incluse nel canone.",
      },
      {
        q: "Posso mostrare le foto dei lavori fatti sulle clienti?",
        a: "Sì, se hai il loro consenso a pubblicarle. Le foto le scegli e me le mandi tu.",
      },
      {
        q: "Ho già una pagina Instagram curata: mi serve un sito?",
        a: "Instagram è ottimo per farti vedere; il sito è dove chi ti cerca su Google trova listino, orari e indirizzo senza avere un account.",
      },
    ],
  },
  {
    slug: "fisioterapisti-nutrizionisti",
    onboarding: "salute",
    name: "Fisioterapisti, nutrizionisti e personal trainer",
    metaTitle: "Sito web per fisioterapisti, nutrizionisti e personal trainer",
    metaDescription:
      "Sito per fisioterapisti, nutrizionisti e personal trainer con trattamenti, percorso, modalità (studio, domicilio, online) e iscrizione all'albo. Da 99 € + 79 €/anno.",
    eyebrow: "Siti per fisioterapisti, nutrizionisti e personal trainer",
    title: "Un sito professionale, chiaro e in regola",
    lead: "Chi sei, cosa tratti e come lavori, con l'iscrizione all'albo in evidenza e il pulsante per fissare una prima visita. Scritto rispettando le regole sulla comunicazione sanitaria.",
    demo: { href: "https://demo-salute.devleonardis.com", label: "demo-salute.devleonardis.com" },
    problems: [
      {
        title: "I pazienti vogliono capire prima di chiamare",
        text: "Cosa tratti, come si svolge la prima visita, se lavori a domicilio o online: il sito risponde prima del primo contatto.",
      },
      {
        title: "La comunicazione sanitaria ha regole precise",
        text: "Niente testimonianze né promesse di risultato, iscrizione all'albo visibile. Il template è costruito già così.",
      },
      {
        title: "Lavori in più modi",
        text: "Studio, domicilio e online hanno ciascuno il suo spazio, con zone servite e modalità di contatto.",
      },
    ],
    sections: [
      "Presentazione del professionista con foto",
      "Iscrizione all'albo e formazione",
      "Trattamenti o aree di intervento",
      "Come si svolge il percorso, passo per passo",
      "Modalità: in studio, a domicilio, online",
      "Foto dello studio",
      "Contatto per la prima visita su WhatsApp o via email",
      "Dati fiscali e informazioni obbligatorie",
    ],
    suggested: "business",
    suggestedWhy:
      "Con Business puoi dedicare una pagina a ogni area di intervento e curare la scheda Google Business, utile per chi cerca \"fisioterapista\" o \"nutrizionista\" più la tua città.",
    material: [
      "Foto tua e dello studio",
      "Numero di iscrizione all'albo (se previsto per la tua professione)",
      "Trattamenti o servizi che offri",
      "Modalità di lavoro e zone servite",
    ],
    faq: [
      {
        q: "Posso pubblicare le recensioni dei miei pazienti?",
        a: "Per le professioni sanitarie le testimonianze sul sito sono sconsigliate dalle regole deontologiche, quindi il template non le prevede. Le recensioni restano sulla tua scheda Google.",
      },
      {
        q: "Sono personal trainer, non ho un albo. Va bene lo stesso?",
        a: "Sì: al posto dell'albo mettiamo certificazioni e formazione. Il resto del sito è uguale.",
      },
      {
        q: "Posso scrivere i risultati che ottengo con i pazienti?",
        a: "No: il sito descrive cosa fai e come lavori, senza promettere risultati. È una tutela anche per te.",
      },
      {
        q: "I contenuti li scrivi tu?",
        a: "Parto dalle informazioni che mi dai e ti propongo i testi. Li controlli e approvi prima della pubblicazione: la scelta finale resta tua.",
      },
    ],
    note: "I contenuti del sito restano sotto la tua responsabilità professionale: ti propongo testi conformi alle regole sulla pubblicità sanitaria, ma la verifica finale con il tuo ordine resta a te.",
  },
];

export const plans = [
  {
    id: "start" as const,
    name: "Start",
    setup: "99 €",
    yearly: "79 €",
    features: [
      "Sito one-page sul template del tuo settore",
      "Form contatti e pulsante WhatsApp",
      "Dominio a tuo nome, hosting e SSL inclusi",
      "2 piccole modifiche l'anno",
    ],
  },
  {
    id: "business" as const,
    name: "Business",
    setup: "249 €",
    yearly: "149 €",
    features: [
      "Fino a 5 pagine",
      "SEO locale e scheda Google Business",
      "Dominio a tuo nome, hosting e SSL inclusi",
      "6 piccole modifiche l'anno",
    ],
  },
];

export const getSector = (slug: string) => sectors.find((s) => s.slug === slug);
