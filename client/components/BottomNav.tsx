import { Link, useLocation } from "react-router-dom";
import { Home, Search, ShoppingBag, User } from "lucide-react";
import { useCart } from "@/context/CartContext";

export const BottomNav = () => {
  const location = useLocation();
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  const navItems = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/shop", icon: Search, label: "Shop" },
    { path: "/bag", icon: ShoppingBag, label: "Bag" },
    { path: "/profile", icon: User, label: "Profile" },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-border z-50"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="flex justify-around items-center px-14 py-3">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              to={item.path}
              className="flex flex-col items-center gap-1 min-w-[24px] relative transition-transform hover:scale-110 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-pink focus-visible:ring-offset-2 rounded-lg px-2 py-1"
              aria-label={item.label}
              aria-current={isActive ? "page" : undefined}
            >
              <div className="relative">
                <Icon
                  className="w-6 h-6 transition-all"
                  fill={isActive ? "#EC003F" : "none"}
                  stroke={isActive ? "#EC003F" : "#99A1AF"}
                  strokeWidth={2}
                  aria-hidden="true"
                />
                {item.label === "Bag" && totalItems > 0 && (
                  <div
                    className="absolute -top-1 -right-3 w-5 h-5 bg-brand-pink rounded-full flex items-center justify-center animate-in zoom-in-95 duration-200"
                    aria-label={`${totalItems} items in bag`}
                  >
                    <span className="text-white text-xs font-normal leading-4">
                      {totalItems}
                    </span>
                  </div>
                )}
              </div>
              <span
                className={`text-xs leading-4 transition-colors ${
                  isActive ? "text-brand-pink font-medium" : "text-gray-light"
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
