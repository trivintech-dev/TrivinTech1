import { useState } from "react";
import { Briefcase, Plus, Pencil, Trash2 } from "lucide-react";
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
  Textarea,
  Toggle
} from "../components/admin/AdminUI.jsx";

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
  const { items, loading, saving, deleting, createItem, updateItem, deleteItem } = useAdminResource({
    endpoint: "/services",
    listKey: "services",
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
      summary: row.summary || "",
      description: row.description || "",
      price: row.price ?? "",
      category: row.category || "",
      duration: row.duration || "",
      imageUrl: row.imageUrl || "",
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
    const payload = {
      ...form,
      price: form.price === "" ? 0 : Number(form.price)
    };
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
    { key: "category", header: "Category" },
    {
      key: "price",
      header: "Price",
      render: (row) => <span>{row.price ?? 0}</span>
    },
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
        title="Services"
        description="Manage service offerings shown on the site."
        actions={
          <Button icon={Plus} onClick={openCreate} type="button">
            Add service
          </Button>
        }
      />

      <DataTable
        columns={columns}
        data={items}
        loading={loading}
        searchKeys={["title", "category", "summary"]}
        searchPlaceholder="Search services..."
        emptyIcon={Briefcase}
        emptyTitle="No services yet"
        emptyDescription="Add a service to display it on the public site."
        emptyAction={
          <Button icon={Plus} onClick={openCreate} type="button">
            Add service
          </Button>
        }
      />

      <Modal
        open={modalOpen}
        onClose={closeModal}
        title={editing ? "Edit service" : "Add service"}
        size="lg"
        footer={
          <>
            <Button variant="outline" onClick={closeModal} disabled={saving} type="button">
              Cancel
            </Button>
            <Button loading={saving} onClick={handleSave} type="button">
              {editing ? "Save changes" : "Create service"}
            </Button>
          </>
        }
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Title" required className="sm:col-span-2">
            <Input value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} required />
          </Field>
          <Field label="Summary" className="sm:col-span-2">
            <Input value={form.summary} onChange={(e) => setForm((p) => ({ ...p, summary: e.target.value }))} />
          </Field>
          <Field label="Category">
            <Input value={form.category} onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))} />
          </Field>
          <Field label="Price">
            <Input type="number" min="0" value={form.price} onChange={(e) => setForm((p) => ({ ...p, price: e.target.value }))} />
          </Field>
          <Field label="Duration">
            <Input value={form.duration} onChange={(e) => setForm((p) => ({ ...p, duration: e.target.value }))} />
          </Field>
          <Field label="Image URL">
            <Input value={form.imageUrl} onChange={(e) => setForm((p) => ({ ...p, imageUrl: e.target.value }))} />
          </Field>
          <Field label="Description" className="sm:col-span-2">
            <Textarea rows={4} value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} />
          </Field>
          <div className="sm:col-span-2">
            <Toggle
              label="Active on site"
              checked={form.isActive}
              onChange={(isActive) => setForm((p) => ({ ...p, isActive }))}
            />
          </div>
        </div>
      </Modal>

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        loading={deleting}
        title="Delete service?"
        message={`Remove "${deleteTarget?.title || "this service"}"? This cannot be undone.`}
      />
    </div>
  );
};

export default AdminServices;
