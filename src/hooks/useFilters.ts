import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Product } from "../types";

export const useFilters = (products: Product[]) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(1000);

  // При загрузке подтягиваем параметры из URL
  useEffect(() => {
    const category = searchParams.get("category");
    const min = searchParams.get("minPrice");
    const max = searchParams.get("maxPrice");

    if (category) setSelectedCategory(category);
    if (min) setMinPrice(Number(min));
    if (max) setMaxPrice(Number(max));
  }, [searchParams]);

  // Синхронизация состояния фильтров с URL
  useEffect(() => {
    const params: any = {};

    if (selectedCategory) params.category = selectedCategory;
    if (minPrice !== 0) params.minPrice = minPrice.toString();
    if (maxPrice !== 1000) params.maxPrice = maxPrice.toString();

    setSearchParams(params);
  }, [selectedCategory, minPrice, maxPrice, setSearchParams]);

  // Мемоизируем фильтрацию товаров
  const filtered = useMemo(() => {
    return products
      .filter((product) => {
        if (!selectedCategory) return true;
        return product.category === selectedCategory;
      })
      .filter(
        (product) => product.price >= minPrice && product.price <= maxPrice
      );
  }, [products, selectedCategory, minPrice, maxPrice]);

  // Сброс фильтров
  const resetFilters = () => {
    setSelectedCategory(null);
    setMinPrice(0);
    setMaxPrice(1000);
  };

  return {
    filtered,
    selectedCategory,
    minPrice,
    maxPrice,
    setSelectedCategory,
    setMinPrice,
    setMaxPrice,
    resetFilters,
  };
};
