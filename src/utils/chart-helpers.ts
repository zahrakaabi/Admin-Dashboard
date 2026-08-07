/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// Types
import type { ProductTransaction } from "@/_mock";
import type { ChartSeriesItem } from "@/types";

/* -------------------------------------------------------------------------- */
/*            TRANSFORM TRANSACTION TO CHART SERIE HELPER FUNCTION            */
/* -------------------------------------------------------------------------- */
export function TransformTransactionsToChartSeries(
  transactions: ProductTransaction[],
  selectedYear: number
): { series: ChartSeriesItem[]; totalIncome: number; totalExpenses: number } {
/* --------------------------------- CONSTS --------------------------------- */
  const incomeByMonth = new Array(12).fill(0);
  const expensesByMonth = new Array(12).fill(0);

  transactions.forEach((transaction) => {
    const transactionDate = new Date(transaction.createdAt);
    if (transactionDate.getFullYear() === selectedYear) {
      const monthIndex = transactionDate.getMonth(); // 0 = Jan, 1 = Feb, ...
      
      const income = transaction.quantity * transaction.unitPrice;
      const expense = transaction.quantity * transaction.unitCost;

      incomeByMonth[monthIndex] += Math.round(income);
      expensesByMonth[monthIndex] += Math.round(expense);
    }
  });

  const totalIncome = incomeByMonth.reduce((a, b) => a + b, 0);
  const totalExpenses = expensesByMonth.reduce((a, b) => a + b, 0);

/* -------------------------------- RENDERING ------------------------------- */
  return {
    series: [
      { name: "Total income", data: incomeByMonth },
      { name: "Total expenses", data: expensesByMonth },
    ],
    totalIncome,
    totalExpenses,
  };
};