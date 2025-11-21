import { BottomNav } from "@/components/BottomNav";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Bell, Gift, Package, Tag, Heart } from "lucide-react";

interface Notification {
  id: string;
  type: "promo" | "order" | "wishlist" | "general";
  title: string;
  message: string;
  date: string;
  read: boolean;
}

export default function Notifications() {
  const navigate = useNavigate();

  const notifications: Notification[] = [
    {
      id: "1",
      type: "promo",
      title: "🎄 Christmas Special! 20% OFF",
      message: "Celebrate the season with 20% off on all items! Use code XMAS20 at checkout. Valid until Dec 25th.",
      date: "2 hours ago",
      read: false,
    },
    {
      id: "2",
      type: "order",
      title: "Order Delivered",
      message: "Your order ORD-2024-001 has been delivered successfully.",
      date: "1 day ago",
      read: false,
    },
    {
      id: "3",
      type: "wishlist",
      title: "Price Drop Alert!",
      message: "Great news! An item in your favorites is now on sale.",
      date: "2 days ago",
      read: true,
    },
    {
      id: "4",
      type: "order",
      title: "Order Shipped",
      message: "Your order ORD-2024-002 is on its way! Expected delivery: Dec 20th.",
      date: "3 days ago",
      read: true,
    },
    {
      id: "5",
      type: "general",
      title: "New Arrivals",
      message: "Check out our latest collection of winter essentials!",
      date: "5 days ago",
      read: true,
    },
  ];

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "promo":
        return <Gift className="w-6 h-6 stroke-brand-pink" strokeWidth={1.67} />;
      case "order":
        return <Package className="w-6 h-6 stroke-blue-600" strokeWidth={1.67} />;
      case "wishlist":
        return <Heart className="w-6 h-6 stroke-red-500" strokeWidth={1.67} />;
      default:
        return <Bell className="w-6 h-6 stroke-gray-medium" strokeWidth={1.67} />;
    }
  };

  const getIconBg = (type: Notification["type"]) => {
    switch (type) {
      case "promo":
        return "bg-brand-pink-light";
      case "order":
        return "bg-blue-50";
      case "wishlist":
        return "bg-red-50";
      default:
        return "bg-[#F9FAFB]";
    }
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="px-6 pt-14 pb-4 border-b border-gray-border flex items-center gap-4">
        <button
          onClick={() => navigate("/profile")}
          className="w-10 h-10 flex items-center justify-center"
        >
          <ChevronLeft className="w-6 h-6 stroke-gray-dark" strokeWidth={2} />
        </button>
        <h2 className="text-gray-dark text-base font-normal tracking-[-0.312px]">
          Notifications
        </h2>
      </div>

      <div className="px-6 pt-6 pb-8 flex flex-col gap-3">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`flex gap-4 p-4 rounded-2xl ${
              notification.read ? "bg-white border border-gray-border" : "bg-[#F9FAFB]"
            }`}
          >
            <div className={`w-12 h-12 rounded-full ${getIconBg(notification.type)} flex items-center justify-center flex-shrink-0`}>
              {getIcon(notification.type)}
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <div className="flex justify-between items-start gap-2">
                <p className={`text-base font-normal tracking-[-0.312px] ${
                  notification.read ? "text-gray-medium" : "text-gray-dark"
                }`}>
                  {notification.title}
                </p>
                {!notification.read && (
                  <div className="w-2 h-2 rounded-full bg-brand-pink flex-shrink-0 mt-2" />
                )}
              </div>
              <p className="text-gray-medium text-sm tracking-[-0.15px] leading-5">
                {notification.message}
              </p>
              <p className="text-[#6A7282] text-xs tracking-[-0.15px] mt-1">
                {notification.date}
              </p>
            </div>
          </div>
        ))}

        {notifications.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-20 h-20 rounded-full bg-[#F9FAFB] flex items-center justify-center mb-4">
              <Bell className="w-10 h-10 stroke-gray-light" strokeWidth={1.5} />
            </div>
            <p className="text-gray-medium text-base mb-2">No notifications</p>
            <p className="text-[#6A7282] text-sm text-center">
              You're all caught up!
            </p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
