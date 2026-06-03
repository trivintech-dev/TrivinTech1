import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Activity,
  ArrowRight,
  Bell,
  BarChart3,
  BriefcaseBusiness,
  Building2,
  ChevronRight,
  Clock3,
  FileText,
  Layers3,
  MessageSquareMore,
  Menu,
  Search,
  ShieldCheck,
  Sparkles,
  UploadCloud,
  X,
  Users
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import api from "../api/api.js";

const navigationItems = [
  { label: "Overview", to: "/admin", icon: BarChart3 },
  { label: "Employees", to: "/admin/employees", icon: Users },
  { label: "Bulk Import", to: "/admin/employees/bulk-import", icon: UploadCloud },
  { label: "Activity", to: "/admin/activity", icon: Activity },
  { label: "Reports", to: "/admin/reports", icon: FileText },
  { label: "Services", to: "/admin/services", icon: Layers3 },
  { label: "Jobs", to: "/admin/jobs", icon: BriefcaseBusiness },
  { label: "Queries", to: "/admin/queries", icon: MessageSquareMore }
];

const resourceCards = [
  { title: "Services", description: "Manage service offerings and presentation cards.", to: "/admin/services", icon: Layers3 },
  { title: "Jobs", description: "Create and update job requirements.", to: "/admin/jobs", icon: BriefcaseBusiness },
  { title: "Workflow", description: "Edit process steps shown across the site.", to: "/admin/workflow", icon: Sparkles },
  { title: "Trusted Clients", description: "Maintain the client trust section.", to: "/admin/trusted-clients", icon: Building2 },
  { title: "Pricing Plans", description: "Manage pricing cards and package labels.", to: "/admin/pricing-plans", icon: BarChart3 },
  { title: "Queries", description: "Review submitted contact and support requests.", to: "/admin/queries", icon: MessageSquareMore }
];

const employeeCards = [
  { title: "Employees", description: "Create, edit, view, and delete employee profiles with admin-only access.", to: "/admin/employees", icon: Users, accent: "from-cyan-400/20 to-cyan-400/5" },
  { title: "Bulk Import", description: "Upload CSV files to add multiple employees at once.", to: "/admin/employees/bulk-import", icon: UploadCloud, accent: "from-emerald-400/20 to-emerald-400/5" },
  { title: "Activity Dashboard", description: "Monitor employee activity, attendance signals, and usage trends.", to: "/admin/activity", icon: Activity, accent: "from-violet-400/20 to-violet-400/5" },
  { title: "Reports", description: "Generate reports by department, role, and status.", to: "/admin/reports", icon: FileText, accent: "from-amber-400/20 to-amber-400/5" }
];

const chartColors = ["#22d3ee", "#38bdf8", "#818cf8", "#34d399", "#fbbf24", "#fb7185"];

const chartTooltipStyles = {
  backgroundColor: "#08111f",
  border: "1px solid rgba(148, 163, 184, 0.2)",
  borderRadius: "16px",
  color: "#e2e8f0",
  boxShadow: "0 18px 48px rgba(2, 6, 23, 0.35)"
};

const AdminDashboard = () => {
  const location = useLocation();
  const [employees, setEmployees] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const [employeesResponse, activityResponse] = await Promise.allSettled([
          api.get("/employees"),
          api.get("/users/me/activity")
        ]);

        if (employeesResponse.status === "fulfilled") {
          setEmployees(employeesResponse.value.data.employees || []);
        }

        if (activityResponse.status === "fulfilled") {
          setActivities(activityResponse.value.data.activities || []);
        }
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const stats = useMemo(() => {
    const totalEmployees = employees.length;
    const activeEmployees = employees.filter((employee) => employee.employmentStatus === "Active").length;
    const onLeaveEmployees = employees.filter((employee) => employee.employmentStatus === "On Leave").length;
    const managers = employees.filter((employee) => employee.designation === "Manager").length;
    const avgExperience = totalEmployees
      ? (employees.reduce((sum, employee) => sum + (Number(employee.experience) || 0), 0) / totalEmployees).toFixed(1)
      : "0.0";

    return { totalEmployees, activeEmployees, onLeaveEmployees, managers, avgExperience };
  }, [employees]);

  const roleDistribution = useMemo(() => {
    const counts = employees.reduce((accumulator, employee) => {
      const key = employee.designation || "Unassigned";
      accumulator[key] = (accumulator[key] || 0) + 1;
      return accumulator;
    }, {});

    return Object.entries(counts)
      .map(([label, value]) => ({ label, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 6);
  }, [employees]);

  const statusDistribution = useMemo(() => {
    const base = {
      Active: stats.activeEmployees,
      "On Leave": stats.onLeaveEmployees,
      Resigned: employees.filter((employee) => employee.employmentStatus === "Resigned").length,
      Terminated: employees.filter((employee) => employee.employmentStatus === "Terminated").length
    };

    return Object.entries(base)
      .map(([label, value]) => ({ label, value }))
      .filter((entry) => entry.value > 0);
  }, [employees, stats.activeEmployees, stats.onLeaveEmployees]);

  const activityPreview = activities.slice(0, 5);
  const filteredNavigationItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return navigationItems;
    }

    return navigationItems.filter((item) => item.label.toLowerCase().includes(query));
  }, [searchQuery]);

  const filteredResourceCards = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return resourceCards;
    }

    return resourceCards.filter((card) => `${card.title} ${card.description}`.toLowerCase().includes(query));
  }, [searchQuery]);

  const filteredEmployeeCards = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return employeeCards;
    }

    return employeeCards.filter((card) => `${card.title} ${card.description}`.toLowerCase().includes(query));
  }, [searchQuery]);

  const chartRoleData = useMemo(
    () =>
      roleDistribution.map((item) => ({
        name: item.label,
        value: item.value
      })),
    [roleDistribution]
  );

  const chartStatusData = useMemo(
    () =>
      statusDistribution.map((item) => ({
        name: item.label,
        value: item.value
      })),
    [statusDistribution]
  );

  const notificationCount = activities.length;
  const searchResultCount = filteredNavigationItems.length + filteredResourceCards.length + filteredEmployeeCards.length;

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    setNotificationsOpen(false);
  }, [location.pathname]);

  const statCards = [
    { label: "Employees", value: stats.totalEmployees, hint: "Total team members", icon: Users },
    { label: "Active", value: stats.activeEmployees, hint: "Currently active", icon: ShieldCheck },
    { label: "Managers", value: stats.managers, hint: "Leadership roles", icon: BriefcaseBusiness },
    { label: "Avg. Experience", value: `${stats.avgExperience}y`, hint: "Years across team", icon: Clock3 }
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 transform bg-slate-900 shadow-2xl transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:z-20 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex h-full flex-col">
          {/* Logo Section */}
          <div className="border-b border-slate-700/50 px-6 py-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-cyan-400">Admin</p>
                <p className="font-bold text-white">Panel</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-6">
            {filteredNavigationItems.map((item) => {
              const Icon = item.icon;
              const active = location.pathname === item.to || location.pathname.startsWith(`${item.to}/`);

              return (
                <Link
                  key={item.label}
                  to={item.to}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all ${
                    active
                      ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/20"
                      : "text-slate-300 hover:bg-slate-800/50 hover:text-white"
                  }`}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  <span>{item.label}</span>
                  {active && <ChevronRight className="ml-auto h-4 w-4" />}
                </Link>
              );
            })}
          </nav>

          {/* Sidebar Footer */}
          <div className="border-t border-slate-700/50 p-4">
            <div className="rounded-lg bg-gradient-to-br from-slate-800 to-slate-800/50 p-4">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Quick Actions</p>
              <div className="mt-3 flex flex-col gap-2">
                <Link to="/admin/employees" onClick={() => setSidebarOpen(false)} className="rounded-lg bg-cyan-500/20 px-3 py-2 text-xs font-semibold text-cyan-300 hover:bg-cyan-500/30 transition">
                  Employees
                </Link>
                <Link to="/admin/reports" onClick={() => setSidebarOpen(false)} className="rounded-lg bg-blue-500/20 px-3 py-2 text-xs font-semibold text-blue-300 hover:bg-blue-500/30 transition">
                  Reports
                </Link>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <button
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="sticky top-0 z-20 border-b border-slate-700/50 bg-slate-900/95 backdrop-blur-sm shadow-sm">
          <div className="flex items-center justify-between gap-4 px-6 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="inline-flex items-center justify-center rounded-lg border border-slate-700 bg-slate-800 p-2 text-slate-300 hover:bg-slate-700 lg:hidden"
              >
                {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
              <div>
                <h1 className="text-lg font-bold text-white leading-tight">Admin Dashboard</h1>
                <p className="text-xs text-slate-400 mt-0.5">Manage your business operations</p>
              </div>
            </div>

            {/* Header Search & Actions */}
            <div className="flex items-center gap-4">
              <label className="relative hidden md:flex">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="search"
                  placeholder="Search admin..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="rounded-lg border border-slate-700 bg-slate-800 py-2 pl-10 pr-4 text-sm text-white placeholder-slate-400 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
                />
              </label>

              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative inline-flex items-center justify-center rounded-lg border border-slate-700 bg-slate-800 p-2 text-slate-300 hover:bg-slate-700"
              >
                <Bell className="h-5 w-5" />
                {notificationCount > 0 && (
                  <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                    {notificationCount > 9 ? "9+" : notificationCount}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {notificationsOpen && (
                <div className="absolute right-6 top-16 z-40 w-80 rounded-xl border border-slate-700 bg-slate-800 shadow-xl">
                  <div className="border-b border-slate-700 px-4 py-3">
                    <h3 className="font-semibold text-white flex items-center gap-2">
                      <Activity className="h-4 w-4 text-cyan-400" />
                      Notifications
                    </h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto p-3 space-y-2">
                    {activityPreview.length === 0 ? (
                      <p className="text-sm text-slate-400 py-4 text-center">No notifications yet</p>
                    ) : (
                      activityPreview.map((item) => (
                        <div key={item._id} className="rounded-lg bg-slate-700/50 p-3 text-sm hover:bg-slate-700 transition">
                          <p className="text-slate-200">{item.description}</p>
                          <p className="text-xs text-slate-400 mt-1">{new Date(item.createdAt).toLocaleString()}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Welcome Section */}
            <div className="rounded-xl bg-gradient-to-r from-cyan-600/20 to-blue-600/20 border border-cyan-500/30 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">Welcome back!</h2>
                  <p className="text-slate-300 mt-1">Here's what's happening with your business today.</p>
                </div>
                <Sparkles className="h-8 w-8 text-cyan-400 flex-shrink-0" />
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {statCards.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="rounded-xl border border-slate-700 bg-slate-800/50 p-6 hover:bg-slate-800 transition">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-400">{stat.label}</p>
                        <p className="mt-2 text-3xl font-bold text-white">{stat.value}</p>
                        <p className="mt-1 text-xs text-slate-400">{stat.hint}</p>
                      </div>
                      <div className="rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 p-3">
                        <Icon className="h-6 w-6 text-cyan-400" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Charts Section */}
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2 rounded-xl border border-slate-700 bg-slate-800/50 p-6">
                <h3 className="font-semibold text-white flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-cyan-400" />
                  Team Overview
                </h3>
                <div className="mt-6 grid gap-6 md:grid-cols-2">
                  <div>
                    <p className="text-sm font-medium text-slate-400 mb-4">Role Distribution</p>
                    <div className="h-64 rounded-lg bg-slate-900/50 p-4">
                      {chartRoleData.length === 0 ? (
                        <div className="flex h-full items-center justify-center text-slate-500">No data</div>
                      ) : (
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={chartRoleData}>
                            <CartesianGrid stroke="rgba(148, 163, 184, 0.1)" strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="name" tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} />
                            <YAxis allowDecimals={false} tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} width={30} />
                            <Tooltip contentStyle={chartTooltipStyles} />
                            <Bar dataKey="value" fill="#06b6d4" radius={[8, 8, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-400 mb-4">Employment Status</p>
                    <div className="h-64 rounded-lg bg-slate-900/50 p-4">
                      {chartStatusData.length === 0 ? (
                        <div className="flex h-full items-center justify-center text-slate-500">No data</div>
                      ) : (
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={chartStatusData}
                              dataKey="value"
                              nameKey="name"
                              cx="50%"
                              cy="50%"
                              innerRadius={50}
                              outerRadius={80}
                              paddingAngle={2}
                            >
                              {chartStatusData.map((entry, index) => (
                                <Cell key={entry.name} fill={chartColors[index % chartColors.length]} />
                              ))}
                            </Pie>
                            <Tooltip contentStyle={chartTooltipStyles} />
                          </PieChart>
                        </ResponsiveContainer>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-6">
                <h3 className="font-semibold text-white flex items-center gap-2">
                  <Activity className="h-5 w-5 text-cyan-400" />
                  Recent Activity
                </h3>
                <div className="mt-4 space-y-3">
                  {activityPreview.length === 0 ? (
                    <p className="text-sm text-slate-400 py-8 text-center">No recent activity</p>
                  ) : (
                    activityPreview.map((item) => (
                      <div key={item._id} className="rounded-lg bg-slate-700/50 p-3 hover:bg-slate-700 transition">
                        <p className="text-sm font-medium text-slate-200">{item.description}</p>
                        <p className="text-xs text-slate-500 mt-1">{item.type}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-white mb-4">Quick Management</h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {resourceCards.slice(0, 6).map((card) => {
                  const Icon = card.icon;
                  return (
                    <Link
                      key={card.title}
                      to={card.to}
                      className="group rounded-xl border border-slate-700 bg-slate-800/50 p-5 hover:bg-slate-800 hover:border-cyan-500/50 transition"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <Icon className="h-6 w-6 text-cyan-400 group-hover:scale-110 transition" />
                        <ArrowRight className="h-4 w-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition" />
                      </div>
                      <h4 className="font-semibold text-white">{card.title}</h4>
                      <p className="text-sm text-slate-400 mt-1">{card.description}</p>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;

