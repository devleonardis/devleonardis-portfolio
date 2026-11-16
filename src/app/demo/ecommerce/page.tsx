"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Check,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  X,
} from "lucide-react";

type Product = {
  id: string;
  name: string;
  category: "ceramica" | "illuminazione" | "arredo" | "tessuti";
  categoryLabel: string;
  price: number;
  image: string;
  artisan: string;
  origin: string;
  tag?: string;
  variants: { name: string; hex: string }[];
  description: string;
  dimensions: string;
};

const PRODUCTS: Product[] = [
  {
    id: "vaso-materia",
    name: "Vaso Scultoreo Materia No. 4",
    category: "ceramica",
    categoryLabel: "Ceramica & Vasi",
    price: 185,
    image: "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=900&q=80",
    artisan: "Bottega Faenza",
    origin: "Emilia-Romagna",
    tag: "Serie Limitata 50 pz",
    variants: [
      { name: "Argilla Grezza", hex: "#c4a482" },
      { name: "Nero Carbone", hex: "#2b2b2b" },
      { name: "Gesso Naturale", hex: "#f0ece1" },
    ],
    description: "Modellato a mano al tornio e cotto a legna secondo la tradizione millenaria delle terrecotte faentine. Ogni imperfezione è firma di unicità irripetibile.",
    dimensions: "H 32cm × Ø 18cm • Peso: 2.4kg",
  },
  {
    id: "lampada-travertino",
    name: "Lampada da Tavolo Calacatta",
    category: "illuminazione",
    categoryLabel: "Illuminazione",
    price: 340,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=80",
    artisan: "Atelier Pietrasanta",
    origin: "Toscana",
    tag: "Icona di Design",
    variants: [
      { name: "Travertino Romano", hex: "#e3dac9" },
      { name: "Marmo Verde Alpi", hex: "#355e3b" },
    ],
    description: "Monolite in travertino tagliato a filo d'acqua con diffusore in ottone satinato. Luce calda dimmerabile 2700K per ambienti di meditazione e lettura.",
    dimensions: "H 28cm × L 14cm × P 14cm • Ottone & Pietra",
  },
  {
    id: "sedia-radica",
    name: "Poltroncina Nuvola in Noce",
    category: "arredo",
    categoryLabel: "Mobili Sartoriali",
    price: 620,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=900&q=80",
    artisan: "Falegnameria Cantù",
    origin: "Brianza",
    tag: "Fatto su Ordinazione",
    variants: [
      { name: "Bouclé Bianco Neve", hex: "#f4f1ea" },
      { name: "Lana Cotto Caramello", hex: "#98623c" },
    ],
    description: "Struttura solida in noce canaletto curvato a vapore, con imbottitura ecologica in piuma rigenerata e tessuto bouclé ad alta resistenza al logorio.",
    dimensions: "L 74cm × P 78cm × H 76cm (Seduta 42cm)",
  },
  {
    id: "plaid-alpaca",
    name: "Plaid Sartoriale Cashmere & Lino",
    category: "tessuti",
    categoryLabel: "Tessuti & Lino",
    price: 195,
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=900&q=80",
    artisan: "Lanificio Biellese",
    origin: "Piemonte",
    variants: [
      { name: "Ecrù Naturale", hex: "#e5ded4" },
      { name: "Grigio Ardesia", hex: "#636b6f" },
    ],
    description: "Tessuto su telai storici degli anni '50. Filato purissimo senza tinture chimiche, rifinito a mano con frange sfilacciate e orlo a punto cavallo.",
    dimensions: "140cm × 190cm • 100% Fibre Vergini",
  },
  {
    id: "ciotola-ossidiana",
    name: "Ciotola Centrotavola Lipari",
    category: "ceramica",
    categoryLabel: "Ceramica & Vasi",
    price: 135,
    image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=900&q=80",
    artisan: "Studio Caltagirone",
    origin: "Sicilia",
    tag: "Nuovo Arrivo",
    variants: [
      { name: "Sabbia Nera Vulcanica", hex: "#222222" },
      { name: "Bianco Calce", hex: "#faf6ed" },
    ],
    description: "Smalto mat ricavato da polvere di basalto dell'Etna. Superficie tattile porosa ideale per frutta fresca o come scultura autonoma.",
    dimensions: "Ø 28cm × H 9cm",
  },
  {
    id: "sospensione-brera",
    name: "Lampadario a Sospensione Brera",
    category: "illuminazione",
    categoryLabel: "Illuminazione",
    price: 480,
    image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=900&q=80",
    artisan: "Vetreria Murano",
    origin: "Venezia",
    tag: "Vetro Soffiato",
    variants: [
      { name: "Vetro Fumé", hex: "#5a5047" },
      { name: "Trasparente Cristallo", hex: "#d8e2dc" },
    ],
    description: "Ogni sfera è soffiata a bocca dai maestri vetrai muranesi. Riflessi organici e bolle d'aria incapsulate che trasformano la luce in poesia domestica.",
    dimensions: "Diffusore Ø 24cm • Cavo regolabile fino a 200cm",
  },
];

type CartItem = {
  product: Product;
  variant: string;
  quantity: number;
};

export default function EcommerceDemoPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("tutti");
  const [sortBy, setSortBy] = useState<"featured" | "asc" | "desc">("featured");
  const [cart, setCart] = useState<CartItem[]>([
    { product: PRODUCTS[0], variant: "Argilla Grezza", quantity: 1 },
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({
    "vaso-materia": "Argilla Grezza",
    "lampada-travertino": "Travertino Romano",
    "sedia-radica": "Bouclé Bianco Neve",
    "plaid-alpaca": "Ecrù Naturale",
    "ciotola-ossidiana": "Sabbia Nera Vulcanica",
    "sospensione-brera": "Vetro Fumé",
  });
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  // Filter & sort products
  const filtered = PRODUCTS.filter(
    (p) => selectedCategory === "tutti" || p.category === selectedCategory
  ).sort((a, b) => {
    if (sortBy === "asc") return a.price - b.price;
    if (sortBy === "desc") return b.price - a.price;
    return 0;
  });

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const rawSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = couponApplied ? Math.round(rawSubtotal * 0.1) : 0;
  const freeShippingThreshold = 250;
  const isFreeShipping = rawSubtotal >= freeShippingThreshold;
  const shippingCost = isFreeShipping || cart.length === 0 ? 0 : 15;
  const total = rawSubtotal - discountAmount + shippingCost;

  const addToCart = (product: Product, variantName?: string) => {
    const variant = variantName || selectedVariants[product.id] || product.variants[0].name;
    setCart((prev) => {
      const existing = prev.find(
        (item) => item.product.id === product.id && item.variant === variant
      );
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.variant === variant
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, variant, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (productId: string, variant: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId && item.variant === variant) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === "DEV10" || couponCode.trim().toUpperCase() === "AURA") {
      setCouponApplied(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#1c1917] font-sans antialiased selection:bg-[#c4a482] selection:text-white">
      {/* Cart Drawer Overlay */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={() => setIsCartOpen(false)}
          />

          <aside
            aria-label="Carrello della spesa"
            className="relative z-10 flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-all"
          >
            {/* Cart Header */}
            <div className="flex items-center justify-between border-b border-[#e7e3dc] px-6 py-5">
              <div className="flex items-center gap-2">
                <ShoppingBag className="size-5 text-[#1c1917]" />
                <h3 className="font-serif text-lg font-bold text-[#1c1917]">La Tua Borsa</h3>
                <span className="rounded-full bg-[#f4f1ea] px-2 py-0.5 text-xs font-semibold text-[#666]">
                  {cartCount} {cartCount === 1 ? "pezzo" : "pezzi"}
                </span>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="rounded-full p-1.5 text-zinc-500 hover:bg-[#f4f1ea] transition-colors"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Free Shipping Meter */}
            <div className="bg-[#fcfaf7] border-b border-[#e7e3dc] px-6 py-3.5">
              {isFreeShipping ? (
                <p className="flex items-center gap-1.5 text-xs font-medium text-emerald-800">
                  <Check className="size-4 text-emerald-600" />
                  Spedizione Espressa Gratuita sbloccata in tutta Italia!
                </p>
              ) : (
                <div>
                  <p className="text-xs text-[#666]">
                    Aggiungi altri{" "}
                    <strong className="text-[#1c1917]">€{freeShippingThreshold - rawSubtotal}</strong> per la spedizione gratuita espressa.
                  </p>
                  <div className="mt-2 h-1.5 w-full rounded-full bg-[#e7e3dc] overflow-hidden">
                    <div
                      className="h-full bg-[#1c1917] transition-all duration-300"
                      style={{ width: `${Math.min(100, (rawSubtotal / freeShippingThreshold) * 100)}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-[#f0ece5]">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <ShoppingBag className="size-12 text-[#c4a482]/60 stroke-1" />
                  <p className="mt-4 font-serif text-lg text-[#1c1917]">La tua borsa è vuota</p>
                  <p className="mt-1 text-xs text-[#888]">Esplora le creazioni artigianali della collezione.</p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="mt-6 rounded-lg bg-[#1c1917] px-5 py-2.5 text-xs font-semibold text-white hover:bg-black"
                  >
                    Scopri il Catalogo
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={`${item.product.id}-${item.variant}`} className="py-4 flex gap-4">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="size-20 rounded-lg object-cover bg-[#f4f1ea] shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif text-sm font-semibold text-[#1c1917] truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-xs text-[#888] mt-0.5">Finitura: {item.variant}</p>
                      <p className="font-semibold text-sm text-[#1c1917] mt-1">€{item.product.price}</p>

                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center rounded border border-[#e7e3dc]">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.variant, -1)}
                            className="p-1 hover:bg-[#f4f1ea] text-[#666]"
                          >
                            <Minus className="size-3" />
                          </button>
                          <span className="px-3 text-xs font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.variant, 1)}
                            className="p-1 hover:bg-[#f4f1ea] text-[#666]"
                          >
                            <Plus className="size-3" />
                          </button>
                        </div>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.variant, -item.quantity)}
                          className="text-[#999] hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Cart Footer */}
            {cart.length > 0 && (
              <div className="border-t border-[#e7e3dc] bg-[#faf8f5] p-6 space-y-4">
                {/* Coupon form */}
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Codice promozionale (es. DEV10)"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 rounded-lg border border-[#e7e3dc] bg-white px-3 py-1.5 text-xs uppercase placeholder:normal-case focus:border-[#1c1917] outline-none"
                  />
                  <button
                    type="submit"
                    className="rounded-lg bg-[#1c1917] px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-black"
                  >
                    Applica
                  </button>
                </form>

                {couponApplied && (
                  <p className="text-xs text-emerald-800 font-medium flex items-center gap-1">
                    <Check className="size-3.5 text-emerald-600" /> Sconto 10% applicato con successo!
                  </p>
                )}

                <div className="space-y-1.5 text-xs text-[#666]">
                  <div className="flex justify-between">
                    <span>Subtotale</span>
                    <span className="font-semibold text-[#1c1917]">€{rawSubtotal}</span>
                  </div>
                  {couponApplied && (
                    <div className="flex justify-between text-emerald-800">
                      <span>Sconto Promo (10%)</span>
                      <span className="font-semibold">-€{discountAmount}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Spedizione Espressa</span>
                    <span>{shippingCost === 0 ? "Gratuita" : `€${shippingCost}`}</span>
                  </div>
                  <div className="border-t border-[#e7e3dc] pt-2 flex justify-between text-base font-serif font-bold text-[#1c1917]">
                    <span>Totale (IVA Inclusa)</span>
                    <span>€{total}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setCheckoutComplete(true);
                    setCart([]);
                  }}
                  className="w-full rounded-xl bg-[#1c1917] py-3 text-center text-xs font-bold tracking-wider text-white uppercase transition-all hover:bg-black shadow-lg"
                >
                  Procedi al Checkout Protetto
                </button>
              </div>
            )}
          </aside>
        </div>
      )}

      {/* Checkout Success Modal */}
      {checkoutComplete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-w-md w-full rounded-2xl bg-white p-8 text-center shadow-2xl">
            <div className="size-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
              <Check className="size-7" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#1c1917]">Ordine Ricevuto con Successo!</h3>
            <p className="mt-2 text-xs text-[#666] leading-relaxed">
              Numero Ordine: <strong className="text-[#1c1917]">#AUR-2026-8924</strong>. Grazie per aver acquistato da AURA Atelier. Ti abbiamo inviato una notifica con il riepilogo degli articoli e il codice di tracciamento della spedizione.
            </p>
            <button
              onClick={() => setCheckoutComplete(false)}
              className="mt-6 rounded-xl bg-[#1c1917] px-6 py-2.5 text-xs font-bold text-white hover:bg-black"
            >
              Continua lo Shopping
            </button>
          </div>
        </div>
      )}

      {/* Quick View Modal */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="relative max-w-2xl w-full rounded-2xl bg-white p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-4 right-4 rounded-full p-2 text-zinc-400 hover:text-black hover:bg-[#f4f1ea]"
            >
              <X className="size-5" />
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <img
                src={quickViewProduct.image}
                alt={quickViewProduct.name}
                className="w-full h-72 sm:h-full object-cover rounded-xl bg-[#f4f1ea]"
              />
              <div className="flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-semibold text-[#c4a482] uppercase tracking-wider">
                    {quickViewProduct.categoryLabel} • {quickViewProduct.origin}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1c1917] mt-1">
                    {quickViewProduct.name}
                  </h3>
                  <p className="text-lg font-semibold text-[#1c1917] mt-2">€{quickViewProduct.price}</p>
                  <p className="mt-3 text-xs text-[#555] leading-relaxed">
                    {quickViewProduct.description}
                  </p>

                  <div className="mt-4 border-t border-[#f0ece5] pt-3 text-xs text-[#777] space-y-1">
                    <p><strong>Dimensioni:</strong> {quickViewProduct.dimensions}</p>
                    <p><strong>Bottega:</strong> {quickViewProduct.artisan}</p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#f0ece5]">
                  <button
                    onClick={() => {
                      addToCart(quickViewProduct);
                      setQuickViewProduct(null);
                    }}
                    className="w-full rounded-xl bg-[#1c1917] py-3 text-xs font-bold text-white uppercase tracking-wider hover:bg-black transition-colors"
                  >
                    Aggiungi alla Borsa (€{quickViewProduct.price})
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div>
        {/* Top Announcement Bar */}
        <div className="bg-[#1c1917] text-[#f4f1ea] py-2 text-center text-xs tracking-wide">
          <span>Spedizione espressa gratuita per ordini superiori a 250€ • Reso garantito entro 30 giorni</span>
        </div>

        {/* Store Navigation */}
        <header className="border-b border-[#e7e3dc] bg-[#faf8f5]/90 backdrop-blur-md sticky top-0 z-30">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <div className="flex items-center gap-8">
              <span className="font-serif text-2xl font-black tracking-widest text-[#1c1917] uppercase">
                AURA
              </span>
              <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-[#555]">
                <button
                  onClick={() => setSelectedCategory("tutti")}
                  className={`hover:text-[#1c1917] transition-colors ${selectedCategory === "tutti" ? "font-bold text-[#1c1917] underline underline-offset-4" : ""}`}
                >
                  Collezione 2026
                </button>
                <button
                  onClick={() => setSelectedCategory("ceramica")}
                  className={`hover:text-[#1c1917] transition-colors ${selectedCategory === "ceramica" ? "font-bold text-[#1c1917] underline underline-offset-4" : ""}`}
                >
                  Ceramiche
                </button>
                <button
                  onClick={() => setSelectedCategory("illuminazione")}
                  className={`hover:text-[#1c1917] transition-colors ${selectedCategory === "illuminazione" ? "font-bold text-[#1c1917] underline underline-offset-4" : ""}`}
                >
                  Illuminazione
                </button>
                <button
                  onClick={() => setSelectedCategory("arredo")}
                  className={`hover:text-[#1c1917] transition-colors ${selectedCategory === "arredo" ? "font-bold text-[#1c1917] underline underline-offset-4" : ""}`}
                >
                  Mobili d&apos;Autore
                </button>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative flex items-center gap-2 rounded-full border border-[#d8d2c6] bg-white px-3.5 py-1.5 text-xs font-semibold text-[#1c1917] shadow-sm hover:border-[#1c1917] transition-colors"
              >
                <ShoppingBag className="size-4" />
                <span>Borsa</span>
                <span className="flex size-4.5 items-center justify-center rounded-full bg-[#1c1917] text-[10px] text-white">
                  {cartCount}
                </span>
              </button>
            </div>
          </div>
        </header>

        {/* Editorial Hero */}
        <section className="relative px-6 py-20 md:py-28 text-center bg-[#f5f1eb] border-b border-[#e7e3dc]">
          <div className="mx-auto max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#8c7a65]">
              Edizione Limitata Autunno / Inverno
            </span>
            <h1 className="mt-4 font-serif text-4xl sm:text-6xl font-normal tracking-tight text-[#1c1917] leading-[1.12]">
              L&apos;eleganza dell&apos;essenziale, la purezza della materia.
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-sm sm:text-base text-[#666] leading-relaxed">
              Opere funzionali e pezzi scultorei forgiati a mano da botteghe e maestri artigiani italiani. Serie numerate per chi cerca bellezza duratura nel tempo.
            </p>
          </div>
        </section>

        {/* Catalog Section with Live Filters */}
        <section className="mx-auto max-w-7xl px-6 py-16">
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e7e3dc] pb-6 mb-10">
            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: "tutti", label: "Tutte le Creazioni" },
                { id: "ceramica", label: "Ceramica & Vasi" },
                { id: "illuminazione", label: "Illuminazione" },
                { id: "arredo", label: "Mobili Sartoriali" },
                { id: "tessuti", label: "Tessuti & Lino" },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                    selectedCategory === cat.id
                      ? "bg-[#1c1917] text-white shadow"
                      : "bg-white border border-[#e7e3dc] text-[#555] hover:border-[#1c1917]"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-2 text-xs text-[#666]">
              <span>Ordina per:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "featured" | "asc" | "desc")}
                className="rounded-lg border border-[#e7e3dc] bg-white px-2.5 py-1.5 text-xs font-medium text-[#1c1917] outline-none"
              >
                <option value="featured">In Evidenza</option>
                <option value="asc">Prezzo: dal più basso</option>
                <option value="desc">Prezzo: dal più alto</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {filtered.map((product) => {
              const currentVariant = selectedVariants[product.id] || product.variants[0].name;

              return (
                <div key={product.id} className="group flex flex-col justify-between">
                  <div>
                    {/* Image Container with Hover zoom */}
                    <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#f0ece5]">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />

                      {product.tag && (
                        <span className="absolute top-3 left-3 rounded-full bg-white/90 backdrop-blur-md px-3 py-1 text-[11px] font-semibold text-[#1c1917] shadow-sm">
                          {product.tag}
                        </span>
                      )}

                      <button
                        onClick={() => setQuickViewProduct(product)}
                        className="absolute bottom-3 inset-x-3 rounded-xl bg-white/90 py-2.5 text-center text-xs font-bold text-[#1c1917] opacity-0 backdrop-blur-md transition-all duration-200 group-hover:opacity-100 shadow-md hover:bg-white"
                      >
                        Anteprima Scheda Tecnica
                      </button>
                    </div>

                    {/* Product Meta */}
                    <div className="mt-4 flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[11px] font-medium text-[#998b7a] uppercase tracking-wider">
                          {product.categoryLabel} • {product.artisan}
                        </span>
                        <h3 className="font-serif text-lg font-bold text-[#1c1917] mt-0.5">
                          {product.name}
                        </h3>
                      </div>
                      <span className="font-serif text-lg font-semibold text-[#1c1917]">
                        €{product.price}
                      </span>
                    </div>

                    {/* Color Variant Swatches */}
                    <div className="mt-3 flex items-center gap-2">
                      <span className="text-[11px] text-[#888]">Variante:</span>
                      <div className="flex items-center gap-1.5">
                        {product.variants.map((v) => (
                          <button
                            key={v.name}
                            onClick={() =>
                              setSelectedVariants((prev) => ({ ...prev, [product.id]: v.name }))
                            }
                            title={v.name}
                            className={`size-4 rounded-full border transition-all ${
                              currentVariant === v.name
                                ? "ring-2 ring-[#1c1917] ring-offset-1 scale-110"
                                : "border-black/20 hover:scale-105"
                            }`}
                            style={{ backgroundColor: v.hex }}
                          />
                        ))}
                      </div>
                      <span className="text-[11px] font-medium text-[#555] ml-1">
                        {currentVariant}
                      </span>
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={() => addToCart(product, currentVariant)}
                    className="mt-5 w-full rounded-xl border border-[#1c1917] py-2.5 text-xs font-bold uppercase tracking-wider text-[#1c1917] transition-all hover:bg-[#1c1917] hover:text-white"
                  >
                    Aggiungi alla Borsa
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        {/* Artisan Values section */}
        <section className="border-t border-[#e7e3dc] bg-[#f5f1eb] px-6 py-20">
          <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-4">
              <span className="font-serif text-3xl font-bold text-[#1c1917]">01</span>
              <h3 className="font-serif text-lg font-bold text-[#1c1917] mt-2">Materia Prima Autentica</h3>
              <p className="mt-2 text-xs text-[#666] leading-relaxed">
                Nessun composto sintetico. Marmi cavati in Toscana, legni stagionati naturalmente e argille locali.
              </p>
            </div>
            <div className="p-4">
              <span className="font-serif text-3xl font-bold text-[#1c1917]">02</span>
              <h3 className="font-serif text-lg font-bold text-[#1c1917] mt-2">Lentezza & Maestria</h3>
              <p className="mt-2 text-xs text-[#666] leading-relaxed">
                Ogni creazione richiede fino a 24 ore di lavoro manuale per finiture a scalpello, cera e fuoco.
              </p>
            </div>
            <div className="p-4">
              <span className="font-serif text-3xl font-bold text-[#1c1917]">03</span>
              <h3 className="font-serif text-lg font-bold text-[#1c1917] mt-2">Imballo Sostenibile</h3>
              <p className="mt-2 text-xs text-[#666] leading-relaxed">
                Scatole rigide in cartone riciclato certificato FSC, senza plastica e sigillate con nastro di lino.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-[#e7e3dc] bg-white px-6 py-12 text-center text-xs text-[#777]">
          <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="font-serif font-semibold text-[#1c1917]">
              AURA Atelier S.r.l. • Sviluppo E-Commerce a cura di DevLeonardis
            </p>
            <div className="flex items-center gap-4">
              <Link href="/#projects" className="text-[#1c1917] font-semibold hover:underline">Portfolio DevLeonardis</Link>
              <span>•</span>
              <a href="https://wa.me/393665252021" target="_blank" rel="noopener noreferrer" className="hover:text-black">Contatta lo Sviluppatore</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
