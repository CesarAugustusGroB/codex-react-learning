import { fireEvent, screen } from '@testing-library/react';
import ExpenseFilters from './ExpenseFilters';
import { renderWithContext } from '../../test-utils';

it('dispatches category filter', () => {
  const { dispatch } = renderWithContext(<ExpenseFilters />, { state: { expenses: [], filter: {} } });
  fireEvent.change(screen.getByRole('combobox'), { target: { value: '1' } });
  expect(dispatch).toHaveBeenCalledWith({ type: 'SET_FILTER_CATEGORY', payload: 1 });
});

it('dispatches date range filter', () => {
  const { container, dispatch } = renderWithContext(<ExpenseFilters />, { state: { expenses: [], filter: {} } });
  const inputs = container.querySelectorAll('input');
  fireEvent.change(inputs[0], { target: { value: '2024-01-01' } });
  expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: 'SET_FILTER_DATE_RANGE' }));
  fireEvent.change(inputs[1], { target: { value: '2024-01-02' } });
  expect(dispatch).toHaveBeenLastCalledWith(expect.objectContaining({ type: 'SET_FILTER_DATE_RANGE' }));
});
