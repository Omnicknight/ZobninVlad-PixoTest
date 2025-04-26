import { createSlice } from "@reduxjs/toolkit";
import { Theme, ThemeState } from "../types";

const initialState: ThemeState = {
  theme: (localStorage.getItem("theme") as Theme) || "light",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme(state) {
      state.theme = state.theme === "dark" ? "light" : "dark";
      localStorage.setItem("theme", state.theme);
    }
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
