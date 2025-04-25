import { Product } from "./Product";

export type CartItem = Omit<Product, never> & {
  quantity: number;
};
