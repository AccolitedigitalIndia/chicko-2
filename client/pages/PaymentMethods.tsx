import { BottomNav } from "@/components/BottomNav";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, CreditCard, Plus } from "lucide-react";
import { useState } from "react";

interface PaymentMethod {
  id: string;
  type: "Visa" | "Mastercard" | "Amex";
  lastFour: string;
  expiryMonth: string;
  expiryYear: string;
  holderName: string;
  isDefault: boolean;
}

export default function PaymentMethods() {
  const navigate = useNavigate();
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: "1",
      type: "Visa",
      lastFour: "4242",
      expiryMonth: "12",
      expiryYear: "25",
      holderName: "Jane Doe",
      isDefault: true,
    },
    {
      id: "2",
      type: "Mastercard",
      lastFour: "8888",
      expiryMonth: "06",
      expiryYear: "26",
      holderName: "Jane Doe",
      isDefault: false,
    },
  ]);

  const getCardIcon = (type: PaymentMethod["type"]) => {
    return (
      <div className="w-12 h-8 rounded bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
        <span className="text-white text-xs font-bold">{type}</span>
      </div>
    );
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
          Payment Methods
        </h2>
      </div>

      <div className="px-6 pt-6 pb-8 flex flex-col gap-4">
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            className="p-4 rounded-2xl bg-[#F9FAFB] relative"
          >
            {method.isDefault && (
              <div className="absolute top-4 right-4 px-2 py-1 rounded-full bg-brand-pink-light">
                <span className="text-brand-pink text-xs font-normal">
                  Default
                </span>
              </div>
            )}

            <div className="flex gap-4">
              <div className="flex-shrink-0">{getCardIcon(method.type)}</div>
              <div className="flex-1 flex flex-col gap-2 pr-16">
                <p className="text-gray-dark text-base font-normal tracking-[-0.312px]">
                  {method.type} ending in {method.lastFour}
                </p>
                <p className="text-gray-medium text-sm tracking-[-0.15px]">
                  Expires {method.expiryMonth}/{method.expiryYear}
                </p>
                <p className="text-gray-medium text-sm tracking-[-0.15px]">
                  {method.holderName}
                </p>
              </div>
            </div>

            <div className="flex gap-2 mt-4 pt-4 border-t border-gray-border">
              <button className="flex-1 py-2 px-4 rounded-full border-2 border-gray-border text-gray-dark text-sm font-normal tracking-[-0.15px]">
                Edit
              </button>
              <button className="flex-1 py-2 px-4 rounded-full border-2 border-gray-border text-gray-dark text-sm font-normal tracking-[-0.15px]">
                Remove
              </button>
            </div>
          </div>
        ))}

        <button className="flex items-center justify-center gap-2 p-4 rounded-2xl border-2 border-dashed border-gray-border">
          <Plus className="w-5 h-5 stroke-brand-pink" strokeWidth={2} />
          <span className="text-brand-pink text-base font-normal tracking-[-0.312px]">
            Add New Card
          </span>
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
