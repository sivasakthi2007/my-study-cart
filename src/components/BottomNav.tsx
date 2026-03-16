import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, Copy, MapPin, User } from "lucide-react";
import { useAppContext } from "@/context/AppContext";

const navItems = [
  { path: "/", label: "Shop", icon: ShoppingBag },
  { path: "/xerox", label: "Xerox", icon: Copy },
  { path: "/tracking", label: "Track", icon: MapPin },
  { path: "/profile", label: "Profile", icon: User },
];

const BottomNav = () => {
  const { pathname } = useLocation();
  const { cart } = useAppContext();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border glass">
      <div className="mx-auto flex max-w-lg items-center justify-around py-1">
        {navItems.map(({ path, label, icon: Icon }) => {
          const active = pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className={`relative flex flex-col items-center gap-0.5 px-4 py-2 text-[11px] font-semibold transition-all duration-300 ${
                active ? "text-primary -translate-y-0.5" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <div className="relative">
                {active && (
                  <div className="absolute -inset-2.5 rounded-xl bg-primary/10 animate-fade-in-scale" />
                )}
                <Icon className={`relative h-5 w-5 transition-all duration-300 ${active ? "stroke-[2.5]" : ""}`} />
                {path === "/" && cart.length > 0 && (
                  <span className="absolute -right-2.5 -top-1.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground shadow-sm animate-bounce-in">
                    {cart.length}
                  </span>
                )}
              </div>
              <span className="relative">{label}</span>
              {active && (
                <div className="absolute -top-[1px] left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full bg-primary" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
