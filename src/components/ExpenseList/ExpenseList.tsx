import React from 'react';
import ExpenseItem from './ExpenseItem';
import styles from './ExpenseList.module.css';

const ExpenseList: React.FC = () => {
  return (
    <ul className={styles.list}>
      <ExpenseItem />
    </ul>
  );
};

export default ExpenseList;
