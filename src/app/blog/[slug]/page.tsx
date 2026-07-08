"use client";

import React, { use } from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, User } from "lucide-react";

interface Params {
  slug: string;
}

const POST_CONTENT: Record<string, { title: string; date: string; author: string; cover: string; body: string[] }> = {
  "cmyk-vs-rgb-farbraeume": {
    title: "CMYK vs. RGB: Warum Farbräume für den Druck wichtig sind",
    date: "04.07.2026",
    author: "Aly Maher",
    cover: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1000&auto=format&fit=crop&q=80",
    body: [
      "Wer grafische Designs für Computer-Monitore, Webseiten oder Smartphones erstellt, arbeitet im RGB-Farbraum. RGB steht für Rot, Grün und Blau. Dieser Farbraum basiert auf Lichtmischung (additives Farbmodell). Da Bildschirme selbst leuchten, können sie durch die Kombination dieser drei Farben ein extrem breites und leuchtendes Farbspektrum darstellen.",
      "Im Gegensatz dazu arbeiten Druckmaschinen mit echten Pigmenten. Hier wird das CMYK-Modell angewendet: Cyan (Blau/Grün), Magenta (Rot/Pink), Yellow (Gelb) und Key (Schwarz). Dieses Farbmodell ist subtraktiv. Das bedeutet: Je mehr Farbe übereinander gedruckt wird, desto dunkler wird das Ergebnis, da das reflektierte Licht der Papieroberfläche absorbiert wird.",
      "Wenn Sie nun ein im RGB-Farbraum gestaltetes Bild direkt in den Druck geben, muss die Druckmaschine diese Farben zwangsläufig konvertieren. Da das CMYK-Spektrum (insbesondere bei sehr leuchtenden Grün- und Blautönen) kleiner ist als das RGB-Spektrum, führt dies oft dazu, dass die gedruckten Farben blasser oder verschwommener aussehen als auf dem Bildschirm.",
      "Lösung: Konvertieren Sie Ihre Designprojekte vor dem Abspeichern immer manuell in den Farbraum CMYK (Farbprofil: Coated FOGRA39). So können Sie Farbverschiebungen bereits auf Ihrem Monitor kontrollieren und anpassen.",
    ],
  },
  "plattendruck-acrylglas-alu-dibond": {
    title: "Der ultimative Guide für den Plattendruck: Acrylglas oder Alu-Dibond?",
    date: "28.06.2026",
    author: "Max Mustermann",
    cover: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=1000&auto=format&fit=crop&q=80",
    body: [
      "Im modernen Plattendruck stehen zwei Materialien besonders im Fokus: Acrylglas und Alu-Dibond. Beide eignen sich hervorragend für edle Präsentationen, weisen jedoch sehr unterschiedliche physische und ästhetische Merkmale auf.",
      "Acrylglas (Fine-Art) zeichnet sich vor allem durch seine unglaubliche Tiefenwirkung aus. Der Druck erfolgt rückseitig auf eine transparente, polierte Acrylplatte (meist 4 mm oder 6 mm stark). Das einfallende Licht bricht sich in der Kante der Platte, wodurch Farben extrem brillant und plastisch wirken. Es ist das ideale Material für hochwertige Fotogalerien und Kunstausstellungen in Innenräumen.",
      "Alu-Dibond hingegen ist eine extrem robuste Verbundplatte, bestehend aus zwei Aluminium-Deckschichten und einem Polyethylen-Kern. Dieses Material ist wetterbeständig, witterungsfest und absolut biegesteif. Es eignet sich hervorragend für den Außenbereich, Firmenschilder oder moderne Wohnzimmer-Deko ohne Reflexionen.",
      "Butler Finish (Alu-Dibond) ist eine Besonderheit: Hier ist das Aluminium gebürstet. Alle weißen oder transparenten Stellen im Bild werden im Druck nicht mit weißer Farbe gefüllt, sondern lassen das silberne, gebürstete Metall durchschimmern. Das ergibt einen einzigartigen Industrie- und Metallic-Look.",
    ],
  },
  "beschnittzugabe-bleed-erklaert": {
    title: "Beschnittzugabe (Bleed) einfach erklärt: So vermeiden Sie weiße Ränder",
    date: "15.06.2026",
    author: "Aly Maher",
    cover: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1000&auto=format&fit=crop&q=80",
    body: [
      "Wer zum ersten Mal Druckdaten anlegt, stolpert oft über den Begriff 'Beschnittzugabe' oder 'Bleed'. Doch was hat es damit auf sich?",
      "In einer Druckerei werden Bogen auf riesigen Papierstapeln bedruckt und anschließend mit großen Schneidemaschinen auf das Endformat zugeschnitten. Trotz modernster CNC-Schneidetechnik kann es beim Schneiden von Papierstapeln zu geringen mechanischen Toleranzen kommen. Diese Abweichung nennt man Schneidetoleranz (meist ca. 1-2 mm).",
      "Wenn Ihr Hintergrundbild exakt an der Kante des Endformats aufhört, kann eine minimale Verschiebung beim Schnitt dazu führen, dass am Rand ein feiner, weißer Papierstreifen sichtbar bleibt. Das nennt man Blitzer.",
      "Um Blitzer zu verhindern, legt man das Bild um 2 mm größer an (Beschnitt). Das Messer schneidet dann durch die gedruckte Farbfläche, wodurch ein randloses Druckergebnis entsteht.",
    ],
  },
};

export default function BlogPostPage({ params }: { params: Promise<Params> }) {
  const resolvedParams = use(params);
  const { slug } = resolvedParams;

  const article = POST_CONTENT[slug] || POST_CONTENT["cmyk-vs-rgb-farbraeume"];

  return (
    <div className="max-w-[800px] mx-auto px-4 py-8 flex flex-col gap-6 text-[#191c1d]">
      
      {/* Back Button */}
      <Link href="/blog" className="inline-flex items-center gap-2 text-xs text-slate-500 hover:text-primary transition-colors font-bold w-fit mb-4">
        <ArrowLeft className="w-4 h-4" /> Zurück zum Magazin
      </Link>

      {/* Meta */}
      <div className="flex gap-4 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
        <span className="flex items-center gap-1">
          <Calendar className="w-3.5 h-3.5" /> {article.date}
        </span>
        <span className="flex items-center gap-1">
          <User className="w-3.5 h-3.5" /> {article.author}
        </span>
      </div>

      <h1 className="text-3xl md:text-4xl font-black text-foreground leading-tight tracking-tight">
        {article.title}
      </h1>

      <hr className="border-[#e7e8e9] my-2" />

      {/* Cover Image */}
      <div className="relative rounded-2xl overflow-hidden h-[350px] border border-[#e7e8e9]">
        <img
          src={article.cover}
          alt={article.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Article Body */}
      <article className="flex flex-col gap-5 text-sm leading-relaxed text-slate-600 font-semibold mt-4">
        {article.body.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </article>
    </div>
  );
}
