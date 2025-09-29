import { Link } from "react-router-dom";

function TransactionList({ transactions, onDelete }) {
  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Do you want to delete this transaction?");
    if (confirmDelete) {
      onDelete(id);
      alert("Transaction deleted successfully!");
    }
  };

  const latestTransactions = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <div className="card">
      <h2>Transaction List</h2>
      <ul>
        {latestTransactions.map((t) => (
          <li key={t.id} className={t.type}>
            {t.description} - {t.amount} ({t.type}) |{" "}
            {new Date(t.date).toLocaleDateString()}{" "}
            <button onClick={() => handleDelete(t.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TransactionList;
