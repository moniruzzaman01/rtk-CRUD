import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  deleteTransaction,
  fetchTransactions,
  insertTransaction,
  updateTransaction,
} from "./TransactionsAPI";

const initialState = {
  transactions: [],
  isLoading: false,
  isError: false,
  error: "",
};

export const loadTransactions = createAsyncThunk(
  "transactions/loadTransactions",
  async () => {
    const transactions = await fetchTransactions();
    return transactions;
  }
);
export const addTransaction = createAsyncThunk(
  "transactions/addTransaction",
  async (data) => {
    const transactions = await insertTransaction(data);
    return transactions;
  }
);
export const removeTransaction = createAsyncThunk(
  "transactions/removeTransaction",
  async (id) => {
    const transactions = await deleteTransaction(id);
    return transactions;
  }
);
export const editTransaction = createAsyncThunk(
  "transactions/editTransaction",
  async ({ id, data }) => {
    const transactions = await updateTransaction(id, data);
    return transactions;
  }
);

const TransactionsSlice = createSlice({
  name: "transactions",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(loadTransactions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.transactions = action.payload;
        state.isError = false;
      })
      .addCase(loadTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      })
      .addCase(addTransaction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.transactions.push(action.payload);
        state.isError = false;
      })
      .addCase(addTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      });
  },
});

export default TransactionsSlice.reducer;
