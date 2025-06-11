import React, { ReactElement } from 'react';
import { render } from '@testing-library/react';
import { ExpenseContext, State, Action, initialState } from './context/ExpenseContext';

export function renderWithContext(
  ui: ReactElement,
  {
    state = initialState,
    dispatch = jest.fn<ReturnType<React.Dispatch<Action>>, Parameters<React.Dispatch<Action>>>()
  } = {},
) {
  return {
    dispatch,
    ...render(
      <ExpenseContext.Provider value={{ state, dispatch }}>{ui}</ExpenseContext.Provider>,
    ),
  };
}
