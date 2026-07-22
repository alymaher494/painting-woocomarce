import React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Calendar, User } from "lucide-react";

interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  author: string;
  coverImage: string;
}

const POSTS: BlogPost[] = [
  {
    title: "CMYK vs. RGB: Warum Farbräume für den Druck wichtig sind",
    slug: "cmyk-vs-rgb-farbraeume",
    excerpt: "Wer Designs für Bildschirme erstellt, arbeitet meist in RGB. Im Druck führt das zu blassen Farben. Erfahren Sie, wie Sie Ihre Daten richtig konvertieren.",
    date: "04.07.2026",
    author: "Aly Maher",
    coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop&q=80",
  },
  {
    title: "Der ultimative Guide für den Plattendruck: Acrylglas oder Alu-Dibond?",
    slug: "plattendruck-acrylglas-alu-dibond",
    excerpt: "Welches Plattenmaterial eignet sich am besten für Ausstellungen und welches für Baustellenbanner? Ein Materialvergleich.",
    date: "28.06.2026",
    author: "Max Mustermann",
    coverImage: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=500&auto=format&fit=crop&q=80",
  },
  {
    title: "Beschnittzugabe (Bleed) einfach erklärt: So vermeiden Sie weiße Ränder",
    slug: "beschnittzugabe-bleed-erklaert",
    excerpt: "Was bedeutet eigentlich 2 mm Beschnitt? In diesem Artikel zeigen wir Ihnen, wie Sie Ihr Layout im Grafikprogramm richtig anlegen.",
    date: "15.06.2026",
    author: "Aly Maher",
    coverImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500&auto=format&fit=crop&q=80",
  },
];

export default function BlogPage() {
  return (
    <div className="flex flex-col gap-10 text-[#191c1d] bg-[#f8f9fa]">
      <div className="max-w-[1400px] mx-auto w-full px-4 md:px-8 pt-8 flex flex-col gap-4">
      
      {/* Back Button */}
      <Link href="/" className="inline-flex items-center gap-2 text-xs text-slate-500 hover:text-primary transition-colors font-bold w-fit mb-2">
        <ArrowLeft className="w-4 h-4" /> Zurück zur Startseite
      </Link>

      {/* Header */}
      <div className="flex flex-col gap-3">
        <span className="text-secondary text-xs font-bold uppercase tracking-widest font-sans">Print & Design Magazin</span>
        <h1 className="text-3xl md:text-4xl font-black text-foreground tracking-tight">Unser Blog</h1>
        <p className="text-sm text-slate-500 max-w-xl font-medium leading-relaxed">
          Tipps, Trick und Anleitungen von unseren Druckexperten. Erfahren Sie alles über Farbräume, Datenprüfung und Papierveredelungen.
        </p>
      </div>

      <hr className="border-[#e7e8e9]" />

      {/* Posts List */}
      <div className="flex flex-col gap-8">
        {POSTS.map((post) => (
          <div
            key={post.slug}
            className="bg-white border border-[#e7e8e9] rounded-2xl overflow-hidden flex flex-col md:flex-row gap-6 shadow-sm hover:border-primary transition-all group"
          >
            <div className="md:w-1/3 h-52 relative bg-[#f3f4f5] overflow-hidden flex-shrink-0">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6 flex flex-col gap-3 justify-between flex-1">
              <div className="flex flex-col gap-2">
                <div className="flex gap-4 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5" /> {post.author}
                  </span>
                </div>
                <h2 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                  {post.title}
                </h2>
                <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                  {post.excerpt}
                </p>
              </div>

              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center gap-1.5 text-secondary hover:text-secondary-light font-bold text-xs uppercase tracking-wider w-fit pt-2"
              >
                Artikel lesen
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}
