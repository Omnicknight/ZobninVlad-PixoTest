import { Routes, Route, Link } from "react-router-dom";
import ThemeToggle from "./components/ThemeToggle";
import ThemeHandler from "./components/ThemeHandler";
import { lazy, Suspense } from "react";
import CartIcon from "./components/CartIcon";

const HomePage = lazy(() => import("./pages/HomePage"));
const ProductPage = lazy(() => import("./pages/ProductPage"));
const CartPage = lazy(() => import("./pages/CartPage"));
const CheckoutPage = lazy(() => import("./pages/CheckoutPage"));

export default function App() {
  return (
    <>
      <ThemeHandler />

      <header className="flex justify-between items-center p-4 border-b dark:border-gray-700">
        <Link to="/" className="text-xl font-bold">
          🛍️ PixoTest
        </Link>
        <ThemeToggle />
        <CartIcon />
      </header>
      {/* Для ленивой подгрузки страниц */}
      <Suspense fallback={<div className="p-4">Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
      </Suspense>
    </>
  );
}
