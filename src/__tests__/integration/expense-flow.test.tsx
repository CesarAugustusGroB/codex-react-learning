import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../../App";

describe("Expense integration flow", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });
  const addExpense = async (
    desc: string,
    amount: string,
    category: string,
    date: string,
    expected: number,
  ) => {
    await userEvent.type(screen.getByPlaceholderText(/description/i), desc);
    await userEvent.type(screen.getByPlaceholderText(/amount/i), amount);
    await userEvent.selectOptions(screen.getAllByRole("combobox")[0], category);
    const dateInputs = document.querySelectorAll('input[type="date"]');
    const formDate = dateInputs[0] as HTMLInputElement;
    await userEvent.clear(formDate);
    await userEvent.type(formDate, date);
    await userEvent.click(screen.getByRole("button", { name: /save/i }));
    await waitFor(() =>
      expect(screen.getAllByText("Delete").length).toBe(expected),
    );
  };

  test("adding expenses updates list and chart", async () => {
    render(<App />);
    await addExpense("Coffee", "3", "Food", "2024-01-01", 1);
    expect(screen.getByText("Coffee")).toBeInTheDocument();
    expect(
      document.querySelector(".recharts-responsive-container"),
    ).toBeInTheDocument();

    await addExpense("Rent", "10", "Rent", "2024-01-15", 2);
    expect(screen.getAllByText("Edit")).toHaveLength(2);
  });

  test("filters by category and date range", async () => {
    render(<App />);
    await addExpense("Coffee", "3", "Food", "2024-01-01", 1);
    await addExpense("Rent", "10", "Rent", "2024-01-15", 2);
    await addExpense("Bus", "2", "Transport", "2024-02-01", 3);

    // category filter
    await userEvent.selectOptions(screen.getAllByRole("combobox")[1], "2");
    await waitFor(() => expect(screen.getAllByText("Delete").length).toBe(1));
    expect(screen.queryByText("Coffee")).toBeNull();
    expect(
      document.querySelector(".recharts-responsive-container"),
    ).toBeInTheDocument();

    // date filter
    const dateInputs = document.querySelectorAll('.filters input[type="date"]');
    await userEvent.clear(dateInputs[0] as HTMLInputElement);
    await userEvent.type(dateInputs[0] as HTMLInputElement, "2024-02-01");
    await userEvent.clear(dateInputs[1] as HTMLInputElement);
    await userEvent.type(dateInputs[1] as HTMLInputElement, "2024-02-28");
    await userEvent.selectOptions(screen.getAllByRole("combobox")[1], "");
    await waitFor(() => expect(screen.getAllByText("Delete").length).toBe(1));
    expect(screen.getByText("Bus")).toBeInTheDocument();
  });

  test("shows error on invalid date range", async () => {
    render(<App />);
    const dateInputs = document.querySelectorAll('.filters input[type="date"]');
    await userEvent.type(dateInputs[0] as HTMLInputElement, "2024-02-10");
    await userEvent.type(dateInputs[1] as HTMLInputElement, "2024-02-01");
    expect(screen.getByRole("alert")).toHaveTextContent(/invalid date range/i);
  });
});
