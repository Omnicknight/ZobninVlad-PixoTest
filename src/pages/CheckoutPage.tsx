import { useForm } from "react-hook-form";
import { CheckoutFormValues } from "../types";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { clearCart } from "../store/cartSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function CheckoutPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormValues>();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = (_data: CheckoutFormValues) => {
    // Очистка корзины и редирект на главную
    dispatch(clearCart());
    // Всплывающее уведомление после оформления заказа
    toast.success("Спасибо за заказ!");
    navigate("/", { replace: true });
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Оформление заказа</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
        aria-label="Форма оформления заказа"
      >
        <div>
          <label className="block mb-1 font-medium">Имя</label>
          <input
            type="text"
            {...register("name", { required: "Введите имя" })}
            placeholder="Имя"
            aria-label="Имя"
            className="w-full border px-3 py-2 rounded"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            {...register("email", {
              required: "Введите email",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Неверный формат email",
              },
            })}
            placeholder="Email"
            aria-label="Email"
            className="w-full border px-3 py-2 rounded"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Адрес доставки</label>
          <textarea
            rows={3}
            {...register("address", { required: "Введите адрес" })}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.address && (
            <p className="text-red-500 text-sm mt-1">
              {errors.address.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Подтвердить заказ
        </button>
      </form>
    </div>
  );
}
