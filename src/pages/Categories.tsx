import { useState, type FC } from "react";
import { AiFillCloseCircle, AiFillEdit } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import { Form, useLoaderData } from "react-router-dom";
import CategoryModal from "../components/CategoryModal";
import { instance } from "../api/axios.api";
import type { ActionFunctionArgs } from "react-router-dom";
import type { ICategory } from "../types/types";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

// eslint-disable-next-line react-refresh/only-export-components
export const categoriesAction = async ({ request }: ActionFunctionArgs) => {
  switch (request.method) {
    case "POST": {
      const formData = await request.formData();
      const title = {
        title: formData.get("title"),
      };
      await instance.post("/categories", title);
      return null;
    }
    case "PATCH": {
      const formData = await request.formData();
      const category = {
        id: formData.get("id"),
        title: formData.get("title"),
      };
      await instance.patch(`/categories/category/${category.id}`, category);
      return null;
    }
    case "DELETE": {
      const formData = await request.formData();
      const categoryID = formData.get("id");
      await instance.delete(`/categories/category/${categoryID}`);
      return null;
    }
  }
};

// eslint-disable-next-line react-refresh/only-export-components
export const categoriesLoader = async () => {
  const { data } = await instance.get<ICategory[]>("/categories");
  return data;
};

const Categories: FC = () => {
  const categories = useLoaderData() as ICategory[];
  const [visibleModal, setVisibleModal] = useState<boolean>(false);
  const [categoryId, setCategoryId] = useState<number>(0);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  useDocumentTitle("Categories");

  return (
    <div className="p-3 sm:p-4 md:p-6">
      {/* Заголовок страницы */}
      <div className="mb-6 sm:mb-8">
        <h1 className="mb-2 bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-2xl sm:text-3xl font-bold text-transparent">
          Categories
        </h1>
        <p className="text-sm sm:text-base text-gray-400">Manage your spending categories</p>
      </div>

      <div className="rounded-2xl sm:rounded-3xl border border-slate-700/50 bg-slate-800/50 p-4 sm:p-6 shadow-2xl shadow-black/20 backdrop-blur-xl">
        {/* Заголовок списка */}
        <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
          <h2 className="flex items-center gap-2 text-lg sm:text-xl font-semibold text-white">
            <svg className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            <span className="whitespace-nowrap">Your Categories</span>
          </h2>

          <button
            className="w-full sm:w-auto flex transform items-center justify-center gap-2 sm:gap-3 rounded-lg sm:rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-600 px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-white shadow-lg shadow-cyan-500/20 transition-all duration-200 hover:scale-105 hover:from-emerald-500 hover:to-cyan-500 hover:shadow-cyan-500/30"
            onClick={() => setVisibleModal(true)}
          >
            <FaPlus className="h-3 w-3 sm:h-4 sm:w-4" />
            <span>New Category</span>
          </button>
        </div>

        {/* Category list */}
        {categories.length > 0 ? (
          <div className="grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {categories.map((category) => (
              <div
                key={category.id}
                className="group relative flex min-h-[80px] sm:min-h-[100px] items-center justify-center rounded-xl sm:rounded-2xl border border-slate-600/50 bg-gradient-to-br from-slate-700/50 to-slate-800/50 p-3 sm:p-4 backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:border-cyan-500/30"
              >
                <span className="px-2 text-center text-sm sm:text-base font-medium break-words text-white">{category.title}</span>

                {/* Hover actions */}
                <div className="absolute inset-0 hidden items-center justify-center gap-3 sm:gap-4 rounded-xl sm:rounded-2xl bg-slate-900/90 backdrop-blur-sm transition-all duration-200 group-hover:flex">
                  <button
                    onClick={() => {
                      setIsEdit(true);
                      setCategoryId(category.id);
                      setVisibleModal(true);
                    }}
                    className="transform rounded-lg sm:rounded-xl bg-cyan-500 p-1.5 sm:p-2 text-white transition-all duration-200 hover:scale-110 hover:bg-cyan-400"
                  >
                    <AiFillEdit className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>

                  <Form method="delete" action="/categories">
                    <input type="hidden" name="id" value={category.id} />
                    <button
                      type="submit"
                      className="transform rounded-lg sm:rounded-xl bg-red-500 p-1.5 sm:p-2 text-white transition-all duration-200 hover:scale-110 hover:bg-red-400"
                    >
                      <AiFillCloseCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                    </button>
                  </Form>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-8 sm:py-12 text-center">
            <div className="mx-auto mb-3 sm:mb-4 flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl sm:rounded-3xl bg-slate-700/50">
              <svg className="h-8 w-8 sm:h-10 sm:w-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-base sm:text-lg font-semibold text-gray-300">No categories yet</h3>
            <p className="mb-3 sm:mb-4 text-sm sm:text-base text-gray-400">Create your first category to organize transactions</p>
            <button
              className="transform rounded-lg sm:rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-600 px-4 sm:px-6 py-2 sm:py-2 text-sm sm:text-base font-semibold text-white transition-all duration-200 hover:scale-105 hover:from-emerald-500 hover:to-cyan-500"
              onClick={() => setVisibleModal(true)}
            >
              Create Category
            </button>
          </div>
        )}

        {/* Информация о категориях */}
        {categories.length > 0 && (
          <div className="mt-4 sm:mt-6 border-t border-slate-700/50 pt-4 sm:pt-6">
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-gray-400">
              <div className="flex items-center justify-center gap-2">
                <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-cyan-400"></div>
                Click on category to edit
              </div>
              <div className="flex items-center justify-center gap-2">
                <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-red-400"></div>
                Delete unused categories
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add Category Modal */}
      {visibleModal && !isEdit && <CategoryModal type="POST" setVisibleModal={setVisibleModal} />}

      {/* Edit Category Modal */}
      {visibleModal && isEdit && <CategoryModal type="PATCH" id={categoryId} setVisibleModal={setVisibleModal} />}
    </div>
  );
};

export default Categories;
