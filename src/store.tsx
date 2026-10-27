import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { CartItem, Product } from "./types";
import { initialProducts } from "./data";

type Store = {
  products: Product[];
  cart: CartItem[];
  add: (id: string) => void;
  change: (id: string, delta: number) => void;
  remove: (id: string) => void;
  save: (p: Product) => void;
  deleteProduct: (id: string) => void;
  reset: () => void;
  count: number;
};

const Context = createContext<Store | null>(null);
function read<T>(key: string, fallback: T): T {
  try {
    const s = localStorage.getItem(key);
    return s ? (JSON.parse(s) as T) : fallback;
  } catch {
    return fallback;
  }
}
export function StoreProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(() =>
    read("forge-products-v1", initialProducts),
  );
  const [cart, setCart] = useState<CartItem[]>(() => read("forge-cart-v1", []));
  useEffect(
    () => localStorage.setItem("forge-products-v1", JSON.stringify(products)),
    [products],
  );
  useEffect(
    () => localStorage.setItem("forge-cart-v1", JSON.stringify(cart)),
    [cart],
  );
  const add = (id: string) => {
    const product = products.find((p) => p.id === id);
    if (!product || product.stock < 1) return;
    setCart((old) => {
      const existing = old.find((x) => x.id === id);
      return existing
        ? old.map((x) =>
            x.id === id
              ? { ...x, quantity: Math.min(product.stock, x.quantity + 1) }
              : x,
          )
        : [...old, { id, quantity: 1 }];
    });
  };
  const change = (id: string, delta: number) =>
    setCart((old) =>
      old
        .map((x) =>
          x.id === id
            ? {
                ...x,
                quantity: Math.min(
                  Math.max(0, products.find((p) => p.id === id)?.stock ?? 0),
                  Math.max(0, x.quantity + delta),
                ),
              }
            : x,
        )
        .filter((x) => x.quantity > 0),
    );
  const remove = (id: string) =>
    setCart((old) => old.filter((x) => x.id !== id));
  const save = (p: Product) =>
    setProducts((old) =>
      old.some((x) => x.id === p.id)
        ? old.map((x) => (x.id === p.id ? p : x))
        : [p, ...old],
    );
  const deleteProduct = (id: string) => {
    setProducts((old) => old.filter((x) => x.id !== id));
    remove(id);
  };
  const reset = () => {
    setProducts(initialProducts);
    setCart([]);
  };
  const count = cart.reduce((n, x) => n + x.quantity, 0);
  return (
    <Context.Provider
      value={{
        products,
        cart,
        add,
        change,
        remove,
        save,
        deleteProduct,
        reset,
        count,
      }}
    >
      {children}
    </Context.Provider>
  );
}
export function useStore() {
  const value = useContext(Context);
  if (!value) throw new Error("StoreProvider ausente");
  return value;
}
