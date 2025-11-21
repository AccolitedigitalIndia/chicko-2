import { Link, useLocation } from "react-router-dom";
import { Home, Search, ShoppingBag, User } from "lucide-react";

export const BottomNav = () => {
  const location = useLocation();
  
  const navItems = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/shop", icon: Search, label: "Shop" },
    { path: "/bag", icon: ShoppingBag, label: "Bag" },
    { path: "/profile", icon: User, label: "Profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-border z-50">
      <div className="flex justify-around items-center px-14 py-3">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className="flex flex-col items-center gap-1 min-w-[24px]"
            >
              <Icon
                className="w-6 h-6"
                fill={isActive ? "#EC003F" : "none"}
                stroke={isActive ? "#EC003F" : "#99A1AF"}
                strokeWidth={2}
              />
              <span
                className={`text-xs leading-4 ${
                  isActive ? "text-brand-pink" : "text-gray-light"
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
