import { useEffect } from "react";
import Transaction from "./components/Transaction";
import TransactionForm from "./components/TransactionForm";
import { useDispatch, useSelector } from "react-redux";
import { loadTransactions } from "./features/transactions/TransactionsSlice";

export default function App() {
  const dispatch = useDispatch();
  const { transactions } = useSelector((state) => state.transactions);
  console.log(transactions);
  useEffect(() => {
    dispatch(loadTransactions());
  }, [dispatch]);

  return (
    <div className="App">
      {/* navbar */}
      <div className="header">
        <h1>Expense Tracker</h1>
      </div>

      <div className="main">
        <div className="container">
          <div className="top_card">
            <p>Your Current Balance</p>
            <h3>
              <span>৳</span>
              <span>10500</span>
            </h3>
          </div>
          {/* transaction form */}
          <TransactionForm />
          {/* transactions */}
          <p className="second_heading">Your Transactions:</p>
          <div className="conatiner_of_list_of_transactions">
            <ul>
              <Transaction />
            </ul>
          </div>
        </div>
      </div>
      {/* footer */}
      <div className="footer">&copy;2022 Learn with Sumit</div>
    </div>
  );
}
