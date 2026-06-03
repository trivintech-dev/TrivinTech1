import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../api/api.js";

const AdminEmployeeForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    designation: "",
    department: "",
    employmentType: "",
    reportingManagerId: "",
    joiningDate: "",
    employmentStatus: "Active",
    skills: "",
    experience: "",
    education: "",
    bloodGroup: "",
    emergencyContact: { name: "", phone: "", relationship: "" },
    programmingLanguages: "",
    frameworks: "",
    githubProfile: "",
    portfolioUrl: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [managers, setManagers] = useState([]);

  useEffect(() => {
    fetchManagers();
    if (isEdit) {
      fetchEmployee();
    }
  }, [id]);

  const fetchManagers = async () => {
    try {
      const { data } = await api.get("/employees");
      const managerList = data.employees.filter((emp) => emp.designation === "Manager");
      setManagers(managerList);
    } catch (err) {
      console.error("Failed to load managers");
    }
  };

  const fetchEmployee = async () => {
    try {
      const { data } = await api.get(`/employees/${id}`);
      const emp = data.employee;
      setForm({
        name: emp.name || "",
        email: emp.email || "",
        phone: emp.phone || "",
        designation: emp.designation || "",
        department: emp.department || "",
        employmentType: emp.employmentType || "",
        reportingManagerId: emp.reportingManagerId?._id || "",
        joiningDate: emp.joiningDate ? emp.joiningDate.split("T")[0] : "",
        employmentStatus: emp.employmentStatus || "Active",
        skills: emp.skills?.join(", ") || "",
        experience: emp.experience || "",
        education: JSON.stringify(emp.education || []),
        bloodGroup: emp.bloodGroup || "",
        emergencyContact: emp.emergencyContact || { name: "", phone: "", relationship: "" },
        programmingLanguages: emp.programmingLanguages?.join(", ") || "",
        frameworks: emp.frameworks?.join(", ") || "",
        githubProfile: emp.githubProfile || "",
        portfolioUrl: emp.portfolioUrl || ""
      });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load employee");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const payload = {
        name: form.name,
        phone: form.phone,
        designation: form.designation,
        department: form.department,
        employmentType: form.employmentType,
        reportingManagerId: form.reportingManagerId || undefined,
        joiningDate: form.joiningDate || undefined,
        employmentStatus: form.employmentStatus,
        skills: form.skills.split(",").map((s) => s.trim()),
        experience: form.experience ? parseInt(form.experience) : undefined,
        bloodGroup: form.bloodGroup || undefined,
        emergencyContact: form.emergencyContact,
        programmingLanguages: form.programmingLanguages
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        frameworks: form.frameworks
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        githubProfile: form.githubProfile || undefined,
        portfolioUrl: form.portfolioUrl || undefined
      };

      if (isEdit) {
        await api.put(`/employees/${id}`, payload);
        setSuccess("Employee updated successfully!");
        setTimeout(() => navigate("/admin/employees"), 1500);
      } else {
        payload.email = form.email;
        await api.post("/employees", payload);
        setSuccess("Employee created successfully!");
        setTimeout(() => navigate("/admin/employees"), 1500);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save employee");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen space-y-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-32 md:pt-40">
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-700 bg-slate-800 p-8 shadow-lg">
          <Link to="/admin/employees" className="text-sm text-cyan-400 hover:text-cyan-300">
            ← Back to Employees
          </Link>
          <h1 className="mt-4 text-3xl font-semibold text-white">
            {isEdit ? "Edit Employee" : "Create New Employee"}
          </h1>
          <p className="mt-2 text-sm text-slate-300">
            {isEdit ? "Update employee information" : "Add a new employee to the system"}
          </p>
        </div>

        {error && <div className="rounded-3xl border border-red-900 bg-red-950 p-4 text-red-300">{error}</div>}
        {success && <div className="rounded-3xl border border-green-900 bg-green-950 p-4 text-green-300">{success}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <section className="rounded-3xl border border-slate-700 bg-slate-800 p-8 shadow-lg">
            <h2 className="text-xl font-semibold text-white">Basic Information</h2>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm text-slate-300">Full Name *</span>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="mt-2 w-full rounded-2xl border border-slate-600 bg-slate-700 px-4 py-3 text-white placeholder-slate-400 focus:border-cyan-500 focus:outline-none"
                />
              </label>
              <label className="block">
                <span className="text-sm text-slate-300">Email {!isEdit && "*"}</span>
                <input
                  type="email"
                  required={!isEdit}
                  disabled={isEdit}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="mt-2 w-full rounded-2xl border border-slate-600 bg-slate-700 px-4 py-3 text-white placeholder-slate-400 focus:border-cyan-500 focus:outline-none disabled:opacity-50"
                />
              </label>
              <label className="block">
                <span className="text-sm text-slate-300">Phone</span>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="mt-2 w-full rounded-2xl border border-slate-600 bg-slate-700 px-4 py-3 text-white placeholder-slate-400 focus:border-cyan-500 focus:outline-none"
                />
              </label>
              <label className="block">
                <span className="text-sm text-slate-300">Blood Group</span>
                <input
                  type="text"
                  value={form.bloodGroup}
                  onChange={(e) => setForm({ ...form, bloodGroup: e.target.value })}
                  className="mt-2 w-full rounded-2xl border border-slate-600 bg-slate-700 px-4 py-3 text-white placeholder-slate-400 focus:border-cyan-500 focus:outline-none"
                />
              </label>
            </div>
          </section>

          {/* Employment Information */}
          <section className="rounded-3xl border border-slate-700 bg-slate-800 p-8 shadow-lg">
            <h2 className="text-xl font-semibold text-white">Employment Information</h2>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm text-slate-300">Designation *</span>
                <select
                  required
                  value={form.designation}
                  onChange={(e) => setForm({ ...form, designation: e.target.value })}
                  className="mt-2 w-full rounded-2xl border border-slate-600 bg-slate-700 px-4 py-3 text-white focus:border-cyan-500 focus:outline-none"
                >
                  <option value="">Select Designation</option>
                  <option value="Developer">Developer</option>
                  <option value="Intern">Intern</option>
                  <option value="Manager">Manager</option>
                  <option value="UI/UX Designer">UI/UX Designer</option>
                  <option value="Technical Support Executive">Tech Support Executive</option>
                  <option value="HR">HR</option>
                  <option value="Sales">Sales</option>
                </select>
              </label>
              <label className="block">
                <span className="text-sm text-slate-300">Department</span>
                <input
                  type="text"
                  value={form.department}
                  onChange={(e) => setForm({ ...form, department: e.target.value })}
                  className="mt-2 w-full rounded-2xl border border-slate-600 bg-slate-700 px-4 py-3 text-white placeholder-slate-400 focus:border-cyan-500 focus:outline-none"
                />
              </label>
              <label className="block">
                <span className="text-sm text-slate-300">Employment Type</span>
                <select
                  value={form.employmentType}
                  onChange={(e) => setForm({ ...form, employmentType: e.target.value })}
                  className="mt-2 w-full rounded-2xl border border-slate-600 bg-slate-700 px-4 py-3 text-white focus:border-cyan-500 focus:outline-none"
                >
                  <option value="">Select Type</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Intern">Intern</option>
                </select>
              </label>
              <label className="block">
                <span className="text-sm text-slate-300">Employment Status</span>
                <select
                  value={form.employmentStatus}
                  onChange={(e) => setForm({ ...form, employmentStatus: e.target.value })}
                  className="mt-2 w-full rounded-2xl border border-slate-600 bg-slate-700 px-4 py-3 text-white focus:border-cyan-500 focus:outline-none"
                >
                  <option value="Active">Active</option>
                  <option value="On Leave">On Leave</option>
                  <option value="Resigned">Resigned</option>
                  <option value="Terminated">Terminated</option>
                </select>
              </label>
              <label className="block">
                <span className="text-sm text-slate-300">Joining Date</span>
                <input
                  type="date"
                  value={form.joiningDate}
                  onChange={(e) => setForm({ ...form, joiningDate: e.target.value })}
                  className="mt-2 w-full rounded-2xl border border-slate-600 bg-slate-700 px-4 py-3 text-white focus:border-cyan-500 focus:outline-none"
                />
              </label>
              <label className="block">
                <span className="text-sm text-slate-300">Reporting Manager</span>
                <select
                  value={form.reportingManagerId}
                  onChange={(e) => setForm({ ...form, reportingManagerId: e.target.value })}
                  className="mt-2 w-full rounded-2xl border border-slate-600 bg-slate-700 px-4 py-3 text-white focus:border-cyan-500 focus:outline-none"
                >
                  <option value="">None</option>
                  {managers.map((mgr) => (
                    <option key={mgr._id} value={mgr._id}>
                      {mgr.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </section>

          {/* Professional Information */}
          <section className="rounded-3xl border border-slate-700 bg-slate-800 p-8 shadow-lg">
            <h2 className="text-xl font-semibold text-white">Professional Information</h2>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <label className="block sm:col-span-2">
                <span className="text-sm text-slate-300">Skills (comma separated)</span>
                <input
                  type="text"
                  value={form.skills}
                  onChange={(e) => setForm({ ...form, skills: e.target.value })}
                  placeholder="e.g., JavaScript, React, Node.js"
                  className="mt-2 w-full rounded-2xl border border-slate-600 bg-slate-700 px-4 py-3 text-white placeholder-slate-400 focus:border-cyan-500 focus:outline-none"
                />
              </label>
              <label className="block">
                <span className="text-sm text-slate-300">Years of Experience</span>
                <input
                  type="number"
                  value={form.experience}
                  onChange={(e) => setForm({ ...form, experience: e.target.value })}
                  className="mt-2 w-full rounded-2xl border border-slate-600 bg-slate-700 px-4 py-3 text-white placeholder-slate-400 focus:border-cyan-500 focus:outline-none"
                />
              </label>
              <label className="block">
                <span className="text-sm text-slate-300">GitHub Profile</span>
                <input
                  type="url"
                  value={form.githubProfile}
                  onChange={(e) => setForm({ ...form, githubProfile: e.target.value })}
                  className="mt-2 w-full rounded-2xl border border-slate-600 bg-slate-700 px-4 py-3 text-white placeholder-slate-400 focus:border-cyan-500 focus:outline-none"
                />
              </label>
              <label className="block">
                <span className="text-sm text-slate-300">Portfolio URL</span>
                <input
                  type="url"
                  value={form.portfolioUrl}
                  onChange={(e) => setForm({ ...form, portfolioUrl: e.target.value })}
                  className="mt-2 w-full rounded-2xl border border-slate-600 bg-slate-700 px-4 py-3 text-white placeholder-slate-400 focus:border-cyan-500 focus:outline-none"
                />
              </label>
              <label className="block sm:col-span-2">
                <span className="text-sm text-slate-300">Programming Languages (comma separated)</span>
                <input
                  type="text"
                  value={form.programmingLanguages}
                  onChange={(e) => setForm({ ...form, programmingLanguages: e.target.value })}
                  placeholder="e.g., JavaScript, Python, Java"
                  className="mt-2 w-full rounded-2xl border border-slate-600 bg-slate-700 px-4 py-3 text-white placeholder-slate-400 focus:border-cyan-500 focus:outline-none"
                />
              </label>
              <label className="block sm:col-span-2">
                <span className="text-sm text-slate-300">Frameworks (comma separated)</span>
                <input
                  type="text"
                  value={form.frameworks}
                  onChange={(e) => setForm({ ...form, frameworks: e.target.value })}
                  placeholder="e.g., React, Spring Boot, Django"
                  className="mt-2 w-full rounded-2xl border border-slate-600 bg-slate-700 px-4 py-3 text-white placeholder-slate-400 focus:border-cyan-500 focus:outline-none"
                />
              </label>
            </div>
          </section>

          {/* Emergency Contact */}
          <section className="rounded-3xl border border-slate-700 bg-slate-800 p-8 shadow-lg">
            <h2 className="text-xl font-semibold text-white">Emergency Contact</h2>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <label className="block">
                <span className="text-sm text-slate-300">Name</span>
                <input
                  type="text"
                  value={form.emergencyContact.name}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      emergencyContact: { ...form.emergencyContact, name: e.target.value }
                    })
                  }
                  className="mt-2 w-full rounded-2xl border border-slate-600 bg-slate-700 px-4 py-3 text-white placeholder-slate-400 focus:border-cyan-500 focus:outline-none"
                />
              </label>
              <label className="block">
                <span className="text-sm text-slate-300">Phone</span>
                <input
                  type="tel"
                  value={form.emergencyContact.phone}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      emergencyContact: { ...form.emergencyContact, phone: e.target.value }
                    })
                  }
                  className="mt-2 w-full rounded-2xl border border-slate-600 bg-slate-700 px-4 py-3 text-white placeholder-slate-400 focus:border-cyan-500 focus:outline-none"
                />
              </label>
              <label className="block">
                <span className="text-sm text-slate-300">Relationship</span>
                <input
                  type="text"
                  value={form.emergencyContact.relationship}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      emergencyContact: { ...form.emergencyContact, relationship: e.target.value }
                    })
                  }
                  placeholder="e.g., Parent, Spouse"
                  className="mt-2 w-full rounded-2xl border border-slate-600 bg-slate-700 px-4 py-3 text-white placeholder-slate-400 focus:border-cyan-500 focus:outline-none"
                />
              </label>
            </div>
          </section>

          {/* Action Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <button
              type="submit"
              disabled={loading}
              className="rounded-2xl bg-cyan-600 px-6 py-3 font-semibold text-white transition hover:bg-cyan-700 disabled:opacity-50"
            >
              {loading ? "Saving..." : isEdit ? "Update Employee" : "Create Employee"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/admin/employees")}
              className="rounded-2xl border border-slate-600 bg-slate-700 px-6 py-3 font-semibold text-white transition hover:bg-slate-600"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminEmployeeForm;
