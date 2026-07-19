import { useState } from "react";
import { CreditCard, Plus, Pencil, Trash2 } from "lucide-react";
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

const linesToArray = (text) =>
  text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

const arrayToLines = (value) => (Array.isArray(value) ? value.join("\n") : "");

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
  const { items, loading, saving, deleting, createItem, updateItem, deleteItem } = useAdminResource({
    endpoint: "/pricing-plans",
    listKey: "pricingPlans",
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
      name: row.name || "",
      price: row.price || "",
      description: row.description || "",
      badge: row.badge || "",
      idealFor: row.idealFor || "",
      features: arrayToLines(row.features),
      order: row.order ?? 0,
      featured: row.featured ?? false,
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
    name: form.name,
    price: form.price,
    description: form.description,
    badge: form.badge,
    idealFor: form.idealFor,
    order: Number(form.order) || 0,
    featured: form.featured,
    isActive: form.isActive,
    features: linesToArray(form.features)
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
    { key: "name", header: "Plan", render: (row) => <span className="font-medium text-white">{row.name}</span> },
    { key: "price", header: "Price" },
    {
      key: "featured",
      header: "Featured",
      render: (row) => (row.featured ? <Badge tone="cyan">Featured</Badge> : <span className="text-slate-500">—</span>)
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
        title="Pricing plans"
        description="Package cards on the home and services pages."
        actions={
          <Button icon={Plus} onClick={openCreate} type="button">
            Add plan
          </Button>
        }
      />

      <DataTable
        columns={columns}
        data={items}
        loading={loading}
        searchKeys={["name", "price", "badge", "idealFor"]}
        searchPlaceholder="Search plans..."
        emptyIcon={CreditCard}
        emptyTitle="No pricing plans"
        emptyDescription="Create pricing tiers for your offerings."
        emptyAction={
          <Button icon={Plus} onClick={openCreate} type="button">
            Add plan
          </Button>
        }
      />

      <Modal
        open={modalOpen}
        onClose={closeModal}
        title={editing ? "Edit pricing plan" : "Add pricing plan"}
        size="lg"
        footer={
          <>
            <Button variant="outline" onClick={closeModal} disabled={saving} type="button">
              Cancel
            </Button>
            <Button loading={saving} onClick={handleSave} type="button">
              {editing ? "Save changes" : "Create plan"}
            </Button>
          </>
        }
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Plan name" required>
            <Input value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} required />
          </Field>
          <Field label="Price" required>
            <Input value={form.price} onChange={(e) => setForm((p) => ({ ...p, price: e.target.value }))} required />
          </Field>
          <Field label="Badge text">
            <Input value={form.badge} onChange={(e) => setForm((p) => ({ ...p, badge: e.target.value }))} />
          </Field>
          <Field label="Ideal for">
            <Input value={form.idealFor} onChange={(e) => setForm((p) => ({ ...p, idealFor: e.target.value }))} />
          </Field>
          <Field label="Display order">
            <Input type="number" value={form.order} onChange={(e) => setForm((p) => ({ ...p, order: e.target.value }))} />
          </Field>
          <Field label="Description" required className="sm:col-span-2">
            <Textarea rows={3} value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} required />
          </Field>
          <Field label="Features" hint="One feature per line" className="sm:col-span-2">
            <Textarea rows={5} value={form.features} onChange={(e) => setForm((p) => ({ ...p, features: e.target.value }))} />
          </Field>
          <Toggle label="Featured plan" checked={form.featured} onChange={(featured) => setForm((p) => ({ ...p, featured }))} />
          <Toggle label="Active on site" checked={form.isActive} onChange={(isActive) => setForm((p) => ({ ...p, isActive }))} />
        </div>
      </Modal>

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        loading={deleting}
        title="Delete pricing plan?"
        message={`Remove "${deleteTarget?.name || "this plan"}"? This cannot be undone.`}
      />
    </div>
  );
};

export default AdminPricingPlans;
