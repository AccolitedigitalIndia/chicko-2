import { BottomNav } from "@/components/BottomNav";
import { useCart } from "@/context/CartContext";
import { useNavigate } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";

export default function Bag() {
  const navigate = useNavigate();
  const { items, updateQuantity, removeFromCart, getSubtotal, getTotalItems } =
    useCart();

  const subtotal = getSubtotal();
  const shipping = 7.5;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="px-6 pt-14 pb-1 border-b border-gray-border">
        <h2 className="text-gray-dark text-base font-normal tracking-[-0.312px] mb-1">
          Shopping Bag
        </h2>
        <p className="text-[#6A7282] text-sm tracking-[-0.15px] mb-4">
          {getTotalItems()} {getTotalItems() === 1 ? "item" : "items"}
        </p>
      </div>

      <div className="px-6 py-4">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <p className="text-gray-medium text-base mb-2">Your bag is empty</p>
            <p className="text-[#6A7282] text-sm text-center">
              Add items to get started
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {items.map((item) => (
              <div
                key={`${item.id}-${item.size}-${item.color}`}
                className="flex gap-4"
              >
                <div className="w-24 h-32 rounded-[10px] overflow-hidden flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 flex flex-col gap-1">
                  <div className="flex justify-between items-start">
                    <h3 className="text-gray-dark text-base font-normal tracking-[-0.312px]">
                      {item.name}
                    </h3>
                    <button
                      onClick={() =>
                        removeFromCart(item.id, item.size, item.color)
                      }
                      className="w-5 h-6 flex items-center justify-center"
                    >
                      <Trash2
                        className="w-5 h-5 stroke-gray-light"
                        strokeWidth={1.67}
                      />
                    </button>
                  </div>

                  <p className="text-[#6A7282] text-sm tracking-[-0.15px]">
                    Size: {item.size} | Color: {item.color}
                  </p>

                  <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center gap-3 bg-[#F3F4F6] rounded-full px-3 h-8">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            item.size,
                            item.color,
                            item.quantity - 1,
                          )
                        }
                        className="w-4 h-4 flex items-center justify-center"
                      >
                        <Minus
                          className="w-4 h-4 stroke-gray-medium"
                          strokeWidth={1.33}
                        />
                      </button>
                      <span className="text-gray-dark text-base font-normal tracking-[-0.312px] min-w-[8px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            item.size,
                            item.color,
                            item.quantity + 1,
                          )
                        }
                        className="w-4 h-4 flex items-center justify-center"
                      >
                        <Plus
                          className="w-4 h-4 stroke-gray-medium"
                          strokeWidth={1.33}
                        />
                      </button>
                    </div>
                    <p className="text-brand-pink text-base font-normal tracking-[-0.312px]">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {items.length > 0 && (
        <div className="px-6 pt-6 border-t border-gray-border flex flex-col gap-4">
          <h3 className="text-gray-dark text-base font-normal tracking-[-0.312px]">
            Order Summary
          </h3>

          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-medium text-base font-normal tracking-[-0.312px]">
                Subtotal
              </span>
              <span className="text-gray-medium text-base font-normal tracking-[-0.312px]">
                ${subtotal.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-medium text-base font-normal tracking-[-0.312px]">
                Shipping
              </span>
              <span className="text-gray-medium text-base font-normal tracking-[-0.312px]">
                ${shipping.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-medium text-base font-normal tracking-[-0.312px]">
                Tax
              </span>
              <span className="text-gray-medium text-base font-normal tracking-[-0.312px]">
                ${tax.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-gray-border">
              <span className="text-gray-dark text-base font-normal tracking-[-0.312px]">
                Total
              </span>
              <span className="text-gray-dark text-base font-normal tracking-[-0.312px]">
                ${total.toFixed(2)}
              </span>
            </div>
          </div>

          <button
            onClick={() => navigate("/checkout")}
            className="w-full py-4 bg-brand-pink text-white rounded-full text-base font-normal tracking-[-0.312px]"
          >
            Proceed to Checkout
          </button>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
