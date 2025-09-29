import React from "react";
import { Link } from "react-router-dom";

function TransactionDetailPage({ transactions }) {
  return (
    <div className="card">
      <h2>Detailed Transaction List</h2>
      <ul>
        {transactions.length === 0 ? (
          <p>No transactions found.</p>
        ) : (
          transactions.map((t) => (
            <li key={t.id} className={t.type}>
              <strong>{t.description}</strong> - {t.amount} ({t.type}) |{" "}
              {new Date(t.date).toLocaleDateString()}
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
