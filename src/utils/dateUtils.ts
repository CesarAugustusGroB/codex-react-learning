import { parse, format } from 'date-fns';

// Parse a date string in dd/MM/yyyy format
export const parseDate = (value: string): Date =>
  parse(value, 'dd/MM/yyyy', new Date());

// Format a Date object as dd/MM/yyyy for display
export const formatDate = (date: Date): string => format(date, 'dd/MM/yyyy');

// Format a Date object as ISO yyyy-MM-dd for storage
export const toISODate = (date: Date): string => format(date, 'yyyy-MM-dd');
