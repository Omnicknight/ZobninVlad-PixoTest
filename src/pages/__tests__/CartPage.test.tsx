import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../../store/cartSlice";
import CartPage from "../CartPage";

// Мокаем стартовое состояние корзины
const mockCartItems = [
  {
    id: 1,
    title: "Test Product 1",
    price: 100,
    image: "image1.jpg",
    quantity: 2,
    category: "test-category",
    description: "test-description",
    rating: {
      rate: 4.5,
      count: 100,
    },
  },
  {
    id: 2,
    title: "Test Product 2",
    price: 200,
    image: "image2.jpg",
    quantity: 1,
    category: "test-category",
    description: "test-description",
    rating: {
      rate: 4.2,
      count: 50,
    },
  },
];

// Функция для рендера CartPage с моковым стором
function renderWithStore(initialCartItems = mockCartItems) {
  const store = configureStore({
    reducer: {
      cart: cartReducer,
    },
    preloadedState: {
      cart: {
        items: initialCartItems,
      },
    },
  });

  return render(
    <Provider store={store}>
      <MemoryRouter>
        <CartPage />
      </MemoryRouter>
    </Provider>
  );
}

describe("CartPage", () => {
  // Тест на отображение товаров из корзины
  it("should display items from the cart", () => {
    renderWithStore();

    // Проверяем, что оба товара отображаются
    expect(screen.getByText("Test Product 1")).toBeInTheDocument();
    expect(screen.getByText("Test Product 2")).toBeInTheDocument();
  });
  // Тест на общую сумму
  it("should display the total amount", () => {
    renderWithStore();

    // 100*2 + 200*1 = 400
    expect(screen.getByText(/Итого:/i)).toHaveTextContent("400");
  });
  // Тест на отображение кнопки "Перейти к офорлению"
  it('should show the "Proceed to checkout" button', () => {
    renderWithStore();

    expect(
      screen.getByRole("link", { name: /Перейти к оформлению/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Перейти к оформлению/i })
    ).toHaveAttribute("href", "/checkout");
  });
  // Тест на отображение пустой корзины
  it('should show the message "Cart is empty" if there are no items', () => {
    renderWithStore([]); // Пустая корзина

    expect(screen.getByText(/Ваша корзина пуста/i)).toBeInTheDocument();
  });
});
