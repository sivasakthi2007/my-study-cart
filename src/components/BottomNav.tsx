import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, Copy, MapPin, User, ShoppingCart } from "lucide-react";
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
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-lg items-center justify-around py-2">
        {navItems.map(({ path, label, icon: Icon }) => {
          const active = pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 text-xs font-medium transition-colors ${
                active ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <div className="relative">
                <Icon className="h-5 w-5" />
                {path === "/" && cart.length > 0 && (
                  <span className="absolute -right-2 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                    {cart.length}
                  </span>
                )}
              </div>
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
