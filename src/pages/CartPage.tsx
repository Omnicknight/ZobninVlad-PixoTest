import { useAppSelector } from "../hooks/useAppSelector";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { removeFromCart, updateQuantity } from "../store/cartSlice";

export default function CartPage() {
  const items = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">🛒 Корзина</h1>

      {items.length === 0 ? (
        <p className="text-center text-gray-600">Ваша корзина пуста.</p>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row sm:items-center gap-4 border p-4 rounded-lg shadow-sm"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full sm:w-24 h-24 object-contain mx-auto sm:mx-0"
              />

              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-base font-semibold">{item.title}</h2>
                <p className="text-sm text-gray-600">${item.price}</p>
              </div>

              <div className="flex items-center justify-center sm:justify-start gap-2">
                <input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(e) =>
                    dispatch(
                      updateQuantity({
                        id: item.id,
                        quantity: Number(e.target.value),
                      })
                    )
                  }
                  className="w-16 border px-2 py-1 rounded text-center"
                />
                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="text-sm text-red-500 hover:underline"
                >
                  Удалить
                </button>
              </div>
            </div>
          ))}

          <div className="text-right mt-4 text-lg font-bold">
            Итого: <span className="text-blue-600">${total.toFixed(2)}</span>
          </div>
        </div>
      )}
    </div>
  );
}
