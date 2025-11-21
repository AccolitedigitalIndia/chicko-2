import { BottomNav } from "@/components/BottomNav";
import { useFavorites } from "@/context/FavoritesContext";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

export default function Favorites() {
  const { favorites, toggleFavorite } = useFavorites();

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="px-6 pt-14 pb-1 border-b border-gray-border">
        <h2 className="text-gray-dark text-base font-normal tracking-[-0.312px] mb-1">
          Wishlist
        </h2>
        <p className="text-[#6A7282] text-sm tracking-[-0.15px] mb-4">
          {favorites.length} {favorites.length === 1 ? "item" : "items"}
        </p>
      </div>

      <div className="px-6 py-6">
        {favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <Heart className="w-16 h-16 stroke-gray-light mb-4" strokeWidth={1.5} />
            <p className="text-gray-medium text-base mb-2">Your wishlist is empty</p>
            <p className="text-[#6A7282] text-sm text-center">
              Add items you love to your wishlist
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {favorites.map((item) => (
              <div key={item.id} className="flex flex-col">
                <Link to={`/product/${item.id}`} className="relative rounded-[10px] overflow-hidden mb-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full aspect-[183/244] object-cover"
                  />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleFavorite(item);
                    }}
                    className="absolute top-3 right-3 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center"
                  >
                    <Heart
                      className="w-5 h-5"
                      fill="#EC003F"
                      stroke="#EC003F"
                      strokeWidth={1.67}
                    />
                  </button>
                </Link>
                <Link to={`/product/${item.id}`}>
                  <h4 className="text-gray-dark text-base font-normal tracking-[-0.312px] mb-1">
                    {item.name}
                  </h4>
                  <p className="text-brand-pink text-base font-normal tracking-[-0.312px]">
                    ${item.price.toFixed(2)}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
