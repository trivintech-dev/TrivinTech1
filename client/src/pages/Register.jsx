import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import api from "../api/api.js";
import { useAuth } from "../context/AuthContext.jsx";

const Register = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState("");

  const routeAfterRegister = () => {
    const redirect = searchParams.get("redirect");
    if (redirect && redirect.startsWith("/") && !redirect.startsWith("//")) {
      return redirect;
    }
    return "/";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!agree) {
      setError("Please accept the terms and conditions");
      return;
    }

    try {
      const payload = {
        name: form.name,
        email: form.email,
        password: form.password
      };
      const { data } = await api.post("/auth/register", payload);
      login(data.token, data.user);
      navigate(routeAfterRegister(), { replace: true });
    } catch (err) {
      const status = err.response?.status;
      const message = err.response?.data?.message || err.message || "Registration failed";

      if (status === 409) {
        setError("This email is already registered. Please login or use a different email.");
      } else {
        setError(message);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-blue-900 flex flex-col">
      <div className="flex-1 flex items-start justify-center px-4 pb-12 pt-56 sm:px-6 lg:px-8 lg:pt-64">
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          <div className="bg-white rounded-3xl border border-gray-100 p-10 shadow-sm h-full flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">T</div>
                <span className="font-heading text-lg font-semibold">Trivin</span>
              </div>
            </div>

            <h2 className="mt-40 text-3xl font-bold">Create Account</h2>
            <p className="mt-2 text-sm text-gray-600">Join now to manage your dashboard, jobs, and services in one place.</p>

            {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="text-sm">Full Name</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                  className="mt-2 w-full rounded-xl border border-gray-200 px-3 py-2"
                />
              </div>
              <div>
                <label className="text-sm">Email</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                  className="mt-2 w-full rounded-xl border border-gray-200 px-3 py-2"
                />
              </div>
              <div>
                <label className="text-sm">Password</label>
                <input
                  type="password"
                  required
                  value={form.password}
                  onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
                  className="mt-2 w-full rounded-xl border border-gray-200 px-3 py-2"
                />
              </div>
              <div>
                <label className="text-sm">Confirm Password</label>
                <input
                  type="password"
                  required
                  value={form.confirmPassword}
                  onChange={(event) => setForm((prev) => ({ ...prev, confirmPassword: event.target.value }))}
                  className="mt-2 w-full rounded-xl border border-gray-200 px-3 py-2"
                />
              </div>

              <label className="flex items-start space-x-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={(event) => setAgree(event.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span>I agree to the terms and conditions</span>
              </label>

              <button type="submit" className="button-primary w-full">
                Create account
              </button>
            </form>

            <div className="mt-6 space-y-3">
              <button type="button" disabled className="w-full rounded-full border border-dashed border-gray-300 px-6 py-3 text-sm text-gray-400">
                Social signup (coming soon)
              </button>
            </div>

            <p className="mt-6 text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to={
                  searchParams.get("redirect")
                    ? `/login?redirect=${encodeURIComponent(searchParams.get("redirect"))}`
                    : "/login"
                }
                className="font-semibold text-indigo-600"
              >
                Login
              </Link>
            </p>
          </div>

          <div className="px-2">
            <div className="rounded-2xl bg-gradient-to-br from-blue-900 to-blue-800 p-8 h-full flex flex-col justify-between text-blue-200">
              <div>
                <div className="h-56 w-full rounded-md overflow-hidden bg-gradient-to-br from-blue-700 to-blue-600 flex items-center justify-center">
                  <div className="text-blue-100 font-semibold">Dashboard Preview</div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-xl font-semibold text-blue-100">Features</h3>
                <ul className="mt-4 space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-blue-500 text-white flex items-center justify-center">✓</div>
                    <div>
                      <div className="font-medium text-blue-50">Unified Dashboard</div>
                      <div className="text-sm text-blue-200">Manage jobs, services and queries in one place.</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-blue-500 text-white flex items-center justify-center">★</div>
                    <div>
                      <div className="font-medium text-blue-50">Testimonials</div>
                      <div className="text-sm text-blue-200">See what users say after signing up.</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-blue-500 text-white flex items-center justify-center">⚡</div>
                    <div>
                      <div className="font-medium text-blue-50">Fast Onboarding</div>
                      <div className="text-sm text-blue-200">Get started quickly with guided setup.</div>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="mt-6 text-sm text-blue-200">Create your account to explore the demo dashboard.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
