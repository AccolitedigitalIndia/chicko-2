import { BottomNav } from "@/components/BottomNav";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { products as allProducts, categories, Product } from "@shared/products";
import { ProductCard } from "@/components/ProductCard";
import { ProductGridSkeleton } from "@/components/ProductSkeleton";
import { QuickViewModal } from "@/components/QuickViewModal";
import { FilterModal, FilterState } from "@/components/FilterModal";
import { BackToTop } from "@/components/BackToTop";
import { EmptyState } from "@/components/EmptyState";
import { Package } from "lucide-react";

export default function Shop() {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");
  const [activeFilter, setActiveFilter] = useState(categoryParam || "all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<FilterState>({
    categories: categoryParam ? [categoryParam] : [],
    priceRange: [0, 500],
    sortBy: "featured",
    inStock: false,
  });

  useEffect(() => {
    if (categoryParam) {
      setActiveFilter(categoryParam);
      setFilters((prev) => ({ ...prev, categories: [categoryParam] }));
    }
  }, [categoryParam]);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [activeFilter, searchQuery, filters]);

  const filteredProducts = useMemo(() => {
    let filtered = [...allProducts];

    if (activeFilter !== "all") {
      filtered = filtered.filter((product) => product.category === activeFilter);
    }

    if (filters.categories.length > 0 && activeFilter === "all") {
      filtered = filtered.filter((product) =>
        filters.categories.includes(product.category)
      );
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
      );
    }

    const displayPrice = (p: Product) =>
      p.onSale && p.salePrice ? p.salePrice : p.price;

    filtered = filtered.filter(
      (product) =>
        displayPrice(product) >= filters.priceRange[0] &&
        displayPrice(product) <= filters.priceRange[1]
    );

    if (filters.inStock) {
      filtered = filtered.filter(
        (product) => product.stock === undefined || product.stock > 0
      );
    }

    switch (filters.sortBy) {
      case "newest":
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case "price-low":
        filtered.sort((a, b) => displayPrice(a) - displayPrice(b));
        break;
      case "price-high":
        filtered.sort((a, b) => displayPrice(b) - displayPrice(a));
        break;
      case "popular":
        filtered.sort((a, b) => b.reviews - a.reviews);
        break;
      default:
        break;
    }

    return filtered;
  }, [activeFilter, searchQuery, filters]);

  const filterCategories = ["all", ...categories.map((cat) => cat.id)];
  const activeFilterCount =
    (filters.categories.length > 0 ? 1 : 0) +
    (filters.priceRange[1] < 500 ? 1 : 0) +
    (filters.sortBy !== "featured" ? 1 : 0) +
    (filters.inStock ? 1 : 0);

  const handleApplyFilters = (newFilters: FilterState) => {
    setFilters(newFilters);
    if (newFilters.categories.length === 1) {
      setActiveFilter(newFilters.categories[0]);
    } else {
      setActiveFilter("all");
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="px-6 pt-14 pb-8 flex flex-col gap-4">
        <h2 className="text-gray-dark text-base font-normal tracking-[-0.312px]">
          Shop
        </h2>

        <div className="relative">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 stroke-gray-light pointer-events-none"
            strokeWidth={1.67}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for styles..."
            className="w-full h-[50px] pl-12 pr-14 rounded-full border border-gray-border bg-[#F9FAFB] text-base tracking-[-0.312px] placeholder:text-black/50 focus:outline-none focus:ring-2 focus:ring-brand-pink/20 transition-all"
          />
          {searchQuery ? (
            <button
              onClick={clearSearch}
              className="absolute right-14 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-gray-300 flex items-center justify-center hover:bg-gray-400 transition-colors"
              aria-label="Clear search"
            >
              <X className="w-3 h-3 stroke-white" strokeWidth={2} />
            </button>
          ) : null}
          <button
            onClick={() => setShowFilterModal(true)}
            className="absolute right-4 top-1/2 -translate-y-1/2 relative"
            aria-label="Open filters"
          >
            <SlidersHorizontal
              className="w-5 h-5 stroke-gray-medium"
              strokeWidth={1.67}
            />
            {activeFilterCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand-pink text-white text-xs rounded-full flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {filterCategories.map((filter) => {
            const categoryName =
              filter === "all"
                ? "All"
                : categories.find((cat) => cat.id === filter)?.name || filter;
            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2 rounded-full text-base font-normal tracking-[-0.312px] whitespace-nowrap transition-all ${
                  activeFilter === filter
                    ? "bg-brand-pink text-white"
                    : "bg-[#F3F4F6] text-[#364153] hover:bg-gray-300"
                }`}
              >
                {categoryName}
              </button>
            );
          })}
        </div>
      </div>

      <div className="px-6 pb-8">
        <p className="text-[#6A7282] text-sm tracking-[-0.15px] mb-4">
          {filteredProducts.length} {filteredProducts.length === 1 ? "item" : "items"}
          {searchQuery && ` for "${searchQuery}"`}
        </p>

        {isLoading ? (
          <ProductGridSkeleton count={6} />
        ) : filteredProducts.length === 0 ? (
          <EmptyState
            icon={Package}
            title="No products found"
            description={
              searchQuery
                ? `No results for "${searchQuery}". Try different keywords.`
                : "Try adjusting your filters to see more products."
            }
            action={
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveFilter("all");
                  setFilters({
                    categories: [],
                    priceRange: [0, 500],
                    sortBy: "featured",
                    inStock: false,
                  });
                }}
                className="px-6 py-3 bg-brand-pink text-white rounded-full text-sm hover:bg-brand-burgundy transition-colors"
              >
                Clear All Filters
              </button>
            }
          />
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={setQuickViewProduct}
              />
            ))}
          </div>
        )}
      </div>

      <BottomNav />
      <BackToTop />
      <FilterModal
        isOpen={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        onApply={handleApplyFilters}
        initialFilters={filters}
      />
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}
