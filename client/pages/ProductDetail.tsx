import { BottomNav } from "@/components/BottomNav";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Share2, Heart, Star } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { toast } from "@/hooks/use-toast";

export default function ProductDetail() {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [selectedColor, setSelectedColor] = useState("Ivory");
  const [selectedSize, setSelectedSize] = useState("");

  const colors = ["Ivory", "Blush", "Navy"];
  const sizes = ["XS", "S", "M", "L", "XL"];

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
      id: 1,
      name: "Silk Blend Tunic",
      price: 89.50,
      image: "https://api.builder.io/api/v1/image/assets/TEMP/a8a2c6008052338846cae6bec260590dfa3e5cde?width=192",
      size: selectedSize,
      color: selectedColor,
    });

    toast({
      title: "Added to bag",
      description: `${selectedColor} Silk Blend Tunic (${selectedSize}) added to your bag`,
    });
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="relative">
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/64dac7f003ea8759ac412708d9bdc40543b88157?width=860"
          alt="Silk Blend Tunic"
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
            <button className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 stroke-gray-dark" strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>

      <div className="px-6 pt-6 pb-8 flex flex-col gap-6">
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-1">
            <p className="text-[#6A7282] text-sm tracking-[-0.15px]">Tops</p>
            <h2 className="text-gray-dark text-base font-normal tracking-[-0.312px]">
              Silk Blend Tunic
            </h2>
          </div>
          <p className="text-brand-pink text-base font-normal tracking-[-0.312px]">
            $89.50
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex gap-0">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className="w-4 h-4"
                fill="#FFB900"
                stroke="#FFB900"
                strokeWidth={1.33}
              />
            ))}
          </div>
          <p className="text-[#6A7282] text-sm tracking-[-0.15px]">(128 reviews)</p>
        </div>

        <p className="text-gray-medium text-base font-normal leading-[26px] tracking-[-0.312px]">
          Elegant silk blend tunic with delicate details
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
          <div className="flex gap-3">
            {colors.map((color) => (
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
          <div className="grid grid-cols-5 gap-2">
            {sizes.map((size) => (
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
