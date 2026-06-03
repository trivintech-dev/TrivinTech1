import { useEffect, useState } from "react";
import api from "../api/api.js";

const emptyForm = {
    name: "",
    price: "",
    description: "",
    badge: "",
    idealFor: "",
    features: "",
    order: 0,
    featured: false,
    isActive: true
};

const AdminPricingPlans = () => {
    const [pricingPlans, setPricingPlans] = useState([]);
    const [form, setForm] = useState(emptyForm);
    const [editingId, setEditingId] = useState(null);

    const fetchPricingPlans = async () => {
        const { data } = await api.get("/pricing-plans/admin");
        setPricingPlans(data.pricingPlans);
    };

    useEffect(() => {
        fetchPricingPlans();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const payload = {
            ...form,
            order: Number(form.order) || 0,
            features: form.features
                .split(/\r?\n/)
                .map((item) => item.trim())
                .filter(Boolean)
        };

        if (editingId) {
            await api.put(`/pricing-plans/${editingId}`, payload);
        } else {
            await api.post("/pricing-plans", payload);
        }

        setForm(emptyForm);
        setEditingId(null);
        fetchPricingPlans();
    };

    const handleEdit = (pricingPlan) => {
        setEditingId(pricingPlan._id);
        setForm({
            name: pricingPlan.name || "",
            price: pricingPlan.price || "",
            description: pricingPlan.description || "",
            badge: pricingPlan.badge || "",
            idealFor: pricingPlan.idealFor || "",
            features: Array.isArray(pricingPlan.features) ? pricingPlan.features.join("\n") : "",
            order: pricingPlan.order ?? 0,
            featured: pricingPlan.featured ?? false,
            isActive: pricingPlan.isActive ?? true
        });
    };

    const handleDelete = async (id) => {
        await api.delete(`/pricing-plans/${id}`);
        fetchPricingPlans();
    };

    return (
        <div className="min-h-screen space-y-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 pt-32 md:pt-40">
            <div className="mx-auto w-full max-w-7xl">
                <div className="rounded-3xl border border-slate-700 bg-slate-800 p-6 shadow-lg">
                    <h1 className="font-heading text-2xl font-semibold text-white">Manage pricing plans</h1>
                    <p className="mt-2 text-sm text-slate-300">Add, update, and remove the package cards shown on the home and services pages.</p>
                    <form onSubmit={handleSubmit} className="mt-6 grid gap-4 md:grid-cols-2">
                        <input placeholder="Plan name" value={form.name} onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))} className="rounded-xl border border-slate-600 bg-slate-700 px-3 py-2 text-white placeholder-slate-400 focus:border-cyan-500 focus:outline-none" required />
                        <input placeholder="Price" value={form.price} onChange={(event) => setForm((prev) => ({ ...prev, price: event.target.value }))} className="rounded-xl border border-slate-600 bg-slate-700 px-3 py-2 text-white placeholder-slate-400 focus:border-cyan-500 focus:outline-none" required />
                        <textarea placeholder="Description" value={form.description} onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))} className="min-h-28 rounded-xl border border-slate-600 bg-slate-700 px-3 py-2 text-white placeholder-slate-400 focus:border-cyan-500 focus:outline-none md:col-span-2" required />
                        <input placeholder="Badge text" value={form.badge} onChange={(event) => setForm((prev) => ({ ...prev, badge: event.target.value }))} className="rounded-xl border border-slate-600 bg-slate-700 px-3 py-2 text-white placeholder-slate-400 focus:border-cyan-500 focus:outline-none" />
                        <input placeholder="Ideal for" value={form.idealFor} onChange={(event) => setForm((prev) => ({ ...prev, idealFor: event.target.value }))} className="rounded-xl border border-slate-600 bg-slate-700 px-3 py-2 text-white placeholder-slate-400 focus:border-cyan-500 focus:outline-none" />
                        <input placeholder="Order" type="number" value={form.order} onChange={(event) => setForm((prev) => ({ ...prev, order: event.target.value }))} className="rounded-xl border border-slate-600 bg-slate-700 px-3 py-2 text-white placeholder-slate-400 focus:border-cyan-500 focus:outline-none" />
                        <label className="flex items-center gap-3 rounded-xl border border-slate-600 bg-slate-700 px-3 py-2 text-sm text-slate-300 md:col-span-2">
                            <input type="checkbox" checked={form.featured} onChange={(event) => setForm((prev) => ({ ...prev, featured: event.target.checked }))} className="h-4 w-4 rounded border-slate-500 bg-slate-600" />
                            Featured plan
                        </label>
                        <label className="flex items-center gap-3 rounded-xl border border-slate-600 bg-slate-700 px-3 py-2 text-sm text-slate-300 md:col-span-2">
                            <input type="checkbox" checked={form.isActive} onChange={(event) => setForm((prev) => ({ ...prev, isActive: event.target.checked }))} className="h-4 w-4 rounded border-slate-500 bg-slate-600" />
                            Active on site
                        </label>
                        <textarea placeholder="Features, one per line" value={form.features} onChange={(event) => setForm((prev) => ({ ...prev, features: event.target.value }))} className="min-h-28 rounded-xl border border-slate-600 bg-slate-700 px-3 py-2 text-white placeholder-slate-400 focus:border-cyan-500 focus:outline-none md:col-span-2" />
                        <button type="submit" className="button-primary md:col-span-2">{editingId ? "Update pricing plan" : "Add pricing plan"}</button>
                        {editingId ? (
                            <button type="button" onClick={() => { setEditingId(null); setForm(emptyForm); }} className="button-outline md:col-span-2">Cancel edit</button>
                        ) : null}
                    </form>
                </div>

            <div className="grid gap-4 md:grid-cols-2">
                {pricingPlans.map((pricingPlan) => (
                    <div key={pricingPlan._id} className="rounded-3xl border border-slate-700 bg-slate-800 p-6 shadow-lg">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">{pricingPlan.name}</p>
                                <h2 className="mt-2 font-heading text-lg font-semibold text-white">{pricingPlan.price}</h2>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                                {pricingPlan.featured ? <span className="rounded-full bg-cyan-500/20 px-3 py-1 text-xs text-cyan-400">Featured</span> : null}
                                <span className="rounded-full bg-slate-700 border border-slate-600 px-3 py-1 text-xs text-slate-300">Order {pricingPlan.order ?? 0}</span>
                            </div>
                        </div>
                        <p className="mt-3 text-sm text-slate-300">{pricingPlan.description}</p>
                        <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-400">
                            {pricingPlan.badge ? <span className="rounded-full border border-slate-600 bg-slate-700 px-3 py-1 text-slate-300">{pricingPlan.badge}</span> : null}
                            {pricingPlan.idealFor ? <span className="rounded-full border border-slate-600 bg-slate-700 px-3 py-1 text-slate-300">{pricingPlan.idealFor}</span> : null}
                            <span className="rounded-full border border-slate-600 bg-slate-700 px-3 py-1 text-slate-300">{pricingPlan.isActive ? "Active" : "Inactive"}</span>
                        </div>
                        <div className="mt-4 flex flex-wrap gap-2">
                            {(pricingPlan.features || []).map((feature) => (
                                <span key={feature} className="rounded-full border border-slate-600 bg-slate-700 px-3 py-1 text-xs text-slate-300">{feature}</span>
                            ))}
                        </div>
                        <div className="mt-4 flex gap-3">
                            <button type="button" onClick={() => handleEdit(pricingPlan)} className="button-primary">Edit</button>
                            <button type="button" onClick={() => handleDelete(pricingPlan._id)} className="button-outline">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminPricingPlans;