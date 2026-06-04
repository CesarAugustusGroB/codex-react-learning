# My Expense Tracker

A small personal-expense tracking single-page app built as a React + TypeScript
learning project. Add expenses, filter them by category, text or date range, and
see live totals and a category breakdown chart. All data is persisted locally in
the browser, so there is no backend to run.

## Features

- **Add expenses** with a description, amount, category and date (`ExpenseForm`).
- **Expense list** showing every entry, with the ability to remove items
  (`ExpenseList` / `ExpenseItem`).
- **Filtering** by category, free-text search, and start/end date range
  (`ExpenseFilters`, backed by `utils/filterExpenses`).
- **Summary** of filtered totals (`ExpenseSummary`).
- **Category breakdown chart** rendered with Recharts (`ExpenseChart`).
- **Light / dark mode** toggle (`ColorModeToggle`).
- **Local persistence** — expenses are stored in `localStorage` via the
  `useLocalStorage` hook, so they survive a page reload.
- **Predefined categories**: Food, Rent, Transport, Utilities, Entertainment,
  Others (`constants/categories.ts`).
- **Tested** with Jest and React Testing Library, including a full
  integration test of the expense flow.

## Tech Stack

- **React 19** with **TypeScript**
- **Create React App** (`react-scripts` 5)
- **Chakra UI** (`@chakra-ui/react`, Emotion, Framer Motion) for components and theming
- **Recharts** for data visualisation
- **React Context API** for state (`ExpenseContext` / `ExpenseProvider`)
- **Jest** + **React Testing Library** for unit and integration tests

## Getting Started

Requires Node.js and npm.

```bash
npm install      # install dependencies
npm start        # run the dev server at http://localhost:3000
```

### Available scripts

| Script                  | Description                                         |
| ----------------------- | --------------------------------------------------- |
| `npm start`             | Run the app in development mode.                     |
| `npm run build`         | Build a production bundle into `build/`.            |
| `npm test`              | Run the Jest test suite once and exit.              |
| `npm run test:watch`    | Run Jest in watch mode.                             |
| `npm run test:coverage` | Generate a Jest coverage report.                    |
| `npm run eject`         | Eject from Create React App (one-way operation).    |

## Project Structure

```
src/
├── App.tsx                  # App shell: composes the tracker UI inside ExpenseProvider
├── index.tsx                # React entry point
├── theme.ts                 # Chakra UI theme configuration
├── components/
│   ├── ExpenseForm/         # Form to add a new expense
│   ├── ExpenseList/         # List of expenses + individual ExpenseItem
│   ├── ExpenseFilters/      # Category / text / date-range filters
│   ├── ExpenseSummary/      # Totals for the filtered set
│   ├── ExpenseChart/        # Recharts category breakdown
│   └── common/              # Shared UI (e.g. ColorModeToggle)
├── context/                 # ExpenseContext + ExpenseProvider (global state)
├── hooks/                   # useExpenses, useLocalStorage
├── models/                  # Expense / Category / filter type definitions
├── constants/               # Expense categories
├── utils/                   # filterExpenses, date and number helpers
└── __tests__/               # Integration tests
```

> This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
