import { X, Star, Heart } from "lucide-react";
import { Product } from "@shared/products";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useFavorites } from "@/context/FavoritesContext";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || "");
  const [selectedSize, setSelectedSize] = useState("");

  if (!product) return null;

  const isFav = isFavorite(product.id);
  const displayPrice = product.onSale && product.salePrice ? product.salePrice : product.price;
  const hasDiscount = product.onSale && product.salePrice;

  const handleAddToBag = () => {
    if (!selectedSize) {
      toast({
        title: "Size required",
        description: "Please select a size before adding to bag",
        variant: "destructive",
      });
      return;
    }

    addToCart({
      ...product,
      size: selectedSize,
      color: selectedColor,
    });

    toast({
      title: "Added to bag",
      description: `${selectedColor} ${product.name} (${selectedSize}) added to your bag`,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white w-full max-w-2xl rounded-2xl max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-gray-border p-4 flex items-center justify-between z-10">
          <h2 className="text-gray-dark text-lg font-medium">Quick View</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
            aria-label="Close quick view"
          >
            <X className="w-5 h-5 stroke-gray-dark" />
          </button>
        </div>

        <div className="p-6 grid md:grid-cols-2 gap-6">
          <div className="relative rounded-lg overflow-hidden bg-gray-100">
            <img
              src={product.image}
              alt={product.name}
              className="w-full aspect-square object-cover"
            />
            {product.isNew && (
              <span className="absolute top-3 left-3 bg-brand-burgundy text-white px-3 py-1 rounded-full text-xs font-medium">
                NEW
              </span>
            )}
            {hasDiscount && (
              <span className="absolute top-3 left-3 mt-10 bg-brand-pink text-white px-3 py-1 rounded-full text-xs font-medium">
                SALE
              </span>
            )}
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <p className="text-gray-light text-sm uppercase tracking-wide mb-1">
                {product.category}
              </p>
              <h3 className="text-gray-dark text-xl font-medium mb-2">{product.name}</h3>
              <div className="flex items-center gap-2 mb-3">
                <p className="text-brand-pink text-xl font-medium">
                  ${displayPrice.toFixed(2)}
                </p>
                {hasDiscount && (
                  <p className="text-gray-light text-base line-through">
                    ${product.price.toFixed(2)}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2 mb-3">
                <div className="flex gap-0">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="w-4 h-4"
                      fill={star <= Math.floor(product.rating) ? "#FFB900" : "none"}
                      stroke="#FFB900"
                      strokeWidth={1.33}
                    />
                  ))}
                </div>
                <p className="text-gray-medium text-sm">({product.reviews} reviews)</p>
              </div>
            </div>

            <p className="text-gray-medium text-sm leading-relaxed">
              {product.description}
            </p>

            {product.stock !== undefined && (
              <p className={`text-sm ${product.stock < 5 ? "text-orange-600" : "text-green-600"}`}>
                {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
              </p>
            )}

            <div className="space-y-3">
              <div>
                <span className="text-gray-dark text-sm font-medium mb-2 block">
                  Color: {selectedColor}
                </span>
                <div className="flex gap-2 flex-wrap">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 rounded-full text-sm transition-all ${
                        selectedColor === color
                          ? "border-2 border-brand-pink bg-brand-pink-light text-brand-pink"
                          : "border-2 border-gray-border text-gray-dark hover:border-gray-medium"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-gray-dark text-sm font-medium mb-2 block">Select Size</span>
                <div className="grid grid-cols-5 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2 rounded-lg text-sm transition-all ${
                        selectedSize === size
                          ? "border-2 border-brand-pink text-brand-pink"
                          : "border-2 border-gray-border text-gray-dark hover:border-gray-medium"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-auto pt-4">
              <button
                onClick={() => toggleFavorite(product)}
                className="w-12 h-12 border-2 border-gray-border rounded-full flex items-center justify-center hover:border-brand-pink transition-colors"
                aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
              >
                <Heart
                  className="w-5 h-5"
                  fill={isFav ? "#EC003F" : "none"}
                  stroke={isFav ? "#EC003F" : "#4A5565"}
                  strokeWidth={1.67}
                />
              </button>
              <button
                onClick={handleAddToBag}
                className="flex-1 py-3 bg-brand-pink text-white rounded-full text-base font-normal hover:bg-brand-burgundy transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={product.stock === 0}
              >
                {product.stock === 0 ? "Out of Stock" : "Add to Bag"}
              </button>
            </div>

            <button
              onClick={() => {
                navigate(`/product/${product.id}`);
                onClose();
              }}
              className="text-brand-pink text-sm underline hover:text-brand-burgundy transition-colors"
            >
              View Full Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
