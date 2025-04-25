import { api } from "./axios";

export const fetchCategories = async (): Promise<string[]> => {
  const res = await api.get<string[]>("/products/categories");
  return res.data;
};
