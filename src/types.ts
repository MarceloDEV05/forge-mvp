export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  image: string;
  description: string;
  featured: boolean;
  tag?: string;
};
export type CartItem = { id: string; quantity: number };
