import React from "react";
import Link from "next/link";
import { ArrowLeft, Truck, CreditCard, ShieldCheck } from "lucide-react";

export default function VersandZahlungPage() {
  return (
    <div className="max-w-[1000px] mx-auto px-4 py-8 flex flex-col gap-10 text-[#191c1d]">
      
      {/* Back Button */}
      <Link href="/" className="inline-flex items-center gap-2 text-xs text-slate-500 hover:text-primary transition-colors font-bold w-fit mb-2">
        <ArrowLeft className="w-4 h-4" /> Zurück zur Startseite
      </Link>

      {/* Header */}
      <div className="flex flex-col gap-3">
        <span className="text-secondary text-xs font-bold uppercase tracking-widest font-sans">Kunden-Informationen</span>
        <h1 className="text-4xl font-black text-foreground tracking-tight">Versand & Zahlung</h1>
        <p className="text-sm text-slate-500 max-w-xl font-medium leading-relaxed">
          Hier finden Sie alle Details zu den verfügbaren Versandarten, Lieferzeiten und sicheren Zahlungsmöglichkeiten für Ihre Druckbestellung.
        </p>
      </div>

      <hr className="border-[#e7e8e9]" />

      {/* Grid columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        
        {/* Shipping Panel */}
        <div className="bg-white border border-[#e7e8e9] p-8 rounded-2xl flex flex-col gap-6 shadow-sm">
          <h2 className="text-xl font-extrabold text-foreground flex items-center gap-2">
            <Truck className="w-5 h-5 text-primary" /> Versand & Lieferzeiten
          </h2>
          <p className="text-xs text-slate-500 leading-relaxed font-semibold">
            Wir produzieren und versenden klimaneutral aus Deutschland. Alle Lieferzeiten beziehen sich auf den Zeitraum ab erfolgreicher Datenfreigabe.
          </p>

          <div className="flex flex-col gap-4 text-xs font-semibold">
            <div className="p-4 rounded-xl bg-[#f8f9fa] border border-[#e7e8e9] flex justify-between items-center">
              <div>
                <span className="font-extrabold text-foreground block text-sm">Standard Versand</span>
                <span className="text-slate-400 text-[10px]">Lieferzeit: 4-5 Werktage</span>
              </div>
              <span className="text-primary font-bold">Kostenlos</span>
            </div>

            <div className="p-4 rounded-xl bg-[#f8f9fa] border border-[#e7e8e9] flex justify-between items-center">
              <div>
                <span className="font-extrabold text-foreground block text-sm">Express Versand (Priority)</span>
                <span className="text-slate-400 text-[10px]">Lieferzeit: 2-3 Werktage</span>
              </div>
              <span className="text-primary font-bold">15,00 €</span>
            </div>
            
            <div className="p-4 rounded-xl bg-[#f8f9fa] border border-[#e7e8e9] flex justify-between items-center">
              <div>
                <span className="font-extrabold text-foreground block text-sm">24-Stunden Express</span>
                <span className="text-slate-400 text-[10px]">Zustellung am nächsten Werktag</span>
              </div>
              <span className="text-primary font-bold">45,00 €</span>
            </div>
          </div>
        </div>

        {/* Payment Panel */}
        <div className="bg-white border border-[#e7e8e9] p-8 rounded-2xl flex flex-col gap-6 shadow-sm">
          <h2 className="text-xl font-extrabold text-foreground flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-secondary" /> Zahlungsmöglichkeiten
          </h2>
          <p className="text-xs text-slate-500 leading-relaxed font-semibold">
            Wir bieten Ihnen gängige B2B- und B2C-Zahlungsabwicklungen an. Alle Transaktionen sind SSL-verschlüsselt.
          </p>

          <div className="flex flex-col gap-4 text-xs font-semibold">
            <div className="p-4 rounded-xl bg-[#f8f9fa] border border-[#e7e8e9]">
              <span className="font-extrabold text-foreground block text-sm">PayPal & PayPal B2B</span>
              <p className="text-[10px] text-slate-400 mt-1">Einfache und sofortige Zahlung. Perfekt für schnelle Freigaben.</p>
            </div>
            <div className="p-4 rounded-xl bg-[#f8f9fa] border border-[#e7e8e9]">
              <span className="font-extrabold text-foreground block text-sm">Klarna Rechnungskauf</span>
              <p className="text-[10px] text-slate-400 mt-1">Bequemer Kauf auf Rechnung mit einem Zahlungsziel von 14 oder 30 Tagen.</p>
            </div>
            <div className="p-4 rounded-xl bg-[#f8f9fa] border border-[#e7e8e9]">
              <span className="font-extrabold text-foreground block text-sm">Stripe Kreditkartenzahlung</span>
              <p className="text-[10px] text-slate-400 mt-1">Wir akzeptieren Visa, Mastercard und American Express mit 3D-Secure Schutz.</p>
            </div>
          </div>
        </div>

      </div>

      <hr className="border-[#e7e8e9]" />

      <div className="bg-white border border-[#e7e8e9] p-6 rounded-2xl flex items-center gap-4 shadow-sm max-w-2xl mx-auto">
        <ShieldCheck className="w-8 h-8 text-primary flex-shrink-0" />
        <div className="text-xs font-semibold text-slate-500">
          <span className="font-bold text-foreground text-sm block">Sicherer Transport</span>
          <p className="mt-1">
            Wir verpacken alle Plattendrucke (Acrylglas, Alu-Dibond) in speziell gepolsterten transportsicheren Kartonagen, um Beschädigungen auf dem Transportweg auszuschließen.
          </p>
        </div>
      </div>
    </div>
  );
}
