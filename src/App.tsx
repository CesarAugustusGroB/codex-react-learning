import React from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseFilters from './components/ExpenseFilters';
import ExpenseList from './components/ExpenseList';
import ExpenseSummary from './components/ExpenseSummary';
import ExpenseChart from './components/ExpenseChart';
import { ExpenseProvider } from './context';
import { Box, Flex, Heading, Spacer } from '@chakra-ui/react';
import { ColorModeToggle } from './components/common';

const App: React.FC = () => {
  return (
    <ExpenseProvider>
      <Box maxW="900px" mx="auto" p={4}>
        <Flex as="header" align="center" mb={4}>
          <Heading as="h1" size="lg" flex="1" textAlign="center">
            My Expense Tracker
          </Heading>
          <ColorModeToggle />
        </Flex>
        <ExpenseForm />
        <ExpenseFilters />
        <Flex direction={{ base: 'column', md: 'row' }} gap={4} align={{ md: 'flex-start' }}>
          <Box flex="1">
            <ExpenseList />
          </Box>
          <Box
            as="aside"
            w={{ base: 'full', md: '40%' }}
            display="flex"
            flexDirection="column"
            gap={4}
          >
            <ExpenseSummary />
            <ExpenseChart />
          </Box>
        </Flex>
      </Box>
    </ExpenseProvider>
  );
};

export default App;
