import React from "react";
import Link from "next/link";
import { Shield, CreditCard, Award } from "lucide-react";
import Logo from "./Logo";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#151b29] text-[#e1e3e4] border-t border-white/5 py-16 mt-auto">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="flex flex-col gap-4">
          <Link href="/" className="flex items-center gap-2 text-white font-extrabold text-xl tracking-tight">
            <Logo className="w-8 h-8" />
            
          </Link>
          <p className="text-sm text-slate-400 leading-relaxed">
            Premium Headless E-Commerce Druckerei für anspruchsvolle B2B-Kunden in Deutschland. Maßgeschneiderte Platten, Fine-Art und Werbeplanen.
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-col gap-4">
          <h4 className="text-white font-bold text-xs uppercase tracking-widest">Kategorien</h4>
          <ul className="flex flex-col gap-2.5 text-sm text-slate-400">
            <li>
              <Link href="/categories/fine-art" className="hover:text-white transition-colors">
                Fine-Art & Fotodruck
              </Link>
            </li>
            <li>
              <Link href="/categories/platten" className="hover:text-white transition-colors">
                Plattendruck & Schilder
              </Link>
            </li>
            <li>
              <Link href="/categories/werbetechnik" className="hover:text-white transition-colors">
                Werbetechnik & Banner
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal & Account */}
        <div className="flex flex-col gap-4">
          <h4 className="text-white font-bold text-xs uppercase tracking-widest">Rechtliches</h4>
          <ul className="flex flex-col gap-2.5 text-sm text-slate-400">
            <li>
              <Link href="/dashboard" className="hover:text-white transition-colors">
                Mein Kundenkonto
              </Link>
            </li>
            <li>
              <span className="hover:text-white transition-colors cursor-pointer">Impressum</span>
            </li>
            <li>
              <span className="hover:text-white transition-colors cursor-pointer">Datenschutzerklärung</span>
            </li>
            <li>
              <span className="hover:text-white transition-colors cursor-pointer">AGB & Widerruf</span>
            </li>
          </ul>
        </div>

        {/* Quality Features */}
        <div className="flex flex-col gap-4">
          <h4 className="text-white font-bold text-xs uppercase tracking-widest">Qualität & Sicherheit</h4>
          <div className="grid grid-cols-2 gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <Shield className="w-4.5 h-4.5 text-primary-light flex-shrink-0" />
              <span>300 DPI Proficheck</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4.5 h-4.5 text-secondary-light flex-shrink-0" />
              <span>Made in Germany</span>
            </div>
            <div className="flex items-center gap-2 col-span-2">
              <CreditCard className="w-4.5 h-4.5 text-primary-light flex-shrink-0" />
              <span>Gesicherte Zahlungen</span>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
        <span>© {new Date().getFullYear()} DEUTSCHDRUCK E.K. Alle Rechte vorbehalten.</span>
        <span>100% Klimaneutraler Druck aus Deutschland.</span>
      </div>
    </footer>
  );
};
export default Footer;
