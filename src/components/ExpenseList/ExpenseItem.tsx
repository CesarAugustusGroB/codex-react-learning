import React from 'react';
import { Expense } from '../../models/expense';
import Button from '../common/Button';
import styles from './ExpenseItem.module.css';
import { formatCurrency } from '../../utils/numberUtils';

interface Props {
  expense: Expense;
  onEdit: () => void;
  onDelete: () => void;
}

const ExpenseItem: React.FC<Props> = ({ expense, onEdit, onDelete }) => {
  return (
    <li className={styles.item}>
      <span>{expense.description}</span>
      <span>{formatCurrency(expense.amount)}</span>
      <span>{expense.category.name}</span>
      <span>{expense.date.toLocaleDateString()}</span>
      <div className={styles.buttons}>
        <Button onClick={onEdit}>Edit</Button>
        <Button onClick={onDelete}>Delete</Button>
      </div>
    </li>
  );
};

export default ExpenseItem;
