import { BottomNav } from "@/components/BottomNav";
import { useCart } from "@/context/CartContext";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { OptimizedImage } from "@/components/OptimizedImage";

export default function Checkout() {
  const navigate = useNavigate();
  const { items, getSubtotal, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const subtotal = getSubtotal();
  const shipping = 7.5;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.address ||
      !formData.city ||
      !formData.zipCode ||
      !formData.cardNumber ||
      !formData.expiryDate ||
      !formData.cvv
    ) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setOrderComplete(true);
      clearCart();

      toast({
        title: "Order placed successfully",
        description: "Your order has been confirmed",
      });

      setTimeout(() => {
        navigate("/");
      }, 2000);
    }, 1500);
  };

  if (items.length === 0 && !orderComplete) {
    return (
      <div className="min-h-screen bg-white pb-20">
        <div className="px-6 pt-14 pb-4 border-b border-gray-border flex items-center gap-4">
          <button
            onClick={() => navigate("/bag")}
            className="w-10 h-10 flex items-center justify-center"
          >
            <ChevronLeft className="w-6 h-6 stroke-gray-dark" strokeWidth={2} />
          </button>
          <h2 className="text-gray-dark text-base font-normal tracking-[-0.312px]">
            Checkout
          </h2>
        </div>

        <div className="flex flex-col items-center justify-center py-16 px-6">
          <p className="text-gray-medium text-base mb-2">Your bag is empty</p>
          <p className="text-[#6A7282] text-sm text-center mb-6">
            Add items to checkout
          </p>
          <button
            onClick={() => navigate("/shop")}
            className="px-6 py-3 bg-brand-pink text-white rounded-full text-base font-normal tracking-[-0.312px]"
          >
            Continue Shopping
          </button>
        </div>

        <BottomNav />
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-white pb-20 flex flex-col items-center justify-center px-6">
        <div className="w-20 h-20 rounded-full bg-brand-pink-light flex items-center justify-center mb-6">
          <svg
            className="w-10 h-10 text-brand-pink"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M5 13l4 4L19 7"></path>
          </svg>
        </div>

        <h2 className="text-gray-dark text-xl font-normal tracking-[-0.312px] mb-2 text-center">
          Order Placed Successfully!
        </h2>

        <p className="text-gray-medium text-base text-center mb-8">
          Thank you for your purchase. You will receive a confirmation email
          shortly.
        </p>

        <button
          onClick={() => navigate("/")}
          className="px-8 py-4 bg-brand-pink text-white rounded-full text-base font-normal tracking-[-0.312px]"
        >
          Continue Shopping
        </button>

        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="px-6 pt-14 pb-4 border-b border-gray-border flex items-center gap-4">
        <button
          onClick={() => navigate("/bag")}
          className="w-10 h-10 flex items-center justify-center"
        >
          <ChevronLeft className="w-6 h-6 stroke-gray-dark" strokeWidth={2} />
        </button>
        <h2 className="text-gray-dark text-base font-normal tracking-[-0.312px]">
          Checkout
        </h2>
      </div>

      <form onSubmit={handlePlaceOrder} className="px-6 pt-6 pb-8">
        <div className="flex flex-col gap-6">
          <div>
            <h3 className="text-gray-dark text-base font-normal tracking-[-0.312px] mb-4">
              Shipping Information
            </h3>
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-[#6A7282] text-sm tracking-[-0.15px] mb-2 block">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-border rounded-[10px] text-gray-dark text-base font-normal tracking-[-0.312px] focus:outline-none focus:border-brand-pink"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="text-[#6A7282] text-sm tracking-[-0.15px] mb-2 block">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-border rounded-[10px] text-gray-dark text-base font-normal tracking-[-0.312px] focus:outline-none focus:border-brand-pink"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="text-[#6A7282] text-sm tracking-[-0.15px] mb-2 block">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-border rounded-[10px] text-gray-dark text-base font-normal tracking-[-0.312px] focus:outline-none focus:border-brand-pink"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label className="text-[#6A7282] text-sm tracking-[-0.15px] mb-2 block">
                  Address *
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-border rounded-[10px] text-gray-dark text-base font-normal tracking-[-0.312px] focus:outline-none focus:border-brand-pink"
                  placeholder="Street address"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[#6A7282] text-sm tracking-[-0.15px] mb-2 block">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-border rounded-[10px] text-gray-dark text-base font-normal tracking-[-0.312px] focus:outline-none focus:border-brand-pink"
                    placeholder="City"
                  />
                </div>

                <div>
                  <label className="text-[#6A7282] text-sm tracking-[-0.15px] mb-2 block">
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-border rounded-[10px] text-gray-dark text-base font-normal tracking-[-0.312px] focus:outline-none focus:border-brand-pink"
                    placeholder="State"
                  />
                </div>
              </div>

              <div>
                <label className="text-[#6A7282] text-sm tracking-[-0.15px] mb-2 block">
                  ZIP Code *
                </label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-border rounded-[10px] text-gray-dark text-base font-normal tracking-[-0.312px] focus:outline-none focus:border-brand-pink"
                  placeholder="ZIP Code"
                />
              </div>
            </div>
          </div>

          <div className="border-t border-gray-border pt-6">
            <h3 className="text-gray-dark text-base font-normal tracking-[-0.312px] mb-4">
              Payment Information
            </h3>
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-[#6A7282] text-sm tracking-[-0.15px] mb-2 block">
                  Card Number *
                </label>
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  maxLength={16}
                  className="w-full px-4 py-3 border-2 border-gray-border rounded-[10px] text-gray-dark text-base font-normal tracking-[-0.312px] focus:outline-none focus:border-brand-pink"
                  placeholder="1234 5678 9012 3456"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[#6A7282] text-sm tracking-[-0.15px] mb-2 block">
                    Expiry Date *
                  </label>
                  <input
                    type="text"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    placeholder="MM/YY"
                    maxLength={5}
                    className="w-full px-4 py-3 border-2 border-gray-border rounded-[10px] text-gray-dark text-base font-normal tracking-[-0.312px] focus:outline-none focus:border-brand-pink"
                  />
                </div>

                <div>
                  <label className="text-[#6A7282] text-sm tracking-[-0.15px] mb-2 block">
                    CVV *
                  </label>
                  <input
                    type="text"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    maxLength={3}
                    className="w-full px-4 py-3 border-2 border-gray-border rounded-[10px] text-gray-dark text-base font-normal tracking-[-0.312px] focus:outline-none focus:border-brand-pink"
                    placeholder="123"
                  />
                </div>
              </div>

              <div>
                <label className="text-[#6A7282] text-sm tracking-[-0.15px] mb-2 block">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  name="cardName"
                  value={formData.cardName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-border rounded-[10px] text-gray-dark text-base font-normal tracking-[-0.312px] focus:outline-none focus:border-brand-pink"
                  placeholder="Name on card"
                />
              </div>
            </div>
          </div>

          <div className="border-t border-gray-border pt-6">
            <h3 className="text-gray-dark text-base font-normal tracking-[-0.312px] mb-4">
              Order Summary
            </h3>

            <div className="flex flex-col gap-3 mb-4">
              {items.map((item) => (
                <div
                  key={`${item.id}-${item.size}-${item.color}`}
                  className="flex gap-3"
                >
                  <div className="w-16 h-20 rounded-[10px] overflow-hidden flex-shrink-0 relative bg-gray-100">
                    <OptimizedImage
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-dark text-sm font-normal tracking-[-0.15px]">
                      {item.name}
                    </p>
                    <p className="text-[#6A7282] text-xs tracking-[-0.15px]">
                      {item.size} | {item.color} | Qty: {item.quantity}
                    </p>
                    <p className="text-brand-pink text-sm font-normal tracking-[-0.15px] mt-1">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3 border-t border-gray-border pt-4">
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
          </div>

          <button
            type="submit"
            disabled={isProcessing}
            className="w-full py-4 bg-brand-pink text-white rounded-full text-base font-normal tracking-[-0.312px] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? "Processing..." : "Place Order"}
          </button>
        </div>
      </form>

      <BottomNav />
    </div>
  );
}
