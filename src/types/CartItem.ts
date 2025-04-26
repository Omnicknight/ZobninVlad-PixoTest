import { Product } from "./Product";

export type CartItem = Omit<Product, never> & {
  quantity: number;
};

export type CartState = {
  items: CartItem[];
};
