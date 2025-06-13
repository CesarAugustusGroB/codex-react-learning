import { fireEvent, screen } from '@testing-library/react';
import ExpenseChart from './ExpenseChart';
import { renderWithContext } from '../../test-utils';
import { Expense } from '../../models/expense';

const expenses: Expense[] = [
  { id: 1, description: 'Coffee', amount: 3, category: { id: 1, name: 'Food' }, date: new Date('2024-01-01') },
  { id: 2, description: 'Rent', amount: 10, category: { id: 2, name: 'Rent' }, date: new Date('2024-01-02') },
];

test('renders chart with select', () => {
  renderWithContext(<ExpenseChart />, { state: { expenses, filter: {} } });
  const select = screen.getByRole('combobox');
  expect(select).toBeInTheDocument();
  fireEvent.change(select, { target: { value: 'time' } });
  expect((select as HTMLSelectElement).value).toBe('time');
  expect(document.querySelector('.recharts-responsive-container')).toBeInTheDocument();
});
