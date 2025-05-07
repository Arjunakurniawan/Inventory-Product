import { ApiResponse, ProductRequest } from "../types/typing";
import api from "./Api/api";

export const FetchProduct = async <Product>(url: string) => {
  try {
    const response = await api.get<ApiResponse<Product>>(url);
    return response.data.data;
  } catch (error) {
    console.error(error, "Failed Fetch Product");
  }
};

export const CreateProduct = async <ProductRequest>(
  url: string,
  newData: ProductRequest
) => {
  try {
    const response = await api.post<ApiResponse<ProductRequest>>(url, newData);
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
};

export const DeleteProduct = async (url: string) => {
  try {
    const response = await api.delete<ApiResponse<ProductRequest>>(url);
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
};
