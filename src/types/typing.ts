export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  category: Category | null;
  categoryId: number;
  warehouse: Warehouse | null;
  warehouseId: number;
};

export type ProductRequest = {
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  categoryId: number;
  warehouseId: number;
};

export type Category = {
  id: number;
  name: string;
  total: number;
};

export type Warehouse = {
  id: number;
  name: string;
  address: string;
  phone: string;
};

export type ApiResponse<T> = {
  data: T;
  message: string | null;
};
