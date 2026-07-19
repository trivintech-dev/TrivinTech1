import { useState } from "react";
import { Plus, Pencil, Trash2, BriefcaseBusiness } from "lucide-react";
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
  location: "",
  type: "",
  salaryRange: "",
  description: "",
  isActive: true
};

const AdminJobs = () => {
  const { items, loading, saving, deleting, createItem, updateItem, deleteItem } = useAdminResource({
    endpoint: "/jobs",
    listKey: "jobs",
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
      location: row.location || "",
      type: row.type || "",
      salaryRange: row.salaryRange || "",
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
    { key: "title", header: "Title", render: (row) => <span className="font-medium text-white">{row.title}</span> },
    { key: "location", header: "Location" },
    { key: "type", header: "Type" },
    { key: "salaryRange", header: "Salary" },
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
        title="Job openings"
        description="Manage job listings and requirements."
        actions={
          <Button icon={Plus} onClick={openCreate} type="button">
            Add job
          </Button>
        }
      />

      <DataTable
        columns={columns}
        data={items}
        loading={loading}
        searchKeys={["title", "location", "type", "salaryRange"]}
        searchPlaceholder="Search jobs..."
        emptyIcon={BriefcaseBusiness}
        emptyTitle="No jobs yet"
        emptyDescription="Create a job posting for candidates to view and apply."
        emptyAction={
          <Button icon={Plus} onClick={openCreate} type="button">
            Add job
          </Button>
        }
      />

      <Modal
        open={modalOpen}
        onClose={closeModal}
        title={editing ? "Edit job" : "Add job"}
        size="lg"
        footer={
          <>
            <Button variant="outline" onClick={closeModal} disabled={saving} type="button">
              Cancel
            </Button>
            <Button loading={saving} onClick={handleSave} type="button">
              {editing ? "Save changes" : "Create job"}
            </Button>
          </>
        }
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Title" required className="sm:col-span-2">
            <Input value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} required />
          </Field>
          <Field label="Location">
            <Input value={form.location} onChange={(e) => setForm((p) => ({ ...p, location: e.target.value }))} />
          </Field>
          <Field label="Type">
            <Input value={form.type} onChange={(e) => setForm((p) => ({ ...p, type: e.target.value }))} placeholder="Full-time, Remote..." />
          </Field>
          <Field label="Salary range" className="sm:col-span-2">
            <Input value={form.salaryRange} onChange={(e) => setForm((p) => ({ ...p, salaryRange: e.target.value }))} />
          </Field>
          <Field label="Description" className="sm:col-span-2">
            <Textarea rows={5} value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} />
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
        title="Delete job?"
        message={`Remove "${deleteTarget?.title || "this job"}"? This cannot be undone.`}
      />
    </div>
  );
};

export default AdminJobs;
