"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, HelpCircle, ChevronDown, Check, Star, ShieldCheck, Sparkles } from "lucide-react";
import gsap from "gsap";
import Logo from "@/components/Logo";
import { getHomepageSettings } from "@/lib/api";

const DEFAULT_HERO_SLIDES = [
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=1600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1600&auto=format&fit=crop&q=80"
];

export default function Home() {
  const pageRef = useRef<HTMLDivElement>(null);
  
  // State for FAQ Accordion
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // States for live CMS content
  const [heroTitle, setHeroTitle] = useState("Premium Druck & Design für Ihren Erfolg");
  const [heroDescription, setHeroDescription] = useState("Wir bringen Ihre Ideen gross raus. Von hochwertigen Aufklebern bis zum kompletten Corporate Design.");
  const [heroSlides, setHeroSlides] = useState(DEFAULT_HERO_SLIDES);

  // State for Hero Background Slides
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    async function loadCMSData() {
      const settings = await getHomepageSettings();
      if (settings) {
        if (settings.heroTitle) setHeroTitle(settings.heroTitle);
        if (settings.heroDescription) setHeroDescription(settings.heroDescription);
        if (settings.heroSlides && settings.heroSlides.length > 0) {
          setHeroSlides(settings.heroSlides.map((s: any) => s.mediaItemUrl));
        }
      }
    }
    loadCMSData();
  }, []);

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4500);
    return () => clearInterval(slideTimer);
  }, [heroSlides]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal animations
      gsap.from(".hero-card", {
        opacity: 0,
        scale: 0.98,
        y: 20,
        duration: 0.8,
        ease: "power2.out"
      });
      gsap.from(".fade-up", {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.15,
        ease: "power1.out"
      });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  const categories = [
    { title: "Alles für deinen Auftritt", slug: "fine-art" },
    { title: "Aufkleber", slug: "platten" },
    { title: "Fertige Aufkleber", slug: "platten" },
    { title: "Plotfolie / Folienbeschriftung", slug: "platten" },
    { title: "Plotfolie", slug: "platten" },
    { title: "Roll Ups & Kundenstopper", slug: "werbetechnik" },
    { title: "Stickerei / Bestickung", slug: "werbetechnik" },
    { title: "Visitenkarten", slug: "fine-art" },
  ];

  const faqs = [
    {
      q: "Welche Dateiformate werden für den Druck akzeptiert?",
      a: "Wir akzeptieren druckfertige PDF-Dateien (PDF/X-1a oder PDF/X-4), hochauflösende JPGs und PNGs. Bitte betten Sie alle Schriften ein oder konvertieren Sie sie in Pfade."
    },
    {
      q: "Wie lange dauern Produktion und Versand?",
      a: "Die Standardproduktion dauert 3-4 Werktage. Mit unserem Express-Zustellservice (24h/48h) können Bestellungen, die vor 10:00 Uhr eingehen, bereits am nächsten Werktag geliefert werden."
    },
    {
      q: "Gibt es einen Datencheck, bevor gedruckt wird?",
      a: "Ja, wir bieten standardmäßig einen automatisierten Basis-Datencheck an. Optional können Sie die manuelle Profi-Datenprüfung buchen, bei der unsere Grafiker Auflösung, Farbraum (CMYK) und Beschnitt genau prüfen."
    },
    {
      q: "Kann ich auch individuelle Maße oder Formate bestellen?",
      a: "Selbstverständlich! Über unseren Live-Produktkonfigurator können Sie zentimetergenaue Maße eingeben. Die Preise werden in Echtzeit berechnet."
    }
  ];

  // Custom CMYK floral printing icon matching the logo reference
  const LogoEmblem = () => (
    <Logo className="w-16 h-16 mx-auto mb-4" />
  );

  return (
    <div ref={pageRef} className="flex flex-col gap-20 bg-[#f8f9fa] text-[#191c1d]">
      
      {/* 1. Hero Section */}
      <section className="relative h-[650px] w-full flex items-center justify-center overflow-hidden">
        {/* Background Slideshow */}
        <div className="absolute inset-0 z-0">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={slide}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover object-center"
              />
            </div>
          ))}
          {/* Overlay to dim background slightly for high-contrast text readability */}
          <div className="absolute inset-0 bg-black/55 z-10" />
        </div>

        {/* Text and buttons sitting directly over sliding background */}
        <div className="relative z-20 max-w-[850px] w-full mx-4 text-center hero-card text-white px-4">
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-6 leading-tight">
            {heroTitle.split("für Ihren Erfolg")[0]} <br />
            {heroTitle.includes("für Ihren Erfolg") && (
              <span className="text-[#db1f7f] bg-white/10 px-4 py-1 rounded-lg inline-block mt-2">für Ihren Erfolg</span>
            )}
          </h1>
          <p className="text-base md:text-xl text-slate-200 max-w-2xl mx-auto mb-10 leading-relaxed font-semibold">
            {heroDescription}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/products"
              className="px-10 py-4 rounded-full bg-[#b40065] text-white font-extrabold text-sm hover:bg-[#db1f7f] hover:shadow-lg transition-all active:scale-95"
            >
              Aktion starten
            </Link>
            <Link
              href="/products"
              className="px-10 py-4 rounded-full border-2 border-white text-white hover:bg-white hover:text-black font-extrabold text-sm transition-all active:scale-95"
            >
              Mehr erfahren
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Process Section */}
      <section className="max-w-[1400px] mx-auto w-full px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-foreground">
            In 3 einfachen <span className="text-secondary">Schritten</span>
          </h2>
        </div>

        {/* Process layout with circles & arrows */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_40px_2fr_40px_2fr] items-center gap-8 lg:gap-0 bg-white border border-[#e7e8e9] rounded-2xl p-8 shadow-sm">
          {/* Step 1 */}
          <div className="text-center flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full border border-primary/20 bg-primary/5 flex items-center justify-center text-primary">
              <Logo className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-foreground">1. Produkt wählen</h3>
            <p className="text-xs text-slate-500 leading-relaxed max-w-xs">
              Wählen Sie aus unseren Standardgrößen oder konfigurieren Sie ein individuelles Wunschformat.
            </p>
          </div>

          {/* Arrow 1 */}
          <div className="hidden lg:flex items-center justify-center w-[40px]">
            <ArrowRight className="w-5 h-5 text-primary-light" />
          </div>

          {/* Step 2 */}
          <div className="text-center flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full border border-secondary/20 bg-secondary/5 flex items-center justify-center text-secondary">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-foreground">2. Daten & Upload</h3>
            <p className="text-xs text-slate-500 leading-relaxed max-w-xs">
              Laden Sie bequem Ihre Druckvorlage hoch. Unser System übernimmt einen automatisierten Datencheck.
            </p>
          </div>

          {/* Arrow 2 */}
          <div className="hidden lg:flex items-center justify-center w-[40px]">
            <ArrowRight className="w-5 h-5 text-primary-light" />
          </div>

          {/* Step 3 */}
          <div className="text-center flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full border border-primary/20 bg-primary/5 flex items-center justify-center text-primary">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-foreground">3. Druck & Versand</h3>
            <p className="text-xs text-slate-500 leading-relaxed max-w-xs">
              Schnelle Produktion und sicherer Versand direkt zu Ihnen nach Hause oder in Ihre Firma.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Product Categories Grid */}
      <section className="max-w-[1400px] mx-auto w-full px-4 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((cat, i) => (
            <Link
              key={i}
              href={`/categories/${cat.slug}`}
              className="outline-card p-8 text-center flex flex-col justify-between min-h-[220px] group cursor-pointer hover:border-primary"
            >
              <LogoEmblem />
              <h3 className="text-sm font-extrabold text-foreground group-hover:text-primary transition-colors">
                {cat.title}
              </h3>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. Testimonials (Customer Reviews) */}
      <section className="bg-primary/5 border-y border-[#e7e8e9] py-16">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-foreground">
              Das sagen unsere <span className="text-secondary">Kunden</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white border border-[#e7e8e9] p-8 rounded-2xl shadow-sm flex flex-col gap-4">
                <div className="flex gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <h4 className="font-bold text-foreground text-sm">"Top Qualität und extrem schnell!"</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  "Die Aufkleber sind genau so geworden, wie ich es mir vorgestellt habe. Sehr scharfe Druckkonturen, schnelle Lieferung. Gerne wieder!"
                </p>
                <span className="text-xs font-bold text-slate-700 block mt-2">Markus T. - Agentur XYZ</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. B2B Ribbon Section */}
      <section className="bg-[#151b29] text-white py-16 text-center">
        <div className="max-w-2xl mx-auto px-4 flex flex-col gap-6">
          <h2 className="text-3xl font-black text-primary-light">
            Große Stückzahlen & B2B Anfragen
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Ob Sondermaße, exklusives Material oder Großbestellungen – wir erstellen Ihnen ein maßgeschneidertes Angebot.
          </p>
          <Link
            href="/products"
            className="w-fit mx-auto px-8 py-3 rounded-full bg-secondary hover:bg-secondary-light text-white font-bold text-xs uppercase tracking-wider"
          >
            Jetzt Angebot anfordern
          </Link>
        </div>
      </section>

      {/* 6. Scrolling Ribbon Banners (Marquees) */}
      <section className="relative overflow-hidden w-full flex flex-col gap-4 z-10 py-6">
        {/* Green Banner (Scroll Left) */}
        <div className="bg-primary text-white py-3.5 transform -rotate-1 shadow-md w-full overflow-hidden">
          <div className="animate-marquee-left flex gap-12 text-sm font-extrabold uppercase tracking-widest whitespace-nowrap">
            {[...Array(6)].map((_, i) => (
              <span key={i} className="inline-flex items-center gap-2">
                Germany ❀ Höchste Qualität ❀ Kostenloser Versand ❀ Made in Germany
              </span>
            ))}
          </div>
        </div>

        {/* Magenta Banner (Scroll Right) */}
        <div className="bg-secondary text-white py-3.5 transform rotate-1 shadow-md w-full overflow-hidden">
          <div className="animate-marquee-right flex gap-12 text-sm font-extrabold uppercase tracking-widest whitespace-nowrap">
            {[...Array(6)].map((_, i) => (
              <span key={i} className="inline-flex items-center gap-2">
                Schnelle Produktion ❀ Individuelles Design ❀ CMYK Druckqualität
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FAQs Section */}
      <section className="max-w-[800px] mx-auto w-full px-4 md:px-8 pb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-foreground">
            Häufig gestellte <span className="text-secondary">Fragen</span>
          </h2>
          <p className="text-xs text-slate-500 mt-2">Erfahren Sie mehr über die wichtigsten Fragen rund um Ihre Bestellung.</p>
        </div>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white border border-[#e7e8e9] rounded-xl overflow-hidden shadow-sm">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left font-bold text-sm text-foreground hover:bg-[#f3f4f5] transition-colors cursor-pointer"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`} />
              </button>
              {openFaq === i && (
                <div className="p-5 border-t border-[#e7e8e9] text-xs text-slate-500 leading-relaxed bg-[#f8f9fa]">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
