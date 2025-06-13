import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app header', () => {
  render(<App />);
  const header = screen.getByRole('heading', { name: /my expense tracker/i });
  expect(header).toBeInTheDocument();
});
