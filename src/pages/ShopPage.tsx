import { useState } from "react";
import { stationeryProducts, categories } from "@/lib/data";
import { useAppContext } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Plus, Minus, MessageCircle, Sparkles, X, Zap } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/lib/data";
import { toast } from "sonner";

const categoryEmojis: Record<string, string> = {
  All: "✨", Pens: "🖊️", Notebooks: "📓", Markers: "🖍️", Tools: "📐", Paper: "📄",
};

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
    <div className="min-h-screen pb-24">
      {/* Hero */}
      <header className="relative overflow-hidden px-4 pb-10 pt-12 gradient-hero">
        <div className="absolute inset-0">
          <div className="absolute left-[-30%] top-[-40%] h-80 w-80 rounded-full bg-primary-foreground/10 blur-[80px]" />
          <div className="absolute right-[-20%] bottom-[-30%] h-60 w-60 rounded-full bg-primary-foreground/10 blur-[60px]" />
        </div>
        <div className="relative mx-auto max-w-lg">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-primary-foreground/15 backdrop-blur-sm px-3 py-1 text-primary-foreground/90 text-xs font-semibold mb-3">
            <Zap className="h-3 w-3" /> Free Campus Delivery
          </div>
          <h1 className="font-['Outfit'] text-4xl font-black text-primary-foreground tracking-tight leading-none">
            Stationery<br />Store 🎒
          </h1>
          <p className="mt-2 text-sm text-primary-foreground/75 font-medium">
            Everything you need, delivered fast ⚡
          </p>
        </div>
      </header>

      {/* Categories */}
      <div className="sticky top-0 z-40 glass border-b border-border/50 px-4 py-3">
        <div className="mx-auto flex max-w-lg gap-2 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`shrink-0 flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-bold transition-all duration-300 ${
                activeCategory === cat
                  ? "gradient-hero text-primary-foreground shadow-glow-primary scale-105"
                  : "bg-muted text-muted-foreground hover:bg-muted/70 active:scale-95"
              }`}
            >
              <span>{categoryEmojis[cat]}</span> {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Products */}
      <div className="mx-auto max-w-lg px-4 py-5">
        <div className="grid grid-cols-2 gap-3">
          {filtered.map((product, i) => {
            const inCart = cart.find((c) => c.id === product.id);
            return (
              <div
                key={product.id}
                className="group relative animate-fade-in-scale overflow-hidden rounded-3xl border border-border/60 bg-card p-4 shadow-product transition-all duration-300 hover:shadow-float hover:-translate-y-1"
                style={{ animationDelay: `${i * 50}ms`, opacity: 0 }}
              >
                {/* Emoji icon */}
                <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-muted to-muted/50 text-4xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                  {product.image}
                </div>
                <h3 className="font-['Outfit'] text-sm font-bold leading-tight text-foreground">{product.name}</h3>
                <p className="mt-0.5 text-[11px] text-muted-foreground line-clamp-1">{product.description}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="font-['Outfit'] text-xl font-black text-gradient">₹{product.price}</span>
                  {inCart ? (
                    <div className="flex items-center gap-1 animate-fade-in-scale">
                      <button
                        onClick={() => updateQty(product.id, inCart.qty - 1)}
                        className="flex h-8 w-8 items-center justify-center rounded-xl bg-muted text-foreground transition-all active:scale-90 hover:bg-muted/70"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-7 text-center text-sm font-black">{inCart.qty}</span>
                      <button
                        onClick={() => updateQty(product.id, inCart.qty + 1)}
                        className="flex h-8 w-8 items-center justify-center rounded-xl gradient-hero text-primary-foreground transition-all active:scale-90"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ) : (
                    <Button
                      size="sm"
                      className="h-9 rounded-xl px-4 text-xs font-bold gradient-hero border-0 text-primary-foreground shadow-glow-primary transition-all active:scale-90 hover:shadow-float"
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

      {/* Floating Cart */}
      {cart.length > 0 && !showCart && (
        <div className="fixed bottom-20 left-0 right-0 z-40 px-4 animate-slide-up">
          <button
            onClick={() => setShowCart(true)}
            className="mx-auto flex w-full max-w-lg items-center justify-between rounded-2xl gradient-hero px-5 py-4 text-primary-foreground shadow-float transition-all active:scale-[0.98] animate-pulse-glow"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-foreground/20 backdrop-blur-sm">
                <ShoppingCart className="h-5 w-5" />
              </div>
              <div className="text-left">
                <p className="text-sm font-bold">{cart.length} item{cart.length > 1 ? "s" : ""}</p>
                <p className="text-[11px] text-primary-foreground/70">Tap to checkout</p>
              </div>
            </div>
            <span className="font-['Outfit'] text-2xl font-black">₹{cartTotal}</span>
          </button>
        </div>
      )}

      {/* Cart Sheet */}
      {showCart && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/40 backdrop-blur-sm" onClick={() => setShowCart(false)}>
          <div className="w-full max-w-lg rounded-t-[2rem] bg-card p-6 animate-slide-up shadow-float" onClick={(e) => e.stopPropagation()}>
            <div className="mx-auto mb-5 h-1.5 w-12 rounded-full bg-border" />
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-['Outfit'] text-2xl font-black">Your Cart 🛒</h2>
              <button onClick={() => setShowCart(false)} className="flex h-9 w-9 items-center justify-center rounded-xl bg-muted text-muted-foreground transition-all hover:bg-destructive/10 hover:text-destructive">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="max-h-60 space-y-2 overflow-y-auto pr-1 no-scrollbar">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between rounded-2xl bg-muted/50 p-3.5 transition-all hover:bg-muted/70">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl animate-float" style={{ animationDelay: `${Math.random() * 2}s` }}>{item.image}</span>
                    <div>
                      <span className="text-sm font-bold">{item.name}</span>
                      <p className="text-xs text-muted-foreground">x{item.qty} · ₹{item.price} each</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-['Outfit'] font-black text-gradient">₹{item.price * item.qty}</span>
                    <button onClick={() => removeFromCart(item.id)} className="flex h-7 w-7 items-center justify-center rounded-full bg-destructive/10 text-destructive text-xs transition-all hover:bg-destructive hover:text-destructive-foreground">
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-2xl bg-gradient-to-br from-muted/50 to-muted/30 p-4">
              <div className="flex justify-between items-baseline">
                <span className="text-muted-foreground font-semibold">Total</span>
                <span className="font-['Outfit'] text-3xl font-black text-gradient">₹{cartTotal}</span>
              </div>
            </div>
            <div className="mt-4 flex gap-3">
              <Button variant="whatsapp" className="flex-1 gap-2 h-13 rounded-2xl text-sm font-bold" onClick={() => handleOrder("cod")}>
                <MessageCircle className="h-4 w-4" /> Cash on Delivery
              </Button>
              <Button variant="upi" className="flex-1 gap-2 h-13 rounded-2xl text-sm font-bold" onClick={() => handleOrder("upi")}>
                💳 UPI Pay
              </Button>
            </div>
            <p className="mt-3 text-center text-[11px] text-muted-foreground">
              Order via WhatsApp · UPI to {WHATSAPP_NUMBER}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopPage;
