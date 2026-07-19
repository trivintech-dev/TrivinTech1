import { useEffect, useState } from "react";
import api from "../api/api.js";
import { Badge, Button, Card, PageHeader, Spinner, StatCard } from "../components/admin/AdminUI.jsx";

const AdminReports = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reportType, setReportType] = useState("department");
  const [reportData, setReportData] = useState({});

  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    if (employees.length > 0) {
      generateReport();
    }
  }, [reportType, employees]);

  const fetchEmployees = async () => {
    try {
      const { data } = await api.get("/employees");
      setEmployees(data.employees || []);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load employees");
      setLoading(false);
    }
  };

  const generateReport = () => {
    const report = {};

    if (reportType === "department") {
      employees.forEach((emp) => {
        const dept = emp.department || "Unassigned";
        if (!report[dept]) {
          report[dept] = { total: 0, active: 0, onLeave: 0, resigned: 0, byRole: {} };
        }
        report[dept].total++;
        if (emp.employmentStatus === "Active") report[dept].active++;
        if (emp.employmentStatus === "On Leave") report[dept].onLeave++;
        if (emp.employmentStatus === "Resigned") report[dept].resigned++;

        if (!report[dept].byRole[emp.designation]) {
          report[dept].byRole[emp.designation] = 0;
        }
        report[dept].byRole[emp.designation]++;
      });
    } else if (reportType === "role") {
      employees.forEach((emp) => {
        const role = emp.designation || "Unassigned";
        if (!report[role]) {
          report[role] = { total: 0, active: 0, onLeave: 0, resigned: 0, avgExperience: 0, byDept: {} };
        }
        report[role].total++;
        report[role].avgExperience += emp.experience || 0;
        if (emp.employmentStatus === "Active") report[role].active++;
        if (emp.employmentStatus === "On Leave") report[role].onLeave++;
        if (emp.employmentStatus === "Resigned") report[role].resigned++;

        if (!report[role].byDept[emp.department || "Unassigned"]) {
          report[role].byDept[emp.department || "Unassigned"] = 0;
        }
        report[role].byDept[emp.department || "Unassigned"]++;
      });

      Object.keys(report).forEach((role) => {
        report[role].avgExperience = (report[role].avgExperience / report[role].total).toFixed(1);
      });
    } else if (reportType === "status") {
      employees.forEach((emp) => {
        const status = emp.employmentStatus || "Active";
        if (!report[status]) {
          report[status] = { total: 0, byRole: {}, byDept: {} };
        }
        report[status].total++;

        if (!report[status].byRole[emp.designation]) {
          report[status].byRole[emp.designation] = 0;
        }
        report[status].byRole[emp.designation]++;

        if (!report[status].byDept[emp.department || "Unassigned"]) {
          report[status].byDept[emp.department || "Unassigned"] = 0;
        }
        report[status].byDept[emp.department || "Unassigned"]++;
      });
    }

    setReportData(report);
  };

  const handleExport = () => {
    let csvContent = "data:text/csv;charset=utf-8,";

    if (reportType === "department") {
      csvContent += "Department,Total,Active,On Leave,Resigned\n";
      Object.entries(reportData).forEach(([dept, data]) => {
        csvContent += `${dept},${data.total},${data.active},${data.onLeave},${data.resigned}\n`;
      });
    } else if (reportType === "role") {
      csvContent += "Role,Total,Active,On Leave,Resigned,Avg Experience\n";
      Object.entries(reportData).forEach(([role, data]) => {
        csvContent += `${role},${data.total},${data.active},${data.onLeave},${data.resigned},${data.avgExperience}\n`;
      });
    } else if (reportType === "status") {
      csvContent += "Employment Status,Total\n";
      Object.entries(reportData).forEach(([status, data]) => {
        csvContent += `${status},${data.total}\n`;
      });
    }

    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", `employee-report-${reportType}-${new Date().toISOString().split("T")[0]}.csv`);
    link.click();
  };

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center gap-3 text-slate-400">
        <Spinner className="h-6 w-6" />
        Loading report data...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Employee reports"
        description="Generate and analyze employee statistics"
        actions={
          <Button onClick={handleExport} variant="outline">
            Export CSV
          </Button>
        }
      />

        <Card className="p-8">
          <h2 className="text-lg font-semibold text-white">Select Report Type</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <button
              onClick={() => setReportType("department")}
              className={`rounded-2xl border-2 p-4 transition ${
                reportType === "department"
                  ? "border-cyan-500 bg-cyan-500/20"
                  : "border-slate-600 bg-slate-700 hover:border-slate-500"
              }`}
            >
              <p className="font-semibold text-white">By Department</p>
              <p className="text-sm text-slate-300">Group employees by department</p>
            </button>
            <button
              onClick={() => setReportType("role")}
              className={`rounded-2xl border-2 p-4 transition ${
                reportType === "role" ? "border-cyan-500 bg-cyan-500/20" : "border-slate-600 bg-slate-700 hover:border-slate-500"
              }`}
            >
              <p className="font-semibold text-white">By Designation</p>
              <p className="text-sm text-slate-300">Analyze by job role</p>
            </button>
            <button
              onClick={() => setReportType("status")}
              className={`rounded-2xl border-2 p-4 transition ${
                reportType === "status"
                  ? "border-cyan-500 bg-cyan-500/20"
                  : "border-slate-600 bg-slate-700 hover:border-slate-500"
              }`}
            >
              <p className="font-semibold text-white">By Status</p>
              <p className="text-sm text-slate-300">Employment status breakdown</p>
            </button>
          </div>
        </Card>

        {error && <Card className="border-red-500/30 bg-red-500/10 p-6 text-red-300">{error}</Card>}

        {/* Report Content */}
        {reportType === "department" && (
          <section className="space-y-6">
            {Object.entries(reportData).map(([dept, data]) => (
              <Card key={dept} className="p-8">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-white">{dept}</h3>
                  <span className="rounded-full bg-cyan-500/20 px-3 py-1 text-sm font-semibold text-cyan-400">
                    {data.total} employees
                  </span>
                </div>

                <div className="mt-6 grid gap-6 sm:grid-cols-4">
                  <div className="rounded-2xl bg-blue-500/10 border border-blue-500/30 p-4">
                    <p className="text-sm text-slate-400">Total</p>
                    <p className="mt-2 text-2xl font-semibold text-blue-400">{data.total}</p>
                  </div>
                  <div className="rounded-2xl bg-green-500/10 border border-green-500/30 p-4">
                    <p className="text-sm text-slate-400">Active</p>
                    <p className="mt-2 text-2xl font-semibold text-green-400">{data.active}</p>
                  </div>
                  <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/30 p-4">
                    <p className="text-sm text-slate-400">On Leave</p>
                    <p className="mt-2 text-2xl font-semibold text-yellow-400">{data.onLeave}</p>
                  </div>
                  <div className="rounded-2xl bg-red-500/10 border border-red-500/30 p-4">
                    <p className="text-sm text-slate-400">Resigned</p>
                    <p className="mt-2 text-2xl font-semibold text-red-400">{data.resigned}</p>
                  </div>
                </div>

                {Object.keys(data.byRole).length > 0 && (
                  <div className="mt-6">
                    <p className="font-semibold text-white">By Role:</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {Object.entries(data.byRole).map(([role, count]) => (
                        <span
                          key={role}
                          className="inline-flex rounded-full bg-slate-700 px-3 py-1 text-sm font-medium text-slate-300"
                        >
                          {role}: {count}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </section>
        )}

        {reportType === "role" && (
          <section className="space-y-6">
            {Object.entries(reportData).map(([role, data]) => (
              <Card key={role} className="p-8">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-white">{role}</h3>
                  <Badge tone="violet">{data.total} employees</Badge>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-4">
                  <div className="rounded-2xl border border-blue-500/30 bg-blue-500/10 p-4">
                    <p className="text-sm text-slate-400">Total</p>
                    <p className="mt-2 text-2xl font-semibold text-blue-400">{data.total}</p>
                  </div>
                  <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4">
                    <p className="text-sm text-slate-400">Active</p>
                    <p className="mt-2 text-2xl font-semibold text-emerald-400">{data.active}</p>
                  </div>
                  <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4">
                    <p className="text-sm text-slate-400">Avg experience</p>
                    <p className="mt-2 text-2xl font-semibold text-amber-400">{data.avgExperience}y</p>
                  </div>
                  <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4">
                    <p className="text-sm text-slate-400">Resigned</p>
                    <p className="mt-2 text-2xl font-semibold text-red-400">{data.resigned}</p>
                  </div>
                </div>

                {Object.keys(data.byDept).length > 0 && (
                  <div className="mt-6">
                    <p className="font-semibold text-white">By Department:</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {Object.entries(data.byDept).map(([dept, count]) => (
                        <span
                          key={dept}
                          className="inline-flex rounded-full bg-slate-700 px-3 py-1 text-sm font-medium text-slate-300"
                        >
                          {dept}: {count}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </section>
        )}

        {reportType === "status" && (
          <section className="grid gap-6 sm:grid-cols-3">
              {Object.entries(reportData).map(([status, data]) => (
                <Card key={status} className="p-6">
                  <p className="font-semibold text-white">{status}</p>
                  <p className="mt-3 text-3xl font-semibold text-cyan-400">{data.total}</p>

                  {Object.keys(data.byRole).length > 0 && (
                    <div className="mt-4 space-y-2">
                      <p className="text-xs font-semibold uppercase text-slate-500">By role</p>
                      {Object.entries(data.byRole).map(([role, count]) => (
                        <div key={role} className="flex justify-between text-xs">
                          <span className="text-slate-400">{role}</span>
                          <span className="font-semibold text-slate-200">{count}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </Card>
              ))}
          </section>
        )}

        <Card className="p-8">
          <h2 className="text-lg font-semibold text-white">Overall summary</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-4">
            <StatCard label="Total employees" value={employees.length} />
            <StatCard
              label="Active"
              value={employees.filter((e) => e.employmentStatus === "Active").length}
              tone="green"
            />
            <StatCard
              label="On leave"
              value={employees.filter((e) => e.employmentStatus === "On Leave").length}
              tone="amber"
            />
            <StatCard
              label="Resigned"
              value={
                employees.filter((e) => e.employmentStatus === "Resigned" || e.employmentStatus === "Terminated")
                  .length
              }
              tone="violet"
            />
          </div>
        </Card>
    </div>
  );
};

export default AdminReports;
