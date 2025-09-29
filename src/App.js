import { useState } from "react";
import './App.css';
import MoneyTracker from './MoneyTracker';
import MoneyChart from './MoneyChart';


function App() {
  const [transactions, setTransactions] = useState([]);

  const addTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
  };

  return (
    <div className="App">
      <MoneyTracker transactions={transactions} addTransaction={addTransaction} />
      <MoneyChart transactions={transactions} />
    </div>
  );
}

export default App;
