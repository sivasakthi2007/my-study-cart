import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { stationeryProducts, categories, WHATSAPP_NUMBER, UPI_ID } from "@/lib/data";
import { useAppContext } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { MessageCircle, Sparkles, Zap, ShoppingBag } from "lucide-react";
import { toast } from "sonner";

const categoryEmojis: Record<string, string> = {
  All: "✨", Pens: "🖊️", Notebooks: "📓", Markers: "🖍️", Tools: "📐", Paper: "📄",
};

const ShopPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const { addOrder } = useAppContext();
  const navigate = useNavigate();

  const filtered = activeCategory === "All" ? stationeryProducts : stationeryProducts.filter((p) => p.category === activeCategory);

  const handleBuy = (product: typeof stationeryProducts[0]) => {
    const order = {
      id: `ORD-${Date.now()}`,
      items: [{ name: product.name, qty: 1, price: product.price }],
      total: product.price,
      status: "pending" as const,
      date: new Date().toISOString(),
      paymentMethod: "upi" as const,
      type: "product" as const,
    };
    addOrder(order);
    toast.success(`Order placed for ${product.name}! Complete payment on Tracking page.`);
    navigate("/tracking");
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
        <div className="flex flex-col gap-4">
          {filtered.map((product, i) => (
            <div
              key={product.id}
              className="group animate-fade-in-scale overflow-hidden rounded-3xl border border-border/60 bg-card shadow-product transition-all duration-300 hover:shadow-float hover:-translate-y-1"
              style={{ animationDelay: `${i * 50}ms`, opacity: 0 }}
            >
              <div className="flex items-center gap-4 p-5">
                {/* Emoji icon */}
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-muted to-muted/50 text-5xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                  {product.image}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-['Outfit'] text-base font-bold leading-tight text-foreground">{product.name}</h3>
                  <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{product.description}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="font-['Outfit'] text-2xl font-black text-gradient">₹{product.price}</span>
                    <Button
                      size="sm"
                      className="h-10 rounded-xl px-5 text-sm font-bold gradient-hero border-0 text-primary-foreground shadow-glow-primary transition-all active:scale-90 hover:shadow-float"
                      onClick={() => handleBuy(product)}
                    >
                      <ShoppingBag className="h-4 w-4 mr-1" /> Buy Now
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
