"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, Clock, Building2 } from "lucide-react";

export default function KontaktPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setIsSent(true);
    }, 1200);
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-8 flex flex-col gap-12 text-[#191c1d]">
      {/* Page Title */}
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground">Kontakt</h1>
        <p className="text-sm text-slate-500 max-w-xl">
          Haben Sie Fragen zu unseren Druckprodukten oder benötigen ein individuelles Angebot? 
          Unser Team berät Sie gerne persönlich.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Form */}
        <div className="bg-white border border-[#e7e8e9] p-8 rounded-2xl shadow-sm flex flex-col gap-6">
          {isSent ? (
            <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Send className="w-7 h-7 text-primary" />
              </div>
              <h2 className="text-2xl font-black text-foreground">Nachricht gesendet!</h2>
              <p className="text-xs text-slate-500 max-w-sm leading-relaxed font-semibold">
                Vielen Dank für Ihre Nachricht. Wir werden uns innerhalb von 24 Stunden bei Ihnen melden.
              </p>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-bold text-foreground">Nachricht senden</h2>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Vollständiger Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Max Mustermann"
                      className="w-full px-4 py-2.5 precision-input text-xs"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">E-Mail-Adresse *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="mail@firma.de"
                      className="w-full px-4 py-2.5 precision-input text-xs"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Betreff</label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="z.B. Anfrage Großbestellung Aufkleber"
                    className="w-full px-4 py-2.5 precision-input text-xs"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Ihre Nachricht *</label>
                  <textarea
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Beschreiben Sie Ihr Anliegen..."
                    className="w-full px-4 py-3 precision-input text-xs resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSending}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-full bg-primary hover:bg-primary-light text-white font-bold text-sm transition-all duration-300 shadow-sm disabled:opacity-60 cursor-pointer"
                >
                  {isSending ? (
                    <>Wird gesendet... <Send className="w-4 h-4 animate-pulse" /></>
                  ) : (
                    <>Nachricht absenden <Send className="w-4 h-4" /></>
                  )}
                </button>
              </form>
            </>
          )}
        </div>

        {/* Contact Info Cards */}
        <div className="flex flex-col gap-6">
          <div className="bg-white border border-[#e7e8e9] p-6 rounded-2xl shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Mail className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-foreground text-sm">E-Mail</h3>
              <p className="text-xs text-slate-500 mt-1 font-semibold">info@4d4dich.de</p>
            </div>
          </div>

          <div className="bg-white border border-[#e7e8e9] p-6 rounded-2xl shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Phone className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-foreground text-sm">Telefon</h3>
              <p className="text-xs text-slate-500 mt-1 font-semibold">+49 (0) 123 456 789</p>
            </div>
          </div>

          <div className="bg-white border border-[#e7e8e9] p-6 rounded-2xl shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-foreground text-sm">Adresse</h3>
              <p className="text-xs text-slate-500 mt-1 font-semibold leading-relaxed">
                4D4DICH<br />
                Musterstraße 123<br />
                10115 Berlin, Deutschland
              </p>
            </div>
          </div>

          <div className="bg-white border border-[#e7e8e9] p-6 rounded-2xl shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Clock className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-foreground text-sm">Geschäftszeiten</h3>
              <p className="text-xs text-slate-500 mt-1 font-semibold leading-relaxed">
                Mo – Fr: 09:00 – 18:00 Uhr<br />
                Sa – So: Geschlossen
              </p>
            </div>
          </div>

          <div className="bg-white border border-[#e7e8e9] p-6 rounded-2xl shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
              <Building2 className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <h3 className="font-bold text-foreground text-sm">B2B-Anfragen</h3>
              <p className="text-xs text-slate-500 mt-1 font-semibold leading-relaxed">
                Für Großbestellungen und individuelle Konditionen kontaktieren Sie uns direkt oder nutzen Sie unser{" "}
                <a href="/b2b-inquiry" className="text-primary hover:underline font-bold">B2B-Anfrageformular</a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
