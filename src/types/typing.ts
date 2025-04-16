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
