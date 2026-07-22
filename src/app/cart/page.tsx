"use client";

import React from "react";
import Link from "next/link";
import { Trash2, ArrowRight, ShoppingCart, FileText, CheckCircle2, ChevronRight } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { cart, removeFromCart } = useCart();

  const totalNet = cart.reduce((sum, item) => sum + item.pricing.net, 0);
  const totalVat = cart.reduce((sum, item) => sum + item.pricing.vat, 0);
  const totalGross = cart.reduce((sum, item) => sum + item.pricing.gross, 0);

  return (
    <div className="flex flex-col gap-8 text-[#191c1d] bg-[#f8f9fa]">
      <div className="max-w-[1400px] mx-auto w-full px-4 md:px-8 pt-8 flex flex-col gap-6">
      {/* Breadcrumb / Step Indicator */}
      <div className="flex items-center gap-2 text-xs text-slate-500 font-bold">
        <Link href="/products" className="hover:text-primary transition-colors">Shop</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-foreground">Warenkorb</span>
        <ChevronRight className="w-3.5 h-3.5 font-normal" />
        <span className="text-slate-400">Kasse</span>
      </div>

      <h1 className="text-3xl font-extrabold text-foreground">Ihr Warenkorb</h1>

      {cart.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-[65%_35%] gap-8 items-start">
          
          {/* Left Column: Cart items table */}
          <div className="flex flex-col gap-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-[#e7e8e9] p-6 rounded-2xl flex flex-col md:flex-row gap-6 items-start md:items-center justify-between shadow-sm"
              >
                {/* Product Meta */}
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border border-[#e7e8e9] bg-[#f3f4f5]">
                    <img
                      src={item.productImage}
                      alt={item.productName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-base font-extrabold text-foreground leading-snug">{item.productName}</h3>
                    <div className="text-[11px] text-slate-500 flex flex-wrap gap-x-3 gap-y-1 font-semibold mt-1">
                      <span>Maße: <strong className="text-foreground">{item.config.width}x{item.config.height} cm</strong></span>
                      <span>Menge: <strong className="text-foreground">{item.config.quantity}x</strong></span>
                      <span>Material: <strong className="text-foreground">{item.config.material}</strong></span>
                      <span>Versand: <strong className="text-foreground">{item.config.delivery.toUpperCase()}</strong></span>
                    </div>

                    {/* Uploaded File Link */}
                    {item.config.fileName && (
                      <div className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-semibold">
                        <FileText className="w-3.5 h-3.5 text-secondary" />
                        <span className="text-slate-500">Datei:</span>
                        <a
                          href={item.config.fileUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-secondary hover:underline font-bold break-all"
                        >
                          {item.config.fileName}
                        </a>
                        <span className="text-slate-400 text-[10px]">({item.config.fileSize})</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Pricing & Actions */}
                <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-[#e7e8e9] gap-4">
                  <div className="text-left md:text-right">
                    <span className="text-lg font-extrabold text-foreground block">
                      {item.pricing.gross.toFixed(2)} €
                    </span>
                    <span className="text-xs text-slate-400 font-semibold block mt-0.5">
                      inkl. MwSt. ({item.pricing.net.toFixed(2)} € Netto)
                    </span>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2.5 rounded-full border border-[#e7e8e9] hover:border-red-500/30 hover:bg-red-500/5 text-slate-400 hover:text-red-500 transition-all cursor-pointer"
                    title="Artikel löschen"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Sticky Summary Panel */}
          <div className="lg:sticky lg:top-[120px] h-max flex flex-col gap-6">
            <div className="bg-white border border-[#e7e8e9] p-6 rounded-2xl flex flex-col gap-6 shadow-sm">
              <h2 className="text-lg font-bold text-foreground border-b border-[#e7e8e9] pb-4">Bestellübersicht</h2>
              
              <div className="flex flex-col gap-3 text-xs text-slate-500 font-semibold">
                <div className="flex justify-between">
                  <span>Zwischensumme (Netto)</span>
                  <span className="text-foreground font-bold">{totalNet.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between">
                  <span>zzgl. 19% MwSt.</span>
                  <span className="text-foreground font-bold">{totalVat.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between text-xs border-t border-[#e7e8e9] pt-3">
                  <span>Versandkosten</span>
                  <span className="text-primary font-bold">KOSTENLOS</span>
                </div>
              </div>

              <div className="border-t border-[#e7e8e9] pt-4 flex justify-between items-baseline">
                <span className="text-sm font-bold text-foreground">Gesamtsumme (Brutto)</span>
                <div className="text-right">
                  <span className="text-2xl font-black text-foreground">{totalGross.toFixed(2)} €</span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full bg-primary hover:bg-primary-light text-white font-extrabold text-sm hover:shadow-md transition-all duration-300 transform active:scale-95 text-center cursor-pointer"
              >
                Zur Kasse gehen
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="bg-white border border-[#e7e8e9] p-6 rounded-2xl flex flex-col gap-3 shadow-sm">
              <div className="flex items-center gap-2 text-foreground font-extrabold text-xs uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4 text-primary" /> B2B-Käuferschutz
              </div>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                Als registrierte deutsche Druckerei garantieren wir maximale Datensicherheit. Zahlungsabwicklungen erfolgen verschlüsselt nach PCI-DSS Standards.
              </p>
            </div>
          </div>

        </div>
      ) : (
        <div className="bg-white border border-[#e7e8e9] p-12 md:p-20 text-center flex flex-col items-center justify-center gap-6 max-w-2xl mx-auto rounded-2xl shadow-sm">
          <div className="w-16 h-16 rounded-full bg-[#f3f4f5] flex items-center justify-center text-slate-400">
            <ShoppingCart className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">Warenkorb ist leer</h2>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Sie haben noch keine maßgeschneiderten Druckkonfigurationen hinzugefügt. Konfigurieren Sie jetzt Ihr Wunschformat in wenigen Schritten.
            </p>
          </div>
          <Link
            href="/products"
            className="px-6 py-3 rounded-full bg-primary text-white font-bold hover:bg-primary-light transition-all text-xs uppercase tracking-wider"
          >
            Zu den Produkten
          </Link>
        </div>
      )}
    </div>
    </div>
  );
}
