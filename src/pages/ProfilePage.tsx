import { useAppContext } from "@/context/AppContext";
import { User, ShoppingBag, MessageCircle, TrendingUp, Package, Star, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WHATSAPP_NUMBER } from "@/lib/data";

const ProfilePage = () => {
  const { orders } = useAppContext();
  const totalSpent = orders.reduce((s, o) => s + o.total, 0);
  const productOrders = orders.filter((o) => o.type === "product").length;
  const xeroxOrders = orders.filter((o) => o.type === "xerox").length;

  const stats = [
    { label: "Orders", value: orders.length, emoji: "📦", gradient: "gradient-hero" },
    { label: "Products", value: productOrders, emoji: "🛍️", gradient: "gradient-secondary" },
    { label: "Spent", value: `₹${totalSpent}`, emoji: "💰", gradient: "gradient-accent" },
  ];

  return (
    <div className="min-h-screen pb-24">
      <header className="gradient-sunshine relative overflow-hidden px-4 pb-12 pt-12">
        <div className="absolute inset-0">
          <div className="absolute right-[-15%] top-[-25%] h-56 w-56 rounded-full bg-sunshine-foreground/5 blur-[60px]" />
        </div>
        <div className="relative mx-auto max-w-lg flex items-center gap-4">
          <div className="flex h-20 w-20 items-center justify-center rounded-3xl gradient-hero shadow-glow-primary">
            <User className="h-10 w-10 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-['Outfit'] text-3xl font-black text-sunshine-foreground">Student</h1>
            <p className="text-sm text-sunshine-foreground/70 font-semibold mt-0.5 flex items-center gap-1">
              <Star className="h-3.5 w-3.5" /> Campus Stationery User
            </p>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-lg px-4 -mt-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-2.5 mb-5">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="animate-fade-in-scale rounded-3xl bg-card border border-border/60 p-4 text-center shadow-product transition-all hover:shadow-float hover:-translate-y-0.5"
              style={{ animationDelay: `${i * 80}ms`, opacity: 0 }}
            >
              <span className="text-2xl block mb-1.5">{stat.emoji}</span>
              <p className="font-['Outfit'] text-xl font-black text-gradient">{stat.value}</p>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        <Button
          variant="whatsapp"
          className="mb-6 w-full gap-2 h-13 rounded-2xl text-sm font-bold animate-fade-in shadow-product"
          style={{ animationDelay: "250ms", opacity: 0 }}
          onClick={() => window.open(`https://wa.me/91${WHATSAPP_NUMBER}`, "_blank")}
        >
          <MessageCircle className="h-4 w-4" /> Contact on WhatsApp
        </Button>

        <h2 className="mb-3.5 font-['Outfit'] text-xl font-black flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" /> Order History
        </h2>

        {orders.length === 0 ? (
          <div className="flex flex-col items-center py-16 text-center animate-fade-in">
            <div className="mb-5 flex h-24 w-24 items-center justify-center rounded-3xl bg-muted gradient-mesh">
              <ShoppingBag className="h-12 w-12 text-muted-foreground/40" />
            </div>
            <p className="text-xl font-black text-foreground font-['Outfit']">No orders yet</p>
            <p className="text-sm text-muted-foreground mt-1.5">Start shopping to see your history! 🛍️</p>
          </div>
        ) : (
          <div className="space-y-3">
            {orders.map((order, i) => (
              <div
                key={order.id}
                className="animate-fade-in-scale overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm transition-all hover:shadow-product hover:-translate-y-0.5"
                style={{ animationDelay: `${i * 60}ms`, opacity: 0 }}
              >
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-2xl ${order.type === "xerox" ? "gradient-secondary" : "gradient-hero"}`}>
                        <span className="text-lg">{order.type === "xerox" ? "📄" : "📚"}</span>
                      </div>
                      <div>
                        <span className="text-sm font-bold">{order.id}</span>
                        <p className="text-[11px] text-muted-foreground">
                          {new Date(order.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                        </p>
                      </div>
                    </div>
                    <span className={`rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider ${
                      order.status === "delivered" ? "bg-accent/10 text-accent border border-accent/30" : "bg-primary/10 text-primary border border-primary/30"
                    }`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="mt-2.5 text-xs text-muted-foreground line-clamp-1">
                    {order.items.map((item) => item.name).join(" · ")}
                  </div>
                </div>
                <div className="flex items-center justify-between border-t border-border/50 bg-muted/30 px-4 py-2.5">
                  <span className="text-[11px] text-muted-foreground font-semibold">
                    {order.paymentMethod === "cod" ? "💵 COD" : "💳 UPI"}
                  </span>
                  <span className="font-['Outfit'] font-black text-gradient">₹{order.total}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
