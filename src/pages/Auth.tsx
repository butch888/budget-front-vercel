import { useState, type FC, useEffect } from "react";
import { AuthService } from "../services/auth.service";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { setTokenToLocalStorage } from "../helpers/localstarage.helper";
import { useAppDispatch } from "../store/hooks";
import { login } from "../store/user/userSlice";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

const Auth: FC = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState<string>("");
  const dispath = useAppDispatch();
  const navigate = useNavigate();
  const isAuth = useAuth();
  useDocumentTitle(isLogin ? "Sign In" : "Sign Up");

  // Перенаправление если пользователь уже авторизован
  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, [isAuth, navigate]);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^@]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const authHandler = async (e: React.FormEvent) => {
    try {
      e.preventDefault();

      if (!validateEmail(email)) {
        setEmailError("Invalid email address");
        return;
      }

      setEmailError("");
      setIsLoading(true);

      if (isLogin) {
        const data = await AuthService.login({ email, password });
        if (data) {
          setTokenToLocalStorage("token", data.token);
          dispath(login(data));
          toast.success("Welcome back! You have been logged in.");
          navigate("/");
        }
      } else {
        const data = await AuthService.registration({ email, password });
        if (data) {
          toast.success("🎉 Account has been created successfully!");
          setIsLogin(true);
        }
      }
    } catch (err) {
      if (err instanceof AxiosError && err.response?.data?.message) {
        toast.error(err.response.data.message);
      } else if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("An unknown error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Если пользователь авторизован, показываем ничего или loader
  // (но он будет быстро перенаправлен благодаря useEffect)
  if (isAuth) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-4 border-cyan-500 border-t-transparent"></div>
          <p className="text-gray-400">Redirecting...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Карточка авторизации */}
        <div className="rounded-3xl border border-slate-700/50 bg-slate-800/50 p-8 shadow-2xl shadow-black/30 backdrop-blur-xl">
          {/* Заголовок */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 shadow-lg shadow-cyan-500/20">
              <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h1 className="mb-2 bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-3xl font-bold text-transparent">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h1>
            <p className="text-sm text-gray-400">
              {isLogin ? "Sign in to your CashFlow account" : "Join CashFlow to manage your finances"}
            </p>
          </div>

          {/* Форма */}
          <form onSubmit={authHandler} className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">Email</label>
              <input
                type="email"
                value={email}
                placeholder="Enter your email"
                className={`w-full rounded-xl border px-4 py-3 text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-200 focus:outline-none ${
                  emailError
                    ? "border-red-500 bg-red-900/20 focus:border-red-500 focus:ring-2 focus:ring-red-500/50"
                    : "border-slate-600 bg-slate-700/50 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/50"
                }`}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailError) setEmailError("");
                }}
                required
              />
              {emailError && <p className="mt-1 text-sm text-red-400">{emailError}</p>}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">Password</label>
              <input
                type="password"
                value={password}
                placeholder="Enter your password"
                className="w-full rounded-xl border border-slate-600 bg-slate-700/50 px-4 py-3 text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-200 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/50 focus:outline-none"
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full transform items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-600 px-4 py-3 font-semibold text-white shadow-lg shadow-cyan-500/20 transition-all duration-200 hover:scale-[1.02] hover:from-emerald-500 hover:to-cyan-500 hover:shadow-cyan-500/30 disabled:scale-100 disabled:cursor-not-allowed disabled:from-slate-600 disabled:to-slate-600"
            >
              {isLoading ? (
                <>
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-white" />
                  {isLogin ? "Signing in..." : "Creating account..."}
                </>
              ) : (
                <>{isLogin ? "Sign In" : "Create Account"}</>
              )}
            </button>
          </form>

          {/* Переключатель */}
          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm font-medium text-gray-400 transition-colors duration-200 hover:text-cyan-300"
            >
              {isLogin ? (
                <>
                  Don't have an account? <span className="font-semibold text-cyan-300">Sign up</span>
                </>
              ) : (
                <>
                  Already have an account? <span className="font-semibold text-cyan-300">Sign in</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Дополнительная информация */}
        <div className="mt-6 text-center">
          <div className="flex justify-center gap-6 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <div className="h-1 w-1 rounded-full bg-emerald-400"></div>
              Secure
            </span>
            <span className="flex items-center gap-1">
              <div className="h-1 w-1 rounded-full bg-cyan-400"></div>
              Private
            </span>
            <span className="flex items-center gap-1">
              <div className="h-1 w-1 rounded-full bg-purple-400"></div>
              Free
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
