import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { toggleTheme } from "../store/themeSlice";

export default function ThemeToggle() {
  const theme = useAppSelector((state) => state.theme.theme);
  const dispatch = useAppDispatch();

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      className="px-2 py-1 border rounded text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
      aria-label="Переключить тему"
    >
      {theme === "dark" ? "🌙 Тёмная" : "🌞 Светлая"}
    </button>
  );
}
