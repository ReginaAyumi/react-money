// import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

function MoneyChart({ transactions }) {
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const data = [
    { name: "Pemasukan", value: totalIncome },
    { name: "Pengeluaran", value: totalExpense },
  ];

  const COLORS = ["#4CAF50", "#F44336"];

  return (
    <div>
      <h2>Visualisasi Keuangan</h2>
      <PieChart width={300} height={300}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          label
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={COLORS[index]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}

export default MoneyChart;
