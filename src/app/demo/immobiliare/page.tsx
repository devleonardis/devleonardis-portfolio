"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Bath,
  Bed,
  Check,
  Compass,
  Home,
  MapPin,
  Maximize2,
  X,
} from "lucide-react";

type Property = {
  id: string;
  title: string;
  location: string;
  zone: "como" | "milano" | "firenze" | "smeralda" | "roma";
  type: "villa" | "attico" | "casale";
  typeLabel: string;
  price: number; // 0 for Trattativa Riservata
  priceFormatted: string;
  surface: number; // m2
  bedrooms: number;
  bathrooms: number;
  energyClass: string;
  image: string;
  tag: string;
  features: string[];
  description: string;
};

const PROPERTIES: Property[] = [
  {
    id: "villa-bellagio",
    title: "Villa Miradouro sul Lago di Como",
    location: "Bellagio (CO)",
    zone: "como",
    type: "villa",
    typeLabel: "Villa con Parco",
    price: 3850000,
    priceFormatted: "€ 3.850.000",
    surface: 540,
    bedrooms: 6,
    bathrooms: 7,
    energyClass: "A4 Green",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80",
    tag: "Fronte Lago Esclusivo",
    features: ["Piscina a sfioro riscaldata", "Darsena privata con motoscafo", "Parco secolare di 4.000 m²", "Ascensore interno"],
    description: "Dimora contemporanea incastonata nella roccia sopra Bellagio con vista a 180° sul lago. Finiture in ceppo di Gré, vetrate cielo-terra a taglio termico e domotica di livello yachting.",
  },
  {
    id: "attico-brera",
    title: "Penthouse Giardino Verticale Brera",
    location: "Milano Centro, Brera",
    zone: "milano",
    type: "attico",
    typeLabel: "Attico Panoramico",
    price: 2450000,
    priceFormatted: "€ 2.450.000",
    surface: 290,
    bedrooms: 4,
    bathrooms: 4,
    energyClass: "A3",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    tag: "Terrazza 110 m²",
    features: ["Idromassaggio su rooftop", "Servizio concierge H24", "Box quadruplo interrato", "Cantina vini climatizzata"],
    description: "Attico esclusivo all'ultimo piano con serra bioclimatica, pavimento continuo in rovere affumicato a spina ungherese e scenografico terrazzo panoramico sullo skyline milanese.",
  },
  {
    id: "casale-chianti",
    title: "Tenuta Storica Vigneti del Chianti",
    location: "Greve in Chianti (FI)",
    zone: "firenze",
    type: "casale",
    typeLabel: "Casale Storico",
    price: 1980000,
    priceFormatted: "€ 1.980.000",
    surface: 460,
    bedrooms: 5,
    bathrooms: 5,
    energyClass: "B",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80",
    tag: "3 Ettari Vigneto DOCG",
    features: ["Cantina di vinificazione attiva", "Piscina salina in travertino", "Forno a legna del '700", "Dependance custodi"],
    description: "Restauro conservativo magistrale di un borgo rurale toscano del XVIII secolo. Soffitti a volte di cotto sabbiato, camini storici monumentali e uliveto biologico produttivo.",
  },
  {
    id: "villa-porto-cervo",
    title: "Villa Cala di Volpe Panorama",
    location: "Porto Cervo, Costa Smeralda (SS)",
    zone: "smeralda",
    type: "villa",
    typeLabel: "Villa con Parco",
    price: 4900000,
    priceFormatted: "€ 4.900.000",
    surface: 620,
    bedrooms: 7,
    bathrooms: 8,
    energyClass: "A4",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    tag: "Accesso Diretto al Mare",
    features: ["Discesa privata alla spiaggia", "Architettura scultorea organica", "Helipad autorizzato", "SPA interna con sauna svedese"],
    description: "Capolavoro architettonico incastonato tra il granito sardo e la macchia mediterranea. Volumi sinuosi, patio esterno coperto di 200 m² e tramonti indimenticabili sul Golfo.",
  },
  {
    id: "attico-parioli",
    title: "Dimora Storica con Loggia Imperiale",
    location: "Roma, Quartiere Parioli",
    zone: "roma",
    type: "attico",
    typeLabel: "Attico Panoramico",
    price: 2150000,
    priceFormatted: "€ 2.150.000",
    surface: 310,
    bedrooms: 4,
    bathrooms: 4,
    energyClass: "A2",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    tag: "Palazzo d'Epoca",
    features: ["Stucchi originali restaurati", "Affacci aperti su Villa Borghese", "Garage doppio", "Impianto geotermico"],
    description: "Al piano nobile di una palazzina razionalista firmata da celebre architetto. Altezze soffitti 3.80m, loggia colonnata e salone di rappresentanza di 90 m².",
  },
];

export default function ImmobiliareDemoPage() {
  const [selectedZone, setSelectedZone] = useState<string>("tutte");
  const [selectedType, setSelectedType] = useState<string>("tutte");
  const [maxPrice, setMaxPrice] = useState<number>(5000000);
  const [activeProperty, setActiveProperty] = useState<Property | null>(null);

  // Financial Mortgage Calculator State
  const [calcPropertyPrice, setCalcPropertyPrice] = useState<number>(2500000);
  const [calcDownPaymentPercent, setCalcDownPaymentPercent] = useState<number>(20);
  const [calcDurationYears, setCalcDurationYears] = useState<number>(25);
  const [calcInterestRate, setCalcInterestRate] = useState<number>(2.9);

  // Real formula calculation for fixed monthly payment: M = P * [ r(1+r)^n ] / [ (1+r)^n - 1]
  const downPaymentAmount = Math.round(calcPropertyPrice * (calcDownPaymentPercent / 100));
  const principal = calcPropertyPrice - downPaymentAmount;
  const monthlyRate = calcInterestRate / 100 / 12;
  const totalMonths = calcDurationYears * 12;
  const monthlyPayment =
    monthlyRate > 0
      ? Math.round(
          (principal * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))) /
            (Math.pow(1 + monthlyRate, totalMonths) - 1)
        )
      : Math.round(principal / totalMonths);
  const totalInterest = Math.round(monthlyPayment * totalMonths - principal);

  const filteredProperties = PROPERTIES.filter((p) => {
    if (selectedZone !== "tutte" && p.zone !== selectedZone) return false;
    if (selectedType !== "tutte" && p.type !== selectedType) return false;
    if (p.price > maxPrice) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#0b0e14] text-zinc-100 font-sans antialiased selection:bg-[#c5a880] selection:text-black">
      {activeProperty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="relative max-w-3xl w-full rounded-3xl bg-[#12161f] border border-white/10 p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveProperty(null)}
              className="absolute top-4 right-4 rounded-full p-2 text-zinc-400 hover:text-white hover:bg-white/10"
            >
              <X className="size-5" />
            </button>

            <img
              src={activeProperty.image}
              alt={activeProperty.title}
              className="w-full h-72 sm:h-96 object-cover rounded-2xl"
            />

            <div className="mt-6 flex flex-wrap items-start justify-between gap-4">
              <div>
                <span className="text-xs font-semibold text-[#c5a880] uppercase tracking-wider">
                  {activeProperty.typeLabel} • {activeProperty.location}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mt-1">
                  {activeProperty.title}
                </h3>
              </div>
              <div className="text-right">
                <span className="text-2xl sm:text-3xl font-mono font-bold text-[#c5a880]">
                  {activeProperty.priceFormatted}
                </span>
                <p className="text-[11px] text-zinc-400">Classe Energetica: {activeProperty.energyClass}</p>
              </div>
            </div>

            <p className="mt-4 text-sm text-zinc-300 leading-relaxed">
              {activeProperty.description}
            </p>

            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 border-y border-white/10 py-4 text-xs">
              <div>
                <span className="text-zinc-400">Superficie</span>
                <p className="font-bold text-white text-sm">{activeProperty.surface} m²</p>
              </div>
              <div>
                <span className="text-zinc-400">Camere</span>
                <p className="font-bold text-white text-sm">{activeProperty.bedrooms} Suites</p>
              </div>
              <div>
                <span className="text-zinc-400">Bagni</span>
                <p className="font-bold text-white text-sm">{activeProperty.bathrooms}</p>
              </div>
              <div>
                <span className="text-zinc-400">Efficienza</span>
                <p className="font-bold text-emerald-400 text-sm">{activeProperty.energyClass}</p>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
                Dotazioni & Caratteristiche Esclusive:
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-300">
                {activeProperty.features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <Check className="size-3.5 text-[#c5a880]" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs text-zinc-400">
                Codice Riferimento: PL-{activeProperty.id.toUpperCase()}
              </span>
              <a
                href={`https://wa.me/393665252021?text=${encodeURIComponent(
                  `Vorrei richiedere una private viewing per la proprietà: ${activeProperty.title}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl bg-[#c5a880] px-6 py-3 text-xs font-bold text-black uppercase tracking-wider hover:brightness-110 shadow-lg"
              >
                Prenota Private Viewing Riservata
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Main Container */}
      <div>
        {/* Navigation */}
        <header className="border-b border-white/10 bg-[#0b0e14]/90 backdrop-blur-md sticky top-0 z-30">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="size-9 rounded-xl border border-[#c5a880]/40 bg-[#c5a880]/10 flex items-center justify-center text-[#c5a880]">
                <Compass className="size-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-lg font-bold tracking-widest text-white uppercase">
                  PRESTIGE LIVING
                </span>
                <span className="text-[10px] tracking-widest text-[#c5a880] uppercase -mt-1">
                  Exclusive Italian Estates
                </span>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-8 text-xs font-medium tracking-wider text-zinc-300 uppercase">
              <a href="#dimore" className="hover:text-[#c5a880] transition-colors">Collezione Dimore</a>
              <a href="#calcolatore" className="hover:text-[#c5a880] transition-colors">Calcolo Mutuo</a>
              <a href="#concierge" className="hover:text-[#c5a880] transition-colors">Private Advisory</a>
            </nav>

            <a
              href="#dimore"
              className="rounded-xl border border-[#c5a880]/60 bg-[#c5a880]/15 px-4 py-2 text-xs font-semibold text-[#c5a880] hover:bg-[#c5a880] hover:text-black transition-all"
            >
              Esplora Proprietà
            </a>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative overflow-hidden px-6 py-24 md:py-32 text-center bg-gradient-to-b from-[#10141d] to-[#0b0e14] border-b border-white/10">
          <div className="mx-auto max-w-4xl">
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.3em] text-[#c5a880] mb-4">
              Private Portfolio • 2026 Collection
            </span>

            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal text-white tracking-tight leading-[1.1]">
              Dimore straordinarie per esistenze senza compromessi.
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base text-zinc-400 leading-relaxed">
              Selezione confidenziale di tenute storiche, attici di prestigio e ville fronte lago nelle località più esclusive e desiderate d&apos;Italia.
            </p>
          </div>
        </section>

        {/* Multi-Filter Search Bar */}
        <section id="dimore" className="mx-auto max-w-7xl px-6 -mt-8 scroll-mt-24">
          <div className="rounded-2xl border border-white/15 bg-[#141923] p-6 shadow-2xl backdrop-blur-xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Zone Filter */}
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5 flex items-center gap-1.5">
                  <MapPin className="size-3.5 text-[#c5a880]" />
                  Località Geografica
                </label>
                <select
                  value={selectedZone}
                  onChange={(e) => setSelectedZone(e.target.value)}
                  className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-xs text-white outline-none focus:border-[#c5a880]"
                >
                  <option value="tutte">Tutte le destinazioni</option>
                  <option value="como">Lago di Como & Brianza</option>
                  <option value="milano">Milano (Brera & Centro)</option>
                  <option value="firenze">Firenze & Colline del Chianti</option>
                  <option value="smeralda">Costa Smeralda (Porto Cervo)</option>
                  <option value="roma">Roma (Parioli & Centro)</option>
                </select>
              </div>

              {/* Type Filter */}
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5 flex items-center gap-1.5">
                  <Home className="size-3.5 text-[#c5a880]" />
                  Tipologia Immobile
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-xs text-white outline-none focus:border-[#c5a880]"
                >
                  <option value="tutte">Tutte le tipologie</option>
                  <option value="villa">Ville con Parco & Piscina</option>
                  <option value="attico">Attici Panoramici</option>
                  <option value="casale">Casali & Tenute Storiche</option>
                </select>
              </div>

              {/* Price Filter */}
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                  Budget Massimo: € {(maxPrice / 1000000).toFixed(1)}M
                </label>
                <input
                  type="range"
                  min="1500000"
                  max="5000000"
                  step="250000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#c5a880] cursor-pointer h-2 bg-zinc-800 rounded-lg mt-2"
                />
              </div>

              {/* Counter status */}
              <div className="flex flex-col justify-end">
                <div className="rounded-xl bg-white/5 border border-white/10 p-2.5 text-center">
                  <span className="text-xs text-zinc-400">Dimore Disponibili:</span>
                  <p className="font-serif font-bold text-lg text-[#c5a880]">
                    {filteredProperties.length} Proprietà Trovate
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Properties Grid */}
        <section className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((prop) => (
              <div
                key={prop.id}
                className="group rounded-3xl border border-white/10 bg-[#121620] overflow-hidden flex flex-col justify-between hover:border-[#c5a880]/50 transition-all duration-300 shadow-xl"
              >
                <div>
                  {/* Image container */}
                  <div className="relative aspect-[16/11] overflow-hidden bg-zinc-900">
                    <img
                      src={prop.image}
                      alt={prop.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <span className="absolute top-4 left-4 rounded-full bg-black/75 backdrop-blur-md px-3 py-1 text-xs font-semibold text-[#c5a880] border border-white/10">
                      {prop.tag}
                    </span>
                    <span className="absolute top-4 right-4 rounded-full bg-black/75 backdrop-blur-md px-2.5 py-1 text-[11px] font-mono text-white border border-white/10">
                      {prop.energyClass}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="p-6">
                    <span className="text-xs font-medium text-[#c5a880] uppercase tracking-wider">
                      {prop.location}
                    </span>
                    <h3 className="font-serif text-xl font-bold text-white mt-1 group-hover:text-[#c5a880] transition-colors">
                      {prop.title}
                    </h3>

                    {/* Metrics Row */}
                    <div className="mt-4 flex items-center justify-between border-y border-white/10 py-3 text-xs text-zinc-400">
                      <span className="flex items-center gap-1.5">
                        <Maximize2 className="size-3.5 text-[#c5a880]" />
                        {prop.surface} m²
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Bed className="size-3.5 text-[#c5a880]" />
                        {prop.bedrooms} Camere
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Bath className="size-3.5 text-[#c5a880]" />
                        {prop.bathrooms} Bagni
                      </span>
                    </div>

                    <p className="mt-4 text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                      {prop.description}
                    </p>
                  </div>
                </div>

                {/* Footer action */}
                <div className="p-6 pt-0 flex items-center justify-between gap-4">
                  <span className="font-serif text-xl font-bold text-white">
                    {prop.priceFormatted}
                  </span>
                  <button
                    onClick={() => setActiveProperty(prop)}
                    className="rounded-xl border border-[#c5a880] bg-[#c5a880]/10 px-4 py-2 text-xs font-bold text-[#c5a880] hover:bg-[#c5a880] hover:text-black transition-all"
                  >
                    Dettagli Dimora →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Real Interactive Mortgage Financial Calculator */}
        <section id="calcolatore" className="mx-auto max-w-5xl px-6 py-20 border-t border-white/10 scroll-mt-24">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#c5a880]">
              Simulazione Finanziaria in Tempo Reale
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-white mt-2">
              Calcolatore Interattivo Rata Mutuo
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-2">
              Modifica i parametri per calcolare la rata mensile stimata, gli interessi e il piano di ammortamento.
            </p>
          </div>

          <div className="rounded-3xl border border-white/15 bg-[#121620] p-6 sm:p-10 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Sliders Input */}
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-zinc-400 font-medium">Valore Immobile</span>
                    <span className="font-mono font-bold text-white text-sm">
                      € {calcPropertyPrice.toLocaleString()}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="500000"
                    max="5000000"
                    step="100000"
                    value={calcPropertyPrice}
                    onChange={(e) => setCalcPropertyPrice(Number(e.target.value))}
                    className="w-full accent-[#c5a880] cursor-pointer h-2 bg-zinc-800 rounded-lg"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-zinc-400 font-medium">Anticipo / Capitale Proprio ({calcDownPaymentPercent}%)</span>
                    <span className="font-mono font-bold text-white text-sm">
                      € {downPaymentAmount.toLocaleString()}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="60"
                    step="5"
                    value={calcDownPaymentPercent}
                    onChange={(e) => setCalcDownPaymentPercent(Number(e.target.value))}
                    className="w-full accent-[#c5a880] cursor-pointer h-2 bg-zinc-800 rounded-lg"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-zinc-400 mb-1.5">Durata Anni</label>
                    <select
                      value={calcDurationYears}
                      onChange={(e) => setCalcDurationYears(Number(e.target.value))}
                      className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-xs text-white outline-none font-mono"
                    >
                      <option value="15">15 Anni (180 rate)</option>
                      <option value="20">20 Anni (240 rate)</option>
                      <option value="25">25 Anni (300 rate)</option>
                      <option value="30">30 Anni (360 rate)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-zinc-400 mb-1.5">Tasso Fisso Annuo (%)</label>
                    <select
                      value={calcInterestRate}
                      onChange={(e) => setCalcInterestRate(Number(e.target.value))}
                      className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-xs text-white outline-none font-mono"
                    >
                      <option value="2.5">2.50% (Condizione Premium)</option>
                      <option value="2.9">2.90% (Standard 2026)</option>
                      <option value="3.4">3.40% (Tasso Mercato)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Dynamic Output Box */}
              <div className="rounded-2xl border border-[#c5a880]/30 bg-gradient-to-b from-[#181d28] to-[#121620] p-6 text-center space-y-4">
                <span className="text-[11px] font-semibold text-[#c5a880] uppercase tracking-wider block">
                  Rata Mensile Stimata
                </span>
                <p className="font-serif text-4xl sm:text-5xl font-bold text-white tracking-tight">
                  € {monthlyPayment.toLocaleString()}
                  <span className="text-sm font-normal text-zinc-400 font-sans"> / mese</span>
                </p>

                <div className="border-t border-white/10 pt-4 space-y-2 text-xs text-zinc-400">
                  <div className="flex justify-between">
                    <span>Importo Finanziato:</span>
                    <span className="text-white font-mono">€ {principal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Totale Interessi Stimati:</span>
                    <span className="text-white font-mono">€ {totalInterest.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Imposta Sostitutiva (0.25% prima casa):</span>
                    <span className="text-white font-mono">€ {Math.round(principal * 0.0025).toLocaleString()}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <span className="text-[10px] text-zinc-500 block leading-tight">
                    * Calcolo stimato con metodo di ammortamento francese a rata costante e tasso fisso BCE indicativo.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 bg-[#07090d] px-6 py-12 text-center text-xs text-zinc-500">
          <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="font-serif font-semibold text-zinc-300">
              Prestige Living Estates S.r.l. • Sviluppo piattaforma immobiliare a cura di DevLeonardis
            </p>
            <div className="flex items-center gap-4">
              <Link href="/#projects" className="text-[#c5a880] hover:underline font-semibold">Portfolio DevLeonardis</Link>
              <span>•</span>
              <a href="https://wa.me/393665252021" target="_blank" rel="noopener noreferrer" className="hover:text-white">Contatta lo Sviluppatore</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
