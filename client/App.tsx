import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { UserProvider } from "@/context/UserContext";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import Bag from "./pages/Bag";
import Profile from "./pages/Profile";
import ProductDetail from "./pages/ProductDetail";
import Favorites from "./pages/Favorites";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import OrderDetail from "./pages/OrderDetail";
import Addresses from "./pages/Addresses";
import PaymentMethods from "./pages/PaymentMethods";
import Notifications from "./pages/Notifications";
import Help from "./pages/Help";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <FavoritesProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/bag" element={<Bag />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/orders/:orderId" element={<OrderDetail />} />
                <Route path="/addresses" element={<Addresses />} />
                <Route path="/payment-methods" element={<PaymentMethods />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/help" element={<Help />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </FavoritesProvider>
      </CartProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

const container = document.getElementById("root")!;

let root = (window as any).__react_root__;
if (!root) {
  root = createRoot(container);
  (window as any).__react_root__ = root;
}
root.render(<App />);
