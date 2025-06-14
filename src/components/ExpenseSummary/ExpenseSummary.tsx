import React from 'react';
import { useExpenses } from '../../hooks';
import styles from './ExpenseSummary.module.css';
import { formatCurrency } from '../../utils/numberUtils';
import { filterExpenses } from '../../utils/filterExpenses';

const ExpenseSummary: React.FC = () => {
  const {
    state: { expenses, filter },
  } = useExpenses();

  const filteredExpenses = React.useMemo(
    () => filterExpenses(expenses, filter),
    [expenses, filter],
  );

  const total = React.useMemo(
    () => filteredExpenses.reduce((sum, exp) => sum + exp.amount, 0),
    [filteredExpenses],
  );

  const categoryTotals = React.useMemo(() => {
    const map = new Map<number, { name: string; total: number }>();
    filteredExpenses.forEach((exp) => {
      const entry = map.get(exp.category.id);
      if (entry) {
        entry.total += exp.amount;
      } else {
        map.set(exp.category.id, { name: exp.category.name, total: exp.amount });
      }
    });
    return Array.from(map.values());
  }, [filteredExpenses]);

  return (
    <div className={styles.summary}>
      <div className={styles.total}>Total: {formatCurrency(total)}</div>
      <ul className={styles.categoryTotals}>
        {categoryTotals.map((cat) => (
          <li key={cat.name}>
            {cat.name}: {formatCurrency(cat.total)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseSummary;
