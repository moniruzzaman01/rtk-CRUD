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
  editing: {},
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
  reducers: {
    activeEditing: (state, action) => {
      state.editing = action.payload;
    },
    InactiveEditing: (state) => {
      state.editing = {};
    },
  },
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
      })
      .addCase(removeTransaction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.transactions = state.transactions.filter(
          (t) => t.id != action.meta.arg
        );
        state.isError = false;
      })
      .addCase(removeTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      })
      .addCase(editTransaction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.transactions = state.transactions.map((t) => {
          if (t.id == action.payload.id) {
            t = action.payload;
          }
          return t;
        });
      })
      .addCase(editTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      });
  },
});

export default TransactionsSlice.reducer;
export const { activeEditing, InactiveEditing } = TransactionsSlice.actions;
