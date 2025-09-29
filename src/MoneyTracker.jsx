import React, { useState } from "react";

function MoneyTracker({ addTransaction }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");
  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0] // yyyy-mm-dd
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !amount) return;

    addTransaction({
      id: Date.now(),
      description,
      amount: parseFloat(amount),
      type,
      date: new Date(date),
    });

    setDescription("");
    setAmount("");
    setDate(new Date().toISOString().split("T")[0]); // reset to today
  };

  return (
    <div className="add-transaction-card">
      <h2>Add Transaction</h2>
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
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default MoneyTracker;
