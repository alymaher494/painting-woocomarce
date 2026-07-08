"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Search, CheckCircle } from "lucide-react";
import gsap from "gsap";

interface Product {
  id: string;
  slug: string;
  name: string;
  category: "fine-art" | "platten" | "werbetechnik";
  categoryName: string;
  priceFrom: number;
  description: string;
  image: string;
  features: string[];
}

const PRODUCTS: Product[] = [
  {
    id: "p1",
    slug: "fine-art-poster",
    name: "Fine-Art Poster",
    category: "fine-art",
    categoryName: "Fine-Art & Fotodruck",
    priceFrom: 19.9,
    description: "Premium-Pigmentdruck auf schwerem Künstlerkarton. Fantastischer Detailreichtum und Farbbeständigkeit.",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=500&auto=format&fit=crop&q=80",
    features: ["Hahnemühle 250g Papier", "12-Farben Lucid-Druck", "Reflexionsfreie Oberfläche"],
  },
  {
    id: "p2",
    slug: "acrylglas",
    name: "Acrylglas Fine-Art",
    category: "platten",
    categoryName: "Plattendruck & Schilder",
    priceFrom: 49.9,
    description: "Kristallklare Tiefenwirkung auf 4mm echtem Acrylglas. Rückseitig UV-geschützt kaschiert.",
    image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=500&auto=format&fit=crop&q=80",
    features: ["4mm Stärke", "Poliertes Kantenfinish", "Inkl. Profilaufhängung"],
  },
  {
    id: "p3",
    slug: "alu-dibond",
    name: "Alu-Dibond Butler Finish",
    category: "platten",
    categoryName: "Plattendruck & Schilder",
    priceFrom: 39.9,
    description: "Verbundplatte aus zwei Aluminium-Schichten. Extrem biegesteif, witterungsbeständig und edel gebürstet.",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=500&auto=format&fit=crop&q=80",
    features: ["Metallic-Effekt", "Wasserdicht & UV-fest", "B1 Brandschutzzertifiziert"],
  },
  {
    id: "p4",
    slug: "werbeplane",
    name: "Werbeplane PVC",
    category: "werbetechnik",
    categoryName: "Werbetechnik",
    priceFrom: 24.9,
    description: "Reißfestes 500g PVC-Material. Komplett umlaufend gesäumt und alle 50cm mit Edelstahl-Ösen versehen.",
    image: "https://images.unsplash.com/photo-1561070791-26c113006238?w=500&auto=format&fit=crop&q=80",
    features: ["500g B1 PVC-Material", "Rundum gesäumt & geöst", "Witterungsbeständig"],
  },
  {
    id: "p5",
    slug: "hartschaumplatte",
    name: "Hartschaumplatte PVC",
    category: "platten",
    categoryName: "Plattendruck & Schilder",
    priceFrom: 29.9,
    description: "Leichte und flexible Forex-Platte. Hervorragend geeignet für Messen, Beschilderungen und Innenwände.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500&auto=format&fit=crop&q=80",
    features: ["Federleicht & stabil", "Matte Oberflächenoptik", "Einfache Zuschnittskontur"],
  },
];

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (gridRef.current) {
      gsap.fromTo(
        gridRef.current.children,
        { opacity: 0, scale: 0.97, y: 10 },
        { opacity: 1, scale: 1, y: 0, duration: 0.35, stagger: 0.05, overwrite: "auto" }
      );
    }
  }, [activeCategory, searchQuery]);

  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesCategory = activeCategory === "all" || product.category === activeCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-8 flex flex-col gap-12 text-[#191c1d]">
      {/* Title Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground">Produktkonfigurator</h1>
        <p className="text-sm text-slate-500 max-w-xl">
          Wählen Sie ein Basisprodukt aus, um Maße, Materialien und Weiterverarbeitungen im Live-Rechner zu konfigurieren.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 bg-white border border-[#e7e8e9] rounded-2xl p-6 shadow-sm">
        {/* Categories Tabs */}
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          {[
            { id: "all", label: "Alle Produkte" },
            { id: "fine-art", label: "Fine-Art & Foto" },
            { id: "platten", label: "Platten & Schilder" },
            { id: "werbetechnik", label: "Werbetechnik" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeCategory === tab.id
                  ? "bg-primary text-white shadow-sm"
                  : "text-slate-600 hover:text-primary bg-[#f3f4f5] hover:bg-[#e7e8e9]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Produkt suchen..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-full precision-input text-xs"
          />
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="outline-card overflow-hidden flex flex-col group bg-white"
            >
              {/* Product Image */}
              <div className="relative h-56 w-full bg-[#f3f4f5] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 bg-white border border-[#e7e8e9] text-[#191c1d] text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full z-10 shadow-sm">
                  {product.categoryName}
                </span>
              </div>

              {/* Product Details */}
              <div className="p-6 flex flex-col flex-1 gap-4">
                <div className="flex justify-between items-start gap-2">
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block uppercase font-bold tracking-wider">Ab</span>
                    <span className="text-lg font-bold text-primary">
                      {product.priceFrom.toFixed(2)} €*
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed flex-1">
                  {product.description}
                </p>

                {/* Features List */}
                <ul className="flex flex-col gap-1.5 pt-4 border-t border-[#e7e8e9]">
                  {product.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                      <CheckCircle className="w-3.5 h-3.5 text-primary-light flex-shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/products/${product.slug}`}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-full bg-primary hover:bg-primary-light text-white font-bold text-sm transition-all duration-300 shadow-sm"
                >
                  Konfigurieren & Kaufen
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white border border-[#e7e8e9] rounded-2xl">
          <p className="text-slate-500 text-sm">Keine Produkte für die aktuelle Filterung gefunden.</p>
        </div>
      )}

      <div className="text-[10px] text-slate-400 text-center mt-6">
        * Alle Preise verstehen sich netto zzgl. 19% MwSt. und Versandkosten.
      </div>
    </div>
  );
}
