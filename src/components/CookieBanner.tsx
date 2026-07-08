"use client";

import React, { useState, useEffect } from "react";
import { ShieldCheck, X } from "lucide-react";

export const CookieBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cmyk_cookie_consent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cmyk_cookie_consent", "accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cmyk_cookie_consent", "declined");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 right-6 md:left-auto md:max-w-md z-50 animate-fade-in">
      <div className="bg-white border border-[#e7e8e9] p-6 rounded-2xl shadow-xl flex flex-col gap-4 text-[#191c1d]">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-primary flex-shrink-0" />
            <h4 className="text-sm font-extrabold text-foreground">Datenschutz-Einstellungen</h4>
          </div>
          <button
            onClick={handleDecline}
            className="text-slate-400 hover:text-slate-600 cursor-pointer"
            title="Schließen"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        
        <p className="text-xs text-slate-500 leading-relaxed font-semibold">
          Wir verwenden Cookies, um Ihnen die bestmögliche Erfahrung auf unserer Website zu bieten, den Datenverkehr zu analysieren und personalisierte Werbung anzuzeigen. Weitere Details finden Sie in unserer Datenschutzerklärung.
        </p>

        <div className="flex gap-3 justify-end text-xs font-bold uppercase tracking-wider">
          <button
            onClick={handleDecline}
            className="px-4 py-2 rounded-full border border-[#e7e8e9] text-slate-600 hover:bg-[#f3f4f5] cursor-pointer"
          >
            Ablehnen
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-2 rounded-full bg-primary text-white hover:bg-primary-light cursor-pointer shadow-sm"
          >
            Alle akzeptieren
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
