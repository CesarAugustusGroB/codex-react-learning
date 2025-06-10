# Changelog

All notable changes to this project will be documented in this file.

# 📄 Changelog

## [v0.2.0-alpha] - 2025-06-10

### ✨ Added

- **Category Dropdown with Defined Options**
  - Replaced free-text category input with a dropdown.
  - Predefined categories: `Food`, `Rent`, `Transport`, `Utilities`, `Entertainment`, `Others`.
  - Prevents typos and improves chart aggregation accuracy.

- **Charts Visualization**
  - Integrated Recharts to display:
    - Pie chart: Expense distribution by category.
    - Bar chart: Monthly expense totals.
  - Charts live in `ExpenseChart` and react to filters from context.

### 🛠️ Changed

- **Filtering Logic**
  - Filtering by category and date range now affects:
    - `ExpenseList`
    - `ExpenseSummary`
    - `ExpenseChart`
  - Added validation to ensure `startDate ≤ endDate`.

- **UX Improvements**
  - Cleared the expense form after saving or cancelling edits.
  - User-friendly error messages for invalid inputs.
  - Responsive layout support for smaller screens.


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

