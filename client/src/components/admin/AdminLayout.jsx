import { useEffect, useMemo, useState } from "react";
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  Activity,
  BadgeDollarSign,
  BarChart3,
  BookOpen,
  BriefcaseBusiness,
  Building2,
  FileText,
  GitBranch,
  Globe,
  Home,
  Image as ImageIcon,
  Inbox,
  Info,
  Layers3,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquareMore,
  PanelLeft,
  Phone,
  Search,
  Settings,
  Sparkles,
  Star,
  TrendingUp,
  UploadCloud,
  Users,
  X
} from "lucide-react";
import { useAuth } from "../../context/AuthContext.jsx";
import { ToastProvider } from "./ToastProvider.jsx";

const navGroups = [
  {
    title: "General",
    items: [{ label: "Dashboard", to: "/admin", icon: LayoutDashboard }]
  },
  {
    title: "Website Pages",
    items: [
      { label: "Home", to: "/admin/pages/home", icon: Home },
      { label: "About", to: "/admin/pages/about", icon: Info },
      { label: "Services", to: "/admin/pages/services", icon: Layers3 },
      { label: "Careers", to: "/admin/pages/jobs", icon: BriefcaseBusiness },
      { label: "Contact", to: "/admin/pages/contact", icon: Phone },
      { label: "Investor", to: "/admin/pages/investor", icon: TrendingUp }
    ]
  },
  {
    title: "Content Library",
    items: [
      { label: "Services", to: "/admin/services", icon: Layers3 },
      { label: "Features", to: "/admin/features", icon: Sparkles },
      { label: "Jobs", to: "/admin/jobs", icon: BriefcaseBusiness },
      { label: "Internships", to: "/admin/internships", icon: BookOpen },
      { label: "Portfolio", to: "/admin/portfolio", icon: ImageIcon },
      { label: "Testimonials", to: "/admin/testimonials", icon: Star },
      { label: "Workflow", to: "/admin/workflow", icon: GitBranch },
      { label: "Trusted Clients", to: "/admin/trusted-clients", icon: Building2 },
      { label: "Pricing Plans", to: "/admin/pricing-plans", icon: BadgeDollarSign }
    ]
  },
  {
    title: "Messages",
    items: [
      { label: "Queries", to: "/admin/queries", icon: MessageSquareMore },
      { label: "Contact Requests", to: "/admin/contacts", icon: Inbox }
    ]
  },
  {
    title: "People",
    items: [
      { label: "Employees", to: "/admin/employees", icon: Users },
      { label: "Bulk Import", to: "/admin/employees/bulk-import", icon: UploadCloud },
      { label: "Activity", to: "/admin/activity", icon: Activity },
      { label: "Reports", to: "/admin/reports", icon: FileText }
    ]
  },
  {
    title: "Configuration",
    items: [
      { label: "Site Settings", to: "/admin/settings", icon: Settings },
      { label: "Navigation & Footer", to: "/admin/navigation", icon: PanelLeft }
    ]
  }
];

const allItems = navGroups.flatMap((group) => group.items.map((item) => ({ ...item, group: group.title })));

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);

  useEffect(() => {
    setSidebarOpen(false);
    setSearch("");
  }, [location.pathname]);

  const activeTo = useMemo(() => {
    const matches = allItems
      .filter((item) => location.pathname === item.to || location.pathname.startsWith(`${item.to}/`))
      .sort((a, b) => b.to.length - a.to.length);
    return matches[0]?.to || "/admin";
  }, [location.pathname]);

  const activeItem = allItems.find((item) => item.to === activeTo);

  const searchResults = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return [];
    return allItems.filter((item) => `${item.label} ${item.group}`.toLowerCase().includes(term)).slice(0, 6);
  }, [search]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const initials = (user?.name || "Admin")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <ToastProvider>
      <div className="flex min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
        <aside
          className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-slate-800 bg-slate-950/95 transition-transform duration-300 lg:relative lg:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-slate-800 px-6 py-5">
            <Link to="/admin" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400">TRIVIN</p>
                <p className="text-sm font-bold text-white">Admin Console</p>
              </div>
            </Link>
            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              className="rounded-lg p-1 text-slate-400 hover:text-white lg:hidden"
              aria-label="Close sidebar"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex-1 space-y-6 overflow-y-auto px-4 py-5">
            {navGroups.map((group) => (
              <div key={group.title}>
                <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                  {group.title}
                </p>
                <div className="space-y-1">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    const active = item.to === activeTo;
                    return (
                      <Link
                        key={item.to}
                        to={item.to}
                        className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                          active
                            ? "bg-gradient-to-r from-cyan-500/90 to-blue-500/90 text-white shadow-lg shadow-cyan-500/20"
                            : "text-slate-400 hover:bg-slate-800/70 hover:text-white"
                        }`}
                      >
                        <Icon className="h-5 w-5 flex-shrink-0" />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>

          <div className="border-t border-slate-800 p-4">
            <Link
              to="/"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-400 transition hover:bg-slate-800/70 hover:text-white"
            >
              <Globe className="h-5 w-5" /> View live site
            </Link>
          </div>
        </aside>

        {sidebarOpen && (
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-30 bg-black/60 lg:hidden"
            aria-label="Close sidebar overlay"
          />
        )}

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-20 border-b border-slate-800 bg-slate-950/85 backdrop-blur">
            <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
              <div className="flex min-w-0 items-center gap-3">
                <button
                  type="button"
                  onClick={() => setSidebarOpen(true)}
                  className="rounded-lg border border-slate-700 bg-slate-800 p-2 text-slate-300 hover:bg-slate-700 lg:hidden"
                  aria-label="Open sidebar"
                >
                  <Menu className="h-5 w-5" />
                </button>
                <div className="min-w-0">
                  <p className="truncate text-xs text-slate-500">
                    Admin {activeItem ? `/ ${activeItem.group}` : ""}
                  </p>
                  <h2 className="truncate text-base font-semibold text-white">{activeItem?.label || "Dashboard"}</h2>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative hidden sm:block">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  <input
                    type="search"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setTimeout(() => setSearchFocused(false), 150)}
                    placeholder="Jump to..."
                    className="w-52 rounded-lg border border-slate-700 bg-slate-900/70 py-2 pl-9 pr-3 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
                  />
                  {searchFocused && searchResults.length > 0 && (
                    <div className="absolute right-0 top-12 z-40 w-64 overflow-hidden rounded-xl border border-slate-700 bg-slate-900 shadow-2xl">
                      {searchResults.map((item) => {
                        const Icon = item.icon;
                        return (
                          <button
                            key={item.to}
                            type="button"
                            onMouseDown={() => navigate(item.to)}
                            className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
                          >
                            <Icon className="h-4 w-4 text-cyan-400" />
                            <span>{item.label}</span>
                            <span className="ml-auto text-xs text-slate-600">{item.group}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800/60 py-1.5 pl-1.5 pr-3">
                  <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-cyan-400 to-blue-500 text-xs font-bold text-white">
                    {initials}
                  </div>
                  <div className="hidden leading-tight sm:block">
                    <p className="text-xs font-semibold text-white">{user?.name || "Admin"}</p>
                    <p className="text-[10px] text-slate-500">Administrator</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800/60 px-3 py-2 text-sm font-medium text-slate-300 transition hover:border-red-500/40 hover:text-red-300"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto">
            <div className="mx-auto w-full max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </ToastProvider>
  );
};

export default AdminLayout;
