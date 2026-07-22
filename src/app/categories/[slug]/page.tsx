"use client";

import React, { use, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { getWooCategoryBySlug, getWooProductsByCategory } from "@/lib/api";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const resolvedParams = use(params);
  const { slug } = resolvedParams;
  const pageRef = useRef<HTMLDivElement>(null);

  const [categoryName, setCategoryName] = useState("Druckprodukte");
  const [categoryDesc, setCategoryDesc] = useState("Entdecken Sie unser breites Portfolio an zentimetergenau konfigurierten B2B-Druckprodukten.");
  const [categoryCover, setCategoryCover] = useState("https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=1000&auto=format&fit=crop&q=80");
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadCategoryData() {
      setIsLoading(true);

      // Fetch category info
      const catInfo = await getWooCategoryBySlug(slug);
      if (catInfo) {
        setCategoryName(catInfo.name);
        if (catInfo.description) setCategoryDesc(catInfo.description);
        if (catInfo.image?.sourceUrl) setCategoryCover(catInfo.image.sourceUrl);
      }

      // Fetch products in this category
      const catProducts = await getWooProductsByCategory(slug);
      if (catProducts && catProducts.length > 0) {
        setProducts(catProducts);
      }

      setIsLoading(false);
    }
    loadCategoryData();
  }, [slug]);

  useEffect(() => {
    if (!isLoading && pageRef.current) {
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
    }
  }, [isLoading, slug, products]);

  return (
    <div ref={pageRef} className="flex flex-col gap-12 text-[#191c1d] bg-[#f8f9fa]">
      {/* Back Button */}
      <div className="max-w-[1400px] mx-auto w-full px-4 md:px-8 pt-8">
        <Link href="/products" className="inline-flex items-center gap-2 text-slate-500 hover:text-primary transition-colors text-sm w-fit font-bold">
          <ArrowLeft className="w-4 h-4" /> Zurück zu allen Produkten
        </Link>
      </div>

      {/* Category Header Card - FULL WIDTH */}
      <div className="relative rounded-2xl overflow-hidden border border-[#e7e8e9] min-h-[300px] flex items-center p-8 md:p-16 bg-white shadow-sm">
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-transparent z-10" />
        <img
          src={categoryCover}
          alt={categoryName}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="relative z-20 max-w-[1400px] mx-auto w-full px-4 md:px-8 flex flex-col gap-4 cat-fade">
          <span className="text-secondary text-xs font-bold uppercase tracking-widest">Kategorie</span>
          <h1 className="text-3xl md:text-5xl font-black text-foreground">{categoryName}</h1>
          <p className="text-xs md:text-sm text-slate-500 leading-relaxed font-medium">
            {categoryDesc}
          </p>
        </div>
      </div>

      {/* Products Grid - constrained */}
      <div className="max-w-[1400px] mx-auto w-full px-4 md:px-8 flex flex-col gap-8">
        <h2 className="text-2xl font-bold text-foreground">Passende Druckprodukte</h2>

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-slate-500 text-sm font-semibold">Produkte werden geladen...</p>
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product: any) => {
              const rawPrice = product.price || "0";
              const cleanPrice = parseFloat(rawPrice.replace(/[^0-9.,]/g, "").replace(",", ".") || "0");
              return (
                <div
                  key={product.id || product.databaseId}
                  className="cat-item outline-card overflow-hidden flex flex-col bg-white group"
                >
                  <div className="relative h-56 w-full bg-[#f3f4f5] overflow-hidden">
                    <img
                      src={product.image?.sourceUrl || "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=500&auto=format&fit=crop&q=80"}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1 gap-4">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                      {cleanPrice > 0 && (
                        <div className="text-right">
                          <span className="text-[10px] text-slate-400 block uppercase font-bold tracking-wider">Ab</span>
                          <span className="text-lg font-bold text-primary">
                            {cleanPrice.toFixed(2)} €*
                          </span>
                        </div>
                      )}
                    </div>

                    <p className="text-xs text-slate-500 leading-relaxed flex-1">
                      {product.description
                        ? product.description.replace(/<[^>]*>/g, "").slice(0, 150) + "..."
                        : "Premium Druckprodukt aus WooCommerce."}
                    </p>

                    <Link
                      href={`/products/${product.slug}`}
                      className="flex items-center justify-center gap-2 w-full py-3 rounded-full bg-primary hover:bg-primary-light text-white font-bold text-sm transition-all duration-300 shadow-sm"
                    >
                      Konfigurieren & Bestellen
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
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
