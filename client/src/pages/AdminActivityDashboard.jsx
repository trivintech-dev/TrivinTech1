import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api.js";

const AdminActivityDashboard = () => {
  const [activities, setActivities] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterEmployee, setFilterEmployee] = useState("");
  const [dateRange, setDateRange] = useState(7); // days

  useEffect(() => {
    fetchData();
  }, [filterType, filterEmployee, dateRange]);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch employees for filtering
      const { data: empData } = await api.get("/employees");
      setEmployees(empData.employees || []);

      // Fetch activities - using user endpoint for now
      const { data: actData } = await api.get("/users/me/activity");
      let filtered = actData.activity || [];

      if (filterType) {
        filtered = filtered.filter((a) => a.type === filterType);
      }

      if (filterEmployee) {
        filtered = filtered.filter((a) => a.userId === filterEmployee);
      }

      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - dateRange);
      filtered = filtered.filter((a) => new Date(a.createdAt) >= cutoffDate);

      setActivities(filtered);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load activities");
    } finally {
      setLoading(false);
    }
  };

  const activityStats = {
    total: activities.length,
    login: activities.filter((a) => a.type === "login").length,
    profile_update: activities.filter((a) => a.type === "profile_update").length,
    password_change: activities.filter((a) => a.type === "password_change").length
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case "login":
        return "🔑";
      case "profile_update":
        return "✏️";
      case "password_change":
        return "🔒";
      case "logout":
        return "🚪";
      default:
        return "📋";
    }
  };

  return (
    <div className="min-h-screen space-y-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-32 md:pt-40">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="rounded-3xl border border-slate-700 bg-slate-800 p-8 shadow-lg">
          <Link to="/admin" className="text-sm text-cyan-400 hover:text-cyan-300">
            ← Back to Dashboard
          </Link>
          <div className="mt-4">
            <h1 className="text-3xl font-semibold text-white">Activity Dashboard</h1>
            <p className="mt-2 text-sm text-slate-300">Monitor employee activities and engagement</p>
          </div>
        </div>

        {/* Stats */}
        <section className="grid gap-6 md:grid-cols-4">
          <div className="rounded-3xl border border-slate-700 bg-slate-800 p-6 shadow-lg">
            <p className="text-sm text-slate-400">Total Activities</p>
            <p className="mt-2 text-3xl font-semibold text-cyan-400">{activityStats.total}</p>
          </div>
          <div className="rounded-3xl border border-slate-700 bg-slate-800 p-6 shadow-lg">
            <p className="text-sm text-slate-400">Logins</p>
            <p className="mt-2 text-3xl font-semibold text-blue-400">{activityStats.login}</p>
          </div>
          <div className="rounded-3xl border border-slate-700 bg-slate-800 p-6 shadow-lg">
            <p className="text-sm text-slate-400">Profile Updates</p>
            <p className="mt-2 text-3xl font-semibold text-purple-400">{activityStats.profile_update}</p>
          </div>
          <div className="rounded-3xl border border-slate-700 bg-slate-800 p-6 shadow-lg">
            <p className="text-sm text-slate-400">Password Changes</p>
            <p className="mt-2 text-3xl font-semibold text-orange-600">{activityStats.password_change}</p>
          </div>
        </section>

        {/* Filters */}
        <section className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Filters</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <label className="block">
              <span className="text-sm text-slate-600">Date Range</span>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(Number(e.target.value))}
                className="mt-2 w-full rounded-2xl border border-gray-200 bg-slate-50 px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none"
              >
                <option value={1}>Last 24 hours</option>
                <option value={7}>Last 7 days</option>
                <option value={30}>Last 30 days</option>
                <option value={90}>Last 90 days</option>
              </select>
            </label>
            <label className="block">
              <span className="text-sm text-slate-600">Activity Type</span>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-gray-200 bg-slate-50 px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none"
              >
                <option value="">All Types</option>
                <option value="login">Login</option>
                <option value="logout">Logout</option>
                <option value="profile_update">Profile Update</option>
                <option value="password_change">Password Change</option>
              </select>
            </label>
          </div>
        </section>

        {/* Activity Log */}
        <section className="rounded-3xl border border-gray-100 bg-white shadow-sm overflow-hidden">
          <div className="p-8">
            <h2 className="text-lg font-semibold text-slate-900">Activity Log</h2>
          </div>
          {error && <div className="border-t border-gray-100 bg-red-50 px-8 py-4 text-red-700">{error}</div>}
          {loading ? (
            <div className="border-t border-gray-100 px-8 py-4 text-center text-slate-700">Loading activities...</div>
          ) : activities.length === 0 ? (
            <div className="border-t border-gray-100 px-8 py-4 text-center text-slate-700">No activities found</div>
          ) : (
            <div className="divide-y divide-gray-100 border-t border-gray-100">
              {activities.map((activity, idx) => (
                <div key={idx} className="px-8 py-4 hover:bg-slate-50 transition">
                  <div className="flex items-start gap-4">
                    <span className="text-2xl">{getActivityIcon(activity.type)}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-slate-900">{activity.description}</p>
                        <span className="text-xs text-slate-500">
                          {new Date(activity.createdAt).toLocaleString()}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-slate-600">Type: {activity.type}</p>
                      {activity.metadata && (
                        <div className="mt-2 grid gap-2 text-xs text-slate-600">
                          {activity.metadata.ip && <p>IP: {activity.metadata.ip}</p>}
                          {activity.metadata.userAgent && <p>Device: {activity.metadata.userAgent}</p>}
                          {activity.metadata.fields && activity.metadata.fields.length > 0 && (
                            <p>Updated Fields: {activity.metadata.fields.join(", ")}</p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Employee Engagement Summary */}
        <section className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Top Active Employees</h2>
          <div className="mt-6 space-y-3">
            {employees
              .map((emp) => ({
                ...emp,
                activityCount: activities.filter((a) => a.userId === emp._id).length
              }))
              .filter((e) => e.activityCount > 0)
              .sort((a, b) => b.activityCount - a.activityCount)
              .slice(0, 5)
              .map((emp) => (
                <div key={emp._id} className="flex items-center justify-between rounded-2xl bg-slate-50 p-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                      <span className="text-sm font-semibold text-indigo-600">{emp.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">{emp.name}</p>
                      <p className="text-xs text-slate-600">{emp.designation}</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-semibold text-indigo-800">
                    {emp.activityCount} activities
                  </span>
                </div>
              ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminActivityDashboard;
