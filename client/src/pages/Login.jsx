import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import api from "../api/api.js";
import { auth, googleProvider } from "../firebase.js";
import { useAuth } from "../context/AuthContext.jsx";
import logo from "../assets/logo1.png";

const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const routeAfterLogin = (user) => {
    if (user?.role === "admin") return "/admin";
    const redirect = searchParams.get("redirect");
    if (redirect && redirect.startsWith("/") && !redirect.startsWith("//")) {
      return redirect;
    }
    return "/";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      const { data } = await api.post("/auth/login", form);
      login(data.token, data.user);
      navigate(routeAfterLogin(data.user), { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  const handleGoogle = async () => {
    setError("");
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();
      const { data } = await api.post("/auth/google", { idToken });
      login(data.token, data.user);
      navigate(routeAfterLogin(data.user), { replace: true });
    } catch (err) {
      setError(err.message || "Google login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-blue-900 flex flex-col">
      <div className="flex-1 flex items-start justify-center px-4 pb-12 pt-56 sm:px-6 lg:px-8 lg:pt-64">
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          {/* Left: Login form */}
          <div className="bg-white rounded-3xl border border-gray-100 p-10 shadow-sm h-full flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-transparent text-white flex items-center justify-center font-bold">
                  <img src={logo} alt="Trivin" />
                </div>
                <span className="font-heading text-lg font-semibold">
                  Trivin
                </span>
              </div>
            </div>

            <h2 className="mt-40 text-3xl font-bold">Welcome back</h2>
            <p className="mt-2 text-sm text-gray-600">
              Sign in to access your dashboard and manage your services.
            </p>

            {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="text-sm">Email</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, email: event.target.value }))
                  }
                  className="mt-2 w-full rounded-xl border border-gray-200 px-3 py-2"
                />
              </div>
              <div>
                <label className="text-sm">Password</label>
                <input
                  type="password"
                  required
                  value={form.password}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      password: event.target.value,
                    }))
                  }
                  className="mt-2 w-full rounded-xl border border-gray-200 px-3 py-2"
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 text-sm">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span>Remember me</span>
                </label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-indigo-600 font-medium"
                >
                  Forgot password?
                </Link>
              </div>

              <button type="submit" className="button-primary w-full">
                Login
              </button>
            </form>

            <div className="mt-6 space-y-3">
              <button
                type="button"
                onClick={handleGoogle}
                className="button-outline w-full"
              >
                Continue with Google
              </button>
              <div className="text-center text-sm text-gray-600">
                Or continue with
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  disabled
                  className="flex-1 rounded-full border border-dashed border-gray-300 px-4 py-2 text-sm text-gray-400"
                >
                  Mobile OTP (coming soon)
                </button>
                <button
                  type="button"
                  disabled
                  className="flex-1 rounded-full border border-dashed border-gray-300 px-4 py-2 text-sm text-gray-400"
                >
                  SSO (coming soon)
                </button>
              </div>
            </div>

            <p className="mt-6 text-sm text-gray-600">
              New here?{" "}
              <Link
                to={
                  searchParams.get("redirect")
                    ? `/register?redirect=${encodeURIComponent(searchParams.get("redirect"))}`
                    : "/register"
                }
                className="font-semibold text-indigo-600"
              >
                Create an account
              </Link>
            </p>
          </div>

          {/* Right: Illustration & features */}
          <div className="px-2">
            <div className="rounded-2xl bg-gradient-to-br from-blue-900 to-blue-800 p-8 h-full flex flex-col justify-between text-blue-200">
              <div>
                <div className="h-56 w-full rounded-md overflow-hidden bg-gradient-to-br from-blue-700 to-blue-600 flex items-center justify-center">
                  <div className="text-blue-100 font-semibold">
                    Dashboard Preview
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-xl font-semibold text-blue-100">
                  Feature Highlights
                </h3>
                <ul className="mt-4 space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-blue-500 text-white flex items-center justify-center">
                      ✓
                    </div>
                    <div>
                      <div className="font-medium text-blue-50">
                        Unified Dashboard
                      </div>
                      <div className="text-sm text-blue-200">
                        Manage jobs, services and queries in one place.
                      </div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-blue-500 text-white flex items-center justify-center">
                      ★
                    </div>
                    <div>
                      <div className="font-medium text-blue-50">
                        Fast Onboarding
                      </div>
                      <div className="text-sm text-blue-200">
                        Get started quickly with guided setup.
                      </div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-blue-500 text-white flex items-center justify-center">
                      ⚡
                    </div>
                    <div>
                      <div className="font-medium text-blue-50">
                        Realtime Updates
                      </div>
                      <div className="text-sm text-blue-200">
                        Live notifications for new applications and messages.
                      </div>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="mt-6 text-sm text-blue-200">
                Try the demo dashboard after signing in.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
