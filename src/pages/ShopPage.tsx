import { useState } from "react";
import { stationeryProducts, categories } from "@/lib/data";
import { useAppContext } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Plus, Minus, MessageCircle } from "lucide-react";
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
      {/* Header */}
      <header className="gradient-hero px-4 pb-6 pt-8">
        <div className="mx-auto max-w-lg">
          <h1 className="font-['Space_Grotesk'] text-2xl font-bold text-primary-foreground">📚 Campus Stationery</h1>
          <p className="mt-1 text-sm text-primary-foreground/80">Order anytime, delivered to your hostel!</p>
        </div>
      </header>

      {/* Categories */}
      <div className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-md px-4 py-3">
        <div className="mx-auto flex max-w-lg gap-2 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="mx-auto max-w-lg px-4 py-4">
        <div className="grid grid-cols-2 gap-3">
          {filtered.map((product, i) => {
            const inCart = cart.find((c) => c.id === product.id);
            return (
              <div
                key={product.id}
                className="gradient-card animate-fade-in rounded-xl border border-border p-3 shadow-product"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className="mb-2 text-4xl">{product.image}</div>
                <h3 className="font-['Space_Grotesk'] text-sm font-semibold leading-tight">{product.name}</h3>
                <p className="mt-0.5 text-xs text-muted-foreground">{product.description}</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="font-['Space_Grotesk'] text-lg font-bold text-primary">₹{product.price}</span>
                  {inCart ? (
                    <div className="flex items-center gap-1">
                      <Button size="icon" variant="outline" className="h-7 w-7" onClick={() => updateQty(product.id, inCart.qty - 1)}>
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-6 text-center text-sm font-semibold">{inCart.qty}</span>
                      <Button size="icon" variant="outline" className="h-7 w-7" onClick={() => updateQty(product.id, inCart.qty + 1)}>
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  ) : (
                    <Button
                      size="sm"
                      className="h-8 text-xs"
                      onClick={() => {
                        addToCart({ id: product.id, name: product.name, price: product.price, image: product.image });
                        toast.success(`${product.name} added!`);
                      }}
                    >
                      Add
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Cart Floating Button */}
      {cart.length > 0 && !showCart && (
        <div className="fixed bottom-16 left-0 right-0 z-40 px-4">
          <button
            onClick={() => setShowCart(true)}
            className="mx-auto flex w-full max-w-lg items-center justify-between rounded-xl bg-primary px-5 py-3 text-primary-foreground shadow-lg"
          >
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              <span className="font-semibold">{cart.length} item(s)</span>
            </div>
            <span className="font-['Space_Grotesk'] text-lg font-bold">₹{cartTotal}</span>
          </button>
        </div>
      )}

      {/* Cart Sheet */}
      {showCart && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/40" onClick={() => setShowCart(false)}>
          <div className="w-full max-w-lg rounded-t-2xl bg-card p-5" onClick={(e) => e.stopPropagation()}>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-['Space_Grotesk'] text-xl font-bold">Your Cart</h2>
              <button onClick={() => setShowCart(false)} className="text-muted-foreground">✕</button>
            </div>
            <div className="max-h-60 space-y-3 overflow-y-auto">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between rounded-lg bg-muted p-3">
                  <div>
                    <span className="mr-2">{item.image}</span>
                    <span className="text-sm font-medium">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">x{item.qty}</span>
                    <span className="font-semibold">₹{item.price * item.qty}</span>
                    <button onClick={() => removeFromCart(item.id)} className="text-destructive text-xs">✕</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 border-t border-border pt-4">
              <div className="mb-4 flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-primary">₹{cartTotal}</span>
              </div>
              <div className="flex gap-3">
                <Button variant="whatsapp" className="flex-1 gap-2" onClick={() => handleOrder("cod")}>
                  <MessageCircle className="h-4 w-4" /> COD
                </Button>
                <Button variant="upi" className="flex-1 gap-2" onClick={() => handleOrder("upi")}>
                  💳 UPI Pay
                </Button>
              </div>
              <p className="mt-2 text-center text-xs text-muted-foreground">
                Order via WhatsApp • UPI to {WHATSAPP_NUMBER}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopPage;
