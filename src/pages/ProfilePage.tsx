import { useAppContext } from "@/context/AppContext";
import { User, ShoppingBag, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WHATSAPP_NUMBER } from "@/lib/data";

const ProfilePage = () => {
  const { orders } = useAppContext();
  const totalSpent = orders.reduce((s, o) => s + o.total, 0);

  return (
    <div className="min-h-screen pb-20">
      <header className="gradient-hero px-4 pb-6 pt-8">
        <div className="mx-auto max-w-lg flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-foreground/20">
            <User className="h-8 w-8 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-['Space_Grotesk'] text-xl font-bold text-primary-foreground">Student</h1>
            <p className="text-sm text-primary-foreground/80">{orders.length} orders • ₹{totalSpent} spent</p>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-lg px-4 py-6">
        <Button variant="whatsapp" className="mb-6 w-full gap-2" onClick={() => window.open(`https://wa.me/91${WHATSAPP_NUMBER}`, "_blank")}>
          <MessageCircle className="h-4 w-4" /> Contact on WhatsApp
        </Button>

        <h2 className="mb-3 font-['Space_Grotesk'] text-lg font-bold">Order History</h2>
        {orders.length === 0 ? (
          <div className="flex flex-col items-center py-12 text-center">
            <ShoppingBag className="mb-3 h-12 w-12 text-muted-foreground/30" />
            <p className="text-muted-foreground">No orders yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {orders.map((order, i) => (
              <div key={order.id} className="animate-fade-in rounded-lg border border-border bg-card p-3" style={{ animationDelay: `${i * 60}ms` }}>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold">{order.id}</span>
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                    order.status === "delivered" ? "bg-accent/10 text-accent" : "bg-primary/10 text-primary"
                  }`}>
                    {order.status}
                  </span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {new Date(order.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })} • {order.type === "xerox" ? "📄 Xerox" : "📚 Stationery"}
                </p>
                <div className="mt-1 text-xs text-muted-foreground">
                  {order.items.map((item) => item.name).join(", ")}
                </div>
                <div className="mt-2 flex justify-between text-sm">
                  <span className="text-muted-foreground">{order.paymentMethod === "cod" ? "COD" : "UPI"}</span>
                  <span className="font-bold text-primary">₹{order.total}</span>
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
