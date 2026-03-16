import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, FileText, Layers, Palette, Printer } from "lucide-react";
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
    <div className="min-h-screen pb-24">
      <header className="gradient-secondary relative overflow-hidden px-4 pb-10 pt-12">
        <div className="absolute inset-0">
          <div className="absolute right-[-20%] top-[-30%] h-64 w-64 rounded-full bg-primary-foreground/10 blur-[60px]" />
        </div>
        <div className="relative mx-auto max-w-lg">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-primary-foreground/15 backdrop-blur-sm px-3 py-1 text-primary-foreground/90 text-xs font-semibold mb-3">
            <Printer className="h-3 w-3" /> Quick Print Service
          </div>
          <h1 className="font-['Outfit'] text-4xl font-black text-primary-foreground tracking-tight leading-none">
            Xerox &<br />Print 📄
          </h1>
          <p className="mt-2 text-sm text-primary-foreground/75 font-medium">Send your file, we'll print & deliver!</p>
        </div>
      </header>

      <div className="mx-auto max-w-lg px-4 -mt-4">
        <div className="space-y-5 rounded-3xl border border-border/60 bg-card p-6 shadow-float animate-fade-in-scale" style={{ opacity: 0 }}>
          {/* Pages & Copies */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-2 flex items-center gap-1.5 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                <FileText className="h-3 w-3" /> Pages
              </label>
              <Input
                type="number"
                min={1}
                value={pages}
                onChange={(e) => setPages(Math.max(1, +e.target.value))}
                className="h-14 rounded-2xl text-center text-xl font-black border-2 border-border focus:border-primary transition-colors"
              />
            </div>
            <div>
              <label className="mb-2 flex items-center gap-1.5 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                <Layers className="h-3 w-3" /> Copies
              </label>
              <Input
                type="number"
                min={1}
                value={copies}
                onChange={(e) => setCopies(Math.max(1, +e.target.value))}
                className="h-14 rounded-2xl text-center text-xl font-black border-2 border-border focus:border-primary transition-colors"
              />
            </div>
          </div>

          {/* Color Toggle */}
          <div>
            <label className="mb-2 flex items-center gap-1.5 text-xs font-bold text-muted-foreground uppercase tracking-wider">
              <Palette className="h-3 w-3" /> Print Type
            </label>
            <div className="flex gap-3">
              <button
                onClick={() => setColor(false)}
                className={`flex-1 rounded-2xl border-2 py-4 text-sm font-bold transition-all duration-300 active:scale-95 ${
                  !color
                    ? "border-primary bg-primary/10 text-primary shadow-glow-primary"
                    : "border-border text-muted-foreground hover:border-muted-foreground/30"
                }`}
              >
                🖤 B&W<br /><span className="text-xs font-semibold opacity-70">₹1/page</span>
              </button>
              <button
                onClick={() => setColor(true)}
                className={`flex-1 rounded-2xl border-2 py-4 text-sm font-bold transition-all duration-300 active:scale-95 ${
                  color
                    ? "border-secondary bg-secondary/10 text-secondary shadow-glow-secondary"
                    : "border-border text-muted-foreground hover:border-muted-foreground/30"
                }`}
              >
                🌈 Color<br /><span className="text-xs font-semibold opacity-70">₹5/page</span>
              </button>
            </div>
          </div>

          {/* Sides Toggle */}
          <div className="flex gap-3">
            <button
              onClick={() => setDoubleSided(false)}
              className={`flex-1 rounded-2xl border-2 py-3.5 text-sm font-bold transition-all duration-300 active:scale-95 ${
                !doubleSided
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-border text-muted-foreground"
              }`}
            >
              📄 Single Side
            </button>
            <button
              onClick={() => setDoubleSided(true)}
              className={`flex-1 rounded-2xl border-2 py-3.5 text-sm font-bold transition-all duration-300 active:scale-95 ${
                doubleSided
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-border text-muted-foreground"
              }`}
            >
              📑 Double Side
            </button>
          </div>

          {/* Notes */}
          <div>
            <label className="mb-2 block text-xs font-bold text-muted-foreground uppercase tracking-wider">📝 Instructions</label>
            <Textarea
              placeholder="e.g., Print page 5-20, staple needed..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="rounded-2xl resize-none border-2 border-border focus:border-primary transition-colors"
            />
          </div>

          {/* Price Display */}
          <div className="rounded-3xl gradient-hero p-6 text-center">
            <p className="text-xs font-bold text-primary-foreground/70 uppercase tracking-widest mb-2">Estimated Total</p>
            <p className="font-['Outfit'] text-5xl font-black text-primary-foreground">₹{total}</p>
            <p className="text-xs text-primary-foreground/60 mt-2 font-medium">
              {pages} page(s) × {copies} copies · {color ? "Color" : "B&W"} · {doubleSided ? "Double" : "Single"} sided
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button variant="whatsapp" className="flex-1 gap-2 h-13 rounded-2xl text-sm font-bold" onClick={() => handleOrder("cod")}>
              <MessageCircle className="h-4 w-4" /> COD
            </Button>
            <Button variant="upi" className="flex-1 gap-2 h-13 rounded-2xl text-sm font-bold" onClick={() => handleOrder("upi")}>
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
