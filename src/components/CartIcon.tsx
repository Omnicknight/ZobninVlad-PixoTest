import { Link } from "react-router-dom";
import { useAppSelector } from "../hooks/useAppSelector";

export default function CartIcon() {
  const items = useAppSelector((state) => state.cart.items);
  const total = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Link to="/cart" className="relative" aria-label="Корзина">
      🛒
      {total > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
          {total}
        </span>
      )}
    </Link>
  );
}
