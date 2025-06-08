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
};

export type Warehouse = {
  id: number;
  name: string;
  address: string;
  phone: string;
};

export type ApiResponse<T> = {
  data: T;
  total: number;
  message: string | null;
};

// Transaction types (modeled after backend)
export type TransactionType = "INCOMING" | "OUTCOMING";

export type Transaction = {
  id: number;
  type: TransactionType;
  createdAt: string;
};

export type TransactionItem = {
  productId: number;
  transactionId: number;
  quantity: number;
  price: number;
  product: Product | null;
};

export type TransactionWithItems = {
  id: number;
  type: TransactionType;
  createdAt: string;
  items: TransactionItem[];
};

export type TransactionRequest = {
  type: TransactionType;
  items: [
    {
      productId: number;
      quantity: number;
      price: number;
    }
  ];
};
