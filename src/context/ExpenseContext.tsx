import React, { createContext, useReducer, ReactNode } from 'react';
import { Expense } from '../models/expense';

type State = {
  expenses: Expense[];
};

type Action = { type: 'ADD_EXPENSE'; payload: Expense };

const initialState: State = {
  expenses: [],
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return { ...state, expenses: [...state.expenses, action.payload] };
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
  return (
    <ExpenseContext.Provider value={{ state, dispatch }}>
      {children}
    </ExpenseContext.Provider>
  );
};
