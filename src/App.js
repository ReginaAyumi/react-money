import { useState } from "react";
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

  const addTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
    setFilteredTransactions([...filteredTransactions, transaction]); // biar ikut update filter
  };

  const deleteTransaction = (id) => {
    const updated = transactions.filter((t) => t.id !== id);
    setTransactions(updated);

    const updatedFiltered = filteredTransactions.filter((t) => t.id !== id);
    setFilteredTransactions(updatedFiltered);
  };

  return (
    <Router>
      <div className="App">
        <h1>
          <FaMoneyBillWave style={{ marginRight: "8px", color: "green" }} />
          Money Tracker
          <FaMoneyBillWave style={{ marginLeft: "8px", color: "green" }} />
        </h1>

        <Routes>
          {/* Main page */}
          <Route path="/" element={
            <>
              <div className="card full-width">
                <MoneyTracker addTransaction={addTransaction} />
              </div>

              <div className="card main-container">
                <TransactionFilter
                  transactions={transactions}
                  onFilter={setFilteredTransactions}
                />

                <div className="summary-center">
                  <Summary transactions={filteredTransactions} />
                </div>

                <div className="row">
                  <div className="half">
                    <TransactionList
                      transactions={filteredTransactions}
                      onDelete={deleteTransaction}
                    />
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
          } />

          {/* Detail page */}
          <Route
            path="/details"
            element={
              <TransactionDetailPage
                transactions={filteredTransactions}
                onDelete={deleteTransaction}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
