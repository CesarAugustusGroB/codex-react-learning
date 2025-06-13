import { reducer, initialState, State } from './ExpenseContext';
import { Expense } from '../models/expense';

test('initial state', () => {
  expect(initialState).toEqual({ expenses: [], filter: {} });
});

test('add, edit and delete expense actions', () => {
  const exp: Expense = { id: 1, description: 'Coffee', amount: 3, category: { id: 1, name: 'Food' }, date: new Date('2024-01-01') };
  let state: State = reducer(initialState, { type: 'ADD_EXPENSE', payload: exp });
  expect(state.expenses).toHaveLength(1);
  state = reducer(state, { type: 'EDIT_EXPENSE', payload: { ...exp, amount: 4 } });
  expect(state.expenses[0].amount).toBe(4);
  state = reducer(state, { type: 'DELETE_EXPENSE', payload: 1 });
  expect(state.expenses).toHaveLength(0);
});

test('filter actions', () => {
  let state: State = reducer(initialState, { type: 'SET_FILTER_CATEGORY', payload: 2 });
  expect(state.filter.categoryId).toBe(2);
  state = reducer(state, { type: 'SET_FILTER_DATE_RANGE', payload: { startDate: new Date('2024-01-01'), endDate: new Date('2024-01-02') } });
  expect(state.filter.startDate).toBeInstanceOf(Date);
  expect(state.filter.endDate).toBeInstanceOf(Date);
});
