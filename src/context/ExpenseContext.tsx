import React, {
  createContext,
  useReducer,
  ReactNode,
  useEffect,
} from 'react';
import { Expense, ExpenseFilterState } from '../models/expense';

export type State = {
  expenses: Expense[];
  filter: ExpenseFilterState;
};

export type Action =
  | { type: 'ADD_EXPENSE'; payload: Expense }
  | { type: 'EDIT_EXPENSE'; payload: Expense }
  | { type: 'DELETE_EXPENSE'; payload: number }
  | { type: 'SET_FILTER_CATEGORY'; payload?: number }
  | {
      type: 'SET_FILTER_DATE_RANGE';
      payload: { startDate?: Date; endDate?: Date };
    }
  | { type: 'LOAD_EXPENSES'; payload: Expense[] };

export const initialState: State = {
  expenses: [],
  filter: {},
};

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return { ...state, expenses: [...state.expenses, action.payload] };
    case 'EDIT_EXPENSE':
      return {
        ...state,
        expenses: state.expenses.map((exp) =>
          exp.id === action.payload.id ? action.payload : exp
        ),
      };
    case 'DELETE_EXPENSE':
      return {
        ...state,
        expenses: state.expenses.filter((exp) => exp.id !== action.payload),
      };
    case 'SET_FILTER_CATEGORY':
      return {
        ...state,
        filter: { ...state.filter, categoryId: action.payload },
      };
    case 'SET_FILTER_DATE_RANGE':
      return {
        ...state,
        filter: {
          ...state.filter,
          startDate: action.payload.startDate,
          endDate: action.payload.endDate,
        },
      };
    case 'LOAD_EXPENSES':
      return { ...state, expenses: action.payload };
    default:
      return state;
  }
}

export const ExpenseContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => undefined });

export const ExpenseProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Load stored expenses on initial mount
  useEffect(() => {
    try {
      const item = window.localStorage.getItem('expenses');
      if (item) {
        const expenses: Expense[] = JSON.parse(item, (key, value) => {
          return key === 'date' ? new Date(value) : value;
        });
        dispatch({ type: 'LOAD_EXPENSES', payload: expenses });
      }
    } catch {
      // ignore read errors
    }
  }, []);

  // Persist expenses whenever they change
  useEffect(() => {
    try {
      window.localStorage.setItem('expenses', JSON.stringify(state.expenses));
    } catch {
      // ignore write errors
    }
  }, [state.expenses]);

  return (
    <ExpenseContext.Provider value={{ state, dispatch }}>
      {children}
    </ExpenseContext.Provider>
  );
};
