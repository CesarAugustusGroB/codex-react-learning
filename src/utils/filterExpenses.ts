import { Expense, ExpenseFilterState } from '../models/expense';

export const filterExpenses = (
  expenses: Expense[],
  filter: ExpenseFilterState,
): Expense[] => {
  return expenses.filter((exp) => {
    if (filter.categoryId && exp.category.id !== filter.categoryId) {
      return false;
    }
    if (filter.startDate && exp.date < filter.startDate) {
      return false;
    }
    if (filter.endDate && exp.date > filter.endDate) {
      return false;
    }
    if (filter.text && !exp.description.toLowerCase().includes(filter.text.toLowerCase())) {
      return false;
    }
    return true;
  });
};

export default filterExpenses;
