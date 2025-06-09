import React from 'react';
import ExpenseItem from './ExpenseItem';
import ExpenseForm from '../ExpenseForm/ExpenseForm';
import styles from './ExpenseList.module.css';
import { useExpenses } from '../../hooks';
import { Expense } from '../../models/expense';

const ExpenseList: React.FC = () => {
  const {
    state: { expenses, filter },
    dispatch,
  } = useExpenses();

  const [editingExpense, setEditingExpense] = React.useState<Expense | null>(null);

  const filteredExpenses = React.useMemo(() => {
    return expenses.filter((exp) => {
      if (filter.categoryId && exp.category.id !== filter.categoryId) {
        return false;
      }
      if (filter.startDate && exp.date < filter.startDate) {
        return false;
      }
      if (filter.endDate && exp.date > filter.endDate) {
        return false;
      }
      if (filter.text && !exp.description.toLowerCase().includes(filter.text.toLowerCase())) {
        return false;
      }
      return true;
    });
  }, [expenses, filter]);

  const handleDelete = (id: number) => {
    dispatch({ type: 'DELETE_EXPENSE', payload: id });
  };

  return (
    <ul className={styles.list}>
      {filteredExpenses.map((exp) =>
        editingExpense && editingExpense.id === exp.id ? (
          <li key={exp.id}>
            <ExpenseForm expense={editingExpense} onCancel={() => setEditingExpense(null)} />
          </li>
        ) : (
          <ExpenseItem
            key={exp.id}
            expense={exp}
            onEdit={() => setEditingExpense(exp)}
            onDelete={() => handleDelete(exp.id)}
          />
        ),
      )}
    </ul>
  );
};

export default ExpenseList;
