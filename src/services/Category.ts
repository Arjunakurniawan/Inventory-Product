import Api from "./Api/api";
import { ApiResponse } from "../types/typing";

// Get api Category
export const FetchCategory = async <T>(url: string): Promise<T> => {
  try {
    const response = await Api.get<ApiResponse<T>>(url);
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Create Api category
export const CreateCategory = async <Category>(
  url: string,
  newCategory: { name: string }
): Promise<Category> => {
  try {
    const response = await Api.post<ApiResponse<Category>>(url, newCategory);
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//Delete Api category
export const DeleteCategory = async <Category>(
  url: string
): Promise<Category> => {
  try {
    const response = await Api.delete<ApiResponse<Category>>(url);
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Update Api category
export const UpdateCategory = async <Category>(
  url: string,
  updatedCategory: { name: string }
): Promise<Category> => {
  try {
    const response = await Api.put<ApiResponse<Category>>(url, updatedCategory);
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
