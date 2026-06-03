import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api.js";

const AdminEmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDesignation, setFilterDesignation] = useState("");

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await api.get("/employees");
      setEmployees(data.employees || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load employees");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;

    try {
      await api.delete(`/employees/${id}`);
      setEmployees(employees.filter((emp) => emp._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete employee");
    }
  };

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.employeeId?.includes(searchTerm);

    const matchesDesignation = !filterDesignation || emp.designation === filterDesignation;

    return matchesSearch && matchesDesignation;
  });

  return (
    <div className="min-h-screen space-y-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-32 md:pt-40">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-700 bg-slate-800 p-8 shadow-lg">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Employee Management</p>
              <h1 className="mt-2 text-3xl font-semibold text-white">All Employees</h1>
            </div>
            <Link
              to="/admin/employees/create"
              className="inline-flex items-center justify-center rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              + Add Employee
            </Link>
          </div>

          {/* Search & Filter */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <input
              type="text"
              placeholder="Search by name, email, or employee ID"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="rounded-2xl border border-slate-600 bg-slate-700 px-4 py-3 text-sm text-white placeholder-slate-400 focus:border-cyan-500 focus:outline-none"
            />
            <select
              value={filterDesignation}
              onChange={(e) => setFilterDesignation(e.target.value)}
              className="rounded-2xl border border-slate-600 bg-slate-700 px-4 py-3 text-sm text-white focus:border-cyan-500 focus:outline-none"
            >
              <option value="">All Designations</option>
              <option value="Developer">Developer</option>
              <option value="Intern">Intern</option>
              <option value="Manager">Manager</option>
              <option value="UI/UX Designer">UI/UX Designer</option>
              <option value="Technical Support Executive">Tech Support</option>
              <option value="HR">HR</option>
              <option value="Sales">Sales</option>
            </select>
          </div>
        </div>

        {error && <div className="rounded-3xl border border-red-900 bg-red-950 p-8 text-red-300">{error}</div>}

        {loading ? (
          <div className="rounded-3xl border border-slate-700 bg-slate-800 p-8 text-center text-slate-300">
            Loading employees...
          </div>
        ) : filteredEmployees.length === 0 ? (
          <div className="rounded-3xl border border-slate-700 bg-slate-800 p-8 text-center text-slate-300">
            No employees found
          </div>
        ) : (
          <div className="rounded-3xl border border-slate-700 bg-slate-800 shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-700 border-b border-slate-600">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Employee</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Email</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Designation</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Department</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Status</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-white">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {filteredEmployees.map((emp) => (
                    <tr key={emp._id} className="hover:bg-slate-700 transition">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                            <span className="text-sm font-semibold text-indigo-600">{emp.name.charAt(0)}</span>
                          </div>
                          <div>
                            <p className="font-medium text-white">{emp.name}</p>
                            <p className="text-xs text-slate-400">{emp.employeeId}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-300">{emp.email}</td>
                      <td className="px-6 py-4 text-sm text-slate-300">{emp.designation || "N/A"}</td>
                      <td className="px-6 py-4 text-sm text-slate-300">{emp.department || "N/A"}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                            emp.employmentStatus === "Active"
                              ? "bg-green-100 text-green-800"
                              : emp.employmentStatus === "On Leave"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {emp.employmentStatus || "Active"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <Link
                          to={`/admin/employees/${emp._id}`}
                          className="inline-flex items-center rounded-2xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
                        >
                          View
                        </Link>
                        <Link
                          to={`/admin/employees/${emp._id}/edit`}
                          className="inline-flex items-center rounded-2xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(emp._id)}
                          className="inline-flex items-center rounded-2xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 transition hover:bg-red-100"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminEmployeeList;
