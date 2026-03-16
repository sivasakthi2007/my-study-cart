import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, FileText, Layers, Palette } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/lib/data";
import { useAppContext } from "@/context/AppContext";
import { toast } from "sonner";

const XeroxPage = () => {
  const { addOrder } = useAppContext();
  const [pages, setPages] = useState(1);
  const [copies, setCopies] = useState(1);
  const [color, setColor] = useState(false);
  const [doubleSided, setDoubleSided] = useState(false);
  const [notes, setNotes] = useState("");

  const pricePerPage = color ? 5 : 1;
  const sideMultiplier = doubleSided ? 0.8 : 1;
  const total = Math.ceil(pages * copies * pricePerPage * sideMultiplier);

  const handleOrder = (method: "cod" | "upi") => {
    const order = {
      id: `XRX-${Date.now()}`,
      items: [{ name: `Xerox - ${pages}pg x${copies} ${color ? "(Color)" : "(B&W)"}`, qty: 1, price: total }],
      total,
      status: "pending" as const,
      date: new Date().toISOString(),
      paymentMethod: method,
      type: "xerox" as const,
    };
    addOrder(order);

    const msg = `📄 *Xerox Order*\n\n📑 Pages: ${pages}\n📋 Copies: ${copies}\n🎨 Type: ${color ? "Color" : "B&W"}\n📖 Sides: ${doubleSided ? "Double" : "Single"}\n📝 Notes: ${notes || "None"}\n\n💰 Total: ₹${total}\n💳 Payment: ${method === "cod" ? "Cash on Delivery" : "UPI"}\n📦 Order ID: ${order.id}`;
    window.open(`https://wa.me/91${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
    toast.success("Xerox order placed! Confirm on WhatsApp.");
  };

  return (
    <div className="min-h-screen pb-20">
      <header className="gradient-secondary relative overflow-hidden px-4 pb-8 pt-10">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute right-[-15%] top-[-20%] h-48 w-48 rounded-full bg-primary-foreground/30 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-lg">
          <div className="flex items-center gap-2 text-secondary-foreground/70 text-xs font-medium mb-1">
            <FileText className="h-3.5 w-3.5" />
            Quick Print Service
          </div>
          <h1 className="font-['Space_Grotesk'] text-3xl font-bold text-secondary-foreground tracking-tight">Xerox & Print</h1>
          <p className="mt-1.5 text-sm text-secondary-foreground/80">Send your file, we'll print & deliver! ⚡</p>
        </div>
      </header>

      <div className="mx-auto max-w-lg px-4 -mt-3">
        <div className="space-y-4 rounded-2xl border border-border bg-card p-5 shadow-product animate-fade-in-scale" style={{ opacity: 0 }}>
          {/* Pages & Copies */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                <FileText className="h-3 w-3" /> Pages
              </label>
              <Input
                type="number"
                min={1}
                value={pages}
                onChange={(e) => setPages(Math.max(1, +e.target.value))}
                className="h-12 rounded-xl text-center text-lg font-bold"
              />
            </div>
            <div>
              <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                <Layers className="h-3 w-3" /> Copies
              </label>
              <Input
                type="number"
                min={1}
                value={copies}
                onChange={(e) => setCopies(Math.max(1, +e.target.value))}
                className="h-12 rounded-xl text-center text-lg font-bold"
              />
            </div>
          </div>

          {/* Color Toggle */}
          <div>
            <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              <Palette className="h-3 w-3" /> Print Type
            </label>
            <div className="flex gap-2.5">
              <button
                onClick={() => setColor(false)}
                className={`flex-1 rounded-xl border-2 py-3.5 text-sm font-bold transition-all duration-300 active:scale-95 ${
                  !color ? "border-primary bg-primary/10 text-primary shadow-sm" : "border-border text-muted-foreground hover:border-muted-foreground/30"
                }`}
              >
                🖤 B&W · ₹1/pg
              </button>
              <button
                onClick={() => setColor(true)}
                className={`flex-1 rounded-xl border-2 py-3.5 text-sm font-bold transition-all duration-300 active:scale-95 ${
                  color ? "border-primary bg-primary/10 text-primary shadow-sm" : "border-border text-muted-foreground hover:border-muted-foreground/30"
                }`}
              >
                🌈 Color · ₹5/pg
              </button>
            </div>
          </div>

          {/* Sides Toggle */}
          <div className="flex gap-2.5">
            <button
              onClick={() => setDoubleSided(false)}
              className={`flex-1 rounded-xl border-2 py-3 text-sm font-bold transition-all duration-300 active:scale-95 ${
                !doubleSided ? "border-secondary bg-secondary/10 text-secondary shadow-sm" : "border-border text-muted-foreground"
              }`}
            >
              📄 Single Side
            </button>
            <button
              onClick={() => setDoubleSided(true)}
              className={`flex-1 rounded-xl border-2 py-3 text-sm font-bold transition-all duration-300 active:scale-95 ${
                doubleSided ? "border-secondary bg-secondary/10 text-secondary shadow-sm" : "border-border text-muted-foreground"
              }`}
            >
              📑 Double Side
            </button>
          </div>

          {/* Notes */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-muted-foreground uppercase tracking-wider">Instructions</label>
            <Textarea
              placeholder="e.g., Print page 5-20, staple needed..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="rounded-xl resize-none"
            />
          </div>

          {/* Price Display */}
          <div className="rounded-2xl bg-gradient-to-br from-muted to-muted/50 p-5 text-center">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Estimated Total</p>
            <p className="font-['Space_Grotesk'] text-4xl font-extrabold text-primary">₹{total}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {pages} page(s) × {copies} copy/copies · {color ? "Color" : "B&W"} · {doubleSided ? "Double" : "Single"} sided
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button variant="whatsapp" className="flex-1 gap-2 h-12 rounded-xl text-sm font-semibold" onClick={() => handleOrder("cod")}>
              <MessageCircle className="h-4 w-4" /> COD
            </Button>
            <Button variant="upi" className="flex-1 gap-2 h-12 rounded-xl text-sm font-semibold" onClick={() => handleOrder("upi")}>
              💳 UPI Pay
            </Button>
          </div>
          <p className="text-center text-[11px] text-muted-foreground">
            Send file via WhatsApp · UPI to {WHATSAPP_NUMBER}
          </p>
        </div>
      </div>
    </div>
  );
};

export default XeroxPage;
