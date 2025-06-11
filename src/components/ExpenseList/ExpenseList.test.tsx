import { fireEvent, screen } from '@testing-library/react';
import ExpenseList from './ExpenseList';
import { renderWithContext } from '../../test-utils';
import { Expense } from '../../models/expense';

const expenses: Expense[] = [
  {
    id: 1,
    description: 'Coffee',
    amount: 3,
    category: { id: 1, name: 'Food' },
    date: new Date('2024-01-01'),
  },
  {
    id: 2,
    description: 'Bus',
    amount: 2,
    category: { id: 3, name: 'Transport' },
    date: new Date('2024-01-02'),
  },
];

it('renders expense items', () => {
  renderWithContext(<ExpenseList />, { state: { expenses, filter: {} } });
  expect(screen.getByText('Coffee')).toBeInTheDocument();
  expect(screen.getByText('Bus')).toBeInTheDocument();
});

it('allows deleting an expense', () => {
  const { dispatch } = renderWithContext(<ExpenseList />, { state: { expenses, filter: {} } });
  fireEvent.click(screen.getAllByText('Delete')[0]);
  expect(dispatch).toHaveBeenCalledWith({ type: 'DELETE_EXPENSE', payload: 1 });
});

it('shows edit form when clicking edit', () => {
  renderWithContext(<ExpenseList />, { state: { expenses, filter: {} } });
  fireEvent.click(screen.getAllByText('Edit')[0]);
  expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
});
