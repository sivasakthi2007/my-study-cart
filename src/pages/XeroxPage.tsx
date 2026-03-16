import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle } from "lucide-react";
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
      <header className="bg-secondary px-4 pb-6 pt-8">
        <div className="mx-auto max-w-lg">
          <h1 className="font-['Space_Grotesk'] text-2xl font-bold text-secondary-foreground">📄 Xerox / Print</h1>
          <p className="mt-1 text-sm text-secondary-foreground/80">Get your prints done quick!</p>
        </div>
      </header>

      <div className="mx-auto max-w-lg px-4 py-6">
        <div className="space-y-5 rounded-xl border border-border bg-card p-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium">Pages</label>
              <Input type="number" min={1} value={pages} onChange={(e) => setPages(Math.max(1, +e.target.value))} />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">Copies</label>
              <Input type="number" min={1} value={copies} onChange={(e) => setCopies(Math.max(1, +e.target.value))} />
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setColor(false)}
              className={`flex-1 rounded-lg border-2 py-3 text-sm font-semibold transition-all ${
                !color ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground"
              }`}
            >
              🖤 B&W (₹1/pg)
            </button>
            <button
              onClick={() => setColor(true)}
              className={`flex-1 rounded-lg border-2 py-3 text-sm font-semibold transition-all ${
                color ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground"
              }`}
            >
              🌈 Color (₹5/pg)
            </button>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setDoubleSided(false)}
              className={`flex-1 rounded-lg border-2 py-3 text-sm font-semibold transition-all ${
                !doubleSided ? "border-secondary bg-secondary/10 text-secondary" : "border-border text-muted-foreground"
              }`}
            >
              Single Side
            </button>
            <button
              onClick={() => setDoubleSided(true)}
              className={`flex-1 rounded-lg border-2 py-3 text-sm font-semibold transition-all ${
                doubleSided ? "border-secondary bg-secondary/10 text-secondary" : "border-border text-muted-foreground"
              }`}
            >
              Double Side
            </button>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium">Special Instructions</label>
            <Textarea placeholder="e.g., Print from page 5 to 20, staple required..." value={notes} onChange={(e) => setNotes(e.target.value)} />
          </div>

          <div className="rounded-lg bg-muted p-4 text-center">
            <p className="text-sm text-muted-foreground">Estimated Total</p>
            <p className="font-['Space_Grotesk'] text-3xl font-bold text-primary">₹{total}</p>
          </div>

          <div className="flex gap-3">
            <Button variant="whatsapp" className="flex-1 gap-2" onClick={() => handleOrder("cod")}>
              <MessageCircle className="h-4 w-4" /> COD
            </Button>
            <Button variant="upi" className="flex-1 gap-2" onClick={() => handleOrder("upi")}>
              💳 UPI Pay
            </Button>
          </div>
          <p className="text-center text-xs text-muted-foreground">
            Send file via WhatsApp • UPI to {WHATSAPP_NUMBER}
          </p>
        </div>
      </div>
    </div>
  );
};

export default XeroxPage;
