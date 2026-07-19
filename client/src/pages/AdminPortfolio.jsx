import { useState } from "react";
import { FolderKanban, Plus, Pencil, Trash2 } from "lucide-react";
import DataTable from "../components/admin/DataTable.jsx";
import ImageUpload from "../components/admin/ImageUpload.jsx";
import useAdminResource from "../hooks/useAdminResource.js";
import {
  Badge,
  Button,
  ConfirmDialog,
  Field,
  IconButton,
  Input,
  Modal,
  PageHeader,
  Textarea,
  Toggle
} from "../components/admin/AdminUI.jsx";

const linesToArray = (text) =>
  text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

const arrayToLines = (value) => (Array.isArray(value) ? value.join("\n") : "");

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
  const { items, loading, saving, deleting, createItem, updateItem, deleteItem } = useAdminResource({
    endpoint: "/portfolio",
    listKey: "portfolios",
    query: "all=true"
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (row) => {
    setEditing(row);
    setForm({
      title: row.title || "",
      description: row.description || "",
      category: row.category || "",
      technologies: arrayToLines(row.technologies),
      imageUrl: row.imageUrl || "",
      imagePublicId: row.imagePublicId || "",
      projectUrl: row.projectUrl || "",
      order: row.order ?? 0,
      isActive: row.isActive ?? true
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditing(null);
    setForm(emptyForm);
  };

  const buildPayload = () => ({
    title: form.title,
    description: form.description,
    category: form.category,
    technologies: linesToArray(form.technologies),
    imageUrl: form.imageUrl,
    imagePublicId: form.imagePublicId,
    projectUrl: form.projectUrl,
    order: Number(form.order) || 0,
    isActive: form.isActive
  });

  const handleSave = async () => {
    const payload = buildPayload();
    const ok = editing ? await updateItem(editing._id, payload) : await createItem(payload);
    if (ok) closeModal();
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    const ok = await deleteItem(deleteTarget._id);
    if (ok) setDeleteTarget(null);
  };

  const columns = [
    {
      key: "title",
      header: "Project",
      render: (row) => (
        <div className="flex items-center gap-3">
          {row.imageUrl ? (
            <img src={row.imageUrl} alt="" className="h-10 w-14 rounded object-cover" />
          ) : null}
          <div>
            <p className="font-medium text-white">{row.title}</p>
            <p className="text-xs text-slate-500">{row.category || "—"}</p>
          </div>
        </div>
      )
    },
    { key: "order", header: "Order" },
    {
      key: "isActive",
      header: "Status",
      render: (row) => (
        <Badge tone={row.isActive ? "green" : "red"}>{row.isActive ? "Active" : "Inactive"}</Badge>
      )
    },
    {
      key: "actions",
      header: "",
      headerClassName: "text-right",
      render: (row) => (
        <div className="flex justify-end gap-1">
          <IconButton icon={Pencil} label="Edit" onClick={() => openEdit(row)} />
          <IconButton icon={Trash2} label="Delete" className="hover:text-red-300" onClick={() => setDeleteTarget(row)} />
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Portfolio"
        description="Project cards on the portfolio page."
        actions={
          <Button icon={Plus} onClick={openCreate} type="button">
            Add project
          </Button>
        }
      />

      <DataTable
        columns={columns}
        data={items}
        loading={loading}
        searchKeys={["title", "category", "description"]}
        searchPlaceholder="Search projects..."
        emptyIcon={FolderKanban}
        emptyTitle="No portfolio items"
        emptyDescription="Showcase your work with project entries."
        emptyAction={
          <Button icon={Plus} onClick={openCreate} type="button">
            Add project
          </Button>
        }
      />

      <Modal
        open={modalOpen}
        onClose={closeModal}
        title={editing ? "Edit project" : "Add project"}
        size="lg"
        footer={
          <>
            <Button variant="outline" onClick={closeModal} disabled={saving} type="button">
              Cancel
            </Button>
            <Button loading={saving} onClick={handleSave} type="button">
              {editing ? "Save changes" : "Create project"}
            </Button>
          </>
        }
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Title" required className="sm:col-span-2">
            <Input value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} required />
          </Field>
          <Field label="Category">
            <Input value={form.category} onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))} />
          </Field>
          <Field label="Project URL">
            <Input value={form.projectUrl} onChange={(e) => setForm((p) => ({ ...p, projectUrl: e.target.value }))} />
          </Field>
          <Field label="Display order">
            <Input type="number" value={form.order} onChange={(e) => setForm((p) => ({ ...p, order: e.target.value }))} />
          </Field>
          <Field label="Description" className="sm:col-span-2">
            <Textarea rows={3} value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} />
          </Field>
          <Field label="Technologies" hint="One technology per line" className="sm:col-span-2">
            <Textarea rows={4} value={form.technologies} onChange={(e) => setForm((p) => ({ ...p, technologies: e.target.value }))} />
          </Field>
          <div className="sm:col-span-2">
            <ImageUpload
              uploadUrl="/portfolio/upload-image"
              value={form.imageUrl}
              publicId={form.imagePublicId}
              onChange={({ imageUrl, imagePublicId }) =>
                setForm((p) => ({ ...p, imageUrl, imagePublicId: imagePublicId || "" }))
              }
            />
          </div>
          <div className="sm:col-span-2">
            <Toggle label="Active on portfolio page" checked={form.isActive} onChange={(isActive) => setForm((p) => ({ ...p, isActive }))} />
          </div>
        </div>
      </Modal>

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        loading={deleting}
        title="Delete portfolio item?"
        message={`Remove "${deleteTarget?.title || "this project"}"? This cannot be undone.`}
      />
    </div>
  );
};

export default AdminPortfolio;
