"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Calendar,
  Check,
  HeartPulse,
  Phone,
  Shield,
  Sparkles,
} from "lucide-react";

type Doctor = {
  id: string;
  name: string;
  role: string;
  department: "odontoiatria" | "dermatologia" | "cardiologia" | "fisioterapia";
  departmentLabel: string;
  image: string;
  albo: string;
  rating: number;
  reviewsCount: number;
  availableNext: string;
};

const DOCTORS: Doctor[] = [
  {
    id: "dr-moretti",
    name: "Prof. Vincenzo Moretti",
    role: "Direttore Sanitario • Chirurgia Maxillo-Facciale & Implantologia",
    department: "odontoiatria",
    departmentLabel: "Odontoiatria & Chirurgia",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80",
    albo: "Iscrizione Albo Medici n. 14820",
    rating: 4.9,
    reviewsCount: 384,
    availableNext: "Domani alle 10:30",
  },
  {
    id: "dr-serra",
    name: "Dott.ssa Elena Serra",
    role: "Specialista in Dermatologia Clinica & Laserterapia Avanzata",
    department: "dermatologia",
    departmentLabel: "Dermatologia & Laser",
    image: "https://images.unsplash.com/photo-1594824813629-456094362a93?auto=format&fit=crop&w=600&q=80",
    albo: "Iscrizione Albo Medici n. 18291",
    rating: 5.0,
    reviewsCount: 290,
    availableNext: "Mercoledì alle 15:00",
  },
  {
    id: "dr-barone",
    name: "Dott. Marco Barone",
    role: "Cardiologo Interventista • Diagnostica Ecocardiografica 4D",
    department: "cardiologia",
    departmentLabel: "Cardiologia",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=80",
    albo: "Iscrizione Albo Medici n. 12944",
    rating: 4.8,
    reviewsCount: 215,
    availableNext: "Giovedì alle 09:30",
  },
  {
    id: "dr-gentile",
    name: "Dott. Matteo Gentile",
    role: "Responsabile Riabilitazione Motoria & Fisioterapia Posturale",
    department: "fisioterapia",
    departmentLabel: "Fisioterapia",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=600&q=80",
    albo: "Albo Professioni Sanitarie n. 5819",
    rating: 4.9,
    reviewsCount: 167,
    availableNext: "Venerdì alle 11:00",
  },
];

export default function ClinicaDemoPage() {
  // Before / After Slider state
  const [sliderPosition, setSliderPosition] = useState<number>(50);

  // Booking Engine state
  const [bookingStep, setBookingStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedDept, setSelectedDept] = useState<string>("odontoiatria");
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor>(DOCTORS[0]);
  const [selectedDate, setSelectedDate] = useState<string>("Mer 18 Nov");
  const [selectedTime, setSelectedTime] = useState<string>("10:30");
  const [patientName, setPatientName] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingCode, setBookingCode] = useState("");

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = "CSP-" + Math.floor(10000 + Math.random() * 90000);
    setBookingCode(code);
    setBookingConfirmed(true);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans antialiased selection:bg-teal-600 selection:text-white">
      <div>
        {/* Top Emergency & Insurance Ticker */}
        <div className="bg-[#0f172a] text-slate-300 py-2.5 px-6 border-b border-slate-800 text-xs">
          <div className="mx-auto max-w-7xl flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-teal-400 font-semibold">
                <span className="size-2 rounded-full bg-teal-400 animate-ping" />
                Pronto Soccorso Odontoiatrico & Urgenze H24 Attivo
              </span>
              <span className="hidden md:inline text-slate-500">•</span>
              <span className="hidden md:inline">Convenzionato con Unisalute, Metasalute, Fasi, Previmedical</span>
            </div>
            <div className="flex items-center gap-4 font-mono">
              <a href="tel:+390805559821" className="flex items-center gap-1.5 hover:text-white">
                <Phone className="size-3 text-teal-400" />
                080 555 9821
              </a>
              <span>•</span>
              <span className="text-slate-400">Via Sparano 42, Bari (BA)</span>
            </div>
          </div>
        </div>

        {/* Clinic Main Header */}
        <header className="border-b border-slate-200 bg-white/95 backdrop-blur-md sticky top-0 z-30">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-xl bg-gradient-to-br from-teal-600 to-cyan-700 flex items-center justify-center text-white shadow-md shadow-teal-700/20">
                <HeartPulse className="size-6" />
              </div>
              <div>
                <span className="text-lg font-bold tracking-tight text-slate-900 block leading-tight">
                  Clinica San Pietro
                </span>
                <span className="text-[11px] font-medium text-teal-700 uppercase tracking-wider block">
                  Istituto Polispecialistico
                </span>
              </div>
            </div>

            <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-600">
              <a href="#prenota" className="hover:text-teal-700 transition-colors">Prenota Visita</a>
              <a href="#prima-dopo" className="hover:text-teal-700 transition-colors">Risultati Clinici</a>
              <a href="#medici" className="hover:text-teal-700 transition-colors">Équipe Medica</a>
              <a href="#convenzioni" className="hover:text-teal-700 transition-colors">Convenzioni</a>
            </nav>

            <a
              href="#prenota"
              className="flex items-center gap-2 rounded-xl bg-teal-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-teal-600/20 hover:bg-teal-700 transition-all"
            >
              <Calendar className="size-3.5" />
              Prenota Online (Zero Attesa)
            </a>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-slate-100 px-6 py-16 md:py-24 border-b border-slate-200">
          <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-teal-50 border border-teal-200 px-3.5 py-1 text-xs font-semibold text-teal-800 mb-6">
                <Shield className="size-3.5 text-teal-600" />
                Eccellenza Medica & Tecnologie Diagnostiche 3D
              </div>

              <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-950 leading-[1.12]">
                La medicina d&apos;eccellenza, con il tempo e la cura che meriti.
              </h1>

              <p className="mt-6 text-base sm:text-lg text-slate-600 leading-relaxed">
                Più di 25 medici specialisti, sale operatorie autorizzate e diagnostica avanzata in un unico polo a Bari. Tempi d&apos;attesa azzerati e refertazione immediata sul tuo smartphone.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#prenota"
                  className="rounded-xl bg-teal-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-teal-600/25 hover:bg-teal-700 transition-all"
                >
                  Prenota una Visita Specialistica
                </a>
                <a
                  href="tel:+390805559821"
                  className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm"
                >
                  <Phone className="size-4 text-teal-600" />
                  Chiama il Centralino
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="mt-12 grid grid-cols-3 gap-6 border-t border-slate-200 pt-8">
                <div>
                  <p className="text-2xl font-black text-slate-900 font-mono">1.240+</p>
                  <p className="text-xs text-slate-500 mt-0.5">Pazienti / Mese</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-teal-600 font-mono">4.9 / 5</p>
                  <p className="text-xs text-slate-500 mt-0.5">Recensioni Certificate</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-slate-900 font-mono">24h</p>
                  <p className="text-xs text-slate-500 mt-0.5">Refertazione Digitale</p>
                </div>
              </div>
            </div>

            {/* Hero Image Showcase */}
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 bg-slate-900">
                <img
                  src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80"
                  alt="Clinica San Pietro interno poliambulatorio"
                  className="w-full h-[420px] object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-white/40 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-slate-900">Reparto Odontoiatrico & Scanner Intraorale 3D</p>
                      <p className="text-[11px] text-slate-600">Impronte digitali senza paste e dolore in 90 secondi</p>
                    </div>
                    <span className="rounded-full bg-teal-100 text-teal-800 text-[11px] font-bold px-2.5 py-1">
                      Attivo Oggi
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Before / After Slider Section */}
        <section id="prima-dopo" className="mx-auto max-w-5xl px-6 py-20 scroll-mt-24">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600">
              Casi Clinici & Risultati
            </span>
            <h2 className="text-3xl font-black tracking-tight text-slate-950 mt-1">
              Confronto Prima e Dopo il Trattamento
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Trascina il cursore per osservare la precisione dei nostri interventi di riabilitazione estetica e sbiancamento laser 3D.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl">
            {/* The Before/After Interactive Comparison Box */}
            <div className="relative h-[280px] sm:h-[400px] w-full rounded-2xl overflow-hidden select-none bg-slate-100">
              {/* After Image (Background) */}
              <img
                src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=80"
                alt="Dopo il trattamento - Sorriso perfetto"
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              />
              <span className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 rounded-full bg-teal-600/90 backdrop-blur-md px-2.5 py-1 text-[11px] sm:text-xs font-bold text-white shadow">
                Risultato Finale
              </span>

              {/* Before Image (Clipped via CSS clipPath for exact alignment) */}
              <img
                src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1200&q=80"
                alt="Prima del trattamento"
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
              />
              <span className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 rounded-full bg-slate-900/80 backdrop-blur-md px-2.5 py-1 text-[11px] sm:text-xs font-bold text-white shadow">
                Condizione Iniziale
              </span>

              {/* Drag Divider Line */}
              <div
                className="absolute inset-y-0 w-1 bg-white shadow-2xl pointer-events-none flex items-center justify-center"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="size-8 rounded-full bg-teal-600 text-white flex items-center justify-center shadow-lg border-2 border-white -ml-3.5">
                  <Sparkles className="size-3.5" />
                </div>
              </div>

              {/* Range input invisible overlay for tactile drag */}
              <input
                type="range"
                min="5"
                max="95"
                value={sliderPosition}
                onChange={(e) => setSliderPosition(Number(e.target.value))}
                className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full"
                aria-label="Slider prima e dopo trattamento"
              />
            </div>

            <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
              <span>← Trascina a sinistra per vedere il risultato finale</span>
              <span>Trascina a destra per vedere la condizione di partenza →</span>
            </div>
          </div>
        </section>

        {/* 4-Step Interactive Booking Engine */}
        <section id="prenota" className="mx-auto max-w-5xl px-6 py-20 border-t border-slate-200 scroll-mt-24">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600">
              Sistema di Prenotazione Diretto
            </span>
            <h2 className="text-3xl font-black tracking-tight text-slate-950 mt-1">
              Prenota la tua visita in 4 semplici passaggi
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Scegli la specialità, seleziona il medico e blocca subito l&apos;orario che preferisci.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-2xl">
            {/* Step Indicators */}
            <div className="grid grid-cols-4 gap-2 mb-8 border-b border-slate-100 pb-6 text-center">
              {[
                { num: 1, label: "1. Specialità" },
                { num: 2, label: "2. Medico" },
                { num: 3, label: "3. Data & Ora" },
                { num: 4, label: "4. Conferma" },
              ].map((s) => (
                <div key={s.num} className="flex flex-col items-center">
                  <div
                    className={`size-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      bookingStep === s.num
                        ? "bg-teal-600 text-white ring-4 ring-teal-100"
                        : bookingStep > s.num
                        ? "bg-teal-100 text-teal-800"
                        : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    {bookingStep > s.num ? <Check className="size-4" /> : s.num}
                  </div>
                  <span className="mt-1.5 text-xs font-medium hidden sm:inline text-slate-700">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Step 1: Select Specialty */}
            {bookingStep === 1 && (
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-4">
                  Seleziona l&apos;Area Medica o il Servizio:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { id: "odontoiatria", title: "Odontoiatria & Chirurgia Orale", sub: "Implantologia 3D, igiene con air-flow, allineatori invisibili" },
                    { id: "dermatologia", title: "Dermatologia & Laserterapia", sub: "Mappatura nei in epiluminescenza, laser cicatrici, dermatologia clinica" },
                    { id: "cardiologia", title: "Cardiologia & Diagnostica", sub: "Elettrocardiogramma, ecocardiogramma color doppler, holter 24h" },
                    { id: "fisioterapia", title: "Fisioterapia & Riabilitazione", sub: "Tecarterapia, ginnastica posturale, onde d'urto focali" },
                  ].map((dept) => (
                    <button
                      key={dept.id}
                      onClick={() => {
                        setSelectedDept(dept.id);
                        const matchDoc = DOCTORS.find((d) => d.department === dept.id) || DOCTORS[0];
                        setSelectedDoctor(matchDoc);
                        setBookingStep(2);
                      }}
                      className={`text-left p-5 rounded-2xl border transition-all ${
                        selectedDept === dept.id
                          ? "border-teal-600 bg-teal-50/50 shadow-sm"
                          : "border-slate-200 hover:border-teal-400 hover:bg-slate-50"
                      }`}
                    >
                      <h4 className="font-bold text-slate-900 text-sm">{dept.title}</h4>
                      <p className="text-xs text-slate-500 mt-1">{dept.sub}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Select Doctor */}
            {bookingStep === 2 && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-slate-900">
                    Seleziona lo Specialista:
                  </h3>
                  <button
                    onClick={() => setBookingStep(1)}
                    className="text-xs font-semibold text-teal-600 hover:underline"
                  >
                    ← Cambia Specialità
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {DOCTORS.filter(
                    (d) => d.department === selectedDept || selectedDept === "tutti"
                  ).map((doc) => (
                    <button
                      key={doc.id}
                      onClick={() => {
                        setSelectedDoctor(doc);
                        setBookingStep(3);
                      }}
                      className={`flex gap-4 p-4 rounded-2xl border text-left transition-all ${
                        selectedDoctor.id === doc.id
                          ? "border-teal-600 bg-teal-50/50 shadow-sm"
                          : "border-slate-200 hover:border-teal-400 hover:bg-slate-50"
                      }`}
                    >
                      <img
                        src={doc.image}
                        alt={doc.name}
                        className="size-16 rounded-xl object-cover bg-slate-200 shrink-0"
                      />
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">{doc.name}</h4>
                        <p className="text-xs text-slate-600 mt-0.5">{doc.role}</p>
                        <p className="text-[11px] font-semibold text-teal-700 mt-2">
                          Prossimo slot: {doc.availableNext}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Select Date & Time */}
            {bookingStep === 3 && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      Scegli Data e Fascia Oraria
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Con {selectedDoctor.name}
                    </p>
                  </div>
                  <button
                    onClick={() => setBookingStep(2)}
                    className="text-xs font-semibold text-teal-600 hover:underline"
                  >
                    ← Cambia Medico
                  </button>
                </div>

                {/* Day selector */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
                  {["Mer 18 Nov", "Gio 19 Nov", "Ven 20 Nov", "Lun 23 Nov"].map((day) => (
                    <button
                      key={day}
                      onClick={() => setSelectedDate(day)}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        selectedDate === day
                          ? "border-teal-600 bg-teal-600 text-white font-bold shadow-md"
                          : "border-slate-200 hover:border-slate-300 bg-slate-50 text-slate-700"
                      }`}
                    >
                      <span className="block text-xs">{day}</span>
                      <span className="text-[10px] opacity-80">4 slot liberi</span>
                    </button>
                  ))}
                </div>

                {/* Time slot selector */}
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Orari Disponibili:
                </h4>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {["09:00", "10:30", "11:45", "15:00", "16:30", "18:00"].map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`py-2 px-3 rounded-lg border text-xs font-mono font-medium transition-all ${
                        selectedTime === time
                          ? "border-teal-600 bg-teal-50 text-teal-900 font-bold ring-2 ring-teal-600"
                          : "border-slate-200 hover:border-slate-400 text-slate-700"
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>

                <div className="mt-8 flex justify-end">
                  <button
                    onClick={() => setBookingStep(4)}
                    className="rounded-xl bg-teal-600 px-6 py-2.5 text-xs font-bold text-white hover:bg-teal-700 transition-colors shadow-md"
                  >
                    Continua con i Tuoi Dati →
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Patient Details & Confirm */}
            {bookingStep === 4 && (
              <div>
                {!bookingConfirmed ? (
                  <form onSubmit={handleBookingSubmit} className="space-y-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-slate-900">
                        Riepilogo e Dati del Paziente
                      </h3>
                      <button
                        type="button"
                        onClick={() => setBookingStep(3)}
                        className="text-xs font-semibold text-teal-600 hover:underline"
                      >
                        ← Modifica Orario
                      </button>
                    </div>

                    <div className="rounded-2xl bg-teal-50/70 border border-teal-200 p-4 text-xs text-teal-950 flex flex-wrap gap-4 justify-between items-center">
                      <div>
                        <strong>Visita:</strong> {selectedDoctor.role}
                        <br />
                        <strong>Specialista:</strong> {selectedDoctor.name}
                      </div>
                      <div className="text-right">
                        <strong>Data:</strong> {selectedDate} ore {selectedTime}
                        <br />
                        <span className="text-teal-700 font-semibold">Zero anticipo • Paghi in sede</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Nome e Cognome Paziente *
                        </label>
                        <input
                          type="text"
                          required
                          value={patientName}
                          onChange={(e) => setPatientName(e.target.value)}
                          placeholder="es. Mario Rossi"
                          className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs outline-none focus:border-teal-600"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Numero di Cellulare (per SMS promemoria) *
                        </label>
                        <input
                          type="tel"
                          required
                          value={patientPhone}
                          onChange={(e) => setPatientPhone(e.target.value)}
                          placeholder="es. 347 1234567"
                          className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs outline-none focus:border-teal-600"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Indirizzo Email (per referti e pass visita) *
                      </label>
                      <input
                        type="email"
                        required
                        value={patientEmail}
                        onChange={(e) => setPatientEmail(e.target.value)}
                        placeholder="es. mario.rossi@email.it"
                        className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs outline-none focus:border-teal-600"
                      />
                    </div>

                    <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <span className="text-[11px] text-slate-500">
                        🔒 Dati protetti secondo Regolamento UE 2016/679 (GDPR Sanità)
                      </span>
                      <button
                        type="submit"
                        className="w-full sm:w-auto rounded-xl bg-teal-600 px-8 py-3 text-xs font-bold text-white hover:bg-teal-700 transition-colors shadow-lg shadow-teal-600/20"
                      >
                        Conferma Prenotazione Gratuita
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="py-8 text-center space-y-4">
                    <div className="size-16 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center mx-auto">
                      <Check className="size-8" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900">
                      Prenotazione Registrata con Successo!
                    </h3>
                    <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                      Abbiamo riservato l&apos;appuntamento con il <strong>{selectedDoctor.name}</strong> per <strong>{selectedDate} alle ore {selectedTime}</strong>.
                    </p>
                    <div className="inline-block rounded-xl border border-teal-200 bg-teal-50 px-4 py-2 font-mono text-sm font-bold text-teal-900">
                      Codice Visita: {bookingCode}
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Riceverai un SMS di promemoria e il pass di check-in 24 ore prima dell&apos;orario concordato.
                    </p>
                    <button
                      onClick={() => {
                        setBookingConfirmed(false);
                        setBookingStep(1);
                      }}
                      className="mt-4 rounded-xl border border-slate-300 bg-white px-5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      Effettua un&apos;altra prenotazione
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Doctors Directory */}
        <section id="medici" className="mx-auto max-w-7xl px-6 py-20 border-t border-slate-200 scroll-mt-24">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600">
              Corpo Medico
            </span>
            <h2 className="text-3xl font-black tracking-tight text-slate-950 mt-1">
              Specialisti Certificati al Tuo Servizio
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {DOCTORS.map((doc) => (
              <div key={doc.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
                <img
                  src={doc.image}
                  alt={doc.name}
                  className="w-full h-48 rounded-xl object-cover bg-slate-100"
                />
                <h3 className="font-bold text-slate-900 text-base mt-4">{doc.name}</h3>
                <p className="text-xs text-slate-600 mt-1 line-clamp-2">{doc.role}</p>
                <div className="mt-4 border-t border-slate-100 pt-3 text-[11px] text-slate-500">
                  <p>{doc.albo}</p>
                  <p className="text-teal-700 font-semibold mt-1">Valutazione: ⭐ {doc.rating} ({doc.reviewsCount} recensioni)</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Insurance Partners */}
        <section id="convenzioni" className="border-t border-slate-200 bg-white px-6 py-16 text-center">
          <div className="mx-auto max-w-6xl">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">
              Fondi Sanitari e Assicurazioni in Convenzione Diretta e Indiretta
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 text-sm font-bold text-slate-600">
              <span className="p-3 border border-slate-200 rounded-xl bg-slate-50">UNISALUTE</span>
              <span className="p-3 border border-slate-200 rounded-xl bg-slate-50">METASALUTE</span>
              <span className="p-3 border border-slate-200 rounded-xl bg-slate-50">FASI / FASIOPEN</span>
              <span className="p-3 border border-slate-200 rounded-xl bg-slate-50">PREVIMEDICAL</span>
              <span className="p-3 border border-slate-200 rounded-xl bg-slate-50">GENERALI WELION</span>
              <span className="p-3 border border-slate-200 rounded-xl bg-slate-50">CESARE POZZO</span>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-slate-200 bg-slate-900 px-6 py-12 text-center text-xs text-slate-400">
          <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white font-semibold">
              Clinica San Pietro S.r.l. • Portale digitale e cartella sanitaria sviluppati da DevLeonardis
            </p>
            <div className="flex items-center gap-4">
              <Link href="/#projects" className="text-teal-400 hover:underline font-semibold">Portfolio DevLeonardis</Link>
              <span>•</span>
              <a href="https://wa.me/393665252021" target="_blank" rel="noopener noreferrer" className="hover:text-white">Contatta lo Sviluppatore</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
