export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  category: Category;
  categoryId: number;
  warehouse: Warehouse;
  warehouseId: number;
};

export type ProductCreate = {
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
