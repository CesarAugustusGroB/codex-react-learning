export interface Category {
  id: number;
  name: string;
}

export interface Expense {
  id: number;
  description: string;
  amount: number;
  category: Category;
  date: Date;
}

export interface ExpenseFilterState {
  categoryId?: number;
  text?: string;
  startDate?: Date;
  endDate?: Date;
}