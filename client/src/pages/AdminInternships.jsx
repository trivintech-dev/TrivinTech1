import { useState } from "react";
import { GraduationCap, Plus, Pencil, Trash2 } from "lucide-react";
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
  role: "",
  duration: "",
  eligibility: "",
  stipend: "",
  description: "",
  isActive: true
};

const AdminInternships = () => {
  const { items, loading, saving, deleting, createItem, updateItem, deleteItem } = useAdminResource({
    endpoint: "/internships",
    listKey: "internships",
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
      role: row.role || "",
      duration: row.duration || "",
      eligibility: row.eligibility || "",
      stipend: row.stipend || "",
      description: row.description || "",
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
    const ok = editing ? await updateItem(editing._id, form) : await createItem(form);
    if (ok) closeModal();
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    const ok = await deleteItem(deleteTarget._id);
    if (ok) setDeleteTarget(null);
  };

  const columns = [
    { key: "role", header: "Role", render: (row) => <span className="font-medium text-white">{row.role}</span> },
    { key: "duration", header: "Duration" },
    { key: "stipend", header: "Stipend" },
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
        title="Internships"
        description="Manage internship programs and listings."
        actions={
          <Button icon={Plus} onClick={openCreate} type="button">
            Add internship
          </Button>
        }
      />

      <DataTable
        columns={columns}
        data={items}
        loading={loading}
        searchKeys={["role", "duration", "eligibility", "stipend"]}
        searchPlaceholder="Search internships..."
        emptyIcon={GraduationCap}
        emptyTitle="No internships yet"
        emptyDescription="Add internship roles for students and applicants."
        emptyAction={
          <Button icon={Plus} onClick={openCreate} type="button">
            Add internship
          </Button>
        }
      />

      <Modal
        open={modalOpen}
        onClose={closeModal}
        title={editing ? "Edit internship" : "Add internship"}
        size="lg"
        footer={
          <>
            <Button variant="outline" onClick={closeModal} disabled={saving} type="button">
              Cancel
            </Button>
            <Button loading={saving} onClick={handleSave} type="button">
              {editing ? "Save changes" : "Create internship"}
            </Button>
          </>
        }
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Role" required className="sm:col-span-2">
            <Input value={form.role} onChange={(e) => setForm((p) => ({ ...p, role: e.target.value }))} required />
          </Field>
          <Field label="Duration" required>
            <Input value={form.duration} onChange={(e) => setForm((p) => ({ ...p, duration: e.target.value }))} required />
          </Field>
          <Field label="Stipend" required>
            <Input value={form.stipend} onChange={(e) => setForm((p) => ({ ...p, stipend: e.target.value }))} required />
          </Field>
          <Field label="Eligibility" required className="sm:col-span-2">
            <Input value={form.eligibility} onChange={(e) => setForm((p) => ({ ...p, eligibility: e.target.value }))} required />
          </Field>
          <Field label="Description" className="sm:col-span-2">
            <Textarea rows={4} value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} />
          </Field>
          <div className="sm:col-span-2">
            <Toggle label="Active listing" checked={form.isActive} onChange={(isActive) => setForm((p) => ({ ...p, isActive }))} />
          </div>
        </div>
      </Modal>

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        loading={deleting}
        title="Delete internship?"
        message={`Remove "${deleteTarget?.role || "this internship"}"? This cannot be undone.`}
      />
    </div>
  );
};

export default AdminInternships;
