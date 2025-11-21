import { BottomNav } from "@/components/BottomNav";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, MapPin, Plus } from "lucide-react";
import { useState } from "react";

interface Address {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  isDefault: boolean;
}

export default function Addresses() {
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: "1",
      name: "Jane Doe",
      address: "123 Fashion Street",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      phone: "(555) 123-4567",
      isDefault: true,
    },
    {
      id: "2",
      name: "Jane Doe",
      address: "456 Style Avenue",
      city: "Brooklyn",
      state: "NY",
      zipCode: "11201",
      phone: "(555) 987-6543",
      isDefault: false,
    },
  ]);

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
          Addresses
        </h2>
      </div>

      <div className="px-6 pt-6 pb-8 flex flex-col gap-4">
        {addresses.map((address) => (
          <div
            key={address.id}
            className="p-4 rounded-2xl bg-[#F9FAFB] relative"
          >
            {address.isDefault && (
              <div className="absolute top-4 right-4 px-2 py-1 rounded-full bg-brand-pink-light">
                <span className="text-brand-pink text-xs font-normal">
                  Default
                </span>
              </div>
            )}

            <div className="flex gap-3">
              <MapPin
                className="w-6 h-6 stroke-gray-medium flex-shrink-0 mt-1"
                strokeWidth={1.67}
              />
              <div className="flex-1 flex flex-col gap-2 pr-16">
                <p className="text-gray-dark text-base font-normal tracking-[-0.312px]">
                  {address.name}
                </p>
                <p className="text-gray-medium text-sm tracking-[-0.15px]">
                  {address.address}
                </p>
                <p className="text-gray-medium text-sm tracking-[-0.15px]">
                  {address.city}, {address.state} {address.zipCode}
                </p>
                <p className="text-gray-medium text-sm tracking-[-0.15px]">
                  {address.phone}
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
            Add New Address
          </span>
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
