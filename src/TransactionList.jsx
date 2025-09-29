import React, { useEffect, useState } from "react";

function TransactionList() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await fetch("/transactions.json");
        const data = await res.json();
        setTransactions(data);
      } catch (err) {
        console.error("Error fetching transactions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (loading) return <p>Loading transactions...</p>;

  return (
    <div className="card">
      <h2>Transaction List</h2>
      <ul>
        {transactions.map((t) => (
          <li key={t.id} className={t.type}>
            {t.description} - Rp {t.amount.toLocaleString()} ({t.type}) |{" "}
            {new Date(t.date).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TransactionList;
