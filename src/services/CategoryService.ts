import Api from "./Api/api";

export type Category = {
  id: number;
  name: string;
};

type ApiResponse<T> = {
  data: T;
  message: string | null;
}

// Get api Category
export const GetCategory = async <T>(url: string): Promise<T> => {
  try {
    const response = await Api.get<ApiResponse<T>>(url);
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Create Api category
export const CreateCategory = async <T>(url: string):Promise<T> => {
  try {
    const response = await Api.post<ApiResponse<T>>(url);
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
