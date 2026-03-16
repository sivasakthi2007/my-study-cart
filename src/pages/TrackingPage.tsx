import { useAppContext } from "@/context/AppContext";
import { Package, Clock, CheckCircle, Truck, MapPin, Radar } from "lucide-react";

const statusConfig = {
  pending: { icon: Clock, label: "Pending", color: "text-sunshine", bg: "bg-sunshine/10 border-sunshine/30" },
  confirmed: { icon: Package, label: "Confirmed", color: "text-primary", bg: "bg-primary/10 border-primary/30" },
  ready: { icon: Truck, label: "Out for delivery", color: "text-secondary", bg: "bg-secondary/10 border-secondary/30" },
  delivered: { icon: CheckCircle, label: "Delivered", color: "text-accent", bg: "bg-accent/10 border-accent/30" },
};

const statusSteps = ["pending", "confirmed", "ready", "delivered"] as const;

const TrackingPage = () => {
  const { orders } = useAppContext();
  const activeOrders = orders.filter((o) => o.status !== "delivered");

  return (
    <div className="min-h-screen pb-24">
      <header className="gradient-accent relative overflow-hidden px-4 pb-10 pt-12">
        <div className="absolute inset-0">
          <div className="absolute left-[-20%] bottom-[-30%] h-60 w-60 rounded-full bg-accent-foreground/10 blur-[60px]" />
        </div>
        <div className="relative mx-auto max-w-lg">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-accent-foreground/15 backdrop-blur-sm px-3 py-1 text-accent-foreground/90 text-xs font-semibold mb-3">
            <Radar className="h-3 w-3" /> Live Updates
          </div>
          <h1 className="font-['Outfit'] text-4xl font-black text-accent-foreground tracking-tight leading-none">
            Track<br />Orders 📍
          </h1>
          <p className="mt-2 text-sm text-accent-foreground/75 font-medium">See where your order is right now</p>
        </div>
      </header>

      <div className="mx-auto max-w-lg px-4 py-5">
        {activeOrders.length === 0 ? (
          <div className="flex flex-col items-center py-20 text-center animate-fade-in">
            <div className="mb-5 flex h-24 w-24 items-center justify-center rounded-3xl bg-muted gradient-mesh">
              <Package className="h-12 w-12 text-muted-foreground/40" />
            </div>
            <p className="text-xl font-black text-foreground font-['Outfit']">No active orders</p>
            <p className="text-sm text-muted-foreground mt-1.5">Place an order to track it here! 🛒</p>
          </div>
        ) : (
          <div className="space-y-4">
            {activeOrders.map((order, i) => {
              const config = statusConfig[order.status];
              const Icon = config.icon;
              const stepIndex = statusSteps.indexOf(order.status);
              return (
                <div
                  key={order.id}
                  className="animate-fade-in-scale overflow-hidden rounded-3xl border border-border/60 bg-card shadow-product transition-all hover:shadow-float"
                  style={{ animationDelay: `${i * 100}ms`, opacity: 0 }}
                >
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="font-['Outfit'] text-base font-black">{order.id}</p>
                        <p className="text-[11px] text-muted-foreground mt-0.5">
                          {new Date(order.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                        </p>
                      </div>
                      <span className={`flex items-center gap-1.5 rounded-full border-2 px-3 py-1.5 text-xs font-bold ${config.bg} ${config.color}`}>
                        <Icon className="h-3.5 w-3.5" /> {config.label}
                      </span>
                    </div>

                    {/* Progress Steps */}
                    <div className="mb-4 flex items-center gap-1">
                      {statusSteps.map((step, idx) => (
                        <div key={idx} className="flex-1 flex items-center gap-1">
                          <div className={`h-2 flex-1 rounded-full transition-all duration-700 ${
                            idx <= stepIndex ? "gradient-hero" : "bg-muted"
                          }`} />
                        </div>
                      ))}
                    </div>

                    <div className="space-y-1">
                      {order.items.map((item, j) => (
                        <p key={j} className="text-sm text-muted-foreground">{item.name} <span className="text-foreground font-bold">×{item.qty}</span></p>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between border-t border-border/50 bg-muted/30 px-5 py-3">
                    <span className="text-xs text-muted-foreground font-semibold">{order.paymentMethod === "cod" ? "💵 Cash on Delivery" : "💳 UPI"}</span>
                    <span className="font-['Outfit'] text-lg font-black text-gradient">₹{order.total}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackingPage;
