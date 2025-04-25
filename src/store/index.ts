import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import themeReducer from "./themeSlice";
import type { CartItem } from "../types";

// Загружаем корзину из localStorage
const loadCart = (): CartItem[] => {
  try {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

// Подставим в initialState корзины
const preloadedState = {
  cart: {
    items: loadCart(),
  },
};

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    theme: themeReducer,
  },
  preloadedState,
});

// Сохраняем корзину при каждом изменении
store.subscribe(() => {
  const cart = store.getState().cart.items;
  localStorage.setItem("cart", JSON.stringify(cart));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
