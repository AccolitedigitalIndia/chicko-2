import { BottomNav } from "@/components/BottomNav";
import { Link } from "react-router-dom";
import { Heart, ChevronRight } from "lucide-react";
import { useFavorites } from "@/context/FavoritesContext";
import {
  categories as allCategories,
  products as allProducts,
} from "@shared/products";

export default function Index() {
  const { toggleFavorite, isFavorite } = useFavorites();

  const categoryLinks = allCategories.map((cat) => ({
    name: cat.name,
    path: `/shop?category=${cat.id}`,
  }));

  const featuredProducts = allProducts.slice(0, 2);

  return (
    <div className="min-h-screen bg-white pb-20">
      <header className="flex justify-center items-center h-24 px-6">
        <h1 className="text-brand-burgundy text-base font-normal tracking-[0.488px]">
          LUMIÈRE
        </h1>
      </header>

      <section className="relative w-full h-[400px]">
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/8edbb79545dad257d30674c6aa5c67c383280142?width=830"
          alt="Winter Collection"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end items-center pb-10 gap-2">
          <h2 className="text-white text-base font-normal tracking-[-0.312px]">
            WINTER COLLECTION
          </h2>
          <p className="text-white/90 text-base font-normal tracking-[-0.312px]">
            Effortless Elegance
          </p>
          <Link to="/shop" className="bg-white text-brand-burgundy px-8 py-3 rounded-full text-base font-normal tracking-[-0.312px] mt-2">
            Shop Now
          </Link>
        </div>
      </section>

      <section className="px-6 pt-8 pb-0">
        <h3 className="text-gray-dark text-base font-normal tracking-[-0.312px] mb-4">
          Shop by Category
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {categoryLinks.map((category) => (
            <Link
              key={category.name}
              to={category.path}
              className="flex flex-col justify-center items-center bg-brand-pink-light rounded-[10px] p-6 gap-1 min-h-[96px]"
            >
              <span className="text-brand-burgundy text-base font-normal tracking-[-0.312px] text-center">
                {category.name}
              </span>
              <ChevronRight
                className="w-5 h-5 stroke-brand-pink"
                strokeWidth={1.67}
              />
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
