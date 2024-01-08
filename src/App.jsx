import { useEffect } from "react";
import Transaction from "./components/Transaction";
import TransactionForm from "./components/TransactionForm";
import { useDispatch, useSelector } from "react-redux";
import { loadTransactions } from "./features/transactions/TransactionsSlice";

export default function App() {
  const dispatch = useDispatch();
  const { transactions, isLoading, isError, error } = useSelector(
    (state) => state.transactions
  );

  useEffect(() => {
    dispatch(loadTransactions());
  }, [dispatch]);

  let content = null;
  if (isLoading) {
    content = <li>Loading...</li>;
  } else if (!isLoading && isError) {
    content = <li>{error}</li>;
  } else if (transactions.length == 0) {
    content = <li>No transactions found!!!</li>;
  } else {
    content = transactions.map((transaction, key) => (
      <Transaction key={key} transaction={transaction} />
    ));
  }

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
              <span>
                {transactions.reduce(
                  (prev, curr) =>
                    prev +
                    (curr.type == "income" ? curr.amount : -1 * curr.amount),
                  0
                )}
              </span>
            </h3>
          </div>
          {/* transaction form */}
          <TransactionForm />
          {/* transactions */}
          <p className="second_heading">Your Transactions:</p>
          <div className="conatiner_of_list_of_transactions">
            <ul>{content}</ul>
          </div>
        </div>
      </div>
      {/* footer */}
      <div className="footer">&copy;2022 Learn with Sumit</div>
    </div>
  );
}
