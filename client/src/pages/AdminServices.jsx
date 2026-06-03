import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api.js";

const emptyForm = {
  title: "",
  summary: "",
  description: "",
  price: "",
  category: "",
  duration: "",
  imageUrl: "",
  isActive: true
};

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  const fetchServices = async () => {
    const { data } = await api.get("/services");
    setServices(data.services);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = {
      ...form,
      price: form.price === "" ? 0 : Number(form.price)
    };

    if (editingId) {
      await api.put(`/services/${editingId}`, payload);
    } else {
      await api.post("/services", payload);
    }
    setForm(emptyForm);
    setEditingId(null);
    fetchServices();
  };

  const handleEdit = (service) => {
    setEditingId(service._id);
    setForm({
      title: service.title || "",
      summary: service.summary || "",
      description: service.description || "",
      price: service.price ?? "",
      category: service.category || "",
      duration: service.duration || "",
      imageUrl: service.imageUrl || "",
      isActive: service.isActive ?? true
    });
  };

  const handleDelete = async (id) => {
    await api.delete(`/services/${id}`);
    fetchServices();
  };

  return (
    <div className="min-h-screen space-y-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 pt-32 md:pt-40">
      <div className="mx-auto w-full max-w-7xl">
        <div className="rounded-3xl border border-slate-700 bg-slate-800 p-6 shadow-lg">
          <Link to="/admin" className="text-sm text-cyan-400 hover:text-cyan-300">
            ← Back to Dashboard
          </Link>
          <h1 className="mt-4 font-heading text-2xl font-semibold text-white">Manage services</h1>
          <form onSubmit={handleSubmit} className="mt-6 grid gap-4 md:grid-cols-2">
            <input
              placeholder="Title"
              value={form.title}
              onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
              className="rounded-xl border border-slate-600 bg-slate-700 px-3 py-2 text-white placeholder-slate-400 focus:border-cyan-500 focus:outline-none"
              required
            />
            <input
              placeholder="Summary"
              value={form.summary}
              onChange={(event) => setForm((prev) => ({ ...prev, summary: event.target.value }))}
              className="rounded-xl border border-slate-600 bg-slate-700 px-3 py-2 text-white placeholder-slate-400 focus:border-cyan-500 focus:outline-none"
            />
            <input
              placeholder="Category"
              value={form.category}
              onChange={(event) => setForm((prev) => ({ ...prev, category: event.target.value }))}
              className="rounded-xl border border-slate-600 bg-slate-700 px-3 py-2 text-white placeholder-slate-400 focus:border-cyan-500 focus:outline-none"
            />
            <input
              placeholder="Price"
              type="number"
              value={form.price}
              onChange={(event) => setForm((prev) => ({ ...prev, price: event.target.value }))}
              className="rounded-xl border border-slate-600 bg-slate-700 px-3 py-2 text-white placeholder-slate-400 focus:border-cyan-500 focus:outline-none"
            />
            <input
              placeholder="Duration"
              value={form.duration}
              onChange={(event) => setForm((prev) => ({ ...prev, duration: event.target.value }))}
              className="rounded-xl border border-slate-600 bg-slate-700 px-3 py-2 text-white placeholder-slate-400 focus:border-cyan-500 focus:outline-none"
            />
            <input
              placeholder="Image URL"
              value={form.imageUrl}
              onChange={(event) => setForm((prev) => ({ ...prev, imageUrl: event.target.value }))}
              className="rounded-xl border border-slate-600 bg-slate-700 px-3 py-2 text-white placeholder-slate-400 focus:border-cyan-500 focus:outline-none md:col-span-2"
            />
            <input
              placeholder="Description"
              value={form.description}
              onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
              className="rounded-xl border border-slate-600 bg-slate-700 px-3 py-2 text-white placeholder-slate-400 focus:border-cyan-500 focus:outline-none md:col-span-2"
            />
            <label className="flex items-center gap-3 rounded-xl border border-slate-600 bg-slate-700 px-3 py-2 text-sm text-slate-300 md:col-span-2">
              <input
                type="checkbox"
                checked={form.isActive}
                onChange={(event) => setForm((prev) => ({ ...prev, isActive: event.target.checked }))}
                className="h-4 w-4 rounded border-slate-500 bg-slate-600"
              />
              Active on site
            </label>
            <button type="submit" className="button-primary md:col-span-2">
              {editingId ? "Update service" : "Add service"}
            </button>
          </form>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {services.map((service) => (
            <div key={service._id} className="rounded-3xl border border-slate-700 bg-slate-800 p-6 shadow-lg">
              <h2 className="font-heading text-lg font-semibold text-white">{service.title}</h2>
              <div className="mt-2 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                <span>{service.category || "Uncategorized"}</span>
                <span>{service.duration || "No duration"}</span>
                <span>{service.isActive ? "Active" : "Inactive"}</span>
              </div>
              <p className="mt-2 text-sm text-slate-300">{service.summary || "No summary provided."}</p>
              <p className="mt-2 text-sm text-slate-400">{service.description || "No description provided."}</p>
              <div className="mt-3 text-sm font-medium text-slate-300">Price: {service.price ?? 0}</div>
              {service.imageUrl ? (
                <p className="mt-1 break-all text-xs text-slate-500">Image: {service.imageUrl}</p>
              ) : null}
              <div className="mt-4 flex gap-3">
                <button type="button" onClick={() => handleEdit(service)} className="button-primary">
                  Edit
                </button>
                <button type="button" onClick={() => handleDelete(service._id)} className="button-outline">
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

export default AdminServices;
