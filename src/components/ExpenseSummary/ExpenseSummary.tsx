import React from 'react';
import { useExpenses } from '../../hooks';
import { Box, Heading, List, ListItem, Stack, Text } from '@chakra-ui/react';
import { formatCurrency } from '../../utils/numberUtils';
import { filterExpenses } from '../../utils/filterExpenses';

const ExpenseSummary: React.FC = () => {
  const {
    state: { expenses, filter },
  } = useExpenses();

  const filteredExpenses = React.useMemo(
    () => filterExpenses(expenses, filter),
    [expenses, filter],
  );

  const total = React.useMemo(
    () => filteredExpenses.reduce((sum, exp) => sum + exp.amount, 0),
    [filteredExpenses],
  );

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

  return (
    <Box mt={4}>
      <Heading as="h2" size="md" mb={2}>
        Total: {formatCurrency(total)}
      </Heading>
      <List styleType="none" p={0} m={0}>
        {categoryTotals.map((cat) => (
          <ListItem key={cat.name}>
            <Stack direction="row" justify="space-between">
              <Text>{cat.name}</Text>
              <Text>{formatCurrency(cat.total)}</Text>
            </Stack>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ExpenseSummary;
