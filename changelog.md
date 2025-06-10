# Changelog

All notable changes to this project will be documented in this file.

## [v0.1.0-alpha] - 2025-06-09

### Added
- Initial project setup with React and TypeScript.
- Folder structure organized for components, context, models, hooks, utils, and styles.
- TypeScript interfaces for `Expense` and `Category` types.
- React Context API and reducer for managing expenses state.
- ExpenseForm component for adding new expenses with validation.
- ExpenseFilters component for filtering expenses by category and date range.
- ExpenseList and ExpenseItem components to display, edit, and delete expenses.
- LocalStorage persistence: load expenses on startup and sync on state changes.
- ExpenseSummary component to display total expenses overall and by category.
- ExpenseChart component scaffold for future visualization implementation.
- Integrated all components into the main app page with basic responsive layout.

### Known Limitations
- Partial implementation of edit expense functionality.
- Basic filter validation and UX.
- ExpenseChart is a placeholder, full charting logic to be implemented.
- Styling and responsiveness can be improved.
- No backend or authentication; data limited to localStorage.
- No export/import functionality.

---