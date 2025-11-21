import { X } from "lucide-react";
import { useState } from "react";
import { categories } from "@shared/products";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: FilterState) => void;
  initialFilters: FilterState;
}

export interface FilterState {
  categories: string[];
  priceRange: [number, number];
  sortBy: string;
  inStock: boolean;
}

export function FilterModal({
  isOpen,
  onClose,
  onApply,
  initialFilters,
}: FilterModalProps) {
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  if (!isOpen) return null;

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  const handleReset = () => {
    const resetFilters: FilterState = {
      categories: [],
      priceRange: [0, 500],
      sortBy: "featured",
      inStock: false,
    };
    setFilters(resetFilters);
  };

  const toggleCategory = (categoryId: string) => {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.includes(categoryId)
        ? prev.categories.filter((c) => c !== categoryId)
        : [...prev.categories, categoryId],
    }));
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center sm:justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="filter-modal-title"
    >
      <div className="bg-white w-full sm:max-w-md sm:rounded-2xl rounded-t-2xl max-h-[90vh] flex flex-col animate-in slide-in-from-bottom duration-300">
        <div className="flex items-center justify-between p-6 border-b border-gray-border">
          <h2
            id="filter-modal-title"
            className="text-gray-dark text-lg font-medium"
          >
            Filters
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-pink"
            aria-label="Close filters"
          >
            <X className="w-5 h-5 stroke-gray-dark" aria-hidden="true" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div>
            <h3 className="text-gray-dark text-base font-medium mb-3">
              Sort By
            </h3>
            <div className="space-y-2">
              {[
                { value: "featured", label: "Featured" },
                { value: "newest", label: "Newest" },
                { value: "price-low", label: "Price: Low to High" },
                { value: "price-high", label: "Price: High to Low" },
                { value: "popular", label: "Most Popular" },
              ].map((option) => (
                <label
                  key={option.value}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="sortBy"
                    value={option.value}
                    checked={filters.sortBy === option.value}
                    onChange={(e) =>
                      setFilters({ ...filters, sortBy: e.target.value })
                    }
                    className="w-4 h-4 text-brand-pink accent-brand-pink"
                  />
                  <span className="text-gray-dark text-sm">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-gray-dark text-base font-medium mb-3">
              Categories
            </h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <label
                  key={category.id}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={filters.categories.includes(category.id)}
                    onChange={() => toggleCategory(category.id)}
                    className="w-4 h-4 text-brand-pink accent-brand-pink rounded"
                  />
                  <span className="text-gray-dark text-sm">
                    {category.name}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-gray-dark text-base font-medium mb-3">
              Price Range
            </h3>
            <div className="space-y-3">
              <input
                type="range"
                min="0"
                max="500"
                value={filters.priceRange[1]}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    priceRange: [0, parseInt(e.target.value)],
                  })
                }
                className="w-full accent-brand-pink"
              />
              <div className="flex justify-between text-sm text-gray-medium">
                <span>${filters.priceRange[0]}</span>
                <span>${filters.priceRange[1]}</span>
              </div>
            </div>
          </div>

          <div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.inStock}
                onChange={(e) =>
                  setFilters({ ...filters, inStock: e.target.checked })
                }
                className="w-4 h-4 text-brand-pink accent-brand-pink rounded"
              />
              <span className="text-gray-dark text-sm">In Stock Only</span>
            </label>
          </div>
        </div>

        <div className="p-6 border-t border-gray-border flex gap-3">
          <button
            onClick={handleReset}
            className="flex-1 py-3 border-2 border-gray-border text-gray-dark rounded-full text-base font-normal transition-colors hover:bg-gray-50"
          >
            Reset
          </button>
          <button
            onClick={handleApply}
            className="flex-1 py-3 bg-brand-pink text-white rounded-full text-base font-normal transition-colors hover:bg-brand-burgundy"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}
