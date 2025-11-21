import { BottomNav } from "@/components/BottomNav";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Package } from "lucide-react";
import { products } from "@shared/products";

interface Order {
  id: string;
  date: string;
  status: "Delivered" | "In Transit" | "Processing";
  total: number;
  items: number;
  image: string;
}

export default function Orders() {
  const navigate = useNavigate();

  const orders: Order[] = [
    {
      id: "ORD-2024-001",
      date: "Dec 15, 2024",
      status: "Delivered",
      total: 218.50,
      items: 2,
      image: products[0].image,
    },
    {
      id: "ORD-2024-002",
      date: "Dec 10, 2024",
      status: "In Transit",
      total: 149.00,
      items: 1,
      image: products[4].image,
    },
    {
      id: "ORD-2024-003",
      date: "Dec 5, 2024",
      status: "Processing",
      total: 264.50,
      items: 2,
      image: products[5].image,
    },
  ];

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "Delivered":
        return "bg-green-50 text-green-600";
      case "In Transit":
        return "bg-blue-50 text-blue-600";
      case "Processing":
        return "bg-orange-50 text-orange-600";
    }
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
          My Orders
        </h2>
      </div>

      <div className="px-6 pt-6 pb-8 flex flex-col gap-4">
        {orders.map((order) => (
          <button
            key={order.id}
            onClick={() => navigate(`/orders/${order.id}`)}
            className="flex gap-4 p-4 rounded-2xl bg-[#F9FAFB] text-left"
          >
            <div className="w-20 h-24 rounded-[10px] overflow-hidden flex-shrink-0">
              <img
                src={order.image}
                alt="Order"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 flex flex-col gap-2">
              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-1">
                  <p className="text-gray-dark text-base font-normal tracking-[-0.312px]">
                    {order.id}
                  </p>
                  <p className="text-[#6A7282] text-sm tracking-[-0.15px]">
                    {order.date} • {order.items} {order.items === 1 ? "item" : "items"}
                  </p>
                </div>
                <ChevronLeft className="w-5 h-5 stroke-gray-light rotate-180" strokeWidth={1.67} />
              </div>

              <div className="flex justify-between items-center">
                <div className={`px-3 py-1 rounded-full text-xs font-normal ${getStatusColor(order.status)}`}>
                  {order.status}
                </div>
                <p className="text-brand-pink text-base font-normal tracking-[-0.312px]">
                  ${order.total.toFixed(2)}
                </p>
              </div>
            </div>
          </button>
        ))}

        {orders.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-20 h-20 rounded-full bg-[#F9FAFB] flex items-center justify-center mb-4">
              <Package className="w-10 h-10 stroke-gray-light" strokeWidth={1.5} />
            </div>
            <p className="text-gray-medium text-base mb-2">No orders yet</p>
            <p className="text-[#6A7282] text-sm text-center">
              Your order history will appear here
            </p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
