import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function DatenschutzPage() {
  return (
    <div className="max-w-[800px] mx-auto px-4 py-8 flex flex-col gap-6 text-[#191c1d]">
      <Link href="/" className="inline-flex items-center gap-2 text-xs text-slate-500 hover:text-primary transition-colors font-bold w-fit mb-4">
        <ArrowLeft className="w-4 h-4" /> Zurück zur Startseite
      </Link>

      <h1 className="text-3xl font-black text-foreground">Datenschutzerklärung</h1>
      <p className="text-xs text-slate-500 font-semibold leading-relaxed">
        Erklärung zur Erhebung und Verarbeitung personenbezogener Daten gemäß der Datenschutz-Grundverordnung (DSGVO).
      </p>

      <hr className="border-[#e7e8e9]" />

      <section className="flex flex-col gap-3 text-xs leading-relaxed text-slate-600 font-semibold">
        <h2 className="text-base font-bold text-foreground">1. Datenschutz auf einen Blick</h2>
        <p>
          Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Nachfolgend informieren wir Sie über Art, Umfang und Zweck der Datenerhebung.
        </p>
      </section>

      <hr className="border-[#e7e8e9]" />

      <section className="flex flex-col gap-3 text-xs leading-relaxed text-slate-600 font-semibold">
        <h2 className="text-base font-bold text-foreground">2. Verantwortliche Stelle</h2>
        <p className="text-slate-800 font-extrabold">DEUTSCHDRUCK E.K.</p>
        <p>Musterstraße 44a, 10115 Berlin</p>
        <p>E-Mail: datenschutz@deutschdruck-headless.de</p>
      </section>

      <hr className="border-[#e7e8e9]" />

      <section className="flex flex-col gap-3 text-xs leading-relaxed text-slate-600 font-semibold">
        <h2 className="text-base font-bold text-foreground">3. Erhebung von Daten bei Dateiuploads</h2>
        <p>
          Wenn Sie im Rahmen einer Produktkonfiguration Druckdateien (.pdf, .jpg, .png) auf unsere Server laden, werden diese verschlüsselt gespeichert und ausschließlich zur Ausführung Ihres Druckauftrags verwendet. Nach der Fertigstellung und Lieferung Ihres Auftrags werden die Druckdaten gemäß gesetzlichen B2B-Aufbewahrungsfristen archiviert und anschließend gelöscht.
        </p>
      </section>

      <hr className="border-[#e7e8e9]" />

      <section className="flex flex-col gap-3 text-xs leading-relaxed text-slate-600 font-semibold">
        <h2 className="text-base font-bold text-foreground">4. Ihre Rechte</h2>
        <p>
          Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen.
        </p>
      </section>
    </div>
  );
}
