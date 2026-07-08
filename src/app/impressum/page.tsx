import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ImpressumPage() {
  return (
    <div className="max-w-[800px] mx-auto px-4 py-8 flex flex-col gap-6 text-[#191c1d]">
      <Link href="/" className="inline-flex items-center gap-2 text-xs text-slate-500 hover:text-primary transition-colors font-bold w-fit mb-4">
        <ArrowLeft className="w-4 h-4" /> Zurück zur Startseite
      </Link>

      <h1 className="text-3xl font-black text-foreground">Impressum</h1>
      <p className="text-xs text-slate-500 font-semibold leading-relaxed">
        Angaben gemäß § 5 TMG (Telemediengesetz) für den Betrieb der gewerblichen Webpräsenz.
      </p>

      <hr className="border-[#e7e8e9]" />

      <section className="flex flex-col gap-3 text-xs leading-relaxed text-slate-600 font-semibold">
        <h2 className="text-base font-bold text-foreground">Betreiber & Kontakt</h2>
        <p className="text-slate-800 font-extrabold text-sm">DEUTSCHDRUCK E.K.</p>
        <p>Musterstraße 44a</p>
        <p>10115 Berlin</p>
        <p>Deutschland</p>
        
        <div className="mt-2">
          <p><strong>Telefon:</strong> +49 (0) 30 12345678</p>
          <p><strong>E-Mail:</strong> support@deutschdruck-headless.de</p>
        </div>
      </section>

      <hr className="border-[#e7e8e9]" />

      <section className="flex flex-col gap-3 text-xs leading-relaxed text-slate-600 font-semibold">
        <h2 className="text-base font-bold text-foreground">Registereintrag & Vertretung</h2>
        <p><strong>Vertreten durch:</strong> Aly Maher (Geschäftsführer)</p>
        <p><strong>Registergericht:</strong> Amtsgericht Berlin-Charlottenburg</p>
        <p><strong>Registernummer:</strong> HRA 98765 B</p>
      </section>

      <hr className="border-[#e7e8e9]" />

      <section className="flex flex-col gap-3 text-xs leading-relaxed text-slate-600 font-semibold">
        <h2 className="text-base font-bold text-foreground">Umsatzsteuer-ID</h2>
        <p>
          Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz: <br />
          <strong className="text-foreground">DE345678901</strong>
        </p>
      </section>

      <hr className="border-[#e7e8e9]" />

      <section className="flex flex-col gap-3 text-xs leading-relaxed text-slate-600 font-semibold">
        <h2 className="text-base font-bold text-foreground">Streitschlichtung</h2>
        <p>
          Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
          <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noreferrer" className="text-secondary hover:underline">
            https://ec.europa.eu/consumers/odr/
          </a>. <br />
          Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
        </p>
      </section>
    </div>
  );
}
