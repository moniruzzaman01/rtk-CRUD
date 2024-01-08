import axiosInstance from "../../axios/axiosInstance";

export const fetchTransactions = async () => {
  const response = await axiosInstance.get("/transactions");
  return response.data;
};
export const insertTransaction = async (data) => {
  const response = await axiosInstance.post("/transactions", data);
  return response.data;
};
export const deleteTransaction = async (id) => {
  const response = await axiosInstance.delete(`/transactions/${id}`);
  return response.data;
};
export const updateTransaction = async (id, data) => {
  const response = await axiosInstance.get(`/transactions/${id}`, data);
  return response.data;
};
