import { Link } from "react-router-dom";

function TransactionDetailPage({ transactions, onDelete }) {
  return (
    <div className="card">
      <h2>Detailed Transaction List</h2>
      <ul>
        {transactions.length === 0 ? (
          <p>No transactions found.</p>
        ) : (
          transactions.map((t) => (
            <li key={t.id} className={t.type}>
              {new Date(t.date).toLocaleDateString()} {" "} | {" "} {t.description} - {t.amount} ({t.type})
              <button className="btn-delete"
                onClick={() => {
                  if (window.confirm("Are you sure you want to delete this transaction?")) {
                    onDelete(t.id);
                  }
                }}
              > Delete
              </button>
            </li>
          ))
        )}
      </ul>
      <Link to="/">
        <button className="btn-back">⬅ Back</button>
      </Link>
    </div>
  );
}

export default TransactionDetailPage;
