function TransactionList({ transactions }) {
  return (
    <div className="card">
      <h2>Transaction List</h2>
      <ul>
        {transactions.map((t) => (
          <li key={t.id} className={t.type}>
            {t.description} - {t.amount} ({t.type})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TransactionList;
