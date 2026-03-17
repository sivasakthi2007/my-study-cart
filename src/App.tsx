import { useState } from 'react';
import './App.css';
import { stationeryProducts, categories } from './data';
import { useToast } from './use-toast';

function App() {
  const { toast } = useToast();
  const [activeCategory, setActiveCategory] = useState("All");
  const [cartCount, setCartCount] = useState(0);

  // Filter products dynamically
  const filteredProducts = activeCategory === "All" 
    ? stationeryProducts 
    : stationeryProducts.filter(product => product.category === activeCategory);

  const handleAddToCart = (productName: string) => {
    setCartCount(prev => prev + 1);
    toast({
      title: "Added to Cart 🛒",
      description: `${productName} is ready for checkout.`,
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navbar */}
      <nav className="glass sticky top-0 z-50 flex items-center justify-between px-6 py-4 border-b border-border">
        <div className="text-2xl font-extrabold tracking-tight text-gradient font-['Outfit']">
          Campus Print & Shop
        </div>
        <button className="bg-primary text-primary-foreground px-6 py-2.5 rounded-full font-semibold shadow-glow-primary hover:opacity-90 transition-all">
          Cart ({cartCount})
        </button>
      </nav>

      {/* Hero Banner */}
      <header className="mx-4 sm:mx-8 my-6 p-8 sm:p-12 rounded-[2rem] gradient-hero shadow-float text-center text-white">
        <h1 className="text-4xl sm:text-6xl font-black mb-4 font-['Outfit'] tracking-tight">
          Essentials, Delivered Fast.
        </h1>
        <p className="text-lg sm:text-xl font-medium opacity-90 max-w-2xl mx-auto">
          From premium stationery to instant Xerox orders. Skip the line and order directly from your campus hub.
        </p>
      </header>

      {/* Category Navigation */}
      <div className="flex justify-start sm:justify-center gap-3 overflow-x-auto no-scrollbar px-6 py-2 mx-4 sm:mx-8 mb-4">
        {categories.map(category => (
          <button 
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`whitespace-nowrap px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ${
              activeCategory === category 
                ? 'bg-primary text-primary-foreground shadow-glow-primary' 
                : 'bg-muted text-muted-foreground hover:bg-secondary/10 hover:text-secondary'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <main className="product-grid mx-4 sm:mx-8 mb-12">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-float transition-all duration-300">
            {/* Image/Emoji Area */}
            <div className="h-48 flex items-center justify-center text-6xl bg-muted/50 group-hover:bg-primary/5 border-b border-border transition-colors">
              <span className="group-hover:scale-110 transition-transform duration-300">
                {product.image}
              </span>
            </div>
            
            {/* Details Area */}
            <div className="p-5 flex flex-col gap-3">
              <div className="flex justify-between items-start gap-2">
                <h3 className="font-bold text-lg leading-tight font-['Outfit']">{product.name}</h3>
                <span className="font-black text-primary bg-primary/10 px-2.5 py-1 rounded-md text-sm">
                  ₹{product.price}
                </span>
              </div>
              
              <p className="text-muted-foreground text-sm line-clamp-2 h-10">
                {product.description}
              </p>
              
              <button 
                onClick={() => handleAddToCart(product.name)}
                className="w-full mt-2 bg-secondary/10 text-secondary hover:bg-secondary hover:text-white py-3 rounded-xl font-bold transition-colors"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}

export default App;
        
