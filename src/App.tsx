import { Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import CartIcon from "./components/CartIcon";

export default function App() {
  return (
    <>
      <header className="p-4 flex justify-between items-center border-b">
        <h1 className="text-xl font-bold">
          <Link to="/">PixoStore</Link>
        </h1>
        <CartIcon />
      </header>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </>
  )
}
