import {
  ApiResponse,
  TransactionRequest,
  TransactionWithItems,
} from "../types/typing";
import api from "./Api/api";

export const getTransactions = async (url: string) => {
  const response = await api.get<ApiResponse<TransactionWithItems[]>>(url);
  return response.data.data;
};

export const createTransaction = async (
  url: string,
  transaction: TransactionRequest
) => {
  const response = await api.post<ApiResponse<TransactionWithItems>>(
    url,
    transaction
  );
  return response.data.data;
};

export const deleteTransaction = async (url: string, id: number) => {
  const response = await api.delete<ApiResponse<TransactionWithItems>>(
    `${url}/${id}`
  );
  return response.data.data;
};

export const updateTransaction = async (
  url: string,
  id: number,
  transaction: TransactionRequest
) => {
  const response = await api.put<ApiResponse<TransactionWithItems>>(
    `${url}/${id}`,
    transaction
  );
  return response.data.data;
};
