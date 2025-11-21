import { BottomNav } from "@/components/BottomNav";
import { Link } from "react-router-dom";
import { Package, Heart, MapPin, CreditCard, Bell, HelpCircle, LogOut, ChevronRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useFavorites } from "@/context/FavoritesContext";

export default function Profile() {
  const { getTotalItems } = useCart();
  const { favorites } = useFavorites();

  const menuItems = [
    { icon: Package, label: "My Orders", path: "/orders", badge: 3 },
    { icon: Heart, label: "Favorites", path: "/favorites", badge: favorites.length },
    { icon: MapPin, label: "Addresses", path: "/addresses" },
    { icon: CreditCard, label: "Payment Methods", path: "/payment-methods" },
    { icon: Bell, label: "Notifications", path: "/notifications" },
    { icon: HelpCircle, label: "Help & Support", path: "/help" },
  ];

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="px-6 pt-14 pb-6 flex flex-col gap-6">
        <h2 className="text-gray-dark text-base font-normal tracking-[-0.312px]">
          Profile
        </h2>

        <div className="flex items-center gap-4 p-6 rounded-2xl bg-brand-pink-light">
          <div className="w-16 h-16 rounded-full bg-brand-pink flex items-center justify-center flex-shrink-0">
            <span className="text-white text-xl font-normal tracking-[-0.449px]">
              JD
            </span>
          </div>
          <div className="flex-1 flex flex-col gap-1">
            <h3 className="text-gray-dark text-base font-normal tracking-[-0.312px]">
              Jane Doe
            </h3>
            <p className="text-gray-medium text-sm tracking-[-0.15px]">
              jane.doe@email.com
            </p>
          </div>
          <button className="text-brand-pink text-sm font-normal tracking-[-0.15px]">
            Edit
          </button>
        </div>
      </div>

      <div className="px-6 pb-6">
        <div className="p-6 rounded-2xl bg-gradient-to-br from-brand-pink to-[#C70036] flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <span className="text-[#FFE4E6] text-base font-normal tracking-[-0.312px]">
              Rewards Points
            </span>
            <div className="px-3 py-1 rounded-full bg-white/20">
              <span className="text-white text-sm font-normal tracking-[-0.15px]">
                Gold Member
              </span>
            </div>
          </div>
          <p className="text-white text-[30px] font-normal leading-9 tracking-[0.396px]">
            2,450
          </p>
          <p className="text-[#FFE4E6] text-sm tracking-[-0.15px]">
            $24.50 in rewards available
          </p>
        </div>
      </div>

      <div className="px-6 pb-6 flex flex-col gap-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              to={item.path}
              className="flex items-center gap-4 p-4 rounded-[14px] bg-[#F9FAFB]"
            >
              <Icon className="w-6 h-6 stroke-gray-medium" strokeWidth={2} />
              <span className="flex-1 text-gray-dark text-base font-normal tracking-[-0.312px]">
                {item.label}
              </span>
              {item.badge && item.badge > 0 && (
                <div className="px-2 py-1 rounded-full bg-brand-pink min-w-[24px] flex items-center justify-center">
                  <span className="text-white text-xs font-normal leading-4">
                    {item.badge}
                  </span>
                </div>
              )}
              <ChevronRight className="w-5 h-5 stroke-gray-light" strokeWidth={1.67} />
            </Link>
          );
        })}
      </div>

      <div className="px-6 pb-6">
        <button className="w-full flex items-center justify-center gap-2 py-4 rounded-[14px]">
          <LogOut className="w-5 h-5 stroke-brand-pink" strokeWidth={1.67} />
          <span className="text-brand-pink text-base font-normal tracking-[-0.312px]">
            Logout
          </span>
        </button>
      </div>

      <div className="px-6 pb-6">
        <p className="text-gray-light text-sm text-center tracking-[-0.15px]">
          Version 1.0.0
        </p>
      </div>

      <BottomNav />
    </div>
  );
}
