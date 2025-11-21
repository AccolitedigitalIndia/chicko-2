import { BottomNav } from "@/components/BottomNav";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  Bell,
  Gift,
  Package,
  Tag,
  Heart,
  Settings,
  Filter,
  Check,
} from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

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
  const [filter, setFilter] = useState<
    "all" | "promo" | "order" | "wishlist" | "general"
  >("all");
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState({
    promos: true,
    orders: true,
    wishlist: true,
    general: true,
  });

  const [notificationsList, setNotificationsList] = useState<Notification[]>([
    {
      id: "1",
      type: "promo",
      title: "🎄 Christmas Special! 20% OFF",
      message:
        "Celebrate the season with 20% off on all items! Use code XMAS20 at checkout. Valid until Dec 25th.",
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
      message:
        "Your order ORD-2024-002 is on its way! Expected delivery: Dec 20th.",
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
  ]);

  const handleMarkAsRead = (id: string) => {
    setNotificationsList((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)),
    );
  };

  const handleMarkAllAsRead = () => {
    setNotificationsList((prev) =>
      prev.map((notif) => ({ ...notif, read: true })),
    );
    toast({
      title: "All notifications marked as read",
    });
  };

  const handleTogglePreference = (key: keyof typeof preferences) => {
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const filteredNotifications =
    filter === "all"
      ? notificationsList
      : notificationsList.filter((n) => n.type === filter);

  const unreadCount = notificationsList.filter((n) => !n.read).length;

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "promo":
        return (
          <Gift className="w-6 h-6 stroke-brand-pink" strokeWidth={1.67} />
        );
      case "order":
        return (
          <Package className="w-6 h-6 stroke-blue-600" strokeWidth={1.67} />
        );
      case "wishlist":
        return <Heart className="w-6 h-6 stroke-red-500" strokeWidth={1.67} />;
      default:
        return (
          <Bell className="w-6 h-6 stroke-gray-medium" strokeWidth={1.67} />
        );
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
      <div className="px-6 pt-14 pb-4 border-b border-gray-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/profile")}
              className="w-10 h-10 flex items-center justify-center"
            >
              <ChevronLeft
                className="w-6 h-6 stroke-gray-dark"
                strokeWidth={2}
              />
            </button>
            <div>
              <h2 className="text-gray-dark text-base font-normal tracking-[-0.312px]">
                Notifications
              </h2>
              {unreadCount > 0 && (
                <p className="text-[#6A7282] text-xs tracking-[-0.15px]">
                  {unreadCount} unread
                </p>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                className="text-brand-pink text-sm font-normal tracking-[-0.15px] hover:text-brand-burgundy"
              >
                Mark all read
              </button>
            )}
            <button
              onClick={() => setShowPreferences(true)}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
            >
              <Settings
                className="w-5 h-5 stroke-gray-medium"
                strokeWidth={2}
              />
            </button>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {[
            { value: "all" as const, label: "All" },
            { value: "promo" as const, label: "Promos" },
            { value: "order" as const, label: "Orders" },
            { value: "wishlist" as const, label: "Wishlist" },
            { value: "general" as const, label: "General" },
          ].map((item) => (
            <button
              key={item.value}
              onClick={() => setFilter(item.value)}
              className={`px-4 py-2 rounded-full text-sm font-normal tracking-[-0.15px] transition-all whitespace-nowrap ${
                filter === item.value
                  ? "bg-brand-pink text-white"
                  : "bg-[#F9FAFB] text-gray-medium hover:bg-gray-200"
              }`}
            >
              {item.label}
              {item.value === "all" && unreadCount > 0 && (
                <span className="ml-1.5 px-1.5 py-0.5 bg-white text-brand-pink text-xs rounded-full">
                  {unreadCount}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="px-6 pt-6 pb-8 flex flex-col gap-3">
        {filteredNotifications.map((notification) => (
          <button
            key={notification.id}
            onClick={() =>
              !notification.read && handleMarkAsRead(notification.id)
            }
            className={`flex gap-4 p-4 rounded-2xl text-left transition-all hover:shadow-sm ${
              notification.read
                ? "bg-white border border-gray-border"
                : "bg-[#F9FAFB] border border-brand-pink/20"
            }`}
          >
            <div
              className={`w-12 h-12 rounded-full ${getIconBg(notification.type)} flex items-center justify-center flex-shrink-0`}
            >
              {getIcon(notification.type)}
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <div className="flex justify-between items-start gap-2">
                <p
                  className={`text-base font-normal tracking-[-0.312px] ${
                    notification.read ? "text-gray-medium" : "text-gray-dark"
                  }`}
                >
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
          </button>
        ))}

        {filteredNotifications.length === 0 && (
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

      {showPreferences && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center"
          onClick={() => setShowPreferences(false)}
        >
          <div
            className="bg-white rounded-t-3xl sm:rounded-2xl w-full sm:max-w-md p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-gray-dark text-lg font-normal tracking-[-0.312px]">
                Notification Preferences
              </h3>
              <button
                onClick={() => setShowPreferences(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col gap-4">
              {[
                {
                  key: "promos" as const,
                  label: "Promotional Offers",
                  icon: Gift,
                },
                {
                  key: "orders" as const,
                  label: "Order Updates",
                  icon: Package,
                },
                {
                  key: "wishlist" as const,
                  label: "Wishlist Alerts",
                  icon: Heart,
                },
                {
                  key: "general" as const,
                  label: "General Updates",
                  icon: Bell,
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.key}
                    className="flex items-center justify-between p-4 bg-[#F9FAFB] rounded-xl"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                        <Icon
                          className="w-5 h-5 stroke-gray-medium"
                          strokeWidth={2}
                        />
                      </div>
                      <span className="text-gray-dark text-sm font-normal tracking-[-0.15px]">
                        {item.label}
                      </span>
                    </div>
                    <button
                      onClick={() => handleTogglePreference(item.key)}
                      className={`w-12 h-6 rounded-full transition-all ${
                        preferences[item.key] ? "bg-brand-pink" : "bg-gray-300"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 bg-white rounded-full transition-all ${
                          preferences[item.key] ? "ml-[26px]" : "ml-[2px]"
                        }`}
                      />
                    </button>
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => {
                setShowPreferences(false);
                toast({
                  title: "Preferences saved",
                  description:
                    "Your notification preferences have been updated",
                });
              }}
              className="w-full mt-6 py-3 bg-brand-pink text-white rounded-full text-sm font-normal tracking-[-0.15px] hover:bg-brand-pink/90 active:scale-95 transition-all"
            >
              Save Preferences
            </button>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
