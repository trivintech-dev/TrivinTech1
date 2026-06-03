import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api.js";

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
      <div className="min-h-screen flex items-center justify-center bg-white pt-40">
        <div className="text-slate-700">Loading report data...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen space-y-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-32 md:pt-40">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="rounded-3xl border border-slate-700 bg-slate-800 p-8 shadow-lg">
          <Link to="/admin" className="text-sm text-cyan-400 hover:text-cyan-300">
            ← Back to Dashboard
          </Link>
          <div className="mt-4 flex items-end justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-white">Employee Reports</h1>
              <p className="mt-2 text-sm text-slate-300">Generate and analyze employee statistics</p>
            </div>
            <button
              onClick={handleExport}
              className="rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              📥 Export as CSV
            </button>
          </div>
        </div>

        {/* Report Type Selector */}
        <section className="rounded-3xl border border-slate-700 bg-slate-800 p-8 shadow-lg">
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
        </section>

        {error && <div className="rounded-3xl border border-red-900 bg-red-950 p-8 text-red-300">{error}</div>}

        {/* Report Content */}
        {reportType === "department" && (
          <section className="space-y-6">
            {Object.entries(reportData).map(([dept, data]) => (
              <div key={dept} className="rounded-3xl border border-slate-700 bg-slate-800 p-8 shadow-lg">
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
              </div>
            ))}
          </section>
        )}

        {reportType === "role" && (
          <section className="space-y-6">
            {Object.entries(reportData).map(([role, data]) => (
              <div key={role} className="rounded-3xl border border-slate-700 bg-slate-800 p-8 shadow-lg">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-white">{role}</h3>
                  <span className="rounded-full bg-purple-500/20 px-3 py-1 text-sm font-semibold text-purple-400">
                    {data.total} employees
                  </span>
                </div>

                <div className="mt-6 grid gap-6 sm:grid-cols-4">
                  <div className="rounded-2xl bg-blue-50 p-4">
                    <p className="text-sm text-slate-600">Total</p>
                    <p className="mt-2 text-2xl font-semibold text-blue-600">{data.total}</p>
                  </div>
                  <div className="rounded-2xl bg-green-50 p-4">
                    <p className="text-sm text-slate-600">Active</p>
                    <p className="mt-2 text-2xl font-semibold text-green-600">{data.active}</p>
                  </div>
                  <div className="rounded-2xl bg-yellow-50 p-4">
                    <p className="text-sm text-slate-600">Avg Experience</p>
                    <p className="mt-2 text-2xl font-semibold text-yellow-600">{data.avgExperience}y</p>
                  </div>
                  <div className="rounded-2xl bg-red-50 p-4">
                    <p className="text-sm text-slate-600">Resigned</p>
                    <p className="mt-2 text-2xl font-semibold text-red-600">{data.resigned}</p>
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
              </div>
            ))}
          </section>
        )}

        {reportType === "status" && (
          <section className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-3">
              {Object.entries(reportData).map(([status, data]) => (
                <div key={status} className="rounded-3xl border border-slate-700 bg-slate-800 p-6 shadow-lg">
                  <p className="font-semibold text-white">{status}</p>
                  <p className="mt-3 text-3xl font-semibold text-cyan-400">{data.total}</p>

                  {Object.keys(data.byRole).length > 0 && (
                    <div className="mt-4 space-y-2">
                      <p className="text-xs font-semibold text-slate-600 uppercase">By Role</p>
                      {Object.entries(data.byRole).map(([role, count]) => (
                        <div key={role} className="flex justify-between text-xs">
                          <span className="text-slate-600">{role}</span>
                          <span className="font-semibold text-slate-900">{count}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Summary Stats */}
        <section className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Overall Summary</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-4">
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-sm text-slate-600">Total Employees</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">{employees.length}</p>
            </div>
            <div className="rounded-2xl bg-green-50 p-4">
              <p className="text-sm text-slate-600">Active</p>
              <p className="mt-2 text-2xl font-semibold text-green-600">
                {employees.filter((e) => e.employmentStatus === "Active").length}
              </p>
            </div>
            <div className="rounded-2xl bg-yellow-50 p-4">
              <p className="text-sm text-slate-600">On Leave</p>
              <p className="mt-2 text-2xl font-semibold text-yellow-600">
                {employees.filter((e) => e.employmentStatus === "On Leave").length}
              </p>
            </div>
            <div className="rounded-2xl bg-red-50 p-4">
              <p className="text-sm text-slate-600">Resigned</p>
              <p className="mt-2 text-2xl font-semibold text-red-600">
                {employees.filter((e) => e.employmentStatus === "Resigned" || e.employmentStatus === "Terminated").length}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminReports;
