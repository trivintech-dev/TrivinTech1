import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api.js";

const emptyForm = {
    title: "",
    description: "",
    category: "",
    technologies: "",
    imageUrl: "",
    imagePublicId: "",
    projectUrl: "",
    order: 0,
    isActive: true
};

const AdminPortfolio = () => {
    const [portfolios, setPortfolios] = useState([]);
    const [form, setForm] = useState(emptyForm);
    const [editingId, setEditingId] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [uploadMessage, setUploadMessage] = useState("");

    const fetchPortfolios = async () => {
        try {
            const { data } = await api.get("/portfolio");
            setPortfolios(data.portfolios);
        } catch (error) {
            console.error("Error fetching portfolios:", error);
        }
    };

    useEffect(() => {
        fetchPortfolios();
    }, []);

    const handleImageUpload = async (event) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setUploading(true);
        setUploadMessage("");

        try {
            const formData = new FormData();
            formData.append("image", file);

            const { data } = await api.post("/portfolio/upload-image", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            setForm((prev) => ({
                ...prev,
                imageUrl: data.imageUrl,
                imagePublicId: data.imagePublicId
            }));
            setUploadMessage("Image uploaded successfully!");
        } catch (error) {
            setUploadMessage("Image upload failed. Please try again.");
            console.error("Upload error:", error);
        } finally {
            setUploading(false);
        }
    };

    const handleDeleteImage = async () => {
        if (!form.imagePublicId) return;

        try {
            await api.delete("/portfolio/image/delete", {
                data: { publicId: form.imagePublicId }
            });

            setForm((prev) => ({
                ...prev,
                imageUrl: "",
                imagePublicId: ""
            }));
            setUploadMessage("Image deleted successfully!");
        } catch (error) {
            console.error("Delete error:", error);
            setUploadMessage("Image deletion failed.");
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const payload = {
            title: form.title,
            description: form.description,
            category: form.category,
            technologies: form.technologies
                .split(",")
                .map((t) => t.trim())
                .filter(Boolean),
            imageUrl: form.imageUrl,
            imagePublicId: form.imagePublicId,
            projectUrl: form.projectUrl,
            order: Number(form.order) || 0,
            isActive: form.isActive
        };

        try {
            if (editingId) {
                await api.put(`/portfolio/${editingId}`, payload);
            } else {
                await api.post("/portfolio", payload);
            }

            setForm(emptyForm);
            setEditingId(null);
            setUploadMessage("");
            fetchPortfolios();
        } catch (error) {
            console.error("Submit error:", error);
            setUploadMessage("Failed to save portfolio item.");
        }
    };

    const handleEdit = (portfolio) => {
        setEditingId(portfolio._id);
        setForm({
            title: portfolio.title || "",
            description: portfolio.description || "",
            category: portfolio.category || "",
            technologies: (portfolio.technologies || []).join(", "),
            imageUrl: portfolio.imageUrl || "",
            imagePublicId: portfolio.imagePublicId || "",
            projectUrl: portfolio.projectUrl || "",
            order: portfolio.order ?? 0,
            isActive: portfolio.isActive ?? true
        });
        window.scrollTo(0, 0);
    };

    const handleDelete = async (id, imagePublicId) => {
        if (!window.confirm("Are you sure you want to delete this portfolio item?")) return;

        try {
            if (imagePublicId) {
                await api.delete("/portfolio/image/delete", {
                    data: { publicId: imagePublicId }
                });
            }

            await api.delete(`/portfolio/${id}`);
            fetchPortfolios();
        } catch (error) {
            console.error("Delete error:", error);
        }
    };

    return (
        <div className="min-h-screen space-y-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 pt-32 md:pt-40">
            <div className="mx-auto w-full max-w-7xl">
                <div className="rounded-3xl border border-slate-700 bg-slate-800 p-6 shadow-lg">
                    <Link to="/admin" className="text-sm text-cyan-400 hover:text-cyan-300">
                        ← Back to Dashboard
                    </Link>
                    <h1 className="mt-4 font-heading text-2xl font-semibold text-white">Manage portfolio & projects</h1>
                    <p className="mt-2 text-sm text-slate-300">Create, update, and remove portfolio project cards with images.</p>

                    <form onSubmit={handleSubmit} className="mt-6 grid gap-4 md:grid-cols-2">
                        <input
                            placeholder="Project title"
                            value={form.title}
                            onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
                            className="rounded-xl border border-slate-600 bg-slate-700 px-3 py-2 text-white placeholder-slate-400 focus:border-cyan-500 focus:outline-none"
                            required
                        />
                        <input
                            placeholder="Category"
                            value={form.category}
                            onChange={(event) => setForm((prev) => ({ ...prev, category: event.target.value }))}
                            className="rounded-xl border border-slate-600 bg-slate-700 px-3 py-2 text-white placeholder-slate-400 focus:border-cyan-500 focus:outline-none"
                        />
                        <input
                            placeholder="Project URL"
                            value={form.projectUrl}
                            onChange={(event) => setForm((prev) => ({ ...prev, projectUrl: event.target.value }))}
                            className="rounded-xl border border-slate-600 bg-slate-700 px-3 py-2 text-white placeholder-slate-400 focus:border-cyan-500 focus:outline-none"
                        />
                        <input
                            placeholder="Order"
                            type="number"
                            value={form.order}
                            onChange={(event) => setForm((prev) => ({ ...prev, order: event.target.value }))}
                            className="rounded-xl border border-slate-600 bg-slate-700 px-3 py-2 text-white placeholder-slate-400 focus:border-cyan-500 focus:outline-none"
                        />
                        <textarea
                            placeholder="Description"
                            value={form.description}
                            onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
                            className="min-h-24 rounded-xl border border-slate-600 bg-slate-700 px-3 py-2 text-white placeholder-slate-400 focus:border-cyan-500 focus:outline-none md:col-span-2"
                        />
                        <input
                            placeholder="Technologies (comma-separated: React, Node.js, etc.)"
                            value={form.technologies}
                            onChange={(event) => setForm((prev) => ({ ...prev, technologies: event.target.value }))}
                            className="rounded-xl border border-slate-600 bg-slate-700 px-3 py-2 text-white placeholder-slate-400 focus:border-cyan-500 focus:outline-none md:col-span-2"
                        />

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-slate-300 mb-2">Upload Project Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                disabled={uploading}
                                className="rounded-xl border border-slate-600 bg-slate-700 px-3 py-2 text-white placeholder-slate-400 focus:border-cyan-500 focus:outline-none w-full"
                            />
                            {uploading && <p className="mt-2 text-sm text-cyan-400">Uploading...</p>}
                            {uploadMessage && (
                                <p className={`mt-2 text-sm ${uploadMessage.includes("successfully") ? "text-green-400" : "text-red-400"}`}>
                                    {uploadMessage}
                                </p>
                            )}

                            {form.imageUrl && (
                                <div className="mt-4">
                                    <div className="flex items-end gap-4">
                                        <div className="flex-1">
                                            <img
                                                src={form.imageUrl}
                                                alt="Preview"
                                                className="h-40 w-full object-cover rounded-xl border border-slate-600"
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={handleDeleteImage}
                                            className="button-outline px-3 py-2 text-sm"
                                        >
                                            Remove Image
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        <label className="flex items-center gap-3 rounded-xl border border-slate-600 bg-slate-700 px-3 py-2 text-sm text-slate-300 md:col-span-2">
                            <input
                                type="checkbox"
                                checked={form.isActive}
                                onChange={(event) => setForm((prev) => ({ ...prev, isActive: event.target.checked }))}
                                className="h-4 w-4 rounded border-slate-500 bg-slate-600"
                            />
                            Active on portfolio page
                        </label>

                        <button type="submit" className="button-primary md:col-span-2">
                            {editingId ? "Update portfolio item" : "Add portfolio item"}
                        </button>

                        {editingId ? (
                            <button
                                type="button"
                                onClick={() => {
                                    setEditingId(null);
                                    setForm(emptyForm);
                                    setUploadMessage("");
                                }}
                                className="button-outline md:col-span-2"
                            >
                                Cancel edit
                            </button>
                        ) : null}
                    </form>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {portfolios.map((portfolio) => (
                        <div key={portfolio._id} className="rounded-3xl border border-slate-700 bg-slate-800 p-6 shadow-lg overflow-hidden">
                            {portfolio.imageUrl && (
                                <img
                                    src={portfolio.imageUrl}
                                    alt={portfolio.title}
                                    className="h-48 w-full object-cover rounded-xl mb-4"
                                />
                            )}
                            <div>
                                <h2 className="font-heading text-lg font-semibold text-white">{portfolio.title}</h2>
                                {portfolio.category && (
                                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400 mt-1">
                                        {portfolio.category}
                                    </p>
                                )}
                                {portfolio.technologies && portfolio.technologies.length > 0 && (
                                    <div className="mt-2 flex flex-wrap gap-1">
                                        {portfolio.technologies.map((tech) => (
                                            <span key={tech} className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                )}
                                {portfolio.description && (
                                    <p className="mt-3 text-sm text-slate-300 line-clamp-3">{portfolio.description}</p>
                                )}
                                {portfolio.projectUrl && (
                                    <p className="mt-2 text-xs text-slate-400 truncate">
                                        <a href={portfolio.projectUrl} target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline">
                                            {portfolio.projectUrl}
                                        </a>
                                    </p>
                                )}
                                <div className="mt-2 flex items-center justify-between">
                                    <span className="text-xs text-slate-400">Order: {portfolio.order}</span>
                                    <span className={`text-xs px-2 py-1 rounded ${portfolio.isActive ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                                        {portfolio.isActive ? "Active" : "Inactive"}
                                    </span>
                                </div>
                            </div>
                            <div className="mt-4 flex gap-3">
                                <button type="button" onClick={() => handleEdit(portfolio)} className="button-primary flex-1">
                                    Edit
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleDelete(portfolio._id, portfolio.imagePublicId)}
                                    className="button-outline flex-1"
                                >
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

export default AdminPortfolio;
