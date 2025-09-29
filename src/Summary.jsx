function Summary({ transactions }) {
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const balance = totalIncome - totalExpense;

  return (
    <div className="card summary">
      <h2>Summary</h2>
      <p>Income: {totalIncome}</p>
      <p>Expense: {totalExpense}</p>
      <p>Balance: {balance}</p>
    </div>
  );
}

export default Summary;
