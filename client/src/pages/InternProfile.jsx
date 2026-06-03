import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/api.js";

const InternProfile = () => {
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
            <div className="h-24 w-24 rounded-full bg-amber-100 flex items-center justify-center">
              <span className="text-3xl font-semibold text-amber-600">{employee.name.charAt(0)}</span>
            </div>
            <div>
              <h1 className="text-3xl font-semibold text-slate-900">{employee.name}</h1>
              <p className="mt-1 text-sm text-slate-600">Intern</p>
              <div className="mt-2 flex gap-2">
                <span className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
                  {employee.designation}
                </span>
                <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
                  {employee.employmentStatus}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Internship Details */}
        <section className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Internship Information</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div>
              <p className="text-sm text-slate-600">Internship Start Date</p>
              <p className="mt-2 font-medium text-slate-900">
                {employee.joiningDate ? new Date(employee.joiningDate).toLocaleDateString() : "N/A"}
              </p>
            </div>
            <div>
              <p className="text-sm text-slate-600">Department</p>
              <p className="mt-2 font-medium text-slate-900">{employee.department || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm text-slate-600">Internship Type</p>
              <p className="mt-2 font-medium text-slate-900">{employee.employmentType || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm text-slate-600">Reporting Manager</p>
              <p className="mt-2 font-medium text-slate-900">{employee.reportingManagerId?.name || "TBD"}</p>
            </div>
          </div>
        </section>

        {/* Education & Learning */}
        <section className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Education & Learning</h2>
          <div className="mt-6 space-y-4">
            {employee.education?.length > 0 ? (
              employee.education.map((edu, idx) => (
                <div key={idx} className="border-l-4 border-amber-500 pl-4">
                  <p className="font-semibold text-slate-900">{edu.degree}</p>
                  <p className="text-sm text-slate-600">{edu.institution}</p>
                  <p className="text-xs text-slate-500">{edu.year}</p>
                </div>
              ))
            ) : (
              <p className="text-slate-600">No education information available</p>
            )}
          </div>
        </section>

        {/* Skills & Interests */}
        <section className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Skills & Interests</h2>
          <div className="mt-6 space-y-6">
            {employee.skills?.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-slate-700 mb-3">Current Skills</p>
                <div className="flex flex-wrap gap-2">
                  {employee.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-800"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {employee.programmingLanguages?.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-slate-700 mb-3">Learning Languages</p>
                <div className="flex flex-wrap gap-2">
                  {employee.programmingLanguages.map((lang, idx) => (
                    <span
                      key={idx}
                      className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            )}
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

        {/* Emergency Contact */}
        {employee.emergencyContact && Object.keys(employee.emergencyContact).some((k) => employee.emergencyContact[k]) && (
          <section className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Emergency Contact</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-3">
              {employee.emergencyContact.name && (
                <div>
                  <p className="text-sm text-slate-600">Name</p>
                  <p className="mt-2 font-medium text-slate-900">{employee.emergencyContact.name}</p>
                </div>
              )}
              {employee.emergencyContact.phone && (
                <div>
                  <p className="text-sm text-slate-600">Phone</p>
                  <p className="mt-2 font-medium text-slate-900">{employee.emergencyContact.phone}</p>
                </div>
              )}
              {employee.emergencyContact.relationship && (
                <div>
                  <p className="text-sm text-slate-600">Relationship</p>
                  <p className="mt-2 font-medium text-slate-900">{employee.emergencyContact.relationship}</p>
                </div>
              )}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default InternProfile;
