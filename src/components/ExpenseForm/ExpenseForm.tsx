import React from 'react';
import styles from './ExpenseForm.module.css';
import { Expense } from '../../models/expense';
import { useExpenses } from '../../hooks';
import Button from '../common/Button';
import Input from '../common/Input';
import { CATEGORIES } from '../../constants';

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
  const [categoryId, setCategoryId] = React.useState<number>(
    expense && CATEGORIES.some((c) => c.id === expense.category.id)
      ? expense.category.id
      : CATEGORIES[0].id,
  );
  const [date, setDate] = React.useState(
    expense ? expense.date.toISOString().split('T')[0] : '',
  );
  const [errors, setErrors] = React.useState<{
    description?: string;
    amount?: string;
  }>({});

  const resetForm = () => {
    setDescription('');
    setAmount('');
    setCategoryId(CATEGORIES[0].id);
    setDate('');
    setErrors({});
  };

  const handleCancel = () => {
    resetForm();
    onCancel?.();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors: { description?: string; amount?: string } = {};
    if (!description.trim()) {
      validationErrors.description = 'Please enter a description.';
    }
    if (!amount || isNaN(Number(amount)) || parseFloat(amount) <= 0) {
      validationErrors.amount = 'Amount must be greater than 0.';
    }
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }
    const selectedCategory =
      CATEGORIES.find((c) => c.id === categoryId) || CATEGORIES[CATEGORIES.length - 1];
    const updated: Expense = {
      id: expense ? expense.id : Date.now(),
      description,
      amount: parseFloat(amount) || 0,
      category: { ...selectedCategory },
      date: date ? new Date(date) : new Date(),
    };
    dispatch({ type: expense ? 'EDIT_EXPENSE' : 'ADD_EXPENSE', payload: updated });
    resetForm();
    onCancel?.();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      {errors.description && <span className={styles.error}>{errors.description}</span>}
      <Input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      {errors.amount && <span className={styles.error}>{errors.amount}</span>}
      <select value={categoryId} onChange={(e) => setCategoryId(Number(e.target.value))}>
        {CATEGORIES.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>
      <Input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <div className={styles.buttons}>
        <Button type="submit">Save</Button>
        {onCancel && <Button onClick={handleCancel}>Cancel</Button>}
      </div>
    </form>
  );
};

export default ExpenseForm;
