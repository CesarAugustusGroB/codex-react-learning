import React from "react";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Stack,
} from "@chakra-ui/react";
import { useExpenses } from "../../hooks";
import { CATEGORIES } from "../../constants";

// Format a Date object into YYYY-MM-DD for date inputs
const formatInputDate = (date?: Date) =>
  date ? date.toISOString().split("T")[0] : "";

const ExpenseFilters: React.FC = () => {
  const {
    state: { filter },
    dispatch,
  } = useExpenses();
  const [error, setError] = React.useState<string | null>(null);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const categoryId = value ? Number(value) : undefined;
    dispatch({ type: "SET_FILTER_CATEGORY", payload: categoryId });
  };

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const startDate = e.target.value ? new Date(e.target.value) : undefined;
    const endDate = filter.endDate;
    if (startDate && endDate && startDate > endDate) {
      setError("Invalid date range");
    } else {
      setError(null);
    }
    dispatch({
      type: "SET_FILTER_DATE_RANGE",
      payload: { startDate, endDate },
    });
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const endDate = e.target.value ? new Date(e.target.value) : undefined;
    const startDate = filter.startDate;
    if (startDate && endDate && endDate < startDate) {
      setError("Invalid date range");
    } else {
      setError(null);
    }
    dispatch({
      type: "SET_FILTER_DATE_RANGE",
      payload: { startDate, endDate },
    });
  };

  return (
    <Stack spacing={3} direction={{ base: "column", md: "row" }}>
      <FormControl maxW="200px">
        <FormLabel>Category</FormLabel>
        <Select value={filter.categoryId ?? ""} onChange={handleCategoryChange}>
          <option value="">All</option>
          {CATEGORIES.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </Select>
      </FormControl>
      <FormControl isInvalid={!!error}>
        <FormLabel>Start Date</FormLabel>
        <Input
          type="date"
          value={formatInputDate(filter.startDate)}
          onChange={handleStartDateChange}
        />
      </FormControl>
      <FormControl isInvalid={!!error}>
        <FormLabel>End Date</FormLabel>
        <Input
          type="date"
          value={formatInputDate(filter.endDate)}
          onChange={handleEndDateChange}
        />
        <FormErrorMessage>{error}</FormErrorMessage>
      </FormControl>
    </Stack>
  );
};

export default ExpenseFilters;
