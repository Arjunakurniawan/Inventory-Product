import Api from "./Api/api";
import { ApiResponse } from "../types/typing";

export const FetchWarehouse = async <Warehouse>(
  url: string
): Promise<Warehouse> => {
  try {
    const response = await Api.get<ApiResponse<Warehouse>>(url);
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const CreateWarehouse = async <Warehouse>(
  url: string,
  newWarehouse: {
    name: string;
    phone: string;
    address: string;
  }
): Promise<Warehouse> => {
  try {
    const response = await Api.post<ApiResponse<Warehouse>>(url, newWarehouse);
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
