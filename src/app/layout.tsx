import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";

export const metadata: Metadata = {
  title: "DEUTSCHDRUCK | Corporate Modern Web-to-Print Store",
  description: "Ihre professionelle Online-Druckerei. Precision Print Aesthetic - Aufkleber, Plattendruck, Banner und Werbetechnik nach Maß.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#f8f9fa] text-[#191c1d] font-sans">
        <CartProvider>
          <Header />
          <main className="flex-1 pt-20 pb-12 flex flex-col">{children}</main>
          <Footer />
          <CookieBanner />
        </CartProvider>
      </body>
    </html>
  );
}
