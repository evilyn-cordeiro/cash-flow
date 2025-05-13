import axios from "axios";

const API_BASE_URL = "http://localhost:3000/transaction";

export const getAllTransactions = async () => {
  const response = await axios.get(`${API_BASE_URL}/`);
  return response.data;
};

export const createTransaction = async (transaction: {
  userId: number;
  type: string;
  name: string;
  description: string;
  amount: number;
  pdfUrl?: string;
}) => {
  const response = await axios.post(`${API_BASE_URL}/create`, transaction);
  return response.data;
};

export const getTransactionById = async (id: number) => {
  const response = await axios.get(`${API_BASE_URL}/${id}`);
  return response.data;
};

export const updateTransaction = async (
  id: number,
  updatedData: Partial<{
    type: string;
    name: string;
    description: string;
    amount: number;
    pdfUrl?: string;
  }>
) => {
  const response = await axios.put(`${API_BASE_URL}/${id}`, updatedData);
  return response.data;
};

export const deleteTransaction = async (id: number) => {
  await axios.delete(`${API_BASE_URL}/${id}`);
};
