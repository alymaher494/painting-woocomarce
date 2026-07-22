"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Send, CheckCircle2, Upload, FileText } from "lucide-react";

export default function B2BInquiryPage() {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [productType, setProductType] = useState("Aufkleber");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [quantity, setQuantity] = useState("");
  const [notes, setNotes] = useState("");
  
  // File Upload State
  const [file, setFile] = useState<{ name: string; size: string } | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (!uploadedFile) return;

    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setFile({
        name: uploadedFile.name,
        size: (uploadedFile.size / (1024 * 1024)).toFixed(1) + " MB",
      });
    }, 800);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !company || !name || !quantity) {
      alert("Bitte füllen Sie alle erforderlichen Felder aus.");
      return;
    }

    setIsSuccess(true);
  };

  return (
    <div className="flex flex-col gap-8 text-[#191c1d] bg-[#f8f9fa]">
      <div className="max-w-[1400px] mx-auto w-full px-4 md:px-8 pt-8 flex flex-col gap-4">
      {/* Back Button */}
      <Link href="/" className="inline-flex items-center gap-2 text-xs text-slate-500 hover:text-primary transition-colors font-bold w-fit mb-2">
        <ArrowLeft className="w-4 h-4" /> Zurück zur Startseite
      </Link>

      <div className="flex flex-col gap-2">
        <span className="text-secondary text-xs font-bold uppercase tracking-widest">B2B Service Portal</span>
        <h1 className="text-3xl font-extrabold text-foreground">Sonderanfertigung & Großauflage</h1>
        <p className="text-xs text-slate-500 font-semibold leading-relaxed">
          Sie benötigen Sondermaße, Fräskonturen oder große Stückzahlen? Senden Sie uns Ihre Anforderungen für ein unverbindliches Angebot.
        </p>
      </div>

      <hr className="border-[#e7e8e9]" />

      {isSuccess ? (
        <div className="bg-primary/5 border border-primary/20 p-8 rounded-2xl text-center flex flex-col items-center gap-4">
          <CheckCircle2 className="w-12 h-12 text-primary" />
          <h2 className="text-xl font-bold text-foreground">Anfrage erfolgreich gesendet!</h2>
          <p className="text-xs text-slate-500 leading-relaxed font-semibold max-w-md">
            Vielen Dank für Ihre Anfrage. Unser B2B-Kundenberater wird Ihr Anliegen prüfen und Ihnen innerhalb von <strong>2-4 Stunden</strong> ein individuelles Angebot per E-Mail zusenden.
          </p>
          <button
            onClick={() => setIsSuccess(false)}
            className="mt-4 px-6 py-2.5 rounded-full bg-primary hover:bg-primary-light text-white font-bold text-xs uppercase tracking-wider cursor-pointer"
          >
            Neue Anfrage erstellen
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white border border-[#e7e8e9] p-8 rounded-2xl flex flex-col gap-6 shadow-sm">
          <h2 className="text-lg font-bold text-foreground">Spezifikationsformular</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Kontakt */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Name Ansprechpartner *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Herr / Frau Name"
                className="precision-input text-xs"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Firma / Institution *</label>
              <input
                type="text"
                required
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="GmbH / KG"
                className="precision-input text-xs"
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
                className="precision-input text-xs"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Telefonnummer</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="precision-input text-xs"
              />
            </div>

            <hr className="col-span-2 border-[#e7e8e9]" />

            {/* Spezifikationen */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Produktkategorie</label>
              <select
                value={productType}
                onChange={(e) => setProductType(e.target.value)}
                className="precision-input text-xs cursor-pointer bg-white"
              >
                <option value="Aufkleber">Aufkleber & Etiketten</option>
                <option value="Platten">Acrylglas & Schilder</option>
                <option value="Banner">PVC Planen & Werbetechnik</option>
                <option value="Sonstiges">Sonstiges / Freies Projekt</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Gewünschte Menge *</label>
              <input
                type="number"
                required
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="z.B. 1000 Stück"
                className="precision-input text-xs"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Breite (cm) (Optional)</label>
              <input
                type="number"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                className="precision-input text-xs"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Höhe (cm) (Optional)</label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="precision-input text-xs"
              />
            </div>

            <div className="flex flex-col gap-1.5 col-span-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Anmerkungen & Spezialwünsche</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                placeholder="Sonderformen, Konturschnitt, Verpackungswünsche, etc."
                className="precision-input text-xs"
              />
            </div>

            {/* Skizzen-Upload */}
            <div className="flex flex-col gap-1.5 col-span-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Entwurf / Skizze hochladen</label>
              {!file ? (
                <div className="border border-dashed border-[#e7e8e9] rounded-xl p-4 text-center bg-[#f8f9fa] relative hover:border-primary transition-colors">
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
                    <Upload className="w-4 h-4 text-slate-400" />
                    <span>Skizze auswählen (PDF, ZIP, Max. 100MB)</span>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between p-3 rounded-lg bg-primary/5 border border-primary/20 text-xs">
                  <div className="flex items-center gap-2 text-slate-700">
                    <FileText className="w-4 h-4 text-primary" />
                    <span>{file.name} ({file.size})</span>
                  </div>
                  <button type="button" onClick={() => setFile(null)} className="text-red-500 hover:underline">Entfernen</button>
                </div>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="mt-4 flex items-center justify-center gap-2 w-full py-3.5 rounded-full bg-primary hover:bg-primary-light text-white font-bold text-xs uppercase tracking-wider shadow-sm cursor-pointer"
          >
            <Send className="w-4 h-4" />
            Angebotsanfrage absenden
          </button>
        </form>
      )}
    </div>
    </div>
  );
}
