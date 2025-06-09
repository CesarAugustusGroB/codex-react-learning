import React from 'react';
import { useExpenses } from '../../hooks';
import styles from './ExpenseChart.module.css';

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
  const filteredExpenses = React.useMemo(() => {
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
  }, [expenses, filter]);

  const categoryTotals = React.useMemo(() => {
    const map = new Map<number, { name: string; total: number }>();
    filteredExpenses.forEach((exp) => {
      const entry = map.get(exp.category.id);
      if (entry) {
        entry.total += exp.amount;
      } else {
        map.set(exp.category.id, { name: exp.category.name, total: exp.amount });
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

  // Prepare pie slices
  const pieSlices = React.useMemo(() => {
    const total = categoryTotals.reduce((sum, c) => sum + c.total, 0) || 1;
    let cumulative = 0;
    const radius = 75;
    return categoryTotals.map((cat, index) => {
      const startAngle = (cumulative / total) * 2 * Math.PI;
      cumulative += cat.total;
      const endAngle = (cumulative / total) * 2 * Math.PI;
      const largeArc = endAngle - startAngle > Math.PI ? 1 : 0;
      const x1 = radius + radius * Math.sin(startAngle);
      const y1 = radius - radius * Math.cos(startAngle);
      const x2 = radius + radius * Math.sin(endAngle);
      const y2 = radius - radius * Math.cos(endAngle);
      const d = `M${radius},${radius} L${x1},${y1} A${radius},${radius} 0 ${largeArc} 1 ${x2},${y2} Z`;
      return { d, color: COLORS[index % COLORS.length] };
    });
  }, [categoryTotals]);

  return (
    <div className={styles.chart}>
      <div className={styles.controls}>
        <select value={chartType} onChange={(e) => setChartType(e.target.value as ChartType)}>
          <option value="category">By Category</option>
          <option value="time">By Month</option>
        </select>
      </div>
      {chartType === 'category' ? (
        <svg width={150} height={150} viewBox="0 0 150 150">
          {pieSlices.map((slice, i) => (
            <path key={i} d={slice.d} fill={slice.color} />
          ))}
        </svg>
      ) : (
        <svg width={200} height={150} viewBox="0 0 200 150">
          {timeTotals.map((t, i) => {
            const max = Math.max(...timeTotals.map((tt) => tt.total), 1);
            const barWidth = 180 / timeTotals.length;
            const barHeight = (t.total / max) * 100;
            return (
              <rect
                key={t.period}
                x={10 + i * barWidth}
                y={130 - barHeight}
                width={barWidth - 4}
                height={barHeight}
                fill="#4e79a7"
              />
            );
          })}
        </svg>
      )}
    </div>
  );
};

export default ExpenseChart;
