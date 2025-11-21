import { BottomNav } from "@/components/BottomNav";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft, MapPin, CreditCard } from "lucide-react";

export default function OrderDetail() {
  const navigate = useNavigate();
  const { orderId } = useParams();

  const orderDetails = {
    "ORD-2024-001": {
      id: "ORD-2024-001",
      date: "December 15, 2024",
      status: "Delivered",
      deliveryDate: "December 18, 2024",
      items: [
        {
          id: 1,
          name: "Silk Blend Tunic",
          color: "Ivory",
          size: "M",
          quantity: 1,
          price: 89.50,
          image: "https://api.builder.io/api/v1/image/assets/TEMP/a8a2c6008052338846cae6bec260590dfa3e5cde?width=192",
        },
        {
          id: 2,
          name: "Cotton Summer Dress",
          color: "Navy",
          size: "S",
          quantity: 1,
          price: 90.00,
          image: "https://api.builder.io/api/v1/image/assets/TEMP/64dac7f003ea8759ac412708d9bdc40543b88157?width=860",
        },
      ],
      shipping: {
        name: "Jane Doe",
        address: "123 Fashion Street",
        city: "New York, NY 10001",
      },
      payment: {
        method: "Visa ending in 4242",
        amount: 179.50,
      },
    },
    "ORD-2024-002": {
      id: "ORD-2024-002",
      date: "December 10, 2024",
      status: "In Transit",
      deliveryDate: "December 20, 2024",
      items: [
        {
          id: 1,
          name: "Silk Blend Tunic",
          color: "Blush",
          size: "L",
          quantity: 1,
          price: 89.50,
          image: "https://api.builder.io/api/v1/image/assets/TEMP/64dac7f003ea8759ac412708d9bdc40543b88157?width=860",
        },
      ],
      shipping: {
        name: "Jane Doe",
        address: "123 Fashion Street",
        city: "New York, NY 10001",
      },
      payment: {
        method: "Visa ending in 4242",
        amount: 89.50,
      },
    },
    "ORD-2024-003": {
      id: "ORD-2024-003",
      date: "December 5, 2024",
      status: "Processing",
      deliveryDate: "December 22, 2024",
      items: [
        {
          id: 1,
          name: "Silk Blend Tunic",
          color: "Ivory",
          size: "M",
          quantity: 2,
          price: 89.50,
          image: "https://api.builder.io/api/v1/image/assets/TEMP/a8a2c6008052338846cae6bec260590dfa3e5cde?width=192",
        },
        {
          id: 2,
          name: "Summer Collection Top",
          color: "White",
          size: "M",
          quantity: 1,
          price: 66.00,
          image: "https://api.builder.io/api/v1/image/assets/TEMP/64dac7f003ea8759ac412708d9bdc40543b88157?width=860",
        },
      ],
      shipping: {
        name: "Jane Doe",
        address: "123 Fashion Street",
        city: "New York, NY 10001",
      },
      payment: {
        method: "Visa ending in 4242",
        amount: 245.00,
      },
    },
  };

  const order = orderDetails[orderId as keyof typeof orderDetails];

  if (!order) {
    return (
      <div className="min-h-screen bg-white pb-20">
        <div className="px-6 pt-14 pb-4 border-b border-gray-border flex items-center gap-4">
          <button
            onClick={() => navigate("/orders")}
            className="w-10 h-10 flex items-center justify-center"
          >
            <ChevronLeft className="w-6 h-6 stroke-gray-dark" strokeWidth={2} />
          </button>
          <h2 className="text-gray-dark text-base font-normal tracking-[-0.312px]">
            Order Details
          </h2>
        </div>
        <div className="flex flex-col items-center justify-center py-16 px-6">
          <p className="text-gray-medium text-base">Order not found</p>
        </div>
        <BottomNav />
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-green-50 text-green-600";
      case "In Transit":
        return "bg-blue-50 text-blue-600";
      case "Processing":
        return "bg-orange-50 text-orange-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const subtotal = order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 7.50;
  const tax = subtotal * 0.08;

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="px-6 pt-14 pb-4 border-b border-gray-border flex items-center gap-4">
        <button
          onClick={() => navigate("/orders")}
          className="w-10 h-10 flex items-center justify-center"
        >
          <ChevronLeft className="w-6 h-6 stroke-gray-dark" strokeWidth={2} />
        </button>
        <h2 className="text-gray-dark text-base font-normal tracking-[-0.312px]">
          Order Details
        </h2>
      </div>

      <div className="px-6 pt-6 pb-8 flex flex-col gap-6">
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-1">
            <p className="text-gray-dark text-base font-normal tracking-[-0.312px]">
              {order.id}
            </p>
            <p className="text-[#6A7282] text-sm tracking-[-0.15px]">
              Placed on {order.date}
            </p>
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-normal ${getStatusColor(order.status)}`}>
            {order.status}
          </div>
        </div>

        {order.status !== "Delivered" && (
          <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100">
            <p className="text-blue-600 text-sm font-normal tracking-[-0.15px]">
              Estimated delivery: {order.deliveryDate}
            </p>
          </div>
        )}

        <div className="border-t border-gray-border pt-6">
          <h3 className="text-gray-dark text-base font-normal tracking-[-0.312px] mb-4">
            Items
          </h3>
          <div className="flex flex-col gap-4">
            {order.items.map((item, index) => (
              <div key={index} className="flex gap-4">
                <div className="w-20 h-24 rounded-[10px] overflow-hidden flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-gray-dark text-base font-normal tracking-[-0.312px]">
                    {item.name}
                  </p>
                  <p className="text-[#6A7282] text-sm tracking-[-0.15px] mt-1">
                    {item.size} | {item.color} | Qty: {item.quantity}
                  </p>
                  <p className="text-brand-pink text-base font-normal tracking-[-0.312px] mt-2">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-border pt-6">
          <h3 className="text-gray-dark text-base font-normal tracking-[-0.312px] mb-4">
            Shipping Address
          </h3>
          <div className="flex gap-3 p-4 rounded-2xl bg-[#F9FAFB]">
            <MapPin className="w-6 h-6 stroke-gray-medium flex-shrink-0" strokeWidth={1.67} />
            <div className="flex flex-col gap-1">
              <p className="text-gray-dark text-base font-normal tracking-[-0.312px]">
                {order.shipping.name}
              </p>
              <p className="text-gray-medium text-sm tracking-[-0.15px]">
                {order.shipping.address}
              </p>
              <p className="text-gray-medium text-sm tracking-[-0.15px]">
                {order.shipping.city}
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-border pt-6">
          <h3 className="text-gray-dark text-base font-normal tracking-[-0.312px] mb-4">
            Payment Method
          </h3>
          <div className="flex gap-3 p-4 rounded-2xl bg-[#F9FAFB]">
            <CreditCard className="w-6 h-6 stroke-gray-medium flex-shrink-0" strokeWidth={1.67} />
            <div className="flex flex-col gap-1">
              <p className="text-gray-dark text-base font-normal tracking-[-0.312px]">
                {order.payment.method}
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-border pt-6">
          <h3 className="text-gray-dark text-base font-normal tracking-[-0.312px] mb-4">
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
                ${order.payment.amount.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
