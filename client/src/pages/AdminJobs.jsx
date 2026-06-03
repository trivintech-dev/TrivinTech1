import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api.js";

const emptyForm = { title: "", location: "", type: "", salaryRange: "", description: "" };

const AdminJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  const fetchJobs = async () => {
    const { data } = await api.get("/jobs");
    setJobs(data.jobs);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (editingId) {
      await api.put(`/jobs/${editingId}`, form);
    } else {
      await api.post("/jobs", form);
    }
    setForm(emptyForm);
    setEditingId(null);
    fetchJobs();
  };

  const handleEdit = (job) => {
    setEditingId(job._id);
    setForm({
      title: job.title || "",
      location: job.location || "",
      type: job.type || "",
      salaryRange: job.salaryRange || "",
      description: job.description || ""
    });
  };

  const handleDelete = async (id) => {
    await api.delete(`/jobs/${id}`);
    fetchJobs();
  };

  return (
    <div className="min-h-screen space-y-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 pt-32 md:pt-40">
      <div className="mx-auto w-full max-w-7xl">
        <div className="rounded-3xl border border-slate-700 bg-slate-800 p-6 shadow-lg">
          <Link to="/admin" className="text-sm text-cyan-400 hover:text-cyan-300">
            ← Back to Dashboard
          </Link>
          <h1 className="mt-4 font-heading text-2xl font-semibold text-white">Manage job requirements</h1>
          <form onSubmit={handleSubmit} className="mt-6 grid gap-4 md:grid-cols-2">
            <input
              placeholder="Title"
              value={form.title}
              onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
              className="rounded-xl border border-slate-600 bg-slate-700 px-3 py-2 text-white placeholder-slate-400 focus:border-cyan-500 focus:outline-none"
              required
            />
            <input
              placeholder="Location"
              value={form.location}
              onChange={(event) => setForm((prev) => ({ ...prev, location: event.target.value }))}
              className="rounded-xl border border-slate-600 bg-slate-700 px-3 py-2 text-white placeholder-slate-400 focus:border-cyan-500 focus:outline-none"
            />
            <input
              placeholder="Type"
              value={form.type}
              onChange={(event) => setForm((prev) => ({ ...prev, type: event.target.value }))}
              className="rounded-xl border border-slate-600 bg-slate-700 px-3 py-2 text-white placeholder-slate-400 focus:border-cyan-500 focus:outline-none"
            />
            <input
              placeholder="Salary range"
              value={form.salaryRange}
              onChange={(event) => setForm((prev) => ({ ...prev, salaryRange: event.target.value }))}
              className="rounded-xl border border-slate-600 bg-slate-700 px-3 py-2 text-white placeholder-slate-400 focus:border-cyan-500 focus:outline-none"
            />
            <input
              placeholder="Description"
              value={form.description}
              onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
              className="rounded-xl border border-slate-600 bg-slate-700 px-3 py-2 text-white placeholder-slate-400 focus:border-cyan-500 focus:outline-none"
            />
            <button type="submit" className="button-primary md:col-span-2">
              {editingId ? "Update job" : "Add job"}
            </button>
          </form>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {jobs.map((job) => (
            <div key={job._id} className="rounded-3xl border border-slate-700 bg-slate-800 p-6 shadow-lg">
              <h2 className="font-heading text-lg font-semibold text-white">{job.title}</h2>
              <p className="mt-2 text-sm text-slate-300">{job.description}</p>
              <div className="mt-4 flex gap-3">
                <button type="button" onClick={() => handleEdit(job)} className="button-primary">
                  Edit
                </button>
                <button type="button" onClick={() => handleDelete(job._id)} className="button-outline">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminJobs;
