import { render, screen } from "@testing-library/react";
import { useFilters } from "../useFilters";
import { Product } from "../../types";
import userEvent from "@testing-library/user-event";
// Специальный роутер для тестов, необходим, так как мы рендерим тестовый компонент без обертки <Router>
import { MemoryRouter } from "react-router-dom";

// Моковые товары
const products: Product[] = [
  {
    id: 1,
    title: "Product A",
    price: 50,
    category: "electronics",
    description: "",
    image: "",
    rating: { rate: 4, count: 100 },
  },
  {
    id: 2,
    title: "Product B",
    price: 150,
    category: "clothing",
    description: "",
    image: "",
    rating: { rate: 4.5, count: 50 },
  },
];

// Тестовый компонент для проверки работы useFilters
function FiltersTestComponent() {
  const {
    filtered,
    setSelectedCategory,
    setMinPrice,
    setMaxPrice,
    resetFilters,
  } = useFilters(products);

  return (
    <div>
      <button onClick={() => setSelectedCategory("electronics")}>
        Фильтровать по категории
      </button>
      <button
        onClick={() => {
          setMinPrice(100);
          setMaxPrice(200);
        }}
      >
        Фильтровать по цене
      </button>
      <button onClick={resetFilters}>Сбросить фильтры</button>

      <ul>
        {filtered.map((product) => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>
    </div>
  );
}

describe("useFilters (inside the component)", () => {
  // Тест отображения всех товаров
  it("should show all products by default", () => {
    render(
      <MemoryRouter>
        <FiltersTestComponent />
      </MemoryRouter>
    );
    expect(screen.getAllByRole("listitem")).toHaveLength(2); // Должны быть оба товара
  });
  // Тест фильтрации по категориям
  it("must filter products by category", async () => {
    render(
      <MemoryRouter>
        <FiltersTestComponent />
      </MemoryRouter>
    );
    const button = screen.getByText("Фильтровать по категории");
    await userEvent.click(button);

    expect(screen.getAllByRole("listitem")).toHaveLength(1);
    expect(screen.getByText("Product A")).toBeInTheDocument();
  });
  // Тест на фильтрацию по цене
  it("must filter products by price range", async () => {
    render(
      <MemoryRouter>
        <FiltersTestComponent />
      </MemoryRouter>
    );
    const button = screen.getByText("Фильтровать по цене");
    await userEvent.click(button);

    expect(screen.getAllByRole("listitem")).toHaveLength(1);
    expect(screen.getByText("Product B")).toBeInTheDocument();
  });
  // Тест на сброс фильтров
  it("must reset filters", async () => {
    render(
      <MemoryRouter>
        <FiltersTestComponent />
      </MemoryRouter>
    );
    const filterButton = screen.getByText("Фильтровать по категории");
    const resetButton = screen.getByText("Сбросить фильтры");

    await userEvent.click(filterButton);
    expect(screen.getAllByRole("listitem")).toHaveLength(1);

    await userEvent.click(resetButton);
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });
});
