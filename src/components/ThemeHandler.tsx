import { useEffect } from "react";
import { useAppSelector } from "../hooks/useAppSelector";

export default function ThemeHandler() {
  const theme = useAppSelector((state) => state.theme.theme);
  // При смене темы накидываем на корневой элемент нужный класс
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  return null;
}
