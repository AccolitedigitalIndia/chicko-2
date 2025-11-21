import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { storage } from "@/lib/storage";

const FAVORITES_STORAGE_KEY = "lumiere-favorites";

export interface FavoriteItem {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface FavoritesContextType {
  favorites: FavoriteItem[];
  addToFavorites: (item: FavoriteItem) => void;
  removeFromFavorites: (id: number) => void;
  isFavorite: (id: number) => boolean;
  toggleFavorite: (item: FavoriteItem) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>(() => {
    return storage.get<FavoriteItem[]>(FAVORITES_STORAGE_KEY, []);
  });

  useEffect(() => {
    storage.set(FAVORITES_STORAGE_KEY, favorites);
  }, [favorites]);

  const addToFavorites = (item: FavoriteItem) => {
    setFavorites((prev) => {
      const exists = prev.find((fav) => fav.id === item.id);
      if (exists) return prev;
      return [...prev, item];
    });
  };

  const removeFromFavorites = (id: number) => {
    setFavorites((prev) => prev.filter((item) => item.id !== id));
  };

  const isFavorite = (id: number) => {
    return favorites.some((item) => item.id === id);
  };

  const toggleFavorite = (item: FavoriteItem) => {
    if (isFavorite(item.id)) {
      removeFromFavorites(item.id);
    } else {
      addToFavorites(item);
    }
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        toggleFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};
