import React from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Shield, Heart, Award } from "lucide-react";

export default function UeberUnsPage() {
  return (
    <div className="flex flex-col gap-10 text-[#191c1d] bg-[#f8f9fa]">
      <div className="max-w-[1400px] mx-auto w-full px-4 md:px-8 pt-8 flex flex-col gap-4">
        {/* Back Button */}
      <Link href="/" className="inline-flex items-center gap-2 text-xs text-slate-500 hover:text-primary transition-colors font-bold w-fit mb-2">
        <ArrowLeft className="w-4 h-4" /> Zurück zur Startseite
      </Link>

      {/* Header */}
      <div className="flex flex-col gap-3">
        <span className="text-secondary text-xs font-bold uppercase tracking-widest font-sans">Das Team hinter dem Druck</span>
        <h1 className="text-3xl md:text-4xl font-black text-foreground tracking-tight">Über uns</h1>
        <p className="text-sm text-slate-500 max-w-xl font-medium leading-relaxed">
          Erfahren Sie mehr über unsere Werte, unsere modernen Produktionsstätten und unser Qualitätsversprechen.
        </p>
      </div>

      <hr className="border-[#e7e8e9]" />

      {/* Image Banner */}
      <div className="relative rounded-2xl overflow-hidden h-[350px] border border-[#e7e8e9]">
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&auto=format&fit=crop&q=80"
          alt="Druckerei Produktion"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
          <p className="text-white text-lg font-bold">Zentimetergenaue Perfektion seit 2018.</p>
        </div>
      </div>

      {/* Values Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white border border-[#e7e8e9] p-8 rounded-2xl flex flex-col gap-3 shadow-sm">
          <Shield className="w-8 h-8 text-primary" />
          <h3 className="text-base font-bold text-foreground">Made in Germany</h3>
          <p className="text-xs text-slate-500 leading-relaxed font-semibold">
            Unsere Hauptproduktionsstandorte in Berlin und München sichern kurze Transportwege und faire Beschäftigungsverhältnisse.
          </p>
        </div>
        <div className="bg-white border border-[#e7e8e9] p-8 rounded-2xl flex flex-col gap-3 shadow-sm">
          <Heart className="w-8 h-8 text-secondary" />
          <h3 className="text-base font-bold text-foreground">Klimaschutz</h3>
          <p className="text-xs text-slate-500 leading-relaxed font-semibold">
            Wir gleichen alle CO2-Emissionen unseres Druckprozesses durch anerkannte weltweite Waldschutzprojekte vollständig aus.
          </p>
        </div>
        <div className="bg-white border border-[#e7e8e9] p-8 rounded-2xl flex flex-col gap-3 shadow-sm">
          <Award className="w-8 h-8 text-primary" />
          <h3 className="text-base font-bold text-foreground">PSO Standard</h3>
          <p className="text-xs text-slate-500 leading-relaxed font-semibold">
            Der Druck erfolgt streng nach dem ProzessStandard Offsetdruck (PSO) für absolut konsistente und brillante Farbergebnisse.
          </p>
        </div>
      </div>

      <hr className="border-[#e7e8e9]" />

      <section className="flex flex-col gap-4 text-xs leading-relaxed text-slate-600 font-semibold">
        <h2 className="text-xl font-bold text-foreground">Unsere Geschichte</h2>
        <p>
          DEUTSCHDRUCK wurde gegründet, um B2B-Kunden und Kreativen eine barrierefreie Schnittstelle zwischen modernem Webdesign und klassischem Druckhandwerk zu bieten. Als Headless Online-Druckerei verzichten wir auf langsame Standardlösungen und bieten stattdessen zentimetergenaue Konfiguratoren und automatisierte Datenprüfungen an.
        </p>
        <p>
          Mit einem engagierten Team aus Druckingenieuren, Mediengestaltern und Web-Entwicklern betreuen wir heute über 10.000 Kunden im deutschsprachigen Raum.
        </p>
      </section>
    </div>
    </div>
  );
}
