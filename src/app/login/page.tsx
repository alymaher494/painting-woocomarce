"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, Mail, ArrowRight, ShieldCheck } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      // Route to account dashboard
      router.push("/dashboard");
    }, 1200);
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-12 text-[#191c1d] flex flex-col items-center justify-center">
      <div className="max-w-[450px] w-full flex flex-col gap-6">
        <div className="text-center flex flex-col gap-2">
        <h1 className="text-2xl font-black text-foreground">Kundenlogin</h1>
        <p className="text-xs text-slate-500 font-semibold">Melden Sie sich an, um Ihre Druckdaten und Bestellungen zu verwalten.</p>
      </div>

      <form onSubmit={handleLogin} className="bg-white border border-[#e7e8e9] p-8 rounded-2xl flex flex-col gap-4 shadow-sm">
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">E-Mail-Adresse</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="mail@firma.de"
              className="w-full pl-10 pr-4 py-2.5 precision-input text-xs"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Passwort</label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-10 pr-4 py-2.5 precision-input text-xs"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 w-full py-3.5 rounded-full bg-primary hover:bg-primary-light text-white font-extrabold text-xs uppercase tracking-wider shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          {isSubmitting ? "Anmeldung läuft..." : "Anmelden"}
          <ArrowRight className="w-4 h-4" />
        </button>

        <div className="text-center text-xs text-slate-500 font-semibold mt-4 border-t border-[#e7e8e9] pt-4">
          <span>Noch kein Kundenkonto? </span>
          <Link href="/register" className="text-secondary hover:underline font-bold">
            Jetzt registrieren
          </Link>
        </div>
      </form>

      <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
        <ShieldCheck className="w-4 h-4 text-primary" />
        <span>Gesicherte SSL-Verbindung</span>
      </div>
    </div>
    </div>
  );
}
