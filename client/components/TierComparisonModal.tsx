import { X, Check } from "lucide-react";

interface TierComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface TierBenefit {
  feature: string;
  bronze: boolean | string;
  silver: boolean | string;
  gold: boolean | string;
}

export function TierComparisonModal({ isOpen, onClose }: TierComparisonModalProps) {
  if (!isOpen) return null;

  const benefits: TierBenefit[] = [
    {
      feature: "Points per $1 spent",
      bronze: "1x",
      silver: "1.5x",
      gold: "2x",
    },
    {
      feature: "Birthday reward",
      bronze: "$5",
      silver: "$10",
      gold: "$20",
    },
    {
      feature: "Free shipping",
      bronze: false,
      silver: "Over $50",
      gold: true,
    },
    {
      feature: "Early access to sales",
      bronze: false,
      silver: true,
      gold: true,
    },
    {
      feature: "Exclusive events",
      bronze: false,
      silver: false,
      gold: true,
    },
    {
      feature: "Priority support",
      bronze: false,
      silver: true,
      gold: true,
    },
    {
      feature: "Points never expire",
      bronze: false,
      silver: false,
      gold: true,
    },
  ];

  const renderBenefit = (value: boolean | string) => {
    if (typeof value === "boolean") {
      return value ? (
        <Check className="w-5 h-5 stroke-green-600 mx-auto" strokeWidth={2} />
      ) : (
        <span className="text-gray-light text-sm">—</span>
      );
    }
    return <span className="text-gray-dark text-sm font-normal">{value}</span>;
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-t-3xl sm:rounded-2xl w-full sm:max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-gray-border px-6 py-4 flex justify-between items-center">
          <h3 className="text-gray-dark text-lg font-normal tracking-[-0.312px]">
            Membership Tiers
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
          >
            <X className="w-5 h-5 stroke-gray-medium" strokeWidth={2} />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <div className="grid grid-cols-4 gap-3 mb-4">
              <div className="col-span-1"></div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-2">
                  <span className="text-orange-600 text-lg">🥉</span>
                </div>
                <p className="text-gray-dark text-sm font-normal">Bronze</p>
                <p className="text-[#6A7282] text-xs">$0-499</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mx-auto mb-2">
                  <span className="text-gray-600 text-lg">🥈</span>
                </div>
                <p className="text-gray-dark text-sm font-normal">Silver</p>
                <p className="text-[#6A7282] text-xs">$500-999</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center mx-auto mb-2">
                  <span className="text-yellow-600 text-lg">🥇</span>
                </div>
                <p className="text-gray-dark text-sm font-normal">Gold</p>
                <p className="text-[#6A7282] text-xs">$1000+</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="grid grid-cols-4 gap-3 items-center py-3 border-b border-gray-border last:border-0"
              >
                <div className="col-span-1">
                  <p className="text-gray-medium text-sm tracking-[-0.15px]">
                    {benefit.feature}
                  </p>
                </div>
                <div className="text-center">{renderBenefit(benefit.bronze)}</div>
                <div className="text-center">{renderBenefit(benefit.silver)}</div>
                <div className="text-center">{renderBenefit(benefit.gold)}</div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-brand-pink-light rounded-2xl">
            <p className="text-gray-dark text-sm tracking-[-0.15px] leading-5">
              💡 <strong>Tip:</strong> Your tier is based on annual spending. Points earned
              never expire for Gold members and can be redeemed for rewards anytime!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
