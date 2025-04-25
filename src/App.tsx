import { Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import ThemeToggle from "./components/ThemeToggle";
import ThemeHandler from "./components/ThemeHandler";

export default function App() {
  return (
    <>
      <ThemeHandler />

      <header className="flex justify-between items-center p-4 border-b dark:border-gray-700">
        <Link to="/" className="text-xl font-bold">
          🛍️ PixoTest
        </Link>

        <ThemeToggle />
      </header>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
    </>
  );
}
