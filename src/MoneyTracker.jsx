import React, { useState } from "react";

function MoneyTracker({ transactions, addTransaction }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !amount) return;

    addTransaction({
      id: Date.now(),
      description,
      amount: parseFloat(amount),
      type,
    });

    setDescription("");
    setAmount("");
  };

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const balance = totalIncome - totalExpense;

  return (
    <div>
      <h2>Money Tracker</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="Total"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <button type="submit">Add</button>
      </form>

      <h3>Ringkasan</h3>
      <p>Income: {totalIncome}</p>
      <p>Expense: {totalExpense}</p>
      <p>Balance: {balance}</p>

      <h3>Transaction List</h3>
      <ul>
        {transactions.map((t) => (
          <li key={t.id}>
            {t.description} - {t.amount} ({t.type})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MoneyTracker;
