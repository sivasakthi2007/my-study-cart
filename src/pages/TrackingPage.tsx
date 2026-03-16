import { useAppContext } from "@/context/AppContext";
import { Package, Clock, CheckCircle, Truck } from "lucide-react";

const statusConfig = {
  pending: { icon: Clock, label: "Pending", color: "text-yellow-600 bg-yellow-100" },
  confirmed: { icon: Package, label: "Confirmed", color: "text-secondary bg-secondary/10" },
  ready: { icon: Truck, label: "Ready", color: "text-primary bg-primary/10" },
  delivered: { icon: CheckCircle, label: "Delivered", color: "text-accent bg-accent/10" },
};

const TrackingPage = () => {
  const { orders } = useAppContext();
  const activeOrders = orders.filter((o) => o.status !== "delivered");

  return (
    <div className="min-h-screen pb-20">
      <header className="bg-accent px-4 pb-6 pt-8">
        <div className="mx-auto max-w-lg">
          <h1 className="font-['Space_Grotesk'] text-2xl font-bold text-accent-foreground">📍 Track Orders</h1>
          <p className="mt-1 text-sm text-accent-foreground/80">Live order status updates</p>
        </div>
      </header>

      <div className="mx-auto max-w-lg px-4 py-6">
        {activeOrders.length === 0 ? (
          <div className="flex flex-col items-center py-16 text-center">
            <Package className="mb-4 h-16 w-16 text-muted-foreground/30" />
            <p className="text-lg font-semibold text-muted-foreground">No active orders</p>
            <p className="text-sm text-muted-foreground/70">Place an order to see tracking here!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {activeOrders.map((order, i) => {
              const config = statusConfig[order.status];
              const Icon = config.icon;
              return (
                <div key={order.id} className="animate-fade-in rounded-xl border border-border bg-card p-4" style={{ animationDelay: `${i * 80}ms` }}>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-['Space_Grotesk'] text-sm font-bold">{order.id}</p>
                      <p className="text-xs text-muted-foreground">{new Date(order.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}</p>
                    </div>
                    <span className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${config.color}`}>
                      <Icon className="h-3 w-3" /> {config.label}
                    </span>
                  </div>
                  <div className="mt-3 space-y-1">
                    {order.items.map((item, j) => (
                      <p key={j} className="text-sm text-muted-foreground">{item.name} x{item.qty}</p>
                    ))}
                  </div>
                  <div className="mt-3 flex items-center justify-between border-t border-border pt-2">
                    <span className="text-xs text-muted-foreground">{order.paymentMethod === "cod" ? "Cash on Delivery" : "UPI"}</span>
                    <span className="font-['Space_Grotesk'] font-bold text-primary">₹{order.total}</span>
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
