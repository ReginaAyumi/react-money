import { useState, useEffect, useCallback } from "react";

function TransactionFilter({ transactions, onFilter }) {
  const [filter, setFilter] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // apply filter with callback
  const applyFilter = useCallback(() => {
    const now = new Date();
    const filtered = transactions.filter((t) => {
      const txDate = new Date(t.date);

      if (filter === "week") {
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - now.getDay());
        startOfWeek.setHours(0, 0, 0, 0);

        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        endOfWeek.setHours(23, 59, 59, 999);

        return txDate >= startOfWeek && txDate <= endOfWeek;
      }

      if (filter === "month") {
        return (
          txDate.getMonth() === now.getMonth() &&
          txDate.getFullYear() === now.getFullYear()
        );
      }

      if (filter === "custom" && startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        start.setHours(0, 0, 0, 0);
        end.setHours(23, 59, 59, 999);

        return txDate >= start && txDate <= end;
      }

      return true;
    });

    onFilter(filtered);
  }, [transactions, filter, startDate, endDate, onFilter]);

  // run filter everytime filter changes
  useEffect(() => {
    applyFilter();
  }, [applyFilter]);

  return (
    <div className="">
      <h3>Filter Transactions</h3>
      <div className="center">
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="custom">Custom</option>
        </select>
      </div>

      <div className="center">
        {filter === "custom" && (
          <div>
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          </div>
        )}
      </div>
    </div>
  );
}

export default TransactionFilter;
