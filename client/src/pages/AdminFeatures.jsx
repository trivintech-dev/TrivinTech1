import { useState } from "react";
import { Plus, Pencil, Trash2, Sparkles } from "lucide-react";
import DataTable from "../components/admin/DataTable.jsx";
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
  Select,
  Textarea,
  Toggle
} from "../components/admin/AdminUI.jsx";

const ICON_OPTIONS = ["Sparkles", "Zap", "Shield", "Users", "Code2", "Layers3"];

const emptyForm = {
  title: "",
  description: "",
  icon: "Sparkles",
  order: 0,
  isActive: true
};

const AdminFeatures = () => {
  const { items, loading, saving, deleting, createItem, updateItem, deleteItem } = useAdminResource({
    endpoint: "/features",
    listKey: "features",
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
      icon: row.icon || "Sparkles",
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

  const handleSave = async () => {
    const payload = { ...form, order: Number(form.order) || 0 };
    const ok = editing ? await updateItem(editing._id, payload) : await createItem(payload);
    if (ok) closeModal();
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    const ok = await deleteItem(deleteTarget._id);
    if (ok) setDeleteTarget(null);
  };

  const columns = [
    { key: "title", header: "Title", render: (row) => <span className="font-medium text-white">{row.title}</span> },
    { key: "icon", header: "Icon" },
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
        title="Features"
        description="Feature cards displayed on the services page."
        actions={
          <Button icon={Plus} onClick={openCreate} type="button">
            Add feature
          </Button>
        }
      />

      <DataTable
        columns={columns}
        data={items}
        loading={loading}
        searchKeys={["title", "description", "icon"]}
        searchPlaceholder="Search features..."
        emptyIcon={Sparkles}
        emptyTitle="No features yet"
        emptyDescription="Add feature highlights for your services page."
        emptyAction={
          <Button icon={Plus} onClick={openCreate} type="button">
            Add feature
          </Button>
        }
      />

      <Modal
        open={modalOpen}
        onClose={closeModal}
        title={editing ? "Edit feature" : "Add feature"}
        size="lg"
        footer={
          <>
            <Button variant="outline" onClick={closeModal} disabled={saving} type="button">
              Cancel
            </Button>
            <Button loading={saving} onClick={handleSave} type="button">
              {editing ? "Save changes" : "Create feature"}
            </Button>
          </>
        }
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Title" required className="sm:col-span-2">
            <Input value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} required />
          </Field>
          <Field label="Icon">
            <Select value={form.icon} onChange={(e) => setForm((p) => ({ ...p, icon: e.target.value }))}>
              {ICON_OPTIONS.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Display order">
            <Input type="number" value={form.order} onChange={(e) => setForm((p) => ({ ...p, order: e.target.value }))} />
          </Field>
          <Field label="Description" required className="sm:col-span-2">
            <Textarea rows={4} value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} required />
          </Field>
          <div className="sm:col-span-2">
            <Toggle label="Active" checked={form.isActive} onChange={(isActive) => setForm((p) => ({ ...p, isActive }))} />
          </div>
        </div>
      </Modal>

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        loading={deleting}
        title="Delete feature?"
        message={`Remove "${deleteTarget?.title || "this feature"}"? This cannot be undone.`}
      />
    </div>
  );
};

export default AdminFeatures;
