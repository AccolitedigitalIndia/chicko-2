import { BottomNav } from "@/components/BottomNav";
import { Link } from "react-router-dom";
import {
  Package,
  Heart,
  MapPin,
  CreditCard,
  Bell,
  HelpCircle,
  LogOut,
  ChevronRight,
  Edit2,
  Check,
  X,
  Wallet,
  Store,
  Award,
  Share2,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useFavorites } from "@/context/FavoritesContext";
import { useUser } from "@/context/UserContext";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { QRCodeSVG } from "qrcode.react";
import { TierComparisonModal } from "@/components/TierComparisonModal";

export default function Profile() {
  const { getTotalItems } = useCart();
  const { favorites } = useFavorites();
  const { user, updateUserName, updateUserEmail } = useUser();
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState(user.name || "");
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [editedEmail, setEditedEmail] = useState(user.email || "");
  const [showTierComparison, setShowTierComparison] = useState(false);
  const [showBarcode, setShowBarcode] = useState(false);

  const currentPoints = 2450;
  const currentTier = "Gold";
  const nextTier = null;
  const annualSpend = 1250;
  const nextTierThreshold = 1000;
  const progressToNextTier = nextTier ? Math.min((annualSpend / nextTierThreshold) * 100, 100) : 100;
  const loyaltyId = "LOYAL" + user.name.replace(/\s/g, "").toUpperCase().slice(0, 6) + "2024";

  const handleShareReferral = () => {
    const referralLink = `https://store.app/ref/${loyaltyId}`;
    if (navigator.share) {
      navigator.share({
        title: "Join our loyalty program!",
        text: "Get 500 bonus points when you sign up with my referral link!",
        url: referralLink,
      });
    } else {
      navigator.clipboard.writeText(referralLink);
      toast({
        title: "Referral link copied!",
        description: "Share it with friends to earn bonus points",
      });
    }
  };

  const menuItems = [
    { icon: Wallet, label: "Digital Wallet", path: "/wallet" },
    { icon: Store, label: "Store Locator", path: "/store-locator" },
    { icon: Package, label: "My Orders", path: "/orders", badge: 3 },
    {
      icon: Heart,
      label: "Favorites",
      path: "/favorites",
      badge: favorites.length,
    },
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
              {user.name
                ? user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()
                    .slice(0, 2)
                : "U"}
            </span>
          </div>
          <div className="flex-1 flex flex-col gap-2">
            {isEditingName ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  className="flex-1 px-3 py-1.5 rounded-lg border border-gray-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-pink/20"
                  autoFocus
                  maxLength={50}
                />
                <button
                  onClick={() => {
                    if (editedName.trim()) {
                      updateUserName(editedName.trim());
                      setIsEditingName(false);
                      toast({
                        title: "Name updated",
                        description: "Your profile has been updated successfully.",
                      });
                    }
                  }}
                  className="p-1.5 rounded-full hover:bg-white/50 transition-colors"
                >
                  <Check className="w-4 h-4 stroke-green-600" />
                </button>
                <button
                  onClick={() => {
                    setEditedName(user.name || "");
                    setIsEditingName(false);
                  }}
                  className="p-1.5 rounded-full hover:bg-white/50 transition-colors"
                >
                  <X className="w-4 h-4 stroke-red-600" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <h3 className="text-gray-dark text-base font-normal tracking-[-0.312px]">
                  {user.name || "Set your name"}
                </h3>
                <button
                  onClick={() => setIsEditingName(true)}
                  className="p-1 rounded-full hover:bg-white/50 transition-colors"
                >
                  <Edit2 className="w-4 h-4 stroke-brand-pink" />
                </button>
              </div>
            )}

            {isEditingEmail ? (
              <div className="flex items-center gap-2">
                <input
                  type="email"
                  value={editedEmail}
                  onChange={(e) => setEditedEmail(e.target.value)}
                  className="flex-1 px-3 py-1.5 rounded-lg border border-gray-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-pink/20"
                  autoFocus
                  maxLength={100}
                />
                <button
                  onClick={() => {
                    if (editedEmail.trim()) {
                      updateUserEmail(editedEmail.trim());
                      setIsEditingEmail(false);
                      toast({
                        title: "Email updated",
                        description: "Your email has been updated successfully.",
                      });
                    }
                  }}
                  className="p-1.5 rounded-full hover:bg-white/50 transition-colors"
                >
                  <Check className="w-4 h-4 stroke-green-600" />
                </button>
                <button
                  onClick={() => {
                    setEditedEmail(user.email || "");
                    setIsEditingEmail(false);
                  }}
                  className="p-1.5 rounded-full hover:bg-white/50 transition-colors"
                >
                  <X className="w-4 h-4 stroke-red-600" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <p className="text-gray-medium text-sm tracking-[-0.15px]">
                  {user.email || "Add email address"}
                </p>
                <button
                  onClick={() => setIsEditingEmail(true)}
                  className="p-1 rounded-full hover:bg-white/50 transition-colors"
                >
                  <Edit2 className="w-3.5 h-3.5 stroke-gray-medium" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="px-6 pb-6">
        <div className="p-6 rounded-2xl bg-gradient-to-br from-brand-pink to-[#C70036] flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <span className="text-[#FFE4E6] text-base font-normal tracking-[-0.312px]">
              Rewards Points
            </span>
            <button
              onClick={() => setShowTierComparison(true)}
              className="px-3 py-1 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
            >
              <span className="text-white text-sm font-normal tracking-[-0.15px]">
                {currentTier} Member
              </span>
            </button>
          </div>
          <p className="text-white text-[30px] font-normal leading-9 tracking-[0.396px]">
            {currentPoints.toLocaleString()}
          </p>
          <p className="text-[#FFE4E6] text-sm tracking-[-0.15px]">
            ${(currentPoints / 100).toFixed(2)} in rewards available
          </p>

          {nextTier && (
            <div className="mt-2">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[#FFE4E6] text-xs tracking-[-0.15px]">
                  Progress to {nextTier}
                </span>
                <span className="text-white text-xs font-normal">
                  ${annualSpend} / ${nextTierThreshold}
                </span>
              </div>
              <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white rounded-full transition-all duration-500"
                  style={{ width: `${progressToNextTier}%` }}
                />
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-2 mt-2">
            <button
              onClick={() => setShowBarcode(true)}
              className="py-2.5 px-4 bg-white/20 hover:bg-white/30 rounded-full text-white text-sm font-normal tracking-[-0.15px] flex items-center justify-center gap-2 transition-colors"
            >
              <Award className="w-4 h-4" strokeWidth={2} />
              Show Barcode
            </button>
            <button
              onClick={handleShareReferral}
              className="py-2.5 px-4 bg-white/20 hover:bg-white/30 rounded-full text-white text-sm font-normal tracking-[-0.15px] flex items-center justify-center gap-2 transition-colors"
            >
              <Share2 className="w-4 h-4" strokeWidth={2} />
              Refer Friend
            </button>
          </div>
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
              <ChevronRight
                className="w-5 h-5 stroke-gray-light"
                strokeWidth={1.67}
              />
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

      <TierComparisonModal
        isOpen={showTierComparison}
        onClose={() => setShowTierComparison(false)}
      />

      {showBarcode && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6"
          onClick={() => setShowBarcode(false)}
        >
          <div
            className="bg-white rounded-2xl p-6 max-w-sm w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-gray-dark text-lg font-normal tracking-[-0.312px] mb-1">
                  Loyalty Card
                </h3>
                <p className="text-gray-medium text-sm tracking-[-0.15px]">
                  Scan at checkout to earn points
                </p>
              </div>
              <button
                onClick={() => setShowBarcode(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
              >
                <X className="w-5 h-5 stroke-gray-medium" strokeWidth={2} />
              </button>
            </div>

            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white border-2 border-gray-border rounded-2xl">
                <QRCodeSVG value={loyaltyId} size={200} />
              </div>
            </div>

            <div className="text-center mb-4">
              <p className="text-gray-medium text-sm tracking-[-0.15px] mb-2">
                Loyalty ID
              </p>
              <div className="px-4 py-3 bg-[#F9FAFB] rounded-lg">
                <p className="text-gray-dark text-lg font-mono tracking-wider">
                  {loyaltyId}
                </p>
              </div>
            </div>

            <div className="p-4 bg-brand-pink-light rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-dark text-sm font-normal tracking-[-0.15px]">
                    Current Tier
                  </p>
                  <p className="text-brand-pink text-lg font-normal tracking-[-0.312px]">
                    {currentTier} Member
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-gray-dark text-sm font-normal tracking-[-0.15px]">
                    Points Balance
                  </p>
                  <p className="text-brand-pink text-lg font-normal tracking-[-0.312px]">
                    {currentPoints.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
