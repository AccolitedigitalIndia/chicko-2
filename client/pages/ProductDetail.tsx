import { BottomNav } from "@/components/BottomNav";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft, Share2, Heart, Star } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useFavorites } from "@/context/FavoritesContext";
import { toast } from "@/hooks/use-toast";
import { getProductById } from "@shared/products";

export default function ProductDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  const product = getProductById(Number(id));

  if (!product) {
    return (
      <div className="min-h-screen bg-white pb-20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-medium text-base mb-4">Product not found</p>
          <button
            onClick={() => navigate("/shop")}
            className="px-6 py-3 bg-brand-pink text-white rounded-full text-base font-normal tracking-[-0.312px]"
          >
            Back to Shop
          </button>
        </div>
      </div>
    );
  }

  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState("");

  const isFav = isFavorite(product.id);

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
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-[480px] object-cover"
        />
        
        <div className="absolute top-0 left-0 right-0 flex justify-between items-center px-6 pt-14">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center"
          >
            <ChevronLeft className="w-6 h-6 stroke-gray-dark" strokeWidth={2} />
          </button>

          <div className="flex gap-2">
            <button className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center">
              <Share2 className="w-6 h-6 stroke-gray-dark" strokeWidth={2} />
            </button>
            <button
              onClick={() => toggleFavorite(product)}
              className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center"
            >
              <Heart
                className="w-6 h-6"
                fill={isFav ? "#EC003F" : "none"}
                stroke={isFav ? "#EC003F" : "#101828"}
                strokeWidth={2}
              />
            </button>
          </div>
        </div>
      </div>

      <div className="px-6 pt-6 pb-8 flex flex-col gap-6">
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-1">
            <p className="text-[#6A7282] text-sm tracking-[-0.15px] capitalize">{product.category}</p>
            <h2 className="text-gray-dark text-base font-normal tracking-[-0.312px]">
              {product.name}
            </h2>
          </div>
          <p className="text-brand-pink text-base font-normal tracking-[-0.312px]">
            ${product.price.toFixed(2)}
          </p>
        </div>

        <div className="flex items-center gap-2">
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
          <p className="text-[#6A7282] text-sm tracking-[-0.15px]">({product.reviews} reviews)</p>
        </div>

        <p className="text-gray-medium text-base font-normal leading-[26px] tracking-[-0.312px]">
          {product.description}
        </p>

        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-1">
            <span className="text-gray-dark text-base font-normal tracking-[-0.312px]">
              Color:
            </span>
            <span className="text-gray-medium text-base font-normal tracking-[-0.312px]">
              {selectedColor}
            </span>
          </div>
          <div className="flex gap-3 flex-wrap">
            {product.colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`px-[18px] py-[10px] rounded-full text-base font-normal tracking-[-0.312px] ${
                  selectedColor === color
                    ? "border-2 border-brand-pink bg-brand-pink-light text-brand-pink"
                    : "border-2 border-gray-border text-[#364153]"
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-dark text-base font-normal tracking-[-0.312px]">
              Select Size
            </span>
            <button className="text-brand-pink text-sm font-normal tracking-[-0.15px]">
              Size Guide
            </button>
          </div>
          <div className={`grid gap-2 ${product.sizes.length > 1 ? 'grid-cols-5' : 'grid-cols-1'}`}>
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`py-[14px] rounded-[10px] text-base font-normal tracking-[-0.312px] text-center ${
                  selectedSize === size
                    ? "border-2 border-brand-pink text-brand-pink"
                    : "border-2 border-gray-border text-[#364153]"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleAddToBag}
          className="w-full py-4 bg-brand-pink text-white rounded-full text-base font-normal tracking-[-0.312px]"
        >
          Add to Bag
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
