import { X, MapPin, Check, Navigation } from "lucide-react";
import { useState } from "react";

export interface StoreLocation {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  distance: string;
  hasStock: boolean;
  pickupAvailable: boolean;
}

interface StorePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectStore: (store: StoreLocation) => void;
  selectedStore?: StoreLocation | null;
}

export function StorePickerModal({
  isOpen,
  onClose,
  onSelectStore,
  selectedStore,
}: StorePickerModalProps) {
  if (!isOpen) return null;

  const [localSelectedStore, setLocalSelectedStore] = useState<StoreLocation | null>(
    selectedStore || null
  );

  const stores: StoreLocation[] = [
    {
      id: "1",
      name: "Downtown Store",
      address: "123 Main Street",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      distance: "0.5 mi",
      hasStock: true,
      pickupAvailable: true,
    },
    {
      id: "2",
      name: "Uptown Store",
      address: "456 Broadway Ave",
      city: "New York",
      state: "NY",
      zipCode: "10023",
      distance: "2.3 mi",
      hasStock: true,
      pickupAvailable: true,
    },
    {
      id: "3",
      name: "Brooklyn Store",
      address: "789 Bedford Ave",
      city: "Brooklyn",
      state: "NY",
      zipCode: "11211",
      distance: "3.8 mi",
      hasStock: false,
      pickupAvailable: false,
    },
  ];

  const handleConfirm = () => {
    if (localSelectedStore) {
      onSelectStore(localSelectedStore);
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-t-3xl sm:rounded-2xl w-full sm:max-w-lg max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-gray-border px-6 py-4 flex justify-between items-center">
          <h3 className="text-gray-dark text-lg font-normal tracking-[-0.312px]">
            Select Pickup Store
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
          >
            <X className="w-5 h-5 stroke-gray-medium" strokeWidth={2} />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-4">
            <p className="text-gray-medium text-sm tracking-[-0.15px] mb-3">
              Choose a store for pickup. We'll notify you when your order is ready.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {stores.map((store) => (
              <button
                key={store.id}
                onClick={() => setLocalSelectedStore(store)}
                disabled={!store.pickupAvailable}
                className={`p-4 rounded-2xl border-2 transition-all text-left ${
                  localSelectedStore?.id === store.id
                    ? "border-brand-pink bg-brand-pink-light"
                    : store.pickupAvailable
                    ? "border-gray-border hover:border-gray-300"
                    : "border-gray-border opacity-50 cursor-not-allowed"
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-gray-dark text-base font-normal tracking-[-0.312px]">
                        {store.name}
                      </h4>
                      {localSelectedStore?.id === store.id && (
                        <Check
                          className="w-5 h-5 stroke-brand-pink flex-shrink-0"
                          strokeWidth={2}
                        />
                      )}
                    </div>
                    <div className="flex items-start gap-1 text-[#6A7282] text-sm tracking-[-0.15px]">
                      <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" strokeWidth={2} />
                      <div>
                        <p>{store.address}</p>
                        <p>
                          {store.city}, {store.state} {store.zipCode}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="ml-4 text-right flex-shrink-0">
                    <p className="text-brand-pink text-sm font-normal tracking-[-0.15px] mb-1">
                      {store.distance}
                    </p>
                    {store.hasStock ? (
                      <span className="inline-block px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                        In Stock
                      </span>
                    ) : (
                      <span className="inline-block px-2 py-1 bg-gray-200 text-gray-600 text-xs rounded-full">
                        Out of Stock
                      </span>
                    )}
                  </div>
                </div>

                {store.pickupAvailable && (
                  <div className="mt-3 pt-3 border-t border-gray-border">
                    <p className="text-gray-medium text-xs tracking-[-0.15px]">
                      ✓ Pickup available today
                    </p>
                  </div>
                )}
              </button>
            ))}
          </div>

          <div className="mt-6 flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 bg-white border border-gray-border text-gray-dark rounded-full text-sm font-normal tracking-[-0.15px] hover:bg-gray-50 active:scale-95 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={!localSelectedStore}
              className="flex-1 py-3 bg-brand-pink text-white rounded-full text-sm font-normal tracking-[-0.15px] hover:bg-brand-pink/90 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Confirm Store
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
