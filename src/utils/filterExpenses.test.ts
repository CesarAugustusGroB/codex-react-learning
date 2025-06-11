import { filterExpenses } from './filterExpenses';
import { Expense } from '../models/expense';

const expenses: Expense[] = [
  { id: 1, description: 'Coffee', amount: 3, category: { id: 1, name: 'Food' }, date: new Date('2024-01-01') },
  { id: 2, description: 'Rent', amount: 10, category: { id: 2, name: 'Rent' }, date: new Date('2024-01-05') },
  { id: 3, description: 'Bus ticket', amount: 2, category: { id: 3, name: 'Transport' }, date: new Date('2024-01-10') },
];

test('filters by category', () => {
  const result = filterExpenses(expenses, { categoryId: 2 });
  expect(result).toHaveLength(1);
  expect(result[0].description).toBe('Rent');
});

test('filters by date range', () => {
  const result = filterExpenses(expenses, { startDate: new Date('2024-01-02'), endDate: new Date('2024-01-06') });
  expect(result).toHaveLength(1);
  expect(result[0].description).toBe('Rent');
});

test('filters by text search', () => {
  const result = filterExpenses(expenses, { text: 'bus' });
  expect(result).toHaveLength(1);
  expect(result[0].description).toBe('Bus ticket');
});
