import { useEffect, useState } from "react";
import { Product } from "../types";
import { api } from "../api/axios";
import { fetchCategories } from "../api/products";
import { Link, useSearchParams } from "react-router-dom";

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [loading, setLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(1000);

  const [searchParams, setSearchParams] = useSearchParams();

  // загрузка данных
  useEffect(() => {
    api
      .get<Product[]>("/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Failed to fetch products:", err))
      .finally(() => setLoading(false));

    fetchCategories()
      .then(setCategories)
      .catch((err) => console.error("Failed to load categories", err));
  }, []);

  // применяем параметры из URL
  useEffect(() => {
    const cat = searchParams.get("category");
    const min = Number(searchParams.get("min") || 0);
    const max = Number(searchParams.get("max") || 1000);

    if (cat) setSelectedCategory(cat);
    setMinPrice(min);
    setMaxPrice(max);
  }, []);

  // обновляем URL при изменении фильтров
  useEffect(() => {
    const params: Record<string, string> = {};
    if (selectedCategory) params.category = selectedCategory;
    if (minPrice !== 0) params.min = String(minPrice);
    if (maxPrice !== 1000) params.max = String(maxPrice);
    setSearchParams(params);
  }, [selectedCategory, minPrice, maxPrice]);

  const filtered = products
    .filter((p) => (selectedCategory ? p.category === selectedCategory : true))
    .filter((p) => p.price >= minPrice && p.price <= maxPrice);

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-4">
      {/* Фильтры + переключатель */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
          <select
            value={selectedCategory ?? ""}
            onChange={(e) => setSelectedCategory(e.target.value || null)}
            className="border px-3 py-2 rounded"
          >
            <option value="">Все категории</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <div className="flex gap-2 items-center">
            <input
              type="number"
              placeholder="от"
              value={minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value))}
              className="border px-2 py-1 w-20 rounded"
            />
            <span>-</span>
            <input
              type="number"
              placeholder="до"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="border px-2 py-1 w-20 rounded"
            />
          </div>

          <button
            onClick={() => {
              setSelectedCategory(null);
              setMinPrice(0);
              setMaxPrice(1000);
            }}
            className="px-3 py-2 border rounded text-sm text-gray-700 hover:bg-gray-100"
          >
            Сбросить фильтры
          </button>
        </div>

        {/* Переключение Grid/List */}
        <div className="flex gap-2 justify-end">
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
      </div>

      {/* Список товаров */}
      <div
        className={
          view === "grid"
            ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
            : "flex flex-col gap-4"
        }
      >
        {filtered.map((product) => (
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
