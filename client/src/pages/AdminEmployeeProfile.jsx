import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/api.js";

const AdminEmployeeProfile = () => {
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
      setError(err.response?.data?.message || "Failed to load employee");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-32">
        <div className="text-slate-300">Loading employee profile...</div>
      </div>
    );
  }

  if (error || !employee) {
    return (
      <div className="min-h-screen space-y-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-32">
        <div className="mx-auto w-full max-w-6xl px-4">
          <div className="rounded-3xl border border-red-900 bg-red-950 p-8 text-red-300">{error}</div>
          <Link to="/admin/employees" className="mt-4 inline-block text-cyan-400 hover:text-cyan-300">
            ← Back to Employees
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen space-y-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-32 md:pt-40">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="rounded-3xl border border-slate-700 bg-slate-800 p-8 shadow-lg">
          <Link to="/admin/employees" className="text-sm text-cyan-400 hover:text-cyan-300">
            ← Back to Employees
          </Link>
          <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-end gap-4">
              <div className="h-24 w-24 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center">
                <span className="text-3xl font-semibold text-cyan-400">{employee.name.charAt(0)}</span>
              </div>
              <div>
                <h1 className="text-3xl font-semibold text-white">{employee.name}</h1>
                <p className="mt-1 text-sm text-slate-400">{employee.designation}</p>
              </div>
            </div>
            <Link
              to={`/admin/employees/${id}/edit`}
              className="rounded-2xl bg-cyan-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyan-700"
            >
              Edit Employee
            </Link>
          </div>
        </div>

        {/* Basic Info */}
        <section className="rounded-3xl border border-slate-700 bg-slate-800 p-8 shadow-lg">
          <h2 className="text-xl font-semibold text-white">Basic Information</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div>
              <p className="text-sm text-slate-400">Email</p>
              <p className="mt-2 font-medium text-slate-200">{employee.email}</p>
            </div>
            <div>
              <p className="text-sm text-slate-400">Phone</p>
              <p className="mt-2 font-medium text-slate-200">{employee.phone || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm text-slate-400">Employee ID</p>
              <p className="mt-2 font-medium text-slate-200">{employee.employeeId}</p>
            </div>
            <div>
              <p className="text-sm text-slate-400">Date of Birth</p>
              <p className="mt-2 font-medium text-slate-200">
                {employee.dateOfBirth ? new Date(employee.dateOfBirth).toLocaleDateString() : "N/A"}
              </p>
            </div>
            <div>
              <p className="text-sm text-slate-400">Blood Group</p>
              <p className="mt-2 font-medium text-slate-200">{employee.bloodGroup || "N/A"}</p>
            </div>
          </div>
        </section>

        {/* Employment Information */}
        <section className="rounded-3xl border border-slate-700 bg-slate-800 p-8 shadow-lg">
          <h2 className="text-xl font-semibold text-white">Employment Information</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div>
              <p className="text-sm text-slate-400">Designation</p>
              <p className="mt-2 font-medium text-slate-200">{employee.designation}</p>
            </div>
            <div>
              <p className="text-sm text-slate-400">Department</p>
              <p className="mt-2 font-medium text-slate-200">{employee.department || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm text-slate-400">Employment Type</p>
              <p className="mt-2 font-medium text-slate-200">{employee.employmentType || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm text-slate-400">Employment Status</p>
              <div className="mt-2">
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${
                    employee.employmentStatus === "Active"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-yellow-500/20 text-yellow-400"
                  }`}
                >
                  {employee.employmentStatus}
                </span>
              </div>
            </div>
            <div>
              <p className="text-sm text-slate-400">Joining Date</p>
              <p className="mt-2 font-medium text-slate-200">
                {employee.joiningDate ? new Date(employee.joiningDate).toLocaleDateString() : "N/A"}
              </p>
            </div>
            <div>
              <p className="text-sm text-slate-400">Reporting Manager</p>
              <p className="mt-2 font-medium text-slate-200">
                {employee.reportingManagerId?.name || "None"}
              </p>
            </div>
          </div>
        </section>

        {/* Professional Information */}
        <section className="rounded-3xl border border-slate-700 bg-slate-800 p-8 shadow-lg">
          <h2 className="text-xl font-semibold text-white">Professional Information</h2>
          <div className="mt-6 space-y-4">
            {employee.experience && (
              <div>
                <p className="text-sm text-slate-400">Years of Experience</p>
                <p className="mt-2 font-medium text-slate-200">{employee.experience} years</p>
              </div>
            )}
            {employee.skills && employee.skills.length > 0 && (
              <div>
                <p className="text-sm text-slate-400">Skills</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {employee.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="inline-flex rounded-full bg-cyan-500/20 px-3 py-1 text-sm font-medium text-cyan-400"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {employee.programmingLanguages && employee.programmingLanguages.length > 0 && (
              <div>
                <p className="text-sm text-slate-400">Programming Languages</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {employee.programmingLanguages.map((lang, idx) => (
                    <span
                      key={idx}
                      className="inline-flex rounded-full bg-blue-500/20 px-3 py-1 text-sm font-medium text-blue-400"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {employee.frameworks && employee.frameworks.length > 0 && (
              <div>
                <p className="text-sm text-slate-400">Frameworks</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {employee.frameworks.map((framework, idx) => (
                    <span
                      key={idx}
                      className="inline-flex rounded-full bg-purple-500/20 px-3 py-1 text-sm font-medium text-purple-400"
                    >
                      {framework}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {employee.githubProfile && (
              <div>
                <p className="text-sm text-slate-400">GitHub Profile</p>
                <a
                  href={employee.githubProfile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 text-cyan-400 hover:text-cyan-300"
                >
                  {employee.githubProfile}
                </a>
              </div>
            )}
            {employee.portfolioUrl && (
              <div>
                <p className="text-sm text-slate-400">Portfolio</p>
                <a
                  href={employee.portfolioUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 text-cyan-400 hover:text-cyan-300"
                >
                  {employee.portfolioUrl}
                </a>
              </div>
            )}
          </div>
        </section>

        {/* Emergency Contact */}
        {employee.emergencyContact && Object.keys(employee.emergencyContact).some((k) => employee.emergencyContact[k]) && (
          <section className="rounded-3xl border border-slate-700 bg-slate-800 p-8 shadow-lg">
            <h2 className="text-xl font-semibold text-white">Emergency Contact</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-3">
              {employee.emergencyContact.name && (
                <div>
                  <p className="text-sm text-slate-400">Name</p>
                  <p className="mt-2 font-medium text-slate-200">{employee.emergencyContact.name}</p>
                </div>
              )}
              {employee.emergencyContact.phone && (
                <div>
                  <p className="text-sm text-slate-400">Phone</p>
                  <p className="mt-2 font-medium text-slate-200">{employee.emergencyContact.phone}</p>
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

export default AdminEmployeeProfile;
