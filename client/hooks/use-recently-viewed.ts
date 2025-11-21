import { useEffect, useState } from "react";
import { Product } from "@shared/products";

const MAX_RECENTLY_VIEWED = 10;
const STORAGE_KEY = "lumiere_recently_viewed";

export function useRecentlyViewed() {
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setRecentlyViewed(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse recently viewed:", e);
      }
    }
  }, []);

  const addToRecentlyViewed = (product: Product) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((p) => p.id !== product.id);
      const updated = [product, ...filtered].slice(0, MAX_RECENTLY_VIEWED);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  return { recentlyViewed, addToRecentlyViewed };
}
