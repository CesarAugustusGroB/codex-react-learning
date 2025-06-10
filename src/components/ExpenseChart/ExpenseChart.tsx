import React from 'react';
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { useExpenses } from '../../hooks';
import styles from './ExpenseChart.module.css';
import { filterExpenses } from '../../utils/filterExpenses';

// Chart types supported
type ChartType = 'category' | 'time';

const COLORS = [
  '#4e79a7',
  '#f28e2b',
  '#e15759',
  '#76b7b2',
  '#59a14f',
  '#edc949',
  '#af7aa1',
  '#ff9da7',
  '#9c755f',
  '#bab0ab',
];

const ExpenseChart: React.FC = () => {
  const {
    state: { expenses, filter },
  } = useExpenses();
  const [chartType, setChartType] = React.useState<ChartType>('category');

  // Apply same filtering logic as other components
  const filteredExpenses = React.useMemo(
    () => filterExpenses(expenses, filter),
    [expenses, filter],
  );

  const categoryTotals = React.useMemo(() => {
    const map = new Map<number, { name: string; value: number }>();
    filteredExpenses.forEach((exp) => {
      const entry = map.get(exp.category.id);
      if (entry) {
        entry.value += exp.amount;
      } else {
        map.set(exp.category.id, { name: exp.category.name, value: exp.amount });
      }
    });
    return Array.from(map.values());
  }, [filteredExpenses]);

  const timeTotals = React.useMemo(() => {
    const map = new Map<string, number>();
    filteredExpenses.forEach((exp) => {
      const key = `${exp.date.getFullYear()}-${String(exp.date.getMonth() + 1).padStart(2, '0')}`;
      map.set(key, (map.get(key) || 0) + exp.amount);
    });
    return Array.from(map.entries())
      .map(([period, total]) => ({ period, total }))
      .sort((a, b) => a.period.localeCompare(b.period));
  }, [filteredExpenses]);

  return (
    <div className={styles.chart}>
      <div className={styles.controls}>
        <select value={chartType} onChange={(e) => setChartType(e.target.value as ChartType)}>
          <option value="category">By Category</option>
          <option value="time">By Month</option>
        </select>
      </div>
      {chartType === 'category' ? (
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={categoryTotals} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
              {categoryTotals.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={timeTotals} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="period" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" fill="#4e79a7" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default ExpenseChart;
