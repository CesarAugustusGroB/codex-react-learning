import React from 'react';
import { Expense } from '../../models/expense';
import {
  Badge,
  HStack,
  IconButton,
  ListItem,
  Text,
} from '@chakra-ui/react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { formatCurrency } from '../../utils/numberUtils';

interface Props {
  expense: Expense;
  onEdit: () => void;
  onDelete: () => void;
}

const ExpenseItem: React.FC<Props> = ({ expense, onEdit, onDelete }) => {
  return (
    <ListItem _hover={{ bg: 'gray.50', _dark: { bg: 'gray.700' } }} p={2} borderRadius="md">
      <HStack spacing={3} align="center">
        <Text flex="1">{expense.description}</Text>
        <Text>{formatCurrency(expense.amount)}</Text>
        <Badge>{expense.category.name}</Badge>
        <Text>{expense.date.toLocaleDateString()}</Text>
        <HStack marginLeft="auto">
          <IconButton aria-label="Edit" icon={<FaEdit />} size="sm" onClick={onEdit} />
          <IconButton aria-label="Delete" icon={<FaTrash />} size="sm" onClick={onDelete} />
        </HStack>
      </HStack>
    </ListItem>
  );
};

export default ExpenseItem;
