import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/api.js";

const SupportProfile = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchEmployee();
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
            <div className="h-24 w-24 rounded-full bg-orange-100 flex items-center justify-center">
              <span className="text-3xl font-semibold text-orange-600">{employee.name.charAt(0)}</span>
            </div>
            <div>
              <h1 className="text-3xl font-semibold text-slate-900">{employee.name}</h1>
              <p className="mt-1 text-sm text-slate-600">Technical Support Executive</p>
              <div className="mt-2 flex gap-2">
                <span className="inline-flex rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-800">
                  {employee.designation}
                </span>
                <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
                  {employee.employmentStatus}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <section className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Performance Metrics</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            <div className="rounded-2xl bg-orange-50 p-4">
              <p className="text-sm text-slate-600">Tickets Resolved</p>
              <p className="mt-2 text-3xl font-semibold text-orange-600">{employee.ticketsResolved || 0}</p>
            </div>
            <div className="rounded-2xl bg-blue-50 p-4">
              <p className="text-sm text-slate-600">Customer Satisfaction</p>
              <p className="mt-2 text-3xl font-semibold text-blue-600">
                {employee.customerSatisfactionScore ? `${employee.customerSatisfactionScore}%` : "N/A"}
              </p>
            </div>
            <div className="rounded-2xl bg-green-50 p-4">
              <p className="text-sm text-slate-600">Status</p>
              <p className="mt-2 text-lg font-semibold text-green-600">{employee.employmentStatus}</p>
            </div>
          </div>
        </section>

        {/* Skills & Expertise */}
        <section className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Technical Skills</h2>
          <div className="mt-6">
            {employee.skills?.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {employee.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="inline-flex rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-800"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-slate-600">No skills listed</p>
            )}
          </div>
        </section>

        {/* Support Specializations */}
        <section className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Support Specializations</h2>
          <div className="mt-6 space-y-3">
            <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-3">
              <span className="font-medium text-slate-900">Email Support</span>
              <span className="text-sm text-slate-600">Primary</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-3">
              <span className="font-medium text-slate-900">Live Chat</span>
              <span className="text-sm text-slate-600">Secondary</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-3">
              <span className="font-medium text-slate-900">Phone Support</span>
              <span className="text-sm text-slate-600">Available</span>
            </div>
          </div>
        </section>

        {/* Employment Details */}
        <section className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Employment Details</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div>
              <p className="text-sm text-slate-600">Department</p>
              <p className="mt-2 font-medium text-slate-900">{employee.department || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm text-slate-600">Joining Date</p>
              <p className="mt-2 font-medium text-slate-900">
                {employee.joiningDate ? new Date(employee.joiningDate).toLocaleDateString() : "N/A"}
              </p>
            </div>
            <div>
              <p className="text-sm text-slate-600">Employment Type</p>
              <p className="mt-2 font-medium text-slate-900">{employee.employmentType || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm text-slate-600">Reporting Manager</p>
              <p className="mt-2 font-medium text-slate-900">{employee.reportingManagerId?.name || "N/A"}</p>
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

export default SupportProfile;
