import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/api.js";

const HRProfile = () => {
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
            <div className="h-24 w-24 rounded-full bg-red-100 flex items-center justify-center">
              <span className="text-3xl font-semibold text-red-600">{employee.name.charAt(0)}</span>
            </div>
            <div>
              <h1 className="text-3xl font-semibold text-slate-900">{employee.name}</h1>
              <p className="mt-1 text-sm text-slate-600">Human Resources</p>
              <div className="mt-2 flex gap-2">
                <span className="inline-flex rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-800">
                  {employee.designation}
                </span>
                <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
                  {employee.employmentStatus}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* HR Responsibilities */}
        <section className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">HR Responsibilities</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border-l-4 border-red-500 bg-red-50 p-4">
              <p className="font-medium text-slate-900">Recruitment</p>
              <p className="text-sm text-slate-600">Manage hiring processes</p>
            </div>
            <div className="rounded-2xl border-l-4 border-red-500 bg-red-50 p-4">
              <p className="font-medium text-slate-900">Onboarding</p>
              <p className="text-sm text-slate-600">New employee integration</p>
            </div>
            <div className="rounded-2xl border-l-4 border-red-500 bg-red-50 p-4">
              <p className="font-medium text-slate-900">Benefits</p>
              <p className="text-sm text-slate-600">Employee compensation</p>
            </div>
            <div className="rounded-2xl border-l-4 border-red-500 bg-red-50 p-4">
              <p className="font-medium text-slate-900">Performance</p>
              <p className="text-sm text-slate-600">Review & appraisals</p>
            </div>
          </div>
        </section>

        {/* HR Skills */}
        <section className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Core Competencies</h2>
          <div className="mt-6">
            {employee.skills?.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {employee.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="inline-flex rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-800"
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

        {/* Employee Management */}
        <section className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Managed Areas</h2>
          <div className="mt-6 space-y-3">
            <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-3">
              <span className="font-medium text-slate-900">Employee Database</span>
              <span className="text-sm text-slate-600">Full Access</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-3">
              <span className="font-medium text-slate-900">Payroll Management</span>
              <span className="text-sm text-slate-600">Read/Write</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-3">
              <span className="font-medium text-slate-900">Compliance</span>
              <span className="text-sm text-slate-600">Oversight</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-3">
              <span className="font-medium text-slate-900">Training & Development</span>
              <span className="text-sm text-slate-600">Coordinator</span>
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
              <p className="text-sm text-slate-600">Years of Experience</p>
              <p className="mt-2 font-medium text-slate-900">{employee.experience || 0} years</p>
            </div>
            <div>
              <p className="text-sm text-slate-600">Employment Type</p>
              <p className="mt-2 font-medium text-slate-900">{employee.employmentType || "N/A"}</p>
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

export default HRProfile;
