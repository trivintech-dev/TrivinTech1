import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/api.js";

const DeveloperProfile = () => {
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
            <div className="h-24 w-24 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-3xl font-semibold text-blue-600">{employee.name.charAt(0)}</span>
            </div>
            <div>
              <h1 className="text-3xl font-semibold text-slate-900">{employee.name}</h1>
              <p className="mt-1 text-sm text-slate-600">Software Developer</p>
              <div className="mt-2 flex gap-2">
                <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800">
                  {employee.designation}
                </span>
                <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
                  {employee.employmentStatus}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Info */}
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

        {/* Tech Stack */}
        <section className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Technical Stack</h2>
          <div className="mt-6 space-y-6">
            {employee.programmingLanguages?.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-slate-700">Programming Languages</p>
                <div className="mt-3 flex flex-wrap gap-2">
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

            {employee.frameworks?.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-slate-700">Frameworks & Libraries</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {employee.frameworks.map((fw, idx) => (
                    <span
                      key={idx}
                      className="inline-flex rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-800"
                    >
                      {fw}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {employee.databases?.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-slate-700">Databases</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {employee.databases.map((db, idx) => (
                    <span
                      key={idx}
                      className="inline-flex rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800"
                    >
                      {db}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {employee.cloudPlatforms?.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-slate-700">Cloud Platforms</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {employee.cloudPlatforms.map((cloud, idx) => (
                    <span
                      key={idx}
                      className="inline-flex rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-800"
                    >
                      {cloud}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* GitHub & Portfolio */}
        <section className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">External Links</h2>
          <div className="mt-6 space-y-4">
            {employee.githubProfile && (
              <div className="flex items-center gap-3">
                <span className="font-medium text-slate-700">GitHub:</span>
                <a
                  href={employee.githubProfile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:text-indigo-700"
                >
                  {employee.githubProfile}
                </a>
              </div>
            )}
            {employee.portfolioUrl && (
              <div className="flex items-center gap-3">
                <span className="font-medium text-slate-700">Portfolio:</span>
                <a
                  href={employee.portfolioUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:text-indigo-700"
                >
                  {employee.portfolioUrl}
                </a>
              </div>
            )}
          </div>
        </section>

        {/* Experience & Skills */}
        <section className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Experience & Skills</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div>
              <p className="text-sm text-slate-600">Years of Experience</p>
              <p className="mt-2 text-2xl font-semibold text-indigo-600">{employee.experience || 0}+ years</p>
            </div>
            {employee.skills?.length > 0 && (
              <div>
                <p className="text-sm text-slate-600">Key Skills</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {employee.skills.slice(0, 4).map((skill, idx) => (
                    <span
                      key={idx}
                      className="inline-flex rounded-full bg-indigo-100 px-2 py-1 text-xs font-semibold text-indigo-800"
                    >
                      {skill}
                    </span>
                  ))}
                  {employee.skills.length > 4 && (
                    <span className="inline-flex rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-800">
                      +{employee.skills.length - 4} more
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Employment Details */}
        <section className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Employment Details</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-3">
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
              <p className="text-sm text-slate-600">Department</p>
              <p className="mt-2 font-medium text-slate-900">{employee.department || "N/A"}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DeveloperProfile;
