import { ApiResponse } from "../types/typing";
import api from "./Api/api";

export const FetchProduct = async <Product>(url: string) => {
  try {
    const response = await api.get<ApiResponse<Product>>(url);
    return response.data.data;
  } catch (error) {
    console.error(error, "Failed Fetch Product");
  }
};

export const CreateProduct = async <Product>(
  url: string,
  newData: {
    name: string;
    description: string;
    price: number;
    stock: number;
    image: string;
    categoryId: number;
    warehouseId: number;
  }
) => {
  try {
    const response = await api.post<ApiResponse<Product>>(url, newData);
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
};

export const DeleteProduct = async () => {
  
}
