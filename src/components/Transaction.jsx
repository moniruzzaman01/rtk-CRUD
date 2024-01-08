import editImage from "../assets/images/edit.svg";
import deleteImage from "../assets/images/delete.svg";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import {
  activeEditing,
  removeTransaction,
} from "../features/transactions/TransactionsSlice";

export default function Transaction({ transaction }) {
  const { id, name, type, amount } = transaction || {};
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(removeTransaction(id));
  };

  const handleEdit = () => {
    dispatch(activeEditing(transaction));
  };

  return (
    <li className={`transaction  ${type}`}>
      <p>{name}</p>
      <div className="right">
        <p>৳ {amount}</p>
        <button onClick={handleEdit} className="link">
          <img className="icon" src={editImage} />
        </button>
        <button onClick={handleDelete} className="link">
          <img className="icon" src={deleteImage} />
        </button>
      </div>
    </li>
  );
}

Transaction.propTypes = {
  transaction: PropTypes.object,
};
