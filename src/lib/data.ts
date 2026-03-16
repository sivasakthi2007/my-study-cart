export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
}

export interface XeroxOrder {
  id: string;
  pages: number;
  copies: number;
  color: boolean;
  doubleSided: boolean;
  notes: string;
  totalPrice: number;
}

export interface Order {
  id: string;
  items: { name: string; qty: number; price: number }[];
  total: number;
  status: "pending" | "confirmed" | "ready" | "delivered";
  date: string;
  paymentMethod: "cod" | "upi";
  type: "product" | "xerox";
}

export const WHATSAPP_NUMBER = "6383605984";

export const stationeryProducts: Product[] = [
  { id: "1", name: "XO Pen Set", price: 120, category: "Pens", image: "🖊️", description: "Premium gel pen set for smooth writing" },
  { id: "2", name: "A4 Notebook (200 pages)", price: 80, category: "Notebooks", image: "📓", description: "Ruled notebook for lectures" },
  { id: "3", name: "Spiral Notebook", price: 60, category: "Notebooks", image: "📔", description: "Wire-bound spiral notebook" },
  { id: "4", name: "Highlighter Pack (5)", price: 150, category: "Markers", image: "🖍️", description: "Neon highlighters for revision" },
  { id: "5", name: "Geometry Box", price: 200, category: "Tools", image: "📐", description: "Complete geometry instruments" },
  { id: "6", name: "Scientific Calculator", price: 650, category: "Tools", image: "🔢", description: "Casio-style scientific calculator" },
  { id: "7", name: "Graph Paper Pad", price: 45, category: "Paper", image: "📊", description: "50 sheets of graph paper" },
  { id: "8", name: "Sketch Pen Set (12)", price: 90, category: "Pens", image: "🎨", description: "Colorful sketch pens" },
  { id: "9", name: "Eraser & Sharpener Combo", price: 25, category: "Tools", image: "✏️", description: "Essential combo pack" },
  { id: "10", name: "File Folder (Pack of 5)", price: 100, category: "Paper", image: "📁", description: "Organize your notes" },
  { id: "11", name: "Sticky Notes (Pack)", price: 55, category: "Paper", image: "📝", description: "Colorful sticky notes" },
  { id: "12", name: "Drawing Sheet Pack", price: 70, category: "Paper", image: "🗒️", description: "A3 drawing sheets - 20 pack" },
];

export const categories = ["All", "Pens", "Notebooks", "Markers", "Tools", "Paper"];
