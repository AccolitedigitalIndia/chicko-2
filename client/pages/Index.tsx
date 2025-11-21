import { BottomNav } from "@/components/BottomNav";
import { Link } from "react-router-dom";
import { Heart, ChevronRight } from "lucide-react";

export default function Index() {
  const categories = [
    { name: "New Arrivals", path: "/shop?category=new" },
    { name: "Dresses", path: "/shop?category=dresses" },
    { name: "Tops & Tunics", path: "/shop?category=tops" },
    { name: "Accessories", path: "/shop?category=accessories" },
  ];

  const featuredProducts = [
    {
      id: 1,
      name: "Silk Blend Tunic",
      price: "$89.50",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/e581d93ee8ebe8e7bf849403f2ec4c3a7e861f9e?width=351",
    },
    {
      id: 2,
      name: "Classic Wrap Dress",
      price: "$119.00",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/d5251751484e87cc146dd10e45772b823dc28e99?width=351",
    },
  ];

  return (
    <div className="min-h-screen bg-white pb-20">
      <header className="flex justify-center items-center h-24 px-6">
        <h1 className="text-brand-burgundy text-base font-normal tracking-[0.488px]">
          CHIC & CO
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
          <button className="bg-white text-brand-burgundy px-8 py-3 rounded-full text-base font-normal tracking-[-0.312px] mt-2">
            Shop Now
          </button>
        </div>
      </section>

      <section className="px-6 pt-8 pb-0">
        <h3 className="text-gray-dark text-base font-normal tracking-[-0.312px] mb-4">
          Shop by Category
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={category.path}
              className="flex flex-col justify-center items-center bg-brand-pink-light rounded-[10px] p-6 gap-1 min-h-[96px]"
            >
              <span className="text-brand-burgundy text-base font-normal tracking-[-0.312px] text-center">
                {category.name}
              </span>
              <ChevronRight className="w-5 h-5 stroke-brand-pink" strokeWidth={1.67} />
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
          {featuredProducts.map((product) => (
            <div key={product.id} className="flex flex-col">
              <div className="relative rounded-[10px] overflow-hidden mb-3">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full aspect-[176/234] object-cover"
                />
                <button className="absolute top-3 right-3 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center">
                  <Heart className="w-5 h-5 stroke-gray-medium" strokeWidth={1.67} />
                </button>
              </div>
              <h4 className="text-gray-dark text-base font-normal tracking-[-0.312px] mb-1">
                {product.name}
              </h4>
              <p className="text-brand-pink text-base font-normal tracking-[-0.312px]">
                {product.price}
              </p>
            </div>
          ))}
        </div>
      </section>

      <BottomNav />
    </div>
  );
}
