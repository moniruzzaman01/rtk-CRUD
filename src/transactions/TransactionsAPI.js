import axiosInstance from "../axios/axiosInstance";

export const fetchTransactions = async () => {
  const response = await axiosInstance.get("/transactions");
  return response.data;
};
export const insertTransactions = async (data) => {
  const response = await axiosInstance.post("/transactions", data);
  return response.data;
};
export const deleteTransactions = async (id) => {
  const response = await axiosInstance.delete(`/transactions/${id}`);
  return response.data;
};
export const updateTransactions = async (id, data) => {
  const response = await axiosInstance.get(`/transactions/${id}`, data);
  return response.data;
};
