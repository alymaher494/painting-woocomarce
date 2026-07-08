"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingBag, ChevronDown, Menu, X, User } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Logo from "./Logo";

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cart } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const totalItems = cart.reduce((sum, item) => sum + item.config.quantity, 0);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-[#e7e8e9] py-3.5"
          : "bg-white border-b border-[#e7e8e9] py-4.5"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-foreground font-black text-xl tracking-tight hover:opacity-90">
          <Logo className="w-8 h-8" />
          <span>
            DEUTSCH<span className="text-secondary">DRUCK</span>
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-[15px] font-semibold text-slate-700">
          <Link href="/products" className="hover:text-primary transition-colors">
            Produkte
          </Link>
          <div className="relative group">
            <button className="flex items-center gap-1 hover:text-primary transition-colors cursor-pointer font-semibold">
              Kategorien <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-200" />
            </button>
            <div className="absolute top-full left-0 mt-2 w-56 rounded-xl bg-white border border-[#e7e8e9] shadow-lg p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <Link
                href="/categories/fine-art"
                className="block w-full px-4 py-2.5 text-sm text-slate-700 hover:text-primary hover:bg-[#f3f4f5] rounded-lg transition-colors font-medium"
              >
                Fine-Art & Fotodruck
              </Link>
              <Link
                href="/categories/platten"
                className="block w-full px-4 py-2.5 text-sm text-slate-700 hover:text-primary hover:bg-[#f3f4f5] rounded-lg transition-colors font-medium"
              >
                Plattendruck & Schilder
              </Link>
              <Link
                href="/categories/werbetechnik"
                className="block w-full px-4 py-2.5 text-sm text-slate-700 hover:text-primary hover:bg-[#f3f4f5] rounded-lg transition-colors font-medium"
              >
                Werbetechnik & Planen
              </Link>
            </div>
          </div>
          <Link href="/dashboard" className="hover:text-primary transition-colors">
            Kundenkonto
          </Link>
        </nav>

        {/* Right side items */}
        <div className="flex items-center gap-4">
          <Link href="/login" className="p-2 text-slate-700 hover:text-primary transition-colors" title="Kundenkonto / Login">
            <User className="w-5.5 h-5.5" />
          </Link>

          <Link href="/cart" className="relative p-2 text-slate-700 hover:text-primary transition-colors">
            <ShoppingBag className="w-5.5 h-5.5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-secondary text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white animate-bounce">
                {totalItems}
              </span>
            )}
          </Link>

          <Link
            href="/products"
            className="hidden sm:inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-primary text-white font-bold text-sm hover:bg-primary-light transition-all shadow-sm"
          >
            Individuelles Design
          </Link>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-slate-700 hover:text-primary"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[65px] z-40 bg-white flex flex-col p-6 gap-6 border-t border-[#e7e8e9] animate-fade-in shadow-lg">
          <Link
            href="/products"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-lg font-bold text-slate-700 hover:text-primary transition-colors"
          >
            Alle Produkte
          </Link>
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold uppercase text-secondary tracking-wider">Kategorien</span>
            <Link
              href="/categories/fine-art"
              onClick={() => setIsMobileMenuOpen(false)}
              className="pl-4 text-slate-700 hover:text-primary font-medium transition-colors"
            >
              Fine-Art & Fotodruck
            </Link>
            <Link
              href="/categories/platten"
              onClick={() => setIsMobileMenuOpen(false)}
              className="pl-4 text-slate-700 hover:text-primary font-medium transition-colors"
            >
              Plattendruck & Schilder
            </Link>
            <Link
              href="/categories/werbetechnik"
              onClick={() => setIsMobileMenuOpen(false)}
              className="pl-4 text-slate-700 hover:text-primary font-medium transition-colors"
            >
              Werbetechnik & Planen
            </Link>
          </div>
          <Link
            href="/dashboard"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-lg font-bold text-slate-700 hover:text-primary transition-colors"
          >
            Kundenkonto
          </Link>
          <Link
            href="/products"
            onClick={() => setIsMobileMenuOpen(false)}
            className="w-full text-center py-3.5 rounded-full bg-primary text-white font-bold"
          >
            Individuelles Design
          </Link>
        </div>
      )}
    </header>
  );
};
export default Header;
