export type product = {
  name: string;
  description?: string;
  price: number;
  stock: number;
  image?: string;
  warehouseId: number;
  categoryId: number;
};

export type category = {
  name: string;
};

export type warehouse = {
  name: string;
  address: string;
  phone: string;
};

export type transaction = {
  type: string;
  productId: number;
  quantity: number;
};
