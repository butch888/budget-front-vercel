import type { FC } from "react";
import TransactionsForm from "../components/TransactionsForm";
import { instance } from "../api/axios.api";
import type { ICategory, IResponseTransactionLoader, ITransaction } from "../types/types";
import { toast } from "react-toastify";
import TransactionTable from "../components/TransactionTable";
import { useLoaderData } from "react-router-dom";
import { formatToUSDT } from "../helpers/currencyHelper";
import Chart from "../components/Chart";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

// eslint-disable-next-line react-refresh/only-export-components
export const transactionLoader = async () => {
  const categories = await instance.get<ICategory[]>("/categories");
  const transactions = await instance.get<ITransaction[]>("/transactions");
  const totalIncome = await instance.get<number>("/transactions/income/find");
  const totalExpense = await instance.get<number>("/transactions/expense/find");

  const data = {
    categories: categories.data,
    transactions: transactions.data,
    totalIncome: totalIncome.data,
    totalExpense: totalExpense.data,
  };
  return data;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any, react-refresh/only-export-components
export const transactionAction = async ({ request }: any) => {
  switch (request.method) {
    case "POST": {
      const formData = await request.formData();
      const newTransaction = {
        title: formData.get("title"),
        amount: +formData.get("amount"),
        category: { id: +formData.get("category") }, // Преобразуем в объект
        type: formData.get("type"),
      };
      await instance.post("/transactions", newTransaction);
      toast.success("Transaction added successfully");
      return null;
    }
    case "DELETE": {
      const formData = await request.formData();
      const transactionId = formData.get("id");
      await instance.delete(`/transactions/transaction/${transactionId}`);
      toast.success("Transaction deleted successfully");
      return null;
    }
  }
};

// Компонент для адаптивного отображения суммы
const AdaptiveAmount: FC<{ amount: number; className?: string }> = ({ amount, className = "" }) => {
  const formattedAmount = formatToUSDT.format(amount);

  // Определяем размер текста в зависимости от длины числа
  const getTextSize = (amount: string) => {
    const length = amount.replace(/[$,]/g, "").length; // Убираем символы валюты и запятые

    if (length <= 6) return "text-2xl"; // До 999,999
    if (length <= 8) return "text-xl"; // До 99,999,999 (8 цифр)
    if (length <= 10) return "text-lg"; // До 9,999,999,999
    return "text-base"; // Очень большие числа
  };

  return (
    <div className={`font-bold ${getTextSize(formattedAmount)} ${className} text-center leading-tight break-all`}>
      {formattedAmount}
    </div>
  );
};

const Transactions: FC = () => {
  const { totalIncome, totalExpense } = useLoaderData() as IResponseTransactionLoader;
  useDocumentTitle("Transactions");

  return (
    <div className="p-6">
      {/* Заголовок страницы */}
      <div className="mb-8">
        <h1 className="mb-2 bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-3xl font-bold text-transparent">
          Transactions
        </h1>
        <p className="text-gray-400">Manage your income and expenses</p>
      </div>

      <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-3">
        {/* Add Transaction Form */}
        <div className="xl:col-span-2">
          <TransactionsForm />
        </div>

        {/* Statistic block */}
        <div className="space-y-6">
          {/* Total Statistics */}
          <div className="rounded-3xl border border-slate-700/50 bg-slate-800/50 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl">
            <h2 className="mb-4 flex items-center gap-2 text-lg sm:text-xl font-semibold text-white">
              <svg className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              <span className="whitespace-nowrap">Financial Overview</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex min-h-[120px] flex-col justify-center rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 p-4 text-center transition-transform duration-200 hover:scale-105">
                <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20">
                  <svg className="h-5 w-5 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                    />
                  </svg>
                </div>
                <p className="mb-2 text-sm font-medium text-gray-400">Total Income</p>
                <div className="flex min-h-[48px] items-center justify-center px-1">
                  <AdaptiveAmount amount={totalIncome} className="text-emerald-300" />
                </div>
              </div>

              <div className="flex min-h-[120px] flex-col justify-center rounded-2xl border border-red-500/20 bg-gradient-to-br from-red-500/10 to-red-600/10 p-4 text-center transition-transform duration-200 hover:scale-105">
                <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/20">
                  <svg className="h-5 w-5 text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <p className="mb-2 text-sm font-medium text-gray-400">Total Expense</p>
                <div className="flex min-h-[48px] items-center justify-center px-1">
                  <AdaptiveAmount amount={totalExpense} className="text-red-300" />
                </div>
              </div>
            </div>

            {/* Balance */}
            <div className="mt-4 border-t border-slate-700/50 pt-4">
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-400">Balance:</span>
                <div className="max-w-[180px] text-right">
                  <AdaptiveAmount
                    amount={totalIncome - totalExpense}
                    className={totalIncome - totalExpense >= 0 ? "text-cyan-300" : "text-red-300"}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Chart */}
          <div className="rounded-3xl border border-slate-700/50 bg-slate-800/50 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl">
            <h2 className="mb-4 flex items-center gap-2 text-lg sm:text-xl font-semibold text-white">
              <svg className="h-4 w-4 sm:h-5 sm:w-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
                />
              </svg>
              <span className="whitespace-nowrap">Income vs Expense</span>
            </h2>
            <Chart totalIncome={totalIncome} totalExpense={totalExpense} />
          </div>
        </div>
      </div>

      {/* Transaction Table */}
      <div className="mt-8">
        <div className="rounded-3xl border border-slate-700/50 bg-slate-800/50 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl">
          <h2 className="mb-6 flex items-center gap-2 text-xl font-semibold text-white">
            <svg className="h-5 w-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            Recent Transactions
          </h2>
          <TransactionTable limit={7} />
        </div>
      </div>
    </div>
  );
};

export default Transactions;
