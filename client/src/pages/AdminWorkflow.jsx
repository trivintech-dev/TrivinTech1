import { useEffect, useState } from "react";
import api from "../api/api.js";

const emptyForm = {
    step: "",
    title: "",
    summary: "",
    duration: "",
    highlights: "",
    order: 0,
    isActive: true
};

const AdminWorkflow = () => {
    const [workflowSteps, setWorkflowSteps] = useState([]);
    const [form, setForm] = useState(emptyForm);
    const [editingId, setEditingId] = useState(null);

    const fetchWorkflowSteps = async () => {
        const { data } = await api.get("/workflow-steps");
        setWorkflowSteps(data.workflowSteps);
    };

    useEffect(() => {
        fetchWorkflowSteps();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const payload = {
            ...form,
            order: Number(form.order) || 0,
            highlights: form.highlights
                .split("\n")
                .map((item) => item.trim())
                .filter(Boolean)
        };

        if (editingId) {
            await api.put(`/workflow-steps/${editingId}`, payload);
        } else {
            await api.post("/workflow-steps", payload);
        }

        setForm(emptyForm);
        setEditingId(null);
        fetchWorkflowSteps();
    };

    const handleEdit = (workflowStep) => {
        setEditingId(workflowStep._id);
        setForm({
            step: workflowStep.step || "",
            title: workflowStep.title || "",
            summary: workflowStep.summary || "",
            duration: workflowStep.duration || "",
            highlights: Array.isArray(workflowStep.highlights) ? workflowStep.highlights.join("\n") : "",
            order: workflowStep.order ?? 0,
            isActive: workflowStep.isActive ?? true
        });
    };

    const handleDelete = async (id) => {
        await api.delete(`/workflow-steps/${id}`);
        fetchWorkflowSteps();
    };

    return (
        <div className="min-h-screen space-y-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 pt-32 md:pt-40">
            <div className="mx-auto w-full max-w-7xl">
                <div className="rounded-3xl border border-slate-700 bg-slate-800 p-6 shadow-lg">
                    <h1 className="font-heading text-2xl font-semibold text-white">Manage workflow steps</h1>
                    <p className="mt-2 text-sm text-slate-300">Add, update, or remove the development process cards shown on the home page.</p>
                    <form onSubmit={handleSubmit} className="mt-6 grid gap-4 md:grid-cols-2">
                        <input
                            placeholder="Step code"
                            value={form.step}
                            onChange={(event) => setForm((prev) => ({ ...prev, step: event.target.value }))}
                            className="rounded-xl border border-slate-600 bg-slate-700 px-3 py-2 text-white placeholder-slate-400 focus:border-cyan-500 focus:outline-none"
                            required
                        />
                        <input
                            placeholder="Title"
                            value={form.title}
                            onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
                            className="rounded-xl border border-slate-600 bg-slate-700 px-3 py-2 text-white placeholder-slate-400 focus:border-cyan-500 focus:outline-none"
                            required
                        />
                        <textarea
                            placeholder="Summary"
                            value={form.summary}
                            onChange={(event) => setForm((prev) => ({ ...prev, summary: event.target.value }))}
                            className="min-h-28 rounded-xl border border-slate-600 bg-slate-700 px-3 py-2 text-white placeholder-slate-400 focus:border-cyan-500 focus:outline-none md:col-span-2"
                            required
                        />
                        <input
                            placeholder="Duration"
                            value={form.duration}
                            onChange={(event) => setForm((prev) => ({ ...prev, duration: event.target.value }))}
                            className="rounded-xl border border-slate-600 bg-slate-700 px-3 py-2 text-white placeholder-slate-400 focus:border-cyan-500 focus:outline-none"
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
                        <textarea
                            placeholder="Highlights, one per line"
                            value={form.highlights}
                            onChange={(event) => setForm((prev) => ({ ...prev, highlights: event.target.value }))}
                            className="min-h-28 rounded-xl border border-slate-600 bg-slate-700 px-3 py-2 text-white placeholder-slate-400 focus:border-cyan-500 focus:outline-none md:col-span-2"
                        />
                        <button type="submit" className="button-primary md:col-span-2">
                            {editingId ? "Update workflow step" : "Add workflow step"}
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
                    {workflowSteps.map((workflowStep) => (
                        <div key={workflowStep._id} className="rounded-3xl border border-slate-700 bg-slate-800 p-6 shadow-lg">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">{workflowStep.step}</p>
                                    <h2 className="mt-2 font-heading text-lg font-semibold text-white">{workflowStep.title}</h2>
                                </div>
                                <span className="rounded-full bg-slate-700 border border-slate-600 px-3 py-1 text-xs text-slate-300">{workflowStep.duration || "No duration"}</span>
                            </div>
                            <p className="mt-3 text-sm text-slate-300">{workflowStep.summary}</p>
                            <div className="mt-4 flex flex-wrap gap-2">
                                {(workflowStep.highlights || []).map((highlight) => (
                                    <span key={highlight} className="rounded-full border border-slate-600 bg-slate-700 px-3 py-1 text-xs text-slate-300">
                                        {highlight}
                                    </span>
                                ))}
                            </div>
                            <div className="mt-4 flex gap-3">
                                <button type="button" onClick={() => handleEdit(workflowStep)} className="button-primary">
                                    Edit
                                </button>
                                <button type="button" onClick={() => handleDelete(workflowStep._id)} className="button-outline">
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

export default AdminWorkflow;