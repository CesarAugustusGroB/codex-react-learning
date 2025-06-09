import React from 'react';
import ExpenseFilters from './components/ExpenseFilters/ExpenseFilters';

const App: React.FC = () => {
  return (
    <div>
      <h1>My Expense Tracker</h1>
      <ExpenseFilters />
      {/* aquí podrías añadir otros componentes, ej ExpenseList */}
    </div>
  );
};

export default App;
