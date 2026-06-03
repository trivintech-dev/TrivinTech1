import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/api.js";

const ManagerProfile = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchEmployee();
    fetchTeam();
  }, [id]);

  const fetchEmployee = async () => {
    try {
      const { data } = await api.get(`/employees/${id}`);
      setEmployee(data.employee);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const fetchTeam = async () => {
    try {
      const { data } = await api.get("/employees");
      const team = data.employees.filter((emp) => emp.reportingManagerId === id);
      setTeamMembers(team);
    } catch (err) {
      console.error("Failed to load team");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white pt-40">
        <div className="text-slate-700">Loading profile...</div>
      </div>
    );
  }

  if (error || !employee) {
    return (
      <div className="min-h-screen space-y-6 bg-white pt-40">
        <div className="mx-auto max-w-6xl px-4">
          <div className="rounded-3xl border border-red-100 bg-red-50 p-8 text-red-700">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen space-y-6 bg-white pt-40 md:pt-48">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
          <Link to="/admin/employees" className="text-sm text-indigo-600 hover:text-indigo-700">
            ← Back to Employees
          </Link>
          <div className="mt-4 flex items-end gap-4">
            <div className="h-24 w-24 rounded-full bg-purple-100 flex items-center justify-center">
              <span className="text-3xl font-semibold text-purple-600">{employee.name.charAt(0)}</span>
            </div>
            <div>
              <h1 className="text-3xl font-semibold text-slate-900">{employee.name}</h1>
              <p className="mt-1 text-sm text-slate-600">Manager</p>
              <div className="mt-2 flex gap-2">
                <span className="inline-flex rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-800">
                  {employee.designation}
                </span>
                <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
                  {employee.employmentStatus}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Team Overview */}
        <section className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-900">Team Overview</h2>
            <span className="inline-flex rounded-full bg-purple-100 px-3 py-1 text-sm font-semibold text-purple-800">
              {teamMembers.length} member{teamMembers.length !== 1 ? "s" : ""}
            </span>
          </div>
          <div className="mt-6">
            {teamMembers.length > 0 ? (
              <div className="space-y-3">
                {teamMembers.map((member) => (
                  <div key={member._id} className="flex items-center justify-between border-l-4 border-purple-500 pl-4 py-2">
                    <div>
                      <p className="font-medium text-slate-900">{member.name}</p>
                      <p className="text-sm text-slate-600">{member.designation}</p>
                    </div>
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                        member.employmentStatus === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {member.employmentStatus}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-600">No team members assigned yet</p>
            )}
          </div>
        </section>

        {/* Management Metrics */}
        <section className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Management Metrics</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            <div className="rounded-2xl bg-purple-50 p-4">
              <p className="text-sm text-slate-600">Total Direct Reports</p>
              <p className="mt-2 text-3xl font-semibold text-purple-600">{teamMembers.length}</p>
            </div>
            <div className="rounded-2xl bg-green-50 p-4">
              <p className="text-sm text-slate-600">Active Team Members</p>
              <p className="mt-2 text-3xl font-semibold text-green-600">
                {teamMembers.filter((m) => m.employmentStatus === "Active").length}
              </p>
            </div>
            <div className="rounded-2xl bg-blue-50 p-4">
              <p className="text-sm text-slate-600">Experience</p>
              <p className="mt-2 text-3xl font-semibold text-blue-600">{employee.experience || 0}+ years</p>
            </div>
          </div>
        </section>

        {/* Professional Information */}
        <section className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Professional Information</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div>
              <p className="text-sm text-slate-600">Department</p>
              <p className="mt-2 font-medium text-slate-900">{employee.department || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm text-slate-600">Employment Type</p>
              <p className="mt-2 font-medium text-slate-900">{employee.employmentType || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm text-slate-600">Joining Date</p>
              <p className="mt-2 font-medium text-slate-900">
                {employee.joiningDate ? new Date(employee.joiningDate).toLocaleDateString() : "N/A"}
              </p>
            </div>
            <div>
              <p className="text-sm text-slate-600">Years of Experience</p>
              <p className="mt-2 font-medium text-slate-900">{employee.experience || 0} years</p>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Contact Information</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div>
              <p className="text-sm text-slate-600">Email</p>
              <a href={`mailto:${employee.email}`} className="mt-2 text-indigo-600 hover:text-indigo-700">
                {employee.email}
              </a>
            </div>
            <div>
              <p className="text-sm text-slate-600">Phone</p>
              <p className="mt-2 font-medium text-slate-900">{employee.phone || "N/A"}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ManagerProfile;
