import { BottomNav } from "@/components/BottomNav";
import { useCart } from "@/context/CartContext";
import { useNavigate, Link } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { EmptyState } from "@/components/EmptyState";
import { BackToTop } from "@/components/BackToTop";

export default function Bag() {
  const navigate = useNavigate();
  const { items, updateQuantity, removeFromCart, getSubtotal, getTotalItems } =
    useCart();

  const subtotal = getSubtotal();
  const shipping = subtotal > 75 ? 0 : 7.5;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;
  const freeShippingThreshold = 75;
  const remainingForFreeShipping = freeShippingThreshold - subtotal;

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

      {items.length > 0 && remainingForFreeShipping > 0 && (
        <div className="mx-6 mt-4 px-4 py-3 bg-brand-pink-light border border-brand-pink/20 rounded-lg">
          <p className="text-sm text-brand-burgundy">
            Add{" "}
            <span className="font-medium">
              ${remainingForFreeShipping.toFixed(2)}
            </span>{" "}
            more for free shipping!
          </p>
          <div className="mt-2 h-2 bg-white rounded-full overflow-hidden">
            <div
              className="h-full bg-brand-pink transition-all duration-300"
              style={{
                width: `${Math.min((subtotal / freeShippingThreshold) * 100, 100)}%`,
              }}
            />
          </div>
        </div>
      )}

      <div className="px-6 py-4">
        {items.length === 0 ? (
          <EmptyState
            icon={ShoppingBag}
            title="Your bag is empty"
            description="Add items to get started on your shopping journey"
            action={
              <Link
                to="/shop"
                className="px-6 py-3 bg-brand-pink text-white rounded-full text-sm hover:bg-brand-burgundy transition-colors"
              >
                Continue Shopping
              </Link>
            }
          />
        ) : (
          <div className="flex flex-col gap-4">
            {items.map((item) => (
              <div
                key={`${item.id}-${item.size}-${item.color}`}
                className="flex gap-4 group"
              >
                <Link
                  to={`/product/${item.id}`}
                  className="w-24 h-32 rounded-[10px] overflow-hidden flex-shrink-0 bg-gray-100"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </Link>

                <div className="flex-1 flex flex-col gap-1">
                  <div className="flex justify-between items-start">
                    <Link to={`/product/${item.id}`}>
                      <h3 className="text-gray-dark text-base font-normal tracking-[-0.312px] hover:text-brand-pink transition-colors">
                        {item.name}
                      </h3>
                    </Link>
                    <button
                      onClick={() =>
                        removeFromCart(item.id, item.size, item.color)
                      }
                      className="w-8 h-8 flex items-center justify-center hover:bg-red-50 rounded-full transition-colors group/delete"
                      aria-label="Remove item"
                    >
                      <Trash2
                        className="w-5 h-5 stroke-gray-light group-hover/delete:stroke-red-500 transition-colors"
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
                        className="w-5 h-5 flex items-center justify-center hover:bg-white rounded-full transition-all active:scale-90"
                        aria-label="Decrease quantity"
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
                        className="w-5 h-5 flex items-center justify-center hover:bg-white rounded-full transition-all active:scale-90"
                        aria-label="Increase quantity"
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
                {shipping === 0 ? (
                  <span className="text-green-600 font-medium">FREE</span>
                ) : (
                  `$${shipping.toFixed(2)}`
                )}
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
              <span className="text-gray-dark text-lg font-medium tracking-[-0.312px]">
                Total
              </span>
              <span className="text-gray-dark text-lg font-medium tracking-[-0.312px]">
                ${total.toFixed(2)}
              </span>
            </div>
          </div>

          <button
            onClick={() => navigate("/checkout")}
            className="w-full py-4 bg-brand-pink text-white rounded-full text-base font-normal tracking-[-0.312px] hover:bg-brand-burgundy transition-all active:scale-98"
          >
            Proceed to Checkout
          </button>
        </div>
      )}

      <BottomNav />
      <BackToTop />
    </div>
  );
}
