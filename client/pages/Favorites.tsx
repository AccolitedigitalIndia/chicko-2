import { BottomNav } from "@/components/BottomNav";
import { useFavorites } from "@/context/FavoritesContext";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { EmptyState } from "@/components/EmptyState";
import { QuickViewModal } from "@/components/QuickViewModal";
import { BackToTop } from "@/components/BackToTop";
import { Product } from "@shared/products";
import { useState } from "react";

export default function Favorites() {
  const { favorites } = useFavorites();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

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
          <EmptyState
            icon={Heart}
            title="Your wishlist is empty"
            description="Save your favorite items to view them here"
            action={
              <Link
                to="/shop"
                className="px-6 py-3 bg-brand-pink text-white rounded-full text-sm hover:bg-brand-burgundy transition-colors"
              >
                Start Shopping
              </Link>
            }
          />
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {favorites.map((item) => (
              <ProductCard
                key={item.id}
                product={item}
                onQuickView={setQuickViewProduct}
              />
            ))}
          </div>
        )}
      </div>

      <BottomNav />
      <BackToTop />
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}
