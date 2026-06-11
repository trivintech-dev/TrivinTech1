import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api.js";

const emptyForm = { role: "", duration: "", eligibility: "", stipend: "", description: "" };

const AdminInternships = () => {
  const [internships, setInternships] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  const fetchInternships = async () => {
    try {
      const { data } = await api.get("/internships/admin/all");
      setInternships(data.internships);
    } catch (error) {
      console.error("Error fetching internships:", error);
    }
  };

  useEffect(() => {
    fetchInternships();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (editingId) {
        await api.put(`/internships/${editingId}`, form);
      } else {
        await api.post("/internships", form);
      }
      setForm(emptyForm);
      setEditingId(null);
      fetchInternships();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleEdit = (internship) => {
    setEditingId(internship._id);
    setForm({
      role: internship.role || "",
      duration: internship.duration || "",
      eligibility: internship.eligibility || "",
      stipend: internship.stipend || "",
      description: internship.description || ""
    });
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this internship?")) {
      try {
        await api.delete(`/internships/${id}`);
        fetchInternships();
      } catch (error) {
        console.error("Error deleting internship:", error);
      }
    }
  };

  return (
    <div className="min-h-screen space-y-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 pt-32 md:pt-40">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white">Internship Management</h1>
          <Link to="/admin" className="button-outline px-4 py-2 text-sm">
            Back to Admin
          </Link>
        </div>

        {/* Form Section */}
        <div className="mt-8 rounded-2xl border border-gray-100/15 bg-white/5 p-8">
          <h2 className="text-xl font-semibold text-white">
            {editingId ? "Edit Internship" : "Add New Internship"}
          </h2>
          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <input
                type="text"
                placeholder="Role (e.g., Frontend Intern)"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                className="rounded-lg border border-gray-100/15 bg-white/5 px-4 py-2 text-white placeholder:text-gray-500 focus:border-brand/50 focus:outline-none"
                required
              />
              <input
                type="text"
                placeholder="Duration (e.g., 3 months)"
                value={form.duration}
                onChange={(e) => setForm({ ...form, duration: e.target.value })}
                className="rounded-lg border border-gray-100/15 bg-white/5 px-4 py-2 text-white placeholder:text-gray-500 focus:border-brand/50 focus:outline-none"
                required
              />
              <input
                type="text"
                placeholder="Eligibility (e.g., Students or freshers)"
                value={form.eligibility}
                onChange={(e) => setForm({ ...form, eligibility: e.target.value })}
                className="rounded-lg border border-gray-100/15 bg-white/5 px-4 py-2 text-white placeholder:text-gray-500 focus:border-brand/50 focus:outline-none"
                required
              />
              <input
                type="text"
                placeholder="Stipend (e.g., Paid)"
                value={form.stipend}
                onChange={(e) => setForm({ ...form, stipend: e.target.value })}
                className="rounded-lg border border-gray-100/15 bg-white/5 px-4 py-2 text-white placeholder:text-gray-500 focus:border-brand/50 focus:outline-none"
                required
              />
            </div>
            <textarea
              placeholder="Description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full rounded-lg border border-gray-100/15 bg-white/5 px-4 py-2 text-white placeholder:text-gray-500 focus:border-brand/50 focus:outline-none"
              rows="4"
            />
            <div className="flex gap-3">
              <button
                type="submit"
                className="button-primary px-6 py-2 text-sm"
              >
                {editingId ? "Update Internship" : "Add Internship"}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null);
                    setForm(emptyForm);
                  }}
                  className="button-outline px-6 py-2 text-sm"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Internships List */}
        <div className="mt-8 space-y-4">
          <h2 className="text-xl font-semibold text-white">All Internships</h2>
          {internships.length === 0 ? (
            <p className="text-gray-400">No internships found.</p>
          ) : (
            <div className="grid gap-4">
              {internships.map((internship) => (
                <div
                  key={internship._id}
                  className="flex items-center justify-between rounded-xl border border-gray-100/15 bg-white/5 p-4"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-white">{internship.role}</h3>
                    <div className="mt-2 grid gap-2 text-sm text-gray-400 md:grid-cols-2">
                      <p><strong>Duration:</strong> {internship.duration}</p>
                      <p><strong>Eligibility:</strong> {internship.eligibility}</p>
                      <p><strong>Stipend:</strong> {internship.stipend}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(internship)}
                      className="button-outline px-4 py-2 text-xs"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(internship._id)}
                      className="rounded-lg border border-red-400/30 bg-red-400/10 px-4 py-2 text-xs font-semibold text-red-300 transition hover:bg-red-400/20"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminInternships;
