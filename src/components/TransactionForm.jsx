import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTransaction } from "../features/transactions/TransactionsSlice";

export default function TransactionForm() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [amount, setAmount] = useState(0);
  const dispatch = useDispatch();

  const handleTransaction = () => {
    dispatch(addTransaction({ name, type, amount: parseInt(amount) }));
  };

  return (
    <div className="form">
      <h3>Add new transaction</h3>
      <div className="form-group">
        <label htmlFor="transaction_name">Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          name="transaction_name"
          placeholder="My Salary"
        />
      </div>

      <div className="form-group radio">
        <label htmlFor="transaction_type">Type</label>
        <div className="radio_group">
          <input
            type="radio"
            value="income"
            name="transaction_type"
            onChange={() => setType("income")}
          />
          <label htmlFor="transaction_type">Income</label>
        </div>
        <div className="radio_group">
          <input
            type="radio"
            value="expense"
            name="transaction_type"
            placeholder="Expense"
            onChange={() => setType("expense")}
          />
          <label htmlFor="transaction_type">Expense</label>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="transaction_amount">Amount</label>
        <input
          onChange={(e) => setAmount(e.target.value)}
          type="number"
          placeholder="300"
          name="transaction_amount"
        />
      </div>

      <button onClick={handleTransaction} className="btn">
        Add Transaction
      </button>

      {/* <button className="btn cancel_edit">Cancel Edit</button> */}
    </div>
  );
}
