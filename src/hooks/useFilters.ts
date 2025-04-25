import { useEffect, useState } from "react";
import { Product } from "../types";
import { useSearchParams } from "react-router-dom";

export const useFilters = (products: Product[]) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(1000);

  // Загрузка фильтров из URL
  useEffect(() => {
    const cat = searchParams.get("category");
    const min = Number(searchParams.get("min") || 0);
    const max = Number(searchParams.get("max") || 1000);

    if (cat) setSelectedCategory(cat);
    setMinPrice(min);
    setMaxPrice(max);
  }, []);

  // Синхронизация URL при изменении фильтров
  useEffect(() => {
    const params: Record<string, string> = {};
    if (selectedCategory) params.category = selectedCategory;
    if (minPrice !== 0) params.min = String(minPrice);
    if (maxPrice !== 1000) params.max = String(maxPrice);
    setSearchParams(params);
  }, [selectedCategory, minPrice, maxPrice]);

  // Применение фильтров к массиву
  const filtered = products
    .filter((p) => (selectedCategory ? p.category === selectedCategory : true))
    .filter((p) => p.price >= minPrice && p.price <= maxPrice);

  const resetFilters = () => {
    setSelectedCategory(null);
    setMinPrice(0);
    setMaxPrice(1000);
  };

  return {
    selectedCategory,
    setSelectedCategory,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    resetFilters,
    filtered,
  };
};
