import { useEffect, useState } from "react";
import { Trash2, Edit2, Plus, Sparkles, Zap, Shield, Users } from "lucide-react";
import api from "../api/api";

const iconOptions = [
  { name: "Sparkles", icon: Sparkles },
  { name: "Zap", icon: Zap },
  { name: "Shield", icon: Shield },
  { name: "Users", icon: Users }
];

const AdminFeatures = () => {
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    icon: "Sparkles",
    order: 0,
    isActive: true
  });

  // Fetch features
  const fetchFeatures = async () => {
    try {
      setLoading(true);
      const response = await api.get("/features/admin/all");
      setFeatures(response.data.features || []);
    } catch (error) {
      setStatusMessage(`Error: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeatures();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setStatusMessage("");

      if (!formData.title || !formData.description) {
        setStatusMessage("Title and description are required");
        return;
      }

      if (editingId) {
        // Update existing feature
        await api.put(`/features/${editingId}`, formData);
        setStatusMessage("Feature updated successfully!");
      } else {
        // Create new feature
        await api.post("/features", formData);
        setStatusMessage("Feature created successfully!");
      }

      // Reset form and refresh list
      resetForm();
      fetchFeatures();
    } catch (error) {
      setStatusMessage(`Error: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this feature?")) return;

    try {
      setLoading(true);
      await api.delete(`/features/${id}`);
      setStatusMessage("Feature deleted successfully!");
      fetchFeatures();
    } catch (error) {
      setStatusMessage(`Error: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Handle edit
  const handleEdit = (feature) => {
    setEditingId(feature._id);
    setFormData({
      title: feature.title,
      description: feature.description,
      icon: feature.icon || "Sparkles",
      order: feature.order,
      isActive: feature.isActive
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Reset form
  const resetForm = () => {
    setEditingId(null);
    setFormData({
      title: "",
      description: "",
      icon: "Sparkles",
      order: 0,
      isActive: true
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 p-4 sm:p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Manage Features</h1>
          <p className="text-slate-400">Add, edit, or delete feature cards that display on the services page</p>
        </div>

        {/* Status Message */}
        {statusMessage && (
          <div className={`mb-4 p-4 rounded-lg ${statusMessage.startsWith("Error") ? "bg-red-900/20 border border-red-500/50 text-red-200" : "bg-green-900/20 border border-green-500/50 text-green-200"}`}>
            {statusMessage}
          </div>
        )}

        {/* Form */}
        <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-6 mb-8">
          <h2 className="text-xl font-semibold text-white mb-6">{editingId ? "Edit Feature" : "Add New Feature"}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-2">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Responsive Design"
                  className="w-full rounded-lg border border-slate-600 bg-slate-900 px-4 py-2 text-white placeholder-slate-400 focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-200 mb-2">Icon</label>
                <select
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  className="w-full rounded-lg border border-slate-600 bg-slate-900 px-4 py-2 text-white focus:border-cyan-500 focus:outline-none"
                >
                  {iconOptions.map(({ name }) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter feature description..."
                rows="4"
                className="w-full rounded-lg border border-slate-600 bg-slate-900 px-4 py-2 text-white placeholder-slate-400 focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-2">Display Order</label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                  className="w-full rounded-lg border border-slate-600 bg-slate-900 px-4 py-2 text-white focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div className="flex items-end">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="rounded"
                  />
                  <span className="text-sm font-medium text-slate-200">Active</span>
                </label>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 rounded-lg bg-cyan-600 px-6 py-2 text-white font-medium hover:bg-cyan-700 disabled:opacity-50 transition"
              >
                <Plus className="h-4 w-4" />
                {editingId ? "Update Feature" : "Add Feature"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-lg bg-slate-700 px-6 py-2 text-white font-medium hover:bg-slate-600 transition"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Features List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white">All Features ({features.length})</h2>

          {loading && !editingId ? (
            <div className="text-center text-slate-400">Loading...</div>
          ) : features.length === 0 ? (
            <div className="text-center text-slate-400">No features found. Create one to get started!</div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => {
                const IconComp = iconOptions.find((opt) => opt.name === feature.icon)?.icon || Sparkles;
                return (
                  <div key={feature._id} className="rounded-lg border border-slate-700 bg-slate-800/50 p-4">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-cyan-500/20 rounded-lg text-cyan-400">
                          <IconComp className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-white">{feature.title}</h3>
                          <p className="text-xs text-slate-400">Order: {feature.order}</p>
                        </div>
                      </div>
                      <span className={`text-xs font-medium px-2 py-1 rounded ${feature.isActive ? "bg-green-900/30 text-green-300" : "bg-red-900/30 text-red-300"}`}>
                        {feature.isActive ? "Active" : "Inactive"}
                      </span>
                    </div>

                    <p className="text-sm text-slate-300 mb-4 line-clamp-3">{feature.description}</p>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(feature)}
                        className="flex-1 flex items-center justify-center gap-2 rounded bg-slate-700 hover:bg-slate-600 text-white px-3 py-2 text-sm transition"
                      >
                        <Edit2 className="h-4 w-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(feature._id)}
                        className="flex-1 flex items-center justify-center gap-2 rounded bg-red-900/30 hover:bg-red-900/50 text-red-300 px-3 py-2 text-sm transition"
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminFeatures;
