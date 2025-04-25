import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api/axios";
import { Product } from "../types";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { addToCart } from "../store/cartSlice";

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);
  const dispatch = useAppDispatch();
  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product));
      setAdded(true);
      setTimeout(() => setAdded(false), 1500);
    }
  };

  useEffect(() => {
    if (!id) return;
    api
      .get<Product>(`/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("Error fetching product", err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="p-4">Loading...</div>;
  if (!product) return <div className="p-4">Product not found</div>;

  return (
    <div className="p-4 flex flex-col md:flex-row gap-6 max-w-4xl mx-auto">
      <img
        src={product.image}
        alt={product.title}
        className="w-full md:w-1/2 h-96 object-contain"
      />
      <div className="flex-1">
        <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
        <p className="text-gray-600 mb-4">{product.category}</p>
        <p className="text-lg font-semibold mb-4">${product.price}</p>
        <p className="mb-4">{product.description}</p>
        <p className="text-sm text-yellow-500">
          ⭐ {product.rating.rate} / 5 ({product.rating.count} reviews)
        </p>
        <button
          onClick={handleAddToCart}
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add to cart
        </button>
        {added && <p className="text-green-600 mt-2">✔️ Добавлено в корзину</p>}
      </div>
    </div>
  );
}
