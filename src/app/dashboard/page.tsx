"use client";

import React, { useState, useEffect, use, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { LayoutDashboard, ShoppingBag, MapPin, User, FileText, CheckCircle2, ChevronRight, Download } from "lucide-react";
import { useCart } from "@/context/CartContext";

type Tab = "overview" | "orders" | "addresses";

function DashboardContent() {
  const { orders } = useCart();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  
  // URL check for success messages
  const isSuccess = searchParams.get("success") === "true";
  const successOrderId = searchParams.get("orderId");

  useEffect(() => {
    if (isSuccess) {
      setActiveTab("orders");
    }
  }, [isSuccess]);

  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-8 flex flex-col gap-8 text-[#191c1d]">
      {/* Title */}
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-extrabold text-foreground">Mein Kundenkonto</h1>
        <p className="text-xs text-slate-500 font-semibold">Verwalten Sie Ihre Bestellungen, Lieferadressen und Druckdaten-Uploads.</p>
      </div>

      {/* Success Notification Alert */}
      {isSuccess && successOrderId && (
        <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20 flex items-start gap-4 shadow-sm">
          <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="font-bold text-foreground text-base">Vielen Dank für Ihre Bestellung!</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed font-semibold">
              Ihr Druckauftrag wurde erfolgreich übermittelt und unter der Bestellnummer{" "}
              <strong className="text-foreground">{successOrderId}</strong> registriert. Sie finden die Details und die
              Druckfreigabe in der Liste unten.
            </p>
          </div>
        </div>
      )}

      {/* Main Split Layout: Compact Nav + Full Width Content Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-8 items-start">
        
        {/* Left Column: Nav Drawer */}
        <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 border-b lg:border-b-0 lg:border-r border-[#e7e8e9] lg:pr-6">
          <button
            onClick={() => setActiveTab("overview")}
            className={`flex items-center gap-3 px-5 py-3 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap lg:w-full ${
              activeTab === "overview"
                ? "bg-primary text-white shadow-sm"
                : "text-slate-600 hover:text-primary bg-[#f3f4f5] hover:bg-[#e7e8e9]"
            }`}
          >
            <LayoutDashboard className="w-4.5 h-4.5" />
            <span>KONTO-ÜBERSICHT</span>
          </button>

          <button
            onClick={() => setActiveTab("orders")}
            className={`flex items-center gap-3 px-5 py-3 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap lg:w-full ${
              activeTab === "orders"
                ? "bg-primary text-white shadow-sm"
                : "text-slate-600 hover:text-primary bg-[#f3f4f5] hover:bg-[#e7e8e9]"
            }`}
          >
            <ShoppingBag className="w-4.5 h-4.5" />
            <span>BESTELLUNGEN ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("addresses")}
            className={`flex items-center gap-3 px-5 py-3 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap lg:w-full ${
              activeTab === "addresses"
                ? "bg-primary text-white shadow-sm"
                : "text-slate-600 hover:text-primary bg-[#f3f4f5] hover:bg-[#e7e8e9]"
            }`}
          >
            <MapPin className="w-4.5 h-4.5" />
            <span>ADRESSBUCH</span>
          </button>
        </div>

        {/* Right Column: Dynamic Panel View */}
        <div className="bg-white border border-[#e7e8e9] p-6 md:p-8 rounded-2xl min-h-[400px] shadow-sm">
          
          {/* Tab 1: Overview */}
          {activeTab === "overview" && (
            <div className="flex flex-col gap-6">
              <h2 className="text-xl font-bold text-foreground">Willkommen zurück!</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-6 rounded-xl border border-[#e7e8e9] bg-[#f8f9fa]">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Konto-Status</span>
                  <div className="flex items-center gap-2 mt-2">
                    <User className="w-5 h-5 text-primary" />
                    <span className="text-sm font-bold text-foreground">Premium B2B-Kunde</span>
                  </div>
                </div>

                <div className="p-6 rounded-xl border border-[#e7e8e9] bg-[#f8f9fa]">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Letzte Bestellung</span>
                  <span className="text-sm font-bold text-foreground block mt-2">
                    {orders[0] ? `${orders[0].id} (${orders[0].date})` : "Keine Bestellungen"}
                  </span>
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-2">
                <h3 className="text-foreground font-bold text-sm">B2B Konditionen:</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                  Ihr Kundenkonto ist für B2B-Verfahren freigeschaltet. Sie können im Checkout Ihre Umsatzsteuer-Identifikationsnummer (USt-IdNr.) verifizieren, um automatische Steuerabzüge und Sammelrechnungen zu erhalten.
                </p>
              </div>
            </div>
          )}

          {/* Tab 2: Orders List */}
          {activeTab === "orders" && (
            <div className="flex flex-col gap-6">
              <h2 className="text-xl font-bold text-foreground">Bestellhistorie</h2>

              {orders.length > 0 ? (
                <div className="flex flex-col gap-6">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="border border-[#e7e8e9] rounded-xl bg-[#f8f9fa] p-6 flex flex-col gap-4"
                    >
                      {/* Order Header Meta */}
                      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 pb-4 border-b border-[#e7e8e9]">
                        <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs font-semibold text-slate-500">
                          <span>Bestell-Nr: <strong className="text-foreground">{order.id}</strong></span>
                          <span>Datum: <strong className="text-foreground">{order.date}</strong></span>
                          <span>Zahlung: <strong className="text-foreground">{order.paymentMethod}</strong></span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-primary" />
                          <span className="text-xs font-bold text-foreground uppercase">{order.status}</span>
                        </div>
                      </div>

                      {/* Line Items */}
                      <div className="flex flex-col gap-3">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs bg-white p-4 rounded-lg border border-[#e7e8e9]">
                            <div>
                              <span className="font-bold text-foreground">{item.productName}</span>
                              <div className="text-[10px] text-slate-400 flex flex-wrap gap-3 mt-1 font-semibold">
                                <span>{item.config.width}x{item.config.height} cm</span>
                                <span>{item.config.material}</span>
                                <span>Menge: {item.config.quantity}x</span>
                              </div>
                              
                              {/* Asset File Clickable Link */}
                              {item.config.fileName && (
                                <div className="mt-2 flex items-center gap-2 text-xs font-semibold">
                                  <FileText className="w-3.5 h-3.5 text-secondary" />
                                  <span className="text-slate-500">Upload-Asset:</span>
                                  <a
                                    href={item.config.fileUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-secondary hover:underline font-bold inline-flex items-center gap-1"
                                  >
                                    {item.config.fileName}
                                    <Download className="w-3 h-3" />
                                  </a>
                                </div>
                              )}
                            </div>

                            <span className="font-bold text-foreground text-right">
                              {item.pricing.gross.toFixed(2)} €
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Total */}
                      <div className="flex justify-between items-baseline pt-2 text-xs border-t border-[#e7e8e9]">
                        <span className="text-slate-500 font-bold">Gesamtsumme Brutto:</span>
                        <span className="text-base font-extrabold text-primary">{order.totalGross.toFixed(2)} €</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-500">Sie haben noch keine Bestellungen getätigt.</p>
              )}
            </div>
          )}

          {/* Tab 3: Addresses */}
          {activeTab === "addresses" && (
            <div className="flex flex-col gap-6">
              <h2 className="text-xl font-bold text-foreground">Rechnungs- & Lieferadressen</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-6 rounded-xl border border-[#e7e8e9] bg-[#f8f9fa] flex flex-col gap-3">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Standard Lieferadresse</span>
                  <div className="text-xs text-foreground flex flex-col gap-1 font-semibold">
                    <span className="font-bold text-sm text-foreground">Max Mustermann</span>
                    <span>Muster GmbH</span>
                    <span>Hauptstraße 123</span>
                    <span>10115 Berlin</span>
                    <span>Deutschland</span>
                  </div>
                </div>

                <div className="p-6 rounded-xl border border-[#e7e8e9] bg-[#f8f9fa] flex flex-col gap-3">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Standard Rechnungsadresse</span>
                  <div className="text-xs text-foreground flex flex-col gap-1 font-semibold">
                    <span className="font-bold text-sm text-foreground">Max Mustermann</span>
                    <span>Muster GmbH</span>
                    <span>Hauptstraße 123</span>
                    <span>10115 Berlin</span>
                    <span>Deutschland</span>
                    <span className="text-[10px] text-slate-400 mt-2">USt-IdNr.: DE812345678</span>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="text-slate-500 text-center py-20">Lade Kundenkonto...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
