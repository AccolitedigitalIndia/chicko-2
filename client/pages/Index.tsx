import { BottomNav } from "@/components/BottomNav";
import { Link } from "react-router-dom";
import { Heart, ChevronRight, Sparkles } from "lucide-react";
import { useFavorites } from "@/context/FavoritesContext";
import {
  categories as allCategories,
  products as allProducts,
} from "@shared/products";
import { useState, useEffect } from "react";

export default function Index() {
  const { toggleFavorite, isFavorite } = useFavorites();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showPromoBanner, setShowPromoBanner] = useState(true);

  const heroImages = [
    {
      url: "https://images.pexels.com/photos/34778039/pexels-photo-34778039.jpeg?auto=compress&cs=tinysrgb&w=1600",
      title: "WINTER COLLECTION",
      subtitle: "Effortless Elegance",
    },
    {
      url: "https://images.pexels.com/photos/14041408/pexels-photo-14041408.jpeg?auto=compress&cs=tinysrgb&w=1600",
      title: "NEW ARRIVALS",
      subtitle: "Discover Fresh Styles",
    },
    {
      url: "https://images.pexels.com/photos/28606334/pexels-photo-28606334.jpeg?auto=compress&cs=tinysrgb&w=1600",
      title: "EXCLUSIVE DESIGNS",
      subtitle: "Limited Edition",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const categoryLinks = allCategories.map((cat) => ({
    name: cat.name,
    path: `/shop?category=${cat.id}`,
  }));

  const featuredProducts = allProducts.slice(0, 2);

  return (
    <div className="min-h-screen bg-white pb-20">
      {showPromoBanner && (
        <div className="bg-brand-burgundy text-white py-2.5 px-4 text-center text-sm relative">
          <p className="font-normal tracking-wide">
            Free Shipping on Orders Over $75 | Extended Returns Through January
          </p>
          <button
            onClick={() => setShowPromoBanner(false)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white text-lg"
            aria-label="Close banner"
          >
            ×
          </button>
        </div>
      )}
      <header className="flex justify-center items-center h-28 px-6 bg-gradient-to-b from-brand-pink-light/30 to-white">
        <h1 className="text-brand-burgundy text-3xl font-semibold tracking-wider flex items-center gap-3">
          <Sparkles className="w-8 h-8 stroke-brand-burgundy fill-brand-pink/10" strokeWidth={2} />
          LUMIÈRE
        </h1>
      </header>

      <section className="relative w-full h-[400px] overflow-hidden">
        {heroImages.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={slide.url}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end items-center pb-10 gap-2">
              <h2 className="text-white text-base font-normal tracking-[-0.312px]">
                {slide.title}
              </h2>
              <p className="text-white/90 text-base font-normal tracking-[-0.312px]">
                {slide.subtitle}
              </p>
              <Link
                to="/shop"
                className="bg-white text-brand-burgundy px-8 py-3 rounded-full text-base font-normal tracking-[-0.312px] mt-2"
              >
                Shop Now
              </Link>
            </div>
          </div>
        ))}

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentSlide ? "bg-white w-6" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </section>

      <section className="px-6 pt-8 pb-0">
        <h3 className="text-gray-dark text-base font-normal tracking-[-0.312px] mb-4">
          Shop by Category
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {allCategories.map((category) => (
            <Link
              key={category.name}
              to={`/shop?category=${category.id}`}
              className="relative rounded-2xl overflow-hidden h-40 group"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-4">
                <span className="text-white text-base font-normal tracking-[-0.312px] mb-1">
                  {category.name}
                </span>
                <div className="flex items-center gap-1">
                  <span className="text-white/80 text-xs">Explore</span>
                  <ChevronRight
                    className="w-4 h-4 stroke-white/80"
                    strokeWidth={1.67}
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="px-6 pt-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-gray-dark text-base font-normal tracking-[-0.312px]">
            Featured Styles
          </h3>
          <Link
            to="/shop"
            className="flex items-center gap-1 text-brand-pink text-sm font-normal tracking-[-0.15px]"
          >
            View All
            <ChevronRight className="w-4 h-4" strokeWidth={1.33} />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {featuredProducts.map((product) => {
            const isFav = isFavorite(product.id);
            return (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="flex flex-col"
              >
                <div className="relative rounded-[10px] overflow-hidden mb-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full aspect-[176/234] object-cover"
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
      </section>

      <BottomNav />
    </div>
  );
}
