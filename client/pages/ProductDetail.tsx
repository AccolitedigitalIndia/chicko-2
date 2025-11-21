import { BottomNav } from "@/components/BottomNav";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ChevronLeft, Share2, Heart, Star, ChevronRight, Package } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { useFavorites } from "@/context/FavoritesContext";
import { useRecentlyViewed } from "@/hooks/use-recently-viewed";
import { toast } from "@/hooks/use-toast";
import { getProductById, products as allProducts, Product, getCategoryById } from "@shared/products";
import ReviewsModal from "@/components/ReviewsModal";
import { ColorSwatch } from "@/components/ColorSwatch";
import { ProductCard } from "@/components/ProductCard";
import { QuickViewModal } from "@/components/QuickViewModal";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import useEmblaCarousel from "embla-carousel-react";

export default function ProductDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { addToRecentlyViewed, recentlyViewed } = useRecentlyViewed();
  const [showReviews, setShowReviews] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const product = getProductById(Number(id));

  useEffect(() => {
    if (product) {
      addToRecentlyViewed(product);
    }
  }, [product, addToRecentlyViewed]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedImageIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  if (!product) {
    return (
      <div className="min-h-screen bg-white pb-20 flex items-center justify-center">
        <div className="text-center">
          <Package className="w-16 h-16 stroke-gray-light mx-auto mb-4" />
          <p className="text-gray-medium text-base mb-4">Product not found</p>
          <button
            onClick={() => navigate("/shop")}
            className="px-6 py-3 bg-brand-pink text-white rounded-full text-base font-normal tracking-[-0.312px] hover:bg-brand-burgundy transition-colors"
          >
            Back to Shop
          </button>
        </div>
      </div>
    );
  }

  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  const isFav = isFavorite(product.id);
  const productImages = product.images || [product.image];
  const displayPrice = product.onSale && product.salePrice ? product.salePrice : product.price;
  const hasDiscount = product.onSale && product.salePrice;

  const relatedProducts = product.relatedProducts
    ? allProducts.filter((p) => product.relatedProducts?.includes(p.id))
    : allProducts
        .filter((p) => p.category === product.category && p.id !== product.id)
        .slice(0, 4);

  const recentlyViewedFiltered = recentlyViewed
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const handleAddToBag = () => {
    if (!selectedSize) {
      toast({
        title: "Size required",
        description: "Please select a size before adding to bag",
        variant: "destructive",
      });
      return;
    }

    if (product.stock === 0) {
      toast({
        title: "Out of stock",
        description: "This product is currently unavailable",
        variant: "destructive",
      });
      return;
    }

    for (let i = 0; i < quantity; i++) {
      addToCart({
        ...product,
        size: selectedSize,
        color: selectedColor,
      });
    }

    toast({
      title: "Added to bag",
      description: `${quantity}x ${selectedColor} ${product.name} (${selectedSize}) added to your bag`,
    });
  };

  const handleShare = async () => {
    const shareData = {
      title: product.name,
      text: `Check out ${product.name} on LUMIÈRE`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          copyToClipboard();
        }
      }
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied",
      description: "Product link copied to clipboard",
    });
  };

  const handleNotifyMe = () => {
    toast({
      title: "You'll be notified",
      description: "We'll email you when this item is back in stock",
    });
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="sticky top-0 bg-white/95 backdrop-blur-sm z-20 px-6 pt-14 pb-4 border-b border-gray-border">
        <div className="flex justify-between items-center mb-3">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-pink"
            aria-label="Go back"
          >
            <ChevronLeft className="w-6 h-6 stroke-gray-dark" strokeWidth={2} />
          </button>

          <div className="flex gap-2">
            <button
              onClick={handleShare}
              className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-pink"
              aria-label="Share product"
            >
              <Share2 className="w-5 h-5 stroke-gray-dark" strokeWidth={2} />
            </button>
            <button
              onClick={() => toggleFavorite(product)}
              className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-all active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-pink"
              aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
            >
              <Heart
                className="w-5 h-5 transition-all"
                fill={isFav ? "#EC003F" : "none"}
                stroke={isFav ? "#EC003F" : "#101828"}
                strokeWidth={2}
              />
            </button>
          </div>
        </div>
        <Breadcrumbs
          items={[
            { label: getCategoryById(product.category)?.name || product.category, href: `/shop?category=${product.category}` },
            { label: product.name },
          ]}
        />
      </div>

      <div className="relative">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {productImages.map((img, index) => (
              <div key={index} className="flex-[0_0_100%] min-w-0 relative">
                <img
                  src={img}
                  alt={`${product.name} - Image ${index + 1}`}
                  className="w-full h-[480px] object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {productImages.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {productImages.map((_, index) => (
              <button
                key={index}
                onClick={() => emblaApi?.scrollTo(index)}
                className={`rounded-full transition-all ${
                  index === selectedImageIndex
                    ? "bg-white w-6 h-2"
                    : "bg-white/50 w-2 h-2"
                }`}
                aria-label={`View image ${index + 1}`}
              />
            ))}
          </div>
        )}

        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.isNew && (
            <span className="bg-brand-burgundy text-white px-3 py-1 rounded-full text-xs font-medium">
              NEW
            </span>
          )}
          {hasDiscount && (
            <span className="bg-brand-pink text-white px-3 py-1 rounded-full text-xs font-medium">
              SALE
            </span>
          )}
        </div>
      </div>

      <div className="px-6 pt-6 pb-8 flex flex-col gap-6">
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-1 flex-1">
            <p className="text-[#6A7282] text-sm tracking-[-0.15px] capitalize">
              {product.category}
            </p>
            <h2 className="text-gray-dark text-xl font-medium tracking-[-0.312px]">
              {product.name}
            </h2>
          </div>
          <div className="text-right">
            <p className="text-brand-pink text-xl font-medium tracking-[-0.312px]">
              ${displayPrice.toFixed(2)}
            </p>
            {hasDiscount && (
              <p className="text-gray-light text-sm line-through">
                ${product.price.toFixed(2)}
              </p>
            )}
          </div>
        </div>

        <button
          onClick={() => setShowReviews(true)}
          className="flex items-center gap-2 w-fit hover:opacity-80 transition-opacity"
        >
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
          <p className="text-[#6A7282] text-sm tracking-[-0.15px] underline">
            {product.rating.toFixed(1)} ({product.reviews} reviews)
          </p>
        </button>

        {product.stock !== undefined && (
          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              product.stock === 0
                ? "bg-gray-100 text-gray-600"
                : product.stock < 5
                  ? "bg-orange-50 text-orange-700"
                  : "bg-green-50 text-green-700"
            }`}
          >
            <Package className="w-4 h-4" strokeWidth={2} />
            <span className="text-sm font-medium">
              {product.stock === 0
                ? "Out of stock"
                : product.stock < 5
                  ? `Only ${product.stock} left in stock!`
                  : "In stock"}
            </span>
          </div>
        )}

        <p className="text-gray-medium text-base font-normal leading-[26px] tracking-[-0.312px]">
          {product.description}
        </p>

        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="text-gray-dark text-base font-medium tracking-[-0.312px]">
              Color:
            </span>
            <span className="text-gray-medium text-base font-normal tracking-[-0.312px]">
              {selectedColor}
            </span>
          </div>
          <div className="flex gap-3 flex-wrap">
            {product.colors.map((color) => (
              <ColorSwatch
                key={color}
                color={color}
                selected={selectedColor === color}
                onClick={() => setSelectedColor(color)}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-dark text-base font-medium tracking-[-0.312px]">
              Select Size
            </span>
            <button className="text-brand-pink text-sm font-normal tracking-[-0.15px] hover:text-brand-burgundy transition-colors">
              Size Guide
            </button>
          </div>
          <div
            className={`grid gap-2 ${product.sizes.length > 1 ? "grid-cols-5" : "grid-cols-1"}`}
          >
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`py-[14px] rounded-[10px] text-base font-normal tracking-[-0.312px] text-center transition-all active:scale-95 ${
                  selectedSize === size
                    ? "border-2 border-brand-pink text-brand-pink bg-brand-pink-light"
                    : "border-2 border-gray-border text-[#364153] hover:border-gray-400"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-gray-dark text-base font-medium tracking-[-0.312px]">
            Quantity
          </span>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 bg-[#F3F4F6] rounded-full px-4 h-12">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-6 h-6 flex items-center justify-center hover:bg-white rounded-full transition-colors"
                aria-label="Decrease quantity"
              >
                <span className="text-gray-dark text-xl">−</span>
              </button>
              <span className="text-gray-dark text-base font-medium min-w-[24px] text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(Math.min(10, quantity + 1))}
                className="w-6 h-6 flex items-center justify-center hover:bg-white rounded-full transition-colors"
                aria-label="Increase quantity"
              >
                <span className="text-gray-dark text-xl">+</span>
              </button>
            </div>
          </div>
        </div>

        {product.stock === 0 ? (
          <button
            onClick={handleNotifyMe}
            className="w-full py-4 bg-gray-200 text-gray-dark rounded-full text-base font-normal tracking-[-0.312px] hover:bg-gray-300 transition-colors"
          >
            Notify Me When Available
          </button>
        ) : (
          <button
            onClick={handleAddToBag}
            className="w-full py-4 bg-brand-pink text-white rounded-full text-base font-normal tracking-[-0.312px] hover:bg-brand-burgundy transition-all active:scale-98"
          >
            Add to Bag
          </button>
        )}
      </div>

      {relatedProducts.length > 0 && (
        <div className="px-6 pt-4 pb-8 border-t border-gray-border">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-gray-dark text-base font-medium tracking-[-0.312px]">
              You May Also Like
            </h3>
            <Link
              to={`/shop?category=${product.category}`}
              className="flex items-center gap-1 text-brand-pink text-sm hover:text-brand-burgundy transition-colors"
            >
              View More
              <ChevronRight className="w-4 h-4" strokeWidth={1.33} />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {relatedProducts.slice(0, 2).map((relatedProduct) => (
              <ProductCard
                key={relatedProduct.id}
                product={relatedProduct}
                onQuickView={setQuickViewProduct}
              />
            ))}
          </div>
        </div>
      )}

      {recentlyViewedFiltered.length > 0 && (
        <div className="px-6 pt-4 pb-8 border-t border-gray-border">
          <h3 className="text-gray-dark text-base font-medium tracking-[-0.312px] mb-4">
            Recently Viewed
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {recentlyViewedFiltered.slice(0, 2).map((viewedProduct) => (
              <ProductCard
                key={viewedProduct.id}
                product={viewedProduct}
                onQuickView={setQuickViewProduct}
              />
            ))}
          </div>
        </div>
      )}

      <BottomNav />

      <ReviewsModal
        isOpen={showReviews}
        onClose={() => setShowReviews(false)}
        productName={product.name}
        averageRating={product.rating}
        totalReviews={product.reviews}
      />

      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}
