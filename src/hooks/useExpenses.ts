import { useContext } from 'react';
import { ExpenseContext } from '../context';

export const useExpenses = () => useContext(ExpenseContext);
