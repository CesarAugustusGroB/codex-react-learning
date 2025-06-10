import React from 'react';
import styles from './ExpenseFilters.module.css';
import { useExpenses } from '../../hooks';
import { CATEGORIES } from '../../constants';

// Format a Date object into YYYY-MM-DD for date inputs
const formatInputDate = (date?: Date) =>
  date ? date.toISOString().split('T')[0] : '';

const ExpenseFilters: React.FC = () => {
  const {
    state: { filter },
    dispatch,
  } = useExpenses();


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
    const startDate = e.target.value ? new Date(e.target.value) : undefined;
    let endDate = filter.endDate;
    if (startDate && endDate && startDate > endDate) {
      endDate = startDate;
    }
    dispatch({
      type: 'SET_FILTER_DATE_RANGE',
      payload: { startDate, endDate },
    });
  };

  const handleEndDateChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const endDate = e.target.value ? new Date(e.target.value) : undefined;
    let startDate = filter.startDate;
    if (startDate && endDate && endDate < startDate) {
      startDate = endDate;
    }
    dispatch({
      type: 'SET_FILTER_DATE_RANGE',
      payload: { startDate, endDate },
    });
  };

  return (
    <div className={styles.filters}>
      <select
        value={filter.categoryId ?? ''}
        onChange={handleCategoryChange}
      >
        <option value="">All</option>
        {CATEGORIES.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>
      <input
        type="date"
        value={formatInputDate(filter.startDate)}
        onChange={handleStartDateChange}
      />
      <input
        type="date"
        value={formatInputDate(filter.endDate)}
        onChange={handleEndDateChange}
      />
    </div>
  );
};

export default ExpenseFilters;
