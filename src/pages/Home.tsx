import type { FC } from "react";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

const Home: FC = () => {
  const isAuth = useAuth();
  useDocumentTitle("Home");

  if (isAuth) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center p-6">
        <div className="mx-auto max-w-4xl text-center">
          {/* Приветственное сообщение для авторизованных пользователей */}
          <div className="mb-8 flex justify-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-r from-emerald-500 to-cyan-500 shadow-2xl shadow-cyan-500/20">
              <svg className="h-12 w-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>

          <h1 className="mb-6 bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-5xl font-bold text-transparent md:text-7xl">
            Welcome Back!
          </h1>

          <p className="mx-auto mb-8 max-w-2xl text-xl leading-relaxed text-gray-300 md:text-2xl">
            Ready to take control of your finances? Manage your transactions and track your spending.
          </p>

          {/* Быстрые действия */}
          <div className="mx-auto mb-12 grid max-w-3xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Link
              to="/transactions"
              className="group rounded-2xl border border-slate-700/50 bg-slate-800/50 p-6 backdrop-blur-sm transition-all duration-200 hover:border-cyan-500/30 hover:bg-slate-800/70"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/20 transition-transform duration-200 group-hover:scale-110">
                <svg className="h-6 w-6 text-cyan-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-white">Transactions</h3>
              <p className="text-sm text-gray-400">View and manage your income & expenses</p>
            </Link>

            <Link
              to="/categories"
              className="group rounded-2xl border border-slate-700/50 bg-slate-800/50 p-6 backdrop-blur-sm transition-all duration-200 hover:border-emerald-500/30 hover:bg-slate-800/70"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/20 transition-transform duration-200 group-hover:scale-110">
                <svg className="h-6 w-6 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-white">Categories</h3>
              <p className="text-sm text-gray-400">Organize your spending by categories</p>
            </Link>

            <div className="group rounded-2xl border border-slate-700/50 bg-slate-800/50 p-6 backdrop-blur-sm transition-all duration-200 hover:border-purple-500/30 hover:bg-slate-800/70">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/20 transition-transform duration-200 group-hover:scale-110">
                <svg className="h-6 w-6 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-white">Analytics</h3>
              <p className="text-sm text-gray-400">View your spending insights and reports</p>
            </div>
          </div>

          {/* Статистика */}
          <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-400">
            <div className="flex items-center gap-3 rounded-full border border-slate-700/50 bg-slate-800/30 px-4 py-2">
              <div className="h-2 w-2 animate-pulse rounded-full bg-cyan-400"></div>
              Financial dashboard
            </div>
            <div className="flex items-center gap-3 rounded-full border border-slate-700/50 bg-slate-800/30 px-4 py-2">
              <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-400"></div>
              Smart budgeting
            </div>
            <div className="flex items-center gap-3 rounded-full border border-slate-700/50 bg-slate-800/30 px-4 py-2">
              <div className="h-2 w-2 animate-pulse rounded-full bg-purple-400"></div>
              Progress tracking
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Оригинальный контент для неавторизованных пользователей
  return (
    <div className="flex min-h-[80vh] items-center justify-center p-6">
      <div className="mx-auto max-w-4xl text-center">
        {/* Логотип/иконка */}
        <div className="mb-8 flex justify-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-r from-emerald-500 to-cyan-500 shadow-2xl shadow-cyan-500/20 transition-all duration-300 hover:scale-105 hover:shadow-cyan-500/30">
            <svg className="h-12 w-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        {/* Заголовок */}
        <h1 className="mb-6 bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-5xl font-bold text-transparent md:text-7xl">
          CashFlow
        </h1>

        {/* Подзаголовок */}
        <p className="mx-auto mb-8 max-w-2xl text-xl leading-relaxed text-gray-300 md:text-2xl">
          Take control of your money. Track expenses, manage budgets, and achieve your financial goals.
        </p>

        {/* CTA кнопки */}
        <div className="mb-12 flex flex-wrap justify-center gap-4">
          <Link
            to="/auth"
            className="transform rounded-xl border border-cyan-400/20 bg-gradient-to-r from-emerald-600 to-cyan-600 px-10 py-4 font-semibold text-white shadow-2xl shadow-cyan-500/20 transition-all duration-200 hover:scale-105 hover:from-emerald-500 hover:to-cyan-500 hover:shadow-cyan-500/30"
          >
            Get Started Free
          </Link>
          <button className="rounded-xl border border-slate-600 bg-slate-800 px-10 py-4 font-semibold text-gray-200 transition-all duration-200 hover:scale-105 hover:border-slate-500 hover:bg-slate-700">
            Learn More
          </button>
        </div>

        {/* Статистика */}
        <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-700/50 bg-slate-800/50 p-6 backdrop-blur-sm transition-all duration-200 hover:border-cyan-500/30">
            <div className="mb-2 text-3xl font-bold text-cyan-300">5,000+</div>
            <div className="text-gray-400">Active Users</div>
          </div>
          <div className="rounded-2xl border border-slate-700/50 bg-slate-800/50 p-6 backdrop-blur-sm transition-all duration-200 hover:border-emerald-500/30">
            <div className="mb-2 text-3xl font-bold text-emerald-300">$2.1M+</div>
            <div className="text-gray-400">Managed</div>
          </div>
          <div className="rounded-2xl border border-slate-700/50 bg-slate-800/50 p-6 backdrop-blur-sm transition-all duration-200 hover:border-purple-500/30">
            <div className="mb-2 text-3xl font-bold text-purple-300">98%</div>
            <div className="text-gray-400">Satisfaction</div>
          </div>
        </div>

        {/* Особенности */}
        <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-400">
          <div className="flex items-center gap-3 rounded-full border border-slate-700/50 bg-slate-800/30 px-4 py-2">
            <div className="h-2 w-2 animate-pulse rounded-full bg-cyan-400"></div>
            Real-time tracking
          </div>
          <div className="flex items-center gap-3 rounded-full border border-slate-700/50 bg-slate-800/30 px-4 py-2">
            <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-400"></div>
            Secure & private
          </div>
          <div className="flex items-center gap-3 rounded-full border border-slate-700/50 bg-slate-800/30 px-4 py-2">
            <div className="h-2 w-2 animate-pulse rounded-full bg-purple-400"></div>
            Smart analytics
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
