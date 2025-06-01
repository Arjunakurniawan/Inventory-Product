import { ApiResponse, ProductRequest } from "../types/typing";
import api from "./Api/api";

export const FetchProduct = async <ProductRequest>(url: string) => {
  try {
    const response = await api.get<ApiResponse<ProductRequest>>(url);
    return response.data.data;
  } catch (error) {
    console.error(error, "Failed Fetch Product");
  }
};

export const FetchProductById = async (url: string, id: number) => {
  try {
    const response = await api.get<ApiResponse<ProductRequest>>(`${url}/${id}`);
    return response.data.data;
  } catch (error) {
    console.error(error);
    return null;
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

export const UpdateProduct = async (url: string, data: ProductRequest) => {
  try {
    const response = await api.put<ApiResponse<ProductRequest>>(url, data);
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
};
