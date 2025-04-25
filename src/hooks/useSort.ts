import { useState, useMemo } from "react";
import { Product, SortOption } from "../types";

export const useSort = (products: Product[]) => {
  const [sortOption, setSortOption] = useState<SortOption>("price-asc");

  // Используем useMemo для оптимизации производительности
  const sorted = useMemo(() => {
    const sortedProducts = [...products];
    // Фильтрация по выбраному параметру
    switch (sortOption) {
      case "price-asc":
        return sortedProducts.sort((a, b) => a.price - b.price);
      case "price-desc":
        return sortedProducts.sort((a, b) => b.price - a.price);
      case "name-asc":
        return sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
      case "rating-desc":
        return sortedProducts.sort((a, b) => b.rating.rate - a.rating.rate);
      default:
        return products;
    }
  }, [products, sortOption]);

  return { sorted, sortOption, setSortOption };
};
