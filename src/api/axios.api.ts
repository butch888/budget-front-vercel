// http://localhost:5000/api/
import axios from "axios";
import { getTokenFromLocalstorage } from "../helpers/localstarage.helper";

const API_URL = import.meta.env.VITE_API_URL || "https://budget-front-vercel.vercel.app";
const API_PREFIX = import.meta.env.VITE_API_PREFIX || "";

// Убираем слэш в конце URL, если есть
const baseURL = API_URL.endsWith("/") ? API_URL.slice(0, -1) : API_URL;
// Добавляем префикс API
const fullBaseURL = `${baseURL}${API_PREFIX}`;

export const instance = axios.create({
  baseURL: fullBaseURL,
});

// Добавляем интерцептор для каждого запроса
instance.interceptors.request.use((config) => {
  const token = getTokenFromLocalstorage();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Добавляем обработчик ошибок
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Логируем ошибки для отладки
    if (error.code === "ERR_NETWORK" || error.message === "Network Error") {
      console.error("Network Error:", {
        message: error.message,
        baseURL: instance.defaults.baseURL,
        url: error.config?.url,
        fullURL: `${instance.defaults.baseURL}${error.config?.url}`,
      });
    }
    
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/auth";
    }
    return Promise.reject(error);
  },
);
