import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  activeEditing,
  addTransaction,
  editTransaction,
} from "../features/transactions/TransactionsSlice";

export default function TransactionForm() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");
  const [editMode, setEditMode] = useState(false);
  const dispatch = useDispatch();
  const { editing } = useSelector((state) => state.transactions);

  useEffect(() => {
    if (editing.id) {
      setName(editing.name);
      setType(editing.type);
      setAmount(editing.amount);
      setEditMode(true);
    } else {
      resetForm();
      setEditMode(false);
    }
  }, [editing]);

  const resetForm = () => {
    setName("");
    setType("");
    setAmount("");
  };
  const handleAddTransaction = () => {
    if (!name || !type || !amount) return;
    dispatch(addTransaction({ name, type, amount: parseInt(amount) }));
    resetForm();
  };
  const handleEditTransaction = () => {
    dispatch(
      editTransaction({
        id: editing.id,
        data: { name, type, amount: parseInt(amount) },
      })
    );
    resetForm();
    setEditMode(false);
  };
  const handleCancelEdit = () => {
    dispatch(activeEditing({}));
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
            checked={type == "income" && true}
            onChange={() => setType("income")}
          />
          <label onClick={() => setType("income")} htmlFor="transaction_type">
            Income
          </label>
        </div>
        <div className="radio_group">
          <input
            type="radio"
            value="expense"
            name="transaction_type"
            placeholder="Expense"
            checked={type == "expense" && true}
            onChange={() => setType("expense")}
          />
          <label onClick={() => setType("expense")} htmlFor="transaction_type">
            Expense
          </label>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="transaction_amount">Amount</label>
        <input
          onChange={(e) => setAmount(e.target.value)}
          type="number"
          placeholder="300"
          name="transaction_amount"
          value={amount}
        />
      </div>

      <button
        onClick={editMode ? handleEditTransaction : handleAddTransaction}
        className="btn"
      >
        {editMode ? "Update Transaction" : "Add Transaction"}
      </button>

      {editMode && (
        <button onClick={handleCancelEdit} className="btn cancel_edit">
          Cancel Edit
        </button>
      )}
    </div>
  );
}
