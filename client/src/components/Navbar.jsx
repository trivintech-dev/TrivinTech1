import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
import logo from "../assets/logo1.png";

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [query, setQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

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
    <header className="fixed inset-x-0 top-0 z-50 bg-slate-950/70 backdrop-blur-xl shadow-[0_12px_40px_rgba(2,8,20,0.35)]">
      <div className="w-full px-2 sm:px-4 md:px-6">
        {/* Desktop Layout: Two column grid */}
        <div className="hidden md:grid md:grid-cols-[auto_1fr] gap-6 py-4 items-start">
          {/* Column 1: Logo */}
          <Link to="/" className="flex items-center gap-3 flex-shrink-0 pt-2">
            <img src={logo} alt="TRIVIN" className="h-32 w-32 lg:h-40 lg:w-40" />
          </Link>

          {/* Column 2: Two rows */}
          <div className="flex flex-col gap-4">
            {/* Row 1: Search bar - centered */}
            <div className="flex justify-center w-full">
              <form
                onSubmit={handleSearch}
                className="flex items-center gap-2 rounded-full border border-gray-100/15 bg-slate-900/70 px-3 py-1.5 shadow-sm w-96"
              >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-4 w-4 shrink-0 text-brand"
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
                placeholder="Search services or jobs..."
                className="w-full border-0 bg-transparent px-0 py-0 text-sm outline-none placeholder:text-sky-200/40 focus:ring-0"
              />
              <button
                type="submit"
                className="button-primary px-2 py-0.5 text-xs uppercase tracking-[0.12em]"
              >
                Search
              </button>
            </form>
            </div>

            {/* Row 2: Navigation items and Auth buttons */}
            <nav className="flex items-center justify-start gap-2 flex-wrap">
              {navItems.map(({ to, label }) => (
                <NavLink
                  key={label}
                  to={to}
                  className={({ isActive }) =>
                    isActive
                      ? "button-primary px-3 py-1 text-xs"
                      : "button-outline px-3 py-1 text-xs"
                  }
                >
                  {label}
                </NavLink>
              ))}
              {isAdmin && (
                <NavLink
                  to="/admin"
                  className={({ isActive }) =>
                    isActive
                      ? "button-primary px-3 py-1 text-xs"
                      : "button-outline px-3 py-1 text-xs"
                  }
                >
                  Admin
                </NavLink>
              )}
              
              {/* Auth buttons */}
              <div className="flex items-center gap-2">
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
            </nav>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden flex items-center justify-between gap-1 py-0 sm:py-0.12">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 flex-shrink-0">
            <img src={logo} alt="TRIVIN" className="h-12 w-12 sm:h-16 sm:w-16" />
          </Link>

          {/* Right section: Mobile icons */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Mobile search toggle */}
            <button
              type="button"
              onClick={() => setSearchOpen(!searchOpen)}
              className="inline-flex items-center justify-center p-1.5 rounded-lg text-gray-300 hover:bg-slate-800 transition"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" strokeLinecap="round" />
              </svg>
            </button>

            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-1.5 rounded-lg text-gray-300 hover:bg-slate-800 transition"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search bar - Shown when search toggle is active */}
        {searchOpen && (
          <form
            onSubmit={(e) => {
              handleSearch(e);
              setSearchOpen(false);
            }}
            className="md:hidden flex items-center gap-1.5 rounded-lg border border-gray-100/15 bg-slate-900/70 px-2 py-1.5 shadow-sm mb-2"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-4 w-4 shrink-0 text-brand"
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
              placeholder="Search"
              className="flex-1 border-0 bg-transparent px-0 py-0 text-xs outline-none placeholder:text-sky-200/40 focus:ring-0"
              autoFocus
            />
            <button
              type="submit"
              className="button-primary px-1.5 py-0.5 text-xs uppercase tracking-[0.12em]"
            >
              Go
            </button>
          </form>
        )}

        {/* Mobile Navigation Menu - Shown when menu toggle is active */}
        {mobileMenuOpen && (
          <nav className="md:hidden pt-2 pb-2">
            <div className="space-y-2">
              {navItems.map(({ to, label }) => (
                <NavLink
                  key={label}
                  to={to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    isActive
                      ? "block button-primary px-3 py-2 text-xs text-center"
                      : "block button-outline px-3 py-2 text-xs text-center"
                  }
                >
                  {label}
                </NavLink>
              ))}
              {isAdmin && (
                <NavLink
                  to="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    isActive
                      ? "block button-primary px-3 py-2 text-xs text-center"
                      : "block button-outline px-3 py-2 text-xs text-center"
                  }
                >
                  Admin
                </NavLink>
              )}
              
              {/* Mobile Auth buttons */}
              <div className="sm:hidden pt-2 space-y-1.5">
                {user ? (
                  <>
                    <Link
                      to="/profile"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block button-outline px-3 py-2 text-xs text-center"
                    >
                      Profile
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        logout();
                        setMobileMenuOpen(false);
                      }}
                      className="w-full button-primary px-3 py-2 text-xs"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block button-outline px-3 py-2 text-xs text-center"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block button-outline px-3 py-2 text-xs text-center"
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
