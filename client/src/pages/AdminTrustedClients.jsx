import { useState } from "react";
import { Building2, Plus, Pencil, Trash2 } from "lucide-react";
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
  name: "",
  badge: "Verified partner",
  summary: "",
  order: 0,
  isActive: true
};

const AdminTrustedClients = () => {
  const { items, loading, saving, deleting, createItem, updateItem, deleteItem } = useAdminResource({
    endpoint: "/trusted-clients",
    listKey: "trustedClients",
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
      badge: row.badge || "Verified partner",
      summary: row.summary || "",
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
    { key: "name", header: "Client", render: (row) => <span className="font-medium text-white">{row.name}</span> },
    { key: "badge", header: "Badge" },
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
        title="Trusted clients"
        description="Client cards shown on the home page."
        actions={
          <Button icon={Plus} onClick={openCreate} type="button">
            Add client
          </Button>
        }
      />

      <DataTable
        columns={columns}
        data={items}
        loading={loading}
        searchKeys={["name", "badge", "summary"]}
        searchPlaceholder="Search clients..."
        emptyIcon={Building2}
        emptyTitle="No trusted clients"
        emptyDescription="Add partners and clients to build social proof."
        emptyAction={
          <Button icon={Plus} onClick={openCreate} type="button">
            Add client
          </Button>
        }
      />

      <Modal
        open={modalOpen}
        onClose={closeModal}
        title={editing ? "Edit client" : "Add client"}
        size="lg"
        footer={
          <>
            <Button variant="outline" onClick={closeModal} disabled={saving} type="button">
              Cancel
            </Button>
            <Button loading={saving} onClick={handleSave} type="button">
              {editing ? "Save changes" : "Create client"}
            </Button>
          </>
        }
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Client name" required className="sm:col-span-2">
            <Input value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} required />
          </Field>
          <Field label="Badge text">
            <Input value={form.badge} onChange={(e) => setForm((p) => ({ ...p, badge: e.target.value }))} />
          </Field>
          <Field label="Display order">
            <Input type="number" value={form.order} onChange={(e) => setForm((p) => ({ ...p, order: e.target.value }))} />
          </Field>
          <Field label="Summary" required className="sm:col-span-2">
            <Textarea rows={4} value={form.summary} onChange={(e) => setForm((p) => ({ ...p, summary: e.target.value }))} required />
          </Field>
          <div className="sm:col-span-2">
            <Toggle label="Active on home page" checked={form.isActive} onChange={(isActive) => setForm((p) => ({ ...p, isActive }))} />
          </div>
        </div>
      </Modal>

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        loading={deleting}
        title="Delete client?"
        message={`Remove "${deleteTarget?.name || "this client"}"? This cannot be undone.`}
      />
    </div>
  );
};

export default AdminTrustedClients;
