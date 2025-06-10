import React from 'react';
import styles from './ExpenseForm.module.css';
import { Expense } from '../../models/expense';
import { useExpenses } from '../../hooks';
import Button from '../common/Button';
import Input from '../common/Input';
import { parseDate, formatDate } from '../../utils/dateUtils';

interface ExpenseFormProps {
  expense?: Expense;
  onCancel?: () => void;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ expense, onCancel }) => {
  const { dispatch } = useExpenses();

  const [description, setDescription] = React.useState(
    expense?.description ?? '',
  );
  const [amount, setAmount] = React.useState(
    expense ? String(expense.amount) : '',
  );
  const [category, setCategory] = React.useState(
    expense?.category.name ?? '',
  );
  const [date, setDate] = React.useState(
    expense ? formatDate(expense.date) : '',
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: Expense = {
      id: expense ? expense.id : Date.now(),
      description,
      amount: parseFloat(amount) || 0,
      category: expense?.category ?? { id: Date.now(), name: category },
      date: date ? parseDate(date) : new Date(),
    };
    dispatch({ type: expense ? 'EDIT_EXPENSE' : 'ADD_EXPENSE', payload: updated });
    onCancel?.();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <Input
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <Input
        type="text"
        placeholder="dd/mm/yyyy"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <div className={styles.buttons}>
        <Button type="submit">Save</Button>
        {onCancel && <Button onClick={onCancel}>Cancel</Button>}
      </div>
    </form>
  );
};

export default ExpenseForm;
