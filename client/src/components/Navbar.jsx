import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import logo from "../assets/logo.png";

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [query, setQuery] = useState("");

  const navClass = ({ isActive }) =>
    isActive
      ? "button-primary px-3 py-1 text-xs"
      : "button-outline px-3 py-1 text-xs";

  const handleSearch = (event) => {
    event.preventDefault();
    const term = query.trim();

    if (!term) {
      return;
    }

    const targetPath = location.pathname.startsWith("/jobs") ? "/jobs" : "/services";
    navigate(`${targetPath}?q=${encodeURIComponent(term)}`);
  };

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/services", label: "Services" },
    { to: "/jobs", label: "Careers" },
    { to: "/contact", label: "ContactUs" },
    { to: "/about", label: "AboutUs" },
    { to: "/investors", label: "Investor" }
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-gray-100/15 bg-slate-950/70 backdrop-blur-xl shadow-[0_12px_40px_rgba(2,8,20,0.35)]">
      <div className="w-full px-4 py-2 sm:px-6">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2 xl:flex-row xl:items-center xl:justify-between">
            <Link to="/" className="flex items-center gap-2 self-start">
              <img src={logo} alt="TRIVIN TECHNOLOY" className="h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24" />
              <h1 className="font-heading text-lg font-semibold tracking-wide text-blue-500 sm:text-xl lg:text-2xl">
                TRIVIN TECHNOLOY
              </h1>
            </Link>

            <form
              onSubmit={handleSearch}
              className="flex w-full items-center gap-2 rounded-full border border-gray-100/15 bg-slate-900/70 px-4 py-0.5 shadow-sm xl:max-w-lg"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-5 w-5 shrink-0 text-brand"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" strokeLinecap="round" />
              </svg>
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search services or jobs"
                className="w-full border-0 bg-transparent px-0 py-0 text-sm outline-none placeholder:text-sky-200/40 focus:ring-0"
              />
              <button
                type="submit"
                className="button-primary px-2 py-1 text-xs uppercase tracking-[0.12em]"
              >
                Search
              </button>
            </form>

            {/* moved auth controls down to the nav row for layout per request */}
          </div>

          <div className="flex w-full flex-wrap items-center justify-center gap-3 text-sm text-center">
            <nav className="flex flex-wrap items-center justify-center gap-3">
              {navItems.map(({ to, label }) => (
                <NavLink key={label} to={to} className={navClass}>
                  {label}
                </NavLink>
              ))}
              {isAdmin && (
                <NavLink to="/admin" className={navClass}>
                  Admin
                </NavLink>
              )}
            </nav>

            <div className="flex flex-wrap items-center justify-center gap-3">
              {user ? (
                <>
                  <Link to="/profile" className="button-outline px-3 py-1 text-xs">
                    Profile
                  </Link>
                  <button
                    type="button"
                    onClick={logout}
                    className="button-primary px-3 py-1 text-xs"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="button-outline px-3 py-1 text-xs">
                    Login
                  </Link>
                  <Link to="/register" className="button-outline px-3 py-1 text-xs">
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
