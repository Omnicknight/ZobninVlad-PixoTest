import { useEffect, useState } from "react";
import { api } from "../api/axios";
import { Product } from '../types'

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get<Product[]>("/products")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch products:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {products.map((product) => (
        <div key={product.id} className="border rounded p-2 hover:shadow">
          <img
            src={product.image}
            alt={product.title}
            className="h-40 mx-auto object-contain"
          />
          <h2 className="text-sm font-semibold mt-2 line-clamp-2">
            {product.title}
          </h2>
          <p className="text-sm text-gray-600">${product.price}</p>
        </div>
      ))}
    </div>
  );
}
