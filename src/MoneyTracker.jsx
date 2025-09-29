import React, { useState, useMemo } from "react";

export default function MoneyTracker() {
  const [transactions, setTransactions] = useState([]);
  const [form, setForm] = useState({
    type: "income",
    amount: "",
    note: "",
  });

  // Hitung total income, expense, dan net
  const totals = useMemo(() => {
    let income = 0,
      expense = 0;
    transactions.forEach((t) => {
      if (t.type === "income") income += Number(t.amount);
      else expense += Number(t.amount);
    });
    return { income, expense, net: income - expense };
  }, [transactions]);

  function handleAdd(e) {
    e.preventDefault();
    const amount = Number(form.amount);
    if (!amount || amount <= 0) return alert("Masukkan jumlah uang yang valid (lebih besar dari 0)");

    const newT = {
      id: Date.now().toString(),
      type: form.type,
      amount: amount,
      note: form.note,
    };

    setTransactions((s) => [newT, ...s]);
    setForm({ type: "income", amount: "", note: "" });
  }

  return (
    <div>
      <h1>Aplikasi Pemasukan & Pengeluaran</h1>

      <h2>Ringkasan</h2>
      <p>Total Income: Rp {totals.income.toLocaleString()}</p>
      <p>Total Expense: Rp {totals.expense.toLocaleString()}</p>
      <p>Saldo: Rp {totals.net.toLocaleString()}</p>

      <h2>Tambah Transaksi</h2>
      <form onSubmit={handleAdd}>
        <div>
          <label>
            <input
              type="radio"
              name="type"
              value="income"
              checked={form.type === "income"}
              onChange={() => setForm((f) => ({ ...f, type: "income" }))}
            />
            Income
          </label>
          <label>
            <input
              type="radio"
              name="type"
              value="expense"
              checked={form.type === "expense"}
              onChange={() => setForm((f) => ({ ...f, type: "expense" }))}
            />
            Expense
          </label>
        </div>

        <div>
          <label>Jumlah (Rp): </label>
          <input
            type="number"
            value={form.amount}
            onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))}
          />
        </div>

        <div>
          <label>Catatan: </label>
          <input
            type="text"
            value={form.note}
            onChange={(e) => setForm((f) => ({ ...f, note: e.target.value }))}
          />
        </div>

        <button type="submit">Tambah</button>
      </form>

      <h2>Daftar Transaksi</h2>
      {transactions.length === 0 ? (
        <p>Belum ada transaksi.</p>
      ) : (
        <ul>
          {transactions.map((t) => (
            <li key={t.id}>
              {t.type.toUpperCase()} - Rp {t.amount.toLocaleString()} ({t.note || "-"})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
