"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Search, CheckCircle } from "lucide-react";
import gsap from "gsap";

import { getWooProducts } from "@/lib/api";

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

const DEFAULT_PRODUCTS: Product[] = [
  {
    id: "p1",
    slug: "fertige-aufkleber",
    name: "Fertige Aufkleber (Pizza Design)",
    category: "fine-art",
    categoryName: "Fertige Aufkleber",
    priceFrom: 5.00,
    description: "Design-fertige Aufkleber mit festen Formaten direkt vom Hersteller.",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format&fit=crop&q=80",
    features: ["Fertiges Pizza-Design", "Durchmesser 10, 20 oder 30cm", "Kein Upload notwendig"],
  },
  {
    id: "p2",
    slug: "aufkleber",
    name: "Outdoor Aufkleber (Freie Größe)",
    category: "werbetechnik",
    categoryName: "Aufkleber",
    priceFrom: 15.00,
    description: "Wetterfeste PVC-Aufkleber mit freier Formatwahl für den Außenbereich.",
    image: "https://images.unsplash.com/photo-1561070791-26c113006238?w=500&auto=format&fit=crop&q=80",
    features: ["10x10 cm bis 150x400 cm", "Freie Formatkonfiguration", "Min. 15€ Netto-Bestellwert"],
  },
  {
    id: "p3",
    slug: "poster",
    name: "Premium B2B Werbeposter",
    category: "fine-art",
    categoryName: "Poster",
    priceFrom: 12.90,
    description: "Hochauflösende Drucke für Präsentationen und Verkaufsräume.",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=500&auto=format&fit=crop&q=80",
    features: ["Formate 25x25, 30x30, 50x50cm", "Optional mit Randösen", "Wahlweise Blueback- oder Fotopapier"],
  },
  {
    id: "p4",
    slug: "aufkleber-auflagen",
    name: "Sticker mit festen Auflagen",
    category: "platten",
    categoryName: "Aufkleber mit bestimmten Auflagen",
    priceFrom: 4.50,
    description: "Etiketten und Aufkleber in vordefinierten Mengenstaffeln für B2B.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500&auto=format&fit=crop&q=80",
    features: ["2, 6, 10, 12, 25, 50 Stück", "Format A7 oder A8", "Hohe Staffelrabatte"],
  },
  {
    id: "p5",
    slug: "acrylglas",
    name: "Acrylglas Fine-Art",
    category: "platten",
    categoryName: "Plattendruck & Schilder",
    priceFrom: 49.90,
    description: "Kristallklare Tiefenwirkung auf 4mm echtem Acrylglas. Rückseitig UV-geschützt kaschiert.",
    image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=500&auto=format&fit=crop&q=80",
    features: ["4mm Stärke", "Poliertes Kantenfinish", "Inkl. Profilaufhängung"],
  },
  {
    id: "p6",
    slug: "alu-dibond",
    name: "Alu-Dibond Butler Finish",
    category: "platten",
    categoryName: "Plattendruck & Schilder",
    priceFrom: 39.90,
    description: "Verbundplatte aus zwei Aluminium-Schichten. Extrem biegesteif, witterungsbeständig und edel gebürstet.",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=500&auto=format&fit=crop&q=80",
    features: ["Metallic-Effekt", "Wasserdicht & UV-fest", "B1 Brandschutzzertifiziert"],
  },
];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(DEFAULT_PRODUCTS);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchLiveProducts() {
      const wooData = await getWooProducts();
      if (wooData && wooData.length > 0) {
        const mapped: Product[] = wooData.map((node: any) => {
          const rawPrice = node.price || "29.90";
          const cleanPrice = parseFloat(rawPrice.replace(/[^0-9.]/g, "") || "29.90");
          return {
            id: node.id || String(node.databaseId),
            slug: node.slug,
            name: node.name,
            category: "platten", // Map standard category
            categoryName: "Druckprodukt",
            priceFrom: cleanPrice,
            description: "Premium Druckprodukt, synchronisiert aus WooCommerce.",
            image: node.image?.sourceUrl || "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=500&auto=format&fit=crop&q=80",
            features: ["CMYK-Farbraum", "Proficheck inklusive", "Expressversand bereit"],
          };
        });
        setProducts(mapped);
      }
    }
    fetchLiveProducts();
  }, []);

  useEffect(() => {
    if (gridRef.current) {
      gsap.fromTo(
        gridRef.current.children,
        { opacity: 0, scale: 0.97, y: 10 },
        { opacity: 1, scale: 1, y: 0, duration: 0.35, stagger: 0.05, overwrite: "auto" }
      );
    }
  }, [activeCategory, searchQuery, products]);

  const filteredProducts = products.filter((product) => {
    const matchesCategory = activeCategory === "all" || product.category === activeCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col gap-12 text-[#191c1d] bg-[#f8f9fa]">
      <div className="max-w-[1400px] mx-auto w-full px-4 md:px-8 pt-8 flex flex-col gap-4">
        {/* Title Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">Produktkonfigurator</h1>
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
    </div>
  );
}
