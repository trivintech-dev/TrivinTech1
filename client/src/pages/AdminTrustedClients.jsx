import { useEffect, useState } from "react";
import api from "../api/api.js";

const emptyForm = {
    name: "",
    badge: "Verified partner",
    summary: "",
    order: 0,
    isActive: true
};

const AdminTrustedClients = () => {
    const [trustedClients, setTrustedClients] = useState([]);
    const [form, setForm] = useState(emptyForm);
    const [editingId, setEditingId] = useState(null);

    const fetchTrustedClients = async () => {
        const { data } = await api.get("/trusted-clients");
        setTrustedClients(data.trustedClients);
    };

    useEffect(() => {
        fetchTrustedClients();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const payload = {
            ...form,
            order: Number(form.order) || 0
        };

        if (editingId) {
            await api.put(`/trusted-clients/${editingId}`, payload);
        } else {
            await api.post("/trusted-clients", payload);
        }

        setForm(emptyForm);
        setEditingId(null);
        fetchTrustedClients();
    };

    const handleEdit = (trustedClient) => {
        setEditingId(trustedClient._id);
        setForm({
            name: trustedClient.name || "",
            badge: trustedClient.badge || "Verified partner",
            summary: trustedClient.summary || "",
            order: trustedClient.order ?? 0,
            isActive: trustedClient.isActive ?? true
        });
    };

    const handleDelete = async (id) => {
        await api.delete(`/trusted-clients/${id}`);
        fetchTrustedClients();
    };

    return (
        <div className="min-h-screen space-y-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 pt-32 md:pt-40">
            <div className="mx-auto w-full max-w-7xl">
                <div className="rounded-3xl border border-slate-700 bg-slate-800 p-6 shadow-lg">
                    <h1 className="font-heading text-2xl font-semibold text-white">Manage trusted clients</h1>
                    <p className="mt-2 text-sm text-slate-300">Create, update, and remove the client cards shown on the home page.</p>
                    <form onSubmit={handleSubmit} className="mt-6 grid gap-4 md:grid-cols-2">
                        <input
                            placeholder="Client name"
                            value={form.name}
                            onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                            className="rounded-xl border border-slate-600 bg-slate-700 px-3 py-2 text-white placeholder-slate-400 focus:border-cyan-500 focus:outline-none"
                            required
                        />
                        <input
                            placeholder="Badge text"
                            value={form.badge}
                            onChange={(event) => setForm((prev) => ({ ...prev, badge: event.target.value }))}
                            className="rounded-xl border border-slate-600 bg-slate-700 px-3 py-2 text-white placeholder-slate-400 focus:border-cyan-500 focus:outline-none"
                        />
                        <textarea
                            placeholder="Summary"
                            value={form.summary}
                            onChange={(event) => setForm((prev) => ({ ...prev, summary: event.target.value }))}
                            className="min-h-28 rounded-xl border border-slate-600 bg-slate-700 px-3 py-2 text-white placeholder-slate-400 focus:border-cyan-500 focus:outline-none md:col-span-2"
                            required
                        />
                        <input
                            placeholder="Order"
                            type="number"
                            value={form.order}
                            onChange={(event) => setForm((prev) => ({ ...prev, order: event.target.value }))}
                            className="rounded-xl border border-slate-600 bg-slate-700 px-3 py-2 text-white placeholder-slate-400 focus:border-cyan-500 focus:outline-none"
                        />
                        <label className="flex items-center gap-3 rounded-xl border border-slate-600 bg-slate-700 px-3 py-2 text-sm text-slate-300 md:col-span-2">
                            <input
                                type="checkbox"
                                checked={form.isActive}
                                onChange={(event) => setForm((prev) => ({ ...prev, isActive: event.target.checked }))}
                                className="h-4 w-4 rounded border-slate-500 bg-slate-600"
                            />
                            Active on home page
                        </label>
                        <button type="submit" className="button-primary md:col-span-2">
                            {editingId ? "Update trusted client" : "Add trusted client"}
                        </button>
                        {editingId ? (
                            <button
                                type="button"
                                onClick={() => {
                                    setEditingId(null);
                                    setForm(emptyForm);
                                }}
                                className="button-outline md:col-span-2"
                            >
                                Cancel edit
                            </button>
                        ) : null}
                    </form>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    {trustedClients.map((trustedClient) => (
                        <div key={trustedClient._id} className="rounded-3xl border border-slate-700 bg-slate-800 p-6 shadow-lg">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">{trustedClient.badge || "Trusted"}</p>
                                    <h2 className="mt-2 font-heading text-lg font-semibold text-white">{trustedClient.name}</h2>
                                </div>
                                <span className="rounded-full bg-slate-700 border border-slate-600 px-3 py-1 text-xs text-slate-300">Order {trustedClient.order ?? 0}</span>
                            </div>
                            <p className="mt-3 text-sm text-slate-300">{trustedClient.summary}</p>
                            <div className="mt-4 flex gap-3">
                                <button type="button" onClick={() => handleEdit(trustedClient)} className="button-primary">
                                    Edit
                                </button>
                                <button type="button" onClick={() => handleDelete(trustedClient._id)} className="button-outline">
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

export default AdminTrustedClients;