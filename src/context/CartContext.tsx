"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface PrintConfig {
  width: number;
  height: number;
  quantity: number;
  material: string;
  qualityCheck: boolean;
  postInvoice: boolean;
  delivery: "standard" | "priority" | "48h" | "24h";
  fileName?: string;
  fileSize?: string;
  fileUrl?: string;
}

export interface CartItem {
  id: string;
  productSlug: string;
  productName: string;
  productImage: string;
  config: PrintConfig;
  pricing: {
    net: number;
    vat: number;
    gross: number;
  };
}

export interface Order {
  id: string;
  date: string;
  status: "In Bearbeitung" | "Fertiggestellt" | "Versandt";
  items: CartItem[];
  totalGross: number;
  paymentMethod: string;
}

interface CartContextType {
  cart: CartItem[];
  orders: Order[];
  addToCart: (item: Omit<CartItem, "id">) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  checkoutCart: (paymentMethod: string, companyDetails?: any) => Order;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const PRESET_PRODUCTS: Record<string, { name: string; image: string }> = {
  "fine-art-poster": { name: "Fine-Art Poster", image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=500&auto=format&fit=crop&q=80" },
  "acrylglas": { name: "Acrylglas Fine-Art", image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=500&auto=format&fit=crop&q=80" },
  "alu-dibond": { name: "Alu-Dibond Butler Finish", image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=500&auto=format&fit=crop&q=80" },
  "werbeplane": { name: "Werbeplane PVC", image: "https://images.unsplash.com/photo-1561070791-26c113006238?w=500&auto=format&fit=crop&q=80" },
  "hartschaumplatte": { name: "Hartschaumplatte PVC", image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500&auto=format&fit=crop&q=80" },
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  // Seed mock historical orders on mount
  useEffect(() => {
    const historicalOrders: Order[] = [
      {
        id: "DE-2026-9812",
        date: "24.06.2026",
        status: "Versandt",
        paymentMethod: "PayPal B2B",
        totalGross: 249.9,
        items: [
          {
            id: "hist-1",
            productSlug: "acrylglas",
            productName: "Acrylglas Fine-Art",
            productImage: PRESET_PRODUCTS["acrylglas"].image,
            config: {
              width: 80,
              height: 60,
              quantity: 2,
              material: "Acrylglas Hochglanz 4mm",
              qualityCheck: true,
              postInvoice: false,
              delivery: "priority",
              fileName: "Ausstellung_München_01.pdf",
              fileSize: "42.8 MB",
              fileUrl: "https://shop.headless-commerce.de/uploads/secure/Ausstellung_M%C3%BCnchen_01.pdf",
            },
            pricing: {
              net: 210.0,
              vat: 39.9,
              gross: 249.9,
            },
          },
        ],
      },
      {
        id: "DE-2026-9534",
        date: "12.05.2026",
        status: "Fertiggestellt",
        paymentMethod: "Rechnung (Klarna)",
        totalGross: 89.25,
        items: [
          {
            id: "hist-2",
            productSlug: "fine-art-poster",
            productName: "Fine-Art Poster",
            productImage: PRESET_PRODUCTS["fine-art-poster"].image,
            config: {
              width: 100,
              height: 70,
              quantity: 1,
              material: "Premium Posterpapier 250g Matt",
              qualityCheck: false,
              postInvoice: true,
              delivery: "standard",
              fileName: "Wohnzimmer_Deko_Final.jpg",
              fileSize: "18.4 MB",
              fileUrl: "https://shop.headless-commerce.de/uploads/secure/Wohnzimmer_Deko_Final.jpg",
            },
            pricing: {
              net: 75.0,
              vat: 14.25,
              gross: 89.25,
            },
          },
        ],
      },
    ];
    setOrders(historicalOrders);
  }, []);

  const addToCart = (item: Omit<CartItem, "id">) => {
    const newItem: CartItem = {
      ...item,
      id: `cart-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    };
    setCart((prevCart) => [...prevCart, newItem]);
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const checkoutCart = (paymentMethod: string, companyDetails?: any) => {
    const totalGross = cart.reduce((sum, item) => sum + item.pricing.gross, 0);
    const newOrder: Order = {
      id: `DE-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toLocaleDateString("de-DE"),
      status: "In Bearbeitung",
      items: [...cart],
      totalGross,
      paymentMethod,
    };
    setOrders((prevOrders) => [newOrder, ...prevOrders]);
    clearCart();
    return newOrder;
  };

  return (
    <CartContext.Provider value={{ cart, orders, addToCart, removeFromCart, clearCart, checkoutCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
