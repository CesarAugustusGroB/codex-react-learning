import React from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseFilters from './components/ExpenseFilters';
import ExpenseList from './components/ExpenseList';
import ExpenseSummary from './components/ExpenseSummary';
import ExpenseChart from './components/ExpenseChart';
import { ExpenseProvider } from './context';
import styles from './App.module.css';

const App: React.FC = () => {
  return (
    <ExpenseProvider>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1>My Expense Tracker</h1>
        </header>
        <ExpenseForm />
        <ExpenseFilters />
        <div className={styles.layout}>
          <ExpenseList />
          <aside className={styles.sidebar}>
            <ExpenseSummary />
            <ExpenseChart />
          </aside>
        </div>
      </div>
    </ExpenseProvider>
  );
};

export default App;
