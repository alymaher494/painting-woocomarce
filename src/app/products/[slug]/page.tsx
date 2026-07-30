"use client";

import React, { use, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Check, Upload, HelpCircle, FileText, ShoppingCart, ShieldAlert } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface ProductInfo {
  name: string;
  category: string;
  image: string;
  thumbnails: string[];
  baseCm2Price: number; // Price per square cm
  materials: { name: string; desc: string; extraFactor: number }[];
  baseSetupFee: number;
  isPresetOnly?: boolean;
  isFixedDesign?: boolean;
  presets?: { label: string; desc: string; w: number; h: number; price: number }[];
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
  minNetPrice?: number;
  hasGrommetsOption?: boolean;
  isRestrictedQuantities?: boolean;
  allowedQuantities?: number[];
  hideStaffelpreise?: boolean; // Type 1 and Type 2 choice
  minQuantity?: number;
}

const PRODUCT_DATA: Record<string, ProductInfo> = {
  "fertige-aufkleber": {
    name: "Fertige Aufkleber (Pizza Design)",
    category: "Fertige Aufkleber",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80",
    thumbnails: [
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=150&auto=format&fit=crop&q=80"
    ],
    baseCm2Price: 0,
    baseSetupFee: 0,
    isPresetOnly: true,
    isFixedDesign: true, // No file upload required
    presets: [
      { label: "Ø 10 cm", desc: "Kleine Ausführung", w: 10, h: 10, price: 5.00 },
      { label: "Ø 20 cm", desc: "Mittlere Ausführung", w: 20, h: 20, price: 10.00 },
      { label: "Ø 30 cm", desc: "Große Ausführung", w: 30, h: 30, price: 18.00 }
    ],
    materials: [
      { name: "Premium Haftpapier Weiß", desc: "Eco-friendly, vibrant prints", extraFactor: 1.0 },
      { name: "Outdoor Vinyl Wetterfest", desc: "UV and rain protected coating", extraFactor: 1.25 }
    ]
  },
  "aufkleber": {
    name: "Outdoor Aufkleber (Freie Größe)",
    category: "Aufkleber",
    image: "https://images.unsplash.com/photo-1561070791-26c113006238?w=600&auto=format&fit=crop&q=80",
    thumbnails: [
      "https://images.unsplash.com/photo-1561070791-26c113006238?w=150&auto=format&fit=crop&q=80"
    ],
    baseCm2Price: 0.0035, // Matches 100x100cm (10,000cm2) * 0.0035 = 35.00 € Netto
    baseSetupFee: 0.00, // Removed setup fee to make 100x100 Netto exactly 35.00 €
    minWidth: 10,
    minHeight: 10,
    maxWidth: 150,
    maxHeight: 400,
    minNetPrice: 15.00, // Forces min cost of 15€ Netto
    hideStaffelpreise: true, // Hides bulk quantity table, allows 1, 2, 3...
    minQuantity: 1,
    materials: [
      { name: "PVC Premium Vinyl Weißmatt", desc: "Very durable outdoor quality", extraFactor: 1.0 },
      { name: "PVC Premium Vinyl Hochglanz", desc: "Glossy finish for extra colors", extraFactor: 1.15 }
    ]
  },
  "poster": {
    name: "Premium B2B Werbeposter",
    category: "Poster",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&auto=format&fit=crop&q=80",
    thumbnails: [
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=150&auto=format&fit=crop&q=80"
    ],
    baseCm2Price: 0.0025,
    baseSetupFee: 8.00,
    hasGrommetsOption: true, // Allows border grommets
    isPresetOnly: true, // Hides manual size input drawer
    hideStaffelpreise: true, // Hides bulk quantity table, allows 1, 2, 3...
    minQuantity: 1,
    isFixedDesign: true, // No file upload required
    presets: [
      { label: "25 x 25 cm", desc: "Kompakt", w: 25, h: 25, price: 12.90 },
      { label: "30 x 30 cm", desc: "Standard", w: 30, h: 30, price: 18.90 },
      { label: "50 x 50 cm", desc: "Groß", w: 50, h: 50, price: 29.90 },
    ],
    materials: [
      { name: "Affichenpapier 115g (Blueback)", desc: "Perfect for outdoor bill posting", extraFactor: 1.0 },
      { name: "Premium Fotopapier 250g", desc: "Heavy stock with semigloss finish", extraFactor: 1.45 }
    ]
  },
  "aufkleber-auflagen": {
    name: "Sticker mit festen Auflagen",
    category: "Aufkleber mit bestimmten Auflagen",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&auto=format&fit=crop&q=80",
    thumbnails: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=150&auto=format&fit=crop&q=80"
    ],
    baseCm2Price: 0.0035,
    baseSetupFee: 3.50,
    isPresetOnly: true,
    isRestrictedQuantities: true, // Only specific quantities allowed
    allowedQuantities: [2, 6, 10, 12, 25, 50],
    presets: [
      { label: "Format A8 (5.2x7.4 cm)", desc: "Standard small card", w: 5.2, h: 7.4, price: 4.50 },
      { label: "Format A7 (7.4x10.5 cm)", desc: "Medium flyer size", w: 7.4, h: 10.5, price: 8.90 }
    ],
    materials: [
      { name: "Haftfolie transparent", desc: "Transparent borderless look", extraFactor: 1.0 },
      { name: "Haftfolie Weißmatt", desc: "Classic white background", extraFactor: 1.0 }
    ]
  },
  "acrylglas": {
    name: "Acrylglas Fine-Art",
    category: "Plattendruck & Schilder",
    image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=600&auto=format&fit=crop&q=80",
    thumbnails: [
      "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=150&auto=format&fit=crop&q=80"
    ],
    baseCm2Price: 0.012,
    baseSetupFee: 15.0,
    materials: [
      { name: "Acrylglas XT Hochglanz 4mm", desc: "Premium acrylic glass sheet", extraFactor: 1.0 },
      { name: "Acrylglas XT Matte entspiegelt 4mm", desc: "Non-glare acrylic surface", extraFactor: 1.25 },
    ],
  },
  "alu-dibond": {
    name: "Alu-Dibond Butler Finish",
    category: "Plattendruck & Schilder",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&auto=format&fit=crop&q=80",
    thumbnails: [
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=150&auto=format&fit=crop&q=80"
    ],
    baseCm2Price: 0.009,
    baseSetupFee: 10.0,
    materials: [
      { name: "Alu-Dibond Weißmatt 3mm", desc: "Sturdy aluminum white core panel", extraFactor: 1.0 },
      { name: "Butler Finish Silber gebürstet 3mm", desc: "Reflective brushed metal look", extraFactor: 1.4 },
    ],
  },
  "hartschaumplatte": {
    name: "Hartschaumplatte PVC",
    category: "Plattendruck & Schilder",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&auto=format&fit=crop&q=80",
    thumbnails: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=150&auto=format&fit=crop&q=80"
    ],
    baseCm2Price: 0.006,
    baseSetupFee: 7.5,
    materials: [
      { name: "Forex Hartschaumplatte Weiß 3mm", desc: "Lightweight and flexible signage", extraFactor: 1.0 },
      { name: "Forex Hartschaumplatte Weiß 5mm", desc: "Sturdy interior exhibition panel", extraFactor: 1.3 },
    ],
  },
};

interface Params {
  slug: string;
}

export default function ProductDetailPage({ params }: { params: Promise<Params> }) {
  const resolvedParams = use(params);
  const { slug } = resolvedParams;
  const router = useRouter();
  const { addToCart } = useCart();

  const product = PRODUCT_DATA[slug] || PRODUCT_DATA["fertige-aufkleber"];

  // Configurator States
  const [width, setWidth] = useState<number>(product.presets ? product.presets[0].w : (product.minWidth || 10));
  const [height, setHeight] = useState<number>(product.presets ? product.presets[0].h : (product.minHeight || 10));
  const [quantity, setQuantity] = useState<number>(
    product.isRestrictedQuantities && product.allowedQuantities
      ? product.allowedQuantities[0]
      : product.hideStaffelpreise
        ? (product.minQuantity || 1)
        : 100
  );
  const [selectedMaterial, setSelectedMaterial] = useState<string>(product.materials[0].name);
  const [qualityCheck, setQualityCheck] = useState<boolean>(true);
  const [postInvoice, setPostInvoice] = useState<boolean>(false);
  const [delivery, setDelivery] = useState<"standard" | "priority" | "48h" | "24h">("standard");
  const [hasGrommets, setHasGrommets] = useState<boolean>(false); // Type 3 option

  // File Upload States
  const [file, setFile] = useState<{ name: string; size: string; url: string } | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [fileError, setFileError] = useState<string | null>(null);

  // Active picture preview state
  const [activeImage, setActiveImage] = useState<string>(product.image);

  // Price Calculations
  const [pricing, setPricing] = useState({ net: 0, vat: 0, gross: 0 });

  // Update states on slug navigation
  useEffect(() => {
    if (product) {
      if (product.presets) {
        setWidth(product.presets[0].w);
        setHeight(product.presets[0].h);
      } else {
        setWidth(product.minWidth || 10);
        setHeight(product.minHeight || 10);
      }
      setSelectedMaterial(product.materials[0].name);
      setHasGrommets(false);
      setFile(null);
      if (product.isRestrictedQuantities && product.allowedQuantities) {
        setQuantity(product.allowedQuantities[0]);
      } else if (product.hideStaffelpreise) {
        setQuantity(product.minQuantity || 1);
      } else {
        setQuantity(100);
      }
    }
  }, [slug]);

  useEffect(() => {
    let rawPrintCost = 0;
    const materialFactor = product.materials.find((m) => m.name === selectedMaterial)?.extraFactor || 1.0;

    if (product.isPresetOnly && product.presets) {
      const activePreset = product.presets.find((p) => p.w === width && p.h === height) || product.presets[0];
      rawPrintCost = activePreset.price * materialFactor;
    } else {
      const area = width * height;
      rawPrintCost = area * product.baseCm2Price * materialFactor;
    }

    let baseSetup = product.baseSetupFee;

    // Delivery fee tiers
    let deliveryFee = 0;
    if (delivery === "priority") deliveryFee = 15.0;
    else if (delivery === "48h") deliveryFee = 25.0;
    else if (delivery === "24h") deliveryFee = 45.0;

    // Additional services
    const checkFee = qualityCheck ? 2.50 : 0;
    const invoiceFee = postInvoice ? 1.50 : 0;
    const grommetsFee = (product.hasGrommetsOption && hasGrommets) ? 5.00 : 0; // Type 3 surcharge

    // Bulk discount tiers based on quantity
    let bulkDiscountFactor = 1.0;
    if (quantity >= 500) bulkDiscountFactor = 0.45;
    else if (quantity >= 250) bulkDiscountFactor = 0.62;
    else if (quantity >= 100) bulkDiscountFactor = 0.85;
    else if (quantity >= 50) bulkDiscountFactor = 0.95;

    const netSingle = (rawPrintCost * bulkDiscountFactor) + baseSetup + checkFee + invoiceFee + deliveryFee + grommetsFee;
    let netTotal = netSingle * quantity;

    // Enforce Minimum Price for Custom sizes (Type 2: minNetPrice = 15.00)
    if (product.minNetPrice && netTotal < product.minNetPrice) {
      netTotal = product.minNetPrice;
    }

    const vatTotal = netTotal * 0.19; // 19% MwSt
    const grossTotal = netTotal + vatTotal;

    setPricing({
      net: parseFloat(netTotal.toFixed(2)),
      vat: parseFloat(vatTotal.toFixed(2)),
      gross: parseFloat(grossTotal.toFixed(2)),
    });
  }, [width, height, quantity, selectedMaterial, qualityCheck, postInvoice, delivery, hasGrommets, product]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (!uploadedFile) return;

    setFileError(null);
    const validExtensions = ["pdf", "jpg", "png", "jpeg"];
    const ext = uploadedFile.name.split(".").pop()?.toLowerCase();

    if (!ext || !validExtensions.includes(ext)) {
      setFileError("Ungültiges Dateiformat. Bitte laden Sie eine PDF, PNG oder JPG Datei hoch.");
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setFile({
            name: uploadedFile.name,
            size: (uploadedFile.size / (1024 * 1024)).toFixed(1) + " MB",
            url: `https://shop.headless-commerce.de/uploads/secure/${encodeURIComponent(uploadedFile.name)}`,
          });
          return 100;
        }
        return prev + 20;
      });
    }, 150);
  };

  const handleAddToCart = () => {
    // 1. Validation for Custom Sizing Limits (Type 2: min/max limits)
    if (!product.isPresetOnly) {
      const minW = product.minWidth || 2;
      const maxW = product.maxWidth || 300;
      const minH = product.minHeight || 2;
      const maxH = product.maxHeight || 300;

      if (width < minW || width > maxW || height < minH || height > maxH) {
        alert(`Geben Sie gültige Maße ein:\nBreite: zwischen ${minW} und ${maxW} cm\nHöhe: zwischen ${minH} und ${maxH} cm`);
        return;
      }
    }

    // 2. Validation for Design Upload (Type 1 doesn't require upload)
    if (!product.isFixedDesign && !file) {
      setFileError("Bitte laden Sie vor dem Hinzufügen zum Warenkorb eine Druckdatei hoch.");
      document.getElementById("uploader-section")?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    const cartPayload = {
      productSlug: slug,
      productName: product.name,
      productImage: product.image,
      config: {
        width,
        height,
        quantity,
        material: selectedMaterial,
        qualityCheck,
        postInvoice,
        delivery,
        hasGrommets: product.hasGrommetsOption ? hasGrommets : false,
        fileName: file?.name || "Standard-Design",
        fileSize: file?.size || "0 MB",
        fileUrl: file?.url || "",
      },
      pricing,
    };

    addToCart(cartPayload);
    router.push("/cart");
  };

  // Estimated pricing table for mockup visualization
  const getTierPrice = (tierQty: number) => {
    let rawPrintCost = 0;
    const materialFactor = product.materials.find((m) => m.name === selectedMaterial)?.extraFactor || 1.0;
    
    if (product.isPresetOnly && product.presets) {
      const activePreset = product.presets.find((p) => p.w === width && p.h === height) || product.presets[0];
      rawPrintCost = activePreset.price * materialFactor;
    } else {
      const area = width * height;
      rawPrintCost = area * product.baseCm2Price * materialFactor;
    }
    
    let discount = 1.0;
    if (tierQty >= 500) discount = 0.45;
    else if (tierQty >= 250) discount = 0.62;
    else if (tierQty >= 100) discount = 0.85;
    else if (tierQty >= 50) discount = 0.95;

    const baseSetup = product.baseSetupFee;
    const netSingle = (rawPrintCost * discount) + baseSetup;
    const grossSingle = netSingle * 1.19;

    return {
      unit: grossSingle.toFixed(2),
      total: (grossSingle * tierQty).toFixed(2),
    };
  };

  return (
    <div className="flex flex-col gap-8 text-[#191c1d] bg-[#f8f9fa]">
      <div className="max-w-[1400px] mx-auto w-full px-4 md:px-8 pt-8 flex flex-col gap-6">
        {/* Navigation Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold">
        <Link href="/" className="hover:text-primary">Home</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-primary">Produkte</Link>
        <span>/</span>
        <span className="text-foreground">{product.name}</span>
      </div>

      {/* Main Two-Column Configuration Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        {/* Left Column: Gallery Sidebar */}
        <div className="lg:sticky lg:top-[120px] h-max flex flex-col gap-6">
          <div className="border border-[#e7e8e9] rounded-2xl p-2 bg-white shadow-sm">
            <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-[#f3f4f5]">
              <img
                src={activeImage}
                alt={product.name}
                className="w-full h-full object-cover transition-all"
              />
              <span className="absolute top-4 left-4 bg-primary text-white text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-md">
                Made in Germany
              </span>
            </div>
            {/* Gallery Thumbnails */}
            <div className="grid grid-cols-3 gap-2 mt-2">
              {product.thumbnails.map((thumb, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(thumb)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                    activeImage === thumb ? "border-primary" : "border-transparent"
                  }`}
                >
                  <img src={thumb} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white border border-[#e7e8e9] p-6 rounded-2xl flex flex-col gap-4 shadow-sm">
            <h4 className="text-foreground font-black text-xs uppercase tracking-wider text-secondary">Druck-Checkliste</h4>
            <ul className="text-xs text-slate-500 flex flex-col gap-2.5 font-medium">
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-primary-light" /> 300 DPI optimale Auflösung
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-primary-light" /> CMYK Farbraum (Coated FOGRA39)
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-primary-light" /> 2mm umlaufender Beschnitt (Bleed)
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-primary-light" /> Schriften in Pfade konvertiert
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column: Main Configurator Panel */}
        <div className="bg-white border border-[#e7e8e9] p-8 md:p-12 rounded-3xl flex flex-col gap-8 shadow-sm">
          {/* Header Info */}
          <div className="pb-6 border-b border-[#e7e8e9]">
            <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">{product.category}</span>
            <h1 className="text-3xl md:text-4xl font-black text-foreground mt-1">{product.name}</h1>
            <p className="text-xs text-slate-500 mt-2 max-w-2xl leading-relaxed">
              Precision-cut, weather-resistant vinyl prints for brands that demand the best quality. Perfect for professional presentation.
            </p>
          </div>

          {/* 1. Choose Size Preset / Custom */}
          <div className="flex flex-col gap-4">
            <h3 className="text-foreground font-bold text-sm">1. Maße wählen</h3>
            {product.presets && (
              <div className="grid grid-cols-3 gap-4">
                {product.presets.map((preset, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      setWidth(preset.w);
                      setHeight(preset.h);
                    }}
                    className={`p-4 rounded-xl text-center border transition-all cursor-pointer ${
                      width === preset.w && height === preset.h
                        ? "bg-primary/5 border-primary shadow-sm"
                        : "border-[#e7e8e9] hover:border-primary"
                    }`}
                  >
                    <span className="text-xs font-extrabold text-foreground block">{preset.label}</span>
                    <span className="text-[10px] text-slate-400 block mt-1 font-semibold">{preset.desc}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Custom dimensions drawer (only show for standard custom print calculators) */}
            {!product.isPresetOnly && (
              <div className="grid grid-cols-2 gap-4 mt-2 p-4 bg-[#f8f9fa] rounded-xl border border-[#e7e8e9]">
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between items-baseline">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Custom Breite (cm)</label>
                    <span className="text-[9px] text-slate-400 font-semibold">
                      ({product.minWidth || 2} - {product.maxWidth || 300} cm)
                    </span>
                  </div>
                  <input
                    type="number"
                    min={product.minWidth || 2}
                    max={product.maxWidth || 300}
                    value={width}
                    onChange={(e) => setWidth(parseInt(e.target.value) || 0)}
                    className="precision-input"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between items-baseline">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Custom Höhe (cm)</label>
                    <span className="text-[9px] text-slate-400 font-semibold">
                      ({product.minHeight || 2} - {product.maxHeight || 300} cm)
                    </span>
                  </div>
                  <input
                    type="number"
                    min={product.minHeight || 2}
                    max={product.maxHeight || 300}
                    value={height}
                    onChange={(e) => setHeight(parseInt(e.target.value) || 0)}
                    className="precision-input"
                  />
                </div>
              </div>
            )}
          </div>

          {!product.isFixedDesign && (
            <>
              {/* 2. Select Material */}
              <div className="flex flex-col gap-4">
                <h3 className="text-foreground font-bold text-sm">2. Material & Ausführung</h3>
                <div className="flex flex-col gap-3">
                  {product.materials.map((m) => (
                    <label
                      key={m.name}
                      onClick={() => setSelectedMaterial(m.name)}
                      className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                        selectedMaterial === m.name
                          ? "bg-primary/5 border-primary"
                          : "border-[#e7e8e9] hover:border-primary bg-white"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="material"
                          checked={selectedMaterial === m.name}
                          onChange={() => setSelectedMaterial(m.name)}
                          className="accent-primary"
                        />
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-foreground">{m.name}</span>
                          <span className="text-[10px] text-slate-400 font-semibold">{m.desc}</span>
                        </div>
                      </div>
                      {m.extraFactor > 1.0 && (
                        <span className="text-[10px] bg-secondary/10 text-secondary font-bold px-2 py-0.5 rounded-full">
                          +{Math.round((m.extraFactor - 1) * 100)}%
                        </span>
                      )}
                    </label>
                  ))}
                </div>
              </div>

              {/* 3. Quantity & Pricing Table */}
              <div className="flex flex-col gap-4">
                <h3 className="text-foreground font-bold text-sm">3. Bestellmenge & Staffelpreise</h3>
                
                {product.hideStaffelpreise ? (
                  /* Simple direct input for small individual quantities (Type 1 and Type 2) */
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-slate-500 font-bold">Menge (Stück):</span>
                    <input
                      type="number"
                      min={product.minQuantity || 1}
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(product.minQuantity || 1, parseInt(e.target.value) || 1))}
                      className="precision-input w-24 text-center py-1.5"
                    />
                    <span className="text-[10px] text-slate-400 font-semibold">Stück (Min. {product.minQuantity || 1})</span>
                  </div>
                ) : (
                  /* Standard Bulk Tiers table (Type 3 and Type 4) */
                  <>
                    <div className="border border-[#e7e8e9] rounded-xl overflow-hidden text-xs">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-[#f8f9fa] border-b border-[#e7e8e9] font-bold text-slate-500">
                            <th className="p-3">Stückzahl</th>
                            <th className="p-3">Stückpreis (Brutto)</th>
                            <th className="p-3 text-right">Gesamtpreis</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#e7e8e9]">
                          {(product.isRestrictedQuantities && product.allowedQuantities
                            ? product.allowedQuantities
                            : [50, 100, 250, 500]
                          ).map((tierQty) => {
                            const prices = getTierPrice(tierQty);
                            return (
                              <tr
                                key={tierQty}
                                onClick={() => setQuantity(tierQty)}
                                className={`hover:bg-primary/5 cursor-pointer transition-colors ${
                                  quantity === tierQty ? "bg-primary/5 font-bold" : ""
                                }`}
                              >
                                <td className="p-3 flex items-center gap-2">
                                  <input
                                    type="radio"
                                    name="qty-tier"
                                    checked={quantity === tierQty}
                                    onChange={() => setQuantity(tierQty)}
                                    className="accent-primary"
                                  />
                                  <span>{tierQty} Stück</span>
                                </td>
                                <td className="p-3">{prices.unit} €</td>
                                <td className="p-3 text-right text-primary">{prices.total} €</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>

                    {/* Custom Quantity Input (hidden for restricted quantities like Type 4) */}
                    {!product.isRestrictedQuantities && (
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-xs text-slate-500 font-bold">Individuelle Menge:</span>
                        <input
                          type="number"
                          min={10}
                          value={quantity}
                          onChange={(e) => setQuantity(Math.max(10, parseInt(e.target.value) || 10))}
                          className="precision-input w-24 text-center py-1.5"
                        />
                        <span className="text-[10px] text-slate-400 font-semibold">Stück (Min. 10)</span>
                      </div>
                    )}
                  </>
                )}
              </div>

              <hr className="border-[#e7e8e9]" />

              {/* Extra Services & Delivery */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-4">
                  <h3 className="text-foreground font-bold text-sm">4. Zusatzleistungen</h3>
                  <div className="flex flex-col gap-3">
                    <label className="flex items-center gap-3 text-slate-600 hover:text-foreground cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={qualityCheck}
                        onChange={(e) => setQualityCheck(e.target.checked)}
                        className="w-4 h-4 rounded border-[#e7e8e9] accent-primary"
                      />
                      <span className="text-xs font-semibold">Profi-Druckdatenprüfung (+2,50 €)</span>
                    </label>
                    <label className="flex items-center gap-3 text-slate-600 hover:text-foreground cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={postInvoice}
                        onChange={(e) => setPostInvoice(e.target.checked)}
                        className="w-4 h-4 rounded border-[#e7e8e9] accent-primary"
                      />
                      <span className="text-xs font-semibold">Rechnung per Post erhalten (+1,50 €)</span>
                    </label>
                    {product.hasGrommetsOption && (
                      <label className="flex items-center gap-3 text-slate-600 hover:text-foreground cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={hasGrommets}
                          onChange={(e) => setHasGrommets(e.target.checked)}
                          className="w-4 h-4 rounded border-[#e7e8e9] accent-primary"
                        />
                        <span className="text-xs font-semibold">Umlaufende Metallösen zur Befestigung (+5,00 €)</span>
                      </label>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <h3 className="text-foreground font-bold text-sm">5. Versandoptionen</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: "standard", label: "Standard", desc: "4-5 Tage", price: "0,00 €" },
                      { id: "priority", label: "Express", desc: "2-3 Tage", price: "+15,00 €" },
                    ].map((tier) => (
                      <button
                        key={tier.id}
                        type="button"
                        onClick={() => setDelivery(tier.id as any)}
                        className={`p-3 rounded-xl border text-left flex flex-col justify-between min-h-[75px] cursor-pointer transition-all ${
                          delivery === tier.id
                            ? "bg-primary/5 border-primary"
                            : "border-[#e7e8e9] hover:border-primary"
                        }`}
                      >
                         <span className="text-[10px] font-bold text-foreground block">{tier.label}</span>
                         <div>
                           <span className="text-[10px] text-slate-400 block font-semibold">{tier.desc}</span>
                           <span className="text-[10px] font-bold text-primary">{tier.price}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {!product.isFixedDesign && (
            <>
              <hr className="border-[#e7e8e9]" />

              {/* 6. File Upload */}
              <div id="uploader-section" className="flex flex-col gap-4">
                <h3 className="text-foreground font-bold text-sm">6. Druckdatei hochladen</h3>
                
                {!file ? (
                  <div className="border-2 border-dashed border-[#e7e8e9] rounded-2xl p-8 text-center bg-[#f8f9fa] hover:border-primary hover:bg-[#f3f4f5] transition-colors relative">
                    <input
                      type="file"
                      onChange={handleFileUpload}
                      accept=".pdf,.png,.jpg,.jpeg"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      disabled={isUploading}
                    />
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <Upload className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-foreground block">Datei auswählen oder reinziehen</span>
                        <span className="text-[10px] text-slate-400 mt-1 block">PDF, PNG, JPG (max. 100MB)</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between p-4 rounded-xl bg-primary/5 border border-primary/20">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center text-primary">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-foreground block truncate max-w-[250px] md:max-w-[400px]">
                          {file.name}
                        </span>
                        <span className="text-[10px] text-slate-400">{file.size} | Druckdaten bereit</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setFile(null)}
                      className="text-xs text-red-500 hover:text-red-600 hover:underline font-bold cursor-pointer"
                    >
                      Entfernen
                    </button>
                  </div>
                )}

                {isUploading && (
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between text-[10px] text-slate-500 font-bold">
                      <span>Druckdaten-Check läuft...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <div className="w-full bg-[#f3f4f5] h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-primary h-full transition-all duration-150"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  </div>
                )}

                {fileError && <p className="text-xs text-red-500 font-semibold">{fileError}</p>}
              </div>
            </>
          )}

          {/* Pricing Engine Summary Box */}
          <div className="p-6 rounded-2xl bg-[#f8f9fa] border border-[#e7e8e9] flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Estimated Subtotal:</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl md:text-3xl font-black text-foreground">{pricing.gross.toFixed(2)} €</span>
                <span className="text-xs text-slate-400 font-semibold">Brutto (inkl. 19% MwSt.)</span>
              </div>
              <span className="text-xs text-slate-500 font-semibold mt-1">
                Netto: {pricing.net.toFixed(2)} € | MwSt.: {pricing.vat.toFixed(2)} €
              </span>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
              {product.isFixedDesign && (
                <div className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-full border border-[#e7e8e9] w-full md:w-auto justify-center">
                  <span className="text-xs text-slate-500 font-bold whitespace-nowrap">Menge:</span>
                  <input
                    type="number"
                    min={1}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-12 text-center text-xs font-bold focus:outline-none"
                  />
                </div>
              )}
              <button
                onClick={handleAddToCart}
                type="button"
                className="w-full md:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#b40065] hover:bg-[#db1f7f] text-white font-extrabold text-sm hover:shadow-lg transition-all transform active:scale-95 cursor-pointer"
              >
                <ShoppingCart className="w-4 h-4" />
                In den Warenkorb
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Service Badges */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="bg-white border border-[#e7e8e9] p-6 rounded-2xl flex flex-col gap-2 shadow-sm text-center md:text-left">
          <span className="text-primary text-xs font-bold uppercase tracking-wider block">Free File Check</span>
          <p className="text-[11px] text-slate-500 leading-relaxed font-semibold">
            Our experts manually review every design to ensure perfect print results before production.
          </p>
        </div>
        <div className="bg-white border border-[#e7e8e9] p-6 rounded-2xl flex flex-col gap-2 shadow-sm text-center md:text-left">
          <span className="text-primary text-xs font-bold uppercase tracking-wider block">Eco-Friendly</span>
          <p className="text-[11px] text-slate-500 leading-relaxed font-semibold">
            Using solvent-free inks and sustainably sourced vinyl materials for all products.
          </p>
        </div>
        <div className="bg-white border border-[#e7e8e9] p-6 rounded-2xl flex flex-col gap-2 shadow-sm text-center md:text-left">
          <span className="text-primary text-xs font-bold uppercase tracking-wider block">CNC Precision</span>
          <p className="text-[11px] text-slate-500 leading-relaxed font-semibold">
            State-of-the-art laser cutting for intricate shapes and sharp edges.
          </p>
        </div>
      </div>

    </div>
    </div>
  );
}
