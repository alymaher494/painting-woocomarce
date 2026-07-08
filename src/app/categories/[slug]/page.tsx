"use client";

import React, { use, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import gsap from "gsap";

interface Product {
  id: string;
  slug: string;
  name: string;
  category: "fine-art" | "platten" | "werbetechnik";
  priceFrom: number;
  description: string;
  image: string;
  features: string[];
}

const CATEGORY_INFO: Record<string, { title: string; desc: string; cover: string }> = {
  "fine-art": {
    title: "Fine-Art & Fotodruck",
    desc: "Bringen Sie Ihre Fotografien und digitale Kunstwerke groß raus. Wir drucken auf zertifizierten Papieren renommierter Hersteller wie Hahnemühle mit modernsten 12-Farb-Pigmentdruckern für lebensechte Farbtiefe.",
    cover: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=1000&auto=format&fit=crop&q=80",
  },
  platten: {
    title: "Plattendruck & Schilder",
    desc: "Direktdruck auf stabile Plattenmaterialien wie Acrylglas, Alu-Dibond oder Forex-Hartschaumplatten. Höchste Witterungsbeständigkeit und gestochen scharfe Details für den In- und Outdoorbereich.",
    cover: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=1000&auto=format&fit=crop&q=80",
  },
  werbetechnik: {
    title: "Werbetechnik & Banner",
    desc: "Großformatdruck auf robuste PVC-Planen oder winddurchlässiges Meshgewebe. Ideal für Bauzäune, Fassadenwerbung oder Veranstaltungen. Komplett konfiguriert mit Randverstärkung und Ösen.",
    cover: "https://images.unsplash.com/photo-1561070791-26c113006238?w=1000&auto=format&fit=crop&q=80",
  },
};

const PRODUCTS: Product[] = [
  {
    id: "p1",
    slug: "fine-art-poster",
    name: "Fine-Art Poster",
    category: "fine-art",
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
    priceFrom: 29.9,
    description: "Leichte und flexible Forex-Platte. Hervorragend geeignet für Messen, Beschilderungen und Innenwände.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500&auto=format&fit=crop&q=80",
    features: ["Federleicht & stabil", "Matte Oberflächenoptik", "Einfache Zuschnittskontur"],
  },
];

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const resolvedParams = use(params);
  const { slug } = resolvedParams;
  const pageRef = useRef<HTMLDivElement>(null);

  const info = CATEGORY_INFO[slug] || {
    title: "Druckprodukte",
    desc: "Entdecken Sie unser breites Portfolio an zentimetergenau konfigurierten B2B-Druckprodukten.",
    cover: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=1000&auto=format&fit=crop&q=80",
  };

  const filteredProducts = PRODUCTS.filter((product) => product.category === slug);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cat-fade", {
        opacity: 0,
        y: 15,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
      });
      gsap.from(".cat-item", {
        opacity: 0,
        scale: 0.98,
        y: 20,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
      });
    }, pageRef);
    return () => ctx.revert();
  }, [slug]);

  return (
    <div ref={pageRef} className="max-w-[1400px] mx-auto px-4 md:px-8 py-8 flex flex-col gap-12 text-[#191c1d]">
      {/* Back Button */}
      <Link href="/products" className="inline-flex items-center gap-2 text-slate-500 hover:text-primary transition-colors text-sm w-fit font-bold">
        <ArrowLeft className="w-4 h-4" /> Zurück zu allen Produkten
      </Link>

      {/* Category Header Card */}
      <div className="relative rounded-2xl overflow-hidden border border-[#e7e8e9] min-h-[300px] flex items-center p-8 md:p-16 bg-white shadow-sm">
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-transparent z-10" />
        <img
          src={info.cover}
          alt={info.title}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="relative z-20 max-w-2xl flex flex-col gap-4 cat-fade">
          <span className="text-secondary text-xs font-bold uppercase tracking-widest">Kategorie</span>
          <h1 className="text-4xl md:text-5xl font-black text-foreground">{info.title}</h1>
          <p className="text-xs md:text-sm text-slate-500 leading-relaxed font-medium">
            {info.desc}
          </p>
        </div>
      </div>

      {/* Grid listing */}
      <div className="flex flex-col gap-8">
        <h2 className="text-2xl font-bold text-foreground">Passende Druckprodukte</h2>
        
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="cat-item outline-card overflow-hidden flex flex-col bg-white"
              >
                <div className="relative h-56 w-full bg-[#f3f4f5] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
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
                    Konfigurieren & Bestellen
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white border border-[#e7e8e9] rounded-2xl">
            <p className="text-slate-500 text-sm">Keine Produkte in dieser Kategorie verfügbar.</p>
          </div>
        )}
      </div>

      <div className="text-[10px] text-slate-400 text-center mt-6">
        * Alle Preise verstehen sich netto zzgl. 19% MwSt. und Versandkosten.
      </div>
    </div>
  );
}
