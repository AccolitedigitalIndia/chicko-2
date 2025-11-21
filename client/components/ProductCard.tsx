import { Link } from "react-router-dom";
import { Heart, Eye } from "lucide-react";
import { Product } from "@shared/products";
import { useFavorites } from "@/context/FavoritesContext";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export function ProductCard({ product, onQuickView }: ProductCardProps) {
  const { toggleFavorite, isFavorite } = useFavorites();
  const isFav = isFavorite(product.id);
  const [imageLoaded, setImageLoaded] = useState(false);
  const displayPrice = product.onSale && product.salePrice ? product.salePrice : product.price;
  const hasDiscount = product.onSale && product.salePrice;

  return (
    <div className="flex flex-col group">
      <Link
        to={`/product/${product.id}`}
        className="relative rounded-[10px] overflow-hidden mb-3 bg-gray-100"
      >
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse" />
        )}
        <img
          src={product.image}
          alt={product.name}
          className={`w-full aspect-[183/244] object-cover transition-all duration-300 ${
            imageLoaded ? "opacity-100 group-hover:scale-105" : "opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
        />
        
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && (
            <span className="bg-brand-burgundy text-white px-3 py-1 rounded-full text-xs font-medium tracking-wide">
              NEW
            </span>
          )}
          {hasDiscount && (
            <span className="bg-brand-pink text-white px-3 py-1 rounded-full text-xs font-medium tracking-wide">
              SALE
            </span>
          )}
          {product.stock !== undefined && product.stock < 5 && product.stock > 0 && (
            <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium tracking-wide">
              {product.stock} LEFT
            </span>
          )}
          {product.stock === 0 && (
            <span className="bg-gray-500 text-white px-3 py-1 rounded-full text-xs font-medium tracking-wide">
              OUT OF STOCK
            </span>
          )}
        </div>

        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleFavorite(product);
            }}
            className="w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
            aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart
              className="w-5 h-5 transition-all"
              fill={isFav ? "#EC003F" : "none"}
              stroke={isFav ? "#EC003F" : "#4A5565"}
              strokeWidth={1.67}
            />
          </button>
          {onQuickView && (
            <button
              onClick={(e) => {
                e.preventDefault();
                onQuickView(product);
              }}
              className="w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center transition-transform hover:scale-110 active:scale-95 opacity-0 group-hover:opacity-100"
              aria-label="Quick view"
            >
              <Eye className="w-5 h-5 stroke-gray-dark" strokeWidth={1.67} />
            </button>
          )}
        </div>
      </Link>
      
      <Link to={`/product/${product.id}`}>
        <h4 className="text-gray-dark text-base font-normal tracking-[-0.312px] mb-1 line-clamp-2">
          {product.name}
        </h4>
        <div className="flex items-center gap-2">
          <p className="text-brand-pink text-base font-normal tracking-[-0.312px]">
            ${displayPrice.toFixed(2)}
          </p>
          {hasDiscount && (
            <p className="text-gray-light text-sm line-through">
              ${product.price.toFixed(2)}
            </p>
          )}
        </div>
      </Link>
    </div>
  );
}
