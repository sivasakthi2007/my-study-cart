import React, { createContext, useContext, useState, ReactNode } from "react";
import { Order } from "@/lib/data";

interface CartItem {
  id: string;
  name: string;
  price: number;
  qty: number;
  image: string;
}

interface AppContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "qty">) => void;
  removeFromCart: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
  cartTotal: number;
  orders: Order[];
  addOrder: (order: Order) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem("stationery_orders");
    return saved ? JSON.parse(saved) : [];
  });

  const addToCart = (item: Omit<CartItem, "qty">) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) return prev.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i));
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const removeFromCart = (id: string) => setCart((prev) => prev.filter((i) => i.id !== id));
  const updateQty = (id: string, qty: number) => {
    if (qty < 1) return removeFromCart(id);
    setCart((prev) => prev.map((i) => (i.id === id ? { ...i, qty } : i)));
  };
  const clearCart = () => setCart([]);
  const cartTotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  const addOrder = (order: Order) => {
    const updated = [order, ...orders];
    setOrders(updated);
    localStorage.setItem("stationery_orders", JSON.stringify(updated));
  };

  return (
    <AppContext.Provider value={{ cart, addToCart, removeFromCart, updateQty, clearCart, cartTotal, orders, addOrder }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be used within AppProvider");
  return ctx;
};
