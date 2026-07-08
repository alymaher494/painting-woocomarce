import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AGBPage() {
  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-8 flex flex-col gap-6 text-[#191c1d]">
      <Link href="/" className="inline-flex items-center gap-2 text-xs text-slate-500 hover:text-primary transition-colors font-bold w-fit mb-4">
        <ArrowLeft className="w-4 h-4" /> Zurück zur Startseite
      </Link>

      <h1 className="text-3xl font-black text-foreground">Allgemeine Geschäftsbedingungen</h1>
      <p className="text-xs text-slate-500 font-semibold leading-relaxed">
        Allgemeine Geschäftsbedingungen (AGB) und Widerrufsbelehrung für B2B- und B2C-Geschäfte bei DEUTSCHDRUCK.
      </p>

      <hr className="border-[#e7e8e9]" />

      <section className="flex flex-col gap-3 text-xs leading-relaxed text-slate-600 font-semibold">
        <h2 className="text-base font-bold text-foreground">1. Geltungsbereich</h2>
        <p>
          Diese Allgemeinen Geschäftsbedingungen gelten für alle Bestellungen, die Kunden über den Online-Shop von DEUTSCHDRUCK tätigen. Abweichende Bedingungen des Kunden werden nicht anerkannt, es sei denn, wir stimmen ihrer Geltung ausdrücklich schriftlich zu.
        </p>
      </section>

      <hr className="border-[#e7e8e9]" />

      <section className="flex flex-col gap-3 text-xs leading-relaxed text-slate-600 font-semibold">
        <h2 className="text-base font-bold text-foreground">2. Vertragspartner & Vertragsschluss</h2>
        <p>
          Der Kaufvertrag kommt zustande mit DEUTSCHDRUCK E.K. Die Darstellung der Produkte im Online-Shop stellt kein rechtlich bindendes Angebot, sondern einen unverbindlichen Online-Katalog dar. Durch Anklicken des Buttons „Jetzt zahlungspflichtig bestellen“ geben Sie eine verbindliche Bestellung ab.
        </p>
      </section>

      <hr className="border-[#e7e8e9]" />

      <section className="flex flex-col gap-3 text-xs leading-relaxed text-slate-600 font-semibold">
        <h2 className="text-base font-bold text-foreground">3. Ausschluss des Widerrufsrechts bei Sonderanfertigungen</h2>
        <div className="p-4 bg-secondary/5 border border-secondary/20 rounded-xl">
          <p className="text-secondary font-bold mb-2">⚠ WICHTIGER HINWEIS FÜR VERBRAUCHER (Widerrufsbelehrung):</p>
          <p className="text-xs text-slate-700 leading-relaxed font-semibold">
            Das Widerrufsrecht besteht gemäß § 312g Abs. 2 Nr. 1 BGB <strong>nicht</strong> bei Verträgen zur Lieferung von Waren, die nicht vorgefertigt sind und für deren Herstellung eine individuelle Auswahl oder Bestimmung durch den Verbraucher maßgeblich ist oder die eindeutig auf die persönlichen Bedürfnisse des Verbrauchers zugeschnitten sind.
          </p>
          <p className="text-xs text-slate-700 leading-relaxed font-semibold mt-2">
            Da alle über unseren Konfigurator bestellten Produkte (Aufkleber, Alu-Dibond, Plattendrucke nach Maß) zentimetergenau für Sie gedruckt werden, ist ein <strong>Widerruf oder eine Rückgabe nach erfolgtem Druck ausgeschlossen</strong>.
          </p>
        </div>
      </section>

      <hr className="border-[#e7e8e9]" />

      <section className="flex flex-col gap-3 text-xs leading-relaxed text-slate-600 font-semibold">
        <h2 className="text-base font-bold text-foreground">4. Gewährleistung & Mängelhaftung</h2>
        <p>
          Es gelten die gesetzlichen Mängelhaftungsrechte. Geringfügige Farbabweichungen zwischen dem auf Ihrem Bildschirm angezeigten Bild und dem gedruckten Produkt sind technisch bedingt und stellen keinen Mangel dar.
        </p>
      </section>
    </div>
  );
}
