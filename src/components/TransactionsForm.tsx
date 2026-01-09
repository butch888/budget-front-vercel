import { useState, type FC } from "react";
import { FaPlus } from "react-icons/fa";
import { Form, useLoaderData } from "react-router-dom";
import type { IResponseTransactionLoader } from "../types/types";
import CategoryModal from "./CategoryModal";

const TransactionsForm: FC = () => {
  const { categories } = useLoaderData() as IResponseTransactionLoader;
  const [visibleModal, setVisibleModal] = useState(false);

  return (
    <div className="rounded-2xl sm:rounded-3xl border border-slate-700/50 bg-slate-800/50 p-4 sm:p-6 shadow-2xl shadow-black/20 backdrop-blur-xl">
      <Form className="grid gap-4 sm:gap-6" method="post" action="/transactions">
        {/* Поля ввода */}
        <div className="grid gap-3 sm:gap-4">
          <label htmlFor="title" className="space-y-1 sm:space-y-2">
            <span className="block text-xs sm:text-sm font-medium text-gray-300">Title</span>
            <input
              type="text"
              name="title"
              className="w-full rounded-lg sm:rounded-xl border border-slate-600 bg-slate-700/50 px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-200 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/50 focus:outline-none"
              placeholder="Enter transaction title..."
              required
            />
          </label>

          <label htmlFor="amount" className="space-y-1 sm:space-y-2">
            <span className="block text-xs sm:text-sm font-medium text-gray-300">Amount</span>
            <input
              type="number"
              name="amount"
              className="w-full rounded-lg sm:rounded-xl border border-slate-600 bg-slate-700/50 px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-200 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/50 focus:outline-none"
              placeholder="0.00"
              step="0.01"
              min="0"
              required
            />
          </label>

          {/* Select Category */}
          {categories.length ? (
            <label htmlFor="category" className="space-y-1 sm:space-y-2">
              <span className="block text-xs sm:text-sm font-medium text-gray-300">Category</span>
              <select
                className="w-full cursor-pointer rounded-lg sm:rounded-xl border border-slate-600 bg-slate-700/50 px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white backdrop-blur-sm transition-all duration-200 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/50 focus:outline-none"
                name="category"
                required
              >
                <option value="" className="bg-slate-700">
                  Select a category
                </option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id} className="bg-slate-700">
                    {c.title}
                  </option>
                ))}
              </select>
            </label>
          ) : (
            <div className="rounded-xl sm:rounded-2xl border border-red-500/20 bg-red-500/10 p-3 sm:p-4 text-center">
              <div className="mx-auto mb-2 flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg sm:rounded-xl bg-red-500/20">
                <svg className="h-4 w-4 sm:h-5 sm:w-5 text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <p className="text-sm sm:text-base font-medium text-red-300">To continue create a category first</p>
            </div>
          )}

          {/* Manage Categories Button */}
          <button
            type="button"
            className="group flex w-fit items-center gap-2 sm:gap-3 text-cyan-300 transition-colors duration-200 hover:text-cyan-200"
            onClick={() => setVisibleModal(true)}
          >
            <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-md sm:rounded-lg bg-cyan-500/20 transition-colors duration-200 group-hover:bg-cyan-500/30">
              <FaPlus className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
            </div>
            <span className="text-sm sm:text-base font-medium">Manage Categories</span>
          </button>
        </div>

        {/* Radio Buttons */}
        <div className="space-y-2 sm:space-y-3">
          <span className="block text-xs sm:text-sm font-medium text-gray-300">Transaction Type</span>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
            <label className="group flex cursor-pointer items-center gap-2 sm:gap-3">
              <div className="relative">
                <input type="radio" name="type" value={"income"} className="peer sr-only" defaultChecked />
                <div className="h-4 w-4 sm:h-5 sm:w-5 rounded-full border-2 border-slate-500 transition-all duration-200 group-hover:border-emerald-300 peer-checked:border-emerald-400 peer-checked:bg-emerald-400"></div>
                <div className="peer-checked:animate-ping-slow absolute inset-0 rounded-full peer-checked:bg-emerald-400/30"></div>
              </div>
              <span className="flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base font-medium text-white">
                <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-emerald-400"></div>
                Income
              </span>
            </label>

            <label className="group flex cursor-pointer items-center gap-2 sm:gap-3">
              <div className="relative">
                <input type="radio" name="type" value={"expense"} className="peer sr-only" />
                <div className="h-4 w-4 sm:h-5 sm:w-5 rounded-full border-2 border-slate-500 transition-all duration-200 group-hover:border-red-300 peer-checked:border-red-400 peer-checked:bg-red-400"></div>
                <div className="peer-checked:animate-ping-slow absolute inset-0 rounded-full peer-checked:bg-red-400/30"></div>
              </div>
              <span className="flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base font-medium text-white">
                <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-red-400"></div>
                Expense
              </span>
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full transform rounded-lg sm:rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-600 px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-white shadow-lg shadow-cyan-500/20 transition-all duration-200 hover:scale-105 hover:from-emerald-500 hover:to-cyan-500 hover:shadow-cyan-500/30 disabled:scale-100 disabled:cursor-not-allowed disabled:from-slate-600 disabled:to-slate-600"
          disabled={categories.length === 0}
        >
          <span className="flex items-center justify-center gap-1.5 sm:gap-2">
            <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Add Transaction
          </span>
        </button>
      </Form>

      {/* Add Category Modal */}
      {visibleModal && <CategoryModal type="POST" setVisibleModal={setVisibleModal} />}
    </div>
  );
};

export default TransactionsForm;
