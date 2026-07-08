"use client";

import React, { use, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, ShoppingBag, FileText, ArrowRight } from "lucide-react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") || `DE-${Math.floor(1000 + Math.random() * 9000)}`;

  return (
    <div className="max-w-[650px] mx-auto px-4 py-12 text-[#191c1d] text-center flex flex-col items-center gap-6">
      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
        <CheckCircle2 className="w-8 h-8" />
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-black text-foreground">Vielen Dank für Ihre Bestellung!</h1>
        <p className="text-sm text-slate-500 font-semibold leading-relaxed">
          Ihre Bestellung wurde erfolgreich übermittelt und wird unter der Nummer <strong className="text-foreground">{orderId}</strong> bearbeitet.
        </p>
      </div>

      <div className="bg-white border border-[#e7e8e9] p-6 rounded-2xl w-full text-left shadow-sm flex flex-col gap-4 text-xs font-semibold text-slate-500">
        <h3 className="font-extrabold text-sm text-foreground border-b border-[#e7e8e9] pb-3">Was passiert als Nächstes?</h3>
        
        <div className="flex gap-3">
          <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs flex-shrink-0">
            1
          </div>
          <p className="leading-relaxed">
            <strong>Datenprüfung:</strong> Unsere Grafik-Abteilung führt einen professionellen Check Ihrer Druckdaten durch, um sicherzustellen, dass Auflösung (300 DPI) und Schnittkanten passen.
          </p>
        </div>

        <div className="flex gap-3">
          <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs flex-shrink-0">
            2
          </div>
          <p className="leading-relaxed">
            <strong>Freigabe & Druck:</strong> Nach erfolgreichem Datencheck geht Ihr Auftrag direkt in unsere Produktion in Berlin/München.
          </p>
        </div>

        <div className="flex gap-3">
          <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs flex-shrink-0">
            3
          </div>
          <p className="leading-relaxed">
            <strong>Versand:</strong> Sobald das Paket versendet wird, erhalten Sie eine E-Mail mit Ihrer Trackingnummer (DHL/UPS).
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 w-full">
        <Link
          href="/dashboard"
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full bg-[#f3f4f5] hover:bg-[#e7e8e9] border border-[#e7e8e9] text-slate-700 font-bold text-xs uppercase tracking-wider"
        >
          <ShoppingBag className="w-4 h-4" />
          Bestellungen ansehen
        </Link>
        <Link
          href="/products"
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full bg-primary hover:bg-primary-light text-white font-bold text-xs uppercase tracking-wider shadow-sm"
        >
          Weiter einkaufen
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="text-slate-500 text-center py-20">Lade Bestätigung...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
