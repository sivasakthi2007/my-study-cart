import { useAppContext } from "@/context/AppContext";
import { Package, Clock, CheckCircle, Truck, MapPin } from "lucide-react";

const statusConfig = {
  pending: { icon: Clock, label: "Pending", color: "text-yellow-600", bg: "bg-yellow-50 border-yellow-200" },
  confirmed: { icon: Package, label: "Confirmed", color: "text-secondary", bg: "bg-secondary/5 border-secondary/20" },
  ready: { icon: Truck, label: "Out for delivery", color: "text-primary", bg: "bg-primary/5 border-primary/20" },
  delivered: { icon: CheckCircle, label: "Delivered", color: "text-accent", bg: "bg-accent/5 border-accent/20" },
};

const statusSteps = ["pending", "confirmed", "ready", "delivered"] as const;

const TrackingPage = () => {
  const { orders } = useAppContext();
  const activeOrders = orders.filter((o) => o.status !== "delivered");

  return (
    <div className="min-h-screen pb-20">
      <header className="gradient-accent relative overflow-hidden px-4 pb-8 pt-10">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute left-[-20%] bottom-[-30%] h-56 w-56 rounded-full bg-accent-foreground/30 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-lg">
          <div className="flex items-center gap-2 text-accent-foreground/70 text-xs font-medium mb-1">
            <MapPin className="h-3.5 w-3.5" />
            Live Updates
          </div>
          <h1 className="font-['Space_Grotesk'] text-3xl font-bold text-accent-foreground tracking-tight">Track Orders</h1>
          <p className="mt-1.5 text-sm text-accent-foreground/80">See where your order is right now 📍</p>
        </div>
      </header>

      <div className="mx-auto max-w-lg px-4 py-5">
        {activeOrders.length === 0 ? (
          <div className="flex flex-col items-center py-20 text-center animate-fade-in">
            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-muted">
              <Package className="h-10 w-10 text-muted-foreground/40" />
            </div>
            <p className="text-lg font-bold text-foreground">No active orders</p>
            <p className="text-sm text-muted-foreground mt-1">Place an order to track it here!</p>
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
                  className="animate-fade-in-scale overflow-hidden rounded-2xl border border-border bg-card shadow-product"
                  style={{ animationDelay: `${i * 100}ms`, opacity: 0 }}
                >
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-['Space_Grotesk'] text-sm font-bold">{order.id}</p>
                        <p className="text-[11px] text-muted-foreground mt-0.5">
                          {new Date(order.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                        </p>
                      </div>
                      <span className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold ${config.bg} ${config.color}`}>
                        <Icon className="h-3.5 w-3.5" /> {config.label}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-3 flex gap-1.5">
                      {statusSteps.map((_, idx) => (
                        <div
                          key={idx}
                          className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                            idx <= stepIndex ? "bg-primary" : "bg-muted"
                          }`}
                        />
                      ))}
                    </div>

                    <div className="space-y-1">
                      {order.items.map((item, j) => (
                        <p key={j} className="text-sm text-muted-foreground">{item.name} <span className="text-foreground font-medium">×{item.qty}</span></p>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between border-t border-border bg-muted/30 px-4 py-2.5">
                    <span className="text-xs text-muted-foreground font-medium">{order.paymentMethod === "cod" ? "💵 Cash on Delivery" : "💳 UPI"}</span>
                    <span className="font-['Space_Grotesk'] text-base font-bold text-primary">₹{order.total}</span>
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
