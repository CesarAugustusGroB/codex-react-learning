import React from 'react';
import styles from './ExpenseFilters.module.css';
import { useExpenses } from '../../hooks';
import { Expense } from '../../models/expense';
import { parseDate, formatDate } from '../../utils/dateUtils';

// Format date for display in the inputs
const formatInputDate = (date?: Date) => (date ? formatDate(date) : '');

const ExpenseFilters: React.FC = () => {
  const {
    state: { expenses, filter },
    dispatch,
  } = useExpenses();

  // Collect unique categories from expenses
  const categories = React.useMemo(() => {
    const map = new Map<number, string>();
    expenses.forEach((exp: Expense) => {
      map.set(exp.category.id, exp.category.name);
    });
    return Array.from(map.entries()).map(([id, name]) => ({ id, name }));
  }, [expenses]);

  const handleCategoryChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const value = e.target.value;
    const categoryId = value ? Number(value) : undefined;
    dispatch({ type: 'SET_FILTER_CATEGORY', payload: categoryId });
  };

  const handleStartDateChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const startDate = e.target.value ? parseDate(e.target.value) : undefined;
    dispatch({
      type: 'SET_FILTER_DATE_RANGE',
      payload: { startDate, endDate: filter.endDate },
    });
  };

  const handleEndDateChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const endDate = e.target.value ? parseDate(e.target.value) : undefined;
    dispatch({
      type: 'SET_FILTER_DATE_RANGE',
      payload: { startDate: filter.startDate, endDate },
    });
  };

  return (
    <div className={styles.filters}>
      <select
        value={filter.categoryId ?? ''}
        onChange={handleCategoryChange}
      >
        <option value="">All</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="dd/mm/yyyy"
        value={formatInputDate(filter.startDate)}
        onChange={handleStartDateChange}
      />
      <input
        type="text"
        placeholder="dd/mm/yyyy"
        value={formatInputDate(filter.endDate)}
        onChange={handleEndDateChange}
      />
    </div>
  );
};

export default ExpenseFilters;
