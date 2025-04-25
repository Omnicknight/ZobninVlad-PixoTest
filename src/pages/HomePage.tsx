import { useEffect, useState } from "react";
import { Product } from "../types";
import { api } from "../api/axios";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<"grid" | "list">("grid");

  useEffect(() => {
    api
      .get<Product[]>("/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Failed to fetch products:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-4">
      <div className="flex justify-end mb-4 gap-2">
        <button
          onClick={() => setView("grid")}
          aria-label="Grid view"
          className={`p-2 border rounded transition ${
            view === "grid"
              ? "bg-blue-600 text-white border-blue-600"
              : "hover:bg-gray-100 text-gray-600"
          }`}
        >
          🔲
        </button>
        <button
          onClick={() => setView("list")}
          aria-label="List view"
          className={`p-2 border rounded transition ${
            view === "list"
              ? "bg-blue-600 text-white border-blue-600"
              : "hover:bg-gray-100 text-gray-600"
          }`}
        >
          📃
        </button>
      </div>

      <div
        className={
          view === "grid"
            ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
            : "flex flex-col gap-4"
        }
      >
        {products.map((product) => (
          <Link
            to={`/product/${product.id}`}
            key={product.id}
            className={`border rounded p-2 hover:shadow transition ${
              view === "list" ? "flex gap-4 items-center" : "block"
            }`}
          >
            <img
              src={product.image}
              alt={product.title}
              className={
                view === "list"
                  ? "w-24 h-24 object-contain"
                  : "h-40 mx-auto object-contain"
              }
            />
            <div className={view === "list" ? "flex-1" : ""}>
              <h2 className="text-sm font-semibold mt-2 line-clamp-2">
                {product.title}
              </h2>
              <p className="text-sm text-gray-600">${product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
