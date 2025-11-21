import { BottomNav } from "@/components/BottomNav";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  Gift,
  CreditCard,
  Star,
  Clock,
  QrCode,
} from "lucide-react";
import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { toast } from "@/hooks/use-toast";

interface Reward {
  id: string;
  type: "promo" | "reward" | "voucher";
  title: string;
  description: string;
  value: string;
  code: string;
  expiresAt: string;
  isActive: boolean;
  termsAndConditions?: string;
}

export default function Wallet() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"active" | "expired">("active");
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);

  const rewards: Reward[] = [
    {
      id: "1",
      type: "promo",
      title: "20% OFF Winter Collection",
      description: "Get 20% off on all winter items",
      value: "20% OFF",
      code: "WINTER20",
      expiresAt: "Dec 31, 2024",
      isActive: true,
      termsAndConditions:
        "Valid on winter collection only. Cannot be combined with other offers.",
    },
    {
      id: "2",
      type: "reward",
      title: "$10 Rewards Certificate",
      description: "Earned from your recent purchases",
      value: "$10",
      code: "RWD1234567",
      expiresAt: "Jan 15, 2025",
      isActive: true,
      termsAndConditions: "Can be used on purchases over $50.",
    },
    {
      id: "3",
      type: "voucher",
      title: "Free Shipping",
      description: "Free standard shipping on your next order",
      value: "FREE SHIP",
      code: "FREESHIP25",
      expiresAt: "Dec 25, 2024",
      isActive: true,
      termsAndConditions: "No minimum purchase required.",
    },
    {
      id: "4",
      type: "promo",
      title: "Holiday Special",
      description: "15% off storewide",
      value: "15% OFF",
      code: "HOLIDAY15",
      expiresAt: "Nov 30, 2024",
      isActive: false,
    },
  ];

  const activeRewards = rewards.filter((r) => r.isActive);
  const expiredRewards = rewards.filter((r) => !r.isActive);
  const displayedRewards =
    activeTab === "active" ? activeRewards : expiredRewards;

  const getRewardIcon = (type: Reward["type"]) => {
    switch (type) {
      case "promo":
        return <Gift className="w-6 h-6 stroke-white" strokeWidth={2} />;
      case "reward":
        return <Star className="w-6 h-6 stroke-white" strokeWidth={2} />;
      case "voucher":
        return <CreditCard className="w-6 h-6 stroke-white" strokeWidth={2} />;
    }
  };

  const getRewardGradient = (type: Reward["type"]) => {
    switch (type) {
      case "promo":
        return "from-brand-pink to-[#C70036]";
      case "reward":
        return "from-purple-500 to-purple-700";
      case "voucher":
        return "from-blue-500 to-blue-700";
    }
  };

  const handleApplyReward = (reward: Reward) => {
    if (!reward.isActive) {
      toast({
        title: "Reward expired",
        description: "This reward is no longer valid",
        variant: "destructive",
      });
      return;
    }

    navigator.clipboard.writeText(reward.code);
    toast({
      title: "Code copied!",
      description: `Use code ${reward.code} at checkout`,
    });
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
          Digital Wallet
        </h2>
      </div>

      <div className="px-6 pt-6 pb-4">
        <div className="flex gap-2 p-1 bg-[#F9FAFB] rounded-full">
          <button
            onClick={() => setActiveTab("active")}
            className={`flex-1 py-2.5 rounded-full text-sm font-normal tracking-[-0.15px] transition-all ${
              activeTab === "active"
                ? "bg-white text-gray-dark shadow-sm"
                : "text-gray-medium"
            }`}
          >
            Active ({activeRewards.length})
          </button>
          <button
            onClick={() => setActiveTab("expired")}
            className={`flex-1 py-2.5 rounded-full text-sm font-normal tracking-[-0.15px] transition-all ${
              activeTab === "expired"
                ? "bg-white text-gray-dark shadow-sm"
                : "text-gray-medium"
            }`}
          >
            Expired ({expiredRewards.length})
          </button>
        </div>
      </div>

      <div className="px-6 pb-8 flex flex-col gap-4">
        {displayedRewards.map((reward) => (
          <div
            key={reward.id}
            className={`rounded-2xl overflow-hidden ${
              !reward.isActive ? "opacity-60" : ""
            }`}
          >
            <div
              className={`bg-gradient-to-br ${getRewardGradient(reward.type)} p-6 text-white`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  {getRewardIcon(reward.type)}
                </div>
                <div className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm">
                  <span className="text-white text-xs font-normal">
                    {reward.value}
                  </span>
                </div>
              </div>

              <h3 className="text-white text-lg font-normal tracking-[-0.312px] mb-1">
                {reward.title}
              </h3>
              <p className="text-white/90 text-sm tracking-[-0.15px] mb-4">
                {reward.description}
              </p>

              <div className="flex items-center gap-2 text-white/90 text-xs">
                <Clock className="w-4 h-4" strokeWidth={2} />
                <span>Expires {reward.expiresAt}</span>
              </div>
            </div>

            <div className="bg-[#F9FAFB] p-4 flex gap-3">
              <button
                onClick={() => setSelectedReward(reward)}
                disabled={!reward.isActive}
                className="flex-1 py-3 bg-white border border-gray-border rounded-full text-gray-dark text-sm font-normal tracking-[-0.15px] flex items-center justify-center gap-2 hover:bg-gray-50 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <QrCode className="w-4 h-4" strokeWidth={2} />
                View QR Code
              </button>
              <button
                onClick={() => handleApplyReward(reward)}
                disabled={!reward.isActive}
                className="flex-1 py-3 bg-brand-pink text-white rounded-full text-sm font-normal tracking-[-0.15px] hover:bg-brand-pink/90 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Copy Code
              </button>
            </div>
          </div>
        ))}

        {displayedRewards.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-20 h-20 rounded-full bg-[#F9FAFB] flex items-center justify-center mb-4">
              <Gift className="w-10 h-10 stroke-gray-light" strokeWidth={1.5} />
            </div>
            <p className="text-gray-medium text-base mb-2">
              No {activeTab} rewards
            </p>
            <p className="text-[#6A7282] text-sm text-center">
              {activeTab === "active"
                ? "Your active rewards will appear here"
                : "Your expired rewards will appear here"}
            </p>
          </div>
        )}
      </div>

      {selectedReward && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6"
          onClick={() => setSelectedReward(null)}
        >
          <div
            className="bg-white rounded-2xl p-6 max-w-sm w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-gray-dark text-lg font-normal tracking-[-0.312px]">
                {selectedReward.title}
              </h3>
              <button
                onClick={() => setSelectedReward(null)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
              >
                ✕
              </button>
            </div>

            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white border-2 border-gray-border rounded-2xl">
                <QRCodeSVG value={selectedReward.code} size={200} />
              </div>
            </div>

            <div className="text-center mb-4">
              <p className="text-gray-medium text-sm tracking-[-0.15px] mb-2">
                Promo Code
              </p>
              <div className="px-4 py-3 bg-[#F9FAFB] rounded-lg">
                <p className="text-gray-dark text-lg font-mono tracking-wider">
                  {selectedReward.code}
                </p>
              </div>
            </div>

            {selectedReward.termsAndConditions && (
              <div className="mb-6">
                <p className="text-[#6A7282] text-xs tracking-[-0.15px] leading-5">
                  {selectedReward.termsAndConditions}
                </p>
              </div>
            )}

            <button
              onClick={() => {
                handleApplyReward(selectedReward);
                setSelectedReward(null);
              }}
              className="w-full py-3 bg-brand-pink text-white rounded-full text-sm font-normal tracking-[-0.15px] hover:bg-brand-pink/90 active:scale-95 transition-all"
            >
              Copy Code & Close
            </button>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
