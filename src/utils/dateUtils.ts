// Compare two dates
export const isBefore = (a: Date, b: Date): boolean => a.getTime() < b.getTime();
export const isAfter = (a: Date, b: Date): boolean => a.getTime() > b.getTime();

// Parse a date string in dd/MM/yyyy format
export const parseDate = (value: string): Date => {
  const [dayStr, monthStr, yearStr] = value.split('/');
  const day = Number(dayStr);
  const month = Number(monthStr) - 1;
  const year = Number(yearStr);
  return new Date(year, month, day);
};

// Format a Date object as dd/MM/yyyy for display
export const formatDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

// Format a Date object as ISO yyyy-MM-dd for storage
export const toISODate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};
