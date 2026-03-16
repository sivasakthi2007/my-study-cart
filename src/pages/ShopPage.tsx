import { useState } from "react";
import { stationeryProducts, categories } from "@/lib/data";
import { useAppContext } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Plus, Minus, MessageCircle, Sparkles } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/lib/data";
import { toast } from "sonner";

const ShopPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [showCart, setShowCart] = useState(false);
  const { cart, addToCart, removeFromCart, updateQty, clearCart, cartTotal, addOrder } = useAppContext();

  const filtered = activeCategory === "All" ? stationeryProducts : stationeryProducts.filter((p) => p.category === activeCategory);

  const handleOrder = (method: "cod" | "upi") => {
    if (cart.length === 0) return;
    const order = {
      id: `ORD-${Date.now()}`,
      items: cart.map((i) => ({ name: i.name, qty: i.qty, price: i.price })),
      total: cartTotal,
      status: "pending" as const,
      date: new Date().toISOString(),
      paymentMethod: method,
      type: "product" as const,
    };
    addOrder(order);

    const itemsList = cart.map((i) => `• ${i.name} x${i.qty} - ₹${i.price * i.qty}`).join("\n");
    const msg = `🛒 *New Stationery Order*\n\n${itemsList}\n\n💰 Total: ₹${cartTotal}\n💳 Payment: ${method === "cod" ? "Cash on Delivery" : "UPI"}\n📦 Order ID: ${order.id}`;
    window.open(`https://wa.me/91${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
    clearCart();
    setShowCart(false);
    toast.success("Order placed! Confirm on WhatsApp.");
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Hero Header */}
      <header className="gradient-hero relative overflow-hidden px-4 pb-8 pt-10">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute left-[-20%] top-[-30%] h-64 w-64 rounded-full bg-primary-foreground/30 blur-3xl" />
          <div className="absolute right-[-10%] bottom-[-20%] h-48 w-48 rounded-full bg-primary-foreground/20 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-lg">
          <div className="flex items-center gap-2 text-primary-foreground/70 text-xs font-medium mb-1">
            <Sparkles className="h-3.5 w-3.5" />
            Campus Delivery
          </div>
          <h1 className="font-['Space_Grotesk'] text-3xl font-bold text-primary-foreground tracking-tight">
            Stationery Store
          </h1>
          <p className="mt-1.5 text-sm text-primary-foreground/80 max-w-[260px]">
            Everything you need, delivered to your hostel 🏠
          </p>
        </div>
      </header>

      {/* Categories */}
      <div className="sticky top-0 z-40 border-b border-border glass px-4 py-3">
        <div className="mx-auto flex max-w-lg gap-2 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-semibold transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground shadow-sm scale-105"
                  : "bg-muted text-muted-foreground hover:bg-muted/70 active:scale-95"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="mx-auto max-w-lg px-4 py-5">
        <div className="grid grid-cols-2 gap-3.5">
          {filtered.map((product, i) => {
            const inCart = cart.find((c) => c.id === product.id);
            return (
              <div
                key={product.id}
                className="group relative animate-fade-in-scale overflow-hidden rounded-2xl border border-border bg-card p-3.5 shadow-product transition-all duration-300 hover:shadow-float hover:-translate-y-0.5"
                style={{ animationDelay: `${i * 60}ms`, opacity: 0 }}
              >
                <div className="mb-2.5 flex h-14 w-14 items-center justify-center rounded-xl bg-muted text-3xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                  {product.image}
                </div>
                <h3 className="font-['Space_Grotesk'] text-[13px] font-bold leading-tight text-foreground">{product.name}</h3>
                <p className="mt-0.5 text-[11px] text-muted-foreground line-clamp-1">{product.description}</p>
                <div className="mt-2.5 flex items-center justify-between">
                  <span className="font-['Space_Grotesk'] text-lg font-extrabold text-primary">₹{product.price}</span>
                  {inCart ? (
                    <div className="flex items-center gap-1 animate-fade-in-scale">
                      <button
                        onClick={() => updateQty(product.id, inCart.qty - 1)}
                        className="flex h-7 w-7 items-center justify-center rounded-lg bg-muted text-foreground transition-all active:scale-90"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-6 text-center text-sm font-bold">{inCart.qty}</span>
                      <button
                        onClick={() => updateQty(product.id, inCart.qty + 1)}
                        className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-all active:scale-90"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ) : (
                    <Button
                      size="sm"
                      className="h-8 rounded-lg px-3.5 text-xs font-semibold transition-all active:scale-90"
                      onClick={() => {
                        addToCart({ id: product.id, name: product.name, price: product.price, image: product.image });
                        toast.success(`${product.name} added!`);
                      }}
                    >
                      <Plus className="h-3.5 w-3.5 mr-0.5" /> Add
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating Cart Button */}
      {cart.length > 0 && !showCart && (
        <div className="fixed bottom-16 left-0 right-0 z-40 px-4 animate-slide-up">
          <button
            onClick={() => setShowCart(true)}
            className="mx-auto flex w-full max-w-lg items-center justify-between rounded-2xl gradient-hero px-5 py-3.5 text-primary-foreground shadow-float transition-all active:scale-[0.98] animate-pulse-glow"
          >
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary-foreground/20">
                <ShoppingCart className="h-4.5 w-4.5" />
              </div>
              <div className="text-left">
                <span className="text-xs text-primary-foreground/70">{cart.length} item(s)</span>
                <p className="text-[11px] text-primary-foreground/60">Tap to view cart</p>
              </div>
            </div>
            <span className="font-['Space_Grotesk'] text-xl font-bold">₹{cartTotal}</span>
          </button>
        </div>
      )}

      {/* Cart Sheet */}
      {showCart && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/50 backdrop-blur-sm animate-fade-in" onClick={() => setShowCart(false)}>
          <div className="w-full max-w-lg rounded-t-3xl bg-card p-6 animate-slide-up" onClick={(e) => e.stopPropagation()}>
            <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-border" />
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-['Space_Grotesk'] text-xl font-bold">Your Cart</h2>
              <button onClick={() => setShowCart(false)} className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground transition-all hover:bg-muted/70">
                ✕
              </button>
            </div>
            <div className="max-h-56 space-y-2.5 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between rounded-xl bg-muted/60 p-3">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">{item.image}</span>
                    <div>
                      <span className="text-sm font-semibold">{item.name}</span>
                      <p className="text-xs text-muted-foreground">x{item.qty} · ₹{item.price} each</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="font-['Space_Grotesk'] font-bold text-primary">₹{item.price * item.qty}</span>
                    <button onClick={() => removeFromCart(item.id)} className="flex h-6 w-6 items-center justify-center rounded-full bg-destructive/10 text-destructive text-xs transition-all hover:bg-destructive/20">
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 border-t border-border pt-4">
              <div className="mb-4 flex justify-between items-baseline">
                <span className="text-muted-foreground font-medium">Total</span>
                <span className="font-['Space_Grotesk'] text-2xl font-extrabold text-primary">₹{cartTotal}</span>
              </div>
              <div className="flex gap-3">
                <Button variant="whatsapp" className="flex-1 gap-2 h-12 rounded-xl text-sm font-semibold" onClick={() => handleOrder("cod")}>
                  <MessageCircle className="h-4 w-4" /> Cash on Delivery
                </Button>
                <Button variant="upi" className="flex-1 gap-2 h-12 rounded-xl text-sm font-semibold" onClick={() => handleOrder("upi")}>
                  💳 UPI Pay
                </Button>
              </div>
              <p className="mt-3 text-center text-[11px] text-muted-foreground">
                Order via WhatsApp · UPI to {WHATSAPP_NUMBER}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopPage;
