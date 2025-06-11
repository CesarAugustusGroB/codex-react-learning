import { fireEvent, screen } from '@testing-library/react';
import ExpenseForm from './ExpenseForm';
import { renderWithContext } from '../../test-utils';


it('renders form inputs', () => {
  renderWithContext(<ExpenseForm />);
  expect(screen.getByPlaceholderText(/description/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/amount/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
});

it('updates state on input change', () => {
  renderWithContext(<ExpenseForm />);
  const desc = screen.getByPlaceholderText(/description/i) as HTMLInputElement;
  fireEvent.change(desc, { target: { value: 'Coffee' } });
  expect(desc.value).toBe('Coffee');
});

it('shows validation errors', () => {
  renderWithContext(<ExpenseForm />);
  fireEvent.click(screen.getByRole('button', { name: /save/i }));
  expect(screen.getByText(/please enter a description/i)).toBeInTheDocument();
  expect(screen.getByText(/amount must be greater than 0/i)).toBeInTheDocument();
});

it('dispatches add action on submit', () => {
  const { dispatch } = renderWithContext(<ExpenseForm />);
  fireEvent.change(screen.getByPlaceholderText(/description/i), { target: { value: 'Coffee' } });
  fireEvent.change(screen.getByPlaceholderText(/amount/i), { target: { value: '5' } });
  fireEvent.click(screen.getByRole('button', { name: /save/i }));
  expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: 'ADD_EXPENSE' }));
});
