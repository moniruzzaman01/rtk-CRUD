import { configureStore } from "@reduxjs/toolkit";
import TransactionReducer from "../features/transactions/TransactionsSlice";

const store = configureStore({
  reducer: {
    transactions: TransactionReducer,
  },
});

export default store;
