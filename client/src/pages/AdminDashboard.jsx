import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Activity,
  ArrowRight,
  BarChart3,
  BriefcaseBusiness,
  FileText,
  Globe,
  ImageIcon,
  Layers3,
  MessageSquareMore,
  Settings,
  Star,
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
import { PAGE_LIST } from "../admin/pageSchemas.js";
import {
  Badge,
  Card,
  PageHeader,
  SectionCard,
  Spinner,
  StatCard
} from "../components/admin/AdminUI.jsx";

const chartColors = ["#22d3ee", "#38bdf8", "#818cf8", "#34d399", "#fbbf24", "#fb7185"];

const chartTooltipStyles = {
  backgroundColor: "#08111f",
  border: "1px solid rgba(148, 163, 184, 0.2)",
  borderRadius: "16px",
  color: "#e2e8f0",
  boxShadow: "0 18px 48px rgba(2, 6, 23, 0.35)"
};

const extractList = (data, keys) => {
  if (!data || typeof data !== "object") return [];
  for (const key of keys) {
    if (Array.isArray(data[key])) return data[key];
  }
  return [];
};

const countFromResponse = (result, keys) => {
  if (result.status !== "fulfilled") return 0;
  return extractList(result.value?.data, keys).length;
};

const quickModules = [
  { title: "Services", description: "Manage service offerings", to: "/admin/services", icon: Layers3 },
  { title: "Jobs", description: "Open roles and requirements", to: "/admin/jobs", icon: BriefcaseBusiness },
  { title: "Portfolio", description: "Showcase projects", to: "/admin/portfolio", icon: ImageIcon },
  { title: "Queries", description: "User support requests", to: "/admin/queries", icon: MessageSquareMore },
  { title: "Settings", description: "Brand and contact info", to: "/admin/settings", icon: Settings },
  { title: "Employees", description: "Team profiles and roles", to: "/admin/employees", icon: Users }
];

const AdminDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [activities, setActivities] = useState([]);
  const [counts, setCounts] = useState({
    services: 0,
    jobs: 0,
    testimonials: 0,
    portfolio: 0,
    openQueries: 0,
    contacts: 0,
    pricingPlans: 0,
    internships: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const results = await Promise.allSettled([
        api.get("/employees"),
        api.get("/services", { params: { all: true } }),
        api.get("/jobs", { params: { all: true } }),
        api.get("/testimonials/admin/all"),
        api.get("/portfolio", { params: { all: true } }),
        api.get("/queries"),
        api.get("/contacts"),
        api.get("/users/me/activity"),
        api.get("/pricing-plans", { params: { all: true } }),
        api.get("/internships", { params: { all: true } })
      ]);

      const [
        employeesRes,
        servicesRes,
        jobsRes,
        testimonialsRes,
        portfolioRes,
        queriesRes,
        contactsRes,
        activityRes,
        pricingRes,
        internshipsRes
      ] = results;

      if (employeesRes.status === "fulfilled") {
        setEmployees(extractList(employeesRes.value.data, ["employees"]));
      }

      if (activityRes.status === "fulfilled") {
        const activityData = activityRes.value.data || {};
        setActivities(extractList(activityData, ["activities", "activity"]));
      }

      const queries = queriesRes.status === "fulfilled" ? extractList(queriesRes.value.data, ["queries"]) : [];
      const openQueries = queries.filter((q) => (q.status || "open") === "open").length;

      setCounts({
        services: countFromResponse(servicesRes, ["services"]),
        jobs: countFromResponse(jobsRes, ["jobs"]),
        testimonials: countFromResponse(testimonialsRes, ["testimonials"]),
        portfolio: countFromResponse(portfolioRes, ["portfolios", "portfolio"]),
        openQueries,
        contacts: contactsRes.status === "fulfilled" ? countFromResponse(contactsRes, ["contactRequests", "contacts"]) : 0,
        pricingPlans: countFromResponse(pricingRes, ["pricingPlans", "plans"]),
        internships: countFromResponse(internshipsRes, ["internships"])
      });

      setLoading(false);
    };

    load();
  }, []);

  const stats = useMemo(() => {
    const activeEmployees = employees.filter((employee) => employee.employmentStatus === "Active").length;
    const onLeaveEmployees = employees.filter((employee) => employee.employmentStatus === "On Leave").length;
    return { totalEmployees: employees.length, activeEmployees, onLeaveEmployees };
  }, [employees]);

  const roleDistribution = useMemo(() => {
    const countsByRole = employees.reduce((accumulator, employee) => {
      const key = employee.designation || "Unassigned";
      accumulator[key] = (accumulator[key] || 0) + 1;
      return accumulator;
    }, {});

    return Object.entries(countsByRole)
      .map(([label, value]) => ({ name: label, value }))
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
      .map(([name, value]) => ({ name, value }))
      .filter((entry) => entry.value > 0);
  }, [employees, stats.activeEmployees, stats.onLeaveEmployees]);

  const activityPreview = activities.slice(0, 8);

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center gap-3 text-slate-400">
        <Spinner className="h-6 w-6" />
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <PageHeader title="Dashboard" description="Overview of your website content and team" />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
        <StatCard label="Employees" value={stats.totalEmployees} hint="Team members" icon={Users} />
        <StatCard label="Services" value={counts.services} hint="Content library" icon={Layers3} tone="green" />
        <StatCard label="Jobs" value={counts.jobs} hint="Listings" icon={BriefcaseBusiness} tone="violet" />
        <StatCard label="Portfolio" value={counts.portfolio} hint="Projects" icon={ImageIcon} tone="amber" />
        <StatCard label="Testimonials" value={counts.testimonials} hint="Reviews" icon={Star} />
        <StatCard
          label="Open Queries"
          value={counts.openQueries}
          hint="Awaiting response"
          icon={MessageSquareMore}
          tone="amber"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <SectionCard
          className="lg:col-span-2"
          title="Team analytics"
          description="Role distribution and employment status from employee records"
        >
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <p className="mb-4 text-sm font-medium text-slate-400">Role distribution</p>
              <div className="h-64 rounded-xl border border-slate-700/60 bg-slate-900/40 p-3">
                {roleDistribution.length === 0 ? (
                  <div className="flex h-full items-center justify-center text-sm text-slate-500">No employee data</div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={roleDistribution}>
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
              <p className="mb-4 text-sm font-medium text-slate-400">Employment status</p>
              <div className="h-64 rounded-xl border border-slate-700/60 bg-slate-900/40 p-3">
                {statusDistribution.length === 0 ? (
                  <div className="flex h-full items-center justify-center text-sm text-slate-500">No employee data</div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={statusDistribution}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={2}
                      >
                        {statusDistribution.map((entry, index) => (
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
        </SectionCard>

        <SectionCard title="Recent activity" description="Latest actions from your account">
          <div className="space-y-3">
            {activityPreview.length === 0 ? (
              <p className="py-8 text-center text-sm text-slate-500">No recent activity</p>
            ) : (
              activityPreview.map((item) => (
                <div
                  key={item._id || `${item.type}-${item.createdAt}`}
                  className="rounded-xl border border-slate-700/60 bg-slate-900/40 p-3"
                >
                  <p className="text-sm font-medium text-slate-200">{item.description}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    {item.type && <Badge tone="cyan">{item.type}</Badge>}
                    {item.createdAt && (
                      <span className="text-xs text-slate-500">{new Date(item.createdAt).toLocaleString()}</span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
          <Link
            to="/admin/activity"
            className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-cyan-400 hover:text-cyan-300"
          >
            View all activity <ArrowRight className="h-4 w-4" />
          </Link>
        </SectionCard>
      </div>

      <SectionCard title="Website pages" description="Edit public page content">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {PAGE_LIST.map((page) => (
            <Link
              key={page.slug}
              to={`/admin/pages/${page.slug}`}
              className="group rounded-xl border border-slate-700/70 bg-slate-900/30 p-4 transition hover:border-cyan-500/40 hover:bg-slate-800/60"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-cyan-400" />
                  <span className="font-semibold text-white">{page.label}</span>
                </div>
                <ArrowRight className="h-4 w-4 text-slate-600 transition group-hover:text-cyan-400" />
              </div>
              <p className="mt-2 line-clamp-2 text-xs text-slate-500">{page.description}</p>
            </Link>
          ))}
        </div>
      </SectionCard>

      <div>
        <h2 className="mb-4 flex items-center gap-2 text-base font-semibold text-white">
          <BarChart3 className="h-5 w-5 text-cyan-400" />
          Quick actions
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {quickModules.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.to} to={item.to} className="group block">
                <Card className="h-full p-5 transition hover:border-cyan-500/40 hover:bg-slate-800/70">
                  <div className="flex items-start justify-between">
                    <Icon className="h-6 w-6 text-cyan-400" />
                    <ArrowRight className="h-4 w-4 text-slate-600 transition group-hover:translate-x-0.5 group-hover:text-cyan-400" />
                  </div>
                  <h3 className="mt-3 font-semibold text-white">{item.title}</h3>
                  <p className="mt-1 text-sm text-slate-400">{item.description}</p>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      {(counts.contacts > 0 || counts.pricingPlans > 0 || counts.internships > 0) && (
        <Card className="flex flex-wrap items-center gap-4 p-4 text-sm text-slate-400">
          <Activity className="h-4 w-4 text-cyan-400" />
          <span>
            Also tracking {counts.contacts} contact request{counts.contacts === 1 ? "" : "s"},{" "}
            {counts.pricingPlans} pricing plan{counts.pricingPlans === 1 ? "" : "s"}, and {counts.internships}{" "}
            internship listing{counts.internships === 1 ? "" : "s"}.
          </span>
          <Link to="/admin/contacts" className="font-semibold text-cyan-400 hover:text-cyan-300">
            Contact requests
          </Link>
          <Link to="/admin/reports" className="inline-flex items-center gap-1 font-semibold text-cyan-400 hover:text-cyan-300">
            <FileText className="h-3.5 w-3.5" /> Reports
          </Link>
        </Card>
      )}
    </div>
  );
};

export default AdminDashboard;
