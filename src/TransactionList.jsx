import React from "react";

function TransactionList({ transactions}) {

  return (
    <div className="card">
      <h2>Transaction List</h2>
      <ul>
        {transactions.length === 0 ? (
          <p>No transactions found.</p>
        ) : (
          transactions.map((t) => (
            <li key={t.id} className={t.type}>
              {t.description} - Rp {t.amount.toLocaleString()} ({t.type}) |{" "}
              {new Date(t.date).toLocaleDateString()}{" "}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default TransactionList;
