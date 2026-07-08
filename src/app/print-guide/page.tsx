import React from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ShieldAlert, Sparkles, Printer } from "lucide-react";

export default function PrintGuidePage() {
  return (
    <div className="max-w-[1000px] mx-auto px-4 py-8 flex flex-col gap-10 text-[#191c1d]">
      
      {/* Back Button */}
      <Link href="/" className="inline-flex items-center gap-2 text-xs text-slate-500 hover:text-primary transition-colors font-bold w-fit mb-2">
        <ArrowLeft className="w-4 h-4" /> Zurück zur Startseite
      </Link>

      {/* Header */}
      <div className="flex flex-col gap-3">
        <span className="text-secondary text-xs font-bold uppercase tracking-widest">Druckdaten-Vorbereitung</span>
        <h1 className="text-4xl font-black text-foreground tracking-tight">Druckdaten richtig anlegen</h1>
        <p className="text-sm text-slate-500 max-w-xl font-medium leading-relaxed">
          Damit Ihr Druckergebnis gestochen scharf und farbecht wird, beachten Sie bitte unsere Richtlinien für Druckdaten.
        </p>
      </div>

      <hr className="border-[#e7e8e9]" />

      {/* Main Grid Checklist */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Color Profile Card */}
        <div className="bg-white border border-[#e7e8e9] p-8 rounded-2xl flex flex-col gap-4 shadow-sm">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-foreground">1. CMYK Farbraum</h2>
          <p className="text-xs text-slate-500 leading-relaxed font-semibold">
            Legen Sie Ihre Daten immer im **CMYK-Farbraus** (Farbprofil: **Coated FOGRA39**) an. 
          </p>
          <div className="p-3.5 bg-secondary/5 border border-secondary/10 rounded-xl text-[10px] text-slate-600 font-semibold leading-relaxed">
            <strong className="text-secondary font-bold">Achtung:</strong> Im RGB-Farbraum angelegte Daten werden automatisch konvertiert, was zu Farbabweichungen (blasseren Farben) im Druck führen kann.
          </div>
        </div>

        {/* Resolution Card */}
        <div className="bg-white border border-[#e7e8e9] p-8 rounded-2xl flex flex-col gap-4 shadow-sm">
          <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
            <Printer className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-foreground">2. 300 DPI Auflösung</h2>
          <p className="text-xs text-slate-500 leading-relaxed font-semibold">
            Bilder und Rastergrafiken sollten eine Auflösung von mindestens **300 DPI** in Originalgröße aufweisen.
          </p>
          <div className="p-3.5 bg-primary/5 border border-primary/10 rounded-xl text-[10px] text-slate-600 font-semibold leading-relaxed">
            <strong className="text-primary font-bold">Tipp:</strong> Für Großformate (z.B. Planen ab 3 Meter Länge) reicht oft auch eine Auflösung von 150 DPI aus. Logos sollten idealerweise als Vektorgrafiken übermittelt werden.
          </div>
        </div>

        {/* Bleed Card */}
        <div className="bg-white border border-[#e7e8e9] p-8 rounded-2xl flex flex-col gap-4 shadow-sm">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-foreground">3. 2mm Beschnitt</h2>
          <p className="text-xs text-slate-500 leading-relaxed font-semibold">
            Fügen Sie Ihren Layouts immer einen umlaufenden **Beschnitt von 2 mm** (Bleed) hinzu.
          </p>
          <div className="p-3.5 bg-secondary/5 border border-secondary/10 rounded-xl text-[10px] text-slate-600 font-semibold leading-relaxed">
            <strong className="text-secondary font-bold">Wichtig:</strong> Platzieren Sie Texte und wichtige Bildelemente mit mindestens 4 mm Abstand zum Rand, damit sie beim Schneiden nicht angeschnitten werden.
          </div>
        </div>

      </div>

      <hr className="border-[#e7e8e9]" />

      {/* Recommended formats list */}
      <div className="bg-white border border-[#e7e8e9] p-8 rounded-2xl flex flex-col gap-4 shadow-sm">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-primary" /> Akzeptierte Dateiformate
        </h2>
        <p className="text-xs text-slate-500 leading-relaxed font-semibold">
          Wir empfehlen den Export als standardisierte PDF-Datei. Das sichert eine unveränderte Ausgabe Ihrer Schriften und Grafiken.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2">
          {[
            { format: "PDF/X-4", desc: "Empfohlen (Standard)" },
            { format: "PDF/X-1a", desc: "Offset-Kompatibel" },
            { format: "TIFF", desc: "Ohne Kompression" },
            { format: "JPG / PNG", desc: "Min. 300 DPI" },
          ].map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-[#f8f9fa] border border-[#e7e8e9] text-center">
              <span className="text-sm font-extrabold text-foreground block">{item.format}</span>
              <span className="text-[10px] text-slate-400 font-semibold block mt-1">{item.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
