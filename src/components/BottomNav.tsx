import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, Copy, MapPin, User } from "lucide-react";
import { useAppContext } from "@/context/AppContext";

const navItems = [
  { path: "/", label: "Shop", icon: ShoppingBag, gradient: "from-primary to-primary-glow" },
  { path: "/xerox", label: "Xerox", icon: Copy, gradient: "from-secondary to-coral" },
  { path: "/tracking", label: "Track", icon: MapPin, gradient: "from-accent to-primary" },
  { path: "/profile", label: "Profile", icon: User, gradient: "from-sunshine to-secondary" },
];

const BottomNav = () => {
  const { pathname } = useLocation();
  const { cart } = useAppContext();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-border/50">
      <div className="mx-auto flex max-w-lg items-center justify-around py-1.5 px-2">
        {navItems.map(({ path, label, icon: Icon, gradient }) => {
          const active = pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className={`relative flex flex-col items-center gap-0.5 px-5 py-1.5 rounded-2xl transition-all duration-300 ${
                active ? "-translate-y-0.5" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <div className="relative">
                {active ? (
                  <div className={`flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} shadow-glow-primary`}>
                    <Icon className="h-5 w-5 text-primary-foreground stroke-[2.5]" />
                  </div>
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center">
                    <Icon className="h-5 w-5" />
                  </div>
                )}
                {path === "/" && cart.length > 0 && (
                  <span className="absolute -right-1.5 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-[10px] font-bold text-secondary-foreground shadow-glow-secondary animate-bounce-in">
                    {cart.length}
                  </span>
                )}
              </div>
              <span className={`text-[10px] font-semibold transition-all ${active ? "text-gradient font-bold" : ""}`}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
