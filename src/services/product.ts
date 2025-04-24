import { ApiResponse, Product } from "../types/typing";
import api from "./Api/api";

export const FetchProduct = async <Product>(url: string) => {
  try {
    const response = await api.get<ApiResponse<Product>>(url);
    return response.data.data;
  } catch (error) {
    console.error(error, "Failed Fetch Product");
  }
};

export const CreateProduct = async (url: string, data: Product) => {
  try {
    const response = await api.post<ApiResponse<Product>>(url, data);
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
};
