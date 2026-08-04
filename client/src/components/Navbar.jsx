import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
import useSiteSettings from "../hooks/useSiteSettings.js";
import logo from "../assets/logo1.png";

const defaultNavItems = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/jobs", label: "Careers" },
  { to: "/contact", label: "Contact Us" },
  { to: "/about", label: "About Us" },
  { to: "/investors", label: "Investor" }
];

const SCROLL_HIDE_THRESHOLD = 80;

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const { settings } = useSiteSettings();
  const navigate = useNavigate();
  const location = useLocation();

  const [query, setQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);

  useEffect(() => {
    const updateVisibility = () => {
      // Show at top, hide after scrolling down
      setHeaderVisible(window.scrollY <= SCROLL_HIDE_THRESHOLD);
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
    setHeaderVisible(window.scrollY <= SCROLL_HIDE_THRESHOLD);
  }, [location.pathname]);

  const handleSearch = (event) => {
    event.preventDefault();

    const term = query.trim();
    if (!term) return;

    const targetPath = location.pathname.startsWith("/jobs") ? "/jobs" : "/services";

    navigate(`${targetPath}?q=${encodeURIComponent(term)}`);
    setMobileMenuOpen(false);
    setSearchOpen(false);
  };

  const navItems = settings.nav?.length ? settings.nav : defaultNavItems;
  const brandName = settings.brand?.name || "TRIVIN";
  const logoSrc = settings.brand?.logoUrl || logo;
  const showHeader = headerVisible || mobileMenuOpen || searchOpen;

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "rounded-full bg-cyan-400 px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-slate-950 shadow-lg shadow-cyan-400/30 transition-all duration-300"
      : "rounded-full border border-slate-700/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-400/60 hover:bg-slate-800/80 hover:text-white";

  const mobileNavLinkClass = ({ isActive }) =>
    isActive
      ? "block rounded-xl bg-cyan-400 px-4 py-3 text-center text-xs font-bold uppercase tracking-[0.12em] text-slate-950 shadow-lg shadow-cyan-400/25 transition-all duration-300"
      : "block rounded-xl border border-slate-700/80 px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.12em] text-slate-300 transition-all duration-300 hover:border-cyan-400/60 hover:bg-slate-800 hover:text-white";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b border-cyan-400/10 bg-gradient-to-r from-[#020617]/95 via-[#07111f]/95 to-[#020617]/95 shadow-2xl shadow-black/40 backdrop-blur-2xl transition-transform duration-300 ease-out ${
        showHeader ? "translate-y-0" : "-translate-y-full pointer-events-none"
      }`}
    >
      <div className="mx-auto w-full max-w-8xl px-0 sm:px-2 lg:px-4">
        <div className="hidden items-center gap-10 py-3 md:grid md:grid-cols-[auto_1fr]">
          <Link to="/" className="flex items-center">
            <img
              src={logoSrc}
              alt={brandName}
              className="h-28 w-auto object-contain transition-all duration-300 hover:scale-105 lg:h-36 xl:h-30"
            />
          </Link>

          <div className="flex flex-col gap-4">
            <div className="flex justify-center">
              <form
                onSubmit={handleSearch}
                className="flex w-[430px] items-center gap-3 rounded-full border border-cyan-400/20 bg-slate-950/70 px-4 py-2 shadow-lg shadow-cyan-500/10 transition-all duration-300 focus-within:border-cyan-400/70 focus-within:shadow-cyan-400/20"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="h-4 w-4 shrink-0 text-cyan-400"
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
                  className="w-full border-0 bg-transparent text-sm text-white outline-none placeholder:text-slate-500 focus:ring-0"
                />

                <button
                  type="submit"
                  className="rounded-full bg-cyan-400 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-slate-950 transition-all duration-300 hover:bg-cyan-300 hover:shadow-lg hover:shadow-cyan-400/30"
                >
                  Search
                </button>
              </form>
            </div>

            <nav className="flex flex-wrap items-center justify-center gap-2">
              {navItems.map(({ to, label }) => (
                <NavLink key={label} to={to} className={navLinkClass}>
                  {label}
                </NavLink>
              ))}

              {isAdmin && (
                <NavLink to="/admin" className={navLinkClass}>
                  Admin
                </NavLink>
              )}

              <div className="ml-1 flex items-center gap-2">
                {user ? (
                  <>
                    <NavLink to="/profile" className={navLinkClass}>
                      Profile
                    </NavLink>

                    <button
                      type="button"
                      onClick={logout}
                      className="rounded-full border border-slate-700/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-400/60 hover:bg-slate-800/80 hover:text-white"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <NavLink to="/login" className={navLinkClass}>
                      Login
                    </NavLink>

                    <NavLink to="/register" className={navLinkClass}>
                      Register
                    </NavLink>
                  </>
                )}
              </div>
            </nav>
          </div>
        </div>

        <div className="flex items-center justify-between py-2 md:hidden">
          <Link to="/" className="flex items-center">
            <img
              src={logoSrc}
              alt={brandName}
              className="h-12 w-16 object-contain transition-all duration-300 hover:scale-105 sm:h-14 sm:w-20"
            />
          </Link>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSearchOpen((prev) => !prev)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 bg-slate-900/80 text-slate-300 transition-all duration-300 hover:bg-cyan-400 hover:text-slate-950"
              aria-label="Toggle search"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" strokeLinecap="round" />
              </svg>
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 bg-slate-900/80 text-slate-300 transition-all duration-300 hover:bg-cyan-400 hover:text-slate-950"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {searchOpen && (
          <form
            onSubmit={handleSearch}
            className="mb-3 flex items-center gap-2 rounded-2xl border border-cyan-400/20 bg-slate-950/80 px-3 py-2 shadow-lg shadow-cyan-500/10 md:hidden"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-4 w-4 shrink-0 text-cyan-400"
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
              className="flex-1 border-0 bg-transparent text-sm text-white outline-none placeholder:text-slate-500 focus:ring-0"
              autoFocus
            />

            <button
              type="submit"
              className="rounded-full bg-cyan-400 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-slate-950 transition-all duration-300 hover:bg-cyan-300"
            >
              Go
            </button>
          </form>
        )}

        {mobileMenuOpen && (
          <nav className="mb-4 rounded-3xl border border-cyan-400/10 bg-[#07111f]/95 p-4 shadow-2xl shadow-black/40 backdrop-blur-xl md:hidden">
            <div className="space-y-2">
              {navItems.map(({ to, label }) => (
                <NavLink key={label} to={to} onClick={() => setMobileMenuOpen(false)} className={mobileNavLinkClass}>
                  {label}
                </NavLink>
              ))}

              {isAdmin && (
                <NavLink to="/admin" onClick={() => setMobileMenuOpen(false)} className={mobileNavLinkClass}>
                  Admin
                </NavLink>
              )}

              <div className="space-y-2 pt-2">
                {user ? (
                  <>
                    <NavLink
                      to="/profile"
                      onClick={() => setMobileMenuOpen(false)}
                      className={mobileNavLinkClass}
                    >
                      Profile
                    </NavLink>

                    <button
                      type="button"
                      onClick={() => {
                        logout();
                        setMobileMenuOpen(false);
                      }}
                      className="w-full rounded-xl border border-slate-700/80 px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.12em] text-slate-300 transition-all duration-300 hover:border-cyan-400/60 hover:bg-slate-800 hover:text-white"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <NavLink
                      to="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className={mobileNavLinkClass}
                    >
                      Login
                    </NavLink>

                    <NavLink
                      to="/register"
                      onClick={() => setMobileMenuOpen(false)}
                      className={mobileNavLinkClass}
                    >
                      Register
                    </NavLink>
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
