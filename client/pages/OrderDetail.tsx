import { BottomNav } from "@/components/BottomNav";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft, MapPin, CreditCard } from "lucide-react";
import { products } from "@shared/products";

export default function OrderDetail() {
  const navigate = useNavigate();
  const { orderId } = useParams();

  const orderDetails = {
    "ORD-2024-001": {
      id: "ORD-2024-001",
      date: "December 15, 2024",
      status: "Delivered",
      deliveryDate: "December 18, 2024",
      timeline: [
        {
          status: "Order Received",
          date: "Dec 15, 2024",
          time: "10:30 AM",
          completed: true,
        },
        {
          status: "Packed",
          date: "Dec 15, 2024",
          time: "2:45 PM",
          completed: true,
        },
        {
          status: "Shipped",
          date: "Dec 16, 2024",
          time: "9:15 AM",
          completed: true,
        },
        {
          status: "In Transit",
          date: "Dec 17, 2024",
          time: "8:20 AM",
          completed: true,
        },
        {
          status: "Out for Delivery",
          date: "Dec 18, 2024",
          time: "7:00 AM",
          completed: true,
        },
        {
          status: "Delivered",
          date: "Dec 18, 2024",
          time: "3:30 PM",
          completed: true,
        },
      ],
      items: [
        {
          id: 1,
          name: products[0].name,
          color: products[0].colors[0],
          size: "M",
          quantity: 1,
          price: products[0].price,
          image: products[0].image,
        },
        {
          id: 2,
          name: products[1].name,
          color: products[1].colors[1],
          size: "S",
          quantity: 1,
          price: products[1].price,
          image: products[1].image,
        },
      ],
      shipping: {
        name: "Jane Doe",
        address: "123 Fashion Street",
        city: "New York, NY 10001",
      },
      payment: {
        method: "Visa ending in 4242",
        amount: 179.5,
      },
    },
    "ORD-2024-002": {
      id: "ORD-2024-002",
      date: "December 10, 2024",
      status: "In Transit",
      deliveryDate: "December 20, 2024",
      timeline: [
        {
          status: "Order Received",
          date: "Dec 10, 2024",
          time: "11:20 AM",
          completed: true,
        },
        {
          status: "Packed",
          date: "Dec 10, 2024",
          time: "4:15 PM",
          completed: true,
        },
        {
          status: "Shipped",
          date: "Dec 11, 2024",
          time: "8:45 AM",
          completed: true,
        },
        {
          status: "In Transit",
          date: "Dec 12, 2024",
          time: "6:30 AM",
          completed: true,
        },
        { status: "Out for Delivery", date: "", time: "", completed: false },
        { status: "Delivered", date: "", time: "", completed: false },
      ],
      items: [
        {
          id: 1,
          name: products[4].name,
          color: products[4].colors[0],
          size: "L",
          quantity: 1,
          price: products[4].price,
          image: products[4].image,
        },
      ],
      shipping: {
        name: "Jane Doe",
        address: "123 Fashion Street",
        city: "New York, NY 10001",
      },
      payment: {
        method: "Visa ending in 4242",
        amount: 149.0,
      },
    },
    "ORD-2024-003": {
      id: "ORD-2024-003",
      date: "December 5, 2024",
      status: "Processing",
      deliveryDate: "December 22, 2024",
      timeline: [
        {
          status: "Order Received",
          date: "Dec 5, 2024",
          time: "3:45 PM",
          completed: true,
        },
        {
          status: "Packed",
          date: "Dec 6, 2024",
          time: "10:30 AM",
          completed: true,
        },
        { status: "Shipped", date: "", time: "", completed: false },
        { status: "In Transit", date: "", time: "", completed: false },
        { status: "Out for Delivery", date: "", time: "", completed: false },
        { status: "Delivered", date: "", time: "", completed: false },
      ],
      items: [
        {
          id: 1,
          name: products[3].name,
          color: products[3].colors[0],
          size: products[3].sizes[0],
          quantity: 1,
          price: products[3].price,
          image: products[3].image,
        },
        {
          id: 2,
          name: products[2].name,
          color: products[2].colors[1],
          size: "M",
          quantity: 1,
          price: products[2].price,
          image: products[2].image,
        },
      ],
      shipping: {
        name: "Jane Doe",
        address: "123 Fashion Street",
        city: "New York, NY 10001",
      },
      payment: {
        method: "Visa ending in 4242",
        amount: 174.5,
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

  const subtotal = order.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping = 7.5;
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
          <div
            className={`px-3 py-1 rounded-full text-xs font-normal ${getStatusColor(order.status)}`}
          >
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
            Order Tracking
          </h3>
          <div className="flex flex-col gap-0">
            {order.timeline.map((step, index) => (
              <div key={index} className="flex gap-4 relative">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center z-10 ${
                      step.completed ? "bg-brand-pink" : "bg-gray-border"
                    }`}
                  >
                    {step.completed ? (
                      <svg
                        className="w-5 h-5 text-white"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M5 13l4 4L19 7"></path>
                      </svg>
                    ) : (
                      <div className="w-3 h-3 rounded-full bg-white"></div>
                    )}
                  </div>
                  {index < order.timeline.length - 1 && (
                    <div
                      className={`w-0.5 h-16 ${
                        step.completed ? "bg-brand-pink" : "bg-gray-border"
                      }`}
                    ></div>
                  )}
                </div>
                <div
                  className={`flex-1 ${index < order.timeline.length - 1 ? "pb-6" : ""}`}
                >
                  <p
                    className={`text-base font-normal tracking-[-0.312px] ${
                      step.completed ? "text-gray-dark" : "text-gray-light"
                    }`}
                  >
                    {step.status}
                  </p>
                  {step.completed && step.date && (
                    <p className="text-[#6A7282] text-sm tracking-[-0.15px] mt-1">
                      {step.date} at {step.time}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

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
            <MapPin
              className="w-6 h-6 stroke-gray-medium flex-shrink-0"
              strokeWidth={1.67}
            />
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
            <CreditCard
              className="w-6 h-6 stroke-gray-medium flex-shrink-0"
              strokeWidth={1.67}
            />
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
