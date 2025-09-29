// App.jsx
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './App.css';
import { FaMoneyBillWave } from "react-icons/fa";
import MoneyTracker from './MoneyTracker';
import Summary from './Summary';
import TransactionList from './TransactionList';
import MoneyChart from './MoneyChart';
import TransactionFilter from './TransactionFilter';
import TransactionDetailPage from './TransactionDetailPage';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  // fetch data when App load
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await fetch("/transactions.json");
        const data = await res.json();
        setTransactions(data);
        setFilteredTransactions(data);
      } catch (err) {
        console.error("Error fetching transactions:", err);
      }
    };

    fetchTransactions();
  }, []);

  const addTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
    setFilteredTransactions([...transactions, transaction]);
  };

  const deleteTransaction = (id) => {
    const updated = transactions.filter((t) => t.id !== id);
    setTransactions(updated);
    setFilteredTransactions(updated);
  };

  return (
    <Router>
      <div className="App">
        <h1>
          <FaMoneyBillWave style={{ marginRight: "12px", color: "green" }} />
          Money Tracker
          <FaMoneyBillWave style={{ marginLeft: "12px", color: "green" }} />
        </h1>

        <Routes>
          {/* Main page */}
          <Route path="/" element={
              <>
                <div className="card">
                  <MoneyTracker addTransaction={addTransaction} />
                </div>

                <div className="card">
                  <TransactionFilter transactions={transactions} onFilter={setFilteredTransactions}
                  />

                  <div className="">
                    <Summary transactions={filteredTransactions} />
                  </div>

                  <div className="row">
                    <div className="half">
                      <TransactionList transactions={filteredTransactions.slice(-5).reverse()} />
                      <Link to="/details">
                        <button className="btn-detail">More Detail</button>
                      </Link>
                    </div>
                    <div className="half">
                      <MoneyChart transactions={filteredTransactions} />
                    </div>
                  </div>
                </div>
              </>
            }
          />

          {/* Detail page */}
          <Route
            path="/details"
            element={
              <TransactionDetailPage transactions={filteredTransactions} onDelete={deleteTransaction}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
