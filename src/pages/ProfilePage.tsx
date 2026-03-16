import { useAppContext } from "@/context/AppContext";
import { User, ShoppingBag, MessageCircle, TrendingUp, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WHATSAPP_NUMBER } from "@/lib/data";

const ProfilePage = () => {
  const { orders } = useAppContext();
  const totalSpent = orders.reduce((s, o) => s + o.total, 0);
  const productOrders = orders.filter((o) => o.type === "product").length;
  const xeroxOrders = orders.filter((o) => o.type === "xerox").length;

  return (
    <div className="min-h-screen pb-20">
      <header className="gradient-hero relative overflow-hidden px-4 pb-10 pt-10">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute right-[-10%] top-[-20%] h-52 w-52 rounded-full bg-primary-foreground/30 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-lg flex items-center gap-4">
          <div className="flex h-18 w-18 items-center justify-center rounded-2xl bg-primary-foreground/20 backdrop-blur-sm border border-primary-foreground/10">
            <User className="h-9 w-9 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-['Space_Grotesk'] text-2xl font-bold text-primary-foreground">Student</h1>
            <p className="text-sm text-primary-foreground/80 mt-0.5">Campus Stationery User</p>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-lg px-4 -mt-5">
        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-2.5 mb-5 animate-fade-in-scale" style={{ opacity: 0, animationDelay: "100ms" }}>
          <div className="rounded-2xl bg-card border border-border p-3.5 text-center shadow-product">
            <p className="font-['Space_Grotesk'] text-2xl font-extrabold text-primary">{orders.length}</p>
            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mt-0.5">Orders</p>
          </div>
          <div className="rounded-2xl bg-card border border-border p-3.5 text-center shadow-product">
            <p className="font-['Space_Grotesk'] text-2xl font-extrabold text-secondary">{productOrders}</p>
            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mt-0.5">Products</p>
          </div>
          <div className="rounded-2xl bg-card border border-border p-3.5 text-center shadow-product">
            <p className="font-['Space_Grotesk'] text-2xl font-extrabold text-accent">₹{totalSpent}</p>
            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mt-0.5">Spent</p>
          </div>
        </div>

        <Button
          variant="whatsapp"
          className="mb-6 w-full gap-2 h-12 rounded-xl text-sm font-semibold animate-fade-in"
          style={{ animationDelay: "200ms", opacity: 0 }}
          onClick={() => window.open(`https://wa.me/91${WHATSAPP_NUMBER}`, "_blank")}
        >
          <MessageCircle className="h-4 w-4" /> Contact on WhatsApp
        </Button>

        <h2 className="mb-3 font-['Space_Grotesk'] text-lg font-bold flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-primary" /> Order History
        </h2>
        
        {orders.length === 0 ? (
          <div className="flex flex-col items-center py-16 text-center animate-fade-in">
            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-muted">
              <ShoppingBag className="h-10 w-10 text-muted-foreground/40" />
            </div>
            <p className="text-base font-bold text-foreground">No orders yet</p>
            <p className="text-sm text-muted-foreground mt-1">Start shopping to see your history!</p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {orders.map((order, i) => (
              <div
                key={order.id}
                className="animate-fade-in-scale overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all hover:shadow-product"
                style={{ animationDelay: `${i * 80}ms`, opacity: 0 }}
              >
                <div className="p-3.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${order.type === "xerox" ? "bg-secondary/10" : "bg-primary/10"}`}>
                        <span className="text-sm">{order.type === "xerox" ? "📄" : "📚"}</span>
                      </div>
                      <div>
                        <span className="text-sm font-bold">{order.id}</span>
                        <p className="text-[11px] text-muted-foreground">
                          {new Date(order.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                        </p>
                      </div>
                    </div>
                    <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${
                      order.status === "delivered" ? "bg-accent/10 text-accent" : "bg-primary/10 text-primary"
                    }`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground line-clamp-1">
                    {order.items.map((item) => item.name).join(" · ")}
                  </div>
                </div>
                <div className="flex items-center justify-between border-t border-border bg-muted/30 px-3.5 py-2">
                  <span className="text-[11px] text-muted-foreground font-medium">
                    {order.paymentMethod === "cod" ? "💵 COD" : "💳 UPI"}
                  </span>
                  <span className="font-['Space_Grotesk'] font-bold text-primary">₹{order.total}</span>
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
