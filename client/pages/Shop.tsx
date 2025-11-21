import { BottomNav } from "@/components/BottomNav";
import { Link } from "react-router-dom";
import { Search, SlidersHorizontal, Heart } from "lucide-react";
import { useState } from "react";
import { useFavorites } from "@/context/FavoritesContext";

export default function Shop() {
  const [activeFilter, setActiveFilter] = useState("All");
  const { toggleFavorite, isFavorite } = useFavorites();

  const filters = ["All", "New", "Dresses", "Tops", "Jackets", "Accessories"];

  const products = [
    {
      id: 1,
      name: "Silk Blend Tunic",
      price: 89.50,
      image: "https://api.builder.io/api/v1/image/assets/TEMP/8af39074281630082168c452fc72bdaf2138be53?width=366",
    },
    {
      id: 2,
      name: "Classic Wrap Dress",
      price: 119.00,
      image: "https://api.builder.io/api/v1/image/assets/TEMP/2ddc134b0c58a62bf03b2ecd3b5e270e5274f2e9?width=366",
    },
    {
      id: 3,
      name: "Statement Blazer",
      price: 149.00,
      image: "https://api.builder.io/api/v1/image/assets/TEMP/f67f230abffed2738ae3cbc3d943655440eb1c74?width=366",
    },
    {
      id: 4,
      name: "Artisan Necklace",
      price: 45.00,
      image: "https://api.builder.io/api/v1/image/assets/TEMP/49a02839c723043613b28fac743b3b2ce108ed73?width=366",
    },
    {
      id: 5,
      name: "Relaxed Linen Set",
      price: 129.00,
      image: "https://api.builder.io/api/v1/image/assets/TEMP/791488612b362212273f22e8ab46080f3cebb267?width=366",
    },
    {
      id: 6,
      name: "Embroidered Top",
      price: 79.50,
      image: "https://api.builder.io/api/v1/image/assets/TEMP/8af39074281630082168c452fc72bdaf2138be53?width=366",
    },
  ];

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="px-6 pt-14 pb-8 flex flex-col gap-4">
        <h2 className="text-gray-dark text-base font-normal tracking-[-0.312px]">
          Shop
        </h2>

        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 stroke-gray-light" strokeWidth={1.67} />
          <input
            type="text"
            placeholder="Search for styles..."
            className="w-full h-[50px] pl-12 pr-14 rounded-full border border-gray-border bg-[#F9FAFB] text-base tracking-[-0.312px] placeholder:text-black/50 focus:outline-none focus:ring-2 focus:ring-brand-pink/20"
          />
          <button className="absolute right-4 top-1/2 -translate-y-1/2">
            <SlidersHorizontal className="w-5 h-5 stroke-gray-medium" strokeWidth={1.67} />
          </button>
        </div>

        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2 rounded-full text-base font-normal tracking-[-0.312px] whitespace-nowrap ${
                activeFilter === filter
                  ? "bg-brand-pink text-white"
                  : "bg-[#F3F4F6] text-[#364153]"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="px-6 pb-8">
        <p className="text-[#6A7282] text-sm tracking-[-0.15px] mb-4">
          {products.length} items
        </p>

        <div className="grid grid-cols-2 gap-4">
          {products.map((product) => {
            const isFav = isFavorite(product.id);
            return (
              <Link key={product.id} to={`/product/${product.id}`} className="flex flex-col">
                <div className="relative rounded-[10px] overflow-hidden mb-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full aspect-[183/244] object-cover"
                  />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleFavorite(product);
                    }}
                    className="absolute top-3 right-3 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center"
                  >
                    <Heart
                      className="w-5 h-5"
                      fill={isFav ? "#EC003F" : "none"}
                      stroke={isFav ? "#EC003F" : "#4A5565"}
                      strokeWidth={1.67}
                    />
                  </button>
                </div>
                <h4 className="text-gray-dark text-base font-normal tracking-[-0.312px] mb-1">
                  {product.name}
                </h4>
                <p className="text-brand-pink text-base font-normal tracking-[-0.312px]">
                  ${product.price.toFixed(2)}
                </p>
              </Link>
            );
          })}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
