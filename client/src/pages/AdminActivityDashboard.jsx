import { useEffect, useState } from "react";
import api from "../api/api.js";
import { Badge, Card, PageHeader, Select, Spinner, StatCard } from "../components/admin/AdminUI.jsx";

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
      let filtered = actData.activities || actData.activity || [];

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
    <div className="space-y-6">
      <PageHeader title="Activity dashboard" description="Monitor employee activities and engagement" />

        <section className="grid gap-4 md:grid-cols-4">
          <StatCard label="Total activities" value={activityStats.total} icon={undefined} />
          <StatCard label="Logins" value={activityStats.login} tone="green" />
          <StatCard label="Profile updates" value={activityStats.profile_update} tone="violet" />
          <StatCard label="Password changes" value={activityStats.password_change} tone="amber" />
        </section>

        <Card className="p-6">
          <h2 className="text-lg font-semibold text-white">Filters</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <label className="block">
              <span className="text-sm text-slate-400">Date range</span>
              <Select
                value={dateRange}
                onChange={(e) => setDateRange(Number(e.target.value))}
                className="mt-2"
              >
                <option value={1}>Last 24 hours</option>
                <option value={7}>Last 7 days</option>
                <option value={30}>Last 30 days</option>
                <option value={90}>Last 90 days</option>
              </Select>
            </label>
            <label className="block">
              <span className="text-sm text-slate-400">Activity type</span>
              <Select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="mt-2">
                <option value="">All Types</option>
                <option value="login">Login</option>
                <option value="logout">Logout</option>
                <option value="profile_update">Profile Update</option>
                <option value="password_change">Password Change</option>
              </Select>
            </label>
          </div>
        </Card>

        <Card className="overflow-hidden">
          <div className="border-b border-slate-800 p-6">
            <h2 className="text-lg font-semibold text-white">Activity log</h2>
          </div>
          {error && <div className="border-b border-slate-800 bg-red-500/10 px-6 py-4 text-sm text-red-300">{error}</div>}
          {loading ? (
            <div className="flex items-center justify-center gap-3 px-6 py-12 text-slate-400">
              <Spinner /> Loading activities...
            </div>
          ) : activities.length === 0 ? (
            <div className="px-6 py-12 text-center text-sm text-slate-500">No activities found</div>
          ) : (
            <div className="divide-y divide-slate-800">
              {activities.map((activity, idx) => (
                <div key={idx} className="px-6 py-4 transition hover:bg-slate-800/40">
                  <div className="flex items-start gap-4">
                    <span className="text-2xl">{getActivityIcon(activity.type)}</span>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className="font-medium text-slate-200">{activity.description}</p>
                        <span className="text-xs text-slate-500">
                          {new Date(activity.createdAt).toLocaleString()}
                        </span>
                      </div>
                      <div className="mt-1">
                        <Badge tone="cyan">{activity.type}</Badge>
                      </div>
                      {activity.metadata && (
                        <div className="mt-2 grid gap-2 text-xs text-slate-500">
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
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold text-white">Top active employees</h2>
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
                <div key={emp._id} className="flex items-center justify-between rounded-xl border border-slate-700/60 bg-slate-900/30 p-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500/10">
                      <span className="text-sm font-semibold text-cyan-300">{emp.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-medium text-white">{emp.name}</p>
                      <p className="text-xs text-slate-500">{emp.designation}</p>
                    </div>
                  </div>
                  <Badge tone="cyan">{emp.activityCount} activities</Badge>
                </div>
              ))}
          </div>
        </Card>
    </div>
  );
};

export default AdminActivityDashboard;
