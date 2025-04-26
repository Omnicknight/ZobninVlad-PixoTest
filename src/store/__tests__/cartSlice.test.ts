/**
 * @jest-environment jsdom
 */

import cartReducer, {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
} from "../cartSlice";
import { Product } from "../../types";

// Моковый товар для тестирования
const product: Product = {
  id: 1,
  title: "Test Product",
  price: 99,
  category: "test",
  description: "A test product",
  image: "image.jpg",
  rating: {
    rate: 4.5,
    count: 100,
  },
};

describe("cartSlice reducer", () => {
  // Тест на начальное состояние
  it("should handle initial state", () => {
    expect(cartReducer(undefined, { type: "" })).toEqual({ items: [] });
  });
  // Тест добавления нового товара в корзину
  it("should add a product to cart", () => {
    const state = cartReducer(undefined, addToCart(product));
    expect(state.items).toHaveLength(1);
    expect(state.items[0].id).toBe(product.id);
    expect(state.items[0].quantity).toBe(1);
  });
  // Тест добавления того же самого товара ещё раз
  it("should increase quantity if same product is added again", () => {
    const initial = { items: [{ ...product, quantity: 1 }] };
    const state = cartReducer(initial, addToCart(product));
    expect(state.items).toHaveLength(1);
    expect(state.items[0].quantity).toBe(2);
  });
  // Тест изменения количества товара
  it("should update product quantity", () => {
    const initial = { items: [{ ...product, quantity: 2 }] };
    const state = cartReducer(
      initial,
      updateQuantity({ id: product.id, quantity: 5 })
    );
    expect(state.items[0].quantity).toBe(5);
  });
  // Тест удаления товара из корзины
  it("should remove product from cart", () => {
    const initial = { items: [{ ...product, quantity: 1 }] };
    const state = cartReducer(initial, removeFromCart(product.id));
    expect(state.items).toHaveLength(0);
  });
  // Тест очистки всей корзины
  it("should clear the cart", () => {
    const initial = { items: [{ ...product, quantity: 3 }] };
    const state = cartReducer(initial, clearCart());
    expect(state.items).toHaveLength(0);
  });
});
