import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/api.js";

const DesignerProfile = () => {
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
            <div className="h-24 w-24 rounded-full bg-pink-100 flex items-center justify-center">
              <span className="text-3xl font-semibold text-pink-600">{employee.name.charAt(0)}</span>
            </div>
            <div>
              <h1 className="text-3xl font-semibold text-slate-900">{employee.name}</h1>
              <p className="mt-1 text-sm text-slate-600">UI/UX Designer</p>
              <div className="mt-2 flex gap-2">
                <span className="inline-flex rounded-full bg-pink-100 px-3 py-1 text-xs font-semibold text-pink-800">
                  {employee.designation}
                </span>
                <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
                  {employee.employmentStatus}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Design Skills */}
        <section className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Design Skills & Expertise</h2>
          <div className="mt-6 space-y-6">
            {employee.designSkills?.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-slate-700 mb-3">Design Disciplines</p>
                <div className="flex flex-wrap gap-2">
                  {employee.designSkills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="inline-flex rounded-full bg-pink-100 px-3 py-1 text-sm font-medium text-pink-800"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {employee.skills?.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-slate-700 mb-3">Tools & Software</p>
                <div className="flex flex-wrap gap-2">
                  {employee.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="inline-flex rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-800"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Portfolio */}
        <section className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Portfolio & Work</h2>
          <div className="mt-6 space-y-4">
            {employee.portfolioUrl && (
              <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
                <div>
                  <p className="font-medium text-slate-900">Portfolio Website</p>
                  <p className="text-sm text-slate-600">View all design projects</p>
                </div>
                <a
                  href={employee.portfolioUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl bg-pink-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-pink-700"
                >
                  Visit
                </a>
              </div>
            )}
            {employee.githubProfile && (
              <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
                <div>
                  <p className="font-medium text-slate-900">Design Repository</p>
                  <p className="text-sm text-slate-600">GitHub design files</p>
                </div>
                <a
                  href={employee.githubProfile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl bg-slate-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-900"
                >
                  Visit
                </a>
              </div>
            )}
          </div>
        </section>

        {/* Experience */}
        <section className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Experience & Background</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div>
              <p className="text-sm text-slate-600">Years of Experience</p>
              <p className="mt-2 text-2xl font-semibold text-pink-600">{employee.experience || 0}+ years</p>
            </div>
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

export default DesignerProfile;
