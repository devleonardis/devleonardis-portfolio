"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Check,
  Sparkles,
  Wine,
} from "lucide-react";

type Dish = {
  id: string;
  name: string;
  category: "degustazione" | "antipasti" | "primi" | "secondi" | "dessert";
  price: number;
  description: string;
  pairing: string;
  dietary?: "gluten-free" | "vegetarian" | "sustainable-fish";
  dietaryLabel?: string;
};

const DISHES: Dish[] = [
  {
    id: "crudo-adriatico",
    name: "Crudo di Gamberi Rossi & Bergamotto",
    category: "antipasti",
    price: 32,
    description: "Gamberi rossi di Gallipoli appena sbarcati, emulsione al bergamotto di Calabria, cialda croccante al nero di seppia e polvere di capperi di Salina.",
    pairing: "Franciacorta Satèn Millesimato 2020",
    dietary: "gluten-free",
    dietaryLabel: "Senza Glutine",
  },
  {
    id: "spaghetto-ricci",
    name: "Spaghettone ai Ricci di Mare & Burro Affumicato",
    category: "primi",
    price: 36,
    description: "Pasta di grano antico pugliese trafilata al bronzo, polpa di ricci freschi, burro montato di malga affumicato al legno di faggio e finocchietto selvatico.",
    pairing: "Fiano di Avellino Riserva DOCG 2021",
    dietary: "sustainable-fish",
    dietaryLabel: "Pescato Locale",
  },
  {
    id: "risotto-zafferano",
    name: "Riso Carnaroli allo Zafferano dell'Aquila & Midollo",
    category: "primi",
    price: 34,
    description: "Riso mantecato con Parmigiano Reggiano 36 mesi vacche rosse, pistilli di zafferano puro, midollo di vitello dorato al flambé e riduzione di fondo bruno.",
    pairing: "Barolo del Comune di Serralunga 2018",
    dietary: "gluten-free",
    dietaryLabel: "Senza Glutine",
  },
  {
    id: "ombrina-brace",
    name: "Ombrina Pescata alla Brace di Ulivo & Carciofo",
    category: "secondi",
    price: 42,
    description: "Filetto cotto sulla brace viva di legno d'ulivo, purea setosa di carciofo violetto di Brindisi, chips croccanti e salsa bernese al timo limonato.",
    pairing: "Verdicchio dei Castelli di Jesi Classico Superiore 2022",
    dietary: "sustainable-fish",
    dietaryLabel: "Pescato Locale",
  },
  {
    id: "cervo-sottobosco",
    name: "Lombetto di Cervo in Crosta di Ginepro & More",
    category: "secondi",
    price: 44,
    description: "Cottura a bassa temperatura rifinita al burro nocciola, salsa alle more selvatiche del Pollino e tuberi invernali arrostiti nella cenere.",
    pairing: "Amarone della Valpolicella Classico DOCG 2017",
    dietary: "gluten-free",
    dietaryLabel: "Senza Glutine",
  },
  {
    id: "degustazione-radici",
    name: "Percorso Degustazione 'Radici & Orizzonti' (7 Portate)",
    category: "degustazione",
    price: 130,
    description: "Un viaggio culinario completo concepito dal nostro Chef: 3 antipasti a mano libera, 2 primi piatti storici, secondo piatto a scelta e gran finale dolce.",
    pairing: "Abbinamento 5 calici curato dal Capo Sommelier (+€ 65)",
    dietary: "sustainable-fish",
    dietaryLabel: "Esperienza d'Autore",
  },
  {
    id: "babà-rum",
    name: "Babà Soffice al Rhum Agricolo & Agrumi Garganici",
    category: "dessert",
    price: 18,
    description: "Lievitazione naturale di 36 ore, sciroppo agli agrumi del Gargano, crema chantilly alla vaniglia Bourbon del Madagascar e perle di gelée al mandarino.",
    pairing: "Moscato di Trani DOC Dolce Naturale 2021",
    dietary: "vegetarian",
    dietaryLabel: "Vegetariano",
  },
];

export default function RistoranteDemoPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("tutti");
  const [dietaryFilter, setDietaryFilter] = useState<string>("all");

  // Reservation System State
  const [partySize, setPartySize] = useState<number>(2);
  const [diningRoom, setDiningRoom] = useState<"terrazza" | "camino" | "chef-table">("terrazza");
  const [reservationDate, setReservationDate] = useState<string>("Stasera, 20:30");
  const [guestName, setGuestName] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [guestNotes, setGuestNotes] = useState("");
  const [reservationConfirmed, setReservationConfirmed] = useState(false);
  const [reservationCode, setReservationCode] = useState("");

  const filteredDishes = DISHES.filter((d) => {
    if (selectedCategory !== "tutti" && d.category !== selectedCategory) return false;
    if (dietaryFilter !== "all" && d.dietary !== dietaryFilter) return false;
    return true;
  });

  const handleReservation = (e: React.FormEvent) => {
    e.preventDefault();
    const code = "NOV-" + Math.floor(10000 + Math.random() * 90000);
    setReservationCode(code);
    setReservationConfirmed(true);
  };

  return (
    <div className="min-h-screen bg-[#09080a] text-zinc-100 font-sans antialiased selection:bg-[#e2a85c] selection:text-black">
      <div>
        {/* Navigation */}
        <header className="border-b border-[#e2a85c]/15 bg-[#09080a]/90 backdrop-blur-md sticky top-0 z-30">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <div className="flex items-center gap-3">
              <span className="font-serif text-2xl font-light tracking-[0.25em] text-[#e2a85c] uppercase">
                NOVECENTO
              </span>
              <span className="hidden sm:inline-block h-4 w-px bg-white/10" />
              <span className="hidden sm:inline-block text-[10px] tracking-widest text-zinc-400 uppercase">
                Cucina Contemporanea & Cantina
              </span>
            </div>

            <nav className="hidden md:flex items-center gap-8 text-xs tracking-wider text-zinc-300 uppercase">
              <a href="#menu" className="hover:text-[#e2a85c] transition-colors">La Carta & Percorsi</a>
              <a href="#prenota" className="hover:text-[#e2a85c] transition-colors">Prenota un Tavolo</a>
              <a href="#filosofia" className="hover:text-[#e2a85c] transition-colors">Lo Chef & Cantina</a>
            </nav>

            <a
              href="#prenota"
              className="rounded-full border border-[#e2a85c] bg-[#e2a85c]/10 px-5 py-2 text-xs font-semibold text-[#e2a85c] hover:bg-[#e2a85c] hover:text-black transition-all shadow-md shadow-[#e2a85c]/10"
            >
              Riserva un Tavolo
            </a>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative overflow-hidden px-6 py-24 md:py-36 text-center border-b border-[#e2a85c]/10 bg-gradient-to-b from-[#131016] via-[#09080a] to-[#09080a]">
          {/* Candlelight glow backdrop */}
          <div className="pointer-events-none absolute -top-24 left-1/2 -z-10 size-[550px] -translate-x-1/2 rounded-full bg-[#e2a85c]/10 blur-[120px]" />

          <div className="mx-auto max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#e2a85c]/30 bg-[#e2a85c]/5 px-4 py-1 text-xs text-[#e2a85c] mb-6 tracking-widest uppercase">
              <Sparkles className="size-3" />
              <span>Guida Michelin 2026 • Due Forchette Gambero Rosso</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal text-white tracking-tight leading-[1.08]">
              L&apos;arte dell&apos;essenziale, l&apos;emozione del gusto.
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base text-zinc-400 font-light leading-relaxed">
              Materia prima autoctona pugliese, fermentazioni spontanee e tecniche di fiamma viva. Un&apos;esperienza sensoriale che riscrive la memoria gastronomica mediterranea.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#menu"
                className="rounded-full bg-[#e2a85c] px-8 py-3.5 text-xs font-bold tracking-widest text-black uppercase transition-all hover:brightness-110 shadow-xl shadow-[#e2a85c]/20"
              >
                Esplora il Menù d&apos;Autore
              </a>
              <a
                href="#prenota"
                className="rounded-full border border-white/20 bg-white/5 px-8 py-3.5 text-xs font-semibold tracking-widest text-white uppercase backdrop-blur-md hover:bg-white/10"
              >
                Riserva un Tavolo
              </a>
            </div>
          </div>
        </section>

        {/* Interactive Tasting Menu & Alla Carta Explorer */}
        <section id="menu" className="mx-auto max-w-5xl px-6 py-20 scroll-mt-24">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#e2a85c]">
              La Nostra Proposta Gastronomica
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-white mt-2">
              Percorsi & Piatti alla Carta
            </h2>
            <p className="text-xs text-zinc-400 mt-2">
              Seleziona la portata e scopri l&apos;abbinamento enologico consigliato dal nostro sommelier.
            </p>

            {/* Category Switcher */}
            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {[
                { id: "tutti", label: "Tutte le Portate" },
                { id: "degustazione", label: "Percorso Degustazione" },
                { id: "antipasti", label: "Antipasti & Crudi" },
                { id: "primi", label: "Primi Piatti" },
                { id: "secondi", label: "Secondi alla Brace" },
                { id: "dessert", label: "Dolci d'Autore" },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`rounded-full px-4 py-1.5 text-xs font-medium tracking-wider transition-all ${
                    selectedCategory === cat.id
                      ? "bg-[#e2a85c] text-black font-bold shadow-md shadow-[#e2a85c]/20"
                      : "border border-white/10 bg-white/5 text-zinc-300 hover:border-[#e2a85c]/40"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Dietary filters */}
            <div className="mt-4 flex justify-center gap-3 text-xs text-zinc-400">
              <button
                onClick={() => setDietaryFilter("all")}
                className={`hover:text-white ${dietaryFilter === "all" ? "text-[#e2a85c] underline font-semibold" : ""}`}
              >
                Tutti
              </button>
              <span>•</span>
              <button
                onClick={() => setDietaryFilter("gluten-free")}
                className={`hover:text-white ${dietaryFilter === "gluten-free" ? "text-[#e2a85c] underline font-semibold" : ""}`}
              >
                Senza Glutine
              </button>
              <span>•</span>
              <button
                onClick={() => setDietaryFilter("sustainable-fish")}
                className={`hover:text-white ${dietaryFilter === "sustainable-fish" ? "text-[#e2a85c] underline font-semibold" : ""}`}
              >
                Pescato Locale
              </button>
            </div>
          </div>

          {/* Dishes List */}
          <div className="space-y-4">
            {filteredDishes.map((dish) => (
              <div
                key={dish.id}
                className="group rounded-2xl border border-white/10 bg-[#121016] p-6 hover:border-[#e2a85c]/40 transition-all duration-300 shadow-md"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <h3 className="font-serif text-lg font-bold text-white group-hover:text-[#e2a85c] transition-colors">
                      {dish.name}
                    </h3>
                    {dish.dietaryLabel && (
                      <span className="rounded-full bg-[#e2a85c]/15 border border-[#e2a85c]/30 px-2.5 py-0.5 text-[10px] text-[#e2a85c] font-medium">
                        {dish.dietaryLabel}
                      </span>
                    )}
                  </div>
                  <span className="font-serif text-lg font-bold text-[#e2a85c]">
                    € {dish.price}
                  </span>
                </div>

                <p className="mt-2 text-xs text-zinc-400 leading-relaxed max-w-3xl">
                  {dish.description}
                </p>

                {/* Sommelier Pairing */}
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-2 text-xs text-zinc-400 font-light">
                  <Wine className="size-3.5 text-[#e2a85c] shrink-0" />
                  <span>
                    <strong className="text-zinc-200 font-medium">Calice Consigliato:</strong> {dish.pairing}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Interactive Table Reservation Engine */}
        <section id="prenota" className="mx-auto max-w-4xl px-6 py-20 border-t border-[#e2a85c]/10 scroll-mt-24">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#e2a85c]">
              Esperienza d&apos;Accoglienza
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-white mt-2">
              Prenotazione Tavolo Riservata
            </h2>
            <p className="text-xs text-zinc-400 mt-2">
              Seleziona l&apos;atmosfera della sala, l&apos;orario e il numero di commensali.
            </p>
          </div>

          <div className="rounded-3xl border border-[#e2a85c]/30 bg-[#121016] p-6 sm:p-10 shadow-2xl">
            {!reservationConfirmed ? (
              <form onSubmit={handleReservation} className="space-y-6">
                {/* 1. Dining Room Selection */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-3">
                    1. Scegli l&apos;Atmosfera / Sala:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { id: "terrazza", title: "Terrazza Panoramica", desc: "Vista aperta sul mare, brezza serale e luci soffuse." },
                      { id: "camino", title: "Sala Storica del Camino", desc: "Volte in pietra a vista, candele e massima privacy." },
                      { id: "chef-table", title: "Chef's Table Esclusivo", desc: "Fronte brigata, degustazione narrata dal vivo." },
                    ].map((room) => (
                      <button
                        type="button"
                        key={room.id}
                        onClick={() => setDiningRoom(room.id as "terrazza" | "camino" | "chef-table")}
                        className={`p-4 rounded-2xl border text-left transition-all ${
                          diningRoom === room.id
                            ? "border-[#e2a85c] bg-[#e2a85c]/10 shadow-md ring-1 ring-[#e2a85c]"
                            : "border-white/10 bg-white/5 hover:border-white/20 text-zinc-400"
                        }`}
                      >
                        <h4 className="font-serif font-bold text-sm text-white">{room.title}</h4>
                        <p className="text-[11px] text-zinc-400 mt-1">{room.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Guests & Time Slot */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                      2. Numero Ospiti:
                    </label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 6, 8].map((num) => (
                        <button
                          type="button"
                          key={num}
                          onClick={() => setPartySize(num)}
                          className={`flex-1 py-2 rounded-xl border text-xs font-bold transition-all ${
                            partySize === num
                              ? "border-[#e2a85c] bg-[#e2a85c] text-black shadow"
                              : "border-white/10 bg-white/5 text-zinc-300 hover:border-white/20"
                          }`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                      3. Data & Servizio:
                    </label>
                    <select
                      value={reservationDate}
                      onChange={(e) => setReservationDate(e.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-black/60 px-3 py-2 text-xs text-white outline-none focus:border-[#e2a85c]"
                    >
                      <option value="Stasera, 20:30">Stasera alle 20:30 (Cena)</option>
                      <option value="Stasera, 21:30">Stasera alle 21:30 (Cena)</option>
                      <option value="Domani, 13:00">Domani alle 13:00 (Pranzo)</option>
                      <option value="Domani, 20:45">Domani alle 20:45 (Cena)</option>
                      <option value="Venerdì, 21:00">Venerdì alle 21:00 (Cena)</option>
                    </select>
                  </div>
                </div>

                {/* 3. Guest Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-white/10 pt-4">
                  <div>
                    <label className="block text-xs text-zinc-300 mb-1">Nome e Cognome *</label>
                    <input
                      type="text"
                      required
                      placeholder="es. Laura Mancini"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-black/50 px-3.5 py-2 text-xs text-white outline-none focus:border-[#e2a85c]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-zinc-300 mb-1">Recapito Telefonico *</label>
                    <input
                      type="tel"
                      required
                      placeholder="es. +39 333 4455667"
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-black/50 px-3.5 py-2 text-xs text-white outline-none focus:border-[#e2a85c]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-zinc-300 mb-1">
                    Note di Cucina (Allergie, Celiachia, Anniversario)
                  </label>
                  <input
                    type="text"
                    placeholder="Segnalaci eventuali intolleranze o richieste particolari"
                    value={guestNotes}
                    onChange={(e) => setGuestNotes(e.target.value)}
                    className="w-full rounded-xl border border-white/15 bg-black/50 px-3.5 py-2 text-xs text-white outline-none focus:border-[#e2a85c]"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <span className="text-[11px] text-zinc-500">
                    Dress code: Smart Casual • Nessun addebito preventivo
                  </span>
                  <button
                    type="submit"
                    className="w-full sm:w-auto rounded-full bg-[#e2a85c] px-8 py-3 text-xs font-bold uppercase tracking-wider text-black hover:brightness-110 shadow-lg shadow-[#e2a85c]/20"
                  >
                    Conferma Riservazione
                  </button>
                </div>
              </form>
            ) : (
              <div className="py-8 text-center space-y-4">
                <div className="size-16 rounded-full bg-[#e2a85c]/20 text-[#e2a85c] border border-[#e2a85c] flex items-center justify-center mx-auto">
                  <Check className="size-8" />
                </div>
                <h3 className="font-serif text-2xl font-normal text-white">
                  Tavolo Riservato con Eleganza
                </h3>
                <p className="text-xs text-zinc-400 max-w-md mx-auto leading-relaxed">
                  Gentile <strong>{guestName || "Ospite"}</strong>, vi attendiamo in {diningRoom === "terrazza" ? "Terrazza Panoramica" : diningRoom === "camino" ? "Sala del Camino" : "Chef's Table"} per <strong>{partySize} persone ({reservationDate})</strong>.
                </p>
                <div className="inline-block rounded-xl border border-[#e2a85c]/40 bg-[#e2a85c]/10 px-4 py-2 font-mono text-sm font-bold text-[#e2a85c]">
                  Codice Prenotazione: {reservationCode}
                </div>
                <p className="text-[11px] text-zinc-500">
                  Un messaggio di benvenuto è stato registrato. Il tavolo resterà a vostra disposizione per l&apos;intera durata del servizio.
                </p>
                <button
                  onClick={() => setReservationConfirmed(false)}
                  className="mt-4 rounded-full border border-white/20 bg-white/5 px-6 py-2 text-xs font-semibold text-white hover:bg-white/10"
                >
                  Modifica o Nuova Prenotazione
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Chef Philosophy & Accolades */}
        <section id="filosofia" className="border-t border-[#e2a85c]/10 bg-[#0d0b0f] px-6 py-20 text-center">
          <div className="mx-auto max-w-4xl">
            <span className="font-serif text-4xl text-[#e2a85c]">&ldquo;</span>
            <p className="font-serif text-xl sm:text-2xl font-light text-zinc-200 italic -mt-4 leading-relaxed">
              La cucina autentica non cerca di stupire con artifici, ma di commuovere attraverso la verità della terra e la maestria del fuoco.
            </p>
            <p className="mt-4 text-xs tracking-widest text-[#e2a85c] uppercase">
              Executive Chef Davide Silvestri
            </p>

            <div className="mt-12 flex flex-wrap items-center justify-center gap-10 text-xs text-zinc-400 border-t border-white/5 pt-8">
              <div>
                <span className="block font-serif text-xl font-bold text-white">1.800+</span>
                <span>Etichette in Cantina Storica</span>
              </div>
              <div>
                <span className="block font-serif text-xl font-bold text-white">100%</span>
                <span>Filiera Corta Certificata</span>
              </div>
              <div>
                <span className="block font-serif text-xl font-bold text-white">12</span>
                <span>Tavoli Esclusivi per Servizio</span>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 bg-black px-6 py-12 text-center text-xs text-zinc-500">
          <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="font-serif text-zinc-300">
              Novecento Ristorante Gourmet • Piattaforma digitale firmata DevLeonardis
            </p>
            <div className="flex items-center gap-4">
              <Link href="/#projects" className="text-[#e2a85c] hover:underline font-semibold">Portfolio DevLeonardis</Link>
              <span>•</span>
              <a href="https://wa.me/393665252021" target="_blank" rel="noopener noreferrer" className="hover:text-white">Contatta lo Sviluppatore</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
