"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Activity,
  ArrowRight,
  BarChart3,
  Check,
  ChevronDown,
  Cpu,
  Database,
  Globe,
  Layers,
  Play,
  Pause,
  ShieldCheck,
  Sparkles,
  Terminal,
  Zap,
} from "lucide-react";

type NodeStatus = {
  city: string;
  code: string;
  latency: number;
  status: "optimal" | "nominal";
  load: number;
};

const INITIAL_NODES: NodeStatus[] = [
  { city: "Milano", code: "MXP-1", latency: 1.4, status: "optimal", load: 24 },
  { city: "Francoforte", code: "FRA-2", latency: 2.1, status: "optimal", load: 38 },
  { city: "Londra", code: "LHR-1", latency: 3.5, status: "optimal", load: 41 },
  { city: "New York", code: "JFK-1", latency: 8.2, status: "nominal", load: 56 },
  { city: "Tokyo", code: "HND-1", latency: 12.8, status: "optimal", load: 32 },
  { city: "Singapore", code: "SIN-1", latency: 14.2, status: "nominal", load: 29 },
];

export default function SaasDemoPage() {
  const [activeTab, setActiveTab] = useState<"metrics" | "nodes" | "logs">("metrics");
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("yearly");
  const [eventsVolume, setEventsVolume] = useState<number>(25); // In millions
  const [streamPaused, setStreamPaused] = useState(false);
  const [simulatedSpike, setSimulatedSpike] = useState(false);
  const [throughput, setThroughput] = useState(148200);
  const [latencyP99, setLatencyP99] = useState(3.8);

  // Live log lines simulator
  const [logs, setLogs] = useState<string[]>([
    "23:14:02.102 [INFO] [MXP-1] Telemetry stream connected: client_pool_4098",
    "23:14:02.321 [TRACE] [FRA-2] Batch ingestion: 12,400 traces in 1.2ms (OpenTelemetry v1.28)",
    "23:14:02.580 [OK]   [LHR-1] Zero-cold-start edge worker spawned: instance_id=w_89af",
    "23:14:02.890 [PASS] [JFK-1] Anomaly detector: 0 spikes, variance within normal sigma (0.04)",
  ]);

  useEffect(() => {
    if (streamPaused) return;
    const interval = setInterval(() => {
      const timestamp = new Date().toTimeString().split(" ")[0] + "." + Math.floor(Math.random() * 900 + 100);
      const sources = ["[MXP-1]", "[FRA-2]", "[LHR-1]", "[JFK-1]", "[HND-1]"];
      const messages = [
        `[INGEST] Ingested ${Math.floor(Math.random() * 8000 + 4000)} metrics/s via gRPC-Web`,
        `[SYNAPSE] Distributed trace correlation completed across 42 microservices (took 0.8ms)`,
        `[CACHE_HIT] Query cache served sub-second aggregation for tenant_corp_enterprise`,
        `[HEALTH] Heartbeat acknowledged from edge partition: healthy`,
      ];
      const source = sources[Math.floor(Math.random() * sources.length)];
      const msg = messages[Math.floor(Math.random() * messages.length)];
      setLogs((prev) => [`${timestamp} ${source} ${msg}`, ...prev.slice(0, 14)]);
    }, 2200);

    return () => clearInterval(interval);
  }, [streamPaused]);

  // Traffic spike simulator
  const triggerSpike = () => {
    setSimulatedSpike(true);
    setThroughput(294500);
    setLatencyP99(5.1);
    setLogs((prev) => [
      `${new Date().toTimeString().split(" ")[0]} [ALERT] [EDGE-AUTOSCALE] Traffic burst detected: +150,000 req/s. Provisioned 8 extra edge nodes.`,
      ...prev,
    ]);

    setTimeout(() => {
      setThroughput(152300);
      setLatencyP99(3.9);
      setSimulatedSpike(false);
    }, 4500);
  };

  const proPrice = billingCycle === "yearly" ? 49 : 62;
  const calculatedProTotal = Math.round(proPrice + (eventsVolume - 10) * 1.8);

  return (
    <div className="min-h-screen bg-[#07090e] text-zinc-100 selection:bg-emerald-400 selection:text-black font-sans antialiased">
      {/* Header */}
      <div>
        {/* Navigation */}
        <header className="border-b border-white/10 bg-[#07090e]/80 backdrop-blur-md sticky top-0 z-30">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-400 text-black font-black text-lg shadow-lg shadow-emerald-500/20">
                K
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg tracking-tight text-white flex items-center gap-1.5">
                  kinetix<span className="text-emerald-400">.io</span>
                </span>
                <span className="text-[10px] text-zinc-400 -mt-1 tracking-wider uppercase">Cloud Observability</span>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-8 text-sm text-zinc-300">
              <a href="#simulator" className="hover:text-emerald-400 transition-colors">Architettura & Demo</a>
              <a href="#features" className="hover:text-emerald-400 transition-colors">Tecnologia</a>
              <a href="#pricing" className="hover:text-emerald-400 transition-colors">Prezzi</a>
              <a href="#faq" className="hover:text-emerald-400 transition-colors">FAQ</a>
            </nav>

            <div className="flex items-center gap-3">
              <span className="hidden sm:inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-3 py-1 text-xs text-emerald-400 font-mono">
                <span className="size-1.5 rounded-full bg-emerald-400 animate-ping" />
                SLA 99.999%
              </span>
              <a
                href="#pricing"
                className="rounded-lg bg-white px-4 py-2 text-xs font-semibold text-black transition-all hover:bg-zinc-200 hover:shadow-lg hover:shadow-white/10"
              >
                Inizia Prova
              </a>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative overflow-hidden px-6 pt-20 pb-24 text-center">
          {/* Ambient Glow */}
          <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 size-[650px] -translate-x-1/2 rounded-full bg-gradient-to-b from-emerald-500/15 via-cyan-500/10 to-transparent blur-3xl" />

          <div className="mx-auto max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium text-zinc-300 backdrop-blur-md mb-8">
              <Sparkles className="size-3.5 text-emerald-400" />
              <span>Kinetix v2.4 Engine: Zero-Cold-Start Edge Tracing</span>
              <ArrowRight className="size-3 text-zinc-400" />
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08]">
              La telemetria distribuita per sistemi ad{" "}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                altissimo carico.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-zinc-300/85 leading-relaxed">
              Ingestion ad altissima frequenza, analisi in tempo reale su 180+ nodi edge globali e individuazione automatica dei colli di bottiglia prima che impattino gli utenti finali.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#simulator"
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-400 px-6 py-3.5 text-sm font-bold text-black shadow-xl shadow-emerald-500/20 transition-all hover:brightness-110 hover:scale-[1.02]"
              >
                <Activity className="size-4" />
                Esplora la Live Console
              </a>
              <a
                href="#pricing"
                className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-all hover:bg-white/10"
              >
                Calcola Costi & Risparmio
              </a>
            </div>

            {/* Metrics Ticker */}
            <div className="mt-16 grid grid-cols-2 gap-4 border-y border-white/10 py-6 sm:grid-cols-4 sm:gap-8">
              <div>
                <p className="font-mono text-2xl sm:text-3xl font-bold text-white">&lt; 4.2ms</p>
                <p className="mt-1 text-xs text-zinc-400">Latenza Ingestion P99</p>
              </div>
              <div>
                <p className="font-mono text-2xl sm:text-3xl font-bold text-emerald-400">99.999%</p>
                <p className="mt-1 text-xs text-zinc-400">Disponibilità Edge SLA</p>
              </div>
              <div>
                <p className="font-mono text-2xl sm:text-3xl font-bold text-white">2.8B+</p>
                <p className="mt-1 text-xs text-zinc-400">Eventi Analizzati / 24h</p>
              </div>
              <div>
                <p className="font-mono text-2xl sm:text-3xl font-bold text-cyan-400">0.00%</p>
                <p className="mt-1 text-xs text-zinc-400">Perdita Tracce al Picco</p>
              </div>
            </div>
          </div>
        </section>

        {/* Live Engine Console Section */}
        <section id="simulator" className="mx-auto max-w-6xl px-6 py-12 scroll-mt-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 uppercase tracking-widest">
                <Terminal className="size-3.5" />
                Live Network Console & Telemetry
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
                Console di Controllo & Streaming Real-Time
              </h2>
              <p className="text-sm text-zinc-400 mt-1">
                Monitoraggio continuo del cluster globale: analisi nodi, latenza P99 e streaming OTel.
              </p>
            </div>

            {/* Simulation controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={triggerSpike}
                disabled={simulatedSpike}
                className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-bold transition-all ${
                  simulatedSpike
                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/30 animate-pulse"
                    : "bg-white/10 hover:bg-white/15 text-zinc-100 border border-white/15"
                }`}
              >
                <Zap className={`size-3.5 ${simulatedSpike ? "text-amber-400 fill-amber-400" : "text-amber-300"}`} />
                {simulatedSpike ? "Stress Test in Corso..." : "Esegui Stress Test Rete (+150k req/s)"}
              </button>
            </div>
          </div>

          {/* Interactive Console Shell */}
          <div className="rounded-2xl border border-white/15 bg-zinc-950/90 shadow-2xl overflow-hidden backdrop-blur-xl">
            {/* Top Bar */}
            <div className="flex flex-wrap items-center justify-between border-b border-white/10 bg-zinc-900/50 px-4 py-3 gap-3">
              <div className="flex items-center gap-2">
                <span className="size-3 rounded-full bg-red-500/80 inline-block" />
                <span className="size-3 rounded-full bg-yellow-500/80 inline-block" />
                <span className="size-3 rounded-full bg-emerald-500/80 inline-block" />
                <span className="ml-2 font-mono text-xs text-zinc-400">kinetix-cluster-prod-eu1</span>
              </div>

              {/* Navigation Tabs */}
              <div className="flex max-w-full overflow-x-auto rounded-lg bg-black/60 p-1 border border-white/10 shrink-0">
                <button
                  onClick={() => setActiveTab("metrics")}
                  className={`flex items-center gap-1.5 whitespace-nowrap rounded-md px-3 py-1 text-xs font-medium transition-all ${
                    activeTab === "metrics"
                      ? "bg-emerald-500/20 text-emerald-300 shadow-sm border border-emerald-500/30"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  <BarChart3 className="size-3.5" />
                  Throughput & Latenza
                </button>
                <button
                  onClick={() => setActiveTab("nodes")}
                  className={`flex items-center gap-1.5 whitespace-nowrap rounded-md px-3 py-1 text-xs font-medium transition-all ${
                    activeTab === "nodes"
                      ? "bg-emerald-500/20 text-emerald-300 shadow-sm border border-emerald-500/30"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  <Globe className="size-3.5" />
                  Mappa Nodi Edge ({INITIAL_NODES.length})
                </button>
                <button
                  onClick={() => setActiveTab("logs")}
                  className={`flex items-center gap-1.5 whitespace-nowrap rounded-md px-3 py-1 text-xs font-medium transition-all ${
                    activeTab === "logs"
                      ? "bg-emerald-500/20 text-emerald-300 shadow-sm border border-emerald-500/30"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  <Terminal className="size-3.5" />
                  Live Logs Stream
                </button>
              </div>
            </div>

            {/* Tab 1: Metrics */}
            {activeTab === "metrics" && (
              <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center justify-between text-xs text-zinc-400">
                      <span>Ingestion Rate</span>
                      <span className="size-2 rounded-full bg-emerald-400 animate-ping" />
                    </div>
                    <p className="mt-2 font-mono text-2xl font-bold text-white">
                      {throughput.toLocaleString()} <span className="text-xs text-zinc-400 font-normal">req/s</span>
                    </p>
                    <p className="mt-1 text-xs text-emerald-400 flex items-center gap-1">
                      ↑ {simulatedSpike ? "+98.4% (Autoscaling)" : "+4.2% rispetto a 1h fa"}
                    </p>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center justify-between text-xs text-zinc-400">
                      <span>Latenza P99 Globale</span>
                      <span className="font-mono text-[10px] text-zinc-400">Target &lt; 10ms</span>
                    </div>
                    <p className="mt-2 font-mono text-2xl font-bold text-white">
                      {latencyP99.toFixed(1)} <span className="text-xs text-zinc-400 font-normal">ms</span>
                    </p>
                    <p className="mt-1 text-xs text-zinc-400">P50: 1.4ms • P95: 2.8ms</p>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center justify-between text-xs text-zinc-400">
                      <span>Error Rate / Anomaly</span>
                      <ShieldCheck className="size-3.5 text-emerald-400" />
                    </div>
                    <p className="mt-2 font-mono text-2xl font-bold text-emerald-400">0.0001%</p>
                    <p className="mt-1 text-xs text-zinc-400">Zero pacchetti persi in buffer</p>
                  </div>
                </div>

                {/* Simulated interactive visual wave chart */}
                <div className="rounded-xl border border-white/10 bg-black/40 p-5">
                  <div className="flex items-center justify-between text-xs text-zinc-400 mb-4">
                    <span className="font-medium text-zinc-200">Distribuzione Throughput Edge (Ultimi 60s)</span>
                    <span className="font-mono text-emerald-400">Finestra 1000ms</span>
                  </div>
                  <div className="flex items-end gap-1.5 h-36 pt-4">
                    {[
                      35, 42, 45, 40, 52, 48, 55, 60, 58, 64, 62, 70, 68, 72, 75,
                      simulatedSpike ? 95 : 74,
                      simulatedSpike ? 98 : 71,
                      simulatedSpike ? 92 : 76,
                      simulatedSpike ? 88 : 73,
                      78, 80, 82, 79, 85,
                    ].map((height, idx) => (
                      <div
                        key={idx}
                        className="flex-1 rounded-t transition-all duration-300 relative group"
                        style={{
                          height: `${height}%`,
                          backgroundColor: height > 85 ? "#f59e0b" : "#10b981",
                          opacity: 0.25 + (idx / 24) * 0.75,
                        }}
                      >
                        <div className="opacity-0 group-hover:opacity-100 absolute -top-7 left-1/2 -translate-x-1/2 bg-black px-1.5 py-0.5 rounded text-[10px] font-mono text-white pointer-events-none transition-opacity">
                          {Math.round((height / 100) * throughput)}/s
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Edge Nodes */}
            {activeTab === "nodes" && (
              <div className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-white/10 text-xs text-zinc-400 uppercase tracking-wider">
                        <th className="pb-3 font-semibold">Nodo & Regione</th>
                        <th className="pb-3 font-semibold">Codice</th>
                        <th className="pb-3 font-semibold">Latenza P99</th>
                        <th className="pb-3 font-semibold">Carico CPU</th>
                        <th className="pb-3 font-semibold">Stato</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 font-mono text-xs">
                      {INITIAL_NODES.map((node) => (
                        <tr key={node.code} className="hover:bg-white/5 transition-colors">
                          <td className="py-3 font-sans font-medium text-white flex items-center gap-2">
                            <span className="size-2 rounded-full bg-emerald-400" />
                            {node.city}
                          </td>
                          <td className="py-3 text-zinc-400">{node.code}</td>
                          <td className="py-3 text-emerald-400">{node.latency} ms</td>
                          <td className="py-3">
                            <div className="flex items-center gap-2">
                              <div className="w-20 bg-white/10 h-1.5 rounded-full overflow-hidden">
                                <div
                                  className="bg-emerald-400 h-full rounded-full"
                                  style={{ width: `${node.load}%` }}
                                />
                              </div>
                              <span className="text-zinc-400">{node.load}%</span>
                            </div>
                          </td>
                          <td className="py-3">
                            <span className="rounded bg-emerald-500/10 text-emerald-400 px-2 py-0.5 text-[11px] border border-emerald-500/20">
                              OPERATIVO
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Tab 3: Live Logs */}
            {activeTab === "logs" && (
              <div className="p-6">
                <div className="flex items-center justify-between mb-3 text-xs text-zinc-400">
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>WebSocket Stream: kinetix.edge.telemetry.v1</span>
                  </div>
                  <button
                    onClick={() => setStreamPaused(!streamPaused)}
                    className="flex items-center gap-1.5 rounded border border-white/10 px-2.5 py-1 text-xs hover:bg-white/10 text-zinc-300"
                  >
                    {streamPaused ? <Play className="size-3" /> : <Pause className="size-3" />}
                    {streamPaused ? "Riprendi Stream" : "Pausa Stream"}
                  </button>
                </div>

                <div className="rounded-xl border border-white/10 bg-black/70 p-4 font-mono text-[11px] leading-relaxed max-h-64 overflow-y-auto space-y-1.5 text-zinc-300">
                  {logs.map((log, idx) => (
                    <div key={idx} className="flex gap-2">
                      <span className="text-zinc-400 shrink-0">{log.slice(0, 12)}</span>
                      <span className={log.includes("ALERT") ? "text-amber-400 font-bold" : log.includes("OK") ? "text-emerald-400" : "text-zinc-200"}>
                        {log.slice(12)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Features Bento Grid */}
        <section id="features" className="mx-auto max-w-6xl px-6 py-20 border-t border-white/10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
              Ingegneria di Classe Mondiale
            </h2>
            <p className="mt-2 text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Costruito da zero per scalare senza compromessi
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm hover:border-emerald-500/30 transition-all">
              <div className="size-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-5">
                <Cpu className="size-5" />
              </div>
              <h3 className="text-xl font-bold text-white">Engine Rust & Wasm</h3>
              <p className="mt-3 text-sm text-zinc-300/80 leading-relaxed">
                Zero garbage collection spikes. Pipeline di ingestion compilata nativamente a basso livello per garantire latenza sub-millisecondo anche durante picchi 100x.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm hover:border-cyan-500/30 transition-all">
              <div className="size-11 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-5">
                <Database className="size-5" />
              </div>
              <h3 className="text-xl font-bold text-white">Storage Colonare Indiciato</h3>
              <p className="mt-3 text-sm text-zinc-300/80 leading-relaxed">
                Esegui query su miliardi di span e metriche in secondi. Compressione dinamica 12:1 per abbattere i costi di retention storica rispetto a Datadog ed Elastic.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm hover:border-emerald-500/30 transition-all">
              <div className="size-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-5">
                <Layers className="size-5" />
              </div>
              <h3 className="text-xl font-bold text-white">OpenTelemetry al 100%</h3>
              <p className="mt-3 text-sm text-zinc-300/80 leading-relaxed">
                Nessun lock-in proprietario. Compatibile drop-in con standard OTel, Prometheus, Grafana e AWS CloudWatch. Inizia a inviare dati in 2 righe di configurazione.
              </p>
            </div>
          </div>
        </section>

        {/* Pricing Calculator Section */}
        <section id="pricing" className="mx-auto max-w-6xl px-6 py-20 border-t border-white/10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
              Trasparenza Totale
            </h2>
            <p className="mt-2 text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Piani chiari, proporzionali alla tua crescita
            </p>
            <p className="mt-3 text-sm text-zinc-400">
              Nessun costo nascosto per utente: paghi solo per il volume reale di eventi.
            </p>

            {/* Billing Toggle */}
            <div className="mt-8 inline-flex items-center rounded-full border border-white/10 bg-black/60 p-1">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                  billingCycle === "monthly" ? "bg-white text-black shadow" : "text-zinc-400 hover:text-white"
                }`}
              >
                Fatturazione Mensile
              </button>
              <button
                onClick={() => setBillingCycle("yearly")}
                className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                  billingCycle === "yearly" ? "bg-emerald-400 text-black font-semibold shadow" : "text-zinc-400 hover:text-white"
                }`}
              >
                Annuale <span className="rounded bg-black/20 px-1.5 py-0.2 text-[10px] font-bold">-20% Sconto</span>
              </button>
            </div>
          </div>

          {/* Interactive Volume Slider */}
          <div className="rounded-2xl border border-white/15 bg-white/5 p-6 sm:p-8 mb-12 max-w-3xl mx-auto backdrop-blur-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div>
                <span className="text-sm font-semibold text-white">Stima del tuo volume di eventi mensile</span>
                <p className="text-xs text-zinc-400">Tracce, log e metriche aggregate</p>
              </div>
              <span className="font-mono text-xl font-bold text-emerald-400">
                {eventsVolume} Milioni / mese
              </span>
            </div>

            <input
              type="range"
              min="5"
              max="100"
              step="5"
              value={eventsVolume}
              onChange={(e) => setEventsVolume(Number(e.target.value))}
              className="w-full accent-emerald-400 cursor-pointer h-2 bg-zinc-800 rounded-lg"
            />

            <div className="flex justify-between text-[11px] font-mono text-zinc-400 mt-2">
              <span>5M</span>
              <span>25M</span>
              <span>50M</span>
              <span>75M</span>
              <span>100M+ (Custom)</span>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {/* Free */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-lg text-white">Developer Sandbox</h3>
                <p className="text-xs text-zinc-400 mt-1">Per progetti personali e testing iniziale</p>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl font-bold font-mono text-white">0€</span>
                  <span className="text-xs text-zinc-400">/ per sempre</span>
                </div>
                <ul className="mt-8 space-y-3 text-xs text-zinc-300">
                  <li className="flex items-center gap-2">
                    <Check className="size-4 text-emerald-400 shrink-0" />
                    <span>Fino a 3M eventi / mese inclusi</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="size-4 text-emerald-400 shrink-0" />
                    <span>Retention 7 giorni</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="size-4 text-emerald-400 shrink-0" />
                    <span>3 nodi edge in Europa</span>
                  </li>
                </ul>
              </div>
              <button className="mt-8 w-full rounded-xl border border-white/20 bg-white/5 py-2.5 text-xs font-semibold text-white hover:bg-white/10 transition-colors">
                Attiva Gratuitamente
              </button>
            </div>

            {/* Pro Scale (Featured) */}
            <div className="relative rounded-2xl border-2 border-emerald-400/80 bg-gradient-to-b from-emerald-950/20 via-zinc-950 to-zinc-950 p-8 flex flex-col justify-between shadow-2xl shadow-emerald-500/10">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-emerald-400 px-3 py-0.5 text-[10px] font-bold text-black uppercase tracking-wider">
                Consigliato per Startup & SaaS
              </div>
              <div>
                <h3 className="font-bold text-lg text-white">Pro Scaler</h3>
                <p className="text-xs text-zinc-400 mt-1">Per piattaforme in produzione a traffico reale</p>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl font-bold font-mono text-emerald-400">€{calculatedProTotal}</span>
                  <span className="text-xs text-zinc-400">/ mese ({billingCycle})</span>
                </div>
                <p className="text-[11px] text-zinc-400 mt-1">Calcolato per {eventsVolume}M eventi</p>
                <ul className="mt-8 space-y-3 text-xs text-zinc-300">
                  <li className="flex items-center gap-2">
                    <Check className="size-4 text-emerald-400 shrink-0" />
                    <span>Retention estesa a 60 giorni</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="size-4 text-emerald-400 shrink-0" />
                    <span>Tutti i 180+ nodi edge globali</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="size-4 text-emerald-400 shrink-0" />
                    <span>Alert intelligenti su Slack/PagerDuty</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="size-4 text-emerald-400 shrink-0" />
                    <span>Supporto ingegneristico prioritario</span>
                  </li>
                </ul>
              </div>
              <button className="mt-8 w-full rounded-xl bg-emerald-400 py-2.5 text-xs font-bold text-black hover:bg-emerald-300 transition-colors shadow-lg shadow-emerald-400/20">
                Inizia Prova Gratuita 14 Giorni
              </button>
            </div>

            {/* Enterprise */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-lg text-white">Enterprise Core</h3>
                <p className="text-xs text-zinc-400 mt-1">Per grandi organizzazioni con requisiti custom</p>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-3xl font-bold font-mono text-white">Su Misura</span>
                </div>
                <ul className="mt-8 space-y-3 text-xs text-zinc-300">
                  <li className="flex items-center gap-2">
                    <Check className="size-4 text-cyan-400 shrink-0" />
                    <span>Throughput illimitato & custom sharding</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="size-4 text-cyan-400 shrink-0" />
                    <span>SLA contrattuale 99.999% con penali</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="size-4 text-cyan-400 shrink-0" />
                    <span>Deploy on-premise o VPC dedicato</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="size-4 text-cyan-400 shrink-0" />
                    <span>Dedicated Technical Account Manager</span>
                  </li>
                </ul>
              </div>
              <button className="mt-8 w-full rounded-xl border border-white/20 bg-white/5 py-2.5 text-xs font-semibold text-white hover:bg-white/10 transition-colors">
                Richiedi Architettura Custom
              </button>
            </div>
          </div>
        </section>

        {/* FAQ Accordion Section */}
        <section id="faq" className="mx-auto max-w-4xl px-6 py-20 border-t border-white/10">
          <h2 className="text-2xl font-bold text-white text-center mb-8">Domande Frequenti</h2>
          <div className="space-y-4">
            {[
              {
                q: "Qual è la differenza tra Kinetix e strumenti tradizionali come Datadog o New Relic?",
                a: "Kinetix è progettato con architettura nativa ad edge in Rust e WebAssembly. Non richiede pesanti agenti daemon su ogni VM: invia telemetria con gRPC-Web a latenza microscopica, riducendo l'overhead computazionale di oltre il 70% e abbattendo i costi di retention.",
              },
              {
                q: "Posso integrare Kinetix con applicazioni Next.js, Kubernetes o serverless?",
                a: "Sì. Supportiamo SDK nativi per Next.js, Node, Go, Rust, Python e Java. Se usi già OpenTelemetry, basta aggiornare l'endpoint OTLP senza riscrivere una singola riga di codice.",
              },
              {
                q: "I dati rispettano il GDPR e la sovranità europea?",
                a: "Assolutamente sì. I nodi primari di ingestion e archiviazione risiedono nei datacenter di Milano e Francoforte con crittografia end-to-end a riposo e in transito.",
              },
            ].map((faq, idx) => (
              <details key={idx} className="group rounded-xl border border-white/10 bg-white/5 p-5">
                <summary className="flex cursor-pointer items-center justify-between text-sm font-semibold text-white">
                  <span>{faq.q}</span>
                  <ChevronDown className="size-4 text-zinc-400 transition-transform group-open:rotate-180" />
                </summary>
                <p className="mt-3 text-xs leading-relaxed text-zinc-300/80">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Bottom CTA & Footer */}
        <footer className="border-t border-white/10 bg-black/60 px-6 py-12 text-center text-xs text-zinc-400">
          <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="font-bold text-white">Kinetix Observability Inc.</span>
              <span>— Ingegnerizzato e sviluppato da DevLeonardis</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/#projects" className="text-emerald-400 hover:underline">Portfolio DevLeonardis</Link>
              <span>•</span>
              <a href="https://wa.me/393665252021" target="_blank" rel="noopener noreferrer" className="hover:text-white">Contatta lo Sviluppatore</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
