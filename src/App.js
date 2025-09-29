import { useState } from "react";
import './App.css';
import MoneyTracker from './MoneyTracker';
import Summary from './Summary';
import TransactionList from './TransactionList';
import MoneyChart from './MoneyChart';

function App() {
  const [transactions, setTransactions] = useState([]);

  const addTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
  };

  return (
    <div className="App">
      <h1>Money Tracker</h1>
      <div className="container">
        <MoneyTracker addTransaction={addTransaction} />
        <Summary transactions={transactions} />
        <TransactionList transactions={transactions} />
        <MoneyChart transactions={transactions} />
      </div>
    </div>
  );
}

export default App;
